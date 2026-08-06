/* Dedicated Solar CCTV Wizard Script */
const SOLAR_WHATSAPP = "60196162487";
const LOGO_PATH = "../../assets/solarcctv.png";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard");
  if (!root) return;

  const getCurrentLang = () => (typeof getLanguage === "function" ? getLanguage() : "en");
  const setCurrentLang = (lang) => {
    if (typeof setLanguage === "function") setLanguage(lang);
  };

  // Add Language Toggle button in navbar if not present
  const navContainer = document.querySelector(".wizard-nav .container");
  if (navContainer && !document.querySelector("#wizardLanguageToggle")) {
    navContainer.insertAdjacentHTML(
      "beforeend",
      '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>'
    );
  }

  let screen = 1;
  const TOTAL_SCREENS = 9; // Expanded steps

  // Form State
  let solar_property = "";
  let solar_internet = "";
  let solar_unit = 1; // now a number, controlled by +/- stepper
  const MIN_UNITS = 1;
  const MAX_UNITS = 20;
  let solar_storage = "";
  let solar_night = "";
  let solar_camtype = "";
  let solar_features = "";
  let customer = { name: "", email: "", phone: "", site: "", note: "" };

  const tr = () =>
    getCurrentLang() === "ms"
      ? {
          step: "Langkah", of: "daripada",
          customer: "MAKLUMAT ANDA",
          customerTitle: "Ke mana kami perlu hantar cadangan anda?",
          customerSub: "Maklumat anda hanya digunakan untuk susulan permintaan sebut harga ini.",
          next: "Seterusnya →", back: "← Kembali", review: "Semak permintaan →", send: "Hantar melalui WhatsApp ↗",
          name: "Nama *", email: "E-mel (Pilihan)", phone: "Nombor telefon *", location: "Lokasi pemasangan",
          locationHint: "cth. Kota Bharu, Kelantan", notes: "Ada perkara lain yang perlu kami tahu?", notesHint: "Nota pilihan",
          error: "Sila pilih satu pilihan untuk meneruskan.",
          summaryTitle: "PERMINTAAN SEDIA", message: "Semak ringkasan ini, kemudian hantar terus kepada pasukan Sonic System Solution melalui WhatsApp.",
          guide: "ANGGARAN PAKEJ", price: "Daripada RM 1,200", priceNote: "Harga akhir adalah selepas penilaian tapak atau penilaian jarak jauh.",
          edit: "← Edit butiran", hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk *Solar CCTV*.",

          // Q1: Property
          qPropTitle: "Apakah yang anda ingin lindungi?", qPropSub: "Kami akan padankan liputan dengan jenis premis.",
          optPropHome: "Rumah", optPropHomeDesc: "Rumah teres, banglo atau apartmen",
          optPropBiz: "Perniagaan", optPropBizDesc: "Kedai, pejabat atau unit komersial",
          optPropWh: "Gudang / kilang", optPropWhDesc: "Premis operasi yang lebih besar",

          // Q2: Internet
          qIntTitle: "Bagaimana ketersediaan internet di tapak?", qIntSub: "Kamera solar perlukan internet untuk pemantauan jarak jauh.",
          optIntWifi: "Ada Wi-Fi", optIntWifiDesc: "Menggunakan router rumah atau pejabat",
          optInt4g: "Tiada Wi-Fi (Perlu Sim 4G)", optInt4gDesc: "Kawasan terpencil tanpa internet tetap",
          optIntNotSure: "Belum pasti", optIntNotSureDesc: "Perlukan nasihat teknikal",

          // Q3: Units (stepper)
          qUnitTitle: "Berapa bilangan unit yang diperlukan?", qUnitSub: "Guna butang + / − untuk tetapkan jumlah kamera solar.",
          unitSingular: "unit", unitPlural: "unit",
          unitDesc1: "Untuk 1 titik pemantauan fokus",
          unitDesc2: "Pemantauan depan dan belakang",
          unitDesc34: "Liputan keliling asas",
          unitDesc5plus: "Liputan komprehensif tapak luas",

          // Q4: Storage
          qStoTitle: "Berapa besar kapasiti simpanan video?", qStoSub: "Tempoh rakaman bergantung kepada saiz kad memori.",
          optSto64: "64GB", optSto64Desc: "Anggaran rakaman 4–6 hari",
          optSto128: "128GB", optSto128Desc: "Anggaran rakaman 8–12 hari",
          optSto256: "256GB", optSto256Desc: "Anggaran rakaman 15–20 hari",
          optStoCloud: "Storan Awan (Cloud)", optStoCloudDesc: "Simpanan dalam talian (langganan)",

          // Q5: Night Mode
          qNightTitle: "Apakah jenis mod malam pilihan anda?", qNightSub: "Pilih cara kamera merakam dalam keadaan gelap.",
          optNightColor: "Warna Penuh (Full Color)", optNightColorDesc: "Dilengkapi lampu sorot (spotlight) terbina",
          optNightIr: "Inframerah (IR)", optNightIrDesc: "Paparan jelas dalam hitam & putih",
          optNightSmart: "Mod Pintar", optNightSmartDesc: "Tukar ke warna penuh automatik bila ada pergerakan",

          // Q6: Camera Type
          qCamTitle: "Pilih jenis reka bentuk kamera.", qCamSub: "Setiap bentuk mempunyai fungsi pergerakan yang berbeza.",
          optCamPtz: "PTZ (Boleh pusing)", optCamPtzDesc: "Boleh dipusing dan dizum melalui telefon (Pan/Tilt/Zoom)",
          optCamBullet: "Bullet (Kekal)", optCamBulletDesc: "Sudut pandangan tetap, sesuai untuk kawasan luar",
          optCamDome: "Kubah (Dome)", optCamDomeDesc: "Sesuai untuk siling anjung atau dalaman",

          // Q7: Features
          qFeatTitle: "Pilih ciri tambahan (jika ada).", qFeatSub: "Fungsi ekstra untuk memaksimumkan keselamatan anda.",
          optFeatDual: "Dwi Kanta (Dual Lens)", optFeatDualDesc: "Paparan lebar dan fokus perincian serentak",
          optFeat2way: "Audio 2-Hala", optFeat2wayDesc: "Mikrofon dan pembesar suara untuk komunikasi",
          optFeatSiren: "Siren & Penggera", optFeatSirenDesc: "Lampu dan bunyi amaran untuk menakutkan penceroboh",
          optFeatBasic: "Ciri Asas Sahaja", optFeatBasicDesc: "Rakaman standard tanpa ciri tambahan"
        }
      : {
          step: "Step", of: "of",
          customer: "YOUR DETAILS",
          customerTitle: "Where should we send your recommendation?",
          customerSub: "Your details are used only to follow up on this quote request.",
          next: "Next →", back: "← Back", review: "Review request →", send: "Send on WhatsApp ↗",
          name: "Name *", email: "Email (Optional)", phone: "Phone number *", location: "Installation location",
          locationHint: "e.g. Kota Bharu, Kelantan", notes: "Anything else we should know?", notesHint: "Optional notes",
          error: "Please select one option to continue.",
          summaryTitle: "REQUEST READY", message: "Review this summary, then send it directly to our Sonic System Solution team on WhatsApp.",
          guide: "Indicative package guide", price: "From RM 1,200", priceNote: "Final pricing follows an on-site or remote assessment.",
          edit: "← Edit details", hello: "Hello Sonic System Solution, I would like a quotation for *Solar CCTV*.",

          // Q1: Property
          qPropTitle: "What are you securing?", qPropSub: "We will match coverage to the type of site.",
          optPropHome: "Home", optPropHomeDesc: "Landed or apartment residence",
          optPropBiz: "Business", optPropBizDesc: "Shop, office or commercial unit",
          optPropWh: "Warehouse / factory", optPropWhDesc: "Larger operational premises",

          // Q2: Internet
          qIntTitle: "What is the internet access at the site?", qIntSub: "Solar cameras require a connection for remote viewing.",
          optIntWifi: "Wi-Fi Available", optIntWifiDesc: "Connects to a home or office router",
          optInt4g: "No Wi-Fi (Needs 4G Sim)", optInt4gDesc: "Remote area requiring cellular connection",
          optIntNotSure: "Not Sure", optIntNotSureDesc: "I need technical advice on this",

          // Q3: Units (stepper)
          qUnitTitle: "How many camera units do you need?", qUnitSub: "Use the + / − buttons to set the number of solar cameras.",
          unitSingular: "unit", unitPlural: "units",
          unitDesc1: "For a single focal point",
          unitDesc2: "Front and back monitoring",
          unitDesc34: "Basic perimeter coverage",
          unitDesc5plus: "Comprehensive coverage for a large site",

          // Q4: Storage
          qStoTitle: "What is your preferred storage capacity?", qStoSub: "Recording duration depends on the memory size.",
          optSto64: "64GB", optSto64Desc: "Approx. 4–6 days of recording",
          optSto128: "128GB", optSto128Desc: "Approx. 8–12 days of recording",
          optSto256: "256GB", optSto256Desc: "Approx. 15–20 days of recording",
          optStoCloud: "Cloud Storage", optStoCloudDesc: "Online backup (subscription based)",

          // Q5: Night Mode
          qNightTitle: "Which night mode type do you prefer?", qNightSub: "Choose how the camera records in the dark.",
          optNightColor: "Full Color", optNightColorDesc: "Comes with built-in spotlights",
          optNightIr: "Infrared (IR)", optNightIrDesc: "Clear black and white visibility",
          optNightSmart: "Smart Mode", optNightSmartDesc: "Auto-switches to color when motion is detected",

          // Q6: Camera Type
          qCamTitle: "Select your preferred camera type.", qCamSub: "Different designs offer different movement capabilities.",
          optCamPtz: "PTZ (Pan/Tilt/Zoom)", optCamPtzDesc: "Rotates and zooms via the mobile app",
          optCamBullet: "Bullet (Fixed)", optCamBulletDesc: "Fixed viewing angle, ideal for outdoors",
          optCamDome: "Dome", optCamDomeDesc: "Best suited for porch ceilings or indoors",

          // Q7: Features
          qFeatTitle: "Any additional features required?", qFeatSub: "Extra functions to maximize your security.",
          optFeatDual: "Dual Lens", optFeatDualDesc: "Wide view and detail focus simultaneously",
          optFeat2way: "2-Way Audio", optFeat2wayDesc: "Built-in microphone and speaker",
          optFeatSiren: "Active Siren & Alarm", optFeatSirenDesc: "Lights and sounds to deter intruders",
          optFeatBasic: "Basic Setup Only", optFeatBasicDesc: "Standard recording without extra features"
        };

  const option = (value, label, description, selected) => `
    <label class="choice ${selected === value ? "active" : ""}">
      <input type="radio" name="choice" value="${value}" ${selected === value ? "checked" : ""}>
      <strong>${label}</strong>
      <small>${description}</small>
    </label>`;

  const renderLogoHeader = () => `
    <div class="d-flex align-items-center gap-2 mb-2">
      <img src="${LOGO_PATH}" alt="Solar CCTV Logo" style="width: 32px; height: 32px; object-fit: contain;">
      <p class="eyebrow mb-0">Solar CCTV</p>
    </div>`;

  const updateLangButton = () => {
    const btn = document.querySelector("#wizardLanguageToggle");
    if (btn) btn.textContent = getCurrentLang() === "ms" ? "EN" : "BM";
  };

  // Helpers for the unit stepper
  const unitLabel = (t) => (solar_unit === 1 ? t.unitSingular : t.unitPlural);
  const unitDescription = (t) => {
    if (solar_unit <= 1) return t.unitDesc1;
    if (solar_unit === 2) return t.unitDesc2;
    if (solar_unit <= 4) return t.unitDesc34;
    return t.unitDesc5plus;
  };
  const unitSummaryText = (t) => `${solar_unit} ${unitLabel(t)}`;

  function renderPage(title, subtitle, content, isValid) {
    const t = tr();
    updateLangButton();

    const backBtnHtml =
      screen === 1
        ? `<a class="btn btn-light border" href="../../index.html">${t.back}</a>`
        : `<button class="btn btn-light border" type="button" id="back">${t.back}</button>`;

    root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} ${screen} ${t.of} ${TOTAL_SCREENS}</span>
        <span>Solar CCTV</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(screen / TOTAL_SCREENS) * 100}%"></div>
      </div>
      <article class="wizard-card">
        ${renderLogoHeader()}
        <h1 class="step-title">${title}</h1>
        <p class="text-secondary">${subtitle}</p>
        ${content}
        <p class="error-text d-none" id="error">${t.error}</p>
        <div class="wizard-actions">
          ${backBtnHtml}
          <button class="btn btn-primary" id="next" type="button">${t.next}</button>
        </div>
      </article>`;

    const backBtn = root.querySelector("#back");
    if (backBtn) backBtn.onclick = () => { screen--; render(); };

    root.querySelector("#next").onclick = () => {
      if (!isValid()) {
        root.querySelector("#error").classList.remove("d-none");
        return;
      }
      screen++;
      render();
    };
  }

  function render() {
    const t = tr();

    // Screen 1: Property
    if (screen === 1) {
      renderPage(t.qPropTitle, t.qPropSub, `
        <div class="option-grid">
          ${option(t.optPropHome, t.optPropHome, t.optPropHomeDesc, solar_property)}
          ${option(t.optPropBiz, t.optPropBiz, t.optPropBizDesc, solar_property)}
          ${option(t.optPropWh, t.optPropWh, t.optPropWhDesc, solar_property)}
        </div>`, () => solar_property);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_property = e.target.value; render(); });
      return;
    }

    // Screen 2: Internet Access
    if (screen === 2) {
      renderPage(t.qIntTitle, t.qIntSub, `
        <div class="option-grid">
          ${option(t.optIntWifi, t.optIntWifi, t.optIntWifiDesc, solar_internet)}
          ${option(t.optInt4g, t.optInt4g, t.optInt4gDesc, solar_internet)}
          ${option(t.optIntNotSure, t.optIntNotSure, t.optIntNotSureDesc, solar_internet)}
        </div>`, () => solar_internet);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_internet = e.target.value; render(); });
      return;
    }

    // Screen 3: Units — plus/minus stepper
    if (screen === 3) {
      renderPage(t.qUnitTitle, t.qUnitSub, `
        <div class="unit-stepper d-flex align-items-center justify-content-center gap-4 my-4">
          <button type="button" class="btn btn-light border rounded-circle unit-btn" id="unitMinus"
            style="width:52px;height:52px;font-size:26px;line-height:1;" ${solar_unit <= MIN_UNITS ? "disabled" : ""}>−</button>
          <div class="text-center" style="min-width:110px;">
            <div id="unitCount" style="font-size:48px;font-weight:700;line-height:1;">${solar_unit}</div>
            <small class="text-secondary text-uppercase">${unitLabel(t)}</small>
          </div>
          <button type="button" class="btn btn-light border rounded-circle unit-btn" id="unitPlus"
            style="width:52px;height:52px;font-size:26px;line-height:1;" ${solar_unit >= MAX_UNITS ? "disabled" : ""}>+</button>
        </div>
        <p class="text-secondary text-center">${unitDescription(t)}</p>`,
        () => solar_unit >= MIN_UNITS);

      root.querySelector("#unitMinus").onclick = () => {
        if (solar_unit > MIN_UNITS) { solar_unit--; render(); }
      };
      root.querySelector("#unitPlus").onclick = () => {
        if (solar_unit < MAX_UNITS) { solar_unit++; render(); }
      };
      return;
    }

    // Screen 4: Storage
    if (screen === 4) {
      renderPage(t.qStoTitle, t.qStoSub, `
        <div class="option-grid">
          ${option(t.optSto64, t.optSto64, t.optSto64Desc, solar_storage)}
          ${option(t.optSto128, t.optSto128, t.optSto128Desc, solar_storage)}
          ${option(t.optSto256, t.optSto256, t.optSto256Desc, solar_storage)}
          ${option(t.optStoCloud, t.optStoCloud, t.optStoCloudDesc, solar_storage)}
        </div>`, () => solar_storage);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_storage = e.target.value; render(); });
      return;
    }

    // Screen 5: Night Mode
    if (screen === 5) {
      renderPage(t.qNightTitle, t.qNightSub, `
        <div class="option-grid">
          ${option(t.optNightColor, t.optNightColor, t.optNightColorDesc, solar_night)}
          ${option(t.optNightIr, t.optNightIr, t.optNightIrDesc, solar_night)}
          ${option(t.optNightSmart, t.optNightSmart, t.optNightSmartDesc, solar_night)}
        </div>`, () => solar_night);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_night = e.target.value; render(); });
      return;
    }

    // Screen 6: Camera Type
    if (screen === 6) {
      renderPage(t.qCamTitle, t.qCamSub, `
        <div class="option-grid">
          ${option(t.optCamPtz, t.optCamPtz, t.optCamPtzDesc, solar_camtype)}
          ${option(t.optCamBullet, t.optCamBullet, t.optCamBulletDesc, solar_camtype)}
          ${option(t.optCamDome, t.optCamDome, t.optCamDomeDesc, solar_camtype)}
        </div>`, () => solar_camtype);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_camtype = e.target.value; render(); });
      return;
    }

    // Screen 7: Features
    if (screen === 7) {
      renderPage(t.qFeatTitle, t.qFeatSub, `
        <div class="option-grid">
          ${option(t.optFeatDual, t.optFeatDual, t.optFeatDualDesc, solar_features)}
          ${option(t.optFeat2way, t.optFeat2way, t.optFeat2wayDesc, solar_features)}
          ${option(t.optFeatSiren, t.optFeatSiren, t.optFeatSirenDesc, solar_features)}
          ${option(t.optFeatBasic, t.optFeatBasic, t.optFeatBasicDesc, solar_features)}
        </div>`, () => solar_features);
      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_features = e.target.value; render(); });
      return;
    }

    // Screen 8: Customer Details Form
    if (screen === 8) {
      updateLangButton();
      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 8 ${t.of} ${TOTAL_SCREENS}</span><span>Solar CCTV</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(8 / TOTAL_SCREENS) * 100}%"></div>
      </div>
      <article class="wizard-card">
        <div class="d-flex align-items-center gap-2 mb-2">
          <img src="${LOGO_PATH}" alt="Solar CCTV Logo" style="width: 32px; height: 32px; object-fit: contain;">
          <p class="eyebrow mb-0">${t.customer}</p>
        </div>
        <h1 class="step-title">${t.customerTitle}</h1>
        <p class="text-secondary">${t.customerSub}</p>
        
        <form id="contactForm" class="row g-3 mt-2 text-start">
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_name">${t.name}</label>
            <input class="form-control" id="cust_name" type="text" required value="${customer.name}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_email">${t.email}</label>
            <!-- Removed required attribute below to make email optional -->
            <input class="form-control" id="cust_email" type="email" value="${customer.email}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_phone">${t.phone}</label>
            <input class="form-control" id="cust_phone" type="tel" inputmode="tel" required value="${customer.phone}">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_site">${t.location}</label>
            <input class="form-control" id="cust_site" type="text" placeholder="${t.locationHint}" value="${customer.site}">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_note">${t.notes}</label>
            <textarea class="form-control" id="cust_note" rows="3" placeholder="${t.notesHint}">${customer.note}</textarea>
          </div>
          <div class="wizard-actions col-12 mt-4">
            <button class="btn btn-light border" type="button" id="back">${t.back}</button>
            <button class="btn btn-primary" type="submit">${t.review}</button>
          </div>
        </form>
      </article>`;

      root.querySelector("#back").onclick = () => { screen--; render(); };
      root.querySelector("#contactForm").onsubmit = (event) => {
        event.preventDefault();
        customer.name = root.querySelector("#cust_name").value.trim();
        customer.email = root.querySelector("#cust_email").value.trim();
        customer.phone = root.querySelector("#cust_phone").value.trim();
        customer.site = root.querySelector("#cust_site").value.trim();
        customer.note = root.querySelector("#cust_note").value.trim();
        screen = 9;
        render();
      };
      return;
    }

    // Screen 9: Summary & WhatsApp
    if (screen === 9) {
      updateLangButton();
      const rows = [
        [t.qPropTitle, solar_property],
        [t.qIntTitle, solar_internet],
        [t.qUnitTitle, unitSummaryText(t)],
        [t.qStoTitle, solar_storage],
        [t.qNightTitle, solar_night],
        [t.qCamTitle, solar_camtype],
        [t.qFeatTitle, solar_features],
        [t.name.replace(" *", ""), customer.name],
        [t.email.replace(" (Optional)", "").replace(" (Pilihan)", ""), customer.email || "-"],
        [t.phone.replace(" *", ""), customer.phone],
        ...(customer.site ? [[t.location, customer.site]] : [])
      ].map(([label, value]) => `<div class="receipt-row"><span>${label}</span><strong>${value}</strong></div>`).join("");

      root.innerHTML = `
      <article class="summary-card">
        <div class="d-flex justify-content-center mb-2">
          <img src="${LOGO_PATH}" alt="Solar CCTV Logo" style="width: 48px; height: 48px; object-fit: contain;">
        </div>
        <div class="success-icon">✓</div>
        <p class="eyebrow">${t.summaryTitle}</p>
        <h1 class="step-title">Solar CCTV</h1>
        <p class="text-secondary">${t.message}</p>
        <div class="receipt">${rows}</div>
        

        <div class="d-flex flex-wrap gap-2 mt-4">
          <button type="button" class="btn btn-light border" id="edit">${t.edit}</button>
          <button class="btn btn-primary" id="submitBtn">${t.send}</button>
        </div>
      </article>`;

      root.querySelector("#edit").onclick = () => { screen = 8; render(); };
      root.querySelector("#submitBtn").onclick = () => {
const message = `
*NEW SOLAR CCTV SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Property Type     : ${solar_property}
Internet Access   : ${solar_internet}
Camera Quantity   : ${unitSummaryText(t)}
Storage Duration  : ${solar_storage}
Night Vision      : ${solar_night}
Camera Type       : ${solar_camtype}
Required Features : ${solar_features}

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

Our team will review your requirements and contact you as soon as possible regarding your Solar CCTV System quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

window.open(
    `https://wa.me/${SOLAR_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener"
);
      };
    }
  }

  // Handle global language button click inside header
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "wizardLanguageToggle") {
      setCurrentLang(getCurrentLang() === "en" ? "ms" : "en");
      render();
    }
  });

  render();
});