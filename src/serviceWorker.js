
const ASSETS = ["test/date.test.js","test/window.test.js"]
const CACHE_NAME = 'cache-v1'

self.addEventListener("install",(e) => {
    console.log("Service Worker installing")  
    self.skipWaiting()    
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(ASSETS).catch(()=>{
    console.log('Service Worker installation failed')    
    })  
    }))    
})

self.addEventListener("activate",(e)=>{
    console.log('Service Worker activating')    
    e.waitUntil(caches.keys().then((keys)=>{
    return Promise.all(keys.map((key)=>{
        if (key.indexOf(CACHE_NAME) === -1) 
        return caches.delete(key)    
    })).catch(() => {
        console.log('Service Worker activation failed')
        })  
    }))
})

self.addEventListener('fetch',(e) => {
e.respondWith(caches.match(e.request).then((response) => {
if(response) return response
return fetch(e.request)    
}))    
})