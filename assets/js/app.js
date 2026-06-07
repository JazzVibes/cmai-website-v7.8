// CMAI Karate static-site behavior
(function applyInitialTheme() {
  try {
    var saved = localStorage.getItem("cmai_theme") || "system";
    if (saved === "system") {
      document.documentElement.removeAttribute("data-theme");
      return;
    }
    document.documentElement.setAttribute("data-theme", saved);
  } catch (error) {
    document.documentElement.removeAttribute("data-theme");
  }
})();

var CMAI_DEFAULT_FEATURES = {
  titleCaseSectionHeadings: true,
  heroHistoryControls: true,
  scheduleCompactRows: true,
  scheduleRevisionDate: true,
  scheduleCopyButton: true,
  scheduleClosedDayRows: true,
  scheduleRepeatDayLabels: true,
  newsletterSignup: false
};

var CMAI_SITE_CONFIG = window.CMAI_SITE_CONFIG || {};
CMAI_SITE_CONFIG.features = Object.assign(
  {},
  CMAI_DEFAULT_FEATURES,
  CMAI_SITE_CONFIG.features || {},
  window.CMAI_SITE_FEATURES || {}
);
window.CMAI_SITE_CONFIG = CMAI_SITE_CONFIG;
window.CMAI_SITE_FEATURES = CMAI_SITE_CONFIG.features;

function cmaiFeature(name) {
  return CMAI_SITE_CONFIG.features[name] !== false;
}

var CMAI_TITLE_CASE_HEADINGS = {
  "Program paths": "Program Paths",
  "Class schedule": "Class Schedule",
  "Upcoming events": "Upcoming Events",
  "What students say": "What Students Say",
  "Quick glossary": "Quick Glossary",
  "Respect first": "Respect First",
  "Safety culture": "Safety Culture",
  "Parent friendly": "Parent Friendly",
  "Instructional videos": "Instructional Videos",
  "Fundamentals and drills": "Fundamentals and Drills",
  "Modern Arnis and weapons": "Modern Arnis and Weapons",
  "Basics to pressure": "Basics to Pressure",
  "Kata to application": "Kata to Application",
  "Safety first": "Safety First",
  "Rank overview": "Rank Overview",
  "Planning a visit?": "Planning a Visit?",
  "Site manager": "Site Manager",
  "Content draft": "Content Draft",
  "Student comments": "Student Comments",
  "Events preview": "Events Preview",
  "Comments preview": "Comments Preview",
  "Preview home": "Preview Home",
  "Preview events": "Preview Events",
  "Contact and visit": "Contact and Visit",
  "What to bring": "What to Bring",
  "What parents can expect": "What Parents Can Expect",
  "How to start": "How to Start"
};

function applyFeatureClasses() {
  document.body.classList.toggle("schedule-compact", cmaiFeature("scheduleCompactRows"));
  document.body.classList.toggle("newsletter-enabled", cmaiFeature("newsletterSignup"));
}

function applyTitleCaseHeadings() {
  if (!cmaiFeature("titleCaseSectionHeadings")) return;
  Array.prototype.forEach.call(document.querySelectorAll("h1, h2, h3, .section-heading span"), function(element) {
    var label = element.textContent.trim().replace(/\s+/g, " ");
    var replacement = CMAI_TITLE_CASE_HEADINGS[label];
    if (!replacement || replacement === label) return;
    if (element.children.length) return;
    element.textContent = replacement;
  });
}

var CMAI_DATA = {
  events: [
    {
      title: "Florida Shihan Dai Training Session",
      date: "TBD",
      time: "TBD",
      location: "CMAI Karate, 8029 Ramona Blvd W, Jacksonville, FL",
      description: "State training for Florida Shihan Dai and candidates. Hosted at CMAI with open mat time for visiting instructors.",
      cta: {
        label: "Details on Facebook",
        url: "https://www.facebook.com/people/CMAI-Karate/100063614228167/"
      }
    },
    {
      title: "Quarterly Belt Testing Week",
      date: "Posted in class",
      time: "Evenings",
      location: "CMAI Karate",
      description: "Formal evaluations with pre-checks in class. Students test when skills are ready, not just when the calendar turns.",
      cta: {
        label: "Review curriculum",
        url: "curriculum.html"
      }
    },
    {
      title: "Weapons Intensive",
      date: "TBD",
      time: "Saturday workshop",
      location: "CMAI Karate",
      description: "Modern Arnis focus: striking patterns, disarms, timing, and empty-hand transfers."
    }
  ],
  reviews: [
    {
      name: "Ricky Davis Jr.",
      date: "2024-09-09",
      text: "It's a great place to keep your kids or even adults in great shape while learning real self-defense. Grand Master Carter is great with the kids."
    },
    {
      name: "Michael Price",
      date: "2022-04-18",
      text: "Come on out and find out."
    },
    {
      name: "Vicky Price",
      date: "2021-08-26",
      text: "Great instructors and a fun learning environment!"
    },
    {
      name: "Ricky Pritchard II",
      date: "2017-12-19",
      text: "Teaching more than martial arts - students learn manners, respect, and other life lessons."
    },
    {
      name: "Sarah Stilwell",
      date: "2016-12-17",
      text: "Awesome instructors! My son started at age 4 and kept up thanks to careful instruction and muscle-memory focus. He loves it here and I am a proud mom!"
    }
  ],
  schedule: {
    revisionDate: "June 6, 2026",
    Mon: [
      { time: "5:30-6:15p", class: "Kids", focus: "Ages 7-12" },
      { time: "6:15-7:00p", class: "Teens", focus: "Fundamentals and application" },
      { time: "7:00-8:00p", class: "Adults / All-levels", focus: "Karate, tuite, self-defense" },
      { time: "8:00-8:30p", class: "Weapons", focus: "Monthly focus block" }
    ],
    Tue: [
      { time: "6:00-7:00p", class: "Modern Arnis", focus: "All-levels" }
    ],
    Wed: [
      { time: "5:30-6:15p", class: "Kids", focus: "Ages 7-12" },
      { time: "6:15-7:00p", class: "Teens", focus: "Fundamentals and application" },
      { time: "7:00-8:00p", class: "Adults / All-levels", focus: "Karate, tuite, self-defense" }
    ],
    Thu: [
      { time: "6:00-7:00p", class: "Jujitsu / Tuite Lab", focus: "Joint control and safe practice" }
    ],
    Fri: [],
    Sat: [
      { time: "10:00a-12:00p", class: "Seminar / Intensive", focus: "As scheduled" }
    ],
    Sun: []
  },
  bios: [
    {
      name: "Sensei Jerald Carter",
      photo: "assets/img/bios/jerald.png",
      titles: ["Founder, CMAI Karate", "Head Instructor"],
      systems: ["Okinawan Karate (Ryukyu Kempo)", "Small Circle Jujitsu", "Modern Arnis"],
      teachers: ["Master Jerry Williamson", "Grandmaster Jack Hogan", "Renshi Michael P. Andrews", "Professor Leon Jay", "Guro Bruce Chiu"],
      ranks: ["Ryukyu Kempo - 4th Dan (2004)", "Kyusho - Master Level 1 (2004)", "Ryukyu Kempo - 5th Dan (2007, HKI)", "Modern Arnis - 1st Degree", "Small Circle Jujitsu - 2nd Dan"],
      tags: ["Dojo Owner", "Curriculum Lead"],
      summary: "Sensei Carter blends Okinawan striking with Small Circle Jujitsu joint-control and Modern Arnis flow. He emphasizes safety, fundamentals, and respectful culture so students of all ages can progress."
    },
    {
      name: "Grandmaster Jack Hogan (1949-2017)",
      photo: "assets/img/bios/jack-hogan.jpg",
      titles: ["Founder, Hogan Karate International"],
      systems: ["Ryukyu Kempo", "Kyusho concepts", "Small Circle Jujitsu influence"],
      teachers: ["Prof. Wally Jay", "GM Remy A. Presas", "George Dillman"],
      ranks: ["10th Dan - Ryukyu Kempo", "5th Dan - Shotokan Karate"],
      tags: ["Mentor", "Lineage"],
      summary: "GM Hogan specialized in practical self-defense and pressure-point concepts, teaching internationally and shaping CMAI's core approach to clean basics and courtesy."
    },
    {
      name: "Professor Wally Jay (1917-2011)",
      photo: "assets/img/bios/wally-jay.jpg",
      titles: ["Founder, Small Circle Jujitsu"],
      systems: ["Small Circle Jujitsu", "Danzan Ryu / Kodenkan Jujutsu", "Judo"],
      teachers: ["Seishiro Henry Okazaki", "Ken Kawachi", "Juan Gomez"],
      ranks: ["10th-dan Jujutsu", "6th-dan Judo"],
      tags: ["Lineage"],
      summary: "Prof. Jay refined precision and leverage into Small Circle Jujitsu, principles that inform CMAI's joint-control and safety methods."
    },
    {
      name: "Professor Leon Jay",
      photo: "assets/img/bios/leon-jay.jpg",
      titles: ["Headmaster, Small Circle Jujitsu"],
      systems: ["Small Circle Jujitsu", "Kodenkan Jujitsu / Kodokan Judo background"],
      teachers: ["Prof. Wally Jay"],
      ranks: ["Head of System, appointed 2002"],
      tags: ["Mentor"],
      summary: "Prof. Leon Jay continues Small Circle Jujitsu worldwide. His seminars and mentorship reinforce tuite, structure, and safe practice at CMAI."
    },
    {
      name: "Guro Bruce Chiu",
      photo: "assets/img/bios/bruce-chiu.png",
      titles: ["Founder, Arnis International"],
      systems: ["Modern Arnis"],
      teachers: ["Grandmaster Remy A. Presas"],
      ranks: ["Modern Arnis senior instructor"],
      tags: ["Weapons", "Flow"],
      summary: "A personal student of GM Remy Presas, Guro Bruce supports the Modern Arnis program: flow drills, disarms, and empty-hand translations linked back to kata."
    }
  ]
};

