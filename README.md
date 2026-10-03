# Ziventa Motors

Dealership website for Ziventa Motors. Plain HTML/CSS/JS — no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Structure

- `index.html` — page layout (hero, inventory, about, contact)
- `css/styles.css` — styles (light/dark mode, responsive)
- `js/inventory.js` — vehicle data (edit this to update listings)
- `js/main.js` — search, filter, sort, and contact form logic

## Next steps

- Replace sample vehicles in `js/inventory.js` with real inventory and photos
- Connect the contact form to a backend or form service
- Add real address, phone, and map
