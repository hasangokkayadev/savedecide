// popup.js - Popup mantığı

document.addEventListener("DOMContentLoaded", function () {
  initializePopup();
  updateUI();
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

  // Kategori görünümü çevirileri
  document.getElementById("backText").textContent = t("category.back");
  document.getElementById("emptyStateText").textContent = t(
    "category.emptyState"
  );

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

  // Geri butonu
  document
    .getElementById("backBtn")
    .addEventListener("click", showCategoriesList);
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
  // Kategori listesini göster
  showCategoriesList();
}

function showCategoriesList() {
  // Ana içeriği gizle
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("categoryView").style.display = "none";
  document.getElementById("categoriesList").style.display = "block";

  // Kaydedilen yazıları al
  chrome.storage.local.get("savedPosts", function (result) {
    const savedPosts = result.savedPosts || [];

    // Kategorileri grupla
    const categories = {};
    savedPosts.forEach((post) => {
      if (!categories[post.category]) {
        categories[post.category] = [];
      }
      categories[post.category].push(post);
    });

    // Kategorileri göster
    const container = document.getElementById("categoriesContainer");
    container.innerHTML = "";

    if (Object.keys(categories).length === 0) {
      container.innerHTML =
        '<div style="padding: 24px 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">No saved posts</div>';
      return;
    }

    Object.keys(categories).forEach((category) => {
      const count = categories[category].length;
      const categoryBtn = document.createElement("button");
      categoryBtn.style.cssText = `
         width: 100%;
         padding: 12px;
         background: none;
         border: none;
         border-bottom: 1px solid var(--border-color);
         text-align: left;
         cursor: pointer;
         color: var(--text-primary);
         font-size: 13px;
         transition: background-color 0.2s ease;
       `;
      categoryBtn.innerHTML = `
         <div style="display: flex; justify-content: space-between; align-items: center;">
           <span style="font-weight: 500;">${category}</span>
           <span style="color: var(--text-secondary); font-size: 12px;">${count}</span>
         </div>
       `;
      categoryBtn.addEventListener("mouseover", function () {
        this.style.backgroundColor = "var(--bg-secondary)";
      });
      categoryBtn.addEventListener("mouseout", function () {
        this.style.backgroundColor = "transparent";
      });
      categoryBtn.addEventListener("click", function () {
        showCategoryLinks(category, categories[category]);
      });
      container.appendChild(categoryBtn);
    });
  });
}

function showCategoryLinks(category, links) {
  // Kategori görünümünü göster
  document.getElementById("categoriesList").style.display = "none";
  document.getElementById("categoryView").style.display = "block";

  // Başlık güncelle
  document.getElementById("categoryTitle").textContent = category;

  // Linkler konteynerini temizle
  const container = document.getElementById("linksContainer");
  container.innerHTML = "";

  if (links.length === 0) {
    document.getElementById("emptyState").style.display = "block";
    return;
  }

  document.getElementById("emptyState").style.display = "none";

  // Linkler göster
  links.forEach((link) => {
    const linkItem = document.createElement("div");
    linkItem.style.cssText = `
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 12px;
       border-bottom: 1px solid var(--border-color);
       gap: 8px;
     `;

    const linkContent = document.createElement("div");
    linkContent.style.cssText = `
       flex: 1;
       min-width: 0;
       cursor: pointer;
     `;
    linkContent.innerHTML = `
       <div style="font-size: 12px; color: var(--text-primary); word-break: break-word; margin-bottom: 4px;">${
         link.title
       }</div>
       <div style="font-size: 11px; color: var(--text-secondary); word-break: break-all;">${
         link.url
       }</div>
       ${
         link.note
           ? `<div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; font-style: italic;">${link.note}</div>`
           : ""
       }
     `;
    linkContent.addEventListener("click", function () {
      chrome.tabs.create({ url: link.url });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.style.cssText = `
       background: none;
       border: none;
       font-size: 20px;
       color: var(--text-secondary);
       cursor: pointer;
       padding: 0;
       width: 24px;
       height: 24px;
       display: flex;
       align-items: center;
       justify-content: center;
       transition: color 0.2s ease;
       flex-shrink: 0;
     `;
    deleteBtn.addEventListener("mouseover", function () {
      this.style.color = "#d32f2f";
      this.title = t("category.deleteHint");
    });
    deleteBtn.addEventListener("mouseout", function () {
      this.style.color = "var(--text-secondary)";
    });
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      deleteLink(link.id, category);
    });

    linkItem.appendChild(linkContent);
    linkItem.appendChild(deleteBtn);
    container.appendChild(linkItem);
  });
}

function deleteLink(linkId, category) {
  // Linki sil
  chrome.storage.local.get("savedPosts", function (result) {
    const savedPosts = result.savedPosts || [];
    const updatedPosts = savedPosts.filter((post) => post.id !== linkId);

    chrome.storage.local.set({ savedPosts: updatedPosts }, function () {
      // Kategori linklerini yenile
      const categoryLinks = updatedPosts.filter(
        (post) => post.category === category
      );
      showCategoryLinks(category, categoryLinks);
    });
  });
}
