const CACHE_NAME='study-pwa-v27';
const CORE=[
  './korean-jinjungeum.html',
  './lessons/jinjungeum.js',
  './problems/problem-001-subjective.svg',
  './korean-sangchungok.html',
  './lessons/sangchungok.js',
  './korean-manheung.html',
  './lessons/manheung.js',
  './korean-easypoem.html',
  './lessons/easypoem.js',
  './problems/geometry-11.svg',
  './problems/geometry-10.svg',
  './problems/geometry-8.svg',
  './problems/geometry-7.svg',
  './problems/geometry-5.svg',
  './problems/geometry-4.svg',
  './problem-030.html',
  './problem-029.html',
  './problem-028.html',
  './problem-027.html',
  './problem-026.html',
  './problem-025.html',
  './problems/geometry-27.svg',
  './problems/geometry-21.svg',
  './problems/geometry-20.svg',
  './problems/geometry-19.svg',
  './problems/geometry-18.svg',
  './problems/geometry-17.svg',
  './problems/geometry-16.svg',
  './problems/geometry-15.svg',
  './problems/geometry-14.svg',
  './problems/geometry-13.svg',
  './problem-024.html',
  './problem-023.html',
  './problem-022.html',
  './problem-021.html',
  './problem-020.html',
  './problem-019.html',
  './problem-018.html',
  './problem-017.html',
  './problem-016.html',
  './problem-015.html',
  './problems/geometry-38.svg',
  './problems/geometry-37.svg',
  './problems/geometry-36.svg',
  './problems/geometry-35.svg',
  './problems/geometry-34.svg',
  './problems/geometry-33.svg',
  './problems/geometry-32.svg',
  './problems/geometry-31.svg',
  './problems/geometry-30.svg',
  './problems/geometry-29.svg',
  './problem-014.html',
  './problem-013.html',
  './problem-012.html',
  './problem-011.html',
  './problem-010.html',
  './problem-009.html',
  './problem-008.html',
  './problem-007.html',
  './problem-006.html',
  './problem-005.html',
  './geometry-problem.js',
  './math-geometry.css',
  './math-geometry.html',
  './korean-samsugapsan.html',
  './lessons/samsugapsan.js',
  './korean-may.html',
  './lessons/may.js',
  './korean-paradise.html',
  './lessons/paradise.js',
  './korean-chamhuirok.html',
  './lessons/chamhuirok.js',
  './',
  './index.html',
  './problem-002.html',
  './problem-003.html',
  './problem-004.html',
  './korean.html',
  './korean-spring.html',
  './korean-flower.html',
  './poetry-nav.js',
  './poetry-lesson.js',
  './poetry-lesson.css',
  './lessons/spring.js',
  './lessons/flower.js',
  './subject-nav.js',
  './korean-advanced.js',
  './manifest.webmanifest',
  './icons/study-icon.svg',
  './icons/study-icon-192.png',
  './icons/study-icon-512.png',
  './problems/problem-001.png',
  './problems/problem-002.svg',
  './problems/problem-003.svg',
  './problems/problem-004.svg'
];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    for(const url of CORE){
      try{await cache.add(url)}catch(e){}
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

async function withStudyScripts(response,requestUrl){
  if(!response) return response;
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;

  let text=await response.text();
  if(!text.includes('subject-nav.js') && !text.includes('class="subjects"')){
    text=text.replace('</body>','<script src="./subject-nav.js"></script></body>');
  }

  const url=new URL(requestUrl);
  if((url.pathname.endsWith('/korean.html') || url.pathname==='/korean.html') && !text.includes('korean-advanced.js')){
    text=text.replace('</body>','<script src="./korean-advanced.js"></script></body>');
  }

  return new Response(text,{status:response.status,statusText:response.statusText,headers:response.headers});
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin) return;

  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request);
        const cache=await caches.open(CACHE_NAME);
        cache.put(event.request,fresh.clone());
        return await withStudyScripts(fresh,event.request.url);
      }catch(e){
        const cached=(await caches.match(event.request)) || (await caches.match('./index.html'));
        return await withStudyScripts(cached,event.request.url);
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    const network=fetch(event.request).then(async response=>{
      if(response && response.ok){
        const cache=await caches.open(CACHE_NAME);
        cache.put(event.request,response.clone());
      }
      return response;
    }).catch(()=>null);
    return cached || await network || new Response('',{status:504});
  })());
});