var NAV_ITEMS = [
  { page: "home", label: "Home", href: "index.html" },
  { page: "programs", label: "Programs", href: "programs.html" },
  { page: "curriculum", label: "Curriculum", href: "curriculum.html" },
  { page: "events", label: "Events", href: "events.html" },
  { page: "biographies", label: "Biographies", href: "biographies.html" },
  { page: "join", label: "Join", href: "join.html" }
];

var HERO_SLIDES = [
  {
    title: "Motobu Choki, 1925",
    image: "assets/img/hero/motobu-king-1925.jpg",
    alt: "1925 period illustration of Okinawan karate master Motobu Choki facing a boxer",
    position: "center center",
    mobilePosition: "60% center",
    frameWidth: "min(47vw, 620px)",
    frameHeight: "min(68%, 510px)",
    description: "A 1925 King magazine drawing of a 1922 Kyoto match between Okinawan karate master Motobu Choki and a foreign boxer. It carries the drama of a period fight illustration while staying tied to a named Okinawan karate figure.",
    credit: "Kabashima, King magazine, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Motobu_king1925.jpg"
  },
  {
    title: "Motobu kakidi, 1926",
    image: "assets/img/hero/motobu-kakidi-1926.jpg",
    alt: "Motobu Choki performing kakidi from a 1926 pre-arranged kumite book",
    position: "74% center",
    mobilePosition: "72% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "Motobu Choki performing kakidi from his 1926 Okinawa Kenpo Karatejutsu Kumite-hen. The sequence documents old Okinawan partner training, showing close-range contact and timing rather than only formal solo posture.",
    credit: "Motobu Choki, Okinawa Kenpo Karatejutsu Kumite-hen, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Motobu_Ch%C5%8Dki_performing_kakidi.jpg"
  },
  {
    title: "Motobu kumite, 1926",
    image: "assets/img/hero/motobu-kumite-1926.jpg",
    alt: "Motobu Choki demonstrating kumite from a 1926 Okinawan karate book",
    position: "74% center",
    mobilePosition: "72% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "Another 1926 Motobu Choki kumite frame from Okinawa Kenpo Karate Jutsu. Motobu's published partner sequences are prized because they show old karate as applied timing, entry, and contact rather than only solo kata.",
    credit: "Motobu Choki, Okinawa Kenpo Karate Jutsu, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kumite_of_Motobu_Choki.jpg"
  },
  {
    title: "Motobu Choyu, 1920s",
    image: "assets/img/hero/motobu-choyu-1920s.jpg",
    alt: "Historical portrait of Okinawan martial artist Motobu Choyu in the 1920s",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "Motobu Choyu was the elder brother of Motobu Choki and heir to the Motobu family martial tradition. His portrait widens the Motobu story beyond one famous fighter into an older Okinawan household lineage.",
    credit: "Uehara Seikichi, Martial Dance, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Motobu_Choyu.jpg"
  },
  {
    title: "Karate at Shuri Castle, 1938",
    image: "assets/img/hero/karate-shuri-castle-1938.jpg",
    alt: "Karate training in front of Shuri Castle in Naha, Okinawa in 1938",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(48vw, 650px)",
    frameHeight: "min(64%, 470px)",
    description: "Karate training in front of Shuri Castle in 1938. The setting matters: Shuri was the old Ryukyu royal seat, giving the image a strong Okinawan place-story rather than just a generic martial arts scene.",
    credit: "Nakasone Genwa, A Broad View of Karatedo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Karate_ShuriCastle.jpg"
  },
  {
    title: "Funakoshi on the makiwara, 1924",
    image: "assets/img/hero/funakoshi-makiwara-1924.jpg",
    alt: "Gichin Funakoshi practicing makiwara striking in 1924",
    position: "76% center",
    mobilePosition: "76% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "Gichin Funakoshi striking the makiwara in 1924. The makiwara is a simple Okinawan striking post associated with conditioning, alignment, and the old habit of testing form against real resistance.",
    credit: "Gichin Funakoshi, Rentan Goshin Karate Jutsu, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Funakoshi_Makiwara.jpg"
  },
  {
    title: "Funakoshi, Heian Nidan, 1925",
    image: "assets/img/hero/funakoshi-heian-nidan-1925.png",
    alt: "Gichin Funakoshi performing the second movement of kata Heian Nidan in 1925",
    position: "76% center",
    mobilePosition: "74% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "A 1925 kata frame from Funakoshi's Rentan Goshin Karate Jutsu. The page records how early printed karate books preserved kata transmission one movement at a time.",
    credit: "Gichin Funakoshi, Rentan Goshin Karate Jutsu, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gichin_Funakoshi_-_Heian_Nidan_(2).png"
  },
  {
    title: "Yoshitaka Funakoshi",
    image: "assets/img/hero/gigo-funakoshi.jpg",
    alt: "Yoshitaka Gigo Funakoshi demonstrating a karate stance and receiving posture",
    position: "74% center",
    mobilePosition: "72% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "Yoshitaka, also called Gigo, Funakoshi helped shape Shotokan's Japanese-era development after his father introduced karate from Okinawa to mainland Japan. His generation is often associated with deeper stances, stronger hip drive, and a more athletic training vocabulary.",
    credit: "Disciples of Yoshitaka Funakoshi, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gigo_funakoshi.jpg"
  },
  {
    title: "Kanryo Higaonna, 1900s",
    image: "assets/img/hero/higaonna-kanryo-1900s.jpg",
    alt: "Historical photograph of Okinawan karate master Kanryo Higaonna",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(72%, 520px)",
    description: "Kanryo Higaonna is one of the great Naha-te names and a teacher of Chojun Miyagi. His place in the line roots Goju-ryu in an older Okinawan teacher generation.",
    credit: "Nagamine Shoshin, Masters of Karate and Sumo in Okinawa, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Higaonna_Kanryo.jpg"
  },
  {
    title: "Chojun Miyagi, 1938",
    image: "assets/img/hero/miyagi-chojun-1938.jpg",
    alt: "1938 photograph of Okinawan karate master Chojun Miyagi",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "Chojun Miyagi, founder of Goju-ryu, photographed in 1938 for Nakasone Genwa's A Broad View of Karatedo. Miyagi's hard-soft training vocabulary remains one of Okinawan karate's major twentieth-century legacies.",
    credit: "Nakasone Genwa, A Broad View of Karatedo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Miyagi_Chojun.jpg"
  },
  {
    title: "Miyagi and Kyoda, 1900s",
    image: "assets/img/hero/miyagi-kyoda-1900s.jpg",
    alt: "Chojun Miyagi and Juhatsu Kyoda together in an early Okinawan karate photograph",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(33vw, 410px)",
    frameHeight: "min(74%, 540px)",
    description: "Chojun Miyagi and Juhatsu Kyoda both came through the Naha-te world connected to Kanryo Higaonna. Miyagi later founded Goju-ryu, while Kyoda founded Toon-ryu, carrying related training roots in different directions.",
    credit: "Nagamine Shoshin, Masters of Karate and Sumo in Okinawa, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Miyagi_and_Kyoda.jpg"
  },
  {
    title: "Chibana Choshin, 1938",
    image: "assets/img/hero/chibana-choshin-1938.jpg",
    alt: "1938 photograph of Chibana Choshin demonstrating Passai kata",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "Chibana Choshin demonstrating Passai in 1938. Chibana carried the Itosu/Shuri line forward and later became a central name in Kobayashi Shorin-ryu, so this is more than a portrait: it is a kata lineage clue.",
    credit: "Nakasone Genwa, A Broad View of Karatedo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chibana_Choshin.jpg"
  },
  {
    title: "Kentsu Yabu, 1938",
    image: "assets/img/hero/yabu-kentsu-1938.jpg",
    alt: "1938 photograph of Okinawan karate teacher Kentsu Yabu",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(72%, 520px)",
    description: "Kentsu Yabu, photographed in 1938, is a valuable education-era karate figure. His story connects Okinawan karate to school instruction, discipline, and the way older practice moved into organized teaching.",
    credit: "Nakasone Genwa, A Broad View of Karatedo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Yabu_Kentsu.jpg"
  },
  {
    title: "Chomo Hanashiro, 1938",
    image: "assets/img/hero/hanashiro-chomo-1938.jpg",
    alt: "1938 photograph of Okinawan martial arts master Chomo Hanashiro performing Jion kata",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "Chomo Hanashiro performing Jion in 1938. Rather than a formal portrait, the photograph catches an Okinawan master inside kata, preserving a moment of movement and posture.",
    credit: "Nakasone Genwa, A Broad View of Karatedo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hanashiro_Chomo.jpg"
  },
  {
    title: "Kyan Chotoku, 1938",
    image: "assets/img/hero/kyan-chotoku-1938.jpg",
    alt: "1938 photograph of Okinawan karate master Kyan Chotoku",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(72%, 520px)",
    description: "Kyan Chotoku, photographed in 1938, represents another old Okinawan branch connected with Shuri and Tomari traditions. His story shows karate as a network of teachers rather than a single straight line.",
    credit: "Nakasone Genwa, A Broad View of Karatedo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kyan_Chotoku.jpg"
  },
  {
    title: "Kenwa Mabuni, 1938",
    image: "assets/img/hero/mabuni-kenwa-1938.jpg",
    alt: "1938 photograph of Okinawan karate master Kenwa Mabuni",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "Kenwa Mabuni, founder of Shito-ryu, appears here in 1938. Mabuni studied under both Itosu and Higaonna lines, linking kata preservation with cross-lineage training.",
    credit: "Nakasone Genwa, A Broad View of Karatedo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mabuni_Kenwa.jpg"
  },
  {
    title: "Mabuni, Suparinpei, 1934",
    image: "assets/img/hero/mabuni-suparinpei-1934.jpg",
    alt: "Kenwa Mabuni demonstrating Suparinpei kata in 1934",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(30vw, 360px)",
    frameHeight: "min(74%, 540px)",
    description: "Kenwa Mabuni demonstrating Suparinpei in 1934. Mabuni's reputation as a kata preservationist matters here: the photograph records a movement from one of the long-form kata associated with the Naha-te stream.",
    credit: "Tokyo Koubukan, The Study of Karate, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mabuni_Kenwa2.jpg"
  },
  {
    title: "Toyama Kanken, 1934",
    image: "assets/img/hero/toyama-kanken-1934.jpg",
    alt: "Toyama Kanken demonstrating Gojushiho kata in 1934",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "Toyama Kanken appears here in a 1934 karate study performing Gojushiho. His career sits in the same early-modern Okinawan-to-Japanese transmission period that shaped many later karate organizations.",
    credit: "Tokyo Koubukan, The Study of Karate, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Toyama_Kanken.jpg"
  },
  {
    title: "Anko Itosu attribution",
    image: "assets/img/hero/itosu-anko-1915.jpg",
    alt: "Historical photograph considered by researchers to show Okinawan karate master Anko Itosu",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(72%, 520px)",
    description: "A photograph identified in the source notes as considered to show Anko Itosu, the teacher whose school reforms and Pinan kata work helped move karate into broader public education. The caption stays careful because the source itself frames the identification as researched rather than absolute.",
    credit: "Andreas Quast, via Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Itosu_Anko_(1831_%E2%80%93_1915).jpg"
  },
  {
    title: "Shinpan Gusukuma",
    image: "assets/img/hero/shinpan-gusakuma.gif",
    alt: "Historical portrait of Okinawan karate teacher Shinpan Gusukuma",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(30vw, 360px)",
    frameHeight: "min(72%, 520px)",
    description: "Shinpan Gusukuma, also romanized Gusakuma, belongs to the Shuri-line karate generation associated with Anko Itosu's influence. He is remembered among the teachers who helped carry kata-based Okinawan karate through the school-era generation.",
    credit: "Okinawan Karate and Kobudo Institute, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shinpan_Gusakuma.gif"
  },
  {
    title: "Kanga Sakugawa, Toudi ancestor",
    image: "assets/img/hero/kanga-sakugawa-toudi.jpg",
    alt: "Drawn portrait of Kanga Sakugawa from Okinawa Karate Kaikan",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(40vw, 540px)",
    frameHeight: "min(64%, 480px)",
    description: "A drawn portrait of Kanga Sakugawa from Okinawa Karate Kaikan. Sakugawa is often placed deep in the Toudi/Okinawan karate story, before the better-documented twentieth-century photographs.",
    credit: "Okinawa Karate Kaikan, via Wikimedia Commons",
    license: "CC0 1.0 public domain dedication",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kanga_Sakugawa_(%22Toudi%22_Sakugawa).jpg"
  },
  {
    title: "Sokon Matsumura",
    image: "assets/img/hero/sokon-matsumura-kaikan.jpg",
    alt: "Drawn portrait of Okinawan karate ancestor Sokon Matsumura",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(38vw, 510px)",
    frameHeight: "min(68%, 500px)",
    description: "Sokon Matsumura is one of the major names in the Shuri-te story and is often placed between the older Toudi generation and later teachers such as Anko Itosu. The portrait comes from Okinawa Karate Kaikan.",
    credit: "Okinawa Karate Kaikan, via Wikimedia Commons",
    license: "CC0 1.0 public domain dedication",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:S%C5%8Dkon_Matsumura.jpg"
  },
  {
    title: "Karate in prewar Naha",
    image: "assets/img/hero/karate-naha-before-war.jpg",
    alt: "Pre-war photograph of karate practice in Naha, Okinawa",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(47vw, 640px)",
    frameHeight: "min(64%, 470px)",
    description: "A pre-1946 photograph of karate practice in Naha, Okinawa. It shows the art in its original island context before the postwar global spread of karate.",
    credit: "Prewar photographer, Naha City historical archive, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Karate_in_Naha_before_the_war.jpg"
  },
  {
    title: "Yoshin-ryu jujutsu throw, 1911",
    image: "assets/img/hero/jujutsu-yoshin-ryu-1911.png",
    alt: "1911 Japanese jujutsu photograph showing a Totsuka-ha Yoshin-ryu throwing technique",
    position: "76% center",
    mobilePosition: "74% center",
    frameWidth: "min(34vw, 430px)",
    frameHeight: "min(72%, 540px)",
    description: "A 1911 Totsuka-ha Yoshin-ryu image of Kamegoshi. The posture documents older jujutsu mechanics of leverage, off-balancing, and standing control before those ideas were reorganized in later judo and jujutsu systems.",
    credit: "Fukai Nenokichi, Okuhi Ryu no Maki, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%E6%88%B8%E5%A1%9A%E6%B4%BE%E6%A5%8A%E5%BF%83%E6%B5%81%E3%81%AE%E9%8E%8C%E8%85%B0.png"
  },
  {
    title: "Jujutsu school training, 1922",
    image: "assets/img/hero/jujitsu-agricultural-school-1922.jpg",
    alt: "1922 photograph of jujutsu training at a Japanese agricultural school",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(46vw, 620px)",
    frameHeight: "min(62%, 450px)",
    description: "A 1922 image of jujutsu training at a Japanese agricultural school from J.W. Robertson Scott's The Foundations of Japan. It records jujutsu being taught as physical culture, balance breaking, and practical control.",
    credit: "J.W. Robertson Scott / Project Gutenberg, via Wikimedia Commons",
    license: "Public domain / Project Gutenberg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:JUJITSU_(AND_RIFLES)_in_an_agricultural_school.jpg"
  },
  {
    title: "Seishiro Okazaki, 1929",
    image: "assets/img/hero/seishiro-okazaki-1929.png",
    alt: "1929 portrait of Seishiro Henry Okazaki, founder of Danzan Ryu jujutsu",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(72%, 520px)",
    description: "Seishiro Henry Okazaki, shown in a 1929 self-defense text, founded Danzan Ryu jujutsu in Hawaii. His Kodenkan method became an important American jujutsu stream, blending Japanese jujutsu, judo influence, and practical self-defense teaching.",
    credit: "Self-Defense for Girls and Women, via Wikimedia Commons",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Seishiro_Okazaki_(1890%E2%80%931951).png"
  },
  {
    title: "Professor Wally Jay",
    image: "assets/img/bios/wally-jay.jpg",
    alt: "Professor Wally Jay, founder of Small Circle Jujitsu",
    position: "74% center",
    mobilePosition: "74% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "Professor Wally Jay founded Small Circle Jujitsu after decades in judo and Danzan Ryu/Kodenkan jujutsu. His method is remembered for small-radius joint action, two-way pressure, balance breaking, and control built from structure rather than force.",
    credit: "Carter's Martial Arts Institute archive",
    license: "Rights holder not listed in source files; confirm before public launch"
  },
  {
    title: "Professor Leon Jay",
    image: "assets/img/bios/leon-jay.jpg",
    alt: "Professor Leon Jay, headmaster of Small Circle Jujitsu",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "Professor Leon Jay, son of Wally Jay, continued Small Circle Jujitsu as the second-generation headmaster. His teaching keeps the system centered on efficient mechanics, tactile sensitivity, and adaptable joint-control principles.",
    credit: "Carter's Martial Arts Institute archive",
    license: "Rights holder not listed in source files; confirm before public launch"
  },
  {
    title: "Grandmaster Jack Hogan",
    image: "assets/img/bios/jack-hogan.jpg",
    alt: "Grandmaster Jack Hogan, founder of Hogan Karate International",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(72%, 520px)",
    description: "Grandmaster Jack Hogan founded Hogan Karate International and taught Ryukyu Kempo with a practical self-defense emphasis. His work brought together karate basics, kyusho concepts, and cross-training influences from teachers including Wally Jay and Remy Presas.",
    credit: "Carter's Martial Arts Institute archive",
    license: "Rights holder not listed in source files; confirm before public launch"
  },
  {
    title: "Kano and Kotani, 1933",
    image: "assets/img/hero/kano-kotani-judo-1933.jpg",
    alt: "Jigoro Kano and Sumiyuki Kotani demonstrating judo in 1933",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(42vw, 560px)",
    frameHeight: "min(60%, 440px)",
    description: "Jigoro Kano and Sumiyuki Kotani demonstrating judo in London in 1933. Kano's Kodokan system shaped much of modern judo, while Kotani became one of the senior technical carriers of the art.",
    credit: "Kodansha Ltd., Judo: 100 Years of History, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jigoro_Kano_and_Sumiyuki_Kotani.jpg"
  },
  {
    title: "Kano and Mifune, before 1938",
    image: "assets/img/hero/kano-mifune-before-1938.jpg",
    alt: "Jigoro Kano and Kyuzo Mifune together before 1938",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(33vw, 410px)",
    frameHeight: "min(74%, 540px)",
    description: "Jigoro Kano with Kyuzo Mifune before 1938. Kano anchors the Kodokan source story, while Mifune is remembered for refined throwing mechanics and technical efficiency.",
    credit: "Baseball Magazine Sha, retouched by Jdcollins13, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jigoro_Kano_and_Kyuzo_Mifune_(restoration).jpg"
  },
  {
    title: "Kano's Kito-ryu menjo, 1883",
    image: "assets/img/hero/kano-kitoryu-menjo-1883.jpg",
    alt: "Jigoro Kano's Kito-ryu judo certificate from October 1883",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(48vw, 650px)",
    frameHeight: "min(50%, 360px)",
    description: "Jigoro Kano received this Kito-ryu menjo in October 1883, shortly after founding the Kodokan. It is a paper trail from classical jujutsu into the emerging system of judo.",
    credit: "Kodokan, Kano Jigoro Taikei, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kano_kitoryu_judo_menjo.jpg"
  },
  {
    title: "Kano and Yamashita, Hiki-otoshi",
    image: "assets/img/hero/kano-yamashita-hiki-otoshi.jpg",
    alt: "Jigoro Kano and Yoshitsugu Yamashita demonstrating Hiki-otoshi in Koshiki-no-kata",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(44vw, 590px)",
    frameHeight: "min(58%, 420px)",
    description: "Jigoro Kano and Yoshitsugu Yamashita demonstrate Hiki-otoshi from Koshiki-no-kata. The kata preserves older armored-grappling principles inside judo, where posture, timing, and decisive balance breaking carry the lesson.",
    credit: "Japan Book Center, Kano Jigoro: My Life and Judo, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hiki-otoshi.jpg"
  },
  {
    title: "Yamashita Yoshiaki",
    image: "assets/img/hero/yamashita-yoshiaki.jpg",
    alt: "Historical portrait of Kodokan judo master Yamashita Yoshiaki",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(72%, 520px)",
    description: "Yamashita Yoshiaki is identified in the source notes as one of the Kodokan's Four Guardians. He represents the early generation that helped prove and transmit Kano's new judo system.",
    credit: "Kodokan holdings, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Yamashita_Yoshiaki.jpg"
  },
  {
    title: "Tomita Tsunejiro",
    image: "assets/img/hero/tomita-tsunejiro.jpg",
    alt: "Historical portrait of Kodokan judo master Tomita Tsunejiro",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "Tomita Tsunejiro is another of the Kodokan's Four Guardians and one of Kano's earliest students. His career belongs to the period when Kodokan judo was still proving itself against older jujutsu schools.",
    credit: "Cesare Barioli, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tomita-Tsunejiro.jpg"
  },
  {
    title: "Mitsuyo Maeda, c.1910",
    image: "assets/img/hero/mitsuyo-maeda-c1910.jpg",
    alt: "Mitsuyo Maeda in a circa 1910 historical photograph",
    position: "74% center",
    mobilePosition: "72% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "A circa-1910 photograph of Mitsuyo Maeda from the period when Japanese grappling was becoming an international story. Maeda carried Kodokan judo through challenge matches and teaching tours, later becoming central to one of Brazil's famous grappling lineages.",
    credit: "National Diet Library source materials, via Wikimedia Commons",
    license: "Public domain / PD-Japan-oldphoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mitsuyo_Maeda_c1910.jpg"
  },
  {
    title: "Maeda fighting poster, 1905",
    image: "assets/img/hero/maeda-fighting-poster-1905.jpg",
    alt: "1905 fighting poster for Mitsuyo Maeda in Belem do Para, Brazil",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(38vw, 510px)",
    frameHeight: "min(70%, 520px)",
    description: "A 1905 Belem do Para fighting poster for Mitsuyo Maeda, where judo is advertised as Kano Jiu-Jitsu. That wording captures a transitional public moment when judo, jujutsu, challenge matches, and theater promotion overlapped.",
    credit: "Theatro Politheama, via Wikimedia Commons",
    license: "Public domain / Public Domain Mark 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mitsuyo_Maeda_Fighting_Poster.jpg"
  },
  {
    title: "Maeda's students in Brazil",
    image: "assets/img/hero/maeda-students-brazil.jpg",
    alt: "Mitsuyo Maeda with his first students in Brazil",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(46vw, 620px)",
    frameHeight: "min(50%, 360px)",
    description: "Mitsuyo Maeda with his first students in Brazil. The small group photograph has an outsized story: Japanese grappling instruction had crossed the ocean and was beginning to root itself in a new country.",
    credit: "Loudenvier, transferred from English Wikipedia, via Wikimedia Commons",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:MaedaStudentsBrazil.jpg"
  },
  {
    title: "Taro Miyake, 1914",
    image: "assets/img/hero/taro-miyake-1914.jpg",
    alt: "French newspaper photograph of Japanese wrestler and jujutsu teacher Taro Miyake in 1914",
    position: "72% center",
    mobilePosition: "70% center",
    frameWidth: "min(31vw, 380px)",
    frameHeight: "min(74%, 540px)",
    description: "A 1914 French newspaper image of Taro Miyake during a Paris visit. It captures the public demonstration era when Japanese jujutsu and wrestling methods were being tested, taught, and compared outside Japan.",
    credit: "La Presse, via Wikimedia Commons",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Taro_Miyake.jpg"
  },
  {
    title: "Toronto judo tournament, 1946",
    image: "assets/img/hero/toronto-judo-tournament-1946.jpg",
    alt: "Group portrait of participants in the April 1946 Toronto Judo Tournament",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(48vw, 650px)",
    frameHeight: "min(48%, 340px)",
    description: "This April 1946 Toronto tournament portrait shows twenty-seven judoka and three other men from the Nikkei Museum's Tom Matsui collection. It is a North American postwar judo snapshot, with Japanese-Canadian names preserved in the source notes.",
    credit: "Nikkei Museum Tom Matsui collection, via Wikimedia Commons",
    license: "Public domain / PD-Canada",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Toronto_Judo_Tournament_1946.jpg"
  },
  {
    title: "Remy Presas, c.1968",
    image: "assets/img/hero/remy-presas-blancia-1968.jpg",
    alt: "Richard Bustillo and Remy Presas with Grand Master Angel L. Blancia circa 1968",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(44vw, 590px)",
    frameHeight: "min(60%, 430px)",
    description: "A circa-1968 photograph of Richard Bustillo and Remy Presas with Grand Master Angel L. Blancia. The image catches Presas before Modern Arnis became widely known in the United States, rooted in a named Filipino martial arts teacher network.",
    credit: "Angel L. Blancia / Guymauve, via Wikimedia Commons",
    license: "CC BY-SA 3.0 or GFDL",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Richard_Bustillo_et_Remy_Presas_avec_leur_Grand_Master_Angel_L._Blancia..jpg"
  },
  {
    title: "Remy Presas portrait",
    image: "assets/img/hero/remy-presas-portrait.jpg",
    alt: "Late 1970s or early 1980s portrait of Modern Arnis founder Remy Presas",
    position: "74% center",
    mobilePosition: "72% center",
    frameWidth: "min(32vw, 390px)",
    frameHeight: "min(74%, 540px)",
    description: "A late-1970s to early-1980s portrait of Grandmaster Remy Presas, founder of Modern Arnis. Presas is known for adapting Filipino stick, blade, and empty-hand methods into a teachable modern curriculum.",
    credit: "Robert James DeMott, via Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Remy_Presas.jpg"
  },
  {
    title: "Guro Bruce Chiu",
    image: "assets/img/bios/bruce-chiu.png",
    alt: "Guro Bruce Chiu, founder of Arnis International",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(39vw, 520px)",
    frameHeight: "min(56%, 410px)",
    description: "Guro Bruce Chiu founded Arnis International and is part of the generation that carried Remy Presas's Modern Arnis forward. His work emphasizes flow, tapi-tapi, disarms, and translating stick motion into empty-hand movement.",
    credit: "Carter's Martial Arts Institute archive",
    license: "Rights holder not listed in source files; confirm before public launch"
  },
  {
    title: "Arnis at the SEA Games, 2005",
    image: "assets/img/hero/arnis-sea-games-2005.jpg",
    alt: "2005 Philippine stamp for Arnis at the Southeast Asian Games",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(42vw, 560px)",
    frameHeight: "min(50%, 360px)",
    description: "A 2005 Philippine Postal Corporation stamp for Arnis at the Southeast Asian Games. It marks Arnis not only as a martial tradition, but as a public sporting identity represented on a regional competition stage.",
    credit: "Philippine Postal Corporation, via Wikimedia Commons",
    license: "Public domain / Philippine government work",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Southeast_Asian_Games_2005_stamp_of_the_Philippines_Arnis.jpg"
  },
  {
    title: "Arnis national sport stamp, 2011",
    image: "assets/img/hero/arnis-stampsheet-2011.jpg",
    alt: "2011 Philippine Postal Corporation stamp sheet celebrating Arnis as a national sport",
    position: "center center",
    mobilePosition: "58% center",
    frameWidth: "min(47vw, 640px)",
    frameHeight: "min(50%, 360px)",
    description: "A 2011 Philippine Postal Corporation stamp sheet marking Arnis as a newly declared national sport. It reflects the art's national recognition in the Philippines and its cultural identity beyond the dojo.",
    credit: "Philippine Postal Corporation, via Wikimedia Commons",
    license: "Public domain / Philippine government work",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Arnis_2011_stampsheet_of_the_Philippines.jpg"
  }
];

