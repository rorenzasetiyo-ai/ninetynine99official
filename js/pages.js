// ═══════════════════════════════════════════════════
// NINETYNINE — PAGE NAVIGATION
// ═══════════════════════════════════════════════════

function openProductDetail(productId) {
  const prod = PRODUCT_CATALOG.find(p => p.id === productId);
  if (!prod) return;

  document.getElementById('detailProdName').textContent = prod.name;
  document.getElementById('detailProdSeries').textContent = prod.series;
  document.getElementById('detailProdPrice').textContent = prod.price;
  document.getElementById('detailProdDesc').textContent = prod.description;
  document.getElementById('detailProdMaterial').textContent = prod.material;

  const colorsHtml = prod.colors.map(c => 
    `<button class="color-btn" onclick="selectColor(this, '${c.name}')" style="background:${c.hex};" title="${c.name}"></button>`
  ).join('');
  document.getElementById('detailColorPicker').innerHTML = colorsHtml;

  document.getElementById('detailMainImg').src = document.getElementById(prod.imgMainId).src;
  document.getElementById('detailQtyInput').value = 1;

  document.getElementById('productDetailPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleProductEsc);
}

function closeProductDetail() {
  document.getElementById('productDetailPage').style.display = 'none';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleProductEsc);
}

function handleProductEsc(e) {
  if (e.key === 'Escape') closeProductDetail();
}

function selectColor(btn, color) {
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('detailColorSelected').textContent = color;
}

function changeQty(delta) {
  const input = document.getElementById('detailQtyInput');
  input.value = Math.max(1, parseInt(input.value) + delta);
}

function addToCart() {
  const prodName = document.getElementById('detailProdName').textContent;
  const color = document.getElementById('detailColorSelected').textContent;
  const price = document.getElementById('detailProdPrice').textContent;
  const qty = parseInt(document.getElementById('detailQtyInput').value);

  cart.push({id: Math.random().toString(36), name: prodName, color, price, qty});
  saveCart();
  showToast('Ditambahkan ke keranjang!', true);
}

function buyNow() {
  addToCart();
  const item = cart[cart.length - 1];
  openCheckoutPageDirect(item);
  closeProductDetail();
}

// NEW ARRIVALS PAGE
function openNewArrivals() {
  const page = document.getElementById('newArrivalsPage');
  page.style.display = 'block';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    page.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 100);
  document.addEventListener('keydown', handleNewArrivalsEsc);
}

function closeNewArrivals() {
  document.getElementById('newArrivalsPage').style.display = 'none';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleNewArrivalsEsc);
}

function handleNewArrivalsEsc(e) {
  if (e.key === 'Escape') closeNewArrivals();
}

function openAllProductsPage() {
  openNewArrivals();
}

// LOOKS PAGE
function openLooksPage() {
  document.getElementById('looksPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleLooksEsc);
}

function closeLooksPage() {
  document.getElementById('looksPage').style.display = 'none';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleLooksEsc);
}

function handleLooksEsc(e) {
  if (e.key === 'Escape') closeLooksPage();
}

// CHECKOUT PAGE
function openCheckoutPageDirect(item) {
  document.getElementById('checkoutPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
  renderCheckoutItems([item].flat());
  document.addEventListener('keydown', handleCheckoutEsc);
}

function closeCheckoutPage() {
  document.getElementById('checkoutPage').style.display = 'none';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleCheckoutEsc);
}

function handleCheckoutEsc(e) {
  if (e.key === 'Escape') closeCheckoutPage();
}

function renderCheckoutItems(items) {
  const list = document.getElementById('checkoutItemsList');
  if (!list || !items) return;
  list.innerHTML = items.map(item => `
    <div class="checkout-item">
      <span>${item.name} × ${item.qty || 1}</span>
      <span>${item.price}</span>
    </div>
  `).join('');
}

// Initialize page handlers
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.querySelector('[aria-label="Cart"]');
  if (cartBtn) cartBtn.onclick = () => openCartPage();
  
  // Close buttons
  document.querySelectorAll('[onclick*="close"]').forEach(btn => {
    // Already handled by onclick attributes
  });
});
