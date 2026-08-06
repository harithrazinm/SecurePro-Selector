/* Lightweight bilingual interface. The selected language is remembered on every page. */
const I18N = {
  en: {
    quote: "Get a service", 
    eyebrow: "SMART SECURITY • MALAYSIA", 
    heroTitle: "Protection, tailored to your property.", 
    heroText: "Answer a few simple questions and receive a clear, no-obligation recommendation from Sonic System Solution.", 
    start: "Start selecting", 
    why: "Why Sonic System Solution", 
    statText: "specialist solutions for homes and businesses, designed around how you use your space.", 
    select: "SELECT A SERVICE", 
    serviceTitle: "What would you like to secure?", 
    serviceText: "Choose a solution to begin your personalised quotation request.", 
    personalised: "✓ Personalised recommendations", 
    fast: "✓ Fast WhatsApp response", 
    obligation: "✓ No obligation quotation", 
    rights: "© 2026 Sonic System Solution. All rights reserved.", 
    whatsapp: "WhatsApp us", 
    build: "Build your quote →",
    partnersTitle: "Partners & Brands",
    partnersText: "We have over 25 network of partners and brands, to ensure seamless and convenient access to top-quality security systems and solutions.",
    
    // --- SERVICE CARD TRANSLATIONS (THESE WERE MISSING) ---
    cardBarrierTitle: "Barrier Gate System",
    cardBarrierDesc: "Automated vehicle access control and boom gate solutions for commercial and residential premises.",
    cardPabxTitle: "PABX System",
    cardPabxDesc: "Professional office telecommunication and intercom solutions for seamless communication.",
    cardSolarTitle: "Solar CCTV",
    cardSolarDesc: "See what matters, wherever you are.",
    cardCctvTitle: "CCTV System",
    cardCctvDesc: "Reliable 24/7 high-definition property monitoring.",
    cardAlarmTitle: "Alarm System",
    cardAlarmDesc: "Smart intrusion alerts to secure your perimeter.",
    cardAutogateTitle: "Autogate System",
    cardAutogateDesc: "Seamless motorized entry for your gate access.",
    cardDoorTitle: "Door Access",
    cardDoorDesc: "Card, PIN, or biometric keyless entry control.",
    cardTimeTitle: "Time Attendance",
    cardTimeDesc: "Biometric fingerprint, face recognition & automated staff attendance tracking.",
    cardPumpTitle: "Solar Pump System",
    cardPumpDesc: "Eco-friendly off-grid water pumping for agricultural, pond, and land irrigation needs.",
    cardSelect: "Select →"
    
  },
  ms: {

    quote: "Dapatkan perkhidmatan", 
    eyebrow: "KESELAMATAN PINTAR • MALAYSIA", 
    heroTitle: "Perlindungan yang disesuaikan untuk premis anda.", 
    heroText: "Jawab beberapa soalan ringkas dan terima cadangan tanpa kewajipan daripada Sonic System Solution.", 
    start: "Mula memilih", 
    why: "Mengapa Sonic System Solution", 
    statText: "penyelesaian pakar untuk rumah dan perniagaan, direka mengikut keperluan ruang anda.", 
    select: "PILIH PERKHIDMATAN", 
    serviceTitle: "Apakah yang anda ingin lindungi?", 
    serviceText: "Pilih penyelesaian untuk memulakan permintaan sebut harga peribadi anda.", 
    personalised: "✓ Cadangan diperibadikan", 
    fast: "✓ Maklum balas WhatsApp pantas", 
    obligation: "✓ Sebut harga tanpa kewajipan", 
    rights: "© 2026 Sonic System Solution. Hak cipta terpelihara.", 
    whatsapp: "WhatsApp kami", 
    build: "Bina sebut harga →",
    partnersTitle: "Rakan Kongsi & Jenama",
    partnersText: "Kami mempunyai lebih daripada 25 rangkaian rakan kongsi dan jenama, untuk memastikan akses yang lancar dan mudah kepada sistem dan penyelesaian keselamatan berkualiti tinggi.",
    
    // --- SERVICE CARD TRANSLATIONS (THESE WERE MISSING) ---
    cardBarrierTitle: "Sistem Pagar Penghalang",
    cardBarrierDesc: "Kawalan akses kenderaan automatik dan palang keselamatan untuk premis komersial dan kediaman.",
    cardPabxTitle: "Sistem PABX",
    cardPabxDesc: "Penyelesaian telekomunikasi dan interkom pejabat profesional untuk komunikasi yang lancar.",
    cardSolarTitle: "CCTV Solar",
    cardSolarDesc: "Pantau apa yang penting, di mana sahaja anda berada.",
    cardCctvTitle: "Sistem CCTV",
    cardCctvDesc: "Pemantauan hartanah definisi tinggi 24/7 yang boleh dipercayai.",
    cardAlarmTitle: "Sistem Penggera",
    cardAlarmDesc: "Amaran pencerobohan pintar untuk mengamankan kawasan anda.",
    cardAutogateTitle: "Sistem Autogate",
    cardAutogateDesc: "Akses pintu pagar automatik yang lancar.",
    cardDoorTitle: "Akses Pintu",
    cardDoorDesc: "Kawalan kemasukan tanpa kunci menggunakan kad, PIN, atau biometrik.",
    cardTimeTitle: "Kehadiran Masa",
    cardTimeDesc: "Cap jari biometrik, pengecaman wajah & penjejakan kehadiran pekerja automatik.",
    cardPumpTitle: "Sistem Pam Solar",
    cardPumpDesc: "Pam air mesra alam tanpa grid elektrik untuk keperluan pertanian, kolam, dan pengairan tanah.",
    cardSelect: "Pilih →"
  }
};