var CMAI_ICON_PATHS = {
  "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  "arrow-left": '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-up": '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
  "book-open": '<path d="M12 7v14"/><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 1 3 18.5z"/><path d="M12 3h6.5A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5H12"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 9h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  "external-link": '<path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  "map-pin": '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  message: '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.4-5.2A8 8 0 1 1 21 12z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2z"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  rotate: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  star: '<path d="m12 2 2.9 6 6.6.9-4.8 4.7 1.1 6.6-5.8-3.1-5.8 3.1 1.1-6.6-4.8-4.7 6.6-.9z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  video: '<path d="M15 10l5-3v10l-5-3z"/><rect x="3" y="6" width="12" height="12" rx="2"/>'
};

function cmaiIcon(name) {
  var paths = CMAI_ICON_PATHS[name] || CMAI_ICON_PATHS.star;
  return '<svg class="icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + "</svg>";
}

function decorateIcons(root) {
  var scope = root || document;
  Array.prototype.forEach.call(scope.querySelectorAll("[data-icon]"), function(el) {
    if (el.getAttribute("data-icon-ready") === "true") return;
    var label = el.textContent.trim();
    el.textContent = "";
    el.insertAdjacentHTML("afterbegin", cmaiIcon(el.getAttribute("data-icon")));
    var text = document.createElement("span");
    text.textContent = label;
    el.appendChild(text);
    el.classList.add("has-icon");
    el.setAttribute("data-icon-ready", "true");
  });
  Array.prototype.forEach.call(scope.querySelectorAll("[data-inline-icon]"), function(el) {
    if (el.getAttribute("data-icon-ready") === "true") return;
    el.insertAdjacentHTML("afterbegin", cmaiIcon(el.getAttribute("data-inline-icon")));
    el.setAttribute("data-icon-ready", "true");
  });
}

