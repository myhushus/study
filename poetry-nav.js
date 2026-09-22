(() => {
  'use strict';
  if(document.querySelector('.poetry-library'))return;
  const top=document.querySelector('main .top');if(!top)return;
  const messages={ko:{label:'시 작품 선택',gil:'김소월 · 길',spring:'이상화 · 빼앗긴 들에도 봄은 오는가',flower:'이육사 · 꽃',chamhuirok:'윤동주 · 참회록',paradise:'한용운 · 낙원은 가시덤불에서',may:'정지용 · 오월 소식',samsugapsan:'김소월 · 삼수갑산',easypoem:'윤동주 · 쉽게 씌어진 시',manheung:'윤선도 · 만흥',sangchungok:'정극인 · 상춘곡',jinjungeum:'이순신 · 진중음',manjeonchun:'작자 미상 · 만전춘별사',daenongbu:'이규보 · 농부를 대신하여 읊다'}};
  const t=key=>(messages[document.documentElement.lang]||messages.ko)[key];
  const entries=[{path:'korean.html',key:'gil'},{path:'korean-spring.html',key:'spring'},{path:'korean-flower.html',key:'flower'},{path:'korean-chamhuirok.html',key:'chamhuirok'},{path:'korean-paradise.html',key:'paradise'},{path:'korean-may.html',key:'may'},{path:'korean-samsugapsan.html',key:'samsugapsan'},{path:'korean-easypoem.html',key:'easypoem'},{path:'korean-manheung.html',key:'manheung'},{path:'korean-sangchungok.html',key:'sangchungok'},{path:'korean-jinjungeum.html',key:'jinjungeum'},{path:'korean-manjeonchun.html',key:'manjeonchun'},{path:'korean-daenongbu.html',key:'daenongbu'}];
  const filename=location.pathname.split('/').pop();if(!entries.some(x=>x.path===filename))return;
  const nav=document.createElement('nav');nav.className='poetry-library';nav.setAttribute('aria-label',t('label'));
  entries.forEach(({path,key})=>{const a=document.createElement('a');a.href=path;a.textContent=t(key);if(path===filename)a.setAttribute('aria-current','page');nav.append(a);});
  const style=document.createElement('style');style.textContent='.poetry-library{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}.poetry-library a{display:block;min-height:44px;padding:10px 13px;border:1px solid #cbd5e1;border-radius:11px;color:#334155;background:#fff;font-size:13px;line-height:1.6;text-decoration:none;overflow-wrap:anywhere}.poetry-library a[aria-current]{border-color:#2563eb;color:#1d4ed8;background:#eff6ff;font-weight:700}.poetry-library a:focus-visible{outline:3px solid #2563eb;outline-offset:3px}';
  document.head.append(style);top.after(nav);
})();
