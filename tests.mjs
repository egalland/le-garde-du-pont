import fs from 'node:fs/promises';import ts from 'typescript';import assert from 'node:assert/strict';
const src=await fs.readFile('src/game.ts','utf8');const js=ts.transpileModule(src,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ES2020}}).outputText;const g=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
function run(ids){return ids.reduce((s,id)=>g.step(s,id),g.initial());}
for(const [path,end] of [[['pay'],'paid'],[['listen','help','share'],'friend'],[['listen','riddle','river'],'riddle'],[['listen','leave'],'fled'],[['threat','double','double'],'banned']]){assert.equal(g.currentEnding(run(path)),end);assert.equal(g.validate(JSON.parse(JSON.stringify(run(path)))).node,'end:'+end);}
let s=run(['listen','help','share']);assert.equal(s.cheese,false);assert.equal(s.coins,12);assert.deepEqual(g.initial(s.endings).endings,['friend']);
assert.throws(()=>g.step({...g.initial(),coins:0},'pay'),/pièces/);assert.throws(()=>g.step({...g.initial(),cheese:false},'gift'),/fromage/);assert.throws(()=>g.step(g.initial(),'missing'),/disponible/);assert.throws(()=>g.validate({version:99}),/compatible/);
assert.equal(run(['threat','apologize']).anger,0);console.log('PASS : cinq fins accessibles, ressources, reprise JSON, excuses et erreurs de données/choix.');
// Boundary test: run the shipped UI handlers with a browser storage failure.
const vm=await import('node:vm');
const elements=new Map();function el(id){if(!elements.has(id))elements.set(id,{hidden:false,textContent:'',innerHTML:'',disabled:false,children:[],classList:{toggle(){}},setAttribute(){},focus(){},append(x){this.children.push(x);},querySelectorAll(){return[];},addEventListener(){}});return elements.get(id);}
const ui=await fs.readFile('src/app.ts','utf8');const browserScript=ts.transpileModule(src.replaceAll('export ','')+'\n'+ui.replace(/^import[^\n]+\n/,''),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.None}}).outputText;
const context={document:{getElementById:el,querySelectorAll:()=>[],createElement:()=>el('created'),activeElement:null},indexedDB:{open(){throw new Error('Blocked storage');}},window:{addEventListener(){}},console,Blob,URL,setTimeout};vm.runInNewContext(browserScript,context);await new Promise(resolve=>setImmediate(resolve));
assert.equal(el('error-box').hidden,false);assert.match(el('error-text').textContent,/Sauvegarde indisponible/);assert.equal(el('save-status').textContent,'Non enregistrée');
await el('import-file').onchange({target:{files:[{size:30,text:async()=>'{"version":99,"node":"oops"}'}],value:'bad.json'}});
assert.match(el('error-text').textContent,/Import impossible/);assert.equal(el('coins').textContent,'12');assert.equal(el('intro').hidden,false);console.log('PASS : erreur de stockage visible sans faux succès ; import invalide refusé, partie conservée.');