function iconMenu() {
  return cmaiIcon("menu");
}

function getPage() {
  return document.body.getAttribute("data-page") || "home";
}

function renderShell() {
  var page = getPage();
  var headerHost = document.getElementById("siteHeader");
  var footerHost = document.getElementById("siteFooter");
  if (headerHost) {
    var nav = NAV_ITEMS.map(function(item) {
      var active = item.page === page ? ' aria-current="page"' : "";
      return '<li><a href="' + item.href + '"' + active + ">" + item.label + "</a></li>";
    }).join("");
    headerHost.innerHTML = [
      '<header class="site-header">',
      '<div class="container header-inner">',
      '<a class="brand" href="index.html"><img src="assets/img/logo.png" alt="CMAI logo"><span>CMAI Karate</span></a>',
      '<button id="navToggle" class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="primaryMenu">' + iconMenu() + "</button>",
      '<nav class="primary" id="primaryMenu" aria-label="Primary navigation"><ul>' + nav + "</ul></nav>",
      "</div>",
      "</header>"
    ].join("");
  }
  if (footerHost) {
    footerHost.innerHTML = [
      '<footer class="site-footer">',
      '<div class="container footer-grid">',
      '<div><h4>Visit</h4><p>8029 Ramona Blvd W<br>Jacksonville, FL 32221</p><p><a href="tel:+19047427007">(904) 742-7007</a></p></div>',
      '<div><h4>Explore</h4><div class="footer-links"><a href="programs.html">Programs</a><a href="curriculum.html">Curriculum</a><a href="events.html">Events</a><a href="biographies.html">Biographies</a><a href="join.html">Join</a></div></div>',
      '<div><h4>Programs</h4><div class="footer-links"><a href="programs.html#kids">Kids</a><a href="programs.html#teens">Teens</a><a href="programs.html#adults">Adults</a><a href="programs.html#modern-arnis">Modern Arnis</a></div></div>',
      '<div><h4>Connect</h4><p><a target="_blank" rel="noopener" href="https://www.facebook.com/people/CMAI-Karate/100063614228167/">Facebook</a><br><a target="_blank" rel="noopener" href="https://www.youtube.com/@cmaikarate3400">YouTube</a><br><a href="mailto:info@cmaikarate.com">info@cmaikarate.com</a></p><label for="themeSelect"><small>Theme</small></label><br><select id="themeSelect" class="theme-select" aria-label="Theme select"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div>',
      "</div>",
      '<div class="container footer-bottom"><small>© <span id="year"></span> Carters Martial Arts Institute - CMAI Karate.</small><small>Train with purpose. Lead with respect.</small></div>',
      "</footer>"
    ].join("");
  }
}

