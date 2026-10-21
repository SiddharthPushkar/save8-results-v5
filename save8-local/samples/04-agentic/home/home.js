function isProductUrl(value){
  const trimmed=value.trim();
  if(!trimmed)return false;
  if(/^https?:\/\//i.test(trimmed))return true;
  if(/^www\.[a-z0-9-]+\.[a-z]{2,}/i.test(trimmed))return true;
  if(/^[a-z0-9-]+\.[a-z]{2,}(\/|$)/i.test(trimmed)&&!trimmed.includes(' '))return true;
  return false;
}

const pipelineSection=document.querySelector('#pipeline-section');
const howToSection=document.querySelector('#how-to-section');
const variantDialog=document.querySelector('#variant-dialog');
const variantBody=document.querySelector('#variant-body');
const chatHeader=document.querySelector('#chat-header');
const composeBar=document.querySelector('#compose-bar');
const searchShell=document.querySelector('.search-shell');
const heroAnchor=document.querySelector('.agent-hero h1');
const prototypeMenu=document.querySelector('#prototype-menu');

document.querySelector('#chat-menu').addEventListener('click',()=>prototypeMenu.showModal());
document.querySelector('#chat-more').addEventListener('click',()=>prototypeMenu.showModal());

// The marketing hero (and its nav tabs) don't belong on a result screen — the real one has its
// own minimal chat header and a bottom compose bar for the next search. Moving the actual
// #compare-form node (not cloning it) keeps every listener — suggestions, submit — intact.
function enterResultsMode(){
  if(document.body.classList.contains('results-mode'))return;
  document.body.classList.add('results-mode');
  chatHeader.hidden=false;
  composeBar.hidden=false;
  composeBar.appendChild(searchShell);
}
function exitResultsMode(){
  document.body.classList.remove('results-mode');
  chatHeader.hidden=true;
  composeBar.hidden=true;
  heroAnchor.after(searchShell);
}

// Deterministic so the same product+store always shows the same illustrative price —
// there is no live pipeline, so nothing here is a real quote. See PRODUCT-NOTES.md.
function seededRandom(seed){
  let h=0;
  for(let i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))>>>0;
  return function(){h=(Math.imul(h,1103515245)+12345)>>>0;return(h%1000)/1000};
}
const CATEGORY_BASE_PRICE={
  Mobiles:65000,Laptops:75000,Tablets:45000,Headphones:12000,Speakers:6000,
  Fashion:2500,Shoes:6500,Watches:8000,TVs:38000,Appliances:9000,Home:1200,
  Cameras:55000,"Books & media":900,Beauty:600,Luggage:4500,Bags:2200,Accessories:3500,
};
function mockPrice(name,store,category){
  const rand=seededRandom(name+'|'+store);
  const base=CATEGORY_BASE_PRICE[category]||5000;
  return Math.round(base*(0.85+rand()*0.3)/10)*10;
}
// A second, smaller seeded number standing in for "extra savings available via gift cards &
// card rewards" — same illustrative-only caveat as mockPrice. There's no real offers engine
// behind this (or behind the reference screen it's modelled on — see PRODUCT-NOTES.md).
function mockSavings(price,name,store){
  const rand=seededRandom(name+'|'+store+'|savings');
  return Math.round(price*(0.01+rand()*0.06)/5)*5;
}
function formatINR(n){return '₹'+n.toLocaleString('en-IN')}
const ICON_EXTERNAL='<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_CHEVRON='<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';

// Illustrative retailer fixtures for the ten-store results exploration.
const STORES=[
  {name:'Amazon',logo:'amazon.webp',bg:'#fff'},
  {name:'Flipkart',logo:'flipkart.webp',bg:'#f9e72f'},
  {name:'Croma',logo:'croma.webp',bg:'#fff'},
  {name:'Reliance Digital',logo:'reliancedigital.webp',bg:'#fff'},
  {name:'Vijay Sales',logo:'vijaysales.webp',bg:'#fff'},
  {name:'Tata CLiQ',logo:'tatacliq.webp',bg:'#fff'},
  {name:'JioMart',logo:'jiomart.webp',bg:'#fff'},
  {name:'Bajaj Electronics',logo:'bajaj.svg',bg:'#fff'},
  {name:'Sangeetha',logo:'sangeetha.png',bg:'#fff'},
  {name:'Poorvika',logo:'poorvika.webp',bg:'#fff'},
];

