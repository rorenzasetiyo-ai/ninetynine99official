# Website Image Setup Guide

## ✅ What's Been Done

Your website now has all 96 local images properly mapped and organized:

### Image Allocation:
- **Products 0-11 (Main + Hover)**: Images `img-0.jpeg` through `img-23.jpeg`
  - Each product displays a main image and a hover overlay when you mouse over it
  - These map to your 12 products in the catalog
  
- **Available for use**: Images `img-24.jpeg` through `img-96.png`
  - `img-24` to `img-95`: Additional product images (for detail views)
  - `img-96.png`: Premium format image available

- **Banners & Sections**: Currently using `img-9.jpeg` for collection banner

## 📁 Image Organization

```
images/
├── img-0 to img-23   → Product catalog images
├── img-24 to img-95  → Additional/detail images  
└── img-96.png        → Extra premium image
```

## 🛠️ How Images Are Used

1. **Wishlist Modal** (`pages/modals/wishlist-modal.html`)
   - Contains the image store that feeds all product displays
   - Maps product IDs to image files
   - Both main and hover states are configured

2. **Product Detail Modal** (`pages/modals/product-detail-modal.html`)
   - Dynamically loads images from the wishlist modal
   - Shows main image with thumbnail switcher

3. **Cart Modal** (`pages/modals/cart-modal.html`)
   - Displays product images when items are added

4. **Collection Page** (`pages/bestsellers-fragment.html`)
   - Uses `img-9.jpeg` for the collection banner

## 🚀 Local Server Testing

Your website is running on:
```
http://127.0.0.1:5501/
```

Just navigate to this URL to test the image loading.

## 📝 If You Want to Change Images

Edit the image mappings in:
```
pages/modals/wishlist-modal.html
```

The `productImageStore` div contains:
- `catalog-main-X` → Main product image
- `catalog-hover-X` → Hover state image (when you mouseover)

Change the `src="images/img-XX.jpeg"` values to use different images.

## 💡 Tips for Best Performance

1. **Lazy Loading**: All images use `loading="lazy"` for better performance
2. **Compression**: Keep images under 200KB each for fast Cloudflare Pages deployment
3. **Format**: JPEGs are already optimized; PNG version available for special cases
4. **Responsive**: Images scale based on screen size automatically

## 🎯 Next Steps

1. **Test the website** at `http://127.0.0.1:5501/`
2. **Check product images** - hover over products to see the image transitions
3. **If you have a reference design**, let me know and I can help:
   - Add sections or layouts that match your reference
   - Optimize specific areas
   - Add more interactive features
4. **For Cloudflare Pages**, the site is ready - just push your code!

---

**Questions?** Let me know what additional styling or layout changes you'd like to make matching your reference website!
