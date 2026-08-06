/* Dedicated eight-screen Solar Water Pump flow with Customer Details & Site Visit separated. */
const SOLAR_PUMP_WHATSAPP = "60196162487";
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard"); if (!root) return;
  const nav = document.querySelector(".wizard-nav .container");
  if (nav && !document.querySelector("#wizardLanguageToggle")) nav.insertAdjacentHTML("beforeend", '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>');

  // State variables including customer
  let screen = 1, solar_source = "", water_use = "", tank_capacity = "", tank_distance = "", tank_height = "", solar_visit = "";
  let customer = { name: "", email: "", phone: "", site: "", note: "" };

  const text = () => getLanguage() === "ms" ? {
    step: "Langkah", of: "daripada",
    source: "Sumber Air", sourceSub: "Pilih sumber air utama untuk pam solar.", river: "Sungai", pond: "Kolam", bore: "Boring",
    usage: "Kegunaan Air", usageSub: "Apakah kegunaan pam air ini?", irrigation: "Pengairan", irrigationSub: "Menyiram tanaman atau landskap", livestock: "Ternakan", livestockSub: "Bekalan palung atau kawasan haiwan", domestic: "Domestik", domesticSub: "Bekalan air rumah atau kawasan kecil", other: "Lain-lain", otherSub: "Kes penggunaan khusus yang lain",
    capacity: "Kapasiti Tangki", capacitySub: "Pilih anggaran jumlah air yang diperlukan setiap hari.",
    distance: "Jarak ke Tangki", distanceSub: "Pilih anggaran jarak dari sumber air ke tangki.",
    height: "Ketinggian ke Tangki", heightSub: "Pilih anggaran ketinggian menegak dari sumber air ke tangki.",
    customerTitle: "Butiran Pelanggan", customerSub: "Sila isi maklumat anda untuk kami hubungi.", name: "Nama *", email: "Emel *", phone: "No. Telefon *", location: "Lokasi Pemasangan", notes: "Nota Tambahan (Pilihan)",
    visit: "Lawatan Tapak", visitSub: "Pilih sama ada anda memerlukan lawatan tapak.", yes: "Ya", no: "Tidak",
    summaryTitle: "Ringkasan Pesanan", summarySub: "Sila semak butiran anda sebelum menghantar.",
    litre: "Liter / Hari", metre: "Meter", back: "← Kembali", edit: "← Pinda Butiran", next: "Seterusnya →", send: "Hantar WhatsApp ↗", summary: "RINGKASAN PAM AIR SOLAR", error: "Sila isi/pilih jawapan untuk meneruskan.", hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk *Pam Air Solar*."
  } : {
    step: "Step", of: "of",
    source: "Water Source", sourceSub: "Choose the primary water source for the solar pump.", river: "River", pond: "Pond", bore: "Borehole",
    usage: "Water Usage", usageSub: "What will the pump be used for?", irrigation: "Irrigation", irrigationSub: "Water crops or landscape", livestock: "Livestock", livestockSub: "Supply troughs or animal areas", domestic: "Domestic", domesticSub: "Home or small-site water supply", other: "Other", otherSub: "A specialist use case",
    capacity: "Tank Capacity", capacitySub: "Select the approximate daily water requirement.",
    distance: "Distance to Tank", distanceSub: "Select the approximate distance from the water source to the tank.",
    height: "Height to Tank", heightSub: "Select the approximate vertical height from the water source to the tank.",
    customerTitle: "Customer Details", customerSub: "Please fill in your details so we can contact you.", name: "Name *", email: "Email *", phone: "Phone Number *", location: "Installation Location", notes: "Additional Notes (Optional)",
    visit: "Site Visit", visitSub: "Choose whether you require a site visit.", yes: "Yes", no: "No",
    summaryTitle: "Order Summary", summarySub: "Please review your details before sending.",
    litre: "Litres / Day", metre: "Metres", back: "← Back", edit: "← Edit Details", next: "Next →", send: "Send on WhatsApp ↗", summary: "SOLAR WATER PUMP SUMMARY", error: "Please enter/select an answer to continue.", hello: "Hello Sonic System Solution, I would like a quotation for *Solar Water Pump*."
  };

  const previous = () => screen === 1 ? `<a class="btn btn-light border" href="../../index.html">${text().back}</a>` : `<button class="btn btn-light border" id="back" type="button">${text().back}</button>`;

  const estimatePage = (title, subtitle, id, currentValue, options) => {
    const t = text();
    const pick = (val, label, desc) => `<label class="choice ${currentValue === val ? "active" : ""}"><input type="radio" name="${id}" value="${val}" ${currentValue === val ? "checked" : ""}><strong>${label}</strong>${desc ? `<small>${desc}</small>` : ""}</label>`;

    root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} ${screen} ${t.of} 8</span><span>Solar Water Pump</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${(screen / 8) * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">SOLAR WATER PUMP</p><h1 class="step-title">${title}</h1><p class="text-secondary">${subtitle}</p><div class="option-grid">${options.map(o => pick(o.value, o.label, o.desc)).join("")}</div><p class="error-text d-none" id="error">${t.error}</p><div class="wizard-actions">${previous()}<button class="btn btn-primary" id="next" type="button">${t.next}</button></div></article>`;

    root.querySelectorAll("input").forEach(i => i.onchange = e => {
      if (id === "capacity") tank_capacity = e.target.value;
      if (id === "distance") tank_distance = e.target.value;
      if (id === "height") tank_height = e.target.value;
      render();
    });

    const back = root.querySelector("#back");
    if (back) back.onclick = () => { screen--; render(); };

    root.querySelector("#next").onclick = () => {
      const valNow = id === "capacity" ? tank_capacity : id === "distance" ? tank_distance : tank_height;
      if (!valNow) { root.querySelector("#error").classList.remove("d-none"); return; }
      screen++; render();
    };
  };

  function render() {
    const t = text(); const toggle = document.querySelector("#wizardLanguageToggle"); if (toggle) toggle.textContent = getLanguage() === "ms" ? "EN" : "BM";

    // Screen 1: Source
    if (screen === 1) {
      const pick = (value, label, description) => `<label class="choice ${solar_source === value ? "active" : ""}"><input type="radio" name="source" value="${value}" ${solar_source === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
      root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} 1 ${t.of} 8</span><span>Solar Water Pump</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${(1 / 8) * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">SOLAR WATER PUMP</p><h1 class="step-title">${t.source}</h1><p class="text-secondary">${t.sourceSub}</p><div class="option-grid">${pick("River", t.river, getLanguage() === "ms" ? "Air dari sungai atau aliran semula jadi." : "Water drawn from a river or natural stream.")}${pick("Pond", t.pond, getLanguage() === "ms" ? "Air dari kolam atau takungan terbuka." : "Water drawn from a pond or open reservoir.")}${pick("Borehole", t.bore, getLanguage() === "ms" ? "Air bawah tanah daripada telaga gerudi." : "Groundwater from a drilled borehole.")}</div><p class="error-text d-none" id="error">${t.error}</p><div class="wizard-actions">${previous()}<button class="btn btn-primary" id="next" type="button">${t.next}</button></div></article>`;
      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_source = e.target.value; render(); });
      root.querySelector("#next").onclick = () => { if (!solar_source) { root.querySelector("#error").classList.remove("d-none"); return; } screen = 2; render(); };
      return;
    }

    // Screen 2: Usage
    if (screen === 2) {
      const pick = (value, label, description) => `<label class="choice ${water_use === value ? "active" : ""}"><input type="radio" name="use" value="${value}" ${water_use === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
      root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} 2 ${t.of} 8</span><span>Solar Water Pump</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${(2 / 8) * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">SOLAR WATER PUMP</p><h1 class="step-title">${t.usage}</h1><p class="text-secondary">${t.usageSub}</p><div class="option-grid">${pick("Irrigation", t.irrigation, t.irrigationSub)}${pick("Livestock", t.livestock, t.livestockSub)}${pick("Domestic", t.domestic, t.domesticSub)}${pick("Other", t.other, t.otherSub)}</div><p class="error-text d-none" id="error">${t.error}</p><div class="wizard-actions">${previous()}<button class="btn btn-primary" id="next" type="button">${t.next}</button></div></article>`;
      root.querySelectorAll("input").forEach(i => i.onchange = e => { water_use = e.target.value; render(); });
      const back = root.querySelector("#back"); if (back) back.onclick = () => { screen = 1; render(); };
      root.querySelector("#next").onclick = () => { if (!water_use) { root.querySelector("#error").classList.remove("d-none"); return; } screen = 3; render(); };
      return;
    }

    // Screens 3, 4, and 5
    if (screen === 3) return estimatePage(t.capacity, t.capacitySub, "capacity", tank_capacity, [
      { value: "< 1,000", label: "< 1,000 " + t.litre, desc: getLanguage() === "ms" ? "Penggunaan asas untuk rumah atau kebun kecil." : "Basic usage for a home or small garden." },
      { value: "1,000 - 5,000", label: "1,000 - 5,000 " + t.litre, desc: getLanguage() === "ms" ? "Sesuai untuk pengairan sederhana atau ternakan." : "Suitable for medium irrigation or livestock." },
      { value: "> 5,000", label: "> 5,000 " + t.litre, desc: getLanguage() === "ms" ? "Ladang berskala besar atau kegunaan komersial." : "Large-scale farms or commercial usage." }
    ]);

    if (screen === 4) return estimatePage(t.distance, t.distanceSub, "distance", tank_distance, [
      { value: "< 50", label: "< 50 " + t.metre, desc: getLanguage() === "ms" ? "Jarak dekat, pam tekanan rendah memadai." : "Short distance, a low-pressure pump is sufficient." },
      { value: "50 - 100", label: "50 - 100 " + t.metre, desc: getLanguage() === "ms" ? "Jarak sederhana (paling biasa digunakan)." : "Medium distance (most commonly used)." },
      { value: "> 100", label: "> 100 " + t.metre, desc: getLanguage() === "ms" ? "Jarak jauh, memerlukan pam berkuasa lebih tinggi." : "Long distance, requires a higher power pump." }
    ]);

    if (screen === 5) return estimatePage(t.height, t.heightSub, "height", tank_height, [
      { value: "< 10", label: "< 10 " + t.metre, desc: getLanguage() === "ms" ? "Kawasan mendatar atau sedikit bercerun." : "Relatively flat or slightly sloped terrain." },
      { value: "10 - 30", label: "10 - 30 " + t.metre, desc: getLanguage() === "ms" ? "Kawasan berbukit sederhana." : "Moderately hilly terrain." },
      { value: "> 30", label: "> 30 " + t.metre, desc: getLanguage() === "ms" ? "Kawasan curam atau berbukit tinggi." : "Steep or high-elevation terrain." }
    ]);

    // Screen 6: Site Visit Selection
    if (screen === 6) {
      const choice = (value, label, description) => `<label class="choice ${solar_visit === value ? "active" : ""}"><input type="radio" name="visit" value="${value}" ${solar_visit === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;

      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} 6 ${t.of} 8</span><span>Solar Water Pump</span></div>
      <div class="progress mb-4"><div class="progress-bar" style="width:${(6 / 8) * 100}%"></div></div>
      <article class="wizard-card">
        <p class="eyebrow">SOLAR WATER PUMP</p>
        <h1 class="step-title">${t.visit}</h1>
        <p class="text-secondary">${t.visitSub}</p>
        <div class="option-grid">
          ${choice("Yes", t.yes, getLanguage() === "ms" ? "Pasukan kami menilai sumber air dan laluan paip." : "Our team assesses the water source and pipe route.")}
          ${choice("No", t.no, getLanguage() === "ms" ? "Teruskan dengan anggaran berdasarkan maklumat anda." : "Proceed with an estimate based on your information.")}
        </div>
        <p class="error-text d-none" id="error">${t.error}</p>
        <div class="wizard-actions">
          <button class="btn btn-light border" id="back" type="button">${t.back}</button>
          <button class="btn btn-primary" id="next" type="button">${t.next}</button>
        </div>
      </article>`;

      root.querySelectorAll("input").forEach(i => i.onchange = e => { solar_visit = e.target.value; render(); });
      const back = root.querySelector("#back"); if (back) back.onclick = () => { screen = 6; render(); };
      root.querySelector("#next").onclick = () => {
        if (!solar_visit) { root.querySelector("#error").classList.remove("d-none"); return; }
        screen++; render();
      };
      return;
    }

    // Screen 7: Customer Details
    if (screen === 7) {
      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 7 ${t.of} 8</span><span>Solar Water Pump</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(7 / 8) * 100}%"></div>
      </div>
      <article class="wizard-card">
        <p class="eyebrow">SOLAR WATER PUMP</p>
        <h1 class="step-title">${t.customerTitle}</h1>
        <p class="text-secondary">${t.customerSub}</p>
        
        <form id="contactForm" class="row g-3 mt-2 text-start">
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_name">${t.name}</label>
            <input class="form-control" id="cust_name" type="text" required value="${customer.name}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_email">${t.email}</label>
            <input class="form-control" id="cust_email" type="email" required value="${customer.email}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-dark" for="cust_phone">${t.phone}</label>
            <input class="form-control" id="cust_phone" type="tel" inputmode="tel" required value="${customer.phone}">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_site">${t.location} *</label>
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
            ${previous()}
            <button class="btn btn-primary" type="submit">
    ${getLanguage() === "ms" ? "Semak Permintaan →" : "Review Request →"}