function getInlineJSON(id, fallback) {
  var el = document.getElementById(id);
  if (!el) return fallback;
  try {
    return JSON.parse(el.textContent);
  } catch (error) {
    return fallback;
  }
}

var CMAI_PREVIEW_KEYS = {
  events: "cmai_preview_events",
  reviews: "cmai_preview_reviews"
};

function getPreviewData(key) {
  var storageKey = CMAI_PREVIEW_KEYS[key];
  if (!storageKey) return null;
  try {
    var raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
}

function loadData(key, path, inlineId) {
  var fallback = getInlineJSON(inlineId, CMAI_DATA[key]);
  var preview = getPreviewData(key);
  if (preview) return Promise.resolve(preview);
  if (/^https?:$/.test(location.protocol)) {
    return fetch(path, { cache: "no-cache" })
      .then(function(response) {
        return response.ok ? response.json() : fallback;
      })
      .catch(function() {
        return fallback;
      });
  }
  return Promise.resolve(fallback);
}

function appendText(parent, tag, text, className) {
  var el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text || "";
  parent.appendChild(el);
  return el;
}

function renderEvents(items, targetId, limit) {
  var list = document.getElementById(targetId);
  if (!list) return;
  list.innerHTML = "";
  (limit ? items.slice(0, limit) : items).forEach(function(event) {
    var article = document.createElement("article");
    article.className = "event-card";
    var meta = document.createElement("div");
    meta.className = "event-meta";
    meta.insertAdjacentHTML("afterbegin", cmaiIcon("calendar"));
    appendText(meta, "span", [event.date, event.time].filter(Boolean).join(" / "));
    article.appendChild(meta);
    appendText(article, "h3", event.title || "Event");
    appendText(article, "p", event.description || "");
    if (event.location) appendText(article, "p", event.location, "muted");
    if (event.cta && event.cta.url) {
      var link = document.createElement("a");
      link.href = event.cta.url;
      link.textContent = event.cta.label || "Details";
      if (/^https?:\/\//.test(event.cta.url)) {
        link.target = "_blank";
        link.rel = "noopener";
      }
      article.appendChild(link);
    }
    list.appendChild(article);
  });
}

function renderReviews(items, targetId, limit) {
  var list = document.getElementById(targetId);
  if (!list) return;
  list.innerHTML = "";
  (limit ? items.slice(0, limit) : items).forEach(function(review) {
    var quote = document.createElement("blockquote");
    quote.className = "review";
    var who = document.createElement("div");
    who.className = "who";
    appendText(who, "span", review.name || "Student");
    appendText(who, "span", review.date || "", "when");
    quote.appendChild(who);
    appendText(quote, "p", review.text || "");
    list.appendChild(quote);
  });
}

function renderSchedule(schedule, targetId) {
  var host = document.getElementById(targetId);
  if (!host) return;
  var order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var fullDays = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday"
  };
  var revisionDate = schedule.revisionDate || schedule.updated || "June 6, 2026";
  var showRevision = cmaiFeature("scheduleRevisionDate");
  var showCopy = cmaiFeature("scheduleCopyButton");
  var showClosedDays = cmaiFeature("scheduleClosedDayRows");
  var repeatDayLabels = cmaiFeature("scheduleRepeatDayLabels");
  var tools = null;
  if (showRevision || showCopy) {
    tools = document.createElement("div");
    tools.className = "schedule-tools";
    if (showRevision) appendText(tools, "p", "Class Schedule Revision: " + revisionDate, "schedule-revision");
    if (showCopy) {
      var copyButton = document.createElement("button");
      copyButton.className = "btn light small schedule-copy";
      copyButton.type = "button";
      copyButton.setAttribute("aria-label", "Copy class schedule");
      copyButton.insertAdjacentHTML("afterbegin", cmaiIcon("copy"));
      appendText(copyButton, "span", "Copy Schedule");
      copyButton.addEventListener("click", function() {
        copySchedule(schedule, revisionDate, copyButton, fullDays, order, showRevision, showClosedDays);
      });
      tools.appendChild(copyButton);
    }
  }
  var wrap = document.createElement("div");
  wrap.className = "schedule-wrap";
  var table = document.createElement("table");
  table.className = "schedule";
  var thead = document.createElement("thead");
  var headRow = document.createElement("tr");
  ["Day", "Time", "Program", "Focus"].forEach(function(label) {
    appendText(headRow, "th", label);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);
  var tbody = document.createElement("tbody");
  order.forEach(function(day) {
    var items = schedule[day] || [];
    if (!items.length) {
      if (!showClosedDays) return;
      var emptyRow = document.createElement("tr");
      appendText(emptyRow, "th", day);
      appendText(emptyRow, "td", "--");
      appendText(emptyRow, "td", "No Regular Classes");
      appendText(emptyRow, "td", "Check events for special sessions");
      tbody.appendChild(emptyRow);
      return;
    }
    items.forEach(function(item, index) {
      var tr = document.createElement("tr");
      var showDay = index === 0 || repeatDayLabels;
      appendText(tr, "th", showDay ? day : "", showDay && index > 0 ? "schedule-day-repeat" : "");
      appendText(tr, "td", item.time || "");
      appendText(tr, "td", item.class || "");
      appendText(tr, "td", item.focus || item.note || "");
      tbody.appendChild(tr);
    });
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
  host.innerHTML = "";
  if (tools) host.appendChild(tools);
  host.appendChild(wrap);
}

function scheduleText(schedule, revisionDate, fullDays, order, includeRevision, includeClosedDays) {
  var lines = ["CMAI Karate Class Schedule"];
  if (includeRevision) lines.push("Revision: " + revisionDate);
  lines.push("");
  order.forEach(function(day) {
    var items = schedule[day] || [];
    if (!items.length && !includeClosedDays) return;
    lines.push(fullDays[day] || day);
    if (!items.length) {
      lines.push("No regular classes");
    } else {
      items.forEach(function(item) {
        lines.push([item.time, item.class, item.focus || item.note].filter(Boolean).join(" | "));
      });
    }
    lines.push("");
  });
  return lines.join("\n").trim();
}

function copySchedule(schedule, revisionDate, button, fullDays, order, includeRevision, includeClosedDays) {
  var text = scheduleText(schedule, revisionDate, fullDays, order, includeRevision, includeClosedDays);
  var original = button.textContent.trim() || "Copy Schedule";

  function report(label) {
    var icon = button.querySelector(".icon");
    button.textContent = "";
    if (icon) button.appendChild(icon);
    appendText(button, "span", label);
    window.setTimeout(function() {
      var currentIcon = button.querySelector(".icon");
      button.textContent = "";
      if (currentIcon) button.appendChild(currentIcon);
      appendText(button, "span", original);
    }, 1800);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      report("Copied");
    }).catch(function() {
      fallbackCopy(text, report);
    });
    return;
  }
  fallbackCopy(text, report);
}

function fallbackCopy(text, report) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  var success = false;
  try {
    success = document.execCommand("copy");
  } catch (error) {
    success = false;
  }
  document.body.removeChild(textarea);
  report(success ? "Copied" : "Select Table");
}

