document.querySelector('[data-menu]')?.addEventListener('click',()=>document.querySelector('#prototype-menu').showModal());
document.querySelector('[data-login]')?.addEventListener('click',()=>toast('Design sample only. Sign-in is not connected.'));
if(new URLSearchParams(location.search).get('baseline')==='1'){
 document.querySelector('.home-sales')?.remove();
 document.querySelector('[data-calendar-nav]')?.remove();
 document.querySelector('.reviewbar span').textContent='Sample 01 · Homepage baseline · Source-derived layout';
 document.title='Homepage baseline · Save8 design samples';
}
if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('video').forEach(v=>{v.autoplay=false;v.pause();v.controls=true})}
