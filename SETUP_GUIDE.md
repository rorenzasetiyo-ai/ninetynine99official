# 🎯 NINETYNINE Fashion - Setup Guide untuk Hosting

## 📦 Isi Folder

```
ninetynine-dev2/
├── index.html              ← Halaman website utama
├── README.md               ← Dokumentasi singkat
├── css/
│   └── style.css           ← Stylesheet website
├── js/
│   ├── main.js             ← Core JavaScript
│   ├── cart.js             ← Shopping cart
│   ├── wishlist.js         ← Wishlist system
│   ├── admin-bridge.js     ← Admin integration
│   ├── admin-access.js     ← Admin access
│   ├── config.js           ← Configuration
│   ├── pages.js            ← Page management
│   └── utils.js            ← Utilities
├── images/                 ← 99 product images (~21MB)
└── docs/
    ├── editor.html         ← Admin dashboard
    └── panduan.html        ← Panduan lengkap (Bahasa Indonesia)
```

## 🚀 Cara Upload ke Hosting

### Step 1: Extract Folder
Extract project ke komputer Anda

### Step 2: Upload ke Hosting
Upload semua file & folder ke hosting (FTP/File Manager):
- Upload ke root domain atau subdirectory

### Step 3: Open di Browser
Buka `https://yourdomain.com` untuk test website

### Step 4: Access Admin Dashboard
Gunakan shortcut untuk buka admin:
- **Ctrl+Shift+A** - Buka Admin Dashboard
- **Triple-click** - Akses menu alternatif

## 📱 Responsive Testing
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: Test di smartphone
- Tablet: Test landscape & portrait

## ⚠️ Important Notes

✅ **Sudah include:**
- Admin dashboard dengan modern theme
- Editor untuk 7 section
- Panduan lengkap Bahasa Indonesia
- localStorage untuk data persistence

❌ **Jangan upload:**
- `.vscode/` folder
- `python/` folder (opsional, hanya untuk development)
- Backup files

## 📚 Dokumentasi

- **Panduan Admin:** `docs/editor.html` (buka di browser)
- **Panduan Lengkap:** `docs/panduan.html` (Bahasa Indonesia)
- **README:** Baca di project root

## 💾 Data Backup

Data disimpan di localStorage. Untuk backup:
```javascript
// Di browser console (F12):
JSON.stringify(localStorage.getItem('ninetynine_admin_data'))
```

---

**NINETYNINE Fashion © 2026 | Bahasa Indonesia**