function renderBios(items) {
  var list = document.getElementById("bioList");
  if (!list) return;
  list.innerHTML = "";
  (items || []).forEach(function(bio) {
    var article = document.createElement("article");
    article.className = "card bio-card";
    var img = document.createElement("img");
    img.loading = "lazy";
    img.alt = (bio.name || "Instructor") + " photo";
    img.src = bio.photo || "assets/img/logo.png";
    article.appendChild(img);
    var body = document.createElement("div");
    appendText(body, "h3", bio.name || "");
    appendText(body, "p", (bio.titles || []).join(" / "), "role");
    appendText(body, "p", bio.summary || "", "summary");
    var meta = document.createElement("div");
    meta.className = "meta";
    [
      ["Ranks", bio.ranks],
      ["Systems", bio.systems],
      ["Teachers and mentors", bio.teachers]
    ].forEach(function(row) {
      if (row[1] && row[1].length) appendText(meta, "div", row[0] + ": " + row[1].join(", "));
    });
    body.appendChild(meta);
    var tags = document.createElement("div");
    tags.className = "tags";
    (bio.tags || []).forEach(function(tag) {
      appendText(tags, "span", tag, "chip");
    });
    body.appendChild(tags);
    article.appendChild(body);
    list.appendChild(article);
  });
}

