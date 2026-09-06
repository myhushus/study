const CACHE_NAME='study-pwa-v2';
const CORE=[
  './',
  './index.html',
  './problem-002.html',
  './manifest.webmanifest',
  './icons/study-icon.svg',
  './icons/study-icon-192.png',
  './icons/study-icon-512.png',
  './problems/problem-001.png',
  './problems/problem-002.svg'
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
        return fresh;
      }catch(e){
        return (await caches.match(event.request)) || (await caches.match('./index.html'));
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