</button>
          </div>
        </form>
      </article>`;

      const back = root.querySelector("#back");
      if (back) back.onclick = () => { screen--; render(); };

      root.querySelector("#contactForm").onsubmit = event => {
        event.preventDefault(); // Prevent page reload

        customer.name = root.querySelector("#cust_name").value.trim();
        customer.email = root.querySelector("#cust_email").value.trim();
        let rawPhone = root.querySelector("#cust_phone").value.trim();
        customer.site = root.querySelector("#cust_site").value.trim();
        customer.note = root.querySelector("#cust_note").value.trim();

        // Clean phone number (remove spaces and dashes for validation)
        let cleanPhone = rawPhone.replace(/[-\s]/g, "");

        // Validate phone is ONLY numbers (allows an optional '+' at the start)
        const phoneRegex = /^\+?[0-9]+$/;
        if (!phoneRegex.test(cleanPhone)) {
          const errorEl = root.querySelector("#error");
          errorEl.textContent = getLanguage() === "ms"
            ? "No. Telefon mestilah nombor yang sah (angka sahaja)."
            : "Phone Number must be a valid number.";
          errorEl.classList.remove("d-none");
          return;
        }

        // Save the cleaned phone number and proceed
        customer.phone = cleanPhone;
        screen = 8;
        render();
      };
      return;
    }

    // Screen 8: Final Summary
    if (screen === 8) {
      const translatedUse = getLanguage() === "ms" ? ({ Irrigation: t.irrigation, Livestock: t.livestock, Domestic: t.domestic, Other: t.other }[water_use] || water_use) : water_use;
      const translatedSource = getLanguage() === "ms" ? ({ River: t.river, Pond: t.pond, Borehole: t.bore }[solar_source] || solar_source) : solar_source;

      const receipt = `<div class="receipt mt-4">
        <div class="receipt-row"><span>${t.name.replace(" *", "")}</span><strong>${customer.name}</strong></div>
        <div class="receipt-row"><span>${t.email.replace(" *", "")}</span><strong>${customer.email}</strong></div>
        <div class="receipt-row"><span>${t.phone.replace(" *", "")}</span><strong>${customer.phone}</strong></div>
        ${customer.site ? `<div class="receipt-row"><span>${t.location}</span><strong>${customer.site}</strong></div>` : ""}
        <div class="receipt-row"><span>${t.source}</span><strong>${translatedSource}</strong></div>
        <div class="receipt-row"><span>${t.usage}</span><strong>${translatedUse}</strong></div>
        <div class="receipt-row"><span>${t.capacity}</span><strong>${tank_capacity} ${t.litre}</strong></div>
        <div class="receipt-row"><span>${t.distance}</span><strong>${tank_distance} ${t.metre}</strong></div>
        <div class="receipt-row"><span>${t.height}</span><strong>${tank_height} ${t.metre}</strong></div>
        <div class="receipt-row"><span>${t.visit}</span><strong>${getLanguage() === "ms" ? (solar_visit === "Yes" ? t.yes : t.no) : solar_visit}</strong></div>
      </div>`;

      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} 8 ${t.of} 8</span><span>Solar Water Pump</span></div>
      <div class="progress mb-4"><div class="progress-bar" style="width:100%"></div></div>
      <article class="summary-card">
        <p class="eyebrow">${t.summary}</p>
        <h1 class="step-title">${t.summaryTitle}</h1>
        <p class="text-secondary">${t.summarySub}</p>
        ${receipt}
        <div class="wizard-actions d-flex justify-content-start gap-2">
          <button class="btn btn-light border" id="back" type="button">${t.edit}</button>
          <button class="btn btn-primary" id="send" type="button">${t.send}</button>
        </div>
      </article>`;

      const back = root.querySelector("#back"); if (back) back.onclick = () => { screen = 7; render(); };
      root.querySelector("#send").onclick = () => {
        const visit = getLanguage() === "ms" ? (solar_visit === "Yes" ? t.yes : t.no) : solar_visit;

        const message = `
*NEW SOLAR WATER PUMP SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Water Source      : ${translatedSource}
Water Usage       : ${translatedUse}
Tank Capacity     : ${tank_capacity} ${t.litre}
Distance to Tank  : ${tank_distance} ${t.metre}
Tank Height       : ${tank_height} ${t.metre}
Site Visit        : ${visit}

──────────────────────────────
*CUSTOMER DETAILS*
──────────────────────────────

Name              : ${customer.name}
Phone             : ${customer.phone}
Email             : ${customer.email}
Install Location  : ${customer.site || "Not Provided"}
Additional Notes  : ${customer.note || "None"}

──────────────────────────────

Thank you for your enquiry.

Our team will review your requirements and contact you as soon as possible regarding your Solar Water Pump System quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

        window.open(
          `https://wa.me/${SOLAR_PUMP_WHATSAPP}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener"
        );
      };
      return;
    }
  }
  document.querySelector("#wizardLanguageToggle").onclick = () => { setLanguage(getLanguage() === "en" ? "ms" : "en"); render(); };
  render();
});