function renderHeroGallery() {
  var gallery = document.getElementById("heroGallery");
  var caption = document.getElementById("heroGalleryCaption");
  if (!gallery || !caption) return;

  var activeIndex = 0;
  var intervalId = null;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var userPaused = reduceMotion;
  var hero = document.querySelector(".home-hero");
  var showHistoryControls = cmaiFeature("heroHistoryControls");

  gallery.innerHTML = "";
  caption.innerHTML = "";

  var slides = HERO_SLIDES.map(function(slide, index) {
    var figure = document.createElement("figure");
    figure.className = "hero-slide";
    figure.style.setProperty("--hero-position", slide.position);
    figure.style.setProperty("--hero-mobile-position", slide.mobilePosition || slide.position);
    figure.style.setProperty("--artifact-width", slide.frameWidth || "min(44vw, 590px)");
    figure.style.setProperty("--artifact-height", slide.frameHeight || "min(68%, 510px)");
    figure.setAttribute("data-hero-slide", String(index));

    var backdrop = document.createElement("img");
    backdrop.className = "hero-backdrop";
    backdrop.src = slide.image;
    backdrop.alt = "";
    if (index !== 0) backdrop.loading = "lazy";

    var frame = document.createElement("div");
    frame.className = "hero-artifact-frame";
    var artifact = document.createElement("img");
    artifact.className = "hero-artifact-image";
    artifact.src = slide.image;
    artifact.alt = slide.alt;
    if (index !== 0) artifact.loading = "lazy";
    frame.appendChild(artifact);

    figure.append(backdrop, frame);
    gallery.appendChild(figure);
    return figure;
  });

  var top = document.createElement("div");
  top.className = "hero-caption-top";
  var title = document.createElement("strong");
  var hint = document.createElement("span");
  hint.className = "hero-caption-hint";
  hint.textContent = showHistoryControls ? "History gallery" : "Hover or focus for history";
  top.append(title, hint);

  var detail = document.createElement("div");
  detail.className = "hero-caption-detail";
  var description = document.createElement("p");
  var source = document.createElement("small");
  source.className = "hero-caption-source";
  detail.append(description, source);

  var controls = document.createElement("div");
  controls.className = "hero-gallery-controls";
  controls.setAttribute("aria-label", "Hero image options");

  var transport = null;
  var previousButton = null;
  var playPauseButton = null;
  var nextButton = null;
  if (showHistoryControls) {
    transport = document.createElement("div");
    transport.className = "hero-history-controls";
    transport.setAttribute("aria-label", "History gallery playback controls");
    previousButton = makeHistoryButton("arrow-left", "Previous history image", "previous");
    playPauseButton = makeHistoryButton(userPaused ? "play" : "pause", userPaused ? "Play history gallery" : "Pause history gallery", "toggle");
    nextButton = makeHistoryButton("arrow-right", "Next history image", "next");
    transport.append(previousButton, playPauseButton, nextButton);
  }

  var buttons = HERO_SLIDES.map(function(slide, index) {
    var button = document.createElement("button");
    button.className = "hero-gallery-dot";
    button.type = "button";
    button.setAttribute("aria-label", "Show " + slide.title);
    var text = document.createElement("span");
    text.textContent = slide.title;
    button.appendChild(text);
    button.addEventListener("click", function() {
      setActive(index);
      setUserPaused(true);
    });
    controls.appendChild(button);
    return button;
  });

  caption.append(top, detail);
  if (transport) caption.appendChild(transport);
  caption.appendChild(controls);

  if (showHistoryControls) {
    bindHistoryButton(previousButton, "previous");
    bindHistoryButton(nextButton, "next");
    bindHistoryButton(playPauseButton, "toggle");
  }

  function makeHistoryButton(icon, label, action) {
    var button = document.createElement("button");
    button.className = "hero-history-button";
    button.type = "button";
    button.setAttribute("data-history-action", action);
    button.setAttribute("aria-label", label);
    button.title = label;
    button.insertAdjacentHTML("afterbegin", cmaiIcon(icon));
    appendText(button, "span", label, "sr-only");
    return button;
  }

  function bindHistoryButton(button, action) {
    button.addEventListener("mousedown", function(event) {
      if (event.button !== 0) return;
      event.preventDefault();
      activateHistoryButton(action);
    });
    button.addEventListener("click", function(event) {
      event.preventDefault();
      if (event.detail === 0) activateHistoryButton(action);
    });
  }

  function activateHistoryButton(action) {
    if (action === "previous") {
      setActive(activeIndex - 1);
      setUserPaused(true);
      return;
    }
    if (action === "next") {
      setActive(activeIndex + 1);
      setUserPaused(true);
      return;
    }
    setUserPaused(!userPaused);
  }

  function setActive(index) {
    activeIndex = (index + HERO_SLIDES.length) % HERO_SLIDES.length;
    var slide = HERO_SLIDES[activeIndex];
    slides.forEach(function(el, idx) {
      el.classList.toggle("is-active", idx === activeIndex);
    });
    buttons.forEach(function(button, idx) {
      button.setAttribute("aria-current", idx === activeIndex ? "true" : "false");
    });
    title.textContent = slide.title;
    description.textContent = slide.description;
    source.textContent = "";
    if (slide.credit) source.append("Credit: " + slide.credit + ". ");
    if (slide.license) {
      source.append("License: ");
      if (slide.licenseUrl) {
        var licenseLink = document.createElement("a");
        licenseLink.href = slide.licenseUrl;
        licenseLink.target = "_blank";
        licenseLink.rel = "noopener";
        licenseLink.textContent = slide.license;
        source.appendChild(licenseLink);
      } else {
        source.append(slide.license);
      }
      source.append(". ");
    }
    if (slide.sourceUrl) {
      var sourceLink = document.createElement("a");
      sourceLink.href = slide.sourceUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener";
      sourceLink.textContent = "Source";
      source.appendChild(sourceLink);
      source.append(".");
    }
  }

  function stopAutoplay() {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoplay() {
    if (reduceMotion || userPaused || intervalId) return;
    intervalId = window.setInterval(function() {
      setActive(activeIndex + 1);
    }, 6500);
  }

  function setUserPaused(paused) {
    userPaused = paused;
    if (userPaused) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
    if (showHistoryControls) updatePlayPauseButton();
  }

  function updatePlayPauseButton() {
    if (!playPauseButton) return;
    var label = userPaused ? "Play history gallery" : "Pause history gallery";
    playPauseButton.setAttribute("aria-label", label);
    playPauseButton.title = label;
    playPauseButton.setAttribute("aria-pressed", userPaused ? "true" : "false");
    playPauseButton.innerHTML = cmaiIcon(userPaused ? "play" : "pause");
    appendText(playPauseButton, "span", label, "sr-only");
  }

  if (hero) {
    hero.addEventListener("mouseenter", stopAutoplay);
    hero.addEventListener("mouseleave", startAutoplay);
    hero.addEventListener("focusin", stopAutoplay);
    hero.addEventListener("focusout", startAutoplay);
  }

  setActive(0);
  if (showHistoryControls) updatePlayPauseButton();
  startAutoplay();
}

function initThemeSelect() {
  var select = document.getElementById("themeSelect");
  if (!select) return;
  var saved = "system";
  try {
    saved = localStorage.getItem("cmai_theme") || "system";
  } catch (error) {
    saved = "system";
  }
  select.value = saved;
  select.addEventListener("change", function(event) {
    var value = event.target.value;
    try {
      localStorage.setItem("cmai_theme", value);
    } catch (error) {}
    if (value === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", value);
    }
  });
}

function initGlossaryPopovers() {
  var terms = Array.prototype.slice.call(document.querySelectorAll(".glossary-strip .glossary-term[data-definition]"));
  if (!terms.length) return;

  var popover = document.createElement("div");
  var title = document.createElement("strong");
  var body = document.createElement("span");
  popover.id = "glossaryPopover";
  popover.className = "glossary-popover";
  popover.setAttribute("role", "tooltip");
  popover.append(title, body);
  document.body.appendChild(popover);

  var activeTerm = null;
  var hideTimer = null;

  function clearHideTimer() {
    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function positionPopover(term) {
    var rect = term.getBoundingClientRect();
    var margin = 12;
    var popoverWidth = popover.offsetWidth;
    var popoverHeight = popover.offsetHeight;
    var left = rect.left + rect.width / 2 - popoverWidth / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - popoverWidth - margin));
    var top = rect.top - popoverHeight - margin;
    if (top < margin) top = rect.bottom + margin;
    popover.style.left = left + "px";
    popover.style.top = top + "px";
  }

  function showPopover(term) {
    clearHideTimer();
    activeTerm = term;
    title.textContent = term.textContent.trim();
    body.textContent = term.getAttribute("data-definition") || "";
    popover.classList.add("is-visible");
    terms.forEach(function(item) {
      item.setAttribute("aria-expanded", item === term ? "true" : "false");
    });
    positionPopover(term);
  }

  function hidePopover() {
    activeTerm = null;
    popover.classList.remove("is-visible");
    terms.forEach(function(item) {
      item.setAttribute("aria-expanded", "false");
    });
  }

  function queueHide() {
    clearHideTimer();
    hideTimer = window.setTimeout(hidePopover, 90);
  }

  terms.forEach(function(term) {
    var definition = term.getAttribute("data-definition") || "";
    term.setAttribute("aria-label", term.textContent.trim() + ": " + definition);
    term.setAttribute("aria-describedby", popover.id);
    term.setAttribute("aria-expanded", "false");
    term.addEventListener("mouseenter", function() {
      showPopover(term);
    });
    term.addEventListener("mouseleave", queueHide);
    term.addEventListener("focus", function() {
      showPopover(term);
    });
    term.addEventListener("blur", queueHide);
    term.addEventListener("click", function(event) {
      event.preventDefault();
      showPopover(term);
    });
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && activeTerm) hidePopover();
  });
  document.addEventListener("click", function(event) {
    if (!activeTerm) return;
    if (!event.target.closest || !event.target.closest(".glossary-strip")) hidePopover();
  });
  window.addEventListener("resize", function() {
    if (activeTerm) positionPopover(activeTerm);
  });
  window.addEventListener("scroll", function() {
    if (activeTerm) positionPopover(activeTerm);
  }, { passive: true });
}

