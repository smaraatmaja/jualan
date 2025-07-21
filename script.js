// ------------------- Data Produk Dummy -------------------
// Kamu bebas mengganti / menambah data di sini.
// cat: men | women | kids
const ALL_PRODUCTS = [
  {id:1, title:'Black Synthetic Casual', price:195000, img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=60', cat:'men', badge:'sale', rating:4.5},
  {id:2, title:'Full Sleeve High Neck', price:99000, img:'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=60', cat:'men', badge:'new', rating:4.0},
  {id:3, title:'Black Sweat Cotton', price:300000, img:'https://images.unsplash.com/photo-1607345365483-104aa2f1f94c?auto=format&fit=crop&w=400&q=60', cat:'men', badge:'', rating:4.8},
  {id:4, title:'Green Casual Shirt', price:150000, img:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=60', cat:'men', badge:'hot', rating:4.3},
  {id:5, title:'Long Sleeve Casual', price:125000, img:'https://images.unsplash.com/photo-1529626455594-4da884b8ba83?auto=format&fit=crop&w=400&q=60', cat:'women', badge:'sale', rating:4.7},
  {id:6, title:'Argentina Jersey', price:99000, img:'https://images.unsplash.com/photo-1602810318383-e386cc2a3c3d?auto=format&fit=crop&w=400&q=60', cat:'kids', badge:'', rating:4.1},
  {id:7, title:'Brazil Jersey Premium', price:110000, img:'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=400&q=60', cat:'kids', badge:'new', rating:4.9},
  {id:8, title:'Germany Jersey Elite', price:135000, img:'https://images.unsplash.com/photo-1539533113208-c9a9a1f79275?auto=format&fit=crop&w=400&q=60', cat:'kids', badge:'', rating:4.2},
  {id:9, title:'Tee Oversize', price:89000, img:'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=400&q=60', cat:'women', badge:'hot', rating:4.6},
  {id:10,title:'Jogger Sport', price:159000, img:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=60', cat:'men', badge:'', rating:4.0},
];

// Bagian Great Deals & Featured hanya contoh subset
const DEALS_IDS = [1,2,5,6,7,8];
const FEATURED_IDS = [3,4,5,6,9,10];

// ------------------- State -------------------
let currentFilter = 'all';   // men | women | kids | all
let cart = [];               // {id, title, price, img, qty}

// -------------- Helper Format Rupiah --------------
function rupiah(num){
  return num.toLocaleString('id-ID');
}

// -------------- Render Product Card --------------
function createProductCard(prod){
  const card = document.createElement('article');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="pc-img-wrap">
      ${prod.badge ? `<span class="badge">${prod.badge}</span>` : ''}
      <img src="${prod.img}" alt="${prod.title}"/>
    </div>
    <div class="pc-body">
      <h3 class="pc-title">${prod.title}</h3>
      <div class="pc-price">Rp ${rupiah(prod.price)}</div>
      <div class="pc-rating">${renderStars(prod.rating)}</div>
      <div class="pc-actions">
        <button class="btn-outline small" onclick="addToCart(${prod.id})">Beli</button>
        <button class="wish-btn small" onclick="alert('Wishlist coming soon')"><i class="fa-regular fa-heart"></i></button>
      </div>
    </div>`;
  return card;
}

function renderStars(rating){
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let stars='';
  for(let i=0;i<full;i++) stars+='★';
  if(half) stars+='☆';
  return stars;
}

// -------------- Render Sections --------------
function renderSection(gridId, ids){
  const grid = document.getElementById(gridId);
  if(!grid) return;
  grid.innerHTML='';
  const data = ALL_PRODUCTS.filter(p=>ids.includes(p.id));
  const filtered = currentFilter==='all'?data:data.filter(p=>p.cat===currentFilter);
  filtered.forEach(p=>grid.appendChild(createProductCard(p)));
}

function renderAllSections(){
  renderSection('dealsGrid', DEALS_IDS);
  renderSection('featuredGrid', FEATURED_IDS);
}

// -------------- Filter Produk Global --------------
function filterProduk(cat){
  currentFilter = cat;
  renderAllSections();
  // scroll ke produk
  document.querySelector('#great-deals').scrollIntoView({behavior:'smooth'});
}
function resetFilter(){
  currentFilter='all';
  renderAllSections();
}
function scrollToDeals(){
  document.querySelector('#great-deals').scrollIntoView({behavior:'smooth'});
}

// -------------- Cart Logic --------------
function addToCart(id){
  const prod = ALL_PRODUCTS.find(p=>p.id===id);
  if(!prod) return;
  const existing = cart.find(item=>item.id===id);
  if(existing){existing.qty++;}
  else{cart.push({...prod,qty:1});}
  updateCartUI();
  toggleCart(true); // otomatis buka cart
}

function updateCartUI(){
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if(!countEl||!itemsEl||!totalEl) return;

  const totalQty = cart.reduce((sum,i)=>sum+i.qty,0);
  const totalPrice = cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  countEl.textContent = totalQty;
  totalEl.textContent = rupiah(totalPrice);

  itemsEl.innerHTML='';
  cart.forEach(item=>{
    const li=document.createElement('li');
    li.className='cart-item';
    li.innerHTML=`
      <img src="${item.img}" alt="${item.title}"/>
      <div>
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">Rp ${rupiah(item.price)}</div>
        <div class="cart-item-qty">
          <button onclick="decQty(${item.id})">-</button>
          <span>${item.qty}</span>
          <button onclick="incQty(${item.id})">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>`;
    itemsEl.appendChild(li);
  });
  saveCart();
}

function incQty(id){
  const it=cart.find(i=>i.id===id);if(it){it.qty++;updateCartUI();}
}
function decQty(id){
  const it=cart.find(i=>i.id===id);if(!it)return;it.qty--;if(it.qty<=0){cart=cart.filter(i=>i.id!==id);}updateCartUI();
}
function removeFromCart(id){
  cart=cart.filter(i=>i.id!==id);updateCartUI();
}

function toggleCart(open){
  const drawer=document.getElementById('cartDrawer');
  const overlay=document.getElementById('cartOverlay');
  if(!drawer||!overlay) return;
  if(open){
    drawer.classList.add('open');
    drawer.classList.remove('hidden');
    overlay.classList.remove('hidden');
    drawer.setAttribute('aria-hidden','false');
  }else{
    drawer.classList.remove('open');
    overlay.classList.add('hidden');
    // tunggu animasi? bisa dibiarkan
    drawer.setAttribute('aria-hidden','true');
  }
}

// -------------- Checkout --------------
function openCheckout(){
  document.getElementById('checkoutModal').classList.remove('hidden');
}
function closeCheckout(){
  document.getElementById('checkoutModal').classList.add('hidden');
}
function submitCheckout(e){
  e.preventDefault();
  const nama=document.getElementById('coNama').value.trim();
  const alamat=document.getElementById('coAlamat').value.trim();
  const hp=document.getElementById('coHP').value.trim();
  if(!nama||!alamat||!hp){alert('Lengkapi data checkout.');return;}
  alert(`Terima kasih ${nama}! Pesananmu kami proses.`);
  cart=[];updateCartUI();closeCheckout();toggleCart(false);
}

// -------------- Search --------------
const searchToggleBtn = document.getElementById('searchToggle');
const searchBarEl = document.getElementById('searchBar');
const searchInputEl = document.getElementById('searchInput');
if(searchToggleBtn){
  searchToggleBtn.addEventListener('click',()=>{
    searchBarEl.classList.toggle('hidden');
    if(!searchBarEl.classList.contains('hidden')){
      searchInputEl.focus();
    }
  });
}
if(searchInputEl){
  searchInputEl.addEventListener('input',()=>{
    const q = searchInputEl.value.toLowerCase();
    currentFilter='all';
    // Cari semua produk & tampilkan pada BOTH grid (sederhana)
    const matches = ALL_PRODUCTS.filter(p=>p.title.toLowerCase().includes(q));
    renderSearchResults(matches);
  });
}
function renderSearchResults(data){
  const dealsGrid=document.getElementById('dealsGrid');
  const featGrid=document.getElementById('featuredGrid');
  if(!dealsGrid||!featGrid)return;
  dealsGrid.innerHTML='';
  featGrid.innerHTML='';
  data.forEach(p=>{
    dealsGrid.appendChild(createProductCard(p));
  });
}

// -------------- Mobile Nav --------------
function toggleMobileNav(open){
  const nav=document.getElementById('mainNav');
  if(!nav)return;
  if(open) nav.classList.add('open');
  else nav.classList.remove('open');
}

function toggleNav() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('open');
}

// -------------- Persist Cart (localStorage) --------------
function saveCart(){
  localStorage.setItem('tokokita_cart',JSON.stringify(cart));
}
function loadCart(){
  try{const data=JSON.parse(localStorage.getItem('tokokita_cart'));if(Array.isArray(data))cart=data;else cart=[];}catch{cart=[];}
}

// -------------- Init --------------
window.addEventListener('DOMContentLoaded',()=>{
  // Tahun di footer
  const y=document.getElementById('yearNow');if(y)y.textContent=new Date().getFullYear();

  // load cart
  loadCart();
  updateCartUI();

  // render products
  renderAllSections();

  // tombol cart header
  const cartBtn=document.getElementById('cartBtn');
  if(cartBtn){cartBtn.addEventListener('click',()=>toggleCart(true));}
});