function openVariantDialog(match){
  variantBody.innerHTML='';
  const head=document.createElement('div');
  head.className='variant-head';
  head.insertAdjacentHTML('beforeend',productSwatchHTML(match,52));
  const h2=document.createElement('h2');
  h2.id='variant-title';
  h2.textContent=match.name;
  head.append(h2);
  variantBody.append(head);

  const selections={};
  match.variants.forEach(group=>{
    selections[group.key]=group.options[0];
    const wrap=document.createElement('div');
    wrap.className='variant-group';
    const label=document.createElement('span');
    label.className='variant-group-label';
    label.textContent=group.label;
    wrap.append(label);
    const opts=document.createElement('div');
    opts.className='variant-options';
    group.options.forEach((opt,i)=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='variant-option';
      btn.textContent=opt;
      btn.setAttribute('aria-pressed',i===0?'true':'false');
      btn.addEventListener('click',()=>{
        selections[group.key]=opt;
        opts.querySelectorAll('.variant-option').forEach(b=>b.setAttribute('aria-pressed','false'));
        btn.setAttribute('aria-pressed','true');
      });
      opts.append(btn);
    });
    wrap.append(opts);
    variantBody.append(wrap);
  });

  const confirm=document.createElement('button');
  confirm.type='button';
  confirm.className='btn primary variant-confirm';
  confirm.textContent='Compare prices';
  confirm.addEventListener('click',()=>{
    const variantLabel=match.variants.map(g=>selections[g.key]).join(' · ');
    variantDialog.close();
    showIdentified({...match,variantLabel,selectedVariants:match.variants.map(g=>({label:g.label,value:selections[g.key]}))});
  });
  variantBody.append(confirm);

  variantDialog.showModal();
}

function openProductDetails(item,trigger){
  const sheet=document.createElement('dialog');
  sheet.className='product-details-sheet';
  sheet.setAttribute('aria-labelledby','product-details-heading');
  sheet.innerHTML='<button type="button" class="product-details-close" aria-label="Close product details">×</button><div class="sheet-handle" aria-hidden="true"></div><header class="product-details-header"><h2 id="product-details-heading">Product details</h2></header><div class="product-details-body"></div>';
  const body=sheet.querySelector('.product-details-body');
  const images=[...new Set([item.image,...(item.images||[])].filter(Boolean))];
  if(images.length){
    const hero=document.createElement('div');hero.className='product-details-image';
    const photo=document.createElement('img');photo.src=images[0];photo.alt=item.name;hero.append(photo);body.append(hero);
    photo.addEventListener('error',()=>{hero.textContent='Image unavailable';hero.classList.add('image-unavailable')});
    if(images.length>1){
      const gallery=document.createElement('div');gallery.className='product-details-thumbs';
      images.forEach((src,i)=>{
        const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','Product image '+(i+1));button.setAttribute('aria-pressed',String(i===0));
        const thumbnail=document.createElement('img');thumbnail.src=src;thumbnail.alt='';button.append(thumbnail);
        button.onclick=()=>{hero.replaceChildren(photo);hero.classList.remove('image-unavailable');photo.src=src;gallery.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))};
        gallery.append(button);
      });body.append(gallery);
    }
  }
  const name=document.createElement('h3');name.className='product-details-name';name.textContent=item.name;body.append(name);
  const specs=[...(item.brand?[{label:'Brand',value:item.brand}]:[]),...(item.selectedVariants||[]),...(item.specifications||[])];
  if(specs.length){
    const table=document.createElement('dl');table.className='product-details-specs';
    specs.forEach(spec=>{const row=document.createElement('div');const term=document.createElement('dt');term.textContent=spec.label;const value=document.createElement('dd');value.textContent=spec.value;row.append(term,value);table.append(row)});body.append(table);
  }
  const previousOverflow=document.body.style.overflow;
  const close=()=>sheet.close();
  sheet.querySelector('button').onclick=close;
  sheet.addEventListener('click',event=>{if(event.target===sheet){const box=sheet.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)close()}});
  sheet.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;sheet.remove();if(trigger.isConnected)trigger.focus()},{once:true});
  document.body.append(sheet);document.body.style.overflow='hidden';sheet.showModal();
}

