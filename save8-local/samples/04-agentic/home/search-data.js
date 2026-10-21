// Fixture product names for the search-suggestions prototype. Not a live catalog or discovery engine —
// see PRODUCT-NOTES.md. Names are representative products across common categories on Indian e-commerce.
// `image` is a real photo from Wikimedia Commons (stable, freely licensed) standing in for a real
// product catalog — it is NOT guaranteed to be the exact SKU/colour pictured (e.g. Puma RS-X points
// at a generic sneaker photo, not an actual RS-X), just a genuine, recognisable photo of that kind of
// product. See PRODUCT-NOTES.md for which ones are exact vs. representative.
const PRODUCT_INDEX=[
  {name:"iPhone 17",category:"Mobiles",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/IPhone_17_Vector.svg/330px-IPhone_17_Vector.svg.png",variants:[
    {key:"storage",label:"Storage",options:["128GB","256GB","512GB"]},
    {key:"colour",label:"Colour",options:["Black","White","Sage","Lavender"]},
  ]},
  {name:"iPhone 17 Pro",category:"Mobiles",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/IPhone_17_Pro_Vector.svg/330px-IPhone_17_Pro_Vector.svg.png",variants:[
    {key:"storage",label:"Storage",options:["256GB","512GB","1TB"]},
    {key:"colour",label:"Colour",options:["Silver","Blue","Orange"]},
  ]},
  {name:"iPhone 15",category:"Mobiles",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/IPhone_15_Vector.svg/330px-IPhone_15_Vector.svg.png",variants:[
    {key:"storage",label:"Storage",options:["128GB","256GB","512GB"]},
    {key:"colour",label:"Colour",options:["Black","Blue","Pink","Yellow"]},
  ]},
  {name:"iPhone 15 Pro Max",category:"Mobiles",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/IPhone_15_Pro_Vector.svg/330px-IPhone_15_Pro_Vector.svg.png"},
  {name:"iPhone 16",category:"Mobiles",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/330px-IPhone_16_Vector.svg.png"},
  {name:"Samsung Galaxy S24 Ultra",category:"Mobiles",brand:"Samsung",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Samsung_Galaxy_S24%2C_Sperrbildschirm.JPG/330px-Samsung_Galaxy_S24%2C_Sperrbildschirm.JPG",variants:[
    {key:"storage",label:"Storage",options:["256GB","512GB"]},
    {key:"colour",label:"Colour",options:["Titanium Black","Titanium Gray"]},
  ]},
  {name:"Samsung Galaxy M35 5G",category:"Mobiles",brand:"Samsung",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Galaxy_M35_front.jpg/330px-Galaxy_M35_front.jpg"},
  {name:"OnePlus 12R",category:"Mobiles",brand:"OnePlus",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/OnePlus_Ace_3_Black.jpg/330px-OnePlus_Ace_3_Black.jpg"},
  {name:"Nothing Phone 2a",category:"Mobiles",brand:"Nothing",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Nothing-Design-Event-Tokyo-2024-07-05_018.jpg/330px-Nothing-Design-Event-Tokyo-2024-07-05_018.jpg"},
  {name:"Redmi Note 13 Pro",category:"Mobiles",brand:"Xiaomi",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/330px-Xiaomi_logo_%282021-%29.svg.png"},
  {name:"MacBook Air M2",category:"Laptops",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Macbook_Air_15_inch_-_2_%28blurred%29.jpg/330px-Macbook_Air_15_inch_-_2_%28blurred%29.jpg",variants:[
    {key:"storage",label:"Storage",options:["256GB","512GB"]},
    {key:"colour",label:"Colour",options:["Midnight","Starlight","Silver"]},
  ]},
  {name:"MacBook Pro 14-inch",category:"Laptops",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/MacBook_Pro_16_%28M1_Pro%2C_2021%29_-_Wikipedia.jpg/330px-MacBook_Pro_16_%28M1_Pro%2C_2021%29_-_Wikipedia.jpg"},
  {name:"Dell XPS 13",category:"Laptops",brand:"Dell",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/DELL_XPS_13_and_15_%2837080596413%29.jpg/330px-DELL_XPS_13_and_15_%2837080596413%29.jpg"},
  {name:"HP Pavilion 15",category:"Laptops",brand:"HP",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Laptop_collage.jpg/330px-Laptop_collage.jpg"},
  {name:"Lenovo IdeaPad Slim 5",category:"Laptops",brand:"Lenovo",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Lenovo_IdeaPad_320.jpg/330px-Lenovo_IdeaPad_320.jpg"},
  {name:"iPad Air 5th Gen",category:"Tablets",brand:"Apple",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/IPad_Air_2020_%2851012790753%29.jpg/330px-IPad_Air_2020_%2851012790753%29.jpg"},
  {name:"Samsung Galaxy Tab S9",category:"Tablets",brand:"Samsung",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Samsung_Galaxy_Tab_S9.png/330px-Samsung_Galaxy_Tab_S9.png"},
  {name:"Sony WH-1000XM5",category:"Headphones",brand:"Sony",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg/330px-S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg"},
  {name:"boAt Airdopes 141",category:"Headphones",brand:"boAt",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg/330px-S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg"},
  {name:"boAt Rockerz 450",category:"Headphones",brand:"boAt",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg/330px-S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg"},
  {name:"JBL Flip 6 Speaker",category:"Speakers",brand:"JBL",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/JBL_Flip_3_bluetooth_speaker_%28DSCF2653%29.jpg/330px-JBL_Flip_3_bluetooth_speaker_%28DSCF2653%29.jpg"},
  {name:"Nike Air Force 1",category:"Shoes",brand:"Nike",image:"https://thumb.wikimedia.org/wikipedia/en/thumb/4/44/The_original_colorway_Air_Force_I_from_1982.jpg/330px-The_original_colorway_Air_Force_I_from_1982.jpg",variants:[
    {key:"size",label:"UK size",options:["6","7","8","9","10"]},
    {key:"colour",label:"Colour",options:["White","Black"]},
  ]},
  {name:"Adidas Ultraboost 22",category:"Shoes",brand:"Adidas",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Adidas_Boost_Material_in_focus_on_Adidas_Sesame-Trace_Green_NMD_R1s.jpg/330px-Adidas_Boost_Material_in_focus_on_Adidas_Sesame-Trace_Green_NMD_R1s.jpg"},
  {name:"Puma RS-X",category:"Shoes",brand:"Puma",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Air_Jordan_1_Banned.jpg/330px-Air_Jordan_1_Banned.jpg"},
  {name:"Levi's 511 Slim Jeans",category:"Fashion",brand:"Levi's",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Jeans.jpg/330px-Jeans.jpg"},
  {name:"Titan Raga Watch",category:"Watches",brand:"Titan",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Casio_OCEANUS_OCW-S1350PC-1AJR_01.JPG/330px-Casio_OCEANUS_OCW-S1350PC-1AJR_01.JPG"},
  {name:"Fossil Gen 6 Smartwatch",category:"Watches",brand:"Fossil",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Samsung_Galaxy_Watch.jpg/330px-Samsung_Galaxy_Watch.jpg"},
  {name:"Noise ColorFit Pro 4",category:"Watches",brand:"Noise",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Samsung_Galaxy_Watch.jpg/330px-Samsung_Galaxy_Watch.jpg"},
  {name:"Samsung 55-inch Crystal 4K TV",category:"TVs",brand:"Samsung",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/LG_smart_TV.jpg/330px-LG_smart_TV.jpg"},
  {name:"LG 43-inch Smart TV",category:"TVs",brand:"LG",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Cptvdisplay.jpg/330px-Cptvdisplay.jpg"},
  {name:"Mi Robot Vacuum X10",category:"Appliances",brand:"Xiaomi",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Reinigungsroboter_tcm_100.JPG/330px-Reinigungsroboter_tcm_100.JPG"},
  {name:"Philips Air Fryer HD9252",category:"Appliances",brand:"Philips",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Tabletop_convection_oven.jpg/330px-Tabletop_convection_oven.jpg"},
  {name:"Prestige Induction Cooktop",category:"Appliances",brand:"Prestige",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Kookplaat_inductie.JPG/330px-Kookplaat_inductie.JPG"},
  {name:"Dyson V8 Vacuum Cleaner",category:"Appliances",brand:"Dyson",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Numatic_Henry_vacuum_cleaner_%283308986870%29_%28cropped%29.jpg/330px-Numatic_Henry_vacuum_cleaner_%283308986870%29_%28cropped%29.jpg"},
  {name:"Canon EOS R10",category:"Cameras",brand:"Canon",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Canon_EOS_R10.tif/lossy-page1-330px-Canon_EOS_R10.tif.jpg"},
  {name:"GoPro Hero 12",category:"Cameras",brand:"GoPro",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Mark_Schulze_Helmet_Cam.jpg/330px-Mark_Schulze_Helmet_Cam.jpg"},
  {name:"Kindle Paperwhite",category:"Books & media",brand:"Amazon",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Amazon_Kindle_2024.svg/330px-Amazon_Kindle_2024.svg.png"},
  {name:"Lakme Absolute Lipstick",category:"Beauty",brand:"Lakme",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Applying_red_lipstick_-_model_Eve_Casini.jpg/330px-Applying_red_lipstick_-_model_Eve_Casini.jpg"},
  {name:"Mamaearth Vitamin C Serum",category:"Beauty",brand:"Mamaearth",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Cosmetics.JPG/330px-Cosmetics.JPG"},
  {name:"Minimalist Sunscreen SPF 50",category:"Beauty",brand:"Minimalist",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/330px-Sunscreen_on_back_under_normal_and_UV_light.jpg"},
  {name:"Milton Thermosteel Bottle",category:"Home",brand:"Milton",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Thermos.JPG/330px-Thermos.JPG"},
  {name:"American Tourister Trolley Bag",category:"Luggage",brand:"American Tourister",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Suitcase1.jpg/330px-Suitcase1.jpg"},
  {name:"Wildcraft Backpack",category:"Bags",brand:"Wildcraft",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Rucksack1.jpg/330px-Rucksack1.jpg"},
  {name:"Logitech MX Master 3S",category:"Accessories",brand:"Logitech",image:"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/3-Tasten-Maus_Microsoft.jpg/330px-3-Tasten-Maus_Microsoft.jpg"},
];
