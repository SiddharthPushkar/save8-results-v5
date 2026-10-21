const rail=document.querySelector('.section-rail');
const back=document.querySelector('.rail-back'),next=document.querySelector('.rail-next');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateRail(){const overflow=rail.scrollWidth>rail.clientWidth+2;back.hidden=next.hidden=!overflow;back.disabled=rail.scrollLeft<=2;next.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2}
function revealTile(tile){const left=tile.offsetLeft-rail.offsetLeft,right=left+tile.offsetWidth;if(left<rail.scrollLeft)rail.scrollLeft=left;else if(right>rail.scrollLeft+rail.clientWidth)rail.scrollLeft=right-rail.clientWidth;updateRail()}
back.addEventListener('click',()=>rail.scrollBy({left:-rail.clientWidth*.75,behavior:reduceMotion?'instant':'smooth'}));
next.addEventListener('click',()=>rail.scrollBy({left:rail.clientWidth*.75,behavior:reduceMotion?'instant':'smooth'}));
rail.addEventListener('scroll',updateRail,{passive:true});
rail.addEventListener('focusin',e=>{const tile=e.target.closest('.section-tile');if(tile)revealTile(tile)});
rail.addEventListener('keydown',e=>{const links=[...rail.querySelectorAll('a')],i=links.indexOf(document.activeElement);if(i<0)return;let target;if(e.key==='ArrowRight')target=links[Math.min(i+1,links.length-1)];if(e.key==='ArrowLeft')target=links[Math.max(i-1,0)];if(e.key==='Home')target=links[0];if(e.key==='End')target=links.at(-1);if(target){e.preventDefault();target.focus({preventScroll:true});revealTile(target)}});
new ResizeObserver(updateRail).observe(rail);
new MutationObserver(updateRail).observe(rail,{childList:true});
requestAnimationFrame(()=>{const selected=rail.querySelector('[aria-current=page]');if(selected)revealTile(selected);updateRail()});
