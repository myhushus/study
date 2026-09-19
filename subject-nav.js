(() => {
  const top=document.querySelector('.top');
  const brand=top?.querySelector('.brand');
  if(!top||!brand||document.querySelector('.subjects'))return;
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const isKorean=file.startsWith('korean');
  const isGeometry=file==='math-geometry.html'||/^problem-(00[5-9]|01[0-9]|02[0-4])\.html$/.test(file);
  const links=[
    {label:'수학',href:'index.html',active:!isKorean&&!isGeometry,title:'기존 수학 문제'},
    {label:'국어',href:'korean.html',active:isKorean,title:'국어'},
    {label:'수학',href:'math-geometry.html',active:isGeometry,title:'기하 문제'}
  ];
  const nav=document.createElement('nav');
  nav.className='subjects';nav.setAttribute('aria-label','과목 선택');
  links.forEach(x=>{const a=document.createElement('a');a.className='subject'+(x.active?' active':'');a.href=x.href;a.textContent=x.label;a.title=x.title;if(x.active)a.setAttribute('aria-current','page');nav.append(a);});
  const style=document.createElement('style');
  style.textContent='.subjects{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.subject{padding:9px 14px;border:1px solid var(--line,#e5e7eb);border-radius:12px;background:#fff;color:var(--text,#111827);font-weight:800;font-size:14px;text-decoration:none}.subject:hover{text-decoration:none;border-color:#93c5fd}.subject.active{background:var(--blue,#2563eb);border-color:var(--blue,#2563eb);color:#fff}';
  document.head.appendChild(style);brand.replaceWith(nav);
})();