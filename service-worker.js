const CACHE_NAME='study-pwa-v8';
const CORE=[
  './',
  './index.html',
  './problem-002.html',
  './problem-003.html',
  './problem-004.html',
  './korean.html',
  './subject-nav.js',
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

async function withSubjectNav(response){
  if(!response) return response;
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;

  const text=await response.text();
  if(text.includes('subject-nav.js') || text.includes('class="subjects"')){
    return new Response(text,{status:response.status,statusText:response.statusText,headers:response.headers});
  }

  const injected=text.replace('</body>','<script src="./subject-nav.js"></script></body>');
  return new Response(injected,{status:response.status,statusText:response.statusText,headers:response.headers});
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
        return await withSubjectNav(fresh);
      }catch(e){
        const cached=(await caches.match(event.request)) || (await caches.match('./index.html'));
        return await withSubjectNav(cached);
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
