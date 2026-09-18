const CACHE_NAME='study-pwa-v15';
const CORE=[
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
