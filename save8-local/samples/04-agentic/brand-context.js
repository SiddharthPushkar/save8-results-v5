// Preserve the selected brand across product sections without inserting URL text as HTML.
const contextBrand=new URLSearchParams(location.search).get('brand')?.trim().slice(0,100);
if(contextBrand){
 const compare=document.querySelector('#compare-form');
 if(compare){const hero=document.querySelector('.agent-hero');hero.querySelector('h1').textContent=`Compare a ${contextBrand} product`;document.querySelector('#product-url').placeholder=`Paste a ${contextBrand} product link`;hero.querySelector('.brand-prompt')?.remove();const back=document.createElement('a');back.className='context-back';back.textContent=`← ${contextBrand} sales`;back.href='../sales-calendar/index.html?brand='+encodeURIComponent(contextBrand);hero.prepend(back)}

}
