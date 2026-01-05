// popup.js - Popup mantığı

document.addEventListener("DOMContentLoaded", function () {
  initializePopup();
  updateUI();
  loadCategories();
  setupEventListeners();
});

function initializePopup() {
  // Çevirileri uygula
  updateTranslations();

  // Kaydedilen yazıların sayısını kontrol et
  updateSavedCount();
}

function updateTranslations() {
  // Başlık ve etiketler
  document.getElementById("noteLabel").textContent = t("popup.note");
  document.getElementById("saveText").textContent = t("popup.save");
  document.getElementById("successText").textContent = t("popup.success");
  document.getElementById("nextText").textContent = t("popup.next");
  document.getElementById("charLabel").textContent = t("popup.charCount");
  document.getElementById("savedLabel").textContent = t("popup.next");
  document.getElementById("viewSavedText").textContent = t("popup.next");
  document.getElementById("addCategoryBtn").title = t("popup.addCategory");

  // Dil butonu
  const currentLang = getLanguage();
  document.getElementById("langToggle").textContent =
    currentLang === "en" ? "TR" : "EN";
}

function updateUI() {
  const lang = getLanguage();
  document.documentElement.lang = lang;
}

function setupEventListeners() {
  // Dil değiştir
  document
    .getElementById("langToggle")
    .addEventListener("click", toggleLanguage);

  // Not karakteri sayma
  const noteInput = document.getElementById("noteInput");
  noteInput.addEventListener("input", updateCharCount);

  // Kaydet butonu
  document.getElementById("saveBtn").addEventListener("click", savePost);

  // İptal butonu
  document.getElementById("cancelBtn").addEventListener("click", closePopup);

  // Sonraki buton
  document.getElementById("nextBtn").addEventListener("click", viewSavedPosts);

  // Kaydedilen yazıları gör
  document
    .getElementById("viewSavedBtn")
    .addEventListener("click", viewSavedPosts);

  // Kategori ekle butonu
  document
    .getElementById("addCategoryBtn")
    .addEventListener("click", addNewCategory);
}

function toggleLanguage() {
  const currentLang = getLanguage();
  const newLang = currentLang === "en" ? "tr" : "en";
  setLanguage(newLang);
  updateTranslations();
  updateUI();
}

function updateCharCount() {
  const noteInput = document.getElementById("noteInput");
  const charCount = noteInput.value.length;
  document.getElementById("charCount").textContent = charCount;
}

function savePost() {
  const category = document.querySelector(
    'input[name="category"]:checked'
  ).value;
  const note = document.getElementById("noteInput").value;

  // Mevcut sekmeden post bilgisini al
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];

    // Kaydedilen yazıları al
    chrome.storage.local.get("savedPosts", function (result) {
      const savedPosts = result.savedPosts || [];

      // Yeni post ekle
      const newPost = {
        id: Date.now(),
        url: tab.url,
        title: tab.title,
        category: category,
        note: note,
        savedAt: new Date().toISOString(),
      };

      savedPosts.push(newPost);

      // localStorage'a kaydet
      chrome.storage.local.set({ savedPosts: savedPosts }, function () {
        showSuccess();
      });
    });
  });
}

function showSuccess() {
  // Ana içeriği gizle
  document.getElementById("mainContent").style.display = "none";

  // Başarı mesajını göster
  document.getElementById("successMessage").style.display = "block";

  // 3 saniye sonra popup'ı kapat
  setTimeout(closePopup, 3000);
}

function closePopup() {
  window.close();
}

function updateSavedCount() {
  chrome.storage.local.get("savedPosts", function (result) {
    const savedPosts = result.savedPosts || [];
    const count = savedPosts.length;

    if (count > 0) {
      document.getElementById("savedPostsList").style.display = "block";
      document.getElementById("savedCount").textContent = count;
    }
  });
}

function viewSavedPosts() {
  // Kaydedilen yazıları gösteren bir sayfa açabilir
  // Şimdilik popup'ı kapat
  closePopup();
}

// Kategorileri localStorage'dan yükle ve göster
function loadCategories() {
  const categories = getCategories();
  renderCategories(categories);
}

// localStorage'dan kategorileri al
function getCategories() {
  const saved = localStorage.getItem("savedecide_categories");
  if (saved) {
    return JSON.parse(saved);
  }
  // Varsayılan kategoriler
  return [
    { id: "lead", name: "Lead" },
    { id: "content", name: "Content Idea" },
    { id: "competitor", name: "Competitor" },
    { id: "collaboration", name: "Collaboration" },
    { id: "inspiration", name: "Inspiration" },
    { id: "research", name: "Research" },
    { id: "project", name: "Project" },
    { id: "education", name: "Education" },
  ];
}

// Kategorileri localStorage'a kaydet
function saveCategories(categories) {
  localStorage.setItem("savedecide_categories", JSON.stringify(categories));
}

// Kategorileri dinamik olarak render et
function renderCategories(categories) {
  const container = document.getElementById("categoriesContainer");
  container.innerHTML = "";

  categories.forEach((category, index) => {
    const div = document.createElement("div");
    div.className = "savedecide-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "category";
    input.value = category.id;
    input.id = `category-${category.id}`;
    if (index === 0) input.checked = true;

    const label = document.createElement("label");
    label.htmlFor = `category-${category.id}`;
    label.textContent = category.name;

    div.appendChild(input);
    div.appendChild(label);
    container.appendChild(div);
  });
}

// Yeni kategori ekle
function addNewCategory() {
  const categoryName = prompt(t("popup.categoryNamePrompt"));
  if (!categoryName || categoryName.trim() === "") {
    return;
  }

  const categories = getCategories();
  const newCategory = {
    id: `custom-${Date.now()}`,
    name: categoryName.trim(),
  };

  categories.push(newCategory);
  saveCategories(categories);
  renderCategories(categories);
}
