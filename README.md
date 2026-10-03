# Ziventa Motors — Website

Luxury "liquid glass" redesign of [ziventamotors.com](https://ziventamotors.com) — vehicle, heavy equipment and parts export from Dubai.

Plain HTML/CSS/JS. No build step, no dependencies. Deploy the folder as-is to any static host (GitHub Pages, Netlify, Vercel, cPanel).

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, export categories, featured stock, process, global reach, CTA |
| `inventory.html` | Searchable / filterable stock (`?type=SUV`, `?q=patrol`) |
| `vehicle.html?id=…` | Vehicle detail with WhatsApp / email quote buttons |
| `contact.html` | Contact details, map, and quotation form (`?vehicle=…`, `?interest=…`) |

## Editing content

Everything lives in **`assets/js/data.js`**:

- `SITE` — phone, WhatsApp number, email, address, hours, social links
- `INVENTORY` — vehicles. Set `price` (USD number) or leave `null` for "On request".
  Add photos with `image: "assets/img/patrol.jpg"` (card/hero) and
  `images: ["…", "…"]` (detail-page gallery). Without photos a styled silhouette is shown.
- `CATEGORIES`, `MAKES` — home page tiles and brand marquee

> Vehicle specs were filled in as indicative values — please confirm against actual stock.

## Quotation form

There's no backend: the form composes the enquiry and opens **WhatsApp** (or the visitor's **email** app) addressed to Ziventa Motors. To collect submissions server-side instead, point the form at a service such as Formspree or a small API.

## Design

- Dark obsidian base with drifting ambient light, so glass surfaces have something to refract
- Liquid-glass panels: `backdrop-filter` blur + saturation, specular rim, pointer-tracked sheen
- Champagne-gold accent, *Instrument Serif* display type with *Inter* body
- Floating pill navigation, scroll reveals, WhatsApp quick-action button
- Responsive to phone width; respects `prefers-reduced-motion`

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
