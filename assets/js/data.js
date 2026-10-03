/* ==========================================================================
   Site configuration — edit business details here.
   ========================================================================== */
const SITE = {
  name: "Ziventa Motors",
  tagline: "Global vehicle export from Dubai",
  phone: "+971 4 330 2212",
  phoneHref: "+97143302212",
  mobile: "+971 50 646 3625",
  whatsapp: "971506463625",
  email: "info@ziventamotors.com",
  address: "S700 No. 15, Plot No. 30214, near Jaffco Roundabout, JAFZA South, Dubai, UAE",
  mapQuery: "Jaffco Roundabout, JAFZA South, Dubai",
  hours: "Sat – Thu · 9:00 – 18:00 (GST)",
  facebook: "https://www.facebook.com/ziventamotors/",
  regions: ["Africa", "Europe", "South America", "Middle East", "Central Asia", "CIS"],
};

/* ==========================================================================
   Inventory.
   Models taken from the current ziventamotors.com listings. Specs are
   indicative — confirm against stock before going live.
   price: null shows "On request". image: optional path (e.g. "assets/img/patrol.jpg");
   when omitted a styled silhouette is drawn.
   ========================================================================== */
const INVENTORY = [
  {
    id: "nissan-patrol-2025", make: "Nissan", model: "Patrol", trim: "2025", year: 2025,
    type: "SUV", fuel: "Petrol", engine: "3.5L V6 Twin-Turbo", transmission: "Automatic", drive: "4WD",
    condition: "New", seats: 7, price: null, tint: "#d9bf8c", featured: true,
    features: ["Twin-turbo V6", "Full-time 4WD", "Panoramic sunroof", "Premium leather", "360° camera", "Adaptive cruise"],
  },
  {
    id: "ford-mustang-2024", make: "Ford", model: "Mustang", trim: "2024", year: 2024,
    type: "Coupe", fuel: "Petrol", engine: "5.0L V8", transmission: "Automatic", drive: "RWD",
    condition: "New", seats: 4, price: null, tint: "#c84b3c", featured: true,
    features: ["Coyote V8", "Digital cockpit", "Launch control", "Performance exhaust", "Apple CarPlay", "LED lighting"],
  },
  {
    id: "lexus-es350", make: "Lexus", model: "ES350", trim: "Premier", year: 2024,
    type: "Sedan", fuel: "Petrol", engine: "3.5L V6", transmission: "Automatic", drive: "FWD",
    condition: "New", seats: 5, price: null, tint: "#8fa6c9", featured: true,
    features: ["Mark Levinson audio", "Ventilated seats", "Head-up display", "Lexus Safety System+", "Wireless charging", "Ambient lighting"],
  },
  {
    id: "jetour-x70-plus", make: "Jetour", model: "X70 Plus", trim: "", year: 2024,
    type: "SUV", fuel: "Petrol", engine: "1.6L Turbo", transmission: "Automatic", drive: "FWD",
    condition: "New", seats: 7, price: null, tint: "#6fb3a8",
    features: ["Three-row seating", "Twin screens", "Panoramic roof", "360° camera", "Keyless entry", "Cruise control"],
  },
  {
    id: "kia-sportage", make: "Kia", model: "Sportage", trim: "", year: 2024,
    type: "SUV", fuel: "Petrol", engine: "2.0L", transmission: "Automatic", drive: "FWD",
    condition: "New", seats: 5, price: null, tint: "#9d8fd9",
    features: ["Curved panoramic display", "Smart key", "Lane keep assist", "Wireless CarPlay", "Rear camera", "Alloy wheels"],
  },
  {
    id: "kia-sonet", make: "Kia", model: "Sonet", trim: "", year: 2024,
    type: "SUV", fuel: "Petrol", engine: "1.5L", transmission: "Automatic", drive: "FWD",
    condition: "New", seats: 5, price: null, tint: "#d98f6a",
    features: ["Touchscreen infotainment", "Rear camera", "Cruise control", "Auto climate", "LED DRLs", "6 airbags"],
  },
  {
    id: "nissan-sunny-sv", make: "Nissan", model: "Sunny", trim: "SV", year: 2024,
    type: "Sedan", fuel: "Petrol", engine: "1.6L", transmission: "Automatic", drive: "FWD",
    condition: "New", seats: 5, price: null, tint: "#b9c2cc",
    features: ["Fuel efficient", "Bluetooth audio", "Rear sensors", "Keyless entry", "ABS + EBD", "Spacious trunk"],
  },
  {
    id: "suzuki-celerio-gl", make: "Suzuki", model: "Celerio", trim: "GL", year: 2024,
    type: "Hatchback", fuel: "Petrol", engine: "1.0L", transmission: "Automatic", drive: "FWD",
    condition: "New", seats: 5, price: null, tint: "#e0c35c",
    features: ["Excellent economy", "Compact footprint", "Touchscreen", "Power windows", "Dual airbags", "Low running costs"],
  },
];

/* Export categories shown on the home page. */
const CATEGORIES = [
  { key: "cars",      title: "Passenger Cars",   text: "Sedans, SUVs, hatchbacks, hybrids and EVs from every major brand.", href: "inventory.html", icon: "car", wide: true },
  { key: "trucks",    title: "Trucks",           text: "Pickups, tippers, tractor heads and commercial fleets.", href: "inventory.html?type=Truck", icon: "truck" },
  { key: "equipment", title: "Heavy Equipment",  text: "Excavators, loaders and construction machinery.", href: "contact.html?interest=Heavy%20Equipment", icon: "equipment" },
  { key: "armored",   title: "Armored Vehicles", text: "Certified armored SUVs and cash-in-transit vehicles.", href: "contact.html?interest=Armored%20Vehicles", icon: "shield" },
  { key: "parts",     title: "Spare Parts",      text: "Genuine and OEM parts sourced to order.", href: "contact.html?interest=Spare%20Parts", icon: "gear" },
  { key: "tyres",     title: "Tyres & Batteries",text: "Passenger, commercial and OTR tyres; batteries in bulk.", href: "contact.html?interest=Tyres%20%26%20Batteries", icon: "tyre" },
  { key: "lubes",     title: "Lubricants",       text: "Engine oils and fluids from leading brands.", href: "contact.html?interest=Lubricants", icon: "drop" },
];

const MAKES = ["Toyota", "Nissan", "Lexus", "Mercedes-Benz", "BMW", "Ford", "Kia", "Hyundai", "Mitsubishi", "Land Rover", "Jetour", "Suzuki"];
