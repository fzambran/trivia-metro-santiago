import { mkdir,readFile,writeFile,copyFile,cp,rm } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const name of ['index.html','style.css'])await copyFile(name,`dist/${name}`);
await cp('src','dist/src',{recursive:true});await cp('assets','dist/assets',{recursive:true});await writeFile('dist/.nojekyll','');
// Single-file backup also works directly from disk without ES module/file restrictions.
let js='';for(const name of ['questions.js','game.js','audio.js','app.js']) js+=(await readFile(`src/${name}`,'utf8')).replace(/^import .*;\n/gm,'').replace(/\bexport /g,'')+'\n';
const applause=(await readFile('assets/applause.mp3')).toString('base64');
js=js.replace("'./assets/applause.mp3'",()=>`'data:audio/mpeg;base64,${applause}'`);
const css=await readFile('style.css','utf8');
let html=await readFile('index.html','utf8');html=html.replace('<link rel="stylesheet" href="./style.css">',()=>`<style>${css}</style>`).replace('<script type="module" src="./src/app.js"></script>',()=>`<script type="module">${js}</script>`);
for(const [file,mime] of [['metro-santiago-logo.png','image/png'],['ns93.svg','image/svg+xml']]) {
 const data=(await readFile(`assets/${file}`)).toString('base64');
 html=html.replaceAll(`./assets/${file}`,`data:${mime};base64,${data}`);
}
await writeFile('dist/trivia-offline.html',html);console.log('Static site and single-file offline backup built in dist/');
