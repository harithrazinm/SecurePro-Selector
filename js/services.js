/* Edit this file to adjust service questions, options and guide prices. */

const SERVICES = {


  cctv: {
    name: "CCTV", icon: "📹", tagline: "See what matters, wherever you are.", price: "From RM 1,200", questions: [
      { key: "property", title: "What are you securing?", hint: "We will match coverage to the type of site.", options: [["Home", "Landed or apartment residence"], ["Business", "Shop, office or commercial unit"], ["Warehouse / factory", "Larger operational premises"]] },
      { key: "system", title: "Which CCTV system suits you?", hint: "Not sure? Choose “Need advice” and we will help.", options: [["IP camera", "Clear digital video and remote viewing"], ["Analog HD", "Reliable value-focused setup"], ["Wireless", "Flexible installation with Wi-Fi"], ["Need advice", "Recommend the best fit"]] },
      { key: "coverage", title: "How many areas need coverage?", hint: "An area can be an entrance, room, driveway or other viewing point.", options: [["1–4 areas", "Compact coverage"], ["5–8 areas", "Standard property coverage"], ["9–16 areas", "Extended coverage"], ["16+ areas", "Large site coverage"]] },
      { key: "priority", title: "What matters most?", hint: "Your priority helps us recommend the right features.", options: [["Night vision", "Clear visibility after dark"], ["Remote viewing", "Check in from your phone"], ["Audio recording", "Capture sound with video"], ["AI detection", "Smart person or vehicle alerts"]] }]
  },
  alarm: {
    name: "Alarm", icon: "🚨", tagline: "Know the moment something is wrong.", price: "From RM 950", questions: [
      { key: "property", title: "What type of property is this?", hint: "", options: [["Home", "Landed or apartment residence"], ["Retail / office", "Commercial premises"], ["Warehouse / factory", "Large operational premises"]] },
      { key: "size", title: "How large is the protected area?", hint: "", options: [["Small", "Up to 1,000 sq ft"], ["Medium", "1,000–3,000 sq ft"], ["Large", "Over 3,000 sq ft"]] },
      { key: "entry", title: "How many entry points need protection?", hint: "", options: [["1–2", "Main access points"], ["3–5", "Multiple doors and windows"], ["6+", "Comprehensive perimeter"]] },
      { key: "alert", title: "How should the system alert you?", hint: "", options: [["Mobile app", "Instant phone notifications"], ["Siren + app", "On-site deterrent and alerts"], ["Monitoring-ready", "Prepared for professional monitoring"]] }]
  },
  autogate: {
    name: "Autogate", icon: "🚗", tagline: "Arrive home to effortless access.", price: "From RM 2,800", questions: [
      { key: "gate", title: "What gate do you have?", hint: "", options: [["Swing gate", "Single or double leaf gate"], ["Sliding gate", "Gate moves along a track"], ["New gate needed", "Require gate and automation advice"]] },
      { key: "width", title: "What is the gate opening width?", hint: "", options: [["Up to 12 ft", "Compact driveway"], ["13–18 ft", "Typical double-car driveway"], ["Over 18 ft", "Wide or heavy-duty opening"]] },
      { key: "power", title: "What access method do you prefer?", hint: "", options: [["Remote control", "Simple everyday access"], ["App control", "Open from your phone"], ["Remote + app", "Both options"]] },
      { key: "feature", title: "Any extra requirement?", hint: "", options: [["Safety sensors", "Obstacle detection"], ["Battery backup", "Operate during power interruptions"], ["Intercom integration", "Visitor access control"], ["No extra requirement", "Standard installation"]] }]
  },
  access: {
    name: "Door Access", icon: "🚪", tagline: "Control every door with confidence.", price: "From RM 1,500", questions: [
      { key: "site", title: "Where is access control needed?", hint: "", options: [["Home", "Main door, gate or rooms"], ["Office", "Staff and meeting areas"], ["Retail / factory", "Restricted commercial zones"]] },
      { key: "doors", title: "How many doors need control?", hint: "", options: [["1 door", "Single controlled entry"], ["2–4 doors", "Small multi-door setup"], ["5+ doors", "Centralised access management"]] },
      { key: "method", title: "Preferred entry method?", hint: "", options: [["Card / tag", "Fast contactless entry"], ["Fingerprint", "Biometric verification"], ["Face recognition", "Touch-free recognition"], ["PIN code", "Keypad access"]] },
      { key: "requirement", title: "What is most important?", hint: "", options: [["Visitor records", "Track entries and exits"], ["Time schedules", "Control when users can enter"], ["Mobile access", "Unlock with a phone"], ["Integration", "Connect with existing door or alarm"]] }]
  },
  "solar-pump": {
    name: "Solar Water Pump", icon: "💧", tagline: "Move water efficiently, off the grid.", price: "From RM 4,000", questions: [
      { key: "use", title: "What will the pump be used for?", hint: "", options: [["Irrigation", "Water crops or landscape"], ["Livestock", "Supply troughs or animal areas"], ["Domestic", "Home or small-site water supply"], ["Other", "A specialist use case"]] },
      { key: "source", title: "Where does the water come from?", hint: "", options: [["Well / borehole", "Underground water source"], ["River / pond", "Surface water source"], ["Tank", "Stored water supply"]] },
      { key: "distance", title: "How far must water travel?", hint: "", options: [["Under 50 m", "Short run"], ["50–200 m", "Medium run"], ["Over 200 m", "Long-distance transfer"]] },
      { key: "volume", title: "How much water is needed?", hint: "", options: [["Light use", "Small daily requirement"], ["Regular use", "Consistent daily supply"], ["High volume", "Demanding irrigation or commercial use"]] }]
  },
  attendance: {
    name: "Time Attendance", icon: "👥", tagline: "Make workforce attendance simple.", price: "From RM 850", questions: [
      { key: "business", title: "What kind of organisation is this?", hint: "", options: [["Office", "Professional workplace"], ["Retail / F&B", "Customer-facing team"], ["Factory / warehouse", "Shift-based operation"], ["School / institution", "Education or public setting"]] },
      { key: "staff", title: "How many people will use it?", hint: "", options: [["1–20", "Small team"], ["21–50", "Growing team"], ["51–200", "Established workforce"], ["200+", "Large workforce"]] },
      { key: "method", title: "Preferred clock-in method?", hint: "", options: [["Fingerprint", "Trusted biometric clock-in"], ["Face recognition", "Fast touch-free clock-in"], ["Card / tag", "Simple tap-in access"], ["Need advice", "Recommend the right reader"]] },
      { key: "output", title: "What do you need from reporting?", hint: "", options: [["Basic attendance", "Clock-in and clock-out records"], ["Shift scheduling", "Track variable working hours"], ["Payroll export", "Prepare data for payroll"], ["Multi-branch", "Manage several locations"]] }]
  },

  "solar-cctv": {
    name: "Solar CCTV",
    // Use the relative path to your PNG image here
    icon: "assets/solarcctv.png", 
    tagline: "See what matters, wherever you are.",
    price: "From RM 1,200",
    questions: [
      { 
        key: "property", 
        title: "What are you securing?", 
        hint: "We will match coverage to the type of site.", 
        options: [
          ["Home", "Landed or apartment residence"], 
          ["Business", "Shop, office or commercial unit"], 
          ["Warehouse / factory", "Larger operational premises"]
        ] 
      },
      { 
        key: "system", 
        title: "Which CCTV system suits you?", 
        hint: "Not sure? Choose “Need advice” and we will help.", 
        options: [
          ["IP camera", "Clear digital video and remote viewing"], 
          ["Analog HD", "Reliable value-focused setup"], 
          ["Wireless", "Flexible installation with Wi-Fi"], 
          ["Need advice", "Recommend the best fit"]
        ] 
      },
      { 
        key: "coverage", 
        title: "How many areas need coverage?", 
        hint: "An area can be an entrance, room, driveway or other viewing point.", 
        options: [
          ["1–4 areas", "Compact coverage"], 
          ["5–8 areas", "Standard property coverage"], 
          ["9–16 areas", "Extended coverage"], 
          ["16+ areas", "Large site coverage"]
        ] 
      },
      { 
        key: "priority", 
        title: "What matters most?", 
        hint: "Your priority helps us recommend the right features.", 
        options: [
          ["Night vision", "Clear visibility after dark"], 
          ["Remote viewing", "Check in from your phone"], 
          ["Audio recording", "Capture sound with video"], 
          ["AI detection", "Smart person or vehicle alerts"]
        ] 
      }
    ]
  }
  
};
