const CACHE_NAME='study-pwa-v58';
const CORE=[
  './math-upload-photos7444-data.js',
  './math-upload.html?lesson=photos-7444-a',
  './math-upload.html?lesson=photos-7444-b',
  './math-upload.html?lesson=photos-7443-a',
  './math-upload.html?lesson=photos-7443-b',
  './math-upload.html?lesson=photos-7442-a',
  './math-upload.html?lesson=photos-7442-b',
  './math-upload.html?lesson=photos-7441-a',
  './math-upload.html?lesson=photos-7441-b',
  './math-upload.html?lesson=photos-7440-a',
  './math-upload.html?lesson=photos-7440-b',
  './math-upload.html?lesson=photos-7439-a',
  './math-upload.html?lesson=photos-7438-a',
  './math-upload.html?lesson=photos-7438-b',
  './korean-library.html',
  './poetry-catalog.js',
  './poetry-library.js',
  './poetry-library.css',
  './korean-reader.html',
  './poetry-batch-data.js',
  './poetry-batch.js',
  './korean-reader.html?lesson=one-star',
  './korean-reader.html?lesson=choto-one',
  './korean-reader.html?lesson=gaslight',
  './korean-reader.html?lesson=growth-rings',
  './korean-reader.html?lesson=jeongneung',
  './korean-reader.html?lesson=ferment',
  './korean-reader.html?lesson=butterfly-square',
  './korean-reader.html?lesson=dandelion',
  './korean-reader.html?lesson=that-room',
  './korean-reader.html?lesson=moonlit-night',
  './korean-reader.html?lesson=snowy-day',
  './korean-reader.html?lesson=floating-lanterns',
  './korean-reader.html?lesson=poster-dove',
  './korean-reader.html?lesson=heavy-snow',
  './korean-reader.html?lesson=summer-end',
  './korean-reader.html?lesson=late-tree',
  './korean-reader.html?lesson=farsighted',
  './korean-reader.html?lesson=tea-heart',
  './korean-reader.html?lesson=continuance',
  './korean-reader.html?lesson=rice-flower',
  './korean-reader.html?lesson=about-mountains',
  './korean-reader.html?lesson=polishing-rust',
  './korean-reader.html?lesson=anchovy',
  './korean-reader.html?lesson=supporting-post',
  './korean-reader.html?lesson=ripe-apple',
  './korean-reader.html?lesson=river-return',
  './korean-reader.html?lesson=remaining-space',
  './korean-reader.html?lesson=orchard',
  './korean-reader.html?lesson=mountain-around',
  './korean-reader.html?lesson=about-flow',
  './korean-reader.html?lesson=wonga',
  './korean-reader.html?lesson=sachinga',
  './korean-reader.html?lesson=soksamiin',
  './korean-reader.html?lesson=gyenyeoga',
  './korean-reader.html?lesson=gyususangsagok',
  './korean-reader.html?lesson=jisujeongga',
  './korean-hapgangjeong.html',
  './lessons/hapgangjeong.js',
  './korean-baekseokjeong.html',
  './lessons/baekseokjeong.js',
  './korean-mokdongga.html',
  './lessons/mokdongga.js',
  './math-upload-more-data.js',
  './math-upload.html?lesson=20261011-7425-a',
  './math-upload.html?lesson=20261011-7425-b',
  './math-upload.html?lesson=20261011-7424-a',
  './math-upload.html?lesson=20261011-7424-b',
  './math-upload.html?lesson=20261011-7423-a',
  './math-upload.html?lesson=20261011-7423-b',
  './math-upload.html?lesson=20261011-7422-a',
  './math-upload.html?lesson=20261011-7422-b',
  './math-upload.html?lesson=20261011-7421-a',
  './math-upload.html?lesson=20261011-7421-b',
  './math-upload.html?lesson=20261011-7421-c',
  './math-upload.html?lesson=20261011-7420-a',
  './math-upload.html?lesson=20261011-7420-b',
  './math-upload.html?lesson=20261011-7419-a',
  './math-upload.html?lesson=20261011-7419-b',
  './math-upload.html',
  './math-upload.js',
  './math-upload.css',
  './math-upload-data.js',
  './math-upload.html?lesson=20261011-7435-a',
  './math-upload.html?lesson=20261011-7435-b',
  './math-upload.html?lesson=20261011-7434-a',
  './math-upload.html?lesson=20261011-7434-b',
  './math-upload.html?lesson=20261011-7433-b',
  './math-upload.html?lesson=20261011-7432-a',
  './math-upload.html?lesson=20261011-7432-b',
  './math-upload.html?lesson=20261011-7432-c',
  './math-upload.html?lesson=20261011-7431-a',
  './math-upload.html?lesson=20261011-7430-a',
  './math-upload.html?lesson=20261011-7430-b',
  './math-upload.html?lesson=20261011-7429-a',
  './math-upload.html?lesson=20261011-7429-b',
  './math-upload.html?lesson=20261011-7428-a',
  './math-upload.html?lesson=20261011-7428-b',
  './math-upload.html?lesson=20261011-7427-a',
  './math-upload.html?lesson=20261011-7427-b',
  './math-upload.html?lesson=20261011-7426-a',
  './math-upload.html?lesson=20261011-7426-b',
  './korean-punggye.html',
  './lessons/punggye.js',
  './korean-monggeumpo.html',
  './lessons/monggeumpo.js',
  './korean-sangsamong.html',
  './lessons/sangsamong.js',
  './korean-halfbloom.html',
  './lessons/halfbloom.js',
  './korean-oriole.html',
  './lessons/oriole.js',
  './korean-aldervine.html',
  './lessons/aldervine.js',
  './korean-potmender.html',
  './lessons/potmender.js',
  './korean-soulwine.html',
  './lessons/soulwine.js',
  './korean-daejangbu.html',
  './lessons/daejangbu.js',
  './korean-yosun.html',
  './lessons/yosun.js',
  './korean-lotusrain.html',
  './lessons/lotusrain.js',
  './korean-duryusan.html',
  './lessons/duryusan.js',
  './korean-snowbamboo.html',
  './lessons/snowbamboo.js',
  './korean-sanmin.html',
  './lessons/sanmin.js',
  './korean-jeongcheo.html',
  './lessons/jeongcheo.js',
  './korean-seongpae.html',
  './lessons/seongpae.js',
  './korean-eobubyeolgok.html',
  './lessons/eobubyeolgok.js',
  './korean-yusanga.html',
  './lessons/yusanga.js',
  './korean-gyuwonga.html',
  './lessons/gyuwonga.js',
  './korean-myeonangjeongga.html',
  './lessons/myeonangjeongga.js',
  './korean-wolgokdapga.html',
  './lessons/wolgokdapga.js',
  './korean-daenongbu.html',
  './lessons/daenongbu.js',
  './korean-manjeonchun.html',
  './lessons/manjeonchun.js',
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
