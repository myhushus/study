(() => {
  'use strict';
  const mount = document.querySelector('[data-poetry-lesson]');
  if (!mount || mount.dataset.ready) return;
  const messages = {ko: {
    math:'수학', korean:'국어', subjects:'과목 선택', read:'작품', learn:'문제', direct:'실전 바로 풀기',
    reset:'이 작품 처음부터', resetConfirm:'이 작품의 학습 기록만 지울까요? 다른 작품과 수학 기록은 유지됩니다.',
    loadingError:'학습 자료를 불러오지 못했습니다. 새로고침해 주세요.', reload:'새로고침',
    priority:'학습 우선순위 · {value}', source:'원문·수록 출처', stanza:'{number}연',
    guided:'1. 이해 유도', summary:'2. 핵심 정리', general:'3. 일반 문제', exam:'4. 수능형 연습', advanced:'5. 기출 대조 실전',
    stages:'학습 단계', locked:'{label} · 이전 단계 학습 후 열림', completed:'{label} · 학습 완료',
    progress:'{number} / {total}문항', question:'{number}. {text}', option:'{number} {text}',
    check:'답 확인', reveal:'해설 확인하고 진행', next:'다음 문항', previous:'이전 문항',
    correct:'맞았습니다.', wrongHint:'다시 읽어 보세요. {hint}', answerResult:'정답 {correct} · 선택 {selected}',
    missingOne:'답을 먼저 선택하세요.', view:'〈보기〉', reference:'참고 시구',
    summaryIntro:'작은 질문에서 발견한 내용을 연결해 보세요.', toSummary:'핵심 정리로', toGeneral:'일반 문제로', toExam:'수능형 연습으로', toAdvanced:'기출 대조 실전으로',
    advancedNote:'실제 수능의 판단 구조를 대조한 창작 5지선다 문항입니다. 동일한 정답률·난도가 검증된 것은 아닙니다. 전체 제출 전에는 정답과 해설이 열리지 않습니다.',
    comparison:'(나) 비교 작품 펼쳐 보기 · {author} 〈{title}〉', primary:'(가) {author} 〈{title}〉',
    answered:'{count} / {total}문항 응답', score:'{total}문항 중 {count}문항 정답',
    unanswered:'미응답', answeredItem:'응답 완료', correctItem:'정답', wrongItem:'오답',
    itemLabel:'{number}번 · {status}', itemNav:'실전 문항 선택', submit:'전체 제출 · 채점',
    missing:'{count}문항이 남았습니다. {number}번부터 답을 선택하세요.',
    reasons:'선택지별 판단 근거', benchmark:'기출 대조 기록', benchmarkSkill:'판단할 것: {text}', benchmarkTransfer:'적용한 구조: {text}',
    record:'전체 제작·검토 기록', limits:'기출의 풀이 구조를 참고했으며, 기출의 배점·정답률을 그대로 적용한 것은 아닙니다.',
    retry:'실전 다시 풀기', retryConfirm:'이 작품의 실전 답안만 지우고 다시 풀까요?',
    storage:'이 브라우저에서는 기록을 저장할 수 없어 현재 화면에서만 학습이 유지됩니다.',
    hintFallback:'표현의 주체와 어미, 앞뒤 문맥을 다시 확인하세요.', footer:'작품마다 학습 기록이 따로 저장됩니다. 완료 표시는 문제와 해설을 확인했다는 뜻입니다.'
  }};
  const locale = document.documentElement.lang.split('-')[0];
  const dictionary = messages[locale] || messages.ko;
  const t = (key, values = {}) => (dictionary[key] || key).replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
  const el = (tag, text, cls) => {const n=document.createElement(tag); if(text!==undefined)n.textContent=text; if(cls)n.className=cls; return n;};
  const button = (text, fn, cls='') => {const b=el('button',text,cls);b.type='button';b.addEventListener('click',fn);return b;};
  const link = (text, url) => {const a=el('a',text);a.href=url;if(url.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}return a;};
  const lesson = window.STUDY_LESSONS?.[mount.dataset.poetryLesson];
  const keys = ['guided','general','exam','advanced'];
  const order = ['guided','summary','general','exam','advanced'];
  const numerals = ['①','②','③','④','⑤'];
  const valid = lesson && typeof lesson.contentId==='string' && Array.isArray(lesson.stanzas) &&
    keys.every(k=>Array.isArray(lesson.stages?.[k]) && lesson.stages[k].length>0 && lesson.stages[k].every(q=>
      typeof q.stem==='string' && Array.isArray(q.options) && q.options.length>=2 && q.options.length<=5 &&
      Number.isInteger(q.answer) && q.answer>=0 && q.answer<q.options.length &&
      (k!=='advanced' || q.options.length===5 && Array.isArray(q.reasons) && q.reasons.length===5 && q.benchmark)));
  if(!valid){mount.replaceChildren(el('p',t('loadingError')),button(t('reload'),()=>location.reload()));return;}
  mount.dataset.ready='true';
  document.title=`Study · ${lesson.author} 〈${lesson.title}〉`;
  const storageKey=`study-poetry-${lesson.id}-v1`;
  const freshBucket=k=>({index:0,answers:lesson.stages[k].map(()=>null),reviewed:lesson.stages[k].map(()=>false),attempted:lesson.stages[k].map(()=>false),submitted:false});
  const fresh=()=>({contentId:lesson.contentId,stage:'guided',summarySeen:false,buckets:Object.fromEntries(keys.map(k=>[k,freshBucket(k)]))});
  let storageAvailable=true;
  function load(){
    const base=fresh();
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey)||'null');
      if(!saved || saved.contentId!==lesson.contentId || !saved.buckets)return base;
      base.summarySeen=saved.summarySeen===true;
      keys.forEach(k=>{
        const old=saved.buckets[k];if(!old || typeof old!=='object')return;
        const b=base.buckets[k], qs=lesson.stages[k];
        b.index=Number.isInteger(old.index)?Math.max(0,Math.min(old.index,qs.length-1)):0;
        b.answers=qs.map((q,i)=>Number.isInteger(old.answers?.[i]) && old.answers[i]>=0 && old.answers[i]<q.options.length?old.answers[i]:null);
        b.reviewed=qs.map((q,i)=>old.reviewed?.[i]===true && b.answers[i]!==null);
        b.attempted=qs.map((q,i)=>old.attempted?.[i]===true && b.answers[i]!==null);
        b.submitted=k==='advanced' && old.submitted===true && b.answers.every(a=>a!==null);
      });
      if(order.includes(saved.stage))base.stage=saved.stage;
      return base;
    }catch{storageAvailable=false;return base;}
  }
  let state=load();
  const done=k=>k==='summary'?state.summarySeen:k==='advanced'?state.buckets.advanced.submitted:state.buckets[k].reviewed.every(Boolean);
  const unlocked=k=>k==='guided'||k==='advanced'||(k==='summary'?done('guided'):k==='general'?state.summarySeen:done('general'));
  if(!unlocked(state.stage))state.stage='guided';
  const top=el('header',undefined,'top');
  const subjects=el('nav',undefined,'subjects');subjects.setAttribute('aria-label',t('subjects'));
  const math=link(t('math'),'index.html');math.className='subject';
  const korean=link(t('korean'),'korean-spring.html');korean.className='subject active';korean.setAttribute('aria-current','page');subjects.append(math,korean);
  const topLinks=el('div',undefined,'toplinks');topLinks.append(link(t('read'),'#poem'),link(t('learn'),'#learn'),button(t('direct'),()=>goStage('advanced')),button(t('reset'),()=>{if(window.confirm(t('resetConfirm'))){state=fresh();save();render();question.focus();}}));top.append(subjects,topLinks);
  const hero=el('section',undefined,'poetry-hero');hero.append(el('p',lesson.ebsLabel,'poetry-eyebrow'),el('h1',`${lesson.author} 〈${lesson.title}〉`),el('p',lesson.intro),el('p',t('priority',{value:lesson.priority}),'poetry-priority'));
  const priority=el('details');priority.append(el('summary',lesson.priorityReason));hero.append(priority);
  const grid=el('div',undefined,'poetry-layout');
  const poem=el('section',undefined,'poetry-card poetry-reading');poem.id='poem';
  const poemDetails=el('details');poemDetails.open=true;const poemLabel=el('summary',t('read'));poemDetails.append(poemLabel);
  lesson.stanzas.forEach((text,i)=>{const part=el('div',undefined,'poetry-stanza');part.id=`${lesson.id}-stanza-${i+1}`;part.append(el('div',t('stanza',{number:i+1}),'poetry-stanza-number'),el('div',text,'poetry-text'));poemDetails.append(part);});
  const sources=el('details',undefined,'poetry-sources');sources.append(el('summary',t('source')),el('p',lesson.sourceNote));lesson.sources.forEach(s=>sources.append(link(s.label,s.url)));poemDetails.append(sources);poem.append(poemDetails);
  const learn=el('section',undefined,'poetry-card');learn.id='learn';
  const stageNav=el('nav',undefined,'poetry-stages');stageNav.setAttribute('aria-label',t('stages'));
  const heading=el('h2');const stageNote=el('p',undefined,'poetry-muted');
  const comparison=el('details',undefined,'poetry-comparison');comparison.append(el('summary',t('comparison',lesson.comparison)),el('p',lesson.comparison.note,'poetry-muted'),el('div',lesson.comparison.text,'poetry-text'),link(`${lesson.comparison.author} 〈${lesson.comparison.title}〉`,lesson.comparison.url));
  const progress=el('p',undefined,'poetry-progress');progress.setAttribute('role','status');
  const itemNav=el('nav',undefined,'poetry-itemnav');itemNav.setAttribute('aria-label',t('itemNav'));
  const question=el('h3');question.id='poetry-question';question.tabIndex=-1;
  const reference=el('div',undefined,'poetry-reference');const view=el('div',undefined,'poetry-view');
  const choices=el('fieldset',undefined,'poetry-options');choices.setAttribute('aria-labelledby',question.id);
  const feedback=el('section',undefined,'poetry-feedback');feedback.setAttribute('aria-live','polite');
  const actions=el('div',undefined,'poetry-actions');const notice=el('p',undefined,'poetry-notice');notice.setAttribute('role','alert');
  const storageNotice=el('p',t('storage'),'poetry-notice');
  learn.append(stageNav,heading,stageNote,comparison,progress,itemNav,question,reference,view,choices,feedback,actions,notice,storageNotice);grid.append(poem,learn);
  mount.replaceChildren(top,hero,grid,el('p',t('footer'),'poetry-footer'));
  function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));storageAvailable=true;}catch{storageAvailable=false;}storageNotice.hidden=storageAvailable;}
  function goStage(k){if(!order.includes(k)||!unlocked(k))return;state.stage=k;save();notice.textContent='';render();question.focus();}
  function go(index){const b=state.buckets[state.stage],qs=lesson.stages[state.stage];if(!b||!Number.isInteger(index)||index<0||index>=qs.length)return;b.index=index;save();notice.textContent='';render();question.focus();}
  function select(index){const b=state.buckets[state.stage];if(!b||b.submitted||b.reviewed[b.index])return;b.answers[b.index]=index;b.attempted[b.index]=false;save();notice.textContent='';choices.querySelectorAll('label').forEach((node,i)=>node.classList.toggle('selected',i===index));feedback.replaceChildren();feedback.hidden=true;renderStatus();}
  function renderStatus(){
    if(state.stage==='summary'){progress.textContent='';itemNav.replaceChildren();return;}
    const qs=lesson.stages[state.stage],b=state.buckets[state.stage];
    progress.textContent=state.stage==='advanced'?t(b.submitted?'score':'answered',{total:qs.length,count:b.submitted?qs.filter((q,i)=>b.answers[i]===q.answer).length:b.answers.filter(a=>a!==null).length}):t('progress',{number:b.index+1,total:qs.length});
    itemNav.replaceChildren();itemNav.hidden=state.stage!=='advanced';
    if(state.stage==='advanced')qs.forEach((q,i)=>{const status=b.submitted?t(b.answers[i]===q.answer?'correctItem':'wrongItem'):t(b.answers[i]===null?'unanswered':'answeredItem');const n=button(String(i+1),()=>go(i));n.setAttribute('aria-label',t('itemLabel',{number:i+1,status}));if(i===b.index)n.setAttribute('aria-current','step');itemNav.append(n);});
  }
  function showExplanation(q,b){
    feedback.hidden=false;feedback.append(el('h4',t('answerResult',{correct:numerals[q.answer],selected:numerals[b.answers[b.index]]})),el('p',q.explanation));
    if(q.reasons){feedback.append(el('h4',t('reasons')));const list=el('ol',undefined,'poetry-reasons');q.reasons.forEach((reason,i)=>list.append(el('li',t('option',{number:numerals[i],text:reason}))));feedback.append(list);}
    if(q.benchmark){const record=el('details',undefined,'poetry-benchmark');record.append(el('summary',t('benchmark')),link(q.benchmark.label,q.benchmark.url),el('p',t('benchmarkSkill',{text:q.benchmark.skill})),el('p',t('benchmarkTransfer',{text:q.benchmark.transfer})),el('p',t('limits')),link(t('record'),lesson.recordUrl));feedback.append(record);}
  }
  function render(){
    storageNotice.hidden=storageAvailable;stageNav.replaceChildren();
    order.forEach(k=>{const n=button(t(k),()=>goStage(k));n.disabled=!unlocked(k);if(k===state.stage)n.setAttribute('aria-current','step');n.setAttribute('aria-label',!unlocked(k)?t('locked',{label:t(k)}):done(k)?t('completed',{label:t(k)}):t(k));stageNav.append(n);});
    heading.textContent=t(state.stage);stageNote.textContent=state.stage==='advanced'?t('advancedNote'):'';comparison.hidden=state.stage!=='advanced';poemLabel.textContent=state.stage==='advanced'?t('primary',lesson):t('read');
    reference.hidden=true;view.hidden=true;choices.replaceChildren();feedback.replaceChildren();feedback.hidden=true;actions.replaceChildren();renderStatus();
    if(state.stage==='summary'){
      question.textContent=t('summaryIntro');const dl=el('dl',undefined,'poetry-summary');lesson.summary.forEach(([title,text])=>dl.append(el('dt',title),el('dd',text)));feedback.append(dl);feedback.hidden=false;
      actions.append(button(t('toGeneral'),()=>{state.summarySeen=true;save();goStage('general');},'primary'));return;
    }
    const qs=lesson.stages[state.stage],b=state.buckets[state.stage],q=qs[b.index];
    question.textContent=t('question',{number:b.index+1,text:q.stem});
    reference.hidden=!q.reference;reference.textContent=q.reference?t('reference')+'\n'+q.reference:'';
    view.hidden=!q.view;view.textContent=q.view?t('view')+'\n'+q.view:'';
    const reviewed=state.stage==='advanced'?b.submitted:b.reviewed[b.index];
    q.options.forEach((text,i)=>{const label=el('label',undefined,'poetry-option');const input=document.createElement('input');input.type='radio';input.name='poetry-answer';input.value=String(i);input.checked=b.answers[b.index]===i;input.disabled=reviewed;input.addEventListener('change',()=>select(i));label.classList.toggle('selected',input.checked);if(reviewed){label.classList.toggle('correct',i===q.answer);label.classList.toggle('wrong',input.checked&&i!==q.answer);}label.append(input,el('span',t('option',{number:numerals[i],text})));choices.append(label);});
    if(reviewed)showExplanation(q,b);
    else if(state.stage==='guided'&&b.attempted[b.index]){feedback.hidden=false;feedback.append(el('p',t('wrongHint',{hint:q.hint||t('hintFallback')})));}
    const previous=button(t('previous'),()=>go(b.index-1));previous.disabled=b.index===0;actions.append(previous);
    if(state.stage==='advanced'){
      const next=button(t('next'),()=>go(b.index+1));next.disabled=b.index===qs.length-1;actions.append(next);
      if(!b.submitted)actions.append(button(t('submit'),submit,'primary'));
      else actions.append(button(t('retry'),()=>{if(window.confirm(t('retryConfirm'))){state.buckets.advanced=freshBucket('advanced');save();render();question.focus();}}));
    }else{
      if(!reviewed){actions.append(button(t('check'),()=>check(false),'primary'));if(state.stage==='guided'&&b.attempted[b.index])actions.append(button(t('reveal'),()=>check(true)));}
      else{const nextLabel=b.index<qs.length-1?'next':state.stage==='guided'?'toSummary':state.stage==='general'?'toExam':'toAdvanced';actions.append(button(t(nextLabel),()=>{if(b.index<qs.length-1)go(b.index+1);else goStage(state.stage==='guided'?'summary':state.stage==='general'?'exam':'advanced');},'primary'));}
    }
  }
  function check(reveal){
    if(state.stage==='summary'||state.stage==='advanced')return;
    const b=state.buckets[state.stage],q=lesson.stages[state.stage][b.index];if(b.answers[b.index]===null){notice.textContent=t('missingOne');return;}
    if(b.reviewed[b.index])return;b.attempted[b.index]=true;
    if(state.stage!=='guided'||b.answers[b.index]===q.answer||reveal)b.reviewed[b.index]=true;
    save();notice.textContent='';render();
  }
  function submit(){
    if(state.stage!=='advanced')return;const b=state.buckets.advanced;if(b.submitted)return;
    const missing=b.answers.findIndex(a=>a===null);if(missing!==-1){go(missing);notice.textContent=t('missing',{count:b.answers.filter(a=>a===null).length,number:missing+1});return;}
    b.submitted=true;b.index=0;save();notice.textContent='';render();question.focus();
  }
  render();
  if(location.hash==='#advanced-poetry')goStage('advanced');
  if('serviceWorker' in navigator)navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
})();
