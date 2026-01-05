// i18n.js - Çeviri sistemi

const translations = {
  en: {
    // Popup
    "popup.title": "Why am I saving this?",
    "popup.lead": "Lead",
    "popup.content": "Content Idea",
    "popup.competitor": "Competitor",
    "popup.collaboration": "Collaboration",
    "popup.inspiration": "Inspiration",
    "popup.research": "Research",
    "popup.project": "Project",
    "popup.education": "Education",
    "popup.note": "Add a note (optional)",
    "popup.save": "Save",
    "popup.success": "Saved successfully!",
    "popup.next": "View saved posts",
    "popup.charCount": "characters",
    "popup.addCategory": "Add new category",
    "popup.categoryNamePrompt": "Enter category name:",

    // Settings
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "System",
  },
  tr: {
    // Popup
    "popup.title": "Bunu neden kaydediyorum?",
    "popup.lead": "Potansiyel Müşteri",
    "popup.content": "İçerik Fikri",
    "popup.competitor": "Rakip",
    "popup.collaboration": "İş Birliği",
    "popup.inspiration": "İlham",
    "popup.research": "Araştırma",
    "popup.project": "Proje",
    "popup.education": "Eğitim",
    "popup.note": "Not ekle (isteğe bağlı)",
    "popup.save": "Kaydet",
    "popup.success": "Başarıyla kaydedildi!",
    "popup.next": "Kaydedilen yazıları gör",
    "popup.charCount": "karakter",
    "popup.addCategory": "Yeni kategori ekle",
    "popup.categoryNamePrompt": "Kategori adını girin:",

    // Settings
    "settings.language": "Dil",
    "settings.theme": "Tema",
    "settings.light": "Açık",
    "settings.dark": "Koyu",
    "settings.system": "Sistem",
  },
};

// Tarayıcı dilini algıla
function detectBrowserLanguage() {
  const lang = navigator.language.split("-")[0];
  return translations[lang] ? lang : "en";
}

// Dil seçimini localStorage'dan al
function getLanguage() {
  const saved = localStorage.getItem("savedecide_language");
  if (saved) return saved;

  const detected = detectBrowserLanguage();
  localStorage.setItem("savedecide_language", detected);
  return detected;
}

// Dil seçimini kaydet
function setLanguage(lang) {
  if (translations[lang]) {
    localStorage.setItem("savedecide_language", lang);
    return true;
  }
  return false;
}

// Çeviri al
function t(key) {
  const lang = getLanguage();
  const keys = key.split(".");
  let value = translations[lang];

  for (let k of keys) {
    value = value[k];
    if (!value) {
      // Fallback to English
      value = translations["en"];
      for (let k of keys) {
        value = value[k];
      }
      break;
    }
  }

  return value || key;
}

// Tüm çevirileri al
function getAllTranslations(lang) {
  return translations[lang] || translations["en"];
}
