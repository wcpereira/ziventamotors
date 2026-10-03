/* ==========================================================================
   Ziventa Motors — shared UI
   ========================================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const params = new URLSearchParams(location.search);

/* ---------- Icons ---------- */
const ICON = {
  car: '<path d="M5 17h14M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1z"/><path d="M3 13h18"/>',
  truck: '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  equipment: '<path d="M3 18h10M4 18v-4h7l2 4"/><path d="M11 14 15 6l5 2-2 5"/><path d="M20 8v5l-2 1"/><circle cx="6" cy="19" r="1.2"/><circle cx="11" cy="19" r="1.2"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  tyre: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
  drop: '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z"/>',
  ship: '<path d="M3 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/><path d="M5 14 4 10h16l-1 4"/><path d="M8 10V6h8v4M12 3v3"/>',
  doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>',
  fb: '<path d="M15 8h-2a1 1 0 0 0-1 1v3h3l-.5 3H12v7H9v-7H7v-3h2V8.5A3.5 3.5 0 0 1 12.5 5H15z"/>',
};
const icon = (name, attrs = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${ICON[name] || ""}</svg>`;
const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5c-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.9L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>';

const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const vehicleName = (v) => `${v.year} ${v.make} ${v.model}${v.trim && v.trim !== String(v.year) ? " " + v.trim : ""}`;
const priceHTML = (v) => v.price
  ? `<small>Export price</small>${v.price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`
  : `<small>Export price</small>On request`;

/* ---------- Vehicle silhouettes ---------- */
const SHAPES = {
  Sedan: {
    body: "M20 100V86q2-14 22-16l70-6q30-26 66-28h70q32 2 58 26l50 8q22 4 24 20v10z",
    glass: ["M124 64q24-20 54-22h34v22z", "M220 42h28q26 2 44 22h-72z"],
    wheels: [96, 312],
  },
  SUV: {
    body: "M22 106V80q2-14 20-17l44-5 30-38q6-8 18-8h158q14 0 22 10l28 36 18 3q20 4 22 22v23z",
    glass: ["M126 56l26-34h60v34z", "M220 22h68q10 0 16 8l20 26h-104z"],
    wheels: [98, 314],
  },
  Coupe: {
    body: "M18 100V88q2-12 22-14l80-6q40-28 85-30h40q35 4 70 28l47 6q22 4 24 20v8z",
    glass: ["M134 67q32-21 71-23h31q30 4 60 22z"],
    wheels: [98, 316],
  },
  Hatchback: {
    body: "M40 102V84q2-12 18-14l52-6q28-30 60-32h112q18 2 30 20l24 22q14 4 16 18v10z",
    glass: ["M120 62q24-24 52-26h40v26z", "M220 36h60q12 2 20 14l12 12h-92z"],
    wheels: [106, 296],
  },
  Truck: {
    body: "M16 104V78q2-12 18-14l62-4 24-30q4-4 12-4h78q8 0 12 8l10 26h152l2 44z",
    glass: ["M128 56l14-22h34v22z", "M184 34h24l10 22h-34z"],
    wheels: [90, 320],
  },
};
let svgId = 0;
function carSVG(v) {
  const s = SHAPES[v.type] || SHAPES.Sedan;
  const id = `g${++svgId}`;
  const tint = v.tint || "#d9bf8c";
  const wheel = (x) => `
    <circle cx="${x}" cy="104" r="23" fill="#0a0b0f"/>
    <circle cx="${x}" cy="104" r="15" fill="url(#${id}r)"/>
    <circle cx="${x}" cy="104" r="5" fill="#0a0b0f"/>`;
  return `<svg viewBox="0 0 404 132" role="img" aria-label="${esc(vehicleName(v))}">
    <defs>
      <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${tint}"/><stop offset=".55" stop-color="${tint}" stop-opacity=".75"/><stop offset="1" stop-color="#0d0f15"/>
      </linearGradient>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#cfe3ff" stop-opacity=".55"/><stop offset="1" stop-color="#0d1220" stop-opacity=".9"/>
      </linearGradient>
      <radialGradient id="${id}r"><stop offset="0" stop-color="#9aa0aa"/><stop offset="1" stop-color="#2a2d34"/></radialGradient>
    </defs>
    <path d="${s.body}" fill="url(#${id}b)"/>
    <path d="${s.body}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
    ${s.glass.map((g) => `<path d="${g}" fill="url(#${id}g)"/>`).join("")}
    <path d="M40 84H360" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>
    ${s.wheels.map(wheel).join("")}
  </svg>`;
}
const mediaHTML = (v) => v.image
  ? `<img src="${esc(v.image)}" alt="${esc(vehicleName(v))}" loading="lazy">`
  : carSVG(v);

/* ---------- Cards ---------- */
function carCard(v, delay = 0) {
  return `
  <a class="car-card glass sheen reveal" data-delay="${delay % 4}" href="vehicle.html?id=${encodeURIComponent(v.id)}">
    <div class="car-media" style="--tint:${v.tint}55">
      ${mediaHTML(v)}
      <div class="badges"><span class="badge">${esc(v.type)}</span><span class="badge badge-gold">${esc(v.condition)}</span></div>
    </div>
    <div class="car-body">
      <span class="make">${esc(v.make)}</span>
      <h3>${esc(v.model)} ${v.trim && v.trim !== String(v.year) ? esc(v.trim) : ""}</h3>
      <div class="car-specs">
        <div><small>Year</small><span>${v.year}</span></div>
        <div><small>Fuel</small><span>${esc(v.fuel)}</span></div>
        <div><small>Drive</small><span>${esc(v.drive)}</span></div>
      </div>
      <div class="car-foot">
        <div class="price">${priceHTML(v)}</div>
        <span class="btn btn-glass btn-sm">Details ${icon("arrow")}</span>
      </div>
    </div>
  </a>`;
}

/* ---------- Chrome: nav, footer, ambient, FAB ---------- */
function renderChrome() {
  const page = document.body.dataset.page;
  const links = [
    ["home", "index.html", "Home"],
    ["inventory", "inventory.html", "Inventory"],
    ["services", "index.html#services", "Services"],
    ["export", "index.html#process", "How we export"],
    ["contact", "contact.html", "Contact"],
  ];
  const linkHTML = links.map(([k, href, label]) =>
    `<a href="${href}"${k === page ? ' aria-current="page"' : ""}>${label}</a>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="ambient" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="nav-wrap">
      <nav class="nav glass" aria-label="Main">
        <a class="brand" href="index.html" aria-label="${SITE.name} home">
          <span class="brand-mark">Z</span>
          <span>ZIVENTA<small>MOTORS · DUBAI</small></span>
        </a>
        <ul class="nav-links">${links.map(([k, href, label]) =>
          `<li><a href="${href}"${k === page ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul>
        <div class="nav-actions">
          <a class="btn btn-glass btn-sm" href="tel:${SITE.phoneHref}">${icon("phone")} Call</a>
          <a class="btn btn-gold btn-sm" href="contact.html">Get a quote</a>
          <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </nav>
      <div class="mobile-menu glass">${linkHTML}<a class="btn btn-gold" href="contact.html" style="margin-top:8px">Get a quote</a></div>
    </div>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" href="index.html"><span class="brand-mark">Z</span><span>ZIVENTA<small>MOTORS · DUBAI</small></span></a>
            <p style="margin-top:20px;max-width:320px">Your one-stop partner for vehicle, heavy equipment and parts export from Dubai — sourced, inspected and shipped worldwide.</p>
            <div class="socials"><a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon("fb")}</a><a href="${waLink("Hello Ziventa Motors")}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_ICON}</a></div>
          </div>
          <div><h4>Explore</h4><ul>
            <li><a href="inventory.html">Inventory</a></li>
            <li><a href="index.html#services">What we export</a></li>
            <li><a href="index.html#process">How it works</a></li>
            <li><a href="contact.html">Request a quote</a></li>
          </ul></div>
          <div><h4>Export</h4><ul>
            <li><a href="inventory.html?type=SUV">SUVs</a></li>
            <li><a href="inventory.html?type=Sedan">Sedans</a></li>
            <li><a href="contact.html?interest=Heavy%20Equipment">Heavy equipment</a></li>
            <li><a href="contact.html?interest=Spare%20Parts">Spare parts</a></li>
          </ul></div>
          <div><h4>Contact</h4><ul>
            <li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
            <li><a href="${waLink("Hello Ziventa Motors")}" target="_blank" rel="noopener">${SITE.mobile} (WhatsApp)</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><p style="margin:0">${SITE.address}</p></li>
          </ul></div>
        </div>
        <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span><span>JAFZA South · Dubai · United Arab Emirates</span></div>
      </div>
    </footer>
    <a class="fab" href="${waLink("Hello Ziventa Motors, I'd like to enquire about exporting a vehicle.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_ICON}</a>`);

  const wrap = $(".nav-wrap");
  const btn = $(".menu-btn");
  btn.addEventListener("click", () => {
    const open = wrap.classList.toggle("menu-open");
    btn.setAttribute("aria-expanded", open);
  });
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => wrap.classList.remove("menu-open")));
}

