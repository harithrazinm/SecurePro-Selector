/* Dedicated six-screen Alarm flow. Values are kept in the requested variables. */
const ALARM_WHATSAPP = "60196162487";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard");
  if (!root) return;

  const navContainer = document.querySelector(".wizard-nav .container");
  if (navContainer && !document.querySelector("#wizardLanguageToggle")) {
    navContainer.insertAdjacentHTML(
      "beforeend",
      '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>'
    );
  }

  let screen = 1;
  let alarm_type = "", property_type = "", house_condition = "", alarm_acc = "", alarm_visit = "";
  let aty_pintu = 0, aty_tingkap = 0, aty_sliding = 0;
  let customer = { name: "", phone: "", email: "", site: "", note: "" };

  const copy = () => getLanguage() === "ms" ? {
    step: "Langkah", of: "daripada", 
    type: "Jenis Sistem", typeSub: "Pilih sistem penggera yang sesuai.", wired: "Berwayar", wireless: "Tanpa Wayar", hybrid: "Hibrid", 
    property: "Jenis Premis", propertySub: "Pilih jenis premis yang ingin dilindungi.", homeType: "Rumah", shop: "Kedai", office: "Pejabat", factory: "Gudang / Kilang", 
    condition: "Keadaan Rumah", conditionSub: "Pilih keadaan rumah atau premis anda.", construction: "Dalam Pembinaan", completed: "Siap Bina", 
    sensors: "Bilangan Sensor", sensorsSub: "Laraskan bilangan sensor yang diperlukan.", door: "Pintu", window: "Tingkap", sliding: "Pintu Gelangsar", 
    accessories: "Aksesori", accessoriesSub: "Pilih kaedah kawalan pilihan anda.", standard: "Kawalan Biasa", apps: "Aplikasi", 
    visit: "Lawatan Tapak", visitSub: "Adakah anda memerlukan lawatan tapak?", yes: "Ya", no: "Tidak", 
    details: "MAKLUMAT ANDA", detailsTitle: "Ke mana kami perlu hantar cadangan anda?", detailsText: "Maklumat anda hanya digunakan untuk susulan permintaan sebut harga ini.", 
    name: "Nama *", phone: "Nombor telefon *", email: "E-mel (Pilihan)", location: "Lokasi pemasangan", locationHint: "cth. Kota Bharu, Kelantan", notes: "Nota tambahan", notesHint: "Pilihan", 
    review: "Semak Permintaan →", send: "Hantar WhatsApp ↗", back: "← Kembali", home: "← Kembali", 
    ready: "RINGKASAN PENGGERA", text: "Semak butiran anda dan hantar permintaan kepada Sonic System Solution.", 
    receiptType: "Jenis Sistem", receiptProperty: "Jenis Premis", receiptCondition: "Keadaan Rumah", receiptDoor: "Sensor Pintu", receiptWindow: "Sensor Tingkap", receiptSliding: "Sensor Pintu Gelangsar", receiptAccessory: "Aksesori", receiptVisit: "Lawatan Tapak", 
    edit: "← Edit Butiran", error: "Sila pilih satu pilihan untuk meneruskan.", hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk *Sistem Penggera*."
  } : {
    step: "Step", of: "of", 
    type: "System Type", typeSub: "Choose the alarm system that suits you.", wired: "Wired", wireless: "Wireless", hybrid: "Hybrid", 
    property: "Property Type", propertySub: "Choose the type of property to protect.", homeType: "Home", shop: "Shop", office: "Office", factory: "Warehouse / Factory", 
    condition: "House Condition", conditionSub: "Choose the condition of your home or premises.", construction: "Under Construction", completed: "Completed", 
    sensors: "Number of Sensors", sensorsSub: "Adjust the number of sensors required.", door: "Door", window: "Window", sliding: "Sliding Door", 
    accessories: "Accessories", accessoriesSub: "Choose your preferred control method.", standard: "Standard Control", apps: "Apps", 
    visit: "Site Visit", visitSub: "Do you require a site visit?", yes: "Yes", no: "No", 
    details: "YOUR DETAILS", detailsTitle: "Where should we send your recommendation?", detailsText: "Your details are used only to follow up on this quote request.", 
    name: "Name *", phone: "Phone number *", email: "Email (Optional)", location: "Installation location", locationHint: "e.g. Kota Bharu, Kelantan", notes: "Additional notes", notesHint: "Optional", 
    review: "Review Request →", send: "Send on WhatsApp ↗", back: "← Back", home: "← Back", 
    ready: "ALARM SUMMARY", text: "Review your details and send the request to Sonic System Solution.", 
    receiptType: "System Type", receiptProperty: "Property Type", receiptCondition: "House Condition", receiptDoor: "Door Sensors", receiptWindow: "Window Sensors", receiptSliding: "Sliding Door Sensors", receiptAccessory: "Accessories", receiptVisit: "Site Visit", 
    edit: "← Edit Details", error: "Please select one option to continue.", hello: "Hello Sonic System Solution, I would like a quotation for *Alarm System*."
  };

  const nav = () => screen === 1 ? `<a class="btn btn-light border" href="../../index.html">${copy().home}</a>` : `<button class="btn btn-light border" id="back" type="button">${copy().back}</button>`;
  const choose = (value, label, selected, description = "") => `<label class="choice ${selected === value ? "active" : ""}"><input type="radio" name="choice" value="${value}" ${selected === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
  const actions = (nextLabel, valid) => `<p id="error" class="error-text d-none">${copy().error}</p><div class="wizard-actions">${nav()}<button id="next" class="btn btn-primary" type="button">${nextLabel}</button></div>`;
  
  const shell = (title, subtitle, body, next, valid) => { 
    const t = copy(); 
    root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} ${screen} ${t.of} 8</span><span>Alarm</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${screen / 8 * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">ALARM SYSTEM</p><h1 class="step-title">${title}</h1><p class="text-secondary mb-0">${subtitle}</p>${body}${actions(next, valid)}</article>`; 
    const back = root.querySelector("#back"); 
    if (back) back.onclick = () => { screen--; render(); }; 
    root.querySelector("#next").onclick = () => { 
      if (!valid()) { root.querySelector("#error").classList.remove("d-none"); return; } 
      screen++; render(); 
    }; 
  };

  function render() {
    const languageButton = document.querySelector("#wizardLanguageToggle");
    if (languageButton) languageButton.textContent = getLanguage() === "ms" ? "EN" : "BM";
    const t = copy();

    // Step 1: System Type
    if (screen === 1) { 
      shell(t.type, t.typeSub, `<div class="option-grid">${choose("Wired", t.wired, alarm_type, getLanguage() === "ms" ? "Sambungan kabel yang stabil untuk pemasangan tetap." : "Stable cable connection for permanent installations.")}${choose("Wireless", t.wireless, alarm_type, getLanguage() === "ms" ? "Pemasangan lebih fleksibel dengan gangguan minimum." : "Flexible installation with minimal disruption.")}${choose("Hybrid", t.hybrid, alarm_type, getLanguage() === "ms" ? "Gabungan sistem berwayar dan tanpa wayar." : "A combination of wired and wireless protection.")}</div>`, "Next →", () => Boolean(alarm_type)); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { alarm_type = e.target.value; render(); }); 
      return; 
    }

    // Step 2: Property Type
    if (screen === 2) { 
      shell(t.property, t.propertySub, `<div class="option-grid">${choose("Home", t.homeType, property_type, getLanguage() === "ms" ? "Rumah kediaman, teres, banglo atau apartmen." : "Residential house, terrace, bungalow or apartment.")}${choose("Shop", t.shop, property_type, getLanguage() === "ms" ? "Kedai, lot perniagaan atau ruang runcit." : "Shop lot, retail or business space.")}${choose("Office", t.office, property_type, getLanguage() === "ms" ? "Pejabat, ruang kerja atau bilik mesyuarat." : "Office, workspace or meeting rooms.")}${choose("Warehouse / Factory", t.factory, property_type, getLanguage() === "ms" ? "Gudang, kilang atau premis operasi besar." : "Warehouse, factory or large operational premises.")}</div>`, "Next →", () => Boolean(property_type)); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { property_type = e.target.value; render(); }); 
      return; 
    }

    // Step 3: House Condition
    if (screen === 3) { 
      shell(t.condition, t.conditionSub, `<div class="option-grid">${choose("Under Construction", t.construction, house_condition, getLanguage() === "ms" ? "Sesuai untuk perancangan dan pendawaian awal." : "Suitable for early planning and cabling.")}${choose("Completed", t.completed, house_condition, getLanguage() === "ms" ? "Pemasangan untuk rumah atau premis yang telah siap." : "Installation for a completed home or premises.")}</div>`, "Next →", () => Boolean(house_condition)); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { house_condition = e.target.value; render(); }); 
      return; 
    }

    // Step 4: Number of Sensors
    if (screen === 4) { 
      const counter = (key, label, value, description) => `<div class="border rounded-3 p-3 mb-2"><div class="d-flex align-items-center justify-content-between"><strong>${label}</strong><div class="d-flex align-items-center gap-3"><button class="btn btn-light border counter" data-key="${key}" data-change="-1" type="button">−</button><strong class="fs-5">${value}</strong><button class="btn btn-light border counter" data-key="${key}" data-change="1" type="button">+</button></div></div><small class="text-secondary">${description}</small></div>`; 
      shell(t.sensors, t.sensorsSub, `<div class="mt-4">${counter("door", t.door, aty_pintu, getLanguage() === "ms" ? "Sensor untuk pintu biasa dan pintu utama." : "Sensors for standard and main doors.")}${counter("window", t.window, aty_tingkap, getLanguage() === "ms" ? "Sensor untuk tingkap yang boleh dibuka." : "Sensors for openable windows.")}${counter("sliding", t.sliding, aty_sliding, getLanguage() === "ms" ? "Sensor untuk pintu gelangsar atau pintu patio." : "Sensors for sliding or patio doors.")}</div>`, "Next →", () => true); 
      root.querySelectorAll(".counter").forEach(button => button.onclick = () => { 
        const change = Number(button.dataset.change); 
        if (button.dataset.key === "door") aty_pintu = Math.max(0, aty_pintu + change); 
        if (button.dataset.key === "window") aty_tingkap = Math.max(0, aty_tingkap + change); 
        if (button.dataset.key === "sliding") aty_sliding = Math.max(0, aty_sliding + change); 
        render(); 
      }); 
      return; 
    }

    // Step 5: Accessories
    if (screen === 5) { 
      shell(t.accessories, t.accessoriesSub, `<div class="option-grid">${choose("Standard Control", t.standard, alarm_acc, getLanguage() === "ms" ? "Kawal sistem menggunakan alat kawalan biasa." : "Control the system with a standard remote.")}${choose("Apps", t.apps, alarm_acc, getLanguage() === "ms" ? "Kawal dan terima amaran melalui aplikasi telefon." : "Control and receive alerts through a phone app.")}</div>`, "Next →", () => Boolean(alarm_acc)); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { alarm_acc = e.target.value; render(); }); 
      return; 
    }

    // Step 6: Site Visit (Button changed to "Next →")
    if (screen === 6) { 
      shell(t.visit, t.visitSub, `<div class="option-grid">${choose("Yes", t.yes, alarm_visit, getLanguage() === "ms" ? "Pasukan kami akan menilai tapak sebelum sebut harga akhir." : "Our team will assess the site before the final quotation.")}${choose("No", t.no, alarm_visit, getLanguage() === "ms" ? "Teruskan dengan cadangan berdasarkan maklumat anda." : "Proceed with a recommendation based on your information.")}</div>`, "Next →", () => Boolean(alarm_visit)); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { alarm_visit = e.target.value; render(); }); 
      return; 
    }

    // Step 7: Customer Details Form (Submit button has arrow "Review Request →")
    if (screen === 7) { 
      root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} 7 ${t.of} 8</span><span>Alarm</span></div><div class="progress mb-4"><div class="progress-bar" style="width:87.5%"></div></div><article class="wizard-card"><p class="eyebrow">${t.details}</p><h1 class="step-title">${t.detailsTitle}</h1><p class="text-secondary">${t.detailsText}</p><form id="contactForm" class="row g-3 mt-2"><div class="col-md-6"><label class="form-label" for="name">${t.name}</label><input class="form-control" id="name" required value="${customer.name}"></div><div class="col-md-6"><label class="form-label" for="phone">${t.phone}</label><input class="form-control" id="phone" required inputmode="tel" value="${customer.phone}"></div><div class="col-12"><label class="form-label" for="email">${t.email}</label><input class="form-control" id="email" type="email" value="${customer.email}"></div><div class="col-12"><label class="form-label" for="site">${t.location}</label><input class="form-control" id="site" placeholder="${t.locationHint}" value="${customer.site}"></div><div class="col-12"><label class="form-label" for="note">${t.notes}</label><textarea class="form-control" id="note" rows="3" placeholder="${t.notesHint}">${customer.note}</textarea></div><div class="wizard-actions"><button type="button" class="btn btn-light border" id="back">${t.back}</button><button class="btn btn-primary" type="submit">${t.review}</button></div></form></article>`; 
      root.querySelector("#back").onclick = () => { screen = 6; render(); }; 
      root.querySelector("#contactForm").onsubmit = event => { 
        event.preventDefault(); 
        customer = { 
          name: root.querySelector("#name").value.trim(), 
          phone: root.querySelector("#phone").value.trim(), 
          email: root.querySelector("#email").value.trim(),
          site: root.querySelector("#site").value.trim(), 
          note: root.querySelector("#note").value.trim() 
        }; 
        screen = 8; 
        render(); 
      }; 
      return; 
    }

    // Step 8: Summary Page (Edit button text is "Edit Details" and goes back to Step 7)
    const translate = value => getLanguage() === "ms" ? ({ Wired: t.wired, Wireless: t.wireless, Hybrid: t.hybrid, Home: t.homeType, Shop: t.shop, Office: t.office, "Warehouse / Factory": t.factory, "Under Construction": t.construction, Completed: t.completed, "Standard Control": t.standard, Apps: t.apps, Yes: t.yes, No: t.no }[value] || value) : value;
    
    const rows = [
      [t.receiptType, alarm_type], 
      [t.receiptProperty, property_type], 
      [t.receiptCondition, house_condition], 
      [t.receiptDoor, aty_pintu], 
      [t.receiptWindow, aty_tingkap], 
      [t.receiptSliding, aty_sliding], 
      [t.receiptAccessory, alarm_acc], 
      [t.receiptVisit, alarm_visit], 
      [t.name.replace(" *", ""), customer.name], 
      [t.phone.replace(" *", ""), customer.phone], 
      [t.email.replace(" (Pilihan)", "").replace(" (Optional)", ""), customer.email || "-"],
      [t.location, customer.site || "-"]
    ].filter(([, value]) => value !== "").map(([label, value]) => `<div class="receipt-row"><span>${label}</span><strong>${translate(value)}</strong></div>`).join("");
    
    root.innerHTML = `<article class="summary-card"><div class="success-icon">✓</div><p class="eyebrow">${t.ready}</p><h1 class="step-title">Alarm</h1><p class="text-secondary">${t.text}</p><div class="receipt">${rows}</div><div class="d-flex flex-wrap gap-2 mt-4"><button class="btn btn-light border" id="edit" type="button">${t.edit}</button><a class="btn btn-primary" id="whatsapp" target="_blank" rel="noopener">${t.send}</a></div></article>`;
    
    const message = `
*NEW ALARM SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Alarm Type        : ${translate(alarm_type)}
Property Type     : ${translate(property_type)}
Property Condition: ${translate(house_condition)}
Number of Doors   : ${aty_pintu}
Number of Windows : ${aty_tingkap}
Sliding Doors     : ${aty_sliding}
Accessories       : ${translate(alarm_acc)}
Site Visit        : ${translate(alarm_visit)}

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

Our team will review your requirements and contact you as soon as possible regarding your Alarm System quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

    root.querySelector("#whatsapp").href = `https://wa.me/${ALARM_WHATSAPP}?text=${encodeURIComponent(message)}`;
    root.querySelector("#edit").onclick = () => { screen = 7; render(); };
  }

  document.querySelector("#wizardLanguageToggle").onclick = () => { 
    setLanguage(getLanguage() === "en" ? "ms" : "en"); 
    render(); 
  };
  
  render();
});