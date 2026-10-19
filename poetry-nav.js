(() => {
 'use strict';if(document.querySelector('.poetry-library'))return;
 const top=document.querySelector('main .top');if(!top)return;
 const dictionaries={ko:{label:'시 작품 선택',library:'시 전체 목록 · 검색 및 갈래 선택'}};
 const lang=document.documentElement.lang.split('-')[0],t=k=>(dictionaries[lang]||dictionaries.ko)[k];
 const nav=document.createElement('nav');nav.className='poetry-library';nav.setAttribute('aria-label',t('label'));
 const a=document.createElement('a');a.href='korean-library.html';a.textContent=t('library');nav.append(a);
 const style=document.createElement('style');style.textContent='.poetry-library{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}.poetry-library a{display:block;min-height:44px;padding:10px 13px;border:1px solid #cbd5e1;border-radius:11px;color:#1d4ed8;background:#fff;font-size:14px;line-height:1.6;text-decoration:none;overflow-wrap:anywhere}.poetry-library a:focus-visible{outline:3px solid #2563eb;outline-offset:3px}';
 document.head.append(style);top.after(nav);
})();