function openStoreOffersSheet(entry,offers,trigger){
  const sheet=document.createElement('dialog');
  sheet.className='store-offers-sheet';
  sheet.id='store-offers-sheet';
  sheet.setAttribute('aria-labelledby','store-offers-sheet-title');
  sheet.innerHTML='<div class="sheet-handle" aria-hidden="true"></div><header class="store-offers-sheet-header"><div><h2 id="store-offers-sheet-title"></h2><p></p></div><button type="button" class="btn iconbtn" aria-label="Close store offers">×</button></header><div class="store-offers-sheet-body"></div>';
  sheet.querySelector('h2').textContent=entry.store.name+' offers';
  sheet.querySelector('header p').textContent='Store price '+formatINR(Number(entry.priceWrap.dataset.price));
  const previousOverflow=document.body.style.overflow;
  offers.hidden=false;
  sheet.querySelector('.store-offers-sheet-body').append(offers);
  sheet.querySelector('[aria-label="Close store offers"]').onclick=()=>sheet.close();
  sheet.addEventListener('click',event=>{
    if(event.target!==sheet)return;
    const rect=sheet.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)sheet.close();
  });
  sheet.addEventListener('close',()=>{
    offers.hidden=true;
    entry.row.append(offers);
    document.body.style.overflow=previousOverflow;
    sheet.remove();
    if(trigger.isConnected)trigger.focus();
  },{once:true});
  document.body.append(sheet);
  document.body.style.overflow='hidden';
  sheet.showModal();
}

