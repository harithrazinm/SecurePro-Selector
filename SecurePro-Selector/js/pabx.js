/* Dedicated PABX System Version 1 flow. */
const PABX_WHATSAPP = "60196162487";
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard"); if (!root) return;
  const navContainer = document.querySelector(".wizard-nav .container");
  if (navContainer && !document.querySelector("#wizardLanguageToggle")) navContainer.insertAdjacentHTML("beforeend", '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>');

  let screen = 1, pabx_property = "", pabx_ext = "", pabx_system = "", pabx_features = "", pabx_wiring = "", pabx_visit = "";
  let customer = { name: "", email: "", phone: "", site: "", note: "" };

  const tr = () => getLanguage() === "ms" ? {
    step: "Langkah", of: "daripada",
    property: "Jenis Premis", ext: "Jumlah Sambungan (Extension)", system: "Jenis Sistem",
    features: "Ciri-ciri Utama", wiring: "Status Pendawaian", visit: "Lawatan Tapak",
    customer: "Maklumat Pelanggan", customerSub: "Sila masukkan butiran anda.",
    smallOffice: "Pejabat Kecil / PKS", corporate: "Korporat / Bangunan", hotel: "Hotel / Hospitaliti",
    ext1: "1 - 8 Pengguna", ext2: "9 - 24 Pengguna", ext3: "25 - 50 Pengguna", ext4: "Lebih 50 Pengguna",
    ipPbx: "Sistem IP-PBX (Moden)", analog: "Sistem Analog (Tradisional)", unsure: "Tidak Pasti / Perlu Nasihat",
    ivr: "Auto Attendant (Sapaan Suara)", recording: "Rakaman Panggilan", basic: "Panggilan Asas Sahaja",
    existing: "Pendawaian Sedia Ada", newWiring: "Perlu Pendawaian Baharu",
    yes: "Ya", no: "Tidak", next: "Seterusnya →", back: "← Kembali", edit: "← Pinda Butiran", review: "Hantar WhatsApp ↗",
    name: "Nama *", email: "E-mel (Pilihan)", phone: "Nombor telefon *", location: "Lokasi pemasangan *", notes: "Nota tambahan",
    error: "Sila pilih atau isi jawapan untuk meneruskan.", summary: "RINGKASAN PABX",
    message: "Semak butiran anda, kemudian hantar permintaan kepada Sonic System Solution.",
    hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk *Sistem PABX*."
  } : {
    step: "Step", of: "of",
    property: "Property Type", ext: "Number of Extensions", system: "System Type",
    features: "Key Features", wiring: "Wiring Status", visit: "Site Visit",
    customer: "Customer Details", customerSub: "Please enter your details.",
    smallOffice: "Small Office / SME", corporate: "Corporate / Building", hotel: "Hotel / Hospitality",
    ext1: "1 - 8 Users", ext2: "9 - 24 Users", ext3: "25 - 50 Users", ext4: "50+ Users",
    ipPbx: "IP-PBX System (Modern)", analog: "Analog System (Traditional)", unsure: "Unsure / Need Advice",
    ivr: "Auto Attendant (IVR)", recording: "Call Recording", basic: "Basic Calling Only",
    existing: "Existing Wiring / Network", newWiring: "Need New Wiring",
    yes: "Yes", no: "No", next: "Next →", back: "← Back", edit: "← Edit Details", review: "Send on WhatsApp ↗",
    name: "Name *", email: "Email (Optional)", phone: "Phone number *", location: "Installation location *", notes: "Additional notes",
    error: "Please select or enter an answer to continue.", summary: "PABX SUMMARY",
    message: "Review your details, then send the request to Sonic System Solution.",
    hello: "Hello Sonic System Solution, I would like a quotation for a *PABX System*."
  };

  const option = (value, label, description, selected) => `<label class="choice ${selected === value ? "active" : ""}"><input type="radio" name="choice" value="${value}" ${selected === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
  const back = () => screen === 1 ? `<a class="btn btn-light border" href="../../index.html">${tr().back}</a>` : `<button class="btn btn-light border" type="button" id="back">${tr().back}</button>`;

  function page(title, subtitle, content, isValid) {
    const t = tr();
    const language = document.querySelector("#wizardLanguageToggle");
    if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM";

    root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} ${screen} ${t.of} 8</span><span>PABX System</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${screen / 8 * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">PABX SYSTEM</p><h1 class="step-title">${title}</h1><p class="text-secondary">${subtitle}</p>${content}<p class="error-text d-none" id="error">${t.error}</p><div class="wizard-actions">${back()}<button class="btn btn-primary" id="next" type="button">${t.next}</button></div></article>`;

    const previous = root.querySelector("#back");
    if (previous) previous.onclick = () => { screen--; render(); };
    root.querySelector("#next").onclick = () => {
      if (!isValid()) { root.querySelector("#error").classList.remove("d-none"); return; }
      screen++; render();
    };
  }

  function render() {
    const t = tr();

    if (screen === 1) { page(t.property, getLanguage() === "ms" ? "Di manakah sistem ini akan dipasang?" : "Where will this system be installed?", `<div class="option-grid">${option("Small Office", t.smallOffice, getLanguage() === "ms" ? "Pemasangan standard untuk ruang pejabat biasa." : "Standard setup for regular office spaces.", pabx_property)}${option("Corporate", t.corporate, getLanguage() === "ms" ? "Komunikasi pelbagai aras / jabatan." : "Multi-level or multi-department communication.", pabx_property)}${option("Hotel", t.hotel, getLanguage() === "ms" ? "Fungsi khas bilik ke bilik & meja depan." : "Room-to-room and front desk features.", pabx_property)}</div>`, () => pabx_property); root.querySelectorAll("input").forEach(i => i.onchange = e => { pabx_property = e.target.value; render(); }); return; }

    if (screen === 2) { page(t.ext, getLanguage() === "ms" ? "Berapakah jumlah telefon/pengguna yang diperlukan?" : "How many phones/users do you need?", `<div class="option-grid">${option("1-8 Users", t.ext1, "", pabx_ext)}${option("9-24 Users", t.ext2, "", pabx_ext)}${option("25-50 Users", t.ext3, "", pabx_ext)}${option("50+ Users", t.ext4, "", pabx_ext)}</div>`, () => pabx_ext); root.querySelectorAll("input").forEach(i => i.onchange = e => { pabx_ext = e.target.value; render(); }); return; }

    if (screen === 3) { page(t.system, getLanguage() === "ms" ? "Pilih pilihan teknologi anda (jika ada)." : "Select your technology preference (if any).", `<div class="option-grid">${option("IP-PBX", t.ipPbx, getLanguage() === "ms" ? "Menggunakan rangkaian internet. Fleksibel & moden." : "Uses internet network. Flexible & scalable.", pabx_system)}${option("Analog", t.analog, getLanguage() === "ms" ? "Kos efektif & menggunakan wayar telefon biasa." : "Cost-effective & uses standard phone wires.", pabx_system)}${option("Unsure", t.unsure, getLanguage() === "ms" ? "Biar pakar kami syorkan yang terbaik." : "Let our experts recommend the best fit.", pabx_system)}</div>`, () => pabx_system); root.querySelectorAll("input").forEach(i => i.onchange = e => { pabx_system = e.target.value; render(); }); return; }

    if (screen === 4) { page(t.features, getLanguage() === "ms" ? "Apakah ciri yang paling penting untuk perniagaan anda?" : "What is the most important feature for your business?", `<div class="option-grid">${option("Auto Attendant", t.ivr, getLanguage() === "ms" ? "Sapaan automatik & navigasi menu suara." : "Automated greeting & voice menu routing.", pabx_features)}${option("Call Recording", t.recording, getLanguage() === "ms" ? "Rakam panggilan untuk tujuan latihan & kualiti." : "Record calls for training and quality purposes.", pabx_features)}${option("Basic", t.basic, getLanguage() === "ms" ? "Hanya memerlukan panggilan masuk dan keluar biasa." : "Just need standard incoming and outgoing calls.", pabx_features)}</div>`, () => pabx_features); root.querySelectorAll("input").forEach(i => i.onchange = e => { pabx_features = e.target.value; render(); }); return; }

    if (screen === 5) { page(t.wiring, getLanguage() === "ms" ? "Apakah status rangkaian / wayar di premis anda?" : "What is the network / wiring status at your premise?", `<div class="option-grid">${option("Existing", t.existing, getLanguage() === "ms" ? "Kabel telefon / LAN sudah tersedia." : "Telephone / LAN cables are already in place.", pabx_wiring)}${option("New Wiring", t.newWiring, getLanguage() === "ms" ? "Perlukan penarikan kabel baharu." : "Require new cable installation.", pabx_wiring)}</div>`, () => pabx_wiring); root.querySelectorAll("input").forEach(i => i.onchange = e => { pabx_wiring = e.target.value; render(); }); return; }

    if (screen === 6) { page(t.visit, getLanguage() === "ms" ? "Adakah anda memerlukan lawatan tapak?" : "Do you require a site visit?", `<div class="option-grid">${option("Yes", t.yes, getLanguage() === "ms" ? "Pasukan kami akan menilai tapak sebelum sebut harga." : "Our team will assess the site before quoting.", pabx_visit)}${option("No", t.no, getLanguage() === "ms" ? "Berikan anggaran dari info ini." : "Provide an estimate based on this info.", pabx_visit)}</div>`, () => pabx_visit); root.querySelectorAll("input").forEach(i => i.onchange = e => { pabx_visit = e.target.value; render(); }); return; }

    const language = document.querySelector("#wizardLanguageToggle");
    if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM";

    // Screen 7: Customer Details Form
    if (screen === 7) {
      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 7 ${t.of} 8</span><span>PABX System</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(7 / 8) * 100}%"></div>
      </div>
      <article class="wizard-card">
        <p class="eyebrow">PABX SYSTEM</p>
        <h1 class="step-title">${t.customer}</h1>
        <p class="text-secondary">${t.customerSub}</p>
        
        <form id="contactForm" class="row g-3 mt-2 text-start">
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_name">${t.name}</label>
            <input class="form-control" id="cust_name" type="text" required value="${customer.name}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_email">${t.email}</label>
            <!-- Removed 'required' attribute to make email optional -->
            <input class="form-control" id="cust_email" type="email" value="${customer.email}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_phone">${t.phone}</label>
            <input class="form-control" id="cust_phone" type="tel" inputmode="tel" required value="${customer.phone}">
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
        customer.email = root.querySelector("#cust_email").value.trim();
        let rawPhone = root.querySelector("#cust_phone").value.trim();
        customer.site = root.querySelector("#cust_site").value.trim();
        customer.note = root.querySelector("#cust_note").value.trim();

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
        [t.property, pabx_property],
        [t.ext, pabx_ext],
        [t.system, pabx_system],
        [t.features, pabx_features],
        [t.wiring, pabx_wiring],
        [t.visit, pabx_visit],
        [t.name.replace(" *", ""), customer.name],
        [t.email.replace(" (Optional)", "").replace(" (Pilihan)", ""), customer.email || "-"],
        [t.phone.replace(" *", ""), customer.phone],
        [t.location.replace(" *", ""), customer.site]
      ].map(([label, value]) => `<div class="receipt-row"><span>${label}</span><strong>${value}</strong></div>`).join("");

      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 8 ${t.of} 8</span><span>PABX System</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:100%"></div>
      </div>
      <article class="summary-card">
        <div class="success-icon">✓</div>
        <p class="eyebrow">${t.summary}</p>
        <h1 class="step-title">PABX System</h1>
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
*NEW PABX SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Property Type      : ${pabx_property}
Extensions         : ${pabx_ext}
Preferred System   : ${pabx_system}
Required Features  : ${pabx_features}
Wiring Condition   : ${pabx_wiring}
Site Visit         : ${pabx_visit}

──────────────────────────────
*CUSTOMER DETAILS*
──────────────────────────────

Name               : ${customer.name}
Phone              : ${customer.phone}
Email              : ${customer.email || "Not Provided"}
Location           : ${customer.site || "Not Provided"}
Additional Notes   : ${customer.note || "None"}

──────────────────────────────

Thank you for your enquiry.

Our team will review your requirements and contact you as soon as possible regarding your PABX system quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

        window.open(`https://wa.me/${PABX_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      };
    }
  }

  document.querySelector("#wizardLanguageToggle").onclick = () => { setLanguage(getLanguage() === "en" ? "ms" : "en"); render(); };
  render();
});