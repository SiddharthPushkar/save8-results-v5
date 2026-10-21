// Brand catalog for the Agent8 search bar's brand-name matching. Distinct from PRODUCT_INDEX:
// typing "Nike" should route to the Nike brand hub (sales, gift cards, offers), not treat "Nike"
// itself as a product. Six stores have a real local logo (shared/assets); everything else falls
// back to an initial-letter badge (same pattern as gift-card's image fallback). See PRODUCT-NOTES.md.
const BRAND_INDEX=[
  {name:"Amazon",logo:"amazon.webp",logoBg:"#fff"},
  {name:"Flipkart",logo:"flipkart.webp",logoBg:"#f9e72f"},
  {name:"Myntra",logo:"myntra.webp",logoBg:"#fff"},
  {name:"Zepto",logo:"zepto.webp",logoBg:"#45135f"},
  {name:"Blinkit",logo:"blinkit.webp",logoBg:"#f8cb46"},
  {name:"Instamart",logo:"instamart.webp",logoBg:"#ff6f00"},
  ...[...new Set(PRODUCT_INDEX.map(p=>p.brand))].map(name=>({name})),
];

function brandVisual(name){
  const rand=(name.charCodeAt(0)*31+(name.charCodeAt(1)||0))%BRAND_LETTER_COLOURS.length;
  return BRAND_LETTER_COLOURS[rand];
}
const BRAND_LETTER_COLOURS=[
  {bg:"#e7ecff",fg:"#2b3a9e"},{bg:"#ffe3ee",fg:"#b23368"},{bg:"#dff5f0",fg:"#0e7c6b"},
  {bg:"#fff6da",fg:"#8a6c05"},{bg:"#f1e9ff",fg:"#6d3fc2"},{bg:"#e4f3df",fg:"#2f6d1f"},
];

function brandSwatchHTML(brand,size){
  size=size||44;
  if(brand.logo){
    return `<span class="product-swatch" style="width:${size}px;height:${size}px;background:${brand.logoBg||'#fff'}"><img src="../shared/assets/${brand.logo}" alt=""></span>`;
  }
  const v=brandVisual(brand.name);
  const initial=brand.name.trim().charAt(0).toUpperCase();
  return `<span class="product-swatch brand-initial" style="width:${size}px;height:${size}px;background:linear-gradient(155deg,${v.bg},#fff);color:${v.fg};font-size:${Math.round(size*0.42)}px">${initial}</span>`;
}