function showIdentified(item){
  howToSection.hidden=true;
  pipelineSection.hidden=false;
  pipelineSection.innerHTML='';
  enterResultsMode();
  const input=document.querySelector('#product-url');
  input.value='';

  const selected=document.createElement('section');
  selected.className='selected-product';
  selected.setAttribute('aria-label','Selected product');
  selected.innerHTML=productSwatchHTML(item,104);
  const identity=document.createElement('div');
  identity.className='selected-product-copy';
  const eyebrow=document.createElement('span');
  eyebrow.className='product-eyebrow';
  eyebrow.textContent=item.category?'Selected product':'Your search';
  const title=document.createElement('h1');
  title.textContent=item.name;
  const variant=document.createElement('p');
  variant.textContent=item.variantLabel||[item.brand,item.category].filter(Boolean).join(' · ')||'Choose a specific product to compare matching listings.';
  identity.append(eyebrow,title,variant);
  selected.append(identity);
  pipelineSection.append(selected);
  if(!item.category){
    const back=document.createElement('button');
    back.className='btn';back.textContent='Refine search';
    back.onclick=()=>{pipelineSection.hidden=true;howToSection.hidden=false;exitResultsMode();document.querySelector('#product-url').focus()};
    selected.append(back);return;
  }
  const detailsButton=document.createElement('button');
  detailsButton.type='button';detailsButton.className='selected-product-open';
  detailsButton.setAttribute('aria-label','View product details for '+item.name);
  detailsButton.setAttribute('aria-haspopup','dialog');
  detailsButton.innerHTML='<span aria-hidden="true">›</span>';
  detailsButton.onclick=()=>openProductDetails(item,detailsButton);
  selected.append(detailsButton);
  const fixture=document.createElement('p');
  fixture.className='fixture-label';
  fixture.textContent='Design preview · Sample prices, offers and product imagery';
  pipelineSection.prepend(fixture);

  const intro=document.createElement('div');
  intro.className='result-intro';
  const p=document.createElement('p');
  p.textContent='Compare store prices';
  intro.append(p);
  const change=document.createElement('button');
  change.type='button';
  change.textContent='Change product';
  change.addEventListener('click',()=>{
    pipelineSection.hidden=true;
    howToSection.hidden=false;
    exitResultsMode();
    const freshInput=document.querySelector('#product-url');
    freshInput.value='';
    freshInput.focus();
  });
  intro.append(change);
  pipelineSection.append(intro);

  const list=document.createElement('div');
  list.className='store-list';
  list.setAttribute('aria-label','Main stores');
  const otherSection=document.createElement('section');
  otherSection.className='other-stores';
  otherSection.setAttribute('aria-labelledby','other-stores-title');
  otherSection.innerHTML='<h2 id="other-stores-title">Other stores <span>5</span></h2>';
  const otherList=document.createElement('div');
  otherList.className='store-list';
  otherList.setAttribute('aria-label','Other stores');
  otherList.setAttribute('role','region');
  otherList.tabIndex=0;
  otherSection.append(otherList);
  const availableStores=[...STORES].sort((a,b)=>mockPrice(item.name,a.name,item.category)-mockPrice(item.name,b.name,item.category));
  const rows=availableStores.map((store,index)=>{
    const row=document.createElement('div');
    row.className='store-row';
    const main=document.createElement('div');
    main.className='store-row-main';
    main.innerHTML=`<span class="store-logo" style="background:${store.bg}">${store.logo?`<img src="../shared/assets/${store.logo}" alt="${store.name}">`:`<span class="store-initials" aria-hidden="true">${store.initials}</span>`}</span>`;
    const copy=document.createElement('div');
    copy.className='store-copy';
    const strong=document.createElement('strong');
    strong.textContent=store.name;
    copy.append(strong);
    main.append(copy);
    const priceWrap=document.createElement('div');
    priceWrap.className='store-price-wrap';
    priceWrap.innerHTML='<span class="store-checking">Checking…</span>';
    main.append(priceWrap);
    row.append(main);
    (index<5?list:otherList).append(row);
    return {row,copy,priceWrap,store};
  });
  pipelineSection.append(list,otherSection);

  // Sample recommendation based on fixture offers, not a live T&C analysis.
  // Scenario: gift-card redemption and direct card rewards are alternative routes.
  const recommended=availableStores.reduce((best,store)=>{
    const price=mockPrice(item.name,store.name,item.category);
    const giftSaving=Math.round(price*0.02);
    const cardReward=Math.round(price*0.015);
    const route={store,price,giftSaving,cardReward,effective:price-giftSaving};
    return !best||route.effective<best.effective?route:best;
  },null);
  const recommendation=document.createElement('section');
  recommendation.className='agent-recommendation';
  recommendation.setAttribute('aria-label','Agent8 recommendation');
  const label=document.createElement('h2');
  label.textContent='Agent8 recommends';
  const advice=document.createElement('p');
  advice.textContent=`The best way to buy is from ${recommended.store.name} with a gift card. The total comes to ${formatINR(recommended.effective)}, saving ${formatINR(recommended.giftSaving)}.`;
  const steps=document.createElement('ol');
  const giftStep=document.createElement('li');
  const giftLink=document.createElement('a');
  giftLink.href='../gift-card/index.html?brand='+encodeURIComponent(recommended.store.name);
  giftLink.textContent='Buy a '+recommended.store.name+' gift card';
  giftStep.append(giftLink,` worth ${formatINR(recommended.price)} for ${formatINR(recommended.effective)} at 2% off.`);
  const storeStep=document.createElement('li');
  const storeLink=document.createElement('a');
  // Product fixtures have no verified listing URLs. Link to retailer search instead.
  const storeSites={Croma:'https://www.croma.com/', 'Reliance Digital':'https://www.reliancedigital.in/', 'Vijay Sales':'https://www.vijaysales.com/', 'Tata CLiQ':'https://www.tatacliq.com/',JioMart:'https://www.jiomart.com/', 'Bajaj Electronics':'https://www.bajajelectronics.com/',Sangeetha:'https://www.sangeethamobiles.com/',Poorvika:'https://www.poorvika.com/'};
  const query=encodeURIComponent(item.name+' '+(item.variantLabel||''));
  storeLink.href=recommended.store.name==='Flipkart'?'https://www.flipkart.com/search?q='+query:recommended.store.name==='Amazon'?'https://www.amazon.in/s?k='+query:storeSites[recommended.store.name];
  storeLink.target='_blank';
  storeLink.rel='noopener noreferrer';
  storeLink.textContent=['Flipkart','Amazon'].includes(recommended.store.name)?'Find '+item.name+' on '+recommended.store.name:'Open '+recommended.store.name;
  storeStep.append(storeLink,', then apply the gift card at checkout to complete the purchase.');
  steps.append(giftStep,storeStep);
  const alternative=document.createElement('p');
  alternative.className='recommendation-alternative';
  alternative.textContent=`The HDFC Tata Neu card is another option, with ${formatINR(recommended.cardReward)} back in NeuCoins. The gift card saves ${formatINR(recommended.giftSaving-recommended.cardReward)} more, without waiting for rewards. These offers can’t be combined because the card reward requires paying directly with the card.`;
  recommendation.append(label,advice,steps,alternative);
  pipelineSection.append(recommendation);

  pipelineSection.scrollIntoView({behavior:'smooth',block:'start'});

  rows.forEach((entry,i)=>{
    setTimeout(()=>{
      const price=mockPrice(item.name,entry.store.name,item.category);
      entry.priceWrap.innerHTML='';
      const buy=document.createElement('a');
      buy.className='store-buy';
      buy.href='#';
      buy.setAttribute('aria-label','Open '+entry.store.name+' listing');
      buy.innerHTML=`<span>${formatINR(price)}</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${ICON_EXTERNAL}</svg>`;
      if(document.body.dataset.resultsLayout==='recommendation-first'&&i===0){
        buy.href=storeLink.href;
        buy.target='_blank';
        buy.rel='noopener noreferrer';
      }else{
        buy.addEventListener('click',e=>{e.preventDefault();toast('Design prototype only — this store link is not connected.')});
      }
      entry.priceWrap.append(buy);
      entry.priceWrap.dataset.price=price;

      const gift=Math.round(price*0.02);
      const reward=Math.round(price*0.015);
      const offers=document.createElement('div');
      offers.className='store-offers';
      offers.id='store-offers-'+i;
      offers.hidden=true;
      const giftName=entry.store.name==='Amazon'?'Amazon shopping':entry.store.name;
      offers.innerHTML=`<section class="perk-section" aria-label="Gift Card Offers">
        <div class="perk-heading"><h3>Gift Card Offers</h3><a href="../gift-card/index.html?brand=${encodeURIComponent(entry.store.name)}" aria-label="View ${entry.store.name} gift cards">›</a></div>
        <div class="perk-rail">
          <article class="perk-tile"><div class="perk-title">${entry.store.logo?`<img src="../shared/assets/${entry.store.logo}" alt="">`:`<span class="bank-mark" aria-hidden="true">${entry.store.initials}</span>`}<strong>${giftName}</strong></div><div class="perk-benefit"><b>−${formatINR(gift)}</b><span class="perk-rate">2% off</span><a class="perk-buy" href="../gift-card/index.html?brand=${encodeURIComponent(entry.store.name)}">Buy</a></div></article>
          ${entry.store.name==='Amazon'?`<article class="perk-tile"><div class="perk-title"><img src="https://assets.myhubble.money/brand-assets/tile-images-wp/amazon-pay-tile.webp" alt=""><strong>Amazon Pay</strong></div><div class="perk-benefit"><b>−${formatINR(Math.round(price*.01))}</b><span class="perk-rate">1% off</span><a class="perk-buy" href="../gift-card/index.html?brand=Amazon%20Pay">Buy</a></div></article>`:''}
        </div></section>
        <section class="perk-section" aria-label="Credit Card Offers">
          <div class="perk-heading"><h3>Credit Card Offers</h3><button type="button" class="my-cards">My Cards ›</button></div>
          <div class="perk-rail">
            <button type="button" class="perk-tile credit-tile" data-credit="hdfc"><div class="perk-title"><img class="bank-logo" src="../shared/assets/hdfc.webp" alt="HDFC Bank"><strong>HDFC Tata Neu Infinity Credit Card</strong><span class="my-card-tag">My Card</span></div><div class="perk-benefit"><b>−${formatINR(reward)}</b><span class="perk-rate">1.5% off</span><span class="perk-arrow">→</span></div><small>NeuCoins</small></button>
            <button type="button" class="perk-tile credit-tile" data-credit="icici"><div class="perk-title"><img class="bank-logo" src="../shared/assets/icici.webp" alt="ICICI Bank"><strong>Amazon Pay ICICI Card</strong><span class="my-card-tag">My Card</span></div><div class="perk-benefit"><b>−${formatINR(Math.round(price*.01))}</b><span class="perk-rate">1% off</span><span class="perk-arrow">→</span></div><small>Amazon Pay Cashback</small></button>
          </div></section>`;
      const totals=document.createElement('div');
      totals.className='offer-totals';
      totals.innerHTML=`<div><span>Offer savings</span><strong>${formatINR(gift)}</strong></div><div><span>Net effective price</span><strong>${formatINR(price-gift)}</strong></div>`;
      const explanation=document.createElement('p');
      explanation.className='offer-explanation';
      explanation.textContent='With the '+giftName+' gift card. Card rewards shown separately; not added to this estimate.';
      const collapse=document.createElement('button');
      collapse.type='button';collapse.className='perk-collapse';collapse.textContent='Hide offer ⌃';
      const teaser=document.createElement('button');
      teaser.type='button';teaser.className='store-teaser';
      teaser.setAttribute('aria-controls',offers.id);teaser.setAttribute('aria-expanded','false');
      teaser.innerHTML=`<span>Save <b>${formatINR(gift)}</b> with gift cards &amp; card rewards</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${ICON_CHEVRON}</svg>`;
      const setOpen=open=>{offers.hidden=!open;teaser.hidden=open;teaser.setAttribute('aria-expanded',String(open))};
      if(i>=5){
        teaser.removeAttribute('aria-expanded');
        teaser.setAttribute('aria-haspopup','dialog');
        teaser.setAttribute('aria-controls','store-offers-sheet');
        teaser.querySelector('svg').innerHTML='<path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        teaser.onclick=()=>openStoreOffersSheet(entry,offers,teaser);
      }else{
        teaser.onclick=()=>setOpen(true);
      }
      collapse.onclick=()=>{setOpen(false);teaser.focus()};
      offers.append(totals,explanation,collapse);
      entry.row.append(offers,teaser);
      const openCardInfo=(card)=>{
        const dialog=document.createElement('dialog');dialog.className='credit-info-dialog';
        const title=card==='hdfc'?'HDFC Tata Neu Infinity Credit Card':card==='icici'?'Amazon Pay ICICI Card':'My Cards';
        dialog.innerHTML='<h2></h2><p></p><form method="dialog"><button class="btn">Close</button></form>';
        dialog.querySelector('h2').textContent=title;
        dialog.querySelector('p').textContent=card?`Sample offer: ${card==='hdfc'?'1.5% in NeuCoins':'1% cashback'}. Pay ${formatINR(price)} at the store; rewards arrive later. Eligibility and limits need verification. This reward is not included in the gift-card estimate.`:'This design preview shows two sample saved cards: HDFC Tata Neu Infinity and Amazon Pay ICICI. Your real card wallet is not connected.';
        dialog.addEventListener('close',()=>dialog.remove());document.body.append(dialog);dialog.showModal();
      };
      offers.querySelector('.my-cards').onclick=()=>openCardInfo();
      offers.querySelectorAll('[data-credit]').forEach(button=>button.onclick=()=>openCardInfo(button.dataset.credit));
      entry.openOffers=()=>setOpen(true);

      if(i===rows.length-1)markBestPrice(rows);
    },420+i*360);
  });
}

