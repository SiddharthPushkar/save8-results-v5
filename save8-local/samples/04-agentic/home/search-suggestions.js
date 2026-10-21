// Type-ahead for the Agent8 search bar: product-name suggestions in a keyboard-navigable
// listbox. Falls back to the existing paste-a-URL flow untouched whenever the input looks
// like a URL. Only shows once there's something typed — see PRODUCT-NOTES.md.
(function(){
  const form=document.querySelector('#compare-form');
  const input=document.querySelector('#product-url');
  const shell=document.querySelector('.search-shell');
  const panel=document.querySelector('#search-suggestions');
  if(!form||!input||!shell||!panel)return;

  // The panel sits outside <header>, which clips (overflow:hidden) for the curved tab rail,
  // so its screen position is computed here rather than anchored via CSS alone. It's
  // position:fixed (viewport-relative, like getBoundingClientRect) so it tracks correctly
  // whether the search bar lives in the hero (normal flow) or the bottom compose bar (itself
  // position:fixed) — no scrollY math needed either way, and it stays put under scroll.
  // When the bar is at the bottom of the screen there's no room below it, so the panel opens
  // upward instead.
  function positionPanel(){
    const rect=shell.getBoundingClientRect();
    const anchorAbove=!!shell.closest('.compose-bar, .brand-compare-section');
    panel.style.left=rect.left+'px';
    panel.style.width=rect.width+'px';
    panel.style.maxHeight=Math.max(80,anchorAbove?rect.top-20:window.innerHeight-rect.bottom-20)+'px';
    if(anchorAbove){
      panel.style.bottom=(window.innerHeight-rect.top+10)+'px';
      panel.style.top='auto';
    } else {
      panel.style.top=(rect.bottom+10)+'px';
      panel.style.bottom='auto';
    }
  }
  window.addEventListener('resize',()=>{if(!panel.hidden)positionPanel()});
  window.addEventListener('scroll',()=>{if(!panel.hidden)positionPanel()},{passive:true});

  let currentItems=[];
  let activeIndex=-1;

  function isProductUrl(value){
    const trimmed=value.trim();
    if(!trimmed)return false;
    if(/^https?:\/\//i.test(trimmed))return true;
    if(/^www\.[a-z0-9-]+\.[a-z]{2,}/i.test(trimmed))return true;
    if(/^[a-z0-9-]+\.[a-z]{2,}(\/|$)/i.test(trimmed)&&!trimmed.includes(' '))return true;
    return false;
  }

  // A page can narrow suggestions to one brand's own products by setting window.SEARCH_SCOPE_BRAND
  // before this script runs (the brand hub does this for manufacturer brands with fixture
  // products — Nike, Apple… — since if you're already on that brand's page, a name search almost
  // certainly means "which of their products"). Retailer brands with no products of their own
  // (Flipkart, Myntra…) have nothing to scope to, so this quietly falls back to the full catalog.
  function matches(query){
    const q=query.trim().toLowerCase();
    if(!q)return[];
    const scope=typeof SEARCH_SCOPE_BRAND!=='undefined'&&SEARCH_SCOPE_BRAND;
    const scoped=scope?PRODUCT_INDEX.filter(p=>p.brand.toLowerCase()===scope.toLowerCase()):[];
    const pool=scoped.length?scoped:PRODUCT_INDEX;
    const starts=[],contains=[];
    pool.forEach(item=>{
      const idx=item.name.toLowerCase().indexOf(q);
      if(idx===0)starts.push(item);
      else if(idx>0)contains.push(item);
    });
    return starts.concat(contains).slice(0,6);
  }

  // A brand name ("Nike") isn't a product — it has no price of its own. Matched separately so it
  // can route to the brand hub (sales calendar, gift cards, bank offers) instead of a price search.
  function matchBrands(query){
    const q=query.trim().toLowerCase();
    if(!q)return[];
    const starts=[],contains=[];
    BRAND_INDEX.forEach(brand=>{
      const idx=brand.name.toLowerCase().indexOf(q);
      if(idx===0)starts.push(brand);
      else if(idx>0)contains.push(brand);
    });
    return starts.concat(contains).slice(0,3);
  }

  function highlighted(name,query){
    const frag=document.createDocumentFragment();
    const idx=name.toLowerCase().indexOf(query.trim().toLowerCase());
    if(idx===-1){frag.append(name);return frag}
    frag.append(name.slice(0,idx));
    const mark=document.createElement('mark');
    mark.textContent=name.slice(idx,idx+query.trim().length);
    frag.append(mark);
    frag.append(name.slice(idx+query.trim().length));
    return frag;
  }

  function buildRow(item,query){
    const row=document.createElement('button');
    row.type='button';
    row.className='suggestion-row';
    row.setAttribute('role','option');
    row.innerHTML=productSwatchHTML(item,44);
    const name=document.createElement('span');
    name.className='suggestion-name';
    name.append(highlighted(item.name,query));
    row.append(name);
    const cat=document.createElement('span');
    cat.className='suggestion-cat';
    cat.textContent=item.category;
    row.append(cat);
    row.addEventListener('click',()=>select(item.name));
    return row;
  }

  function buildBrandRow(brand,query){
    const row=document.createElement('button');
    row.type='button';
    row.className='suggestion-row';
    row.setAttribute('role','option');
    row.innerHTML=brandSwatchHTML(brand,44);
    const name=document.createElement('span');
    name.className='suggestion-name';
    name.append(highlighted(brand.name,query));
    row.append(name);
    const tag=document.createElement('span');
    tag.className='suggestion-cat is-brand';
    tag.textContent='Brand';
    row.append(tag);
    row.addEventListener('click',()=>goToBrand(brand.name));
    return row;
  }

  function goToBrand(name){
    close();
    location.href='../brand/index.html?brand='+encodeURIComponent(name);
  }

  function buildFallback(query){
    const row=document.createElement('button');
    row.type='button';
    row.className='suggestion-row fallback';
    row.setAttribute('role','option');
    row.innerHTML=productSwatchHTML(null,44);
    const name=document.createElement('span');
    name.className='suggestion-name';
    name.textContent=`Search for "${query}"`;
    row.append(name);
    row.addEventListener('click',()=>select(query));
    return row;
  }

  function select(value){
    input.value=value;
    close();
    form.requestSubmit();
    input.focus();
  }

  function render(){
    const value=input.value;
    panel.innerHTML='';
    currentItems=[];
    activeIndex=-1;
    input.removeAttribute('aria-activedescendant');

    if(!value.trim()||isProductUrl(value)){close();return}

    const list=document.createElement('div');
    list.className='suggestion-list';
    matchBrands(value).forEach(brand=>{
      const row=buildBrandRow(brand,value);
      list.append(row);
      currentItems.push(row);
    });
    matches(value).forEach(item=>{
      const row=buildRow(item,value);
      list.append(row);
      currentItems.push(row);
    });
    const fallback=buildFallback(value.trim());
    list.append(fallback);
    currentItems.push(fallback);
    panel.append(list);
    open();
  }

  function open(){positionPanel();panel.hidden=false;input.setAttribute('aria-expanded','true')}
  function close(){
    panel.hidden=true;
    input.setAttribute('aria-expanded','false');
    activeIndex=-1;
    input.removeAttribute('aria-activedescendant');
  }

  function setActive(i){
    currentItems.forEach(el=>el.classList.remove('active'));
    activeIndex=Math.max(-1,Math.min(i,currentItems.length-1));
    const el=currentItems[activeIndex];
    if(el){
      el.classList.add('active');
      el.scrollIntoView({block:'nearest'});
      if(!el.id)el.id='suggestion-'+activeIndex;
      input.setAttribute('aria-activedescendant',el.id);
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }

  input.addEventListener('input',render);
  input.addEventListener('focus',render);
  input.addEventListener('keydown',e=>{
    if(panel.hidden)return;
    if(!currentItems.length)return;
    if(e.key==='ArrowDown'){e.preventDefault();setActive(activeIndex+1)}
    else if(e.key==='ArrowUp'){e.preventDefault();setActive(activeIndex-1)}
    else if(e.key==='Escape'){close()}
    else if(e.key==='Enter'&&activeIndex>=0){e.preventDefault();currentItems[activeIndex].click()}
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.search-shell'))close()});
  // Any submit (direct Enter with nothing highlighted, the search button, a page's own submit
  // handler) should close the dropdown — it shouldn't linger over whatever the page shows next.
  form.addEventListener('submit',close);
})();
