import { mkdir,readFile,writeFile,copyFile,cp,rm } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const name of ['index.html','style.css'])await copyFile(name,`dist/${name}`);
await cp('src','dist/src',{recursive:true});await writeFile('dist/.nojekyll','');
// Single-file backup also works directly from disk without ES module/file restrictions.
let js='';for(const name of ['questions.js','game.js','app.js']) js+=(await readFile(`src/${name}`,'utf8')).replace(/^import .*;\n/gm,'').replace(/\bexport /g,'')+'\n';
const css=await readFile('style.css','utf8');
let html=await readFile('index.html','utf8');html=html.replace('<link rel="stylesheet" href="./style.css">',()=>`<style>${css}</style>`).replace('<script type="module" src="./src/app.js"></script>',()=>`<script type="module">${js}</script>`);
await writeFile('dist/trivia-offline.html',html);console.log('Static site and single-file offline backup built in dist/');
