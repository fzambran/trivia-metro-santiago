import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {questions} from '../src/questions.js';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GAME_URL||'http://127.0.0.1:4173';
const evidence=process.env.EVIDENCE_DIR||'evidence';
await mkdir(evidence,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'}),report=[];
async function alignment(page){return page.evaluate(()=>{const t=document.querySelector('#train').getBoundingClientRect(),s=document.querySelector('li.current .dot').getBoundingClientRect();return Math.abs(t.x+t.width/2-s.x-s.width/2);});}
try{
 for(const width of [900,1024,1180,1200,1280,1366,1920]){
  const page=await browser.newPage({viewport:{width,height:768},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.clock.install();await page.goto(base);await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100));await page.locator('[data-action=start]').click();
  const stops=[];
  for(let i=0;i<10;i++){
   await page.clock.runFor(2500);assert.equal(await page.locator('.answers').count(),1,`Question ${i+1} missing at width ${width}`);
   assert.equal(await page.locator('.question-title').textContent(),questions[i].question);
   const delta=await alignment(page);assert.ok(delta<.1,`Station ${i+1}, width ${width}: offset ${delta}`);stops.push({question:i+1,delta});
   if(i===6&&(width===1180||width===1200))await page.screenshot({path:`${evidence}/arrival-${width}-q7.png`,fullPage:true});
   await page.locator(`[data-answer="${questions[i].correct}"]`).click();await page.clock.runFor(2000);if(i<9)await page.locator('[data-action=next]').click();
  }
  assert.equal(await page.locator('.end h1').textContent(),'¡Llegamos a La Moneda!');assert.deepEqual(errors,[]);report.push({width,mode:'reduced',victory:true,stops});console.log(`All ten questions and victory: ${width}px`);await page.close();
 }
 // Exercise actual CSS transitions all the way through question 7, including
 // resizing an already moving train. Earlier tests only animated the first stop.
 const page=await browser.newPage({viewport:{width:1280,height:768}});await page.clock.install();await page.goto(base);await page.locator('[data-action=start]').click();const stops=[];
 for(let i=0;i<10;i++){
  if(i===6){await page.waitForTimeout(900);await page.setViewportSize({width:1180,height:768});}
  await page.locator('.answers').waitFor({timeout:10000});assert.equal(await page.locator('.question-title').textContent(),questions[i].question);
  const delta=await alignment(page);assert.ok(delta<.1);stops.push({question:i+1,delta});
  if(i===6)await page.screenshot({path:`${evidence}/arrival-real-q7.png`,fullPage:true});
  await page.locator(`[data-answer="${questions[i].correct}"]`).click();await page.clock.runFor(2000);if(i<9)await page.locator('[data-action=next]').click();
 }
 assert.equal(await page.locator('.end h1').textContent(),'¡Llegamos a La Moneda!');report.push({mode:'real animation',resizeDuringQuestion7:true,victory:true,stops});await page.close();
 await writeFile(`${evidence}/arrival-report.json`,JSON.stringify({base,checkedAt:new Date().toISOString(),report},null,2));console.log('Arrival regression checks passed, including real full journey and resize at question 7.');
}finally{await browser.close();}
