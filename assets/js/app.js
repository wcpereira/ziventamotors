/* ==========================================================================
   Ziventa Motors — site script
   ========================================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const params = new URLSearchParams(location.search);

/* ---------- Language ---------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const LANG = (() => {
  const q = params.get("lang");
  if (q === "ar" || q === "en") { store.set("lang", q); return q; }
  return store.get("lang") === "ar" ? "ar" : "en";
})();
document.documentElement.lang = LANG;
document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";

function t(key, vars) {
  let s = STRINGS[LANG][key] ?? STRINGS.en[key] ?? key;
  if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, vars[k]);
  return s;
}
const L = (obj) => (obj && typeof obj === "object" && !Array.isArray(obj) ? obj[LANG] ?? obj.en : obj);
function applyI18n(root = document) {
  $$("[data-i18n]", root).forEach((el) => { el.textContent = t(el.dataset.i18n, { n: LISTINGS.length }); });
  $$("[data-i18n-ph]", root).forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
}

/* ---------- Helpers ---------- */
const ICON = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  prev: '<path d="M15 6l-6 6 6 6"/>',
  next: '<path d="M9 6l6 6-6 6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
};
const icon = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
const WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.800-1.6-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5c-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.300.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.9L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>';

const wa = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const carName = (v) => `${v.make} ${v.model}`;
const typeLabel = (v) => t(`type.${v.type}`);
const condLabel = (v) => t(v.condition === "used" ? "car.used" : "car.new");
const specLine = (v) => [typeLabel(v), v.fuel && t(`fuel.${v.fuel}`), v.transmission && t(`tr.${v.transmission}`)].filter(Boolean).join(" · ");
const byId = (id) => LISTINGS.find((v) => v.id === id);

/* Image with a neutral fallback if the remote file is unavailable. */
const img = (src, alt, extra = "") =>
  `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${extra} onerror="this.onerror=null;this.classList.add('contain');this.src='assets/img/placeholder.svg'">`;

/* ---------- Chrome ---------- */
function renderChrome() {
  const page = document.body.dataset.page;
  const links = [
    ["home", "index.html", "nav.home"],
    ["inventory", "inventory.html", "nav.inventory"],
    ["services", "index.html#services", "nav.services"],
    ["gcc", "index.html#gcc", "nav.gcc"],
    ["contact", "contact.html", "nav.contact"],
  ];
  const a = ([k, href, key]) => `<a href="${href}"${k === page ? ' aria-current="page"' : ""}>${t(key)}</a>`;

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="topbar"><div class="container">
      <div class="group"><span>${t("top.location")}</span><span class="hide-sm">${t("top.serving")}</span></div>
      <div class="group"><a class="ltr" href="tel:${SITE.phoneHref}">${SITE.phone}</a><a class="ltr hide-sm" href="mailto:${SITE.email}">${SITE.email}</a></div>
    </div></div>
    <div class="nav-wrap">
      <nav class="nav glass" aria-label="Main">
        <a class="brand" href="index.html" aria-label="${SITE.name}"><b>ZIVENTA</b><span>MOTORS · DUBAI</span></a>
        <ul class="nav-links">${links.map((l) => `<li>${a(l)}</li>`).join("")}</ul>
        <div class="nav-actions">
          <button class="lang-btn" type="button" lang="${LANG === "ar" ? "en" : "ar"}">${t("nav.lang")}</button>
          <a class="btn btn-dark btn-sm" href="contact.html">${t("nav.enquire")}</a>
          <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </nav>
      <div class="mobile-menu glass">${links.map(a).join("")}<a class="btn btn-dark" href="contact.html">${t("nav.enquire")}</a></div>
    </div>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer"><div class="container">
      <div class="footer-grid">
        <div><a class="brand" href="index.html"><b>ZIVENTA</b><span>MOTORS · DUBAI</span></a><p style="margin-top:18px">${t("foot.about")}</p></div>
        <div><h4>${t("foot.explore")}</h4><ul>
          <li><a href="inventory.html">${t("nav.inventory")}</a></li>
          <li><a href="index.html#services">${t("nav.services")}</a></li>
          <li><a href="index.html#gcc">${t("nav.gcc")}</a></li>
          <li><a href="contact.html">${t("nav.contact")}</a></li>
        </ul></div>
        <div><h4>${t("foot.stock")}</h4><ul>
          ${["SUV", "Sedan", "Pickup", "Coupe"].map((ty) => `<li><a href="inventory.html?type=${ty}">${t("type." + ty)}</a></li>`).join("")}
        </ul></div>
        <div><h4>${t("foot.contact")}</h4><ul>
          <li><a class="ltr" href="${wa(t("wa.hello"))}" target="_blank" rel="noopener">${SITE.mobile}</a></li>
          <li><a class="ltr" href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li><a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${SITE.name}. ${t("foot.rights")}</span><span>${esc(L(SITE.address))}</span></div>
    </div></footer>
    <a class="fab" href="${wa(t("wa.hello"))}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA}<span>${t("fab")}</span></a>`);

  const wrap = $(".nav-wrap"), btn = $(".menu-btn");
  btn.addEventListener("click", () => btn.setAttribute("aria-expanded", wrap.classList.toggle("menu-open")));
  $(".lang-btn").addEventListener("click", () => {
    store.set("lang", LANG === "ar" ? "en" : "ar");
    const u = new URL(location.href);
    u.searchParams.set("lang", LANG === "ar" ? "en" : "ar");
    location.href = u.toString();
  });
}

