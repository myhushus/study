/* Deterministic companion practice: editorial concepts, not republished poem text. */
(() => {
'use strict';
const dictionaries={ko:{
 sourceTitle:'내용 대조 자료 {number}',catalogSource:'수록 범위·검토 기록',
 sourceNote:'2027 EBS 수능특강 문학의 공개 주요 작품 목록과 작품별 공개 자료를 대조했습니다. 교재의 전체 지면이나 모든 보기 지문을 직접 판독한 자료는 아닙니다. 시 전문·외부 현대어 번역·외부 문제를 재게시하지 않습니다. 독해 진술과 비교 글은 자체 작성했습니다. 교재의 발췌 범위와 대조 자료의 범위가 다를 수 있습니다.',
 mode:'2027 EBS 수능특강 문학 · {unit} · 교재 병행',
 guided:'{focus}: 작품을 이해한 내용으로 가장 적절한 것은?',hint:'교재에서 {focus}에 해당하는 부분을 찾고 표현의 주체·상황·어미를 확인하세요.',
 general:'작품에 대한 설명으로 가장 적절한 것은?',negative:'작품에 대한 설명으로 적절하지 않은 것은?',theme:'작품 전체의 지향을 정리한 내용으로 가장 적절한 것은?',scope:'다섯 설명 중 작품의 근거를 벗어난 것은?',
 review:'다음 학습 메모를 고친 내용으로 가장 적절한 것은?',draft:'검토 대상 학습 메모 (시 원문 아님)\n{draft}',
 compare:'(가)의 학습 대상과 (나)의 비교 관점을 모두 바르게 이해한 것은?',compound:'(가) {first}\n(나) {second}',
 judgement:'〈보기〉의 학습 메모 중 적절한 것만 고른 것은?',viewPrefix:'자체 작성한 독해 진술입니다. 시의 직접 인용이 아닙니다.',just:'{labels}만 적절하다.',
 correctReason:'적절한 판단: {right} {why}',wrongReason:'고쳐야 할 판단입니다. {right} {why}',pairReason:'적절한 진술은 {labels}입니다. {detail}',
 conclusion:'핵심 정리: {thesis}',summaryTitle:'전체 지향',invalid:'해당 작품을 찾을 수 없습니다. 전체 목록에서 다시 선택해 주세요.',unavailable:'학습 데이터를 불러오지 못했습니다. 새로고침하거나 전체 목록으로 돌아가 주세요.',library:'시 전체 목록',reload:'새로고침',compareNote:'아래는 비교 작품의 자체 작성 독해 관점입니다. 시 원문이나 번역문이 아닙니다.\n{right}\n{why}'
}};
const locale=typeof document==='undefined'?'ko':document.documentElement.lang.split('-')[0];
const dict=dictionaries[locale]||dictionaries.ko;const t=(key,values={})=>(dict[key]||key).replace(/\{(\w+)\}/g,(_,k)=>String(values[k]??''));
const input=window.STUDY_BATCH_DATA;const text=x=>typeof x==='string'&&x.trim().length>0;
function isRecord(r){return r&&/^[a-z][a-z0-9-]*$/.test(r.id)&&['title','author','thesis','wrongThesis','unit'].every(k=>text(r[k]))&&Array.isArray(r.sources)&&r.sources.length>0&&r.sources.every(x=>/^https:\/\//.test(x))&&r.points?.length===8&&r.points.every(p=>['focus','right','wrong','why'].every(k=>text(p[k]))&&p.right!==p.wrong)&&!!input?.comparisons?.[r.compare];}
function shuffle(values,key){let seed=2166136261;for(const ch of key)seed=Math.imul(seed^ch.codePointAt(0),16777619)>>>0;const a=values.slice();for(let i=a.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
const explain=(p,truth)=>t(truth?'correctReason':'wrongReason',p);
const option=(p,truth,correct)=>({text:truth?p.right:p.wrong,correct,reason:explain(p,truth)});
function question(id,stem,options,extra={}){const a=shuffle(options,id);if(new Set(a.map(x=>x.text)).size!==a.length||a.filter(x=>x.correct).length!==1)throw new Error('INVALID_QUESTION_OPTIONS');return {id,stem,options:a.map(x=>x.text),answer:a.findIndex(x=>x.correct),explanation:a.find(x=>x.correct).reason,reasons:a.map(x=>x.reason),practiceBasis:{type:'authored-concept'},...extra};}
function buildLesson(id){
 if(!input||!Array.isArray(input.records))throw new Error('BATCH_UNAVAILABLE');
 const matches=input.records.filter(x=>x.id===id);if(matches.length!==1||!isRecord(matches[0]))throw new Error('UNKNOWN_LESSON');
 const r=matches[0],p=r.points,c=input.comparisons[r.compare];const q=(suffix,stem,options,extra)=>question(`${r.id}-${suffix}`,stem,options,extra);
 function claims(suffix,indices,selected,negative=false){return q(suffix,t(negative?'negative':'general'),indices.map((n,i)=>option(p[n],negative?i!==selected:i===selected,i===selected)));}
 function judgment(suffix,indices,truths){const labels=['ㄱ','ㄴ','ㄷ'];const correct=truths.reduce((a,v,i)=>a|(v?1<<i:0),0);const names=mask=>labels.filter((_,i)=>mask&(1<<i)).join('·');const masks=[correct,...shuffle([1,2,3,4,5,6,7].filter(x=>x!==correct),r.id+suffix+'masks').slice(0,4)];const detail=indices.map((n,i)=>labels[i]+': '+explain(p[n],truths[i])).join('\n');return q(suffix,t('judgement'),masks.map(mask=>({text:t('just',{labels:names(mask)}),correct:mask===correct,reason:t('pairReason',{labels:names(correct),detail})})),{view:t('viewPrefix')+'\n'+indices.map((n,i)=>`${labels[i]}. ${truths[i]?p[n].right:p[n].wrong}`).join('\n')});}
 const guided=p.map((point,i)=>q(`g${i+1}`,t('guided',point),[option(point,true,true),option(point,false,false),option(p[(i+3)%8],false,false)],{hint:t('hint',point)}));
 const general=[claims('n1',[0,1,2,3,4],2),claims('n2',[3,4,5,6,7],1,true),claims('n3',[1,3,4,5,7],4)];
 const exam=[judgment('e1',[0,2,4],[true,false,true]),judgment('e2',[1,5,6],[false,true,true]),q('e3',t('review'),[option(p[3],true,true),...[0,2,5,7].map(n=>option(p[n],false,false))],{view:t('draft',{draft:p[3].wrong})})];
 const advanced=[{...claims('a1',[0,2,3,5,7],3,true),stem:t('scope')},judgment('a2',[2,4,7],[true,true,false]),q('a3',t('review'),[option(p[6],true,true),...[1,2,3,4].map(n=>option(p[n],false,false))],{view:t('draft',{draft:p[6].wrong})}),
 q('a4',t('compare'),[
 {text:t('compound',{first:r.thesis,second:c.right}),correct:true,reason:t('conclusion',r)+' '+c.why},
 {text:t('compound',{first:r.wrongThesis,second:c.right}),correct:false,reason:t('conclusion',r)+' '+c.why},
 {text:t('compound',{first:r.thesis,second:c.wrong}),correct:false,reason:explain(c,false)},
 {text:t('compound',{first:p[4].wrong,second:c.wrong}),correct:false,reason:explain(p[4],false)+' '+explain(c,false)},
 {text:t('compound',{first:p[7].wrong,second:c.right}),correct:false,reason:explain(p[7],false)}]),
 q('a5',t('theme'),[{text:r.thesis,correct:true,reason:t('conclusion',r)},{text:r.wrongThesis,correct:false,reason:t('conclusion',r)},...[0,3,6].map(n=>option(p[n],false,false))])];
 return {id:r.id,contentId:`${r.id}-${input.version}`,page:'korean-reader.html?lesson='+encodeURIComponent(r.id),title:r.title,author:r.author,readingMode:'textbook',readingNote:r.note,ebsLabel:t('mode',{unit:r.unit}),stanzaLabel:'passage',stanzas:[],sourceNote:t('sourceNote'),sources:r.sources.map((url,i)=>({label:t('sourceTitle',{number:i+1}),url})).concat([{label:t('catalogSource'),url:'docs/korean-all-2027-review.md'}]),summary:[[t('summaryTitle'),r.thesis],...p.map(x=>[x.focus,x.right+' '+x.why])],comparison:{title:c.title,author:c.author,url:c.url,text:t('compareNote',c),isCommentary:true},recordUrl:'docs/korean-all-2027-review.md',stages:{guided,general,exam,advanced}};
}
window.STUDY_BATCH=Object.freeze({buildLesson,isRecord});if(typeof document==='undefined')return;
const mount=document.querySelector('[data-lesson-mode="textbook"]');if(!mount||mount.dataset.batchReady)return;
function fail(key){mount.removeAttribute('data-poetry-lesson');const p=document.createElement('p');p.textContent=t(key);p.setAttribute('role','alert');const a=document.createElement('a');a.href='korean-library.html';a.textContent=t('library');const b=document.createElement('button');b.type='button';b.textContent=t('reload');b.addEventListener('click',()=>location.reload());mount.replaceChildren(p,a,b);}
try{const id=new URLSearchParams(location.search).get('lesson');if(!id){fail('invalid');return;}const lesson=buildLesson(id);window.STUDY_LESSONS=window.STUDY_LESSONS||{};window.STUDY_LESSONS[id]=lesson;mount.dataset.poetryLesson=id;mount.dataset.batchReady='true';}catch(error){fail(error.message==='UNKNOWN_LESSON'?'invalid':'unavailable');}
})();
