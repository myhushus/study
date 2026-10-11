/* Shared free-response renderer. Local grading with bounded arithmetic parsing. */
(() => {
  'use strict';
  const messages={ko:{
    math:'수학',korean:'국어',batch:'2026-10-11 추가 문제',count:'{count}문항 · 주관식',source:'{source} · 원문 전사',
    previous:'이전 문제',next:'다음 문제',list:'문제 목록',original:'원문',originalLink:'원문으로',restart:'이 문제 처음부터',resetConfirm:'이 문제의 진도와 입력한 답만 지울까요?',
    check:'정답 확인',input:'정답 입력',placeholder:'답을 입력하세요',format:'여러 값을 요구하면 문제에서 정한 순서대로 쉼표로 구분하세요. 분수와 근호 식도 입력할 수 있습니다.',
    branch:'개념 {n}',helpTitle:'도움 문제 {n}',lower:'더 쉬운 보조문제',stages:'학습 단계',
    wrong:'아직 정답이 아닙니다. 필요한 개념을 작은 문제로 확인해 보세요.',retryMessage:'아직 정답이 아닙니다. 힌트를 확인하고 다시 생각해 보세요.',correct:'정답입니다.',solved:'정답입니다. 이 문제를 완료했습니다.',
    down:'보조문제 풀기',easier:'더 쉬운 문제 풀기',up:'상위 문제로',returnOriginal:'원문 재도전',retry:'다시 풀기',missing:'답을 먼저 입력하세요.',solution:'전체 풀이',hint:'힌트',
    storage:'이 브라우저에서는 진도를 저장할 수 없습니다. 현재 화면에서는 계속 학습할 수 있습니다.',loadError:'학습 자료를 불러오지 못했습니다. 문제 목록에서 다시 열어 주세요.',unknown:'찾을 수 없는 문제입니다. 문제 목록에서 다시 선택해 주세요.',
    install:'앱 설치',installed:'현재 앱으로 실행 중입니다.',installClose:'닫기',installIOS:'Safari의 공유 메뉴에서 홈 화면에 추가를 선택하세요.',installWait:'이 화면에서는 아직 브라우저 설치창을 사용할 수 없습니다. 일반 브라우저 탭에서 열고 잠시 후 다시 시도하세요. 설치가 끝난 기기에서는 설치된 Study 아이콘으로 실행하세요.',installError:'설치창을 열지 못했습니다. 잠시 후 다시 시도하세요.',
    offlineCheck:'오프라인 자료 확인',offlineWait:'추가 문제의 오프라인 자료를 확인하고 있습니다.',offlineReady:'추가된 {count}문항의 오프라인 자료 저장이 확인되었습니다.',offlinePending:'일부 자료가 아직 저장되지 않았습니다. 온라인에서 잠시 기다린 뒤 다시 확인하세요.',offlineUnsupported:'이 환경에서는 오프라인 자료 저장 상태를 확인할 수 없습니다.',
    footer:'오답이면 보조문제로 내려가고 정답이면 상위 문제로 돌아갑니다. 진도는 이 브라우저에 저장됩니다.'
  }};
  const dict=messages[document.documentElement.lang.split('-')[0]]||messages.ko;
  const t=(key,values={})=>(dict[key]||key).replace(/\{(\w+)\}/g,(_,k)=>String(values[k]??''));
  const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  const btn=(label,action,cls='')=>{const b=el('button',label,cls);b.type='button';b.addEventListener('click',action);return b;};
  const link=(label,url)=>{const a=el('a',label);a.href=url;return a;};
  const href=id=>'math-upload.html?lesson='+encodeURIComponent(id);
  const pack=window.STUDY_UPLOAD_PACK;
  const valid=pack&&Array.isArray(pack.lessons)&&pack.lessons.length>0&&new Set(pack.lessons.map(p=>p.id)).size===pack.lessons.length&&pack.lessons.every(p=>
    typeof p.id==='string'&&typeof p.title==='string'&&typeof p.prompt==='string'&&typeof p.answer==='string'&&Array.isArray(p.solution)&&Array.isArray(p.branches)&&p.branches.length===3&&p.branches.every(b=>
      typeof b.q==='string'&&typeof b.a==='string'&&b.child&&typeof b.child.q==='string'&&typeof b.child.a==='string'));
  document.querySelectorAll('[data-upload-i18n]').forEach(n=>{n.textContent=t(n.dataset.uploadI18n);});
  const library=document.querySelector('[data-upload-library]');
  if(library){
    library.replaceChildren(el('h2',t('batch')),el('p',valid?t('count',{count:pack.lessons.length}):t('loadError')));
    if(valid){const grid=el('div',undefined,'upload-library-grid');pack.lessons.forEach(p=>{const a=link('',href(p.id));a.className='upload-library-card';a.append(el('strong',p.title),el('span',p.source));grid.append(a);});library.append(grid);}
  }
  const mount=document.querySelector('[data-upload-lesson]');if(!mount)return;
  if(!valid){mount.replaceChildren(el('p',t('loadError')),link(t('list'),'math-geometry.html'));return;}
  const id=new URLSearchParams(location.search).get('lesson')||pack.lessons[0].id;
  const index=pack.lessons.findIndex(p=>p.id===id),p=pack.lessons[index];
  if(!p){mount.replaceChildren(el('p',t('unknown')),link(t('list'),'math-geometry.html'));return;}
  document.title='Study · '+p.title;
  const storageKey='study-upload-'+p.id;
  const nodeIds=['root',...p.branches.flatMap((_,i)=>['b'+(i+1)+'_1','b'+(i+1)+'_2'])];
  const fresh=()=>({version:pack.version,current:'root',done:[],solved:false,drafts:{}});
  let storageOK=true,state=fresh();
  try{
    const saved=JSON.parse(localStorage.getItem(storageKey)||'null');
    if(saved&&saved.version===pack.version){
      if(nodeIds.includes(saved.current))state.current=saved.current;
      state.done=Array.isArray(saved.done)?[...new Set(saved.done.filter(n=>[1,2,3].includes(n)))]:[];
      state.solved=saved.solved===true;
      nodeIds.forEach(k=>{if(typeof saved.drafts?.[k]==='string')state.drafts[k]=saved.drafts[k].slice(0,500);});
    }
  }catch{storageOK=false;}
  if(nodeIds.includes(location.hash.slice(1)))state.current=location.hash.slice(1);
  const normalize=text=>String(text).normalize('NFKC').toLowerCase().replace(/[−–－]/g,'-').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/\s+/g,'');
  function numeric(text){
    const source=normalize(text);if(!source||source.length>200)return null;
    const tokens=source.match(/sqrt|pi|(?:\d+(?:\.\d*)?|\.\d+)|[()+\-*/^]/g)||[];
    if(tokens.join('')!==source||tokens.length>120)return null;
    let i=0,depth=0;const number=/^(?:\d+(?:\.\d*)?|\.\d+)$/;
    const start=v=>v==='('||v==='sqrt'||v==='pi'||number.test(v||'');
    const checked=v=>{if(!Number.isFinite(v)||Math.abs(v)>1e100)throw Error('range');return v;};
    function primary(){
      if(++depth>30)throw Error('depth');let v,x=tokens[i++];
      if(number.test(x||''))v=Number(x);else if(x==='pi')v=Math.PI;
      else if(x==='sqrt'){v=primary();if(v<0)throw Error('domain');v=Math.sqrt(v);}
      else if(x==='('){v=expression();if(tokens[i++]!==')')throw Error('bracket');}else throw Error('token');
      depth--;return checked(v);
    }
    function power(){let v=primary();if(tokens[i]==='^'){i++;const e=unary();if(Math.abs(e)>100)throw Error('exponent');v=checked(v**e);}return v;}
    function unary(){if(tokens[i]==='+'){i++;return unary();}if(tokens[i]==='-'){i++;return -unary();}return power();}
    function term(){let v=unary();while(i<tokens.length){const op=tokens[i];if(op==='*'||op==='/'){i++;const w=unary();if(op==='/'&&w===0)throw Error('zero');v=checked(op==='*'?v*w:v/w);}else if(start(op))v=checked(v*unary());else break;}return v;}
    function expression(){let v=term();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++],w=term();v=checked(op==='+'?v+w:v-w);}return v;}
    try{const value=expression();return i===tokens.length?checked(value):null;}catch{return null;}
  }
  function parts(value){let s=normalize(value).replace(/，/g,',');if(s.startsWith('(')&&s.endsWith(')')&&s.includes(','))s=s.slice(1,-1);return s.split(',');}
  function matches(expected,input){const a=parts(expected),b=parts(input);if(a.length!==b.length)return false;return a.every((x,i)=>{if(x===b[i])return true;const n=numeric(x),m=numeric(b[i]);return n!==null&&m!==null&&Math.abs(n-m)<=1e-10*Math.max(1,Math.abs(n));});}
  window.STUDY_MATH_INPUT=Object.freeze({numeric,matches});
  const top=el('div',undefined,'upload-tools');
  if(index>0)top.append(link(t('previous'),href(pack.lessons[index-1].id)));
  if(index<pack.lessons.length-1)top.append(link(t('next'),href(pack.lessons[index+1].id)));
  top.append(link(t('list'),'math-geometry.html#uploads-20261011'));
  const original=btn(t('originalLink'),()=>go('root'));
  top.append(original,btn(t('restart'),()=>{if(confirm(t('resetConfirm'))){state=fresh();save();render();heading.focus();}}));
  const sheet=el('article',undefined,'upload-sheet'),source=el('p',t('source',{source:p.source}),'upload-source'),heading=el('h1');heading.tabIndex=-1;
  const progress=el('nav',undefined,'upload-progress');progress.setAttribute('aria-label',t('stages'));
  const question=el('div',undefined,'upload-question');question.id='upload-question';
  const hint=el('details',undefined,'upload-hint');hint.append(el('summary',t('hint')));const hintText=el('p');hint.append(hintText);
  const form=el('form',undefined,'upload-answer'),label=el('label',t('input'));label.htmlFor='upload-input';
  const input=el('input');input.id='upload-input';input.autocomplete='off';input.spellcheck=false;input.maxLength=500;input.setAttribute('aria-describedby','upload-format');input.placeholder=t('placeholder');
  const check=el('button',t('check'),'upload-primary');check.type='submit';const format=el('p',t('format'),'upload-format');format.id='upload-format';form.append(label,input,check);
  const feedback=el('p',undefined,'upload-feedback');feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
  const actions=el('div',undefined,'upload-actions'),solution=el('section',undefined,'upload-solution'),storage=el('p',t('storage'),'upload-notice');storage.setAttribute('role','alert');
  const offline=el('div',undefined,'upload-offline'),offlineText=el('p',t('offlineWait'));offlineText.setAttribute('role','status');
  offline.append(offlineText,btn(t('offlineCheck'),()=>checkOffline()));
  sheet.append(source,heading,progress,question,hint,form,format,feedback,actions,solution,storage);
  mount.replaceChildren(top,sheet,offline,el('p',t('footer'),'upload-footer'));
  function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}storage.hidden=storageOK;}
  function current(){if(state.current==='root')return{q:p.prompt,a:p.answer,title:p.title,branch:0,parent:null};const[,b,l]=/^b([123])_([12])$/.exec(state.current),branch=Number(b),level=Number(l),data=p.branches[branch-1];return{...(level===1?data:data.child),title:level===1?t('helpTitle',{n:b}):t('lower'),branch,parent:level===1?'root':'b'+b+'_1',child:level===1?'b'+b+'_2':null,level};}
  function render(){
    const q=current();original.hidden=state.current==='root';heading.textContent=q.title;question.textContent=q.q;hint.hidden=!q.h;hint.open=false;hintText.textContent=q.h||'';progress.replaceChildren();
    [0,1,2,3].forEach(b=>{const chip=el('span',b?t('branch',{n:b}):t('original'));chip.className=b===q.branch?'current':state.done.includes(b)?'done':'';if(b===q.branch)chip.setAttribute('aria-current','step');progress.append(chip);});
    input.value=state.drafts[state.current]||'';feedback.textContent='';feedback.className='upload-feedback';actions.replaceChildren();solution.replaceChildren();solution.hidden=!(state.solved&&state.current==='root');
    if(!solution.hidden){solution.append(el('h2',t('solution')));p.solution.forEach(s=>solution.append(el('p',s)));}storage.hidden=storageOK;
    try{history.replaceState(null,'','#'+state.current);}catch{}
  }
  function go(id){if(!nodeIds.includes(id))return;state.current=id;save();render();heading.focus();}
  input.addEventListener('input',()=>{state.drafts[state.current]=input.value;save();});
  form.addEventListener('submit',event=>{
    event.preventDefault();actions.replaceChildren();const q=current(),value=input.value.trim();if(!value){feedback.textContent=t('missing');input.focus();return;}state.drafts[state.current]=input.value;
    if(matches(q.a,value)){
      feedback.className='upload-feedback good';feedback.textContent=t(q.branch?'correct':'solved');
      if(!q.branch){state.solved=true;solution.hidden=false;solution.replaceChildren(el('h2',t('solution')));p.solution.forEach(s=>solution.append(el('p',s)));}
      else{if(q.level===1)state.done=[...new Set([...state.done,q.branch])];actions.append(btn(t(q.parent==='root'?'returnOriginal':'up'),()=>go(q.parent),'upload-primary'));}save();
    }else{
      feedback.className='upload-feedback bad';feedback.textContent=t(q.child||!q.branch?'wrong':'retryMessage');
      if(!q.branch){const b=[1,2,3].find(n=>!state.done.includes(n))||3;actions.append(btn(t('down'),()=>go('b'+b+'_1'),'upload-primary'));}
      else if(q.child)actions.append(btn(t('easier'),()=>go(q.child),'upload-primary'));else{hint.open=true;actions.append(btn(t('retry'),()=>{feedback.textContent='';actions.replaceChildren();input.focus();}));}save();
    }
  });
  render();
  let deferred=null;
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferred=event;});
  window.addEventListener('appinstalled',()=>{deferred=null;});
  const dialog=document.querySelector('#upload-install-dialog'),install=document.querySelector('#upload-install');
  if(dialog&&install){
    const dialogText=dialog.querySelector('p');dialog.querySelector('button').textContent=t('installClose');
    const showDialog=message=>{dialogText.textContent=message;if(!dialog.open)dialog.showModal();};
    install.addEventListener('click',async()=>{
      if(matchMedia('(display-mode: standalone)').matches||navigator.standalone===true){showDialog(t('installed'));return;}
      if(deferred){const event=deferred;deferred=null;try{await event.prompt();await event.userChoice;}catch{showDialog(t('installError'));}return;}
      const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);showDialog(t(ios?'installIOS':'installWait'));
    });
  }
  async function checkOffline(){
    if(!('serviceWorker'in navigator)||!('caches'in window)){offlineText.textContent=t('offlineUnsupported');return false;}
    try{
      if(!navigator.serviceWorker.controller){offlineText.textContent=t('offlinePending');return false;}
      const required=['math-upload.html','math-upload.css','math-upload.js','math-upload-data.js',...(pack.assets||[]),...pack.lessons.map(p=>href(p.id))];
      const stored=await Promise.all(required.map(path=>caches.match(new URL(path,location.href).href)));const ok=stored.every(Boolean);
      offlineText.textContent=t(ok?'offlineReady':'offlinePending',{count:pack.lessons.length});return ok;
    }catch{offlineText.textContent=t('offlineUnsupported');return false;}
  }
  if('serviceWorker'in navigator){navigator.serviceWorker.register('./service-worker.js').then(async registration=>{registration.update().catch(()=>{});for(let attempt=0;attempt<15;attempt++){if(await checkOffline())break;await new Promise(resolve=>setTimeout(resolve,1500));}}).catch(()=>{offlineText.textContent=t('offlineUnsupported');});}else offlineText.textContent=t('offlineUnsupported');
})();
