# Save & Decide - LinkedIn Chrome Extension

## 📋 İçindekiler | Table of Contents

- [Türkçe](#türkçe)
- [English](#english)

---

## Türkçe

### 🎯 Proje Başlığı ve Açıklaması

**Save & Decide**, LinkedIn'de gördüğünüz yazıları kaydetmenizi ve neden kaydettiğinizi belirtmenizi sağlayan bir Chrome uzantısıdır. Her kaydedilen yazı için bir kategori seçebilir ve isteğe bağlı olarak notlar ekleyebilirsiniz.

### ✨ Özellikler

- 💾 **LinkedIn Yazılarını Kaydetme**: LinkedIn feed'inde her yazının yanında "Save & Decide" butonu
- 🏷️ **Kategori Seçimi**: Yazıları 3 kategoriye ayırın:
  - **Potansiyel Müşteri (Lead)**: İş fırsatları ve müşteri adayları
  - **İçerik Fikri (Content Idea)**: İçerik oluşturma için ilham kaynakları
  - **Rakip (Competitor)**: Rakip analizi ve pazar araştırması
- 📝 **Not Ekleme**: Her yazı için 140 karaktere kadar not ekleyebilirsiniz
- 🌐 **Çok Dilli Destek**: Türkçe ve İngilizce arayüz
- 🎨 **Tema Desteği**: Açık ve koyu tema otomatik algılama
- 📊 **Kaydedilen Yazıları Görüntüleme**: Tüm kaydedilen yazılarınızı kolayca erişin
- ⚡ **Hızlı ve Hafif**: Minimal kaynak kullanımı

### 📥 Kurulum Adımları

#### 1. Dosyaları İndirin

```bash
git clone https://github.com/yourusername/save-decide-extension.git
cd save-decide-extension
```

#### 2. Chrome'da Geliştirici Modunu Açın

- Chrome tarayıcısını açın
- Adres çubuğuna `chrome://extensions/` yazın
- Sağ üst köşedeki **"Geliştirici modu"** toggle'ını açın

#### 3. Uzantıyı Yükleyin

- **"Paketlenmemiş öğe yükle"** butonuna tıklayın
- Proje klasörünü seçin
- Uzantı Chrome'a yüklenecektir

#### 4. LinkedIn'de Kullanmaya Başlayın

- LinkedIn.com'a gidin
- Herhangi bir yazının yanında "💾 Save & Decide" butonunu göreceksiniz

### 🚀 Nasıl Kullanılır

#### Adım 1: Yazıyı Bulun

LinkedIn feed'inde kaydetmek istediğiniz bir yazı bulun.

#### Adım 2: Save & Decide Butonuna Tıklayın

Her yazının yanında bulunan "💾 Save & Decide" butonuna tıklayın.

#### Adım 3: Kategori Seçin

Açılan pencerede aşağıdaki kategorilerden birini seçin:

- **Potansiyel Müşteri**: İş fırsatları için
- **İçerik Fikri**: Yazı/video fikri için
- **Rakip**: Rakip analizi için

#### Adım 4: Not Ekleyin (İsteğe Bağlı)

Yazı hakkında kısa bir not ekleyebilirsiniz (maksimum 140 karakter).

#### Adım 5: Kaydet

"Kaydet" butonuna tıklayın. Başarı mesajı göreceksiniz.

#### Adım 6: Kaydedilen Yazıları Görüntüleyin

Uzantı popup'ında "Kaydedilen yazıları gör" butonuna tıklayarak tüm kaydedilen yazılarınızı görebilirsiniz.

### 📁 Dosya Yapısı Açıklaması

```
save-decide-extension/
├── manifest.json          # Chrome uzantısı konfigürasyonu
├── popup.html            # Popup arayüzü (HTML)
├── popup.js              # Popup mantığı (JavaScript)
├── content.js            # LinkedIn entegrasyonu (Content Script)
├── i18n.js               # Çeviri sistemi (Türkçe/İngilizce)
├── styles.css            # Stil dosyası (CSS)
├── create-icons.js       # İkon oluşturma scripti
├── icons/                # Uzantı ikonları
│   ├── icon-16.png      # 16x16 piksel ikon
│   ├── icon-48.png      # 48x48 piksel ikon
│   └── icon-128.png     # 128x128 piksel ikon
└── README.md            # Bu dosya
```

#### Dosya Açıklamaları

| Dosya               | Açıklama                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| **manifest.json**   | Chrome uzantısının konfigürasyonu, izinler ve meta bilgiler              |
| **popup.html**      | Uzantı popup'ının HTML yapısı                                            |
| **popup.js**        | Popup'ın JavaScript mantığı, olay yönetimi                               |
| **content.js**      | LinkedIn sayfasına enjekte edilen script, buton ekleme ve modal yönetimi |
| **i18n.js**         | Çeviri sistemi, dil yönetimi                                             |
| **styles.css**      | Tüm bileşenlerin CSS stilleri                                            |
| **create-icons.js** | İkon oluşturma ve dönüştürme scripti                                     |

### 🛠️ Teknoloji Stack'i

- **Manifest V3**: Chrome uzantısı standardı
- **Vanilla JavaScript**: Hiçbir framework bağımlılığı yok
- **Chrome Storage API**: Verileri güvenli şekilde saklama
- **Chrome Tabs API**: Sekme bilgisine erişim
- **Mutation Observer**: Dinamik içerik algılama
- **CSS3**: Modern stil ve animasyonlar

### 🌍 Dil ve Tema Desteği

#### Desteklenen Diller

- 🇹🇷 **Türkçe (TR)**
- 🇬🇧 **İngilizce (EN)**

#### Dil Değiştirme

- Popup'ın sağ üst köşesindeki dil butonuna tıklayın
- Seçim otomatik olarak kaydedilir

#### Tema Desteği

- Uzantı, sistem temasını otomatik olarak algılar
- Açık tema: Beyaz arka plan, koyu metin
- Koyu tema: Koyu arka plan, açık metin

### 🔧 Sorun Giderme

#### Sorun: Buton LinkedIn'de görünmüyor

**Çözüm:**

1. Sayfayı yenileyin (F5)
2. Chrome'u yeniden başlatın
3. Uzantıyı devre dışı bırakıp yeniden etkinleştirin

#### Sorun: Yazılar kaydedilmiyor

**Çözüm:**

1. Chrome'un depolama izni olduğunu kontrol edin
2. Tarayıcı konsolunda hata olup olmadığını kontrol edin (F12)
3. Uzantıyı yeniden yükleyin

#### Sorun: Çeviriler görünmüyor

**Çözüm:**

1. Dil ayarını kontrol edin
2. localStorage'ı temizleyin
3. Sayfayı yenileyin

#### Sorun: Modal açılmıyor

**Çözüm:**

1. JavaScript konsolunda hata olup olmadığını kontrol edin
2. LinkedIn'in DOM yapısı değişmiş olabilir - content.js'i güncelleyin
3. Uzantıyı yeniden yükleyin

### 📝 Geliştirme Notları

#### Yerel Geliştirme

```bash
# Dosyaları düzenleyin
# Chrome'da chrome://extensions/ açın
# Yenile butonuna tıklayın
```

#### Hata Ayıklama

1. **Popup Hata Ayıklaması**: Popup'a sağ tıklayın → "İnceleme"
2. **Content Script Hata Ayıklaması**: LinkedIn sayfasında F12 → Console
3. **Storage Kontrolü**: Chrome DevTools → Application → Local Storage

#### Yeni Özellik Ekleme

1. `i18n.js`'e çevirileri ekleyin
2. `popup.html` veya `content.js`'e UI ekleyin
3. `styles.css`'e stil ekleyin
4. `popup.js` veya `content.js`'e mantık ekleyin

#### Kategori Ekleme

1. `i18n.js`'de yeni kategoriyi tanımlayın
2. `popup.html`'de radio button ekleyin
3. `content.js`'de modal'a seçeneği ekleyin
4. `styles.css`'de stil ekleyin

#### Dil Ekleme

1. `i18n.js`'de yeni dil nesnesini ekleyin
2. Tüm çevirileri ekleyin
3. `popup.js`'de dil toggle'ını güncelleyin

### 📄 Lisans

Bu proje MIT Lisansı altında yayınlanmıştır.

### 🤝 Katkıda Bulunma

Katkılarınız hoş geldiniz! Lütfen:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişiklikleri commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'e push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

### 📧 İletişim

Sorularınız veya önerileriniz için lütfen bir issue açın.

---

## English

### 🎯 Project Title and Description

**Save & Decide** is a Chrome extension that allows you to save posts you see on LinkedIn and specify why you're saving them. For each saved post, you can select a category and optionally add notes.

### ✨ Features

- 💾 **Save LinkedIn Posts**: "Save & Decide" button next to each post in LinkedIn feed
- 🏷️ **Category Selection**: Organize posts into 3 categories:
  - **Lead**: Business opportunities and potential customers
  - **Content Idea**: Inspiration sources for content creation
  - **Competitor**: Competitor analysis and market research
- 📝 **Add Notes**: Add up to 140 characters of notes for each post
- 🌐 **Multi-Language Support**: Turkish and English interface
- 🎨 **Theme Support**: Automatic light and dark theme detection
- 📊 **View Saved Posts**: Easily access all your saved posts
- ⚡ **Fast and Lightweight**: Minimal resource usage

### 📥 Installation Steps

#### 1. Download Files

```bash
git clone https://github.com/yourusername/save-decide-extension.git
cd save-decide-extension
```

#### 2. Enable Developer Mode in Chrome

- Open Chrome browser
- Type `chrome://extensions/` in the address bar
- Toggle **"Developer mode"** in the top right corner

#### 3. Load the Extension

- Click **"Load unpacked"** button
- Select the project folder
- The extension will be loaded into Chrome

#### 4. Start Using on LinkedIn

- Go to LinkedIn.com
- You'll see the "💾 Save & Decide" button next to any post

### 🚀 How to Use

#### Step 1: Find a Post

Find a post on LinkedIn feed that you want to save.

#### Step 2: Click Save & Decide Button

Click the "💾 Save & Decide" button next to the post.

#### Step 3: Select a Category

In the popup window, select one of the following categories:

- **Lead**: For business opportunities
- **Content Idea**: For article/video ideas
- **Competitor**: For competitor analysis

#### Step 4: Add a Note (Optional)

You can add a short note about the post (maximum 140 characters).

#### Step 5: Save

Click the "Save" button. You'll see a success message.

#### Step 6: View Saved Posts

Click the "View saved posts" button in the extension popup to see all your saved posts.

### 📁 File Structure Explanation

```
save-decide-extension/
├── manifest.json          # Chrome extension configuration
├── popup.html            # Popup interface (HTML)
├── popup.js              # Popup logic (JavaScript)
├── content.js            # LinkedIn integration (Content Script)
├── i18n.js               # Translation system (Turkish/English)
├── styles.css            # Style file (CSS)
├── create-icons.js       # Icon creation script
├── icons/                # Extension icons
│   ├── icon-16.png      # 16x16 pixel icon
│   ├── icon-48.png      # 48x48 pixel icon
│   └── icon-128.png     # 128x128 pixel icon
└── README.md            # This file
```

#### File Descriptions

| File                | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| **manifest.json**   | Chrome extension configuration, permissions and metadata                 |
| **popup.html**      | HTML structure of the extension popup                                    |
| **popup.js**        | JavaScript logic of the popup, event management                          |
| **content.js**      | Script injected into LinkedIn page, button addition and modal management |
| **i18n.js**         | Translation system, language management                                  |
| **styles.css**      | CSS styles for all components                                            |
| **create-icons.js** | Icon creation and conversion script                                      |

### 🛠️ Technology Stack

- **Manifest V3**: Chrome extension standard
- **Vanilla JavaScript**: No framework dependencies
- **Chrome Storage API**: Secure data storage
- **Chrome Tabs API**: Access to tab information
- **Mutation Observer**: Dynamic content detection
- **CSS3**: Modern styling and animations

### 🌍 Language and Theme Support

#### Supported Languages

- 🇹🇷 **Turkish (TR)**
- 🇬🇧 **English (EN)**

#### Change Language

- Click the language button in the top right corner of the popup
- Selection is automatically saved

#### Theme Support

- The extension automatically detects system theme
- Light theme: White background, dark text
- Dark theme: Dark background, light text

### 🔧 Troubleshooting

#### Issue: Button doesn't appear on LinkedIn

**Solution:**

1. Refresh the page (F5)
2. Restart Chrome
3. Disable and re-enable the extension

#### Issue: Posts are not being saved

**Solution:**

1. Check that Chrome has storage permission
2. Check browser console for errors (F12)
3. Reload the extension

#### Issue: Translations not showing

**Solution:**

1. Check language settings
2. Clear localStorage
3. Refresh the page

#### Issue: Modal doesn't open

**Solution:**

1. Check JavaScript console for errors
2. LinkedIn's DOM structure may have changed - update content.js
3. Reload the extension

### 📝 Development Notes

#### Local Development

```bash
# Edit files
# Open chrome://extensions/ in Chrome
# Click the refresh button
```

#### Debugging

1. **Popup Debugging**: Right-click popup → "Inspect"
2. **Content Script Debugging**: F12 on LinkedIn page → Console
3. **Storage Check**: Chrome DevTools → Application → Local Storage

#### Adding New Features

1. Add translations to `i18n.js`
2. Add UI to `popup.html` or `content.js`
3. Add styles to `styles.css`
4. Add logic to `popup.js` or `content.js`

#### Adding Categories

1. Define new category in `i18n.js`
2. Add radio button in `popup.html`
3. Add option to modal in `content.js`
4. Add styles in `styles.css`

#### Adding Languages

1. Add new language object in `i18n.js`
2. Add all translations
3. Update language toggle in `popup.js`

### 📄 License

This project is released under the MIT License.

### 🤝 Contributing

Your contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📧 Contact

Please open an issue for any questions or suggestions.

---

## 📊 Version History

### v1.0.0 (Current)

- Initial release
- Basic save functionality
- 3 categories (Lead, Content Idea, Competitor)
- Turkish and English support
- Light and dark theme support
- Note-taking feature (140 characters)

---

**Last Updated**: December 26, 2025
**Maintainer**: Save & Decide Team
