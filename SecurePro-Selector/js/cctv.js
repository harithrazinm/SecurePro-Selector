/* Dedicated CCTV / Camera System flow. */
const CCTV_WHATSAPP = "60196162487";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard");
  if (!root) return;

  // Safe language getter/setter helpers
  const getCurrentLang = () => (typeof getLanguage === "function" ? getLanguage() : "en");
  const setCurrentLang = (lang) => {
    if (typeof setLanguage === "function") setLanguage(lang);
  };

  const navContainer = document.querySelector(".wizard-nav .container");
  if (navContainer && !document.querySelector("#wizardLanguageToggle")) {
    navContainer.insertAdjacentHTML("beforeend", '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>');
  }

  let screen = 1;
  const TOTAL_SCREENS = 12;

  // State variables
  let cctv_property = "";
  let cctv_system = "";
  let cctv_coverage = "";
  let cctv_priority = "";
  let indoor_qty = 0;
  let outdoor_qty = 0;
  let cctv_resolution = "";
  let cctv_tech = "";
  let cctv_accessories = [];
  let cctv_internet = "";
  let cctv_site_visit = "";
  let customer = { name: "", phone: "", email: "", site: "", note: "" };

  const tr = () => getCurrentLang() === "ms" ? {
    step: "Langkah", of: "daripada",
    customer: "Maklumat Pelanggan", customerSub: "Sila masukkan butiran anda.",
    next: "Seterusnya →", back: "← Kembali", review: "Hantar WhatsApp ↗", reviewReq: "Semak Permintaan →", editBtn: "← Edit Butiran",
    name: "Nama *", phone: "Nombor telefon *", email: "E-mel (Pilihan)", location: "Lokasi pemasangan *", notes: "Nota tambahan",
    error: "Sila pilih atau isi jawapan untuk meneruskan.",
    qtyError: "Sila pilih sekurang-kurangnya 1 kamera (Indoor atau Outdoor).",
    summary: "RINGKASAN SISTEM CCTV", message: "Semak butiran anda, kemudian hantar permintaan kepada Sonic System Solution.",
    hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk sistem *CCTV*.",

    // Questions
    qPropTitle: "Apakah yang anda ingin lindungi?", qPropSub: "Kami akan memadankan liputan dengan jenis tapak.",
    qSysTitle: "Sistem CCTV manakah yang sesuai untuk anda?", qSysSub: "Tidak pasti? Pilih 'Perlukan nasihat' dan kami akan bantu.",
    qCovTitle: "Berapa banyak kawasan yang memerlukan liputan?", qCovSub: "Kawasan boleh jadi pintu masuk, bilik, atau titik pandangan lain.",
    qPriTitle: "Apakah yang paling penting?", qPriSub: "Keutamaan anda membantu kami mencadangkan ciri yang tepat.",
    qQtyTitle: "Berapakah bilangan kamera yang diperlukan?", qQtySub: "Tetapkan jumlah kamera dalam dan luar bangunan.",
    qResTitle: "Apakah resolusi kamera pilihan anda?", qResSub: "Pilih tahap kejelasan rakaman video.",
    qTechTitle: "Ciri teknikal kamera?", qTechSub: "Pilih jenis teknologi pemantauan.",
    qAccTitle: "Aksesori tambahan yang diperlukan?", qAccSub: "Pilih peralatan tambahan (Boleh pilih lebih dari satu).",
    qNetTitle: "Adakah terdapat sambungan internet di lokasi?", qNetSub: "Diperlukan untuk pemantauan terus dari telefon bimbit.",
    qVisitTitle: "Adakah anda memerlukan lawatan tapak (Site Visit)?", qVisitSub: "Jadualkan pemeriksaan tapak secara percuma oleh jurutera kami.",

    // Options - Property
    optPropHome: "Rumah", optPropHomeDesc: "Kediaman bertanah atau pangsapuri",
    optPropBiz: "Perniagaan", optPropBizDesc: "Kedai, pejabat atau unit komersial",
    optPropWh: "Gudang / Kilang", optPropWhDesc: "Premis operasi yang lebih besar",

    // Options - System
    optSysIp: "Kamera IP", optSysIpDesc: "Video digital jelas dan pemantauan jarak jauh",
    optSysAnalog: "Analog HD", optSysAnalogDesc: "Penyelesaian nilai yang boleh dipercayai",
    optSysWifi: "Wayarles", optSysWifiDesc: "Pemasangan fleksibel dengan Wi-Fi",
    optSysAdv: "Perlukan nasihat", optSysAdvDesc: "Cadangkan pilihan terbaik",

    // Options - Coverage
    optCov1: "1–4 kawasan", optCov1Desc: "Liputan padat",
    optCov2: "5–8 kawasan", optCov2Desc: "Liputan hartanah standard",
    optCov3: "9–16 kawasan", optCov3Desc: "Liputan meluas",
    optCov4: "16+ kawasan", optCov4Desc: "Liputan tapak besar",

    // Options - Priority
    optPriNight: "Penglihatan malam", optPriNightDesc: "Penglihatan jelas selepas gelap",
    optPriRemote: "Pemantauan jarak jauh", optPriRemoteDesc: "Pantau dari telefon anda",
    optPriAudio: "Rakaman audio", optPriAudioDesc: "Rakam bunyi bersama video",
    optPriAi: "Pengesanan AI", optPriAiDesc: "Amaran pintar individu atau kenderaan",

    // Counter Labels
    indoorCam: "Kamera Dalam (Indoor)", indoorDesc: "Sesuai untuk bilik, ruang tamu & pejabat",
    outdoorCam: "Kamera Luar (Outdoor)", outdoorDesc: "Kalis cuaca (IP67) untuk pagar, laman & parkir",
    camsUnit: "unit",

    // Options - Resolution
    opt720: "720p HD", opt720Desc: "Kualiti asas & penjimatan storan",
    opt1080: "1080p Full HD", opt1080Desc: "Kualiti standard paling popular",
    opt4k: "4K Ultra HD", opt4kDesc: "Kejelasan amat tinggi & perincian tajam",

    // Options - Technical Features
    optStd: "Kamera Standard", optStdDesc: "Rakaman video berterusan biasa",
    optAi: "AI / VCA (Analitis Pintar)", optAiDesc: "Pengecaman muka, amaran pencerobohan & pagar maya",

    // Options - Accessories
    optMonitor: "Monitor TV / Skrin", optMonitorDesc: "Skrin khas pemantauan secara langsung",
    optUps: "UPS (Bateri Sandaran)", optUpsDesc: "Sistem kekal hidup jika elektrik terputus",
    optRack: "Kabinet Rack 4U", optRackDesc: "Kemas & selamatkan NVR/DVR serta suis",
    optAccNone: "Tiada Aksesori", optAccNoneDesc: "Gunakan kelengkapan sedia ada sahaja",

    // Options - Internet Access
    optNetYes: "Ya, Ada Internet", optNetYesDesc: "Boleh lihat secara langsung di telefon bimbit",
    optNetNo: "Tiada Internet", optNetNoDesc: "Rakaman setempat (Local DVR/NVR) sahaja",

    // Options - Site Visit
    optVisitYes: "Ya, Perlukan Lawatan Tapak", optVisitYesDesc: "Jurutera akan menyemak kabel & laluan",
    optVisitNo: "Tidak, Sebut Harga Terus", optVisitNoDesc: "Berdasarkan maklumat yang diberikan sahaja"
  } : {
    step: "Step", of: "of",
    customer: "Customer Details", customerSub: "Please enter your details.",
    next: "Next →", back: "← Back", review: "Send on WhatsApp ↗", reviewReq: "Review Request →", editBtn: "← Edit Details",
    name: "Name *", phone: "Phone number *", email: "Email (Optional)", location: "Installation location *", notes: "Additional notes",
    error: "Please select or enter an answer to continue.",
    qtyError: "Please select at least 1 camera (Indoor or Outdoor).",
    summary: "CCTV SYSTEM SUMMARY", message: "Review your details, then send the request to Sonic System Solution.",
    hello: "Hello Sonic System Solution, I would like a quotation for a *CCTV System*.",

    // Questions
    qPropTitle: "What are you securing?", qPropSub: "We will match coverage to the type of site.",
    qSysTitle: "Which CCTV system suits you?", qSysSub: "Not sure? Choose “Need advice” and we will help.",
    qCovTitle: "How many areas need coverage?", qCovSub: "An area can be an entrance, room, driveway or other viewing point.",
    qPriTitle: "What matters most?", qPriSub: "Your priority helps us recommend the right features.",
    qQtyTitle: "How many cameras do you need?", qQtySub: "Set the quantity for indoor and outdoor areas.",
    qResTitle: "What camera resolution do you prefer?", qResSub: "Choose the video clarity level.",
    qTechTitle: "Technical features?", qTechSub: "Choose the monitoring technology type.",
    qAccTitle: "Any additional accessories needed?", qAccSub: "Select extra equipment (You can select multiple).",
    qNetTitle: "Is internet access available at the site?", qNetSub: "Required for live mobile viewing on your phone.",
    qVisitTitle: "Do you require a site visit?", qVisitSub: "Schedule a free on-site assessment by our technical team.",

    // Options - Property
    optPropHome: "Home", optPropHomeDesc: "Landed or apartment residence",
    optPropBiz: "Business", optPropBizDesc: "Shop, office or commercial unit",
    optPropWh: "Warehouse / factory", optPropWhDesc: "Larger operational premises",

    // Options - System
    optSysIp: "IP camera", optSysIpDesc: "Clear digital video and remote viewing",
    optSysAnalog: "Analog HD", optSysAnalogDesc: "Reliable value-focused setup",
    optSysWifi: "Wireless", optSysWifiDesc: "Flexible installation with Wi-Fi",
    optSysAdv: "Need advice", optSysAdvDesc: "Recommend the best fit",

    // Options - Coverage
    optCov1: "1–4 areas", optCov1Desc: "Compact coverage",
    optCov2: "5–8 areas", optCov2Desc: "Standard property coverage",
    optCov3: "9–16 areas", optCov3Desc: "Extended coverage",
    optCov4: "16+ areas", optCov4Desc: "Large site coverage",

    // Options - Priority
    optPriNight: "Night vision", optPriNightDesc: "Clear visibility after dark",
    optPriRemote: "Remote viewing", optPriRemoteDesc: "Check in from your phone",
    optPriAudio: "Audio recording", optPriAudioDesc: "Capture sound with video",
    optPriAi: "AI detection", optPriAiDesc: "Smart person or vehicle alerts",

    // Counter Labels
    indoorCam: "Indoor Camera", indoorDesc: "Ideal for rooms, living spaces & offices",
    outdoorCam: "Outdoor Camera", outdoorDesc: "Weatherproof (IP67) for gates, yards & parking",
    camsUnit: "units",

    // Options - Resolution
    opt720: "720p HD", opt720Desc: "Basic quality & storage efficient",
    opt1080: "1080p Full HD", opt1080Desc: "Most popular standard clarity",
    opt4k: "4K Ultra HD", opt4kDesc: "Ultra-high clarity with sharp details",

    // Options - Technical Features
    optStd: "Standard Camera", optStdDesc: "Standard continuous video recording",
    optAi: "AI / VCA (Smart Analytics)", optAiDesc: "Face detection, intrusion alert & virtual line crossing",

    // Options - Accessories
    optMonitor: "TV / Screen Monitor", optMonitorDesc: "Dedicated display screen for live monitoring",
    optUps: "UPS (Battery Backup)", optUpsDesc: "Keeps system running during power outages",
    optRack: "4U Server Rack Cabinet", optRackDesc: "Neatly house & secure NVR/DVR and switches",
    optAccNone: "None", optAccNoneDesc: "Use existing setup only",

    // Options - Internet Access
    optNetYes: "Yes, Internet Available", optNetYesDesc: "Enables mobile app viewing from anywhere",
    optNetNo: "No Internet", optNetNoDesc: "Local recording (DVR/NVR) only",

    // Options - Site Visit
    optVisitYes: "Yes, Request Site Visit", optVisitYesDesc: "Engineer will inspect wiring & layout",
    optVisitNo: "No, Direct Quotation", optVisitNoDesc: "Based on provided details only"
  };

  // Helpers for inputs
  const option = (value, label, description, selected) => `<label class="choice ${selected === value ? "active" : ""}"><input type="radio" name="choice" value="${value}" ${selected === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
  const checkOption = (value, label, description, selectedArray) => `<label class="choice ${selectedArray.includes(value) ? "active" : ""}"><input type="checkbox" name="choice" value="${value}" ${selectedArray.includes(value) ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
  const back = () => screen === 1 ? `<a class="btn btn-light border" href="../../index.html">${tr().back}</a>` : `<button class="btn btn-light border" type="button" id="back">${tr().back}</button>`;

  function page(title, subtitle, content, isValid, customErrorText) {
    const t = tr();
    const languageToggle = document.querySelector("#wizardLanguageToggle");
    if (languageToggle) languageToggle.textContent = getCurrentLang() === "ms" ? "EN" : "BM";

    root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} ${screen} ${t.of} ${TOTAL_SCREENS}</span><span>CCTV System</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${screen / TOTAL_SCREENS * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">CCTV SYSTEM</p><h1 class="step-title">${title}</h1><p class="text-secondary">${subtitle}</p>${content}<p class="error-text d-none" id="error">${customErrorText || t.error}</p><div class="wizard-actions">${back()}<button class="btn btn-primary" id="next" type="button">${t.next}</button></div></article>`;

    const previous = root.querySelector("#back");
    if (previous) previous.onclick = () => { screen--; render(); };
    root.querySelector("#next").onclick = () => {
      if (!isValid()) { root.querySelector("#error").classList.remove("d-none"); return; }
      screen++; render();
    };
  }

  function render() {
    const t = tr();

    // Screen 1: Property
    if (screen === 1) {
      page(t.qPropTitle, t.qPropSub, `<div class="option-grid">${option(t.optPropHome, t.optPropHome, t.optPropHomeDesc, cctv_property)}${option(t.optPropBiz, t.optPropBiz, t.optPropBizDesc, cctv_property)}${option(t.optPropWh, t.optPropWh, t.optPropWhDesc, cctv_property)}</div>`, () => cctv_property);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_property = e.target.value; render(); });
      return;
    }

    // Screen 2: System
    if (screen === 2) {
      page(t.qSysTitle, t.qSysSub, `<div class="option-grid">${option(t.optSysIp, t.optSysIp, t.optSysIpDesc, cctv_system)}${option(t.optSysAnalog, t.optSysAnalog, t.optSysAnalogDesc, cctv_system)}${option(t.optSysWifi, t.optSysWifi, t.optSysWifiDesc, cctv_system)}${option(t.optSysAdv, t.optSysAdv, t.optSysAdvDesc, cctv_system)}</div>`, () => cctv_system);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_system = e.target.value; render(); });
      return;
    }

    // Screen 3: Coverage
    if (screen === 3) {
      page(t.qCovTitle, t.qCovSub, `<div class="option-grid">${option(t.optCov1, t.optCov1, t.optCov1Desc, cctv_coverage)}${option(t.optCov2, t.optCov2, t.optCov2Desc, cctv_coverage)}${option(t.optCov3, t.optCov3, t.optCov3Desc, cctv_coverage)}${option(t.optCov4, t.optCov4, t.optCov4Desc, cctv_coverage)}</div>`, () => cctv_coverage);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_coverage = e.target.value; render(); });
      return;
    }

    // Screen 4: Priority
    if (screen === 4) {
      page(t.qPriTitle, t.qPriSub, `<div class="option-grid">${option(t.optPriNight, t.optPriNight, t.optPriNightDesc, cctv_priority)}${option(t.optPriRemote, t.optPriRemote, t.optPriRemoteDesc, cctv_priority)}${option(t.optPriAudio, t.optPriAudio, t.optPriAudioDesc, cctv_priority)}${option(t.optPriAi, t.optPriAi, t.optPriAiDesc, cctv_priority)}</div>`, () => cctv_priority);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_priority = e.target.value; render(); });
      return;
    }

    // Screen 5: Camera Quantities (Plus / Minus Counters)
    if (screen === 5) {
      const content = `
        <div class="quantity-section d-flex flex-column gap-3 mt-3 text-start">
          <div class="card p-3 border">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <strong class="d-block fs-5 text-dark">${t.indoorCam}</strong>
                <small class="text-secondary">${t.indoorDesc}</small>
              </div>
              <div class="input-group" style="width: 140px;">
                <button class="btn btn-outline-secondary fw-bold" type="button" id="btn_indoor_minus">-</button>
                <input class="form-control text-center fw-bold" id="val_indoor" type="text" readonly value="${indoor_qty}">
                <button class="btn btn-outline-secondary fw-bold" type="button" id="btn_indoor_plus">+</button>
              </div>
            </div>
          </div>

          <div class="card p-3 border">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <strong class="d-block fs-5 text-dark">${t.outdoorCam}</strong>
                <small class="text-secondary">${t.outdoorDesc}</small>
              </div>
              <div class="input-group" style="width: 140px;">
                <button class="btn btn-outline-secondary fw-bold" type="button" id="btn_outdoor_minus">-</button>
                <input class="form-control text-center fw-bold" id="val_outdoor" type="text" readonly value="${outdoor_qty}">
                <button class="btn btn-outline-secondary fw-bold" type="button" id="btn_outdoor_plus">+</button>
              </div>
            </div>
          </div>
        </div>
      `;

      page(t.qQtyTitle, t.qQtySub, content, () => (indoor_qty + outdoor_qty) > 0, t.qtyError);

      root.querySelector("#btn_indoor_minus").onclick = () => { if (indoor_qty > 0) { indoor_qty--; render(); } };
      root.querySelector("#btn_indoor_plus").onclick = () => { indoor_qty++; render(); };
      root.querySelector("#btn_outdoor_minus").onclick = () => { if (outdoor_qty > 0) { outdoor_qty--; render(); } };
      root.querySelector("#btn_outdoor_plus").onclick = () => { outdoor_qty++; render(); };
      return;
    }

    // Screen 6: Camera Resolution
    if (screen === 6) {
      page(t.qResTitle, t.qResSub, `<div class="option-grid">${option(t.opt720, t.opt720, t.opt720Desc, cctv_resolution)}${option(t.opt1080, t.opt1080, t.opt1080Desc, cctv_resolution)}${option(t.opt4k, t.opt4k, t.opt4kDesc, cctv_resolution)}</div>`, () => cctv_resolution);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_resolution = e.target.value; render(); });
      return;
    }

    // Screen 7: Technical Features (Standard vs AI/VCA)
    if (screen === 7) {
      page(t.qTechTitle, t.qTechSub, `<div class="option-grid">${option(t.optStd, t.optStd, t.optStdDesc, cctv_tech)}${option(t.optAi, t.optAi, t.optAiDesc, cctv_tech)}</div>`, () => cctv_tech);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_tech = e.target.value; render(); });
      return;
    }

    // Screen 8: Additional Accessories (Multi-select)
    if (screen === 8) {
      page(t.qAccTitle, t.qAccSub, `<div class="option-grid">${checkOption(t.optMonitor, t.optMonitor, t.optMonitorDesc, cctv_accessories)}${checkOption(t.optUps, t.optUps, t.optUpsDesc, cctv_accessories)}${checkOption(t.optRack, t.optRack, t.optRackDesc, cctv_accessories)}${checkOption(t.optAccNone, t.optAccNone, t.optAccNoneDesc, cctv_accessories)}</div>`, () => cctv_accessories.length > 0);

      root.querySelectorAll("input[type='checkbox']").forEach(i => i.onchange = e => {
        if (e.target.checked) {
          if (e.target.value === t.optAccNone) {
            cctv_accessories = [t.optAccNone];
          } else {
            cctv_accessories = cctv_accessories.filter(val => val !== t.optAccNone);
            if (!cctv_accessories.includes(e.target.value)) cctv_accessories.push(e.target.value);
          }
        } else {
          cctv_accessories = cctv_accessories.filter(val => val !== e.target.value);
        }
        render();
      });
      return;
    }

    // Screen 9: Internet Access
    if (screen === 9) {
      page(t.qNetTitle, t.qNetSub, `<div class="option-grid">${option(t.optNetYes, t.optNetYes, t.optNetYesDesc, cctv_internet)}${option(t.optNetNo, t.optNetNo, t.optNetNoDesc, cctv_internet)}</div>`, () => cctv_internet);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_internet = e.target.value; render(); });
      return;
    }

    // Screen 10: Site Visit
    if (screen === 10) {
      page(t.qVisitTitle, t.qVisitSub, `<div class="option-grid">${option(t.optVisitYes, t.optVisitYes, t.optVisitYesDesc, cctv_site_visit)}${option(t.optVisitNo, t.optVisitNo, t.optVisitNoDesc, cctv_site_visit)}</div>`, () => cctv_site_visit);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { cctv_site_visit = e.target.value; render(); });
      return;
    }

    // Screen 11: Customer Details Form
    if (screen === 11) {
      const languageToggle = document.querySelector("#wizardLanguageToggle");
      if (languageToggle) languageToggle.textContent = getCurrentLang() === "ms" ? "EN" : "BM";

      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 11 ${t.of} ${TOTAL_SCREENS}</span><span>CCTV System</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(11 / TOTAL_SCREENS) * 100}%"></div>
      </div>
      <article class="wizard-card">
        <p class="eyebrow">CCTV SYSTEM</p>
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
            <!-- Removed 'required' attribute below to make it optional -->
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
            <button class="btn btn-primary" type="submit">${t.reviewReq}</button>
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

        let cleanPhone = rawPhone.replace(/[-\s]/g, "");
        const phoneRegex = /^\+?[0-9]+$/;
        if (!phoneRegex.test(cleanPhone)) {
          const errorEl = root.querySelector("#error");
          errorEl.textContent = getCurrentLang() === "ms"
            ? "No. Telefon mestilah nombor yang sah (angka sahaja)."
            : "Phone Number must be a valid number.";
          errorEl.classList.remove("d-none");
          return;
        }

        customer.phone = cleanPhone;
        screen = 12;
        render();
      };
      return;
    }

    // Screen 12: Summary Page
    if (screen === 12) {
      const languageToggle = document.querySelector("#wizardLanguageToggle");
      if (languageToggle) languageToggle.textContent = getCurrentLang() === "ms" ? "EN" : "BM";

      const cameraQtySummary = `${indoor_qty} ${t.indoorCam.split(" ")[0]}, ${outdoor_qty} ${t.outdoorCam.split(" ")[0]} (${indoor_qty + outdoor_qty} ${t.camsUnit})`;
      const selectedAccs = cctv_accessories.join(", ");

      const rows = [
        [t.qPropTitle, cctv_property],
        [t.qSysTitle, cctv_system],
        [t.qCovTitle, cctv_coverage],
        [t.qPriTitle, cctv_priority],
        [t.qQtyTitle, cameraQtySummary],
        [t.qResTitle, cctv_resolution],
        [t.qTechTitle, cctv_tech],
        [t.qAccTitle, selectedAccs],
        [t.qNetTitle, cctv_internet],
        [t.qVisitTitle, cctv_site_visit],
        [t.name.replace(" *", ""), customer.name],
        [t.phone.replace(" *", ""), customer.phone],
        // Handled fallback for empty email in UI summary
        [t.email.replace(" (Pilihan)", "").replace(" (Optional)", ""), customer.email || "-"],
        [t.location.replace(" *", ""), customer.site]
      ].map(([label, value]) => `<div class="receipt-row"><span>${label}</span><strong>${value}</strong></div>`).join("");

      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 12 ${t.of} ${TOTAL_SCREENS}</span><span>CCTV System</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:100%"></div>
      </div>
      <article class="summary-card">
        <div class="success-icon">✓</div>
        <p class="eyebrow">${t.summary}</p>
        <h1 class="step-title">CCTV System</h1>
        <p class="text-secondary">${t.message}</p>
        <div class="receipt">${rows}</div>
        
        <div class="d-flex flex-wrap gap-2 mt-4">
          <button type="button" class="btn btn-light border" id="edit">${t.editBtn}</button>
          <button class="btn btn-primary" type="button" id="submitBtn">
            ${t.review}
          </button>
        </div>
      </article>`;

      root.querySelector("#edit").onclick = () => { screen = 11; render(); };

      root.querySelector("#submitBtn").onclick = () => {
        const message = `
*NEW CCTV SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Property Type     : ${cctv_property}
System Type       : ${cctv_system}
Coverage Area     : ${cctv_coverage}
Priority          : ${cctv_priority}
Camera Quantity   : ${cameraQtySummary}
Camera Resolution : ${cctv_resolution}
Technology        : ${cctv_tech}
Accessories       : ${selectedAccs}
Internet Access   : ${cctv_internet}
Site Visit        : ${cctv_site_visit}

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

Our team will review your requirements and contact you as soon as possible regarding your CCTV System quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

        window.open(
          `https://wa.me/${CCTV_WHATSAPP}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener"
        );
      };
    }
  }

  const langBtn = document.querySelector("#wizardLanguageToggle");
  if (langBtn) {
    langBtn.onclick = () => {
      setCurrentLang(getCurrentLang() === "en" ? "ms" : "en");
      render();
    };
  }

  render();
});