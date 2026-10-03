const $ = (sel) => document.querySelector(sel);
const money = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const ICONS = { Sedan: "🚗", SUV: "🚙", Truck: "🛻", Coupe: "🏎️" };

function render() {
  const q = $("#search").value.trim().toLowerCase();
  const type = $("#type").value;
  const sort = $("#sort").value;

  const cars = INVENTORY
    .filter((c) => !type || c.type === type)
    .filter((c) => !q || `${c.make} ${c.model}`.toLowerCase().includes(q))
    .sort((a, b) =>
      sort === "price-desc" ? b.price - a.price :
      sort === "year-desc"  ? b.year - a.year :
                              a.price - b.price);

  $("#count").textContent = `${cars.length} vehicle${cars.length === 1 ? "" : "s"}`;
  $("#grid").innerHTML = cars.length
    ? cars.map((c) => `
      <article class="card">
        <div class="card-img" style="background:${c.color}">${ICONS[c.type] || "🚗"}</div>
        <div class="card-body">
          <h3>${c.year} ${c.make} ${c.model}</h3>
          <div class="card-meta">${c.type} · ${c.miles.toLocaleString()} mi</div>
          <div class="card-price">${money(c.price)}</div>
          <a href="#contact" class="btn" data-id="${c.id}">Request test drive</a>
        </div>
      </article>`).join("")
    : `<p class="empty">No vehicles match your search.</p>`;
}

function initContactForm() {
  const select = $("#vehicle-select");
  INVENTORY.forEach((c) => select.add(new Option(`${c.year} ${c.make} ${c.model}`, c.id)));

  $("#grid").addEventListener("click", (e) => {
    const id = e.target.dataset?.id;
    if (id) select.value = id;
  });

  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const status = $("#form-status");
    if (!form.name.value.trim() || !form.email.checkValidity() || !form.email.value) {
      status.textContent = "Please enter your name and a valid email.";
      status.className = "form-status error";
      return;
    }
    // TODO: send to a backend or form service.
    status.textContent = `Thanks, ${form.name.value.trim()}! We'll be in touch soon.`;
    status.className = "form-status ok";
    form.reset();
  });
}

function initNav() {
  const toggle = $(".nav-toggle");
  const nav = $(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") nav.classList.remove("open");
  });
}

["#search", "#type", "#sort"].forEach((s) => $(s).addEventListener("input", render));
$("#year").textContent = new Date().getFullYear();
initNav();
initContactForm();
render();