/* ---------- Effects ---------- */
function initEffects() {
  // pointer-tracked sheen on glass surfaces
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest?.(".sheen");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  // reveal on scroll
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { rootMargin: "0px 0px -8% 0px" })
    : null;
  window.observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io ? io.observe(el) : el.classList.add("in"));
}

/* ---------- Pages ---------- */
const PAGES = {
  home() {
    const hero = INVENTORY.find((v) => v.id === "nissan-patrol-2025") || INVENTORY[0];
    $("#hero-car").innerHTML = mediaHTML(hero) + '<div class="floor"></div><span class="badge"><span class="dot"></span>Available for export</span>';
    $("#hero-title").textContent = vehicleName(hero);
    $("#hero-chips").innerHTML = [hero.engine, hero.drive, `${hero.seats} seats`].map((c) => `<span class="chip">${esc(c)}</span>`).join("");
    $("#hero-link").href = `vehicle.html?id=${hero.id}`;

    $("#featured").innerHTML = INVENTORY.filter((v) => v.featured).map(carCard).join("");

    const track = MAKES.map((m) => `<span>${m}</span>`).join("");
    $("#marquee").innerHTML = track + track;

    $("#tiles").innerHTML = CATEGORIES.map((c, i) => `
      <a class="tile glass sheen reveal${c.wide ? " wide" : ""}" data-delay="${i % 4}" href="${c.href}">
        <span class="arrow">${icon("arrow")}</span>
        <span class="tile-icon">${icon(c.icon)}</span>
        <div><h3>${c.title}</h3><p>${c.text}</p></div>
      </a>`).join("");

    $("#regions").innerHTML = SITE.regions.map((r) => `<span class="chip">${r}</span>`).join("");
  },

  inventory() {
    const state = { q: params.get("q") || "", type: params.get("type") || "All", sort: "featured" };
    const types = ["All", ...new Set(INVENTORY.map((v) => v.type))];
    if (!types.includes(state.type)) types.push(state.type);

    const seg = $("#types");
    seg.innerHTML = types.map((t) => `<button type="button" data-type="${esc(t)}">${esc(t)}</button>`).join("");
    const search = $("#q"); search.value = state.q;

    const makeSel = $("#make");
    [...new Set(INVENTORY.map((v) => v.make))].sort().forEach((m) => makeSel.add(new Option(m, m)));

    function render() {
      $$("button", seg).forEach((b) => b.setAttribute("aria-pressed", b.dataset.type === state.type));
      const q = state.q.toLowerCase();
      const make = makeSel.value;
      let list = INVENTORY.filter((v) =>
        (state.type === "All" || v.type === state.type) &&
        (!make || v.make === make) &&
        (!q || `${v.make} ${v.model} ${v.trim} ${v.type} ${v.year}`.toLowerCase().includes(q)));
      const sort = $("#sort").value;
      if (sort === "newest") list = [...list].sort((a, b) => b.year - a.year);
      if (sort === "az") list = [...list].sort((a, b) => vehicleName(a).localeCompare(vehicleName(b)));
      if (sort === "featured") list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

      $("#count").textContent = `${list.length} vehicle${list.length === 1 ? "" : "s"} available for export`;
      $("#grid").innerHTML = list.length ? list.map(carCard).join("") : `
        <div class="empty glass">
          <h3 class="display" style="font-size:36px">Not in stock? We'll source it.</h3>
          <p>We procure vehicles to order from across the UAE market.</p>
          <a class="btn btn-gold" href="contact.html${q ? `?vehicle=${encodeURIComponent(state.q)}` : ""}">Request this vehicle</a>
        </div>`;
      window.observeReveals();
    }

    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      state.type = b.dataset.type; render();
    });
    search.addEventListener("input", () => { state.q = search.value.trim(); render(); });
    makeSel.addEventListener("change", render);
    $("#sort").addEventListener("change", render);
    render();
  },

  vehicle() {
    const v = INVENTORY.find((x) => x.id === params.get("id"));
    const root = $("#vehicle");
    if (!v) {
      root.innerHTML = `<div class="empty glass"><h2 class="display">Vehicle not found</h2><p>It may have just been sold.</p><a class="btn btn-gold" href="inventory.html">Back to inventory</a></div>`;
      return;
    }
    document.title = `${vehicleName(v)} · ${SITE.name}`;
    $("#crumb-name").textContent = `${v.make} ${v.model}`;
    const msg = `Hello Ziventa Motors, I'm interested in the ${vehicleName(v)}. Please send an export quotation.`;
    const gallery = v.images?.length ? v.images : null;

    root.innerHTML = `
      <div class="detail">
        <div>
          <div class="detail-media glass reveal">
            <div class="car-media" id="main-media" style="--tint:${v.tint}66">${gallery ? `<img src="${esc(gallery[0])}" alt="${esc(vehicleName(v))}">` : carSVG(v)}</div>
            ${gallery ? `<div class="thumbs">${gallery.map((src, i) => `<button type="button" data-src="${esc(src)}" aria-pressed="${i === 0}"><img src="${esc(src)}" alt=""></button>`).join("")}</div>` : ""}
          </div>
          <div class="features-list glass reveal">
            <span class="eyebrow">Highlights</span>
            <ul>${v.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          </div>
        </div>
        <aside class="detail-info glass reveal" data-delay="1">
          <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge badge-gold">${esc(v.condition)}</span><span class="badge"><span class="dot"></span>Ready to ship</span></div>
          <h1>${esc(v.make)} ${esc(v.model)}</h1>
          <p class="muted" style="margin:0">${esc(v.year)} ${v.trim && v.trim !== String(v.year) ? "· " + esc(v.trim) + " " : ""}· ${esc(v.type)}</p>
          <div class="spec-table">
            <div><small>Engine</small><span>${esc(v.engine)}</span></div>
            <div><small>Transmission</small><span>${esc(v.transmission)}</span></div>
            <div><small>Drive</small><span>${esc(v.drive)}</span></div>
            <div><small>Fuel</small><span>${esc(v.fuel)}</span></div>
            <div><small>Seats</small><span>${esc(v.seats)}</span></div>
            <div><small>Year</small><span>${esc(v.year)}</span></div>
          </div>
          <div class="price" style="margin-bottom:22px">${priceHTML(v)}</div>
          <div class="detail-actions">
            <a class="btn btn-gold btn-block" href="${waLink(msg)}" target="_blank" rel="noopener">${WA_ICON.replace("<svg", '<svg width="18" height="18"')} Quote on WhatsApp</a>
            <a class="btn btn-glass btn-block" href="contact.html?vehicle=${encodeURIComponent(v.id)}">${icon("mail")} Request by email</a>
          </div>
          <p class="form-note" style="margin-top:16px">Prices are quoted FOB Dubai or CIF to your port, including export documentation.</p>
        </aside>
      </div>`;

    $$(".thumbs button").forEach((b) => b.addEventListener("click", () => {
      $("#main-media img").src = b.dataset.src;
      $$(".thumbs button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    }));

    const related = INVENTORY.filter((x) => x.id !== v.id && x.type === v.type).concat(INVENTORY.filter((x) => x.id !== v.id && x.type !== v.type)).slice(0, 3);
    $("#related").innerHTML = related.map(carCard).join("");
  },

  contact() {
    $("#c-phone").href = `tel:${SITE.phoneHref}`; $("#c-phone-v").textContent = SITE.phone;
    $("#c-wa").href = waLink("Hello Ziventa Motors"); $("#c-wa-v").textContent = SITE.mobile;
    $("#c-mail").href = `mailto:${SITE.email}`; $("#c-mail-v").textContent = SITE.email;
    $("#c-addr-v").textContent = SITE.address;
    $("#c-hours-v").textContent = SITE.hours;
    $("#map").src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;

    const vehicleSel = $("#f-vehicle");
    INVENTORY.forEach((v) => vehicleSel.add(new Option(vehicleName(v), v.id)));
    const pre = params.get("vehicle");
    if (pre) {
      if (INVENTORY.some((v) => v.id === pre)) vehicleSel.value = pre;
      else { vehicleSel.add(new Option(pre, pre)); vehicleSel.value = pre; }
    }
    const interest = params.get("interest");
    if (interest) {
      const sel = $("#f-interest");
      if (![...sel.options].some((o) => o.value === interest)) sel.add(new Option(interest, interest));
      sel.value = interest;
    }

    const form = $("#quote-form");
    const status = $("#f-status");
    function compose() {
      const d = Object.fromEntries(new FormData(form));
      const v = INVENTORY.find((x) => x.id === d.vehicle);
      return [
        "Hello Ziventa Motors, I'd like an export quotation.",
        "",
        `Name: ${d.name}`,
        d.company && `Company: ${d.company}`,
        `Email: ${d.email}`,
        d.phone && `Phone: ${d.phone}`,
        `Interested in: ${d.interest}`,
        d.vehicle && `Vehicle: ${v ? vehicleName(v) : d.vehicle}`,
        d.qty && `Quantity: ${d.qty}`,
        d.country && `Destination: ${d.country}${d.port ? " / " + d.port : ""}`,
        d.message && `\n${d.message}`,
      ].filter(Boolean).join("\n");
    }
    function validate() {
      if (!form.name.value.trim() || !form.email.checkValidity() || !form.email.value || !form.country.value.trim()) {
        status.textContent = "Please add your name, a valid email and destination country.";
        status.className = "form-status error";
        return false;
      }
      return true;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;
      window.open(waLink(compose()), "_blank", "noopener");
      status.textContent = "Opening WhatsApp with your request — our export team will be in touch shortly.";
      status.className = "form-status ok";
    });
    $("#f-email").addEventListener("click", () => {
      if (!validate()) return;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Export quotation request")}&body=${encodeURIComponent(compose())}`;
      status.textContent = "Opening your email app…";
      status.className = "form-status ok";
    });
  },
};

renderChrome();
initEffects();
PAGES[document.body.dataset.page]?.();
window.observeReveals();
