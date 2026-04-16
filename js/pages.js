// ═══════════════════════════════════════════════════
// NINETYNINE — PAGE NAVIGATION
// ═══════════════════════════════════════════════════

function openProductDetail(productId) {
  const prod = PRODUCT_CATALOG.find(p => p.id === productId);
  if (!prod) return;

  document.getElementById('pdName').textContent = prod.name;
  document.getElementById('pdSeries').textContent = prod.series;
  document.getElementById('pdPrice').textContent = prod.price;
  document.getElementById('pdDesc').textContent = prod.description;
  document.getElementById('pdMaterialVal').textContent = prod.material;

  const colorsHtml = prod.colors.map(c => 
    `<button class="color-btn" onclick="selectColor(this, '${c.name}')" style="background:${c.hex};" title="${c.name}"></button>`
  ).join('');
  document.getElementById('pdColors').innerHTML = colorsHtml;

  // Get image sources from the catalog image elements
  const mainImgEl = document.getElementById(prod.imgMainId);
  const hoverImgEl = document.getElementById(prod.imgHoverId);
  
  if (mainImgEl) {
    const mainSrc = mainImgEl.src;
    document.getElementById('pdImg1').src = mainSrc;
    document.getElementById('pdThumbImg1').src = mainSrc;
  }
  
  if (hoverImgEl) {
    document.getElementById('pdThumbImg2').src = hoverImgEl.src;
  }

  document.getElementById('pdQty').textContent = 1;

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
  // Store selected color (can be used later)
}

function changeQty(delta) {
  const input = document.getElementById('pdQty');
  let currentVal = parseInt(input.textContent) || 1;
  input.textContent = Math.max(1, currentVal + delta);
}

function addToCart() {
  const prodName = document.getElementById('pdName').textContent;
  const color = document.querySelector('.color-btn.active')?.getAttribute('title') || 'Default';
  const price = document.getElementById('pdPrice').textContent;
  const qty = parseInt(document.getElementById('pdQty').textContent) || 1;
  const email = document.getElementById('pdEmail').value;

  if (!email) {
    showToast('Masukkan email terlebih dahulu', false);
    return;
  }

  cart.push({id: Math.random().toString(36), name: prodName, color, price, qty, email});
  saveCart();
  showToast('Ditambahkan ke keranjang!', true);
  document.getElementById('pdEmail').value = '';
}

function buyNow() {
  addToCart();
  const item = cart[cart.length - 1];
  if (item) openCheckoutPageDirect(item);
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

// ACCOUNT PAGE
function loadMockOrderHistory() {
  const mockOrders = [
    {id: 'ORD-001', date: '2024-01-15', items: 'Silk Blend Dress', total: '$485', status: 'Delivered'},
    {id: 'ORD-002', date: '2024-02-03', items: 'Premium Handbag', total: '$1,250', status: 'Delivered'},
    {id: 'ORD-003', date: '2024-02-28', items: 'Luxury Heels (2)', total: '$890', status: 'Processing'},
    {id: 'ORD-004', date: '2024-03-10', items: 'Silk Scarf Set', total: '$325', status: 'In Transit'}
  ];
  
  const ordersList = document.getElementById('orderHistoryList');
  if (!ordersList) return;
  
  ordersList.innerHTML = mockOrders.map(order => `
    <div style="background:#fff;border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:12px;">
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <span style="font-family:'Playfair Display',serif;font-size:14px;font-weight:500;color:#111;">${order.id}</span>
          <span style="font-family:'DM Sans',sans-serif;font-size:11px;color:#888;">${order.date}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-family:'DM Sans',sans-serif;font-size:12px;color:#555;">${order.items}</span>
          <span style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#D84040;">${order.total}</span>
        </div>
        <span style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:${order.status === 'Delivered' ? '#4CAF50' : order.status === 'In Transit' ? '#FF9800' : '#2196F3'};">
          ${order.status}
        </span>
      </div>
    </div>
  `).join('');
}

function openAccountPage() {
  const page = document.getElementById('accountPage');
  if (!page) return;
  
  loadMockOrderHistory();
  page.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleAccountEsc);
}

function closeAccountPage() {
  const page = document.getElementById('accountPage');
  if (!page) {
    console.error('accountPage element not found');
    return;
  }
  
  // Force hide the page
  page.style.display = 'none';
  page.style.visibility = 'hidden';
  page.style.pointerEvents = 'none';
  
  // Restore body scrolling
  document.body.style.overflow = '';
  document.body.style.overflowY = '';
  
  // Remove event listener
  document.removeEventListener('keydown', handleAccountEsc);
  
  // Force scroll to top
  window.scrollTo(0, 0);
  
  console.log('Account page closed');
}

function handleAccountEsc(e) {
  if (e.key === 'Escape') closeAccountPage();
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