const MS_CONTENT = {
  "What are you securing?": "Apakah yang anda ingin lindungi?", "Which CCTV system suits you?": "Sistem CCTV manakah yang sesuai untuk anda?", "How many areas need coverage?": "Berapa kawasan memerlukan liputan?", "What matters most?": "Apakah yang paling penting?",
  "What type of property is this?": "Apakah jenis premis ini?", "How large is the protected area?": "Seberapa besar kawasan yang perlu dilindungi?", "How many entry points need protection?": "Berapa pintu masuk memerlukan perlindungan?", "How should the system alert you?": "Bagaimanakah sistem perlu memberi amaran kepada anda?",
  "What gate do you have?": "Apakah jenis pagar anda?", "What is the gate opening width?": "Berapakah lebar bukaan pagar?", "What access method do you prefer?": "Kaedah akses manakah yang anda pilih?", "Any extra requirement?": "Ada keperluan tambahan?",
  "Where is access control needed?": "Di manakah kawalan akses diperlukan?", "How many doors need control?": "Berapa pintu memerlukan kawalan?", "Preferred entry method?": "Kaedah masuk pilihan?", "What is most important?": "Apakah yang paling penting?",
  "What will the pump be used for?": "Apakah kegunaan pam ini?", "Where does the water come from?": "Dari manakah sumber air?", "How far must water travel?": "Sejauh manakah air perlu disalurkan?", "How much water is needed?": "Berapa banyak air diperlukan?",
  "What kind of organisation is this?": "Apakah jenis organisasi ini?", "How many people will use it?": "Berapa orang akan menggunakannya?", "Preferred clock-in method?": "Kaedah rekod masuk pilihan?", "What do you need from reporting?": "Apakah yang anda perlukan daripada laporan?",
  "We will match coverage to the type of site.": "Kami akan padankan liputan dengan jenis premis.", "Not sure? Choose “Need advice” and we will help.": "Tidak pasti? Pilih “Perlukan nasihat” dan kami akan membantu.", "An area can be an entrance, room, driveway or other viewing point.": "Satu kawasan boleh jadi pintu masuk, bilik, laluan kereta atau titik pandangan lain.", "Your priority helps us recommend the right features.": "Keutamaan anda membantu kami mencadangkan ciri yang sesuai.",
  "Home": "Rumah", "Business": "Perniagaan", "Warehouse / factory": "Gudang / kilang", "IP camera": "Kamera IP", "Analog HD": "Analog HD", "Wireless": "Tanpa wayar", "Need advice": "Perlukan nasihat", "1–4 areas": "1–4 kawasan", "5–8 areas": "5–8 kawasan", "9–16 areas": "9–16 kawasan", "16+ areas": "16+ kawasan", "Night vision": "Penglihatan malam", "Remote viewing": "Paparan jarak jauh", "Audio recording": "Rakaman audio", "AI detection": "Pengesanan AI",
  "Retail / office": "Runcit / pejabat", "Small": "Kecil", "Medium": "Sederhana", "Large": "Besar", "Mobile app": "Aplikasi mudah alih", "Siren + app": "Siren + aplikasi", "Monitoring-ready": "Sedia pemantauan",
  "Swing gate": "Pagar ayun", "Sliding gate": "Pagar gelongsor", "New gate needed": "Perlu pagar baharu", "Up to 12 ft": "Sehingga 12 kaki", "13–18 ft": "13–18 kaki", "Over 18 ft": "Melebihi 18 kaki", "Remote control": "Alat kawalan jauh", "App control": "Kawalan aplikasi", "Remote + app": "Alat kawalan + aplikasi", "Safety sensors": "Sensor keselamatan", "Battery backup": "Bateri sokongan", "Intercom integration": "Integrasi interkom", "No extra requirement": "Tiada keperluan tambahan",
  "Door Access": "Akses Pintu", "Office": "Pejabat", "Retail / factory": "Runcit / kilang", "1 door": "1 pintu", "2–4 doors": "2–4 pintu", "5+ doors": "5+ pintu", "Card / tag": "Kad / tag", "Fingerprint": "Cap jari", "Face recognition": "Pengecaman wajah", "PIN code": "Kod PIN", "Visitor records": "Rekod pelawat", "Time schedules": "Jadual masa", "Mobile access": "Akses mudah alih", "Integration": "Integrasi",
  "Irrigation": "Pengairan", "Livestock": "Ternakan", "Domestic": "Domestik", "Other": "Lain-lain", "Well / borehole": "Telaga / lubang gerudi", "River / pond": "Sungai / kolam", "Tank": "Tangki", "Under 50 m": "Bawah 50 m", "50–200 m": "50–200 m", "Over 200 m": "Melebihi 200 m", "Light use": "Penggunaan ringan", "Regular use": "Penggunaan biasa", "High volume": "Jumlah tinggi",
  "Time Attendance": "Rekod Kehadiran", "Factory / warehouse": "Kilang / gudang", "School / institution": "Sekolah / institusi", "1–20": "1–20", "21–50": "21–50", "51–200": "51–200", "200+": "200+", "Basic attendance": "Kehadiran asas", "Shift scheduling": "Jadual syif", "Payroll export": "Eksport gaji", "Multi-branch": "Pelbagai cawangan",
  "Landed or apartment residence": "Rumah teres, banglo atau apartmen", "Shop, office or commercial unit": "Kedai, pejabat atau unit komersial", "Larger operational premises": "Premis operasi yang lebih besar", "Clear digital video and remote viewing": "Video digital jelas dan paparan jarak jauh", "Reliable value-focused setup": "Pemasangan yang boleh dipercayai dan berbaloi", "Flexible installation with Wi-Fi": "Pemasangan fleksibel menggunakan Wi-Fi", "Recommend the best fit": "Cadangkan pilihan yang paling sesuai", "Compact coverage": "Liputan ringkas", "Standard property coverage": "Liputan premis standard", "Extended coverage": "Liputan lebih luas", "Large site coverage": "Liputan tapak yang besar", "Clear visibility after dark": "Paparan jelas selepas gelap", "Check in from your phone": "Semak daripada telefon anda", "Capture sound with video": "Rakam bunyi bersama video", "Smart person or vehicle alerts": "Amaran pintar untuk manusia atau kenderaan",
  "Commercial premises": "Premis komersial", "Large operational premises": "Premis operasi yang besar", "Up to 1,000 sq ft": "Sehingga 1,000 kaki persegi", "1,000–3,000 sq ft": "1,000–3,000 kaki persegi", "Over 3,000 sq ft": "Melebihi 3,000 kaki persegi", "Main access points": "Pintu masuk utama", "Multiple doors and windows": "Pelbagai pintu dan tingkap", "Comprehensive perimeter": "Perimeter menyeluruh", "Instant phone notifications": "Notifikasi segera ke telefon", "On-site deterrent and alerts": "Pencegahan di lokasi dan amaran", "Prepared for professional monitoring": "Sedia untuk pemantauan profesional",
  "Single or double leaf gate": "Pagar satu atau dua daun", "Gate moves along a track": "Pagar bergerak di sepanjang trek", "Require gate and automation advice": "Perlukan nasihat pagar dan automasi", "Compact driveway": "Laluan masuk ringkas", "Typical double-car driveway": "Laluan masuk biasa untuk dua kereta", "Wide or heavy-duty opening": "Bukaan lebar atau tugas berat", "Simple everyday access": "Akses harian yang mudah", "Open from your phone": "Buka melalui telefon anda", "Both options": "Kedua-dua pilihan", "Obstacle detection": "Pengesanan halangan", "Operate during power interruptions": "Beroperasi ketika gangguan elektrik", "Visitor access control": "Kawalan akses pelawat", "Standard installation": "Pemasangan standard",
  "Main door, gate or rooms": "Pintu utama, pagar atau bilik", "Staff and meeting areas": "Kawasan kakitangan dan mesyuarat", "Restricted commercial zones": "Zon komersial terhad", "Single controlled entry": "Satu pintu masuk terkawal", "Small multi-door setup": "Pemasangan kecil berbilang pintu", "Centralised access management": "Pengurusan akses berpusat", "Fast contactless entry": "Kemasukan pantas tanpa sentuhan", "Biometric verification": "Pengesahan biometrik", "Touch-free recognition": "Pengecaman tanpa sentuhan", "Keypad access": "Akses papan kekunci", "Track entries and exits": "Jejaki keluar masuk", "Control when users can enter": "Kawal masa pengguna boleh masuk", "Unlock with a phone": "Buka kunci dengan telefon", "Connect with existing door or alarm": "Sambung dengan pintu atau penggera sedia ada",
  "Water crops or landscape": "Menyiram tanaman atau landskap", "Supply troughs or animal areas": "Membekalkan air ke palung atau kawasan haiwan", "Home or small-site water supply": "Bekalan air rumah atau tapak kecil", "A specialist use case": "Kegunaan khusus", "Underground water source": "Sumber air bawah tanah", "Surface water source": "Sumber air permukaan", "Stored water supply": "Bekalan air tersimpan", "Short run": "Jarak pendek", "Medium run": "Jarak sederhana", "Long-distance transfer": "Pemindahan jarak jauh", "Small daily requirement": "Keperluan harian kecil", "Consistent daily supply": "Bekalan harian berterusan", "Demanding irrigation or commercial use": "Pengairan berat atau kegunaan komersial",
  "Professional workplace": "Tempat kerja profesional", "Customer-facing team": "Pasukan yang berurusan dengan pelanggan", "Shift-based operation": "Operasi berasaskan syif", "Education or public setting": "Persekitaran pendidikan atau awam", "Small team": "Pasukan kecil", "Growing team": "Pasukan yang sedang berkembang", "Established workforce": "Tenaga kerja yang mantap", "Large workforce": "Tenaga kerja besar", "Trusted biometric clock-in": "Rekod masuk biometrik yang dipercayai", "Fast touch-free clock-in": "Rekod masuk pantas tanpa sentuhan", "Simple tap-in access": "Akses sentuh yang mudah", "Recommend the right reader": "Cadangkan pembaca yang sesuai", "Clock-in and clock-out records": "Rekod masuk dan keluar", "Track variable working hours": "Jejaki waktu kerja berubah-ubah", "Prepare data for payroll": "Sediakan data untuk gaji", "Manage several locations": "Urus beberapa lokasi"
};

function getLanguage() { 
  return localStorage.getItem("sonic-language") || "en"; 
}

function t(key, fallback = key) { 
  const lang = getLanguage();
  return (I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : fallback; 
}

function contentText(text) { 
  return getLanguage() === "ms" ? (MS_CONTENT[text] || text) : text; 
}

function setLanguage(language) { 
  localStorage.setItem("sonic-language", language); 
  document.documentElement.lang = language === "ms" ? "ms" : "en"; 
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#languageToggle");
  if (!toggle) return;

  const apply = () => {
    const language = getLanguage(); 
    setLanguage(language);
    toggle.textContent = language === "en" ? "BM" : "EN";
    toggle.setAttribute("aria-label", language === "en" ? "Tukar kepada Bahasa Melayu" : "Switch to English");
    document.querySelectorAll("[data-i18n]").forEach(el => { 
      el.textContent = t(el.dataset.i18n); 
    });
  };

  toggle.addEventListener("click", () => { 
    setLanguage(getLanguage() === "en" ? "ms" : "en"); 
    apply(); 
    document.dispatchEvent(new Event("languagechange")); 
  });

  apply();
});