function initNav() {
  var nav = document.getElementById("primaryMenu");
  var button = document.getElementById("navToggle");
  if (!nav || !button) return;
  function closeNav() {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    button.setAttribute("aria-expanded", "false");
  }
  function openNav() {
    nav.classList.add("open");
    document.body.classList.add("menu-open");
    button.setAttribute("aria-expanded", "true");
  }
  button.addEventListener("click", function() {
    nav.classList.contains("open") ? closeNav() : openNav();
  });
  document.addEventListener("click", function(event) {
    if (!nav.classList.contains("open")) return;
    var inside = nav.contains(event.target) || button.contains(event.target);
    if (!inside || (event.target.closest && event.target.closest("a"))) closeNav();
  });
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") closeNav();
  });
}

function initPageData() {
  loadData("schedule", "data/schedule.json", "schedule-data").then(function(schedule) {
    renderSchedule(schedule, "homeSchedule");
    renderSchedule(schedule, "progSchedule");
  });
  loadData("events", "data/events.json", "events-data").then(function(events) {
    renderEvents(events, "homeEvents", 3);
    renderEvents(events, "eventsList");
  });
  loadData("reviews", "data/reviews.json", "reviews-data").then(function(reviews) {
    renderReviews(reviews, "homeReviews", 3);
    renderReviews(reviews, "reviewsList");
  });
  loadData("bios", "data/bios.json", "bios-data").then(renderBios);
}

document.addEventListener("DOMContentLoaded", function() {
  applyFeatureClasses();
  renderShell();
  decorateIcons(document);
  applyTitleCaseHeadings();
  initNav();
  initThemeSelect();
  initGlossaryPopovers();
  renderHeroGallery();
  initPageData();
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
