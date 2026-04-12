# 🌐 Admin Dashboard Guide - Panduan Lengkap

## 📖 Daftar Isi
1. [Akses Dashboard](#akses-dashboard)
2. [7 Section yang Bisa Diedit](#7-section)
3. [Tips & Trik](#tips)
4. [Troubleshooting](#troubleshooting)

---

## Akses Dashboard {#akses-dashboard}

### Cara 1: Keyboard Shortcut (Tercepat)
Tekan di halaman utama:
```
Ctrl + Shift + A
```

### Cara 2: Triple-Click
Triple-click pada logo atau bagian tertentu untuk buka menu admin

### Cara 3: Direct URL
Buka langsung di address bar (jika sudah setup):
```
https://yourdomain.com/docs/editor.html
```

---

## 7 Section yang Bisa Diedit {#7-section}

### 1️⃣ Hero Section
- **Field**: Background Image, Judul, Subtitle, CTA Button
- **Tips**: 
  - Gunakan URL gambar berkualitas tinggi
  - Judul max 50 karakter untuk responsive
  - Button text max 20 karakter

### 2️⃣ Marquee (Scrolling Text)
- **Field**: Teks yang berjalan, Warna, Kecepatan
- **Tips**:
  - Gunakan untuk promo atau announcement
  - Update setiap minggu untuk freshness
  - Keep text singkat & punchy

### 3️⃣ Bestseller Products
- **Field**: 4 produk pilihan dengan image, nama, harga
- **Tips**:
  - Update setiap bulan produk yang trending
  - Gunakan gambar berkualitas tinggi
  - Tambahkan discount untuk boost sales

### 4️⃣ Collection Section
- **Field**: Collection nama, deskripsi, featured products
- **Tips**:
  - Buat collection seasonal (New Year, Summer, dll)
  - Update warna & tema sesuai season
  - Link ke halaman detail collection

### 5️⃣ Our Picks (Curated Products)
- **Field**: 8 produk dengan details, image, harga
- **Tips**:
  - Showcase best-selling atau high-margin products
  - Gunakan professional photoshoot images
  - Update foto seasonally

### 6️⃣ Stores (Lokasi Toko)
- **Field**: Alamat, jam operasional, kontak, gambar lokasi
- **Tips**:
  - Tambahkan Google Maps link
  - Update jam operasional akurat
  - Gunakan foto toko actual

### 7️⃣ Footer
- **Field**: Brand info, social links, newsletter, copyright
- **Tips**:
  - Update social media links
  - Link newsletter ke email service
  - Highlight key information

---

## Tips & Trik {#tips}

### 🎨 Design Tips
- Gunakan consistent color scheme
- Keep spacing balanced
- Use high-quality images (min 1200px width)
- Test responsiveness di mobile
- Maintain brand consistency

### 📸 Image Tips
- Compress images sebelum upload
- Gunakan format JPEG untuk photo, PNG untuk graphics
- Optimal size: 800-1200px width
- File size max 500KB per image
- Gunakan descriptive alt text

### 🚀 Performance Tips
- Cache images di CDN
- Minimize CSS/JS files
- Enable gzip compression
- Lazy load images jika perlu
- Monitor page load speed

### 🔒 Security Tips
- Jangan share admin dashboard URL
- Logout setelah selesai edit
- Backup data secara berkala
- Update browser & extensions
- Gunakan HTTPS saja

### 📱 Mobile Optimization
- Test di iPhone & Android
- Ensure touch-friendly buttons
- Optimize image size untuk mobile
- Keep text readable (min 16px)
- Test landscape & portrait mode

---

## Troubleshooting {#troubleshooting}

### Q: Dashboard tidak mau kebuka
**A:** 
- Pastikan di halaman utama (index.html)
- Coba refresh browser (Ctrl+R)
- Clear browser cache (Ctrl+Shift+Delete)
- Cek console (F12) untuk error messages

### Q: Data hilang setelah close browser
**A:** 
- Data disimpan di localStorage browser
- Clear cache akan hapus data
- Backup data secara berkala
- Gunakan "Export" feature jika ada

### Q: Gambar tidak loading
**A:**
- Check image URL adalah valid
- Pastikan file masih exist di server
- Coba refresh page
- Cek console (F12) untuk 404 errors

### Q: Edit tidak tersimpan
**A:**
- Pastikan data "Simpan Permanen" dulu
- Jangan close window saat loading
- Check localStorage bukan penuh
- Try force refresh (Ctrl+Shift+R)

### Q: Website loading lambat
**A:**
- Compress images lebih aggressive
- Reduce jumlah products di homepage
- Enable CDN untuk images
- Minify CSS/JS files
- Remove unused media files

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Shift+A | Buka Admin Dashboard |
| F12 | Buka Developer Console |
| Ctrl+R | Refresh page |
| Ctrl+Shift+Delete | Clear cache |

---

## Support Files

- **index.html** - Main website
- **docs/editor.html** - Admin dashboard visual interface
- **docs/panduan.html** - Detailed guide (this document)
- **js/admin-bridge.js** - Integration between website & dashboard
- **localStorage** - Data persistence

---

**Last Updated**: April 2026
**Version**: 1.0
