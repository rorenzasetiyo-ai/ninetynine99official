function openSearchPage() {
const searchInput = document.getElementById('searchInput');
if (searchInput) {
searchInput.focus();
searchInput.value = '';
}
document.getElementById('searchResults').innerHTML = '<div style="text-align:center;padding:60px 20px;color:#bbb;font-size:13px;font-family:\'DM Sans\',sans-serif;">Ketik untuk mencari produk...</div>';
document.getElementById('searchPage').style.display = 'flex';
document.body.style.overflow = 'hidden';
document.addEventListener('keydown', handleSearchEsc);
renderRecommendations();
}
function closeSearchPage() {
document.getElementById('searchPage').style.display = 'none';
document.body.style.overflow = '';
document.removeEventListener('keydown', handleSearchEsc);
}
function handleSearchEsc(e) {
if (e.key === 'Escape') closeSearchPage();
}
function performSearch() {
const query = document.getElementById('searchInput')?.value?.toLowerCase() || '';
const resultsContainer = document.getElementById('searchResults');
const recommendationsSection = document.getElementById('recommendationsSection');
const resultsSection = document.getElementById('resultsSection');
if (!resultsContainer) return;
if (query.trim().length === 0) {
if (recommendationsSection) recommendationsSection.style.display = 'block';
if (resultsSection) resultsSection.style.display = 'none';
resultsContainer.innerHTML = '';
return;
}
if (recommendationsSection) recommendationsSection.style.display = 'none';
if (resultsSection) resultsSection.style.display = 'block';
const filtered = PRODUCT_CATALOG.filter(product => 
product.name.toLowerCase().includes(query) ||
product.series.toLowerCase().includes(query) ||
product.description.toLowerCase().includes(query) ||
product.material.toLowerCase().includes(query)
);
if (filtered.length === 0) {
resultsContainer.innerHTML = `<div style="text-align:center;padding:60px 20px;color:#bbb;font-size:14px;font-family:'DM Sans',sans-serif;grid-column:1/-1;">Tidak ada produk yang cocok dengan "<strong>${query}</strong>"</div>`;
return;
}
const html = filtered.map(product => {
const prodIdx = PRODUCT_CATALOG.indexOf(product);
const mainImg = `img-${prodIdx * 2}.jpeg`;
const hoverImg = `img-${prodIdx * 2 + 1}.jpeg`;
return `
<div class="search-product-card" style="display:flex;flex-direction:column;gap:10px;cursor:pointer;transition:all 0.2s ease;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
<div class="product-img-wrap" style="position:relative;overflow:hidden;border-radius:12px;aspect-ratio:3/4;background:#f9f9f9;height:240px;" onclick="openProductDetail('${product.id}'); closeSearchPage();">
<img src="./images/${mainImg}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;object-position:center;transition:opacity 0.3s ease;opacity:1;" class="search-main-img">
<img src="./images/${hoverImg}" alt="${product.name}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0;transition:opacity 0.3s ease;" class="search-hover-img" onmouseover="this.style.opacity='1'; this.previousElementSibling.style.opacity='0'" onmouseout="this.style.opacity='0'; this.previousElementSibling.style.opacity='1'">
<button class="wishlist-btn" onclick="event.stopPropagation();toggleWishlist(this);return false;" data-id="${product.id}" data-name="${product.name}" data-series="${product.series}" data-price="${product.price}" style="position:absolute;top:10px;right:10px;width:40px;height:40px;border:none;border-radius:50%;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.12);transition:all 0.2s;z-index:10;color:#D84040;padding:0;opacity:0;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
</button>
<button class="cart-btn" onclick="event.stopPropagation();addToCartFromGrid(this);return false;" data-id="${product.id}" data-name="${product.name}" data-series="${product.series}" data-price="${product.price}" style="position:absolute;bottom:10px;left:10px;right:10px;height:36px;border:none;border-radius:8px;background:#D84040;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:0.08em;font-weight:700;cursor:pointer;transition:all 0.2s;z-index:9;opacity:0;">
Tambah Keranjang
</button>
</div>
<div style="padding:12px 14px;">
<p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#999;margin:0;text-transform:uppercase;letter-spacing:0.08em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">${product.series}</p>
<p style="font-family:'Playfair Display',serif;font-size:14px;font-weight:500;color:#111;margin:6px 0 4px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${product.name}</p>
<p style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#D84040;margin:0;">${product.price}</p>
</div>
</div>
`;
}).join('');
resultsContainer.innerHTML = html;
document.querySelectorAll('.search-product-card').forEach(card => {
card.addEventListener('mouseenter', () => {
card.querySelector('.wishlist-btn')?.style.setProperty('opacity', '1');
card.querySelector('.cart-btn')?.style.setProperty('opacity', '1');
});
card.addEventListener('mouseleave', () => {
card.querySelector('.wishlist-btn')?.style.setProperty('opacity', '0');
card.querySelector('.cart-btn')?.style.setProperty('opacity', '0');
});
});
}
let searchTimeout;
function debounceSearch() {
clearTimeout(searchTimeout);
searchTimeout = setTimeout(performSearch, 300);
}
function getRecommendedProducts() {
return PRODUCT_CATALOG.slice(0, 6);
}
function renderRecommendations() {
const recContainer = document.getElementById('searchRecommendations');
if (!recContainer) return;
const recommended = getRecommendedProducts();
const html = recommended.map(product => {
const prodIdx = PRODUCT_CATALOG.indexOf(product);
const mainImg = `img-${prodIdx * 2}.jpeg`;
const hoverImg = `img-${prodIdx * 2 + 1}.jpeg`;
return `
<div class="search-product-card" style="display:flex;flex-direction:column;gap:10px;cursor:pointer;transition:all 0.2s ease;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
<div class="product-img-wrap" style="position:relative;overflow:hidden;border-radius:12px;aspect-ratio:3/4;background:#f9f9f9;height:240px;" onclick="openProductDetail('${product.id}'); closeSearchPage();">
<img src="./images/${mainImg}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;object-position:center;transition:opacity 0.3s ease;opacity:1;" class="search-main-img">
<img src="./images/${hoverImg}" alt="${product.name}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0;transition:opacity 0.3s ease;" class="search-hover-img" onmouseover="this.style.opacity='1'; this.previousElementSibling.style.opacity='0'" onmouseout="this.style.opacity='0'; this.previousElementSibling.style.opacity='1'">
<button class="wishlist-btn" onclick="event.stopPropagation();toggleWishlist(this);return false;" data-id="${product.id}" data-name="${product.name}" data-series="${product.series}" data-price="${product.price}" style="position:absolute;top:10px;right:10px;width:40px;height:40px;border:none;border-radius:50%;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.12);transition:all 0.2s;z-index:10;color:#D84040;padding:0;opacity:0;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
</button>
<button class="cart-btn" onclick="event.stopPropagation();addToCartFromGrid(this);return false;" data-id="${product.id}" data-name="${product.name}" data-series="${product.series}" data-price="${product.price}" style="position:absolute;bottom:10px;left:10px;right:10px;height:36px;border:none;border-radius:8px;background:#D84040;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:0.08em;font-weight:700;cursor:pointer;transition:all 0.2s;z-index:9;opacity:0;">
Tambah Keranjang
</button>
</div>
<div style="padding:12px 14px;">
<p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#999;margin:0;text-transform:uppercase;letter-spacing:0.08em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">${product.series}</p>
<p style="font-family:'Playfair Display',serif;font-size:14px;font-weight:500;color:#111;margin:6px 0 4px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${product.name}</p>
<p style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#D84040;margin:0;">${product.price}</p>
</div>
</div>
`;
}).join('');
recContainer.innerHTML = html;
document.querySelectorAll('#searchRecommendations .search-product-card').forEach(card => {
card.addEventListener('mouseenter', () => {
card.querySelector('.wishlist-btn')?.style.setProperty('opacity', '1');
card.querySelector('.cart-btn')?.style.setProperty('opacity', '1');
});
card.addEventListener('mouseleave', () => {
card.querySelector('.wishlist-btn')?.style.setProperty('opacity', '0');
card.querySelector('.cart-btn')?.style.setProperty('opacity', '0');
});
});
}