/* ---------- Cards ---------- */
const card = (v) => `
  <a class="car reveal" href="vehicle.html?id=${encodeURIComponent(v.id)}">
    <div class="photo">${img(v.thumb, carName(v))}<span class="pill glass">${condLabel(v)}</span></div>
    <div class="car-info">
      <div class="make">${esc(v.make)}</div>
      <h3><bdi>${esc(v.model)}</bdi></h3>
      <div class="spec">${specLine(v)}</div>
      <div class="car-foot"><span class="price">${t("car.price")}</span><span class="go">${t("car.details")} ${icon("arrow")}</span></div>
    </div>
  </a>`;

/* ---------- Pages ---------- */
const PAGES = {
  home() {
    const heroCars = SITE.hero.map(byId).filter(Boolean);
    const stage = $("#hero-stage");
    let i = 0, timer;
    const show = (n) => {
      i = (n + heroCars.length) % heroCars.length;
      const v = heroCars[i];
      stage.innerHTML = `
        <a class="photo" href="vehicle.html?id=${v.id}">${img(v.thumb, carName(v), 'loading="eager" fetchpriority="high"')}</a>
        <div class="hero-caption glass">
          <div><div class="name"><bdi>${esc(carName(v))}</bdi></div><div class="meta">${condLabel(v)} · ${specLine(v)}</div></div>
          <a class="btn btn-dark btn-sm" href="vehicle.html?id=${v.id}">${t("hero.view")} ${icon("arrow", "flip")}</a>
        </div>`;
      $$("#hero-dots button").forEach((b, k) => b.setAttribute("aria-current", k === i));
    };
    const restart = () => {
      clearInterval(timer);
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => show(i + 1), 6000);
    };
    $("#hero-dots").innerHTML = heroCars.map((v) => `<button type="button" aria-label="${esc(carName(v))}"></button>`).join("");
    $$("#hero-dots button").forEach((b, k) => b.addEventListener("click", () => { show(k); restart(); }));
    show(0); restart();
    heroCars.slice(1).forEach((v) => { new Image().src = v.thumb; });

    $("#featured").innerHTML = LISTINGS.filter((v) => v.featured).map(card).join("");

    const counts = {};
    LISTINGS.forEach((v) => (counts[v.make] = (counts[v.make] || 0) + 1));
    $("#makes").innerHTML = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([m, n]) => `<a href="inventory.html?make=${encodeURIComponent(m)}"><bdi>${esc(m)}</bdi><small>${n}</small></a>`).join("");

    $("#countries").innerHTML = GCC.map((c) => `<li class="${c.home ? "home" : ""}"><b>${esc(L(c)[0])}</b><span>${esc(L(c)[1])}</span></li>`).join("");
    $$("[data-wa]").forEach((el) => (el.href = wa(t("wa.hello"))));
    $$("[data-tel]").forEach((el) => (el.href = `tel:${SITE.phoneHref}`));
  },

  inventory() {
    const state = { q: params.get("q") || "", type: params.get("type") || "all", make: params.get("make") || "", cond: "", sort: "featured" };
    const chips = $("#types");
    const types = ["all", ...new Set(LISTINGS.map((v) => v.type))];
    chips.innerHTML = types.map((ty) => `<button type="button" data-type="${ty}">${ty === "all" ? t("inv.all") : t("type." + ty)}</button>`).join("");
    const makeSel = $("#make");
    [...new Set(LISTINGS.map((v) => v.make))].sort().forEach((m) => makeSel.add(new Option(m, m)));
    makeSel.value = state.make;
    $("#q").value = state.q;

    const render = () => {
      $$("button", chips).forEach((b) => b.setAttribute("aria-pressed", b.dataset.type === state.type));
      const q = state.q.toLowerCase();
      let list = LISTINGS.filter((v) =>
        (state.type === "all" || v.type === state.type) &&
        (!state.make || v.make === state.make) &&
        (!state.cond || v.condition === state.cond) &&
        (!q || `${v.make} ${v.model} ${v.type}`.toLowerCase().includes(q)));
      list = state.sort === "az"
        ? [...list].sort((a, b) => carName(a).localeCompare(carName(b)))
        : [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      $("#count").textContent = list.length === 1 ? t("inv.count1") : t("inv.count", { n: list.length });
      $("#grid").innerHTML = list.length ? list.map(card).join("") : `
        <div class="empty"><h3 class="serif" style="font-size:34px">${t("inv.emptyT")}</h3><p class="muted">${t("inv.emptyD")}</p>
        <a class="btn btn-dark" href="contact.html${state.q ? "?vehicle=" + encodeURIComponent(state.q) : ""}">${t("inv.emptyCta")}</a></div>`;
      observe();
    };
    chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { state.type = b.dataset.type; render(); } });
    $("#q").addEventListener("input", (e) => { state.q = e.target.value.trim(); render(); });
    makeSel.addEventListener("change", () => { state.make = makeSel.value; render(); });
    $("#cond").addEventListener("change", (e) => { state.cond = e.target.value; render(); });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
    render();
  },

  vehicle() {
    const v = byId(params.get("id"));
    const root = $("#vehicle");
    if (!v) {
      root.innerHTML = `<div class="empty"><h2 class="serif h2">${t("veh.notFound")}</h2><a class="btn btn-dark" href="inventory.html">${t("veh.back")}</a></div>`;
      $("#related").innerHTML = LISTINGS.filter((x) => x.featured).slice(0, 3).map(card).join("");
      return;
    }
    document.title = `${carName(v)} · ${SITE.name}`;
    $("#crumb-name").textContent = carName(v);
    const imgs = v.images.length ? v.images : [v.thumb];
    const specs = [
      ["veh.condition", condLabel(v)],
      ["veh.body", typeLabel(v)],
      ["veh.transmission", v.transmission && t("tr." + v.transmission)],
      ["veh.fuel", v.fuel && t("fuel." + v.fuel)],
      ["veh.doors", v.doors],
      ["veh.colour", v.color && t("color." + v.color)],
    ].filter(([, val]) => val);

    root.innerHTML = `
      <div class="detail">
        <div class="gallery">
          <div class="photo" id="main">${img(imgs[0], carName(v), 'loading="eager"')}
            ${imgs.length > 1 ? `<span class="count glass" id="count"></span>
            <div class="nav-arrows"><button class="glass" type="button" id="prev" aria-label="Previous">${icon("prev", "flip")}</button><button class="glass" type="button" id="next" aria-label="Next">${icon("next", "flip")}</button></div>` : ""}
          </div>
          ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((src, k) => `<button type="button" data-k="${k}" aria-label="${k + 1}">${img(src, "")}</button>`).join("")}</div>` : ""}
        </div>
        <aside class="panel glass">
          <span class="kicker">${esc(v.make)}</span>
          <h1 class="serif"><bdi>${esc(v.model)}</bdi></h1>
          <p class="muted" style="margin:0">${specLine(v)}</p>
          <div class="specs">${specs.map(([k, val]) => `<div><small>${t(k)}</small><span>${esc(val)}</span></div>`).join("")}</div>
          <div class="price-big"><small>${t("veh.priceLabel")}</small>${t("car.price")}</div>
          <div class="panel-actions">
            <a class="btn btn-wa btn-block" href="${wa(t("wa.car", { car: carName(v) }))}" target="_blank" rel="noopener">${WA} ${t("veh.wa")}</a>
            <a class="btn btn-light btn-block" href="contact.html?vehicle=${encodeURIComponent(v.id)}">${icon("mail")} ${t("veh.enquire")}</a>
            <a class="btn btn-light btn-block" href="tel:${SITE.phoneHref}">${icon("phone")} ${t("veh.call")}</a>
          </div>
          <p class="note">${t("veh.note")}</p>
        </aside>
      </div>`;

    if (imgs.length > 1) {
      let k = 0;
      const mainImg = $("#main img");
      const rtl = LANG === "ar";
      const go = (n) => {
        k = (n + imgs.length) % imgs.length;
        mainImg.classList.remove("contain");
        mainImg.src = imgs[k];
        $("#count").textContent = t("veh.photo", { i: k + 1, n: imgs.length });
        $$(".thumbs button").forEach((b) => b.setAttribute("aria-current", +b.dataset.k === k));
      };
      $$(".thumbs button").forEach((b) => b.addEventListener("click", () => go(+b.dataset.k)));
      $("#prev").addEventListener("click", () => go(k - 1));
      $("#next").addEventListener("click", () => go(k + 1));
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") go(k + (rtl ? 1 : -1));
        if (e.key === "ArrowRight") go(k + (rtl ? -1 : 1));
      });
      go(0);
    }

    const related = [
      ...LISTINGS.filter((x) => x.id !== v.id && x.make === v.make),
      ...LISTINGS.filter((x) => x.id !== v.id && x.make !== v.make && x.type === v.type),
    ].slice(0, 3);
    $("#related").innerHTML = related.map(card).join("");
  },

  contact() {
    $("#c-wa").href = wa(t("wa.hello")); $("#c-wa-v").textContent = SITE.mobile;
    $("#c-phone").href = `tel:${SITE.phoneHref}`; $("#c-phone-v").textContent = SITE.phone;
    $("#c-mail").href = `mailto:${SITE.email}`; $("#c-mail-v").textContent = SITE.email;
    $("#c-addr-v").textContent = L(SITE.address);
    $("#map").src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&hl=${LANG}&output=embed`;

    const country = $("#f-country"), dial = $("#f-dial");
    GCC.forEach((c) => { country.add(new Option(L(c)[0], c.code)); dial.add(new Option(`${c.code} ${c.dial}`, c.dial)); });
    country.add(new Option(t("other"), "other"));
    dial.add(new Option(t("other"), ""));
    country.addEventListener("change", () => { const c = GCC.find((x) => x.code === country.value); if (c) dial.value = c.dial; });

    const veh = $("#f-vehicle");
    [...LISTINGS].sort((a, b) => carName(a).localeCompare(carName(b))).forEach((v) => veh.add(new Option(carName(v), v.id)));
    const pre = params.get("vehicle");
    if (pre) { if (!byId(pre)) veh.add(new Option(pre, pre)); veh.value = pre; }

    const form = $("#quote-form"), status = $("#f-status");
    const compose = () => {
      const d = Object.fromEntries(new FormData(form));
      const c = GCC.find((x) => x.code === d.country);
      const v = byId(d.vehicle);
      return [
        t("wa.form"), "",
        `${t("f.name")}: ${d.name}`,
        `${t("f.phone")}: ${d.dial} ${d.phone}`.trim(),
        d.email && `Email: ${d.email}`,
        `${t("f.country")}: ${c ? L(c)[0] : t("other")}${d.city ? " / " + d.city : ""}`,
        `${t("f.interest")}: ${t("f.int." + d.interest)}`,
        d.vehicle && `${t("f.vehicle")}: ${v ? carName(v) : d.vehicle}`,
        `${t("f.contact")}: ${t("f.c." + d.contact)}`,
        d.message && `\n${d.message}`,
      ].filter(Boolean).join("\n");
    };
    const valid = () => {
      if (!form.name.value.trim() || form.phone.value.replace(/\D/g, "").length < 6 || !form.country.value) {
        status.textContent = t("f.err"); status.className = "form-status error";
        return false;
      }
      return true;
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!valid()) return;
      window.open(wa(compose()), "_blank", "noopener");
      status.textContent = t("f.ok"); status.className = "form-status ok";
    });
    $("#f-email-btn").addEventListener("click", () => {
      if (!valid()) return;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(t("c.formTitle"))}&body=${encodeURIComponent(compose())}`;
      status.textContent = t("f.okEmail"); status.className = "form-status ok";
    });
  },
};

/* ---------- Reveal on scroll ---------- */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" })
  : null;
const observe = () => $$(".reveal:not(.in)").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

renderChrome();
applyI18n();
PAGES[document.body.dataset.page]?.();
observe();
