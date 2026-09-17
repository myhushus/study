(() => {
  if (document.querySelector('.subjects')) return;

  const top = document.querySelector('.top');
  const brand = top?.querySelector('.brand');
  if (!top || !brand) return;

  const nav = document.createElement('nav');
  nav.className = 'subjects';
  nav.setAttribute('aria-label', '과목 선택');
  nav.innerHTML = `
    <a class="subject active" href="index.html" aria-current="page">수학</a>
    <a class="subject" href="korean.html">국어</a>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .subjects{display:flex;gap:8px;align-items:center}
    .subject{padding:9px 14px;border:1px solid var(--line,#e5e7eb);border-radius:12px;background:#fff;color:var(--text,#111827);font-weight:800;font-size:14px;text-decoration:none}
    .subject:hover{text-decoration:none;border-color:#93c5fd}
    .subject.active{background:var(--blue,#2563eb);border-color:var(--blue,#2563eb);color:#fff}
  `;

  document.head.appendChild(style);
  brand.replaceWith(nav);
})();
