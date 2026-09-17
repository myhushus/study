(() => {
  'use strict';
  if(document.querySelector('.poetry-library'))return;
  const top=document.querySelector('main .top');if(!top)return;
  const messages={ko:{label:'시 작품 선택',gil:'김소월 · 길',spring:'이상화 · 빼앗긴 들에도 봄은 오는가'}};
  const t=key=>(messages[document.documentElement.lang]||messages.ko)[key];
  const entries=[{path:'korean.html',key:'gil'},{path:'korean-spring.html',key:'spring'}];
  const filename=location.pathname.split('/').pop();if(!entries.some(x=>x.path===filename))return;
  const nav=document.createElement('nav');nav.className='poetry-library';nav.setAttribute('aria-label',t('label'));
  entries.forEach(({path,key})=>{const a=document.createElement('a');a.href=path;a.textContent=t(key);if(path===filename)a.setAttribute('aria-current','page');nav.append(a);});
  const style=document.createElement('style');style.textContent='.poetry-library{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}.poetry-library a{display:block;min-height:44px;padding:10px 13px;border:1px solid #cbd5e1;border-radius:11px;color:#334155;background:#fff;font-size:13px;line-height:1.6;text-decoration:none;overflow-wrap:anywhere}.poetry-library a[aria-current]{border-color:#2563eb;color:#1d4ed8;background:#eff6ff;font-weight:700}.poetry-library a:focus-visible{outline:3px solid #2563eb;outline-offset:3px}';
  document.head.append(style);top.after(nav);
})();
