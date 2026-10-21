// Real product photos (Wikimedia Commons — stable, freely licensed) where search-data.js has
// one, on a soft gradient "packshot" card matching the product's category. The gradient+icon
// also renders behind the <img> so a broken/slow image still leaves a sensible card, and is
// the fallback for anything without a photo (fixture item with no `image`, or search's own
// generic "Search for '…'" row, which has no specific product at all). See PRODUCT-NOTES.md.
const CATEGORY_VISUALS={
  "Mobiles":{bg:"#e7ecff",bg2:"#cdd6ff",fg:"#2b3a9e",icon:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'},
  "Laptops":{bg:"#f1e9ff",bg2:"#ddccfb",fg:"#6d3fc2",icon:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>'},
  "Tablets":{bg:"#f1e9ff",bg2:"#ddccfb",fg:"#6d3fc2",icon:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>'},
  "Headphones":{bg:"#ffe9da",bg2:"#ffd2b0",fg:"#c25410",icon:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>'},
  "Speakers":{bg:"#ffe9da",bg2:"#ffd2b0",fg:"#c25410",icon:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>'},
  "Fashion":{bg:"#ffe3ee",bg2:"#ffc4dc",fg:"#b23368",icon:'<path d="M3 18v-3c2-1 3-3 5-3l4 2 6-1 2 2v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/>'},
  "Shoes":{bg:"#ffe3ee",bg2:"#ffc4dc",fg:"#b23368",icon:'<path d="M3 18v-3c2-1 3-3 5-3l4 2 6-1 2 2v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/>'},
  "Watches":{bg:"#dff5f0",bg2:"#b9ebe0",fg:"#0e7c6b",icon:'<circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 2M9 2h6M9 22h6"/>'},
  "TVs":{bg:"#eceef2",bg2:"#d2d6e0",fg:"#33363f",icon:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>'},
  "Appliances":{bg:"#e4f3df",bg2:"#c4e8ba",fg:"#2f6d1f",icon:'<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>'},
  "Home":{bg:"#e4f3df",bg2:"#c4e8ba",fg:"#2f6d1f",icon:'<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>'},
  "Cameras":{bg:"#fff6da",bg2:"#ffe999",fg:"#8a6c05",icon:'<path d="M4 8h3l2-2h6l2 2h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>'},
  "Books & media":{bg:"#f2e7da",bg2:"#e3cdaf",fg:"#7a4a1f",icon:'<path d="M4 4h9a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3Z"/><path d="M16 4h4v16h-4"/>'},
  "Beauty":{bg:"#f7e3ff",bg2:"#eac3ff",fg:"#8a2fb0",icon:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/>'},
  "Luggage":{bg:"#eef0ea",bg2:"#d8dccb",fg:"#55584c",icon:'<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'},
  "Bags":{bg:"#eef0ea",bg2:"#d8dccb",fg:"#55584c",icon:'<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'},
  "Accessories":{bg:"#eef0ea",bg2:"#d8dccb",fg:"#55584c",icon:'<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'},
};
const DEFAULT_VISUAL={bg:"#ece9e0",bg2:"#d6d2c4",fg:"#6a6c6a",icon:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>'};

function productVisual(category){return CATEGORY_VISUALS[category]||DEFAULT_VISUAL}

function productSwatchHTML(item,size){
  size=size||44;
  const v=productVisual(item&&item.category);
  const icon=`<svg viewBox="0 0 24 24" aria-hidden="true">${v.icon}</svg>`;
  const photo=item&&item.image?`<img src="${item.image}" alt="" loading="lazy" onerror="this.remove()">`:'';
  return `<span class="product-swatch" style="width:${size}px;height:${size}px;background:linear-gradient(155deg,${v.bg},${v.bg2});color:${v.fg}">${icon}${photo}</span>`;
}