function markBestPrice(rows){
  let best=null;
  rows.forEach(r=>{
    const price=Number(r.priceWrap.dataset.price);
    if(!best||price<best.price)best={price,row:r.row,copy:r.copy};
  });
  if(!best)return;
  best.row.classList.add('best');
  const badge=document.createElement('span');
  badge.className='store-badge';
  badge.textContent='Lowest store price';
  // Rows are already sorted and split into two groups of five before rendering.
  best.copy.append(badge);
  rows[0].openOffers();
}

document.querySelector('#compare-form').addEventListener('submit',e=>{
  e.preventDefault();
  const value=document.querySelector('#product-url').value.trim();
  if(!value)return;
  if(isProductUrl(value)){
    const href=/^https?:\/\//i.test(value)?value:'https://'+value;
    try{new URL(href)}catch{toast('Enter a product link starting with https://');return}
    toast('Product link accepted. Price comparison is not connected in this design prototype.');
    return;
  }
  const match=PRODUCT_INDEX.find(p=>p.name.toLowerCase()===value.toLowerCase());
  if(match&&match.variants){
    openVariantDialog(match);
    return;
  }
  if(match){
    showIdentified({...match});
    return;
  }
  // Not a product — check whether the typed text is a brand name (e.g. "Nike") before falling
  // back to a bare-string price search. A brand has no price of its own; it gets its own hub.
  const brand=BRAND_INDEX.find(b=>b.name.toLowerCase()===value.toLowerCase());
  if(brand){
    location.href='../brand/index.html?brand='+encodeURIComponent(brand.name);
    return;
  }
  showIdentified({name:value,category:null});
});

// Arriving from a brand hub's "Popular from [Brand]" row — pre-fill and run that exact search
// immediately, same as if it had been typed and picked from the dropdown.
const preselectProduct=new URLSearchParams(location.search).get('product');
if(preselectProduct){
  document.querySelector('#product-url').value=preselectProduct;
  document.querySelector('#compare-form').requestSubmit();
}
