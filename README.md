# Ziventa Motors — Website V2

Light, editorial redesign of [ziventamotors.com](https://ziventamotors.com) for the GCC market, in English and Arabic (RTL).
Plain HTML/CSS/JS — no build step. Hosted with GitHub Pages from `main`.

## Pages

| Page | |
|---|---|
| `index.html` | Home: rotating hero, flagship stock, brands, services, GCC delivery, how it works |
| `inventory.html` | All 34 vehicles with search, make, condition and body-type filters (`?type=SUV`, `?make=Lexus`) |
| `vehicle.html?id=…` | Photo gallery, specs, WhatsApp / email / call |
| `contact.html` | Quotation form (GCC country codes) that sends via WhatsApp or email, plus map |

Add `?lang=ar` or use the **عربي / EN** button to switch language.

## Editing

- **`assets/js/data.js`** — business details (`SITE`), GCC markets, hero cars, and `LISTINGS` (vehicles + photo URLs).
  Set `featured: true` to show a car on the home page.
- **`assets/js/i18n.js`** — all English and Arabic text.
- **`assets/css/styles.css`** — design tokens at the top (colours, fonts, radii).

## Photos

Vehicle photos load from the existing `ziventamotors.com/wp-content/uploads/` library, so the old WordPress site
must stay online. To make the new site independent, copy those files into this repo and replace the URLs in `data.js`.
