/* Dedicated Time Attendance flow - Multi-select & Extra Functions Version. */
const ATTENDANCE_WHATSAPP = "60196162487";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#wizard");
    if (!root) return;

    const navContainer = document.querySelector(".wizard-nav .container");
    if (navContainer && !document.querySelector("#wizardLanguageToggle")) {
        navContainer.insertAdjacentHTML("beforeend", '<button class="btn btn-light border btn-sm language-toggle" id="wizardLanguageToggle" type="button">BM</button>');
    }

    let screen = 1;
    let att_business = "", att_staff = "", att_method = [], att_extra = [], att_output = "";
    let customer = { name: "", phone: "", email: "", site: "", note: "" };

    const tr = () => getLanguage() === "ms" ? {
        step: "Langkah", of: "daripada",
        customer: "Maklumat Pelanggan", customerSub: "Sila masukkan butiran anda.",
        next: "Seterusnya →", back: "← Kembali", edit: "← Edit Butiran", review: "Hantar WhatsApp ↗",
        name: "Nama *", phone: "Nombor telefon *", email: "E-mel (Pilihan)", location: "Lokasi pemasangan *", notes: "Nota tambahan",
        error: "Sila pilih atau isi jawapan untuk meneruskan.",
        summary: "RINGKASAN TIME ATTENDANCE", message: "Semak butiran anda, kemudian hantar permintaan kepada Sonic System Solution.",
        hello: "Hello Sonic System Solution, saya ingin mendapatkan sebut harga untuk sistem *Time Attendance*.",

        // Questions
        qBusTitle: "Jenis organisasi anda?",
        qBusSub: "Pilih jenis tempat kerja untuk sistem ini.",
        qStaffTitle: "Berapa ramai yang akan menggunakannya?",
        qStaffSub: "Pilih anggaran saiz pekerja anda.",
        qMethodTitle: "Kaedah 'clock-in' pilihan?",
        qMethodSub: "Pilih cara pekerja merekod kehadiran (Boleh pilih lebih dari satu).",
        qExtraTitle: "Fungsi tambahan yang diperlukan?",
        qExtraSub: "Pilih ciri tambahan untuk peranti anda (Boleh pilih lebih dari satu).",
        qOutputTitle: "Keperluan perisian & integrasi?",
        qOutputSub: "Pilih cara pengurusan data kehadiran anda.",

        // Options - Business
        optOffice: "Pejabat", optOfficeDesc: "Tempat kerja profesional",
        optRetail: "Kedai / F&B", optRetailDesc: "Pasukan berhadapan pelanggan",
        optFactory: "Kilang / Gudang", optFactoryDesc: "Operasi berasaskan syif",
        optSchool: "Sekolah / Institusi", optSchoolDesc: "Pendidikan atau tetapan awam",

        // Options - Staff
        opt1_20: "1–20 orang", opt1_20Desc: "Pasukan kecil",
        opt21_50: "21–50 orang", opt21_50Desc: "Pasukan sederhana",
        opt51_200: "51–200 orang", opt51_200Desc: "Tenaga kerja mantap",
        opt200Plus: "200+ orang", opt200PlusDesc: "Tenaga kerja bersaiz besar",

        // Options - Method
        optFinger: "Cap Jari", optFingerDesc: "Biometrik yang dipercayai",
        optFace: "Pengecaman Muka", optFaceDesc: "Pantas & tanpa sentuh",
        optCard: "Kad / Tag", optCardDesc: "Akses imbas mudah",
        optAdvice: "Perlukan nasihat", optAdviceDesc: "Sorkan alat yang sesuai",

        // Options - Extra Functions
        optWifi: "Sambungan WiFi", optWifiDesc: "Sambung tanpa wayar LAN",
        optDoor: "Akses Pintu", optDoorDesc: "Buka pintu dengan pembaca",
        optBattery: "Bateri Sandaran", optBatteryDesc: "Terus beroperasi jika tiada elektrik",
        optNone: "Tiada", optNoneDesc: "Hanya fungsi masa asas",

        // Options - Output / Integration
        optStandalone: "Stand Alone (Excel)", optStandaloneDesc: "Muat turun rekod melalui USB",
        optShift: "Jadual Syif", optShiftDesc: "Jejak waktu kerja pelbagai",
        optPayroll: "Integrasi Payroll / Gaji", optPayrollDesc: "Eksport data untuk perisian gaji",
        optMulti: "Pelbagai Cawangan", optMultiDesc: "Urus beberapa lokasi berpusat"
    } : {
        step: "Step", of: "of",
        customer: "Customer Details", customerSub: "Please enter your details.",
        next: "Next →", back: "← Back", edit: "← Edit Details", review: "Send on WhatsApp ↗",
        name: "Name *", phone: "Phone number *", email: "Email (Optional)", location: "Installation location *", notes: "Additional notes",
        error: "Please select or enter an answer to continue.",
        summary: "TIME ATTENDANCE SUMMARY", message: "Review your details, then send the request to Sonic System Solution.",
        hello: "Hello Sonic System Solution, I would like a quotation for a *Time Attendance* system.",

        // Questions
        qBusTitle: "What kind of organisation is this?",
        qBusSub: "Select the type of workplace.",
        qStaffTitle: "How many people will use it?",
        qStaffSub: "Select your estimated workforce size.",
        qMethodTitle: "Preferred clock-in method?",
        qMethodSub: "Choose how employees will record attendance (You can select multiple).",
        qExtraTitle: "Any additional functions needed?",
        qExtraSub: "Select extra features for your device (You can select multiple).",
        qOutputTitle: "Software & Integration needs?",
        qOutputSub: "Select how you want to manage the attendance data.",

        // Options - Business
        optOffice: "Office", optOfficeDesc: "Professional workplace",
        optRetail: "Retail / F&B", optRetailDesc: "Customer-facing team",
        optFactory: "Factory / warehouse", optFactoryDesc: "Shift-based operation",
        optSchool: "School / institution", optSchoolDesc: "Education or public setting",

        // Options - Staff
        opt1_20: "1–20", opt1_20Desc: "Small team",
        opt21_50: "21–50", opt21_50Desc: "Growing team",
        opt51_200: "51–200", opt51_200Desc: "Established workforce",
        opt200Plus: "200+", opt200PlusDesc: "Large workforce",

        // Options - Method
        optFinger: "Fingerprint", optFingerDesc: "Trusted biometric clock-in",
        optFace: "Face recognition", optFaceDesc: "Fast touch-free clock-in",
        optCard: "Card / tag", optCardDesc: "Simple tap-in access",
        optAdvice: "Need advice", optAdviceDesc: "Recommend the right reader",

        // Options - Extra Functions
        optWifi: "WiFi Connection", optWifiDesc: "Connect without LAN cables",
        optDoor: "Door Access", optDoorDesc: "Use reader to unlock a door",
        optBattery: "Battery Backup", optBatteryDesc: "Keep running during power cuts",
        optNone: "None", optNoneDesc: "Standard time attendance only",

        // Options - Output / Integration
        optStandalone: "Standalone (Excel Export)", optStandaloneDesc: "Download records via USB",
        optShift: "Shift scheduling", optShiftDesc: "Track variable working hours",
        optPayroll: "Payroll Integration", optPayrollDesc: "Export data for payroll systems",
        optMulti: "Multi-branch", optMultiDesc: "Manage several locations centrally"
    };

    const option = (value, label, description, selected) => `<label class="choice ${selected === value ? "active" : ""}"><input type="radio" name="choice" value="${value}" ${selected === value ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
    const checkOption = (value, label, description, selectedArray) => `<label class="choice ${selectedArray.includes(value) ? "active" : ""}"><input type="checkbox" name="choice" value="${value}" ${selectedArray.includes(value) ? "checked" : ""}><strong>${label}</strong><small>${description}</small></label>`;
    const back = () => screen === 1 ? `<a class="btn btn-light border" href="../../index.html">${tr().back}</a>` : `<button class="btn btn-light border" type="button" id="back">${tr().back}</button>`;

    function page(title, subtitle, content, isValid) {
        const t = tr();
        const language = document.querySelector("#wizardLanguageToggle");
        if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM";

        root.innerHTML = `<div class="progress-label d-flex justify-content-between mb-2"><span>${t.step} ${screen} ${t.of} 7</span><span>Time Attendance</span></div><div class="progress mb-4"><div class="progress-bar" style="width:${screen / 7 * 100}%"></div></div><article class="wizard-card"><p class="eyebrow">TIME ATTENDANCE</p><h1 class="step-title">${title}</h1><p class="text-secondary">${subtitle}</p>${content}<p class="error-text d-none" id="error">${t.error}</p><div class="wizard-actions">${back()}<button class="btn btn-primary" id="next" type="button">${t.next}</button></div></article>`;

        const previous = root.querySelector("#back");
        if (previous) previous.onclick = () => { screen--; render(); };
        root.querySelector("#next").onclick = () => {
            if (!isValid()) { root.querySelector("#error").classList.remove("d-none"); return; }
            screen++; render();
        };
    }

    function render() {
        const t = tr();

        // Screen 1: Business Type
        if (screen === 1) {
            page(t.qBusTitle, t.qBusSub, `<div class="option-grid">${option(t.optOffice, t.optOffice, t.optOfficeDesc, att_business)}${option(t.optRetail, t.optRetail, t.optRetailDesc, att_business)}${option(t.optFactory, t.optFactory, t.optFactoryDesc, att_business)}${option(t.optSchool, t.optSchool, t.optSchoolDesc, att_business)}</div>`, () => att_business);
            root.querySelectorAll("input").forEach(i => i.onchange = e => { att_business = e.target.value; render(); });
            return;
        }

        // Screen 2: Number of Staff
        if (screen === 2) {
            page(t.qStaffTitle, t.qStaffSub, `<div class="option-grid">${option(t.opt1_20, t.opt1_20, t.opt1_20Desc, att_staff)}${option(t.opt21_50, t.opt21_50, t.opt21_50Desc, att_staff)}${option(t.opt51_200, t.opt51_200, t.opt51_200Desc, att_staff)}${option(t.opt200Plus, t.opt200Plus, t.opt200PlusDesc, att_staff)}</div>`, () => att_staff);
            root.querySelectorAll("input").forEach(i => i.onchange = e => { att_staff = e.target.value; render(); });
            return;
        }

        // Screen 3: Clock-in Method (Checkboxes)
        if (screen === 3) {
            page(t.qMethodTitle, t.qMethodSub, `<div class="option-grid">${checkOption(t.optFinger, t.optFinger, t.optFingerDesc, att_method)}${checkOption(t.optFace, t.optFace, t.optFaceDesc, att_method)}${checkOption(t.optCard, t.optCard, t.optCardDesc, att_method)}${checkOption(t.optAdvice, t.optAdvice, t.optAdviceDesc, att_method)}</div>`, () => att_method.length > 0);

            root.querySelectorAll("input[type='checkbox']").forEach(i => i.onchange = e => {
                if (e.target.checked) {
                    if (!att_method.includes(e.target.value)) att_method.push(e.target.value);
                } else {
                    att_method = att_method.filter(val => val !== e.target.value);
                }
                render();
            });
            return;
        }

        // Screen 4: Additional Functions (Checkboxes)
        if (screen === 4) {
            page(t.qExtraTitle, t.qExtraSub, `<div class="option-grid">${checkOption(t.optWifi, t.optWifi, t.optWifiDesc, att_extra)}${checkOption(t.optDoor, t.optDoor, t.optDoorDesc, att_extra)}${checkOption(t.optBattery, t.optBattery, t.optBatteryDesc, att_extra)}${checkOption(t.optNone, t.optNone, t.optNoneDesc, att_extra)}</div>`, () => att_extra.length > 0);

            root.querySelectorAll("input[type='checkbox']").forEach(i => i.onchange = e => {
                if (e.target.checked) {
                    if (e.target.value === t.optNone) {
                        att_extra = [t.optNone]; // If 'None' is checked, clear other selections
                    } else {
                        att_extra = att_extra.filter(val => val !== t.optNone); // Remove 'None' if another option is clicked
                        if (!att_extra.includes(e.target.value)) att_extra.push(e.target.value);
                    }
                } else {
                    att_extra = att_extra.filter(val => val !== e.target.value);
                }
                render();
            });
            return;
        }

        // Screen 5: Software & Integration Output
        if (screen === 5) {
            page(t.qOutputTitle, t.qOutputSub, `<div class="option-grid">${option(t.optStandalone, t.optStandalone, t.optStandaloneDesc, att_output)}${option(t.optShift, t.optShift, t.optShiftDesc, att_output)}${option(t.optPayroll, t.optPayroll, t.optPayrollDesc, att_output)}${option(t.optMulti, t.optMulti, t.optMultiDesc, att_output)}</div>`, () => att_output);
            root.querySelectorAll("input").forEach(i => i.onchange = e => { att_output = e.target.value; render(); });
            return;
        }

        const language = document.querySelector("#wizardLanguageToggle");
        if (language) language.textContent = getLanguage() === "ms" ? "EN" : "BM";

        // Screen 6: Customer Details Form
        if (screen === 6) {
            root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 6 ${t.of} 7</span><span>Time Attendance</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:${(6 / 7) * 100}%"></div>
      </div>
      <article class="wizard-card">
        <p class="eyebrow">TIME ATTENDANCE</p>
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
                screen = 7;
                render();
            };
            return;
        }

        // Screen 7: Summary Page
        if (screen === 7) {
            const selectedMethods = att_method.join(", ");
            const selectedExtras = att_extra.join(", ");

            const rows = [
                [t.qBusTitle, att_business],
                [t.qStaffTitle, att_staff],
                [t.qMethodTitle, selectedMethods],
                [t.qExtraTitle, selectedExtras],
                [t.qOutputTitle, att_output],
                [t.name.replace(" *", ""), customer.name],
                [t.phone.replace(" *", ""), customer.phone],
                [t.email.replace(" (Pilihan)", "").replace(" (Optional)", ""), customer.email || "-"],
                [t.location.replace(" *", ""), customer.site]
            ].map(([label, value]) => `<div class="receipt-row"><span>${label}</span><strong>${value}</strong></div>`).join("");

            root.innerHTML = `
      <div class="progress-label d-flex justify-content-between mb-2">
        <span>${t.step} 7 ${t.of} 7</span><span>Time Attendance</span>
      </div>
      <div class="progress mb-4">
        <div class="progress-bar" style="width:100%"></div>
      </div>
      <article class="summary-card">
        <div class="success-icon">✓</div>
        <p class="eyebrow">${t.summary}</p>
        <h1 class="step-title">Time Attendance</h1>
        <p class="text-secondary">${t.message}</p>
        <div class="receipt">${rows}</div>
        
        <div class="d-flex flex-wrap gap-2 mt-4">
          <button type="button" class="btn btn-light border" id="edit">${t.edit}</button>
          <button class="btn btn-primary" id="submitBtn">${t.review}</button>
        </div>
      </article>`;

            root.querySelector("#edit").onclick = () => { screen = 6; render(); };

            root.querySelector("#submitBtn").onclick = () => {
const message = `
*NEW TIME ATTENDANCE SYSTEM ENQUIRY*

──────────────────────────────
*SYSTEM REQUIREMENTS*
──────────────────────────────

Business Type     : ${att_business}
Number of Staff   : ${att_staff}
Attendance Method : ${selectedMethods}
Additional Features : ${selectedExtras}
Report Output     : ${att_output}

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

Our team will review your requirements and contact you as soon as possible regarding your Time Attendance System quotation.

If our response is slightly delayed, we sincerely apologize as we may be handling a high volume of enquiries.

Thank you for your patience.

*SONIC SYSTEM SOLUTION*
`.trim();

window.open(
    `https://wa.me/${ATTENDANCE_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener"
);
            };
        }
    }

    document.querySelector("#wizardLanguageToggle").onclick = () => {
        setLanguage(getLanguage() === "en" ? "ms" : "en");
        render();
    };

    render();
});