/* Dedicated Door Access flow - Expanded Version. */
const ACCESS_WHATSAPP = "60196162487";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#wizard"); 
  if (!root) return;
  
  const navContainer = document.querySelector(".wizard-nav .container");
  if (navContainer && !document.querySelector("#wizardLanguageToggle")) {
    navContainer.insertAdjacentHTML("beforeend", '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>');
  }
  
  let screen = 1;
  // State variables for all steps
  let access_site = "", access_doors = "", access_door_type = "", access_door_material = "", 
      access_staff = "", access_method = [], access_system = "", access_req = "";
  let customer = { name: "", phone: "", email: "", site: "", note: "" };
  
  const tr = () => getLanguage() === "ms" ? {
    step: "Langkah", of: "daripada", 
    customer: "Maklumat Pelanggan", customerSub: "Sila masukkan butiran anda.", 
    next: "Seterusnya →", back: "← Kembali", edit: "← Edit Butiran", review: "Hantar WhatsApp ↗", 
    reviewReqBtn: "Semak Permintaan →",
    name: "Nama *", phone: "Nombor telefon *", email: "E-mel (Pilihan)", location: "Lokasi pemasangan *", notes: "Nota tambahan (Pilihan)", 
    error: "Sila pilih atau isi jawapan untuk meneruskan.", 
    summary: "RINGKASAN DOOR ACCESS", message: "Semak butiran anda, kemudian hantar permintaan kepada Sonic System Solution.", 
    hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk *Door Access*.",
    
    // Questions
    qSiteTitle: "Di manakah kawalan akses diperlukan?", qSiteSub: "Pilih jenis premis untuk pemasangan.",
    qDoorsTitle: "Berapa banyak pintu perlukan kawalan?", qDoorsSub: "Anggarkan jumlah pintu yang terlibat.",
    qDoorTypeTitle: "Apakah jenis pintu anda?", qDoorTypeSub: "Pilih cara pintu anda dibuka.",
    qMaterialTitle: "Apakah material pintu tersebut?", qMaterialSub: "Pilih bahan utama binaan pintu.",
    qStaffTitle: "Berapakah bilangan staf / pengguna?", qStaffSub: "Masukkan anggaran bilangan pengguna sistem ini.",
    qMethodTitle: "Kaedah kemasukan pilihan?", qMethodSub: "Pilih cara pengguna membuka pintu (Boleh pilih lebih dari satu).",
    qSystemTitle: "Jenis kawalan sistem?", qSystemSub: "Pilih cara pengurusan akses sistem.",
    qReqTitle: "Apakah yang paling penting?", qReqSub: "Pilih fungsi utama yang anda perlukan.",
    
    // Options
    optHome: "Rumah", optHomeDesc: "Pintu utama, pagar atau bilik",
    optOffice: "Pejabat", optOfficeDesc: "Kawasan staf dan mesyuarat",
    optRetail: "Kedai / Kilang", optRetailDesc: "Zon komersial terhad",
    
    opt1Door: "1 pintu", opt1DoorDesc: "Satu kemasukan terkawal",
    opt24Doors: "2–4 pintu", opt24DoorsDesc: "Sistem berbilang pintu kecil",
    opt5Doors: "5+ pintu", opt5DoorsDesc: "Pengurusan akses berpusat",
    
    optSwing: "Pintu Ayun (Swing)", optSwingDesc: "Pintu biasa yang ditolak/tarik",
    optSliding: "Pintu Gelangsar (Sliding)", optSlidingDesc: "Pintu yang ditolak ke tepi",
    
    optWood: "Kayu", optWoodDesc: "Pintu kayu pepejal atau berongga",
    optMetal: "Besi / Aluminium", optMetalDesc: "Pintu logam, gril atau rintangan api",
    optGlassF: "Kaca (Berbingkai)", optGlassFDesc: "Pintu kaca dengan bingkai aluminium",
    optGlassNF: "Kaca (Tanpa Bingkai)", optGlassNFDesc: "Pintu kaca penuh (Tempered glass)",

    staffHint: "cth. 25", usersUnit: "pengguna",
    
    optCard: "Kad / Tag", optCardDesc: "Kemasukan pantas tanpa sentuh",
    optFinger: "Cap Jari", optFingerDesc: "Pengesahan biometrik",
    optFace: "Pengecaman Muka", optFaceDesc: "Pengecaman tanpa sentuh",
    optPin: "Kod PIN", optPinDesc: "Akses pad kekunci",
    
    optStandalone: "Stand Alone", optStandaloneDesc: "Urus kad/cap jari terus di pintu",
    optLan: "Rangkaian / LAN", optLanDesc: "Urus pengguna melalui PC / Perisian",
    
    optRecords: "Rekod pelawat", optRecordsDesc: "Jejak waktu keluar masuk",
    optSchedule: "Jadual masa", optScheduleDesc: "Kawal bila pengguna boleh masuk",
    optMobile: "Akses mudah alih", optMobileDesc: "Buka kunci guna telefon",
    optInteg: "Integrasi", optIntegDesc: "Sambung dengan pintu/penggera sedia ada"
  } : {
    step: "Step", of: "of", 
    customer: "Customer Details", customerSub: "Please enter your details.", 
    next: "Next →", back: "← Back", edit: "← Edit Details", review: "Send on WhatsApp ↗", 
    reviewReqBtn: "Review Request →",
    name: "Name *", phone: "Phone number *", email: "Email (Optional)", location: "Installation location *", notes: "Additional notes (Optional)", 
    error: "Please select or enter an answer to continue.", 
    summary: "DOOR ACCESS SUMMARY", message: "Review your details, then send the request to Sonic System Solution.", 
    hello: "Hello Sonic System Solution, I would like a quotation for *Door Access*.",
    
    // Questions
    qSiteTitle: "Where is access control needed?", qSiteSub: "Select the type of premises.",
    qDoorsTitle: "How many doors need control?", qDoorsSub: "Estimate the total number of doors.",
    qDoorTypeTitle: "What is the door type?", qDoorTypeSub: "Select how your door opens.",
    qMaterialTitle: "What is the door material?", qMaterialSub: "Select the main material of the door.",
    qStaffTitle: "How many staff / users?", qStaffSub: "Enter the estimated number of users for this system.",
    qMethodTitle: "Preferred entry method?", qMethodSub: "Choose how users will unlock the doors (You can select multiple).",
    qSystemTitle: "System control type?", qSystemSub: "Select how you want to manage the system.",
    qReqTitle: "What is most important?", qReqSub: "Select the key feature you require.",
    
    // Options
    optHome: "Home", optHomeDesc: "Main door, gate or rooms",
    optOffice: "Office", optOfficeDesc: "Staff and meeting areas",
    optRetail: "Retail / factory", optRetailDesc: "Restricted commercial zones",
    
    opt1Door: "1 door", opt1DoorDesc: "Single controlled entry",
    opt24Doors: "2–4 doors", opt24DoorsDesc: "Small multi-door setup",
    opt5Doors: "5+ doors", opt5DoorsDesc: "Centralised access management",
    
    optSwing: "Swing Door", optSwingDesc: "Standard push/pull door",
    optSliding: "Sliding Door", optSlidingDesc: "Door that slides horizontally",

    optWood: "Wooden", optWoodDesc: "Solid or hollow wooden doors",
    optMetal: "Metal / Aluminium", optMetalDesc: "Steel doors, grilles, or fire doors",
    optGlassF: "Framed Glass", optGlassFDesc: "Glass door with aluminium frame",
    optGlassNF: "Frameless Glass", optGlassNFDesc: "Full tempered glass doors",

    staffHint: "e.g. 25", usersUnit: "users",
    
    optCard: "Card / tag", optCardDesc: "Fast contactless entry",
    optFinger: "Fingerprint", optFingerDesc: "Biometric verification",
    optFace: "Face recognition", optFaceDesc: "Touch-free recognition",
    optPin: "PIN code", optPinDesc: "Keypad access",
    
    optStandalone: "Stand Alone", optStandaloneDesc: "Manage users directly at the door",
    optLan: "Networked / LAN", optLanDesc: "Manage users via PC / Software",
    
    optRecords: "Visitor records", optRecordsDesc: "Track entries and exits",
    optSchedule: "Time schedules", optScheduleDesc: "Control when users can enter",
    optMobile: "Mobile access", optMobileDesc: "Unlock with a phone",
    optInteg: "Integration", optIntegDesc: "Connect with existing door or alarm"
  };
  
  // Single selection component
  const option = (value, label, description, selected) => `<label class="choice ${selected === value ? "active" : ""}"><input type="radio" name="choice" value="${value}" ${selected === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
  
  // Multiple selection component (Checkboxes)
  const checkOption = (value, label, description, selectedArray) => `<label class="choice ${selectedArray.includes(value) ? "active" : ""}"><input type="checkbox" name="choice" value="${value}" ${selectedArray.includes(value) ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
  
  const back = () => screen === 1 ? `<a class="btn btn-light border" href="../../index.html">${tr().back}</a>` : `<button class="btn btn-light border" type="button" id="back">${tr().back}</button>`;
  
  // Added optional customNextBtn parameter
  function page(title, subtitle, content, isValid, customNextBtn) { 
    const t = tr(); 
    const language = document.querySelector("#wizardLanguageToggle"); 
    if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM"; 
    
    const nextBtnText = customNextBtn || t.next;

    root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} ${screen} ${t.of} 10</span><span>Door Access</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${screen / 10 * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">DOOR ACCESS</p><h1 class="step-title">${title}</h1><p class="text-secondary">${subtitle}</p>${content}<p class="error-text d-none" id="error">${t.error}</p><div class="wizard-actions">${back()}<button class="btn btn-primary" id="next" type="button">${nextBtnText}</button></div></article>`; 
    
    const previous = root.querySelector("#back"); 
    if (previous) previous.onclick = () => { screen--; render(); }; 
    root.querySelector("#next").onclick = () => { 
      if (!isValid()) { root.querySelector("#error").classList.remove("d-none"); return; } 
      screen++; render(); 
    }; 
  }
  
  function render() { 
    const t = tr();
    
    // Screen 1: Site Type
    if (screen === 1) { 
      page(t.qSiteTitle, t.qSiteSub, `<div class="option-grid">${option(t.optHome, t.optHome, t.optHomeDesc, access_site)}${option(t.optOffice, t.optOffice, t.optOfficeDesc, access_site)}${option(t.optRetail, t.optRetail, t.optRetailDesc, access_site)}</div>`, () => access_site); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { access_site = e.target.value; render(); }); 
      return; 
    }
    
    // Screen 2: Number of Doors
    if (screen === 2) { 
      page(t.qDoorsTitle, t.qDoorsSub, `<div class="option-grid">${option(t.opt1Door, t.opt1Door, t.opt1DoorDesc, access_doors)}${option(t.opt24Doors, t.opt24Doors, t.opt24DoorsDesc, access_doors)}${option(t.opt5Doors, t.opt5Doors, t.opt5DoorsDesc, access_doors)}</div>`, () => access_doors); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { access_doors = e.target.value; render(); }); 
      return; 
    }

    // Screen 3: Door Type
    if (screen === 3) { 
      page(t.qDoorTypeTitle, t.qDoorTypeSub, `<div class="option-grid">${option(t.optSwing, t.optSwing, t.optSwingDesc, access_door_type)}${option(t.optSliding, t.optSliding, t.optSlidingDesc, access_door_type)}</div>`, () => access_door_type); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { access_door_type = e.target.value; render(); }); 
      return; 
    }

    // Screen 4: Door Material
    if (screen === 4) { 
      page(t.qMaterialTitle, t.qMaterialSub, `<div class="option-grid">${option(t.optWood, t.optWood, t.optWoodDesc, access_door_material)}${option(t.optMetal, t.optMetal, t.optMetalDesc, access_door_material)}${option(t.optGlassF, t.optGlassF, t.optGlassFDesc, access_door_material)}${option(t.optGlassNF, t.optGlassNF, t.optGlassNFDesc, access_door_material)}</div>`, () => access_door_material); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { access_door_material = e.target.value; render(); }); 
      return; 
    }
    
    // Screen 5: Number of Staff/Users (Input)
    if (screen === 5) { 
      page(t.qStaffTitle, t.qStaffSub, `<div class="input-group mt-4"><input class="form-control" id="staff_count" inputmode="numeric" type="number" min="1" value="${access_staff}" placeholder="${t.staffHint}"><span class="input-group-text">${t.usersUnit}</span></div>`, () => Number(access_staff) > 0); 
      root.querySelector("#staff_count").oninput = e => { access_staff = e.target.value; }; 
      return; 
    }
    
    // Screen 6: Entry Method (Checkboxes for Multiple Selection)
    if (screen === 6) { 
      page(t.qMethodTitle, t.qMethodSub, `<div class="option-grid">${checkOption(t.optCard, t.optCard, t.optCardDesc, access_method)}${checkOption(t.optFinger, t.optFinger, t.optFingerDesc, access_method)}${checkOption(t.optFace, t.optFace, t.optFaceDesc, access_method)}${checkOption(t.optPin, t.optPin, t.optPinDesc, access_method)}</div>`, () => access_method.length > 0); 
      
      root.querySelectorAll("input[type='checkbox']").forEach(i => i.onchange = e => { 
        if(e.target.checked) {
          if (!access_method.includes(e.target.value)) access_method.push(e.target.value);
        } else {
          access_method = access_method.filter(val => val !== e.target.value);
        }
        render(); // Re-render to show active styling
      }); 
      return; 
    }

    // Screen 7: System Control Architecture
    if (screen === 7) { 
      page(t.qSystemTitle, t.qSystemSub, `<div class="option-grid">${option(t.optStandalone, t.optStandalone, t.optStandaloneDesc, access_system)}${option(t.optLan, t.optLan, t.optLanDesc, access_system)}</div>`, () => access_system); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { access_system = e.target.value; render(); }); 
      return; 
    } 
    
    // Screen 8: Main Requirement (Before Customer Details)
    if (screen === 8) { 
      page(t.qReqTitle, t.qReqSub, `<div class="option-grid">${option(t.optRecords, t.optRecords, t.optRecordsDesc, access_req)}${option(t.optSchedule, t.optSchedule, t.optScheduleDesc, access_req)}${option(t.optMobile, t.optMobile, t.optMobileDesc, access_req)}${option(t.optInteg, t.optInteg, t.optIntegDesc, access_req)}</div>`, () => access_req); 
      root.querySelectorAll("input").forEach(i => i.onchange = e => { access_req = e.target.value; render(); }); 
      return; 
    }
    
    const language = document.querySelector("#wizardLanguageToggle"); 
    if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM";

    // Screen 9: Customer Details Form
    if (screen === 9) { 
      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 9 ${t.of} 10</span><span>Door Access</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(9/10)*100}%"></div>
      </div>
      <article class="wizard-card">
        <p class="eyebrow">DOOR ACCESS</p>
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
            <label class="form-label fw-bold text-dark" for="cust_site">${t.location}</label>
            <input class="form-control" id="cust_site" type="text" required value="${customer.site}">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold text-dark" for="cust_email">${t.email}</label>
            <input class="form-control" id="cust_email" type="email" value="${customer.email}">
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
            <button class="btn btn-primary" type="submit">${t.reviewReqBtn}</button>
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
          errorEl.textContent = getLanguage() === "ms" 
            ? "No. Telefon mestilah nombor yang sah (angka sahaja)." 
            : "Phone Number must be a valid number.";
          errorEl.classList.remove("d-none");
          return;
        }

        customer.phone = cleanPhone; 
        screen = 10; 
        render(); 
      }; 
      return;
    }

    // Screen 10: Summary Page
    if (screen === 10) {
      // access_method is an array, join it with commas for summary display
      const selectedMethods = access_method.join(", ");

      const rows = [
        [t.qSiteTitle, access_site], 
        [t.qDoorsTitle, access_doors], 
        [t.qDoorTypeTitle, access_door_type], 
        [t.qMaterialTitle, access_door_material], 
        [t.qStaffTitle, `${access_staff} ${t.usersUnit}`], 
        [t.qMethodTitle, selectedMethods], 
        [t.qSystemTitle, access_system], 
        [t.qReqTitle, access_req], 
        [t.name.replace(" *", ""), customer.name],
        [t.phone.replace(" *", ""), customer.phone],
        [t.location.replace(" *", ""), customer.site],
        [t.email.replace(" (Pilihan)", "").replace(" (Optional)", ""), customer.email || "-"],
        [t.notes.replace(" (Pilihan)", "").replace(" (Optional)", ""), customer.note || "-"]
      ].map(([label, value]) => `<div class="receipt-row"><span>${label}</span><strong>${value}</strong></div>`).join("");
      
      root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 10 ${t.of} 10</span><span>Door Access</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:100%"></div>
      </div>
      <article class="summary-card">
        <div class="success-icon">✓</div>
        <p class="eyebrow">${t.summary}</p>
        <h1 class="step-title">Door Access</h1>
        <p class="text-secondary">${t.message}</p>
        <div class="receipt">${rows}</div>
        
        <div class="d-flex flex-wrap gap-2 mt-4">
          <button type="button" class="btn btn-light border" id="edit">${t.edit}</button>
          <button class="btn btn-primary" id="submitBtn">${t.review}</button>
        </div>
      </article>`;
      
      root.querySelector("#edit").onclick = () => { screen = 9; render(); }; 
      
      root.querySelector("#submitBtn").onclick = () => { 
const message = `
*NEW DOOR ACCESS SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Site Type         : ${access_site}
Number of Doors   : ${access_doors}
Door Type         : ${access_door_type}
Door Material     : ${access_door_material}
Number of Users   : ${access_staff} ${t.usersUnit}
Access Method     : ${selectedMethods}
System Type       : ${access_system}
Requirements      : ${access_req}

──────────────────────────────
*CUSTOMER DETAILS*
──────────────────────────────

Name              : ${customer.name}
Phone             : ${customer.phone}
Location          : ${customer.site || "Not Provided"}
Email             : ${customer.email || "Not Provided"}
Additional Notes  : ${customer.note || "None"}

──────────────────────────────

Thank you for your enquiry.

Our team will review your requirements and contact you as soon as possible regarding your Door Access System quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

window.open(
    `https://wa.me/${ACCESS_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener");
};
    }
  }
  
  document.querySelector("#wizardLanguageToggle").onclick = () => { 
    setLanguage(getLanguage() === "en" ? "ms" : "en"); 
    render(); 
  };
  
  render();
});