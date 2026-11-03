const C='entry-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>fetch(e.request,{cache:'reload'}).then(res=>{c.put(e.request,res.clone());return res}).catch(()=>r||c.match('/index.html')))))});
