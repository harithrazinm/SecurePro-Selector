const WHATSAPP_NUMBER = "60196162487";
const WIZARD_TEXT = {
  en: { step:"Step", of:"of", selector:"selector", error:"Please select one option to continue.", back:"← Back", allServices:"← All services", next:"Next →", review:"Review request", details:"YOUR DETAILS", contactTitle:"Where should we send your recommendation?", contactText:"Your details are used only to follow up on this quote request.", name:"Name *", phone:"Phone number *", location:"Installation location", locationHint:"e.g. Kota Bharu, Kelantan", notes:"Anything else we should know?", notesHint:"Optional notes", ready:"REQUEST READY", brief:"brief", summaryText:"Review this summary, then send it directly to our Sonic System Solution team on WhatsApp.", guide:"Indicative package guide", priceNote:"Final pricing follows an on-site or remote assessment.", edit:"← Edit answers", send:"Send on WhatsApp ↗", hello:"Hello Sonic System Solution, I would like a quotation for", language:"BM" },
  ms: { step:"Langkah", of:"daripada", selector:"pemilih", error:"Sila pilih satu pilihan untuk meneruskan.", back:"← Kembali", allServices:"← Semua perkhidmatan", next:"Seterusnya →", review:"Semak permintaan", details:"MAKLUMAT ANDA", contactTitle:"Ke mana kami perlu hantar cadangan anda?", contactText:"Maklumat anda hanya digunakan untuk susulan permintaan sebut harga ini.", name:"Nama *", phone:"Nombor telefon *", location:"Lokasi pemasangan", locationHint:"cth. Kota Bharu, Kelantan", notes:"Ada perkara lain yang perlu kami tahu?", notesHint:"Nota pilihan", ready:"PERMINTAAN SEDIA", brief:"ringkasan", summaryText:"Semak ringkasan ini, kemudian hantar terus kepada pasukan Sonic System Solution melalui WhatsApp.", guide:"ANGGARAN PAKEJ", priceNote:"Harga akhir adalah selepas penilaian tapak atau penilaian jarak jauh.", edit:"← Ubah jawapan", send:"Hantar melalui WhatsApp ↗", hello:"Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk", language:"EN" }
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard"); if (!root) return;
  const slug = root.dataset.service, service = SERVICES[slug]; if (!service) { location.href = "../../index.html"; return; }
  
  const navContainer = document.querySelector(".wizard-nav .container");
  if (navContainer && !document.querySelector("#wizardLanguageToggle")) navContainer.insertAdjacentHTML("beforeend", '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>');
  
  let step = 0, answers = {};
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  const words = () => WIZARD_TEXT[getLanguage()];
  const question = () => service.questions[step];
  const updateLanguageButton = () => { const button = document.querySelector("#wizardLanguageToggle"); if (button) button.textContent = words().language; };

  // Helper to render PNG image or emoji icon safely
  function renderIcon(iconPath, altText = "Service Logo") {
    if (!iconPath) return "";
    const isImage = iconPath.endsWith(".png") || iconPath.endsWith(".jpg") || iconPath.endsWith(".svg") || iconPath.includes("/");
    if (isImage) {
      return `<img src="${esc(iconPath)}" alt="${esc(altText)}" class="service-icon-img" style="width: 32px; height: 32px; object-fit: contain;">`;
    }
    return `<span class="service-icon">${esc(iconPath)}</span>`;
  }

  function render() {
    const q = question(), total = service.questions.length + 1, w = words(); updateLanguageButton();
    const backControl = step === 0
      ? `<a class="btn btn-light border" href="../../index.html">${w.back}</a>`
      : `<button class="btn btn-light border" id="back" type="button">${w.back}</button>`;
    
    root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${w.step} ${step + 1} ${w.of} ${total}</span>
        <span>${contentText(service.name)} ${w.selector}</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${((step + 1) / total) * 100}%"></div>
      </div>
      <article class="wizard-card">
        <div class="d-flex align-items-center gap-2 mb-2">
          ${renderIcon(service.icon, service.name)}
          <p class="eyebrow mb-0">${esc(contentText(service.name))}</p>
        </div>
        <h1 class="step-title">${esc(contentText(q.title))}</h1>
        <p class="text-secondary mb-0">${esc(contentText(q.hint))}</p>
        <div class="option-grid">
          ${q.options.map(([value, detail]) => `
            <label class="choice ${answers[q.key] === value ? "active" : ""}">
              <input type="radio" name="answer" value="${esc(value)}" ${answers[q.key] === value ? "checked" : ""}>
              <strong>${esc(contentText(value))}</strong>
              <small>${esc(contentText(detail))}</small>
            </label>
          `).join("")}
        </div>
        <p class="error-text d-none" id="error">${w.error}</p>
        <div class="wizard-actions">
          ${backControl}
          <button class="btn btn-primary" id="next">${step === service.questions.length - 1 ? w.review : w.next}</button>
        </div>
      </article>`;

    root.querySelectorAll("input").forEach(input => input.addEventListener("change", event => { answers[q.key] = event.target.value; render(); }));
    const backButton = root.querySelector("#back");
    if (backButton) backButton.onclick = () => { step--; render(); };
    root.querySelector("#next").onclick = () => { if (!answers[q.key]) { root.querySelector("#error").classList.remove("d-none"); return; } if (step < service.questions.length - 1) { step++; render(); } else renderContact(); };
  }

  function renderContact() {
    const w = words(); updateLanguageButton();
    root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${w.step} ${service.questions.length + 1} ${w.of} ${service.questions.length + 1}</span>
        <span>${service.name} ${w.selector}</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:100%"></div>
      </div>
      <article class="wizard-card">
        <div class="d-flex align-items-center gap-2 mb-2">
          ${renderIcon(service.icon, service.name)}
          <p class="eyebrow mb-0">${w.details}</p>
        </div>
        <h1 class="step-title">${w.contactTitle}</h1>
        <p class="text-secondary">${w.contactText}</p>
        <form id="contactForm" class="row g-3 mt-2">
          <div class="col-md-6"><label class="form-label" for="name">${w.name}</label><input class="form-control" id="name" required autocomplete="name"></div>
          <div class="col-md-6"><label class="form-label" for="phone">${w.phone}</label><input class="form-control" id="phone" required inputmode="tel" autocomplete="tel"></div>
          <div class="col-12"><label class="form-label" for="site">${w.location}</label><input class="form-control" id="site" placeholder="${w.locationHint}"></div>
          <div class="col-12"><label class="form-label" for="note">${w.notes}</label><textarea class="form-control" id="note" rows="3" placeholder="${w.notesHint}"></textarea></div>
          <div class="wizard-actions">
            <button type="button" class="btn btn-light border" id="back">${w.back}</button>
            <button class="btn btn-primary">${w.review}</button>
          </div>
        </form>
      </article>`;

    root.querySelector("#back").onclick = render;
    root.querySelector("#contactForm").addEventListener("submit", event => { event.preventDefault(); answers.customer = { name:root.querySelector("#name").value.trim(), phone:root.querySelector("#phone").value.trim(), site:root.querySelector("#site").value.trim(), note:root.querySelector("#note").value.trim() }; renderSummary(); });
  }

  function renderSummary() {
    const c = answers.customer, w = words(); updateLanguageButton();
    const rows = service.questions.map(q => `<div class="receipt-row"><span>${esc(contentText(q.title))}</span><strong>${esc(contentText(answers[q.key]))}</strong></div>`).join("");
    
    root.innerHTML = `
      <article class="summary-card">
        <div class="d-flex justify-content-center align-items-center gap-2 mb-3">
          ${renderIcon(service.icon, service.name)}
        </div>
        <div class="success-icon">✓</div>
        <p class="eyebrow">${w.ready}</p>
        <h1 class="step-title">${esc(service.name)} ${w.brief}</h1>
        <p class="text-secondary">${w.summaryText}</p>
        <div class="receipt">
          ${rows}
          <div class="receipt-row"><span>${w.name.replace(" *", "")}</span><strong>${esc(c.name)}</strong></div>
          <div class="receipt-row"><span>${w.phone.replace(" *", "")}</span><strong>${esc(c.phone)}</strong></div>
          ${c.site ? `<div class="receipt-row"><span>${w.location}</span><strong>${esc(c.site)}</strong></div>` : ""}
        </div>
        <div class="estimate">
          <small class="text-uppercase fw-bold text-secondary">${w.guide}</small>
          <strong>${esc(service.price)}</strong>
          <small>${w.priceNote}</small>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-light border" id="edit">${w.edit}</button>
          <a class="btn btn-primary" id="whatsapp" target="_blank" rel="noopener">${w.send}</a>
        </div>
      </article>`;

    const lines = [`${w.hello} *${contentText(service.name)}*.`, "", ...service.questions.map(q => `*${contentText(q.title)}*\n${contentText(answers[q.key])}`), "", `*${w.name.replace(" *", "")}*\n${c.name}`, `*${w.phone.replace(" *", "")}*\n${c.phone}`, c.site ? `*${w.location}*\n${c.site}` : "", c.note ? `*${w.notes}*\n${c.note}` : ""].filter(Boolean);
    root.querySelector("#whatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    root.querySelector("#edit").onclick = () => { step = 0; render(); };
  }

  document.querySelector("#wizardLanguageToggle").addEventListener("click", () => { setLanguage(getLanguage() === "en" ? "ms" : "en"); render(); });
  render();
});