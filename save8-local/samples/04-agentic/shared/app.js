const icons={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',check:'<path d="m5 12 4 4L19 6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>'};
function icon(name){return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.arrow}</svg>`}
function readPreference(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function writePreference(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
document.documentElement.dataset.theme=readPreference('save8-prototype-theme','light');
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
document.querySelector('[data-theme-toggle]')?.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;writePreference('save8-prototype-theme',theme)});
let toastTimer;
function toast(message){const el=document.querySelector('[role=status]');el.textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.textContent='',4200)}
