function updateCartBadges() {
const badge = document.getElementById('cartBadge');
if (badge) badge.innerHTML = AppState.cart.length;
}
function saveCart() {
localStorage.setItem('nn_cart', JSON.stringify(AppState.cart));
updateCartBadges();
}
function renderCart() {
const itemsWrap = document.getElementById('cartItems');
const emptyEl   = document.getElementById('cartEmpty');
const summaryEl = document.getElementById('cartSummary');
const countEl   = document.getElementById('cartItemCount');
const listEl    = document.getElementById('cartProductList');
if (!itemsWrap) return;
if (AppState.cart.length === 0) {
if (emptyEl) emptyEl.style.display = 'block';
if (itemsWrap) itemsWrap.style.display = 'none';
if (summaryEl) summaryEl.style.display = 'none';
if (countEl) countEl.textContent = '0';
return;
}
if (emptyEl) emptyEl.style.display = 'none';
if (itemsWrap) itemsWrap.style.display = 'flex';
if (summaryEl) summaryEl.style.display = 'block';
let html = '';
let totalItems = 0, totalPrice = 0;
AppState.cart.forEach((item, idx) => {
totalItems += (item.qty || 1);
const idr = parseInt(item.price.replace(/\D/g, ''));
totalPrice += idr * (item.qty || 1);
html += `
<div style="display:flex;align-items:center;gap:8px;padding:12px;background:#fff;border-radius:8px;border:1px solid #eee;">
<input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleSelectCart(${idx})" style="width:18px;height:18px;accent-color:#D84040;">
<img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
<div style="flex:1;min-width:0;">
<div style="font-family:'Playfair Display',serif;font-size:13px;font-weight:500;color:#111;margin-bottom:2px;">${item.name}</div>
<div style="font-family:'DM Sans',sans-serif;font-size:11px;color:#666;margin-bottom:4px;">${item.series || 'N/A'}</div>
<div style="font-family:'DM Sans',sans-serif;font-size:12px;color:#111;font-weight:500;">${item.price}</div>
</div>
<div style="display:flex;gap:6px;align-items:center;">
<button onclick="changeCartQty(${idx}, -1)" style="width:24px;height:24px;border:1px solid #ddd;background:#f5f5f5;cursor:pointer;border-radius:4px;font-size:12px;">−</button>
<span style="width:30px;text-align:center;font-size:12px;">${item.qty || 1}</span>
<button onclick="changeCartQty(${idx}, 1)" style="width:24px;height:24px;border:1px solid #ddd;background:#f5f5f5;cursor:pointer;border-radius:4px;font-size:12px;">+</button>
</div>
<button class="delete-btn" onclick="deleteFromCart(${idx})" style="background:none;border:none;color:#D84040;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;padding:4px 8px;">Hapus</button>
</div>
`;
});
if (listEl) listEl.innerHTML = html;
if (countEl) countEl.textContent = totalItems;
}
function updateCartSelection() {
const allCheckboxes = document.querySelectorAll('#cartItems input[type="checkbox"]');
const selectAllCb = document.getElementById('selectAllCb');
const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
if (selectAllCb) selectAllCb.checked = allChecked;
}
function toggleSelectCart(idx) {
AppState.cart[idx].checked = !AppState.cart[idx].checked;
updateCartSelection();
}
function toggleSelectAll(checked) {
AppState.cart.forEach(item => item.checked = checked);
renderCart();
}
function changeCartQty(idx, delta) {
AppState.cart[idx].qty = Math.max(1, (AppState.cart[idx].qty || 1) + delta);
saveCart();
renderCart();
}
function deleteFromCart(idx) {
AppState.cart.splice(idx, 1);
saveCart();
renderCart();
}
function deleteSelected() {
AppState.cart = AppState.cart.filter(i => i.checked === false);
saveCart();
renderCart();
}
function openCartPage() {
renderCart();
document.getElementById('cartPage').style.display = 'block';
document.body.style.overflow = 'hidden';
document.addEventListener('keydown', handleCartEsc);
}
function closeCartPage() {
document.getElementById('cartPage').style.display = 'none';
document.body.style.overflow = '';
document.removeEventListener('keydown', handleCartEsc);
}
function handleCartEsc(e) {
if (e.key === 'Escape') closeCartPage();
}
function proceedToCheckout() {
const selected = AppState.cart.filter(i => i.checked);
if (selected.length === 0) {
showToast('Pilih produk terlebih dahulu', false);
return;
}
openCheckoutPageDirect(selected);
closeCartPage();
}
function addToCartFromGrid(btn) {
if (!btn) return;
const card = btn.closest('.product-card');
if (!card) return;
const id = btn.getAttribute('data-id');
const name = btn.getAttribute('data-name');
const series = btn.getAttribute('data-series');
const price = btn.getAttribute('data-price');
const imgEl = card.querySelector('img');
if (!id || !name) return;
const item = {
id: id,
name: name,
series: series || 'N/A',
price: price || '—',
size: 'All Size',
color: 'Default',
shipping: 'Standard',
qty: 1,
img: imgEl?.src || '',
checked: true
};
AppState.cart.push(item);
saveCart();
showToast('✓ Ditambahkan ke keranjang!');
}
