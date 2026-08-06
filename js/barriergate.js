/* Dedicated Barrier Gate Version 1 flow. */
const BARRIER_GATE_WHATSAPP = "60196162487";
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard"); if (!root) return;
  const navContainer = document.querySelector(".wizard-nav .container");
  if (navContainer && !document.querySelector("#wizardLanguageToggle")) navContainer.insertAdjacentHTML("beforeend", '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>');

  let screen = 1, barrier_type = "", arm_length = "", access_system = "", safety_sensor = "", install_type = "", site_visit = "";
  let customer = { name: "", phone: "", email: "", site: "", note: "" };

  const tr = () => getLanguage() === "ms" ? {
    step: "Langkah", of: "daripada",
    type: "Jenis Palang", length: "Panjang Palang", access: "Sistem Akses",
    safety: "Penderia Keselamatan", install: "Jenis Pemasangan", visit: "Lawatan Tapak",
    customer: "Maklumat Pelanggan", customerSub: "Sila masukkan butiran anda.",
    straight: "Palang Lurus", folding: "Palang Lipat", fence: "Palang Pagar",
    m3: "3 Meter", m4: "4 Meter", m6: "6 Meter", custom: "Lain-lain / Tidak Pasti",
    rfid: "RFID / Pembaca Kad", remote: "Butang / Kawalan Jauh", lpr: "Kamera LPR",
    loop: "Pengesan Gelung (Loop Detector)", photocell: "Sel Foto (Photo Cell)", both: "Kedua-duanya",
    newInstall: "Sistem Baharu", replace: "Ganti / Naik Taraf Sedia Ada",
    yes: "Ya", no: "Tidak", next: "Seterusnya →", back: "← Kembali", edit: "← Pinda Butiran", review: "Hantar WhatsApp ↗",
    name: "Nama *", phone: "Nombor telefon *", email: "E-mel (Pilihan)", location: "Lokasi pemasangan *", notes: "Nota tambahan",
    error: "Sila pilih atau isi jawapan untuk meneruskan.", summary: "RINGKASAN BARRIER GATE",
    message: "Semak butiran anda, kemudian hantar permintaan kepada Sonic System Solution.",
    hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk *Barrier Gate*."
  } : {
    step: "Step", of: "of",
    type: "Arm Type", length: "Arm Length", access: "Access System",
    safety: "Safety Sensor", install: "Installation Type", visit: "Site Visit",
    customer: "Customer Details", customerSub: "Please enter your details.",
    straight: "Straight Arm", folding: "Folding Arm", fence: "Fence Arm",
    m3: "3 Meters", m4: "4 Meters", m6: "6 Meters", custom: "Other / Unsure",
    rfid: "RFID / Card Reader", remote: "Push Button / Remote", lpr: "LPR Camera",
    loop: "Loop Detector", photocell: "Photo Cell", both: "Both",
    newInstall: "New System", replace: "Replacement / Upgrade",
    yes: "Yes", no: "No", next: "Next →", back: "← Back", edit: "← Edit Details", review: "Send on WhatsApp ↗",
    name: "Name *", phone: "Phone number *", email: "Email (Optional)", location: "Installation location *", notes: "Additional notes",
    error: "Please select or enter an answer to continue.", summary: "BARRIER GATE SUMMARY",
    message: "Review your details, then send the request to Sonic System Solution.",
    hello: "Hello Sonic System Solution, I would like a quotation for a *Barrier Gate*."
  };

  const option = (value, label, description, selected) => `<label class="choice ${selected === value ? "active" : ""}"><input type="radio" name="choice" value="${value}" ${selected === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
  const back = () => screen === 1 ? `<a class="btn btn-light border" href="../../index.html">${tr().back}</a>` : `<button class="btn btn-light border" type="button" id="back">${tr().back}</button>`;

  function page(title, subtitle, content, isValid) {
    const t = tr();
    const language = document.querySelector("#wizardLanguageToggle");
    if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM";

    root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} ${screen} ${t.of} 8</span><span>Barrier Gate</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${screen / 8 * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">BARRIER GATE</p><h1 class="step-title">${title}</h1><p class="text-secondary">${subtitle}</p>${content}<p class="error-text d-none" id="error">${t.error}</p><div class="wizard-actions">${back()}<button class="btn btn-primary" id="next" type="button">${t.next}</button></div></article>`;

    const previous = root.querySelector("#back");
    if (previous) previous.onclick = () => { screen--; render(); };
    root.querySelector("#next").onclick = () => {
      if (!isValid()) { root.querySelector("#error").classList.remove("d-none"); return; }
      screen++; render();
    };
  }

  function render() {
    const t = tr();

    if (screen === 1) { page(t.type, getLanguage() === "ms" ? "Pilih jenis reka bentuk palang." : "Choose the arm design type.", `<div class="option-grid">${option("Straight Arm", t.straight, getLanguage() === "ms" ? "Standard untuk kawasan terbuka." : "Standard arm for open areas.", barrier_type)}${option("Folding Arm", t.folding, getLanguage() === "ms" ? "Sesuai untuk kawasan berbumbung rendah." : "Ideal for low-ceiling basements.", barrier_type)}${option("Fence Arm", t.fence, getLanguage() === "ms" ? "Berpagar untuk sekuriti tambahan." : "Fenced arm for extra security.", barrier_type)}</div>`, () => barrier_type); root.querySelectorAll("input").forEach(i => i.onchange = e => { barrier_type = e.target.value; render(); }); return; }

    if (screen === 2) { page(t.length, getLanguage() === "ms" ? "Pilih ukuran panjang palang yang diperlukan." : "Select the required arm length.", `<div class="option-grid">${option("3 Meters", t.m3, getLanguage() === "ms" ? "Sesuai untuk lorong kenderaan biasa." : "Suitable for single standard lanes.", arm_length)}${option("4 Meters", t.m4, getLanguage() === "ms" ? "Lorong yang lebih lebar." : "Wider entrance lanes.", arm_length)}${option("6 Meters", t.m6, getLanguage() === "ms" ? "Untuk kawasan perindustrian/lori." : "For industrial/heavy vehicle access.", arm_length)}${option("Custom / Unsure", t.custom, getLanguage() === "ms" ? "Bincang bersama pakar kami." : "Discuss with our specialists.", arm_length)}</div>`, () => arm_length); root.querySelectorAll("input").forEach(i => i.onchange = e => { arm_length = e.target.value; render(); }); return; }

    if (screen === 3) { page(t.access, getLanguage() === "ms" ? "Bagaimana pengguna akan membuka palang?" : "How will users open the barrier?", `<div class="option-grid">${option("RFID / Card", t.rfid, getLanguage() === "ms" ? "Akses menggunakan kad atau tag." : "Access via card or tag reader.", access_system)}${option("Remote / Button", t.remote, getLanguage() === "ms" ? "Kawalan manual oleh pengawal." : "Manual control by guardhouse.", access_system)}${option("LPR Camera", t.lpr, getLanguage() === "ms" ? "Kamera cam nombor plat automatik." : "Automated License Plate Recognition.", access_system)}</div>`, () => access_system); root.querySelectorAll("input").forEach(i => i.onchange = e => { access_system = e.target.value; render(); }); return; }

    if (screen === 4) { page(t.safety, getLanguage() === "ms" ? "Pilih ciri keselamatan untuk mengelak pelanggaran." : "Choose safety features to prevent impacts.", `<div class="option-grid">${option("Loop Detector", t.loop, getLanguage() === "ms" ? "Mengesan besi kenderaan di lantai." : "Detects vehicle metal from the ground.", safety_sensor)}${option("Photo Cell", t.photocell, getLanguage() === "ms" ? "Sensor pancaran infra-merah." : "Infrared beam sensor.", safety_sensor)}${option("Both", t.both, getLanguage() === "ms" ? "Keselamatan maksimum." : "Maximum safety combination.", safety_sensor)}</div>`, () => safety_sensor); root.querySelectorAll("input").forEach(i => i.onchange = e => { safety_sensor = e.target.value; render(); }); return; }

    if (screen === 5) { page(t.install, getLanguage() === "ms" ? "Pilih status pemasangan anda." : "Choose your installation status.", `<div class="option-grid">${option("New System", t.newInstall, getLanguage() === "ms" ? "Pemasangan untuk kawasan baharu." : "Fresh installation for a new site.", install_type)}${option("Replacement", t.replace, getLanguage() === "ms" ? "Gantikan sistem palang sedia ada." : "Replace an existing barrier system.", install_type)}</div>`, () => install_type); root.querySelectorAll("input").forEach(i => i.onchange = e => { install_type = e.target.value; render(); }); return; }

    if (screen === 6) { page(t.visit, getLanguage() === "ms" ? "Adakah anda memerlukan lawatan tapak?" : "Do you require a site visit?", `<div class="option-grid">${option("Yes", t.yes, getLanguage() === "ms" ? "Pasukan kami akan menilai tapak sebelum sebut harga." : "Our team will assess the site before quoting.", site_visit)}${option("No", t.no, getLanguage() === "ms" ? "Berikan anggaran dari info ini." : "Provide an estimate based on this info.", site_visit)}</div>`, () => site_visit); root.querySelectorAll("input").forEach(i => i.onchange = e => { site_visit = e.target.value; render(); }); return; }

    const language = document.querySelector("#wizardLanguageToggle");
    if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM";

    // Screen 7: Customer Details Form
    if (screen === 7) {
      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 7 ${t.of} 8</span><span>Barrier Gate</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(7 / 8) * 100}%"></div>
      </div>
      <article class="wizard-card">
        <p class="eyebrow">BARRIER GATE</p>
        <h1 class="step-title">${t.customer}</h1>
        <p class="text-secondary">${t.customerSub}</p>
        
        <form id="contactForm" class="row g-3 mt-2 text-start">
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_name">${t.name}</label>
            <input class="form-control" id="cust_name" type="text" required value="${customer.name}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_phone">${t.phone}</label>
            <input class="form-control" id="cust_phone" type="tel" inputmode="tel" required value="${customer.phone}">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_email">${t.email}</label>
            <!-- Removed 'required' attribute below -->
            <input class="form-control" id="cust_email" type="email" value="${customer.email}">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_site">${t.location}</label>
            <input class="form-control" id="cust_site" type="text" required value="${customer.site}">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_note">${t.notes}</label>
            <textarea class="form-control" id="cust_note" rows="3">${customer.note}</textarea>
          </div>
          
          <div class="col-12 mb-0">
            <p class="error-text d-none" id="error"></p>
          </div>
          
          <div class="wizard-actions col-12 mt-4">
            <button class="btn btn-light border" type="button" id="back">${t.back}</button>
            <button class="btn btn-primary" type="submit">
              ${getLanguage() === "ms" ? "Semak Permintaan →" : "Review Request →"}
            </button>
          </div>
        </form>
      </article>`;

      const backBtn = root.querySelector("#back");
      if (backBtn) backBtn.onclick = () => { screen--; render(); };

      root.querySelector("#contactForm").onsubmit = event => {
        event.preventDefault();

        customer.name = root.querySelector("#cust_name").value.trim();
        let rawPhone = root.querySelector("#cust_phone").value.trim();
        customer.email = root.querySelector("#cust_email").value.trim();
        customer.site = root.querySelector("#cust_site").value.trim();
        customer.note = root.querySelector("#cust_note").value.trim();

        // Validate phone is ONLY numbers (allows optional '+')
        let cleanPhone = rawPhone.replace(/[-\s]/g, "");
        const phoneRegex = /^\+?[0-9]+$/;
        if (!phoneRegex.test(cleanPhone)) {
          const errorEl = root.querySelector("#error");
          errorEl.textContent = getLanguage() === "ms"
            ? "No. Telefon mestilah nombor yang sah (angka sahaja)."
            : "Phone Number must be a valid number.";
          errorEl.classList.remove("d-none");
          return;
        }

        customer.phone = cleanPhone;
        screen = 8;
        render();
      };
      return;
    }

    // Screen 8: Summary Page
    if (screen === 8) {
      const rows = [
        [t.type, barrier_type],
        [t.length, arm_length],
        [t.access, access_system],
        [t.safety, safety_sensor],
        [t.install, install_type],
        [t.visit, site_visit],
        [t.name.replace(" *", ""), customer.name],
        [t.phone.replace(" *", ""), customer.phone],
        // Added fallback logic so blank emails show as a dash
        [t.email.replace(" (Optional)", "").replace(" (Pilihan)", ""), customer.email || "-"],
        [t.location.replace(" *", ""), customer.site]
      ].map(([label, value]) => `<div class="receipt-row"><span>${label}</span><strong>${value}</strong></div>`).join("");

      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 8 ${t.of} 8</span><span>Barrier Gate</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:100%"></div>
      </div>
      <article class="summary-card">
        <div class="success-icon">✓</div>
        <p class="eyebrow">${t.summary}</p>
        <h1 class="step-title">Barrier Gate</h1>
        <p class="text-secondary">${t.message}</p>
        <div class="receipt">${rows}</div>
        
        <div class="wizard-actions d-flex justify-content-start gap-2">
          <button type="button" class="btn btn-light border" id="edit">${t.edit}</button>
          <button class="btn btn-primary" id="submitBtn">${t.review}</button>
        </div>
      </article>`;

      root.querySelector("#edit").onclick = () => { screen = 7; render(); };

      root.querySelector("#submitBtn").onclick = () => {
        const message = `
*NEW BARRIER GATE SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Barrier Type      : ${barrier_type}
Arm Length        : ${arm_length}
Access System     : ${access_system}
Safety Sensor     : ${safety_sensor}
Installation Type : ${install_type}
Site Visit        : ${site_visit}

──────────────────────────────
*CUSTOMER DETAILS*
──────────────────────────────

Name              : ${customer.name}
Phone             : ${customer.phone}
Email             : ${customer.email || "Not Provided"}
Location          : ${customer.site || "Not Provided"}
Additional Notes  : ${customer.note || "None"}

──────────────────────────────

Thank you for your enquiry.

Our team will review your requirements and contact you as soon as possible regarding your Barrier Gate system quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

        window.open(`https://wa.me/${BARRIER_GATE_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      };
    }
  }

  document.querySelector("#wizardLanguageToggle").onclick = () => { setLanguage(getLanguage() === "en" ? "ms" : "en"); render(); };
  render();
});