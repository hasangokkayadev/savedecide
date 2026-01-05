// content.js - LinkedIn entegrasyonu

// Kategorileri localStorage'dan al
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
function renderCategoriesInModal(categories, modal) {
  const container = modal.querySelector(".savedecide-options");
  container.innerHTML = "";

  categories.forEach((category, index) => {
    const div = document.createElement("div");
    div.className = "savedecide-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "category";
    input.value = category.id;
    input.id = `modal-${category.id}`;
    if (index === 0) input.checked = true;

    const label = document.createElement("label");
    label.htmlFor = `modal-${category.id}`;
    label.textContent = category.name;

    div.appendChild(input);
    div.appendChild(label);
    container.appendChild(div);
  });
}

// Yeni kategori ekle
function addNewCategoryToModal(modal) {
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
  renderCategoriesInModal(categories, modal);
}

// LinkedIn postlarını algıla ve buton ekle
function initializeExtension() {
  // Mevcut postlara buton ekle
  addButtonsToExistingPosts();

  // Yeni postlar yüklendiğinde buton ekle (infinite scroll)
  observeNewPosts();
}

function addButtonsToExistingPosts() {
  // LinkedIn post container'larını bul
  const posts = document.querySelectorAll('[data-id*="urn:li:activity"]');

  posts.forEach((post) => {
    // Zaten buton varsa atla
    if (post.querySelector(".savedecide-button")) {
      return;
    }

    // Post action bar'ını bul
    const actionBar =
      post.querySelector('[role="toolbar"]') ||
      post.querySelector(".social-details-social-counts") ||
      post.querySelector('[class*="action"]');

    if (actionBar) {
      addButtonToPost(post, actionBar);
    }
  });
}

function addButtonToPost(post, actionBar) {
  // Buton container'ı oluştur
  const buttonContainer = document.createElement("li");
  buttonContainer.style.display = "inline-flex";
  buttonContainer.style.alignItems = "center";

  // Buton oluştur
  const button = document.createElement("button");
  button.className = "savedecide-button";
  button.innerHTML = "💾 Decide";
  button.setAttribute("data-post-id", post.getAttribute("data-id"));

  // Buton tıklanma olayı
  button.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    openSaveModal(post);
  });

  buttonContainer.appendChild(button);

  // Yorum sayacı div'inin yanına ekle
  try {
    // Yorum sayacı container'ını bul
    const socialCountsContainer =
      post.querySelector('[class*="social-details-social-counts"]') ||
      post.querySelector('[class*="display-flex"]');

    if (socialCountsContainer) {
      // Eğer ul ise, li olarak ekle
      if (socialCountsContainer.tagName === "UL") {
        socialCountsContainer.appendChild(buttonContainer);
      } else {
        // Değilse, container'ın içinde ul ara
        const ulElement = socialCountsContainer.querySelector("ul");
        if (ulElement) {
          ulElement.appendChild(buttonContainer);
        } else {
          // Fallback: action bar'a ekle
          actionBar.appendChild(buttonContainer);
        }
      }
    } else {
      // Fallback: action bar'a ekle
      actionBar.appendChild(buttonContainer);
    }
  } catch (e) {
    // Fallback: post'un sonuna ekle
    post.appendChild(buttonContainer);
  }
}

function openSaveModal(post) {
  // Mevcut modal'ı kapat
  const existingModal = document.querySelector(".savedecide-modal-overlay");
  if (existingModal) {
    existingModal.remove();
  }

  // Modal overlay oluştur
  const overlay = document.createElement("div");
  overlay.className = "savedecide-modal-overlay";

  // Modal oluştur
  const modal = document.createElement("div");
  modal.className = "savedecide-modal";

  // Modal içeriği
  const lang = getLanguage();
  const translations = getAllTranslations(lang);
  const categories = getCategories();

  modal.innerHTML = `
     <div class="savedecide-modal-header">
       <h2 class="savedecide-modal-title">${translations["popup.title"]}</h2>
     </div>
     
     <div class="savedecide-modal-body">
       <div class="savedecide-options"></div>
       
       <button id="modal-add-category" class="savedecide-add-category-btn" title="Add new category">
         +
       </button>
       
       <div class="savedecide-note-group">
         <label class="savedecide-note-label">${translations["popup.note"]}</label>
         <textarea class="savedecide-note-input" id="modal-note" maxlength="140" rows="3" placeholder=""></textarea>
         <div class="savedecide-char-count">
           <span id="modal-char-count">0</span> / 140 ${translations["popup.charCount"]}
         </div>
       </div>
     </div>
     
     <div class="savedecide-modal-footer">
       <button class="savedecide-btn savedecide-btn-primary" id="modal-save">${translations["popup.save"]}</button>
       <button class="savedecide-btn savedecide-btn-secondary" id="modal-cancel">✕</button>
     </div>
   `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Kategorileri render et
  renderCategoriesInModal(categories, modal);

  // Event listener'ları ekle
  const noteInput = modal.querySelector("#modal-note");
  noteInput.addEventListener("input", function () {
    document.getElementById("modal-char-count").textContent = this.value.length;
  });

  // Kategori ekle butonu
  modal
    .querySelector("#modal-add-category")
    .addEventListener("click", function () {
      addNewCategoryToModal(modal);
    });

  modal.querySelector("#modal-save").addEventListener("click", function () {
    const category = modal.querySelector(
      'input[name="category"]:checked'
    ).value;
    const note = noteInput.value;

    savePostToStorage(post, category, note);
    showSuccessMessage(overlay);
  });

  modal.querySelector("#modal-cancel").addEventListener("click", function () {
    overlay.remove();
  });

  // Overlay tıklanırsa kapat
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}

function savePostToStorage(post, category, note) {
  // Post bilgisini al
  const postId = post.getAttribute("data-id");
  const postText =
    post.querySelector('[data-test-id="post-content"]')?.textContent ||
    post.textContent.substring(0, 200);
  const postUrl = window.location.href;

  // Chrome storage'a kaydet
  chrome.storage.local.get("savedPosts", function (result) {
    const savedPosts = result.savedPosts || [];

    const newPost = {
      id: postId || Date.now(),
      url: postUrl,
      text: postText,
      category: category,
      note: note,
      savedAt: new Date().toISOString(),
    };

    savedPosts.push(newPost);
    chrome.storage.local.set({ savedPosts: savedPosts });
  });
}

function showSuccessMessage(overlay) {
  const modal = overlay.querySelector(".savedecide-modal");
  const lang = getLanguage();
  const translations = getAllTranslations(lang);

  // Modal içeriğini değiştir
  modal.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="font-size: 48px; margin-bottom: 12px;">✓</div>
      <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
        ${translations["popup.success"]}
      </div>
      <div style="font-size: 13px; color: var(--text-secondary);">
        ${translations["popup.next"]}
      </div>
    </div>
  `;

  // 2 saniye sonra kapat
  setTimeout(function () {
    overlay.remove();
  }, 2000);
}

function observeNewPosts() {
  // Mutation observer ile yeni postları algıla
  const observer = new MutationObserver(function (mutations) {
    addButtonsToExistingPosts();
  });

  const config = {
    childList: true,
    subtree: true,
    attributes: false,
  };

  // Feed container'ı bul ve observe et
  const feedContainer =
    document.querySelector('[role="main"]') ||
    document.querySelector(".scaffold-finite-scroll__content") ||
    document.body;

  if (feedContainer) {
    observer.observe(feedContainer, config);
  }
}

// Sayfa yüklendiğinde başlat
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension);
} else {
  initializeExtension();
}

// Dinamik içerik yüklemesini dinle
window.addEventListener("load", function () {
  setTimeout(addButtonsToExistingPosts, 1000);
});
