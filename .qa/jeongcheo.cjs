'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),http=require('node:http'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const BASE='e6e51b5c53faf5c90a02d6570c6903947caef8b7';
let checks=0;
function ok(value,label){assert.ok(value,label);checks++;}
function eq(value,expected,label){assert.deepEqual(value,expected,label);checks++;}
const text=f=>fs.readFileSync(f,'utf8');
function load(file){const box={window:{}};vm.runInNewContext(text(file),box,{timeout:1000});return JSON.parse(JSON.stringify(Object.values(box.window.STUDY_LESSONS)[0]));}
const lesson=load('lessons/jeongcheo.js'),comparison=load('lessons/seongpae.js'),key='study-poetry-jeongcheo-v1';
eq(lesson.comparison.text,comparison.stanzas.join('\n\n'),'comparison exact');eq(lesson.id,'jeongcheo','id');eq(lesson.stanzas.length,4,'four passages');
for(const [stage,count] of Object.entries({guided:8,general:3,exam:3,advanced:5})){
 const questions=lesson.stages[stage];eq(questions.length,count,stage+' count');eq(new Set(questions.map(q=>q.id)).size,count,stage+' ids unique');
 for(const q of questions){
  eq(q.options.length,stage==='guided'?3:5,q.id+' choice count');eq(new Set(q.options).size,q.options.length,q.id+' distinct options');
  ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,q.id+' answer range');ok(q.stem.length>0&&q.explanation.length>0,q.id+' content');
  if(stage==='guided')ok(q.hint.length>0,q.id+' hint');
  if(stage==='advanced'){eq(q.reasons.length,5,q.id+' reasons');ok(q.reasons.every(r=>r.length>0)&&q.benchmark.url.startsWith('https://wdown.ebsi.co.kr/'),q.id+' benchmark');}
 }
}
const beforeNav=execFileSync('git',['show',BASE+':poetry-nav.js'],{encoding:'utf8'});
eq(text('poetry-nav.js'),beforeNav.replace("seongpae:'김상헌 · 성패관천운'","seongpae:'김상헌 · 성패관천운',jeongcheo:'최명길 · 정처관군동'").replace("{path:'korean-seongpae.html',key:'seongpae'}","{path:'korean-seongpae.html',key:'seongpae'},{path:'korean-jeongcheo.html',key:'jeongcheo'}"),'nav exact additive change');
const beforeSW=execFileSync('git',['show',BASE+':service-worker.js'],{encoding:'utf8'});
eq(text('service-worker.js'),beforeSW.replace('study-pwa-v36','study-pwa-v37').replace('const CORE=[\n',"const CORE=[\n  './korean-jeongcheo.html',\n  './lessons/jeongcheo.js',\n"),'SW exact additive change');
const changed=execFileSync('git',['diff','--name-only',BASE,'HEAD'],{encoding:'utf8'}).trim().split('\n');
const allowed=new Set(['lessons/jeongcheo.js','korean-jeongcheo.html','poetry-nav.js','service-worker.js','docs/korean-jeongcheo-review.md','.github/workflows/jeongcheo-validate.yml','.qa/jeongcheo.cjs']);
ok(changed.every(f=>allowed.has(f)),'existing files unchanged');
const tracked=execFileSync('git',['ls-tree','-r','--name-only',BASE],{encoding:'utf8'}).trim().split('\n');
const preserved=tracked.filter(f=>!['poetry-nav.js','service-worker.js'].includes(f));
for(const file of preserved)ok(fs.readFileSync(file).equals(execFileSync('git',['show',BASE+':'+file])),'preserved '+file);
console.log('Static checks passed',checks);
const root=process.cwd();
const server=http.createServer((req,res)=>{
 try{
  const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '')||'index.html';const file=path.resolve(root,relative);
  if(!file.startsWith(root+path.sep)||file.includes(path.sep+'.git'+path.sep)){res.writeHead(403);res.end();return;}
  const bytes=fs.readFileSync(file);
  const mime={'.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'}[path.extname(file)]||'application/octet-stream';
  res.writeHead(200,{'Content-Type':mime,'Cache-Control':'no-store'});res.end(bytes);
 }catch(error){console.log('HTTP missing resource',req.url);if(!res.headersSent)res.writeHead(404);res.end();}
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true}),errors=[];
 async function freshPage(options={}){
  const context=await browser.newContext({viewport:{width:360,height:800},serviceWorkers:'block'});
  if(options.seed!==undefined)await context.addInitScript(({k,v})=>{if(location.protocol==='http:')localStorage.setItem(k,v);},{k:key,v:options.seed});
  if(options.blockStorage)await context.addInitScript(()=>{Storage.prototype.getItem=function(){throw new Error('test storage blocked');};Storage.prototype.setItem=function(){throw new Error('test storage blocked');};});
  const page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/korean-jeongcheo.html'+(options.hash||''));await page.locator('[data-ready="true"]').waitFor();return {context,page};
 }
 const {context,page}=await freshPage();
 eq(await page.locator('.poetry-library a').count(),20,'twenty nav entries');eq(await page.locator('.poetry-stanza').count(),4,'four rendered passages');eq(await page.locator('h1').innerText(),'최명길 〈정처관군동〉','heading');ok(!await page.locator('.poetry-sources').evaluate(e=>e.open),'sources collapsed');
 await page.evaluate(()=>{localStorage.setItem('study-qa-math-sentinel','keep-math');localStorage.setItem('study-qa-poem-sentinel','keep-poem');});
 await page.getByRole('button',{name:'답 확인',exact:true}).click();ok((await page.locator('.poetry-notice').first().innerText()).includes('선택'),'missing guided blocked');
 for(const stage of ['guided','general','exam']){
  for(let i=0;i<lesson.stages[stage].length;i++){
   const q=lesson.stages[stage][i];ok((await page.locator('#poetry-question').innerText()).includes(q.stem),stage+' question '+i);
   if(stage==='guided'&&i===0){await page.locator('input[value="'+((q.answer+1)%3)+'"]').check();await page.getByRole('button',{name:'답 확인',exact:true}).click();eq(await page.locator('.poetry-feedback p').innerText(),q.hint,'wrong hint');eq(await page.locator('.poetry-feedback h4').count(),0,'wrong hides answer');}
   await page.locator('input[value="'+q.answer+'"]').check();await page.getByRole('button',{name:'답 확인',exact:true}).click();eq(await page.locator('.poetry-feedback p').innerText(),q.explanation,q.id+' explanation');
   const next=i<lesson.stages[stage].length-1?'다음 문항':stage==='guided'?'핵심 정리로':stage==='general'?'수능형 연습으로':'기출 대조 실전으로';await page.getByRole('button',{name:next,exact:true}).click();
  }
  if(stage==='guided'){eq(await page.locator('.poetry-summary dt').count(),8,'summary entries');await page.getByRole('button',{name:'일반 문제로',exact:true}).click();}
 }
 console.log('All learning stages passed',checks);
 await page.getByRole('button',{name:'전체 제출 · 채점',exact:true}).click();ok((await page.locator('.poetry-notice').first().innerText()).includes('5문항'),'missing advanced blocked');
 for(let i=0;i<5;i++){const q=lesson.stages.advanced[i];await page.locator('.poetry-itemnav button').nth(i).click();await page.locator('input[value="'+((q.answer+1)%5)+'"]').check();await page.locator('input[value="'+q.answer+'"]').check();eq(await page.locator('.poetry-feedback h4').count(),0,'no answer before submit '+i);}
 await page.reload();await page.locator('[data-ready="true"]').waitFor();eq(await page.locator('.poetry-progress').innerText(),'5 / 5문항 응답','answers restored');
 for(const width of [320,360,780,1100]){await page.setViewportSize({width,height:900});for(let i=0;i<5;i++){await page.locator('.poetry-itemnav button').nth(i).click();ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'before grade width '+width+' q '+i);}}
 await page.getByRole('button',{name:'전체 제출 · 채점',exact:true}).click();eq(await page.locator('.poetry-progress').innerText(),'5문항 중 5문항 정답','perfect grading');
 const nums=['①','②','③','④','⑤'];
 for(let i=0;i<5;i++){const q=lesson.stages.advanced[i];await page.locator('.poetry-itemnav button').nth(i).click();eq(await page.locator('.poetry-reasons li').allTextContents(),q.reasons.map((r,j)=>nums[j]+' '+r),'all reasons '+i);eq(await page.locator('input:disabled').count(),5,'locked answers '+i);for(const width of [320,360,780,1100]){await page.setViewportSize({width,height:900});ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'after grade width '+width+' q '+i);}}
 await page.reload();await page.locator('[data-ready="true"]').waitFor();eq(await page.locator('.poetry-progress').innerText(),'5문항 중 5문항 정답','submitted state restored');
 page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'실전 다시 풀기',exact:true}).click();eq(await page.locator('.poetry-progress').innerText(),'5문항 중 5문항 정답','retry cancel');
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'실전 다시 풀기',exact:true}).click();
 for(let i=0;i<5;i++){await page.locator('.poetry-itemnav button').nth(i).click();await page.locator('input[value="'+((lesson.stages.advanced[i].answer+1)%5)+'"]').check();}
 await page.getByRole('button',{name:'전체 제출 · 채점',exact:true}).click();eq(await page.locator('.poetry-progress').innerText(),'5문항 중 0문항 정답','all wrong grading');ok(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).buckets.guided.reviewed.every(Boolean),key),'retry preserves guided');
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'이 작품 처음부터',exact:true}).click();eq(await page.locator('.poetry-progress').innerText(),'1 / 8문항','reset own lesson');eq(await page.evaluate(()=>[localStorage.getItem('study-qa-math-sentinel'),localStorage.getItem('study-qa-poem-sentinel')]),['keep-math','keep-poem'],'reset isolation');
 const q=lesson.stages.guided[0];await page.locator('input[value="1"]').check();await page.getByRole('button',{name:'답 확인',exact:true}).click();await page.getByRole('button',{name:'해설 확인하고 진행',exact:true}).click();eq(await page.locator('.poetry-feedback p').innerText(),q.explanation,'explicit reveal');
 await page.addScriptTag({content:text('poetry-lesson.js')});await page.addScriptTag({content:text('poetry-nav.js')});eq(await page.locator('.poetry-library').count(),1,'no duplicate nav');eq(await page.locator('.poetry-layout').count(),1,'no duplicate renderer');await context.close();
 console.log('New lesson interactions passed',checks);
 for(const seed of ['broken-json','null',JSON.stringify({contentId:'old',buckets:{}}),JSON.stringify({contentId:lesson.contentId,stage:'advanced',buckets:{advanced:{index:999,answers:[-1,22,null,'1',true],submitted:true}}})]){const pair=await freshPage({seed});ok(await pair.page.locator('.poetry-options input').count()>0,'invalid storage renders');await pair.context.close();}
 {const pair=await freshPage({blockStorage:true});ok((await pair.page.locator('.poetry-notice').last().innerText()).includes('저장할 수 없어'),'storage failure notice');await pair.context.close();}
 let regression=0;const regContext=await browser.newContext({serviceWorkers:'block',viewport:{width:360,height:800}}),regPage=await regContext.newPage();regPage.setDefaultTimeout(10000);regPage.on('pageerror',e=>errors.push(e.message));
 for(const file of fs.readdirSync('lessons').filter(f=>f.endsWith('.js')&&f!=='jeongcheo.js')){
  const prior=load('lessons/'+file),route=prior.page||'korean-'+prior.id+'.html';console.log('Regression',prior.id,route);ok(fs.existsSync(route),'existing lesson route '+prior.id);
  await regPage.goto(origin+'/'+route+'#advanced-poetry');await regPage.locator('[data-ready="true"]').waitFor();eq(await regPage.locator('.poetry-library a').count(),20,'regression nav '+prior.id);
  for(let i=0;i<prior.stages.advanced.length;i++){await regPage.locator('.poetry-itemnav button').nth(i).click();await regPage.locator('input[value="'+prior.stages.advanced[i].answer+'"]').check();}
  await regPage.getByRole('button',{name:'전체 제출 · 채점',exact:true}).click();eq(await regPage.locator('.poetry-progress').innerText(),'5문항 중 5문항 정답','regression grade '+prior.id);regression++;
 }
 await regContext.close();eq(errors,[],'no page errors');console.log('VALIDATION_RESULT '+JSON.stringify({checks,preservedFiles:preserved.length,regressionLessons:regression,questions:19,advancedReasons:25,widths:[320,360,780,1100],storage:'real browser localStorage',serviceWorkers:'blocked for isolation',visualInspection:false}));await browser.close();server.close();
})().catch(error=>{console.error(error);server.close();process.exit(1);});
