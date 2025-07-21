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

document.addEventListener("DOMContentLoaded", function () {
  tampilkanProduk();
});

const semuaProduk = [
  { id: 1, nama: "kamar-1", harga: 150000, gambar: "foto-tes.JPG", kategori: "women" },
  { id: 2, nama: "kamar-2", harga: 80000, gambar: "foto-tes.JPG", kategori: "kids" },
  { id: 3, nama: "kamar-3", harga: 120000, gambar: "foto-tes.JPG", kategori: "women" },
  { id: 4, nama: "kamar-4", harga: 90000, gambar: "foto-tes.JPG", kategori: "kids" },
];

function tampilkanProduk(filtered = semuaProduk) {
  const container = document.getElementById("dealsGrid");
  container.innerHTML = "";

  filtered.forEach((produk) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${produk.gambar}" alt="${produk.nama}" class="product-img">
      <h3 class="product-title">${produk.nama}</h3>
      <p class="product-price">Rp ${produk.harga.toLocaleString()}</p>
      <button class="btn-beli" onclick="tambahKeKeranjang(${produk.id})">Beli</button>
    `;
    container.appendChild(card);
  });
}

function filterProduk(kategori) {
  const hasilFilter = semuaProduk.filter(p => p.kategori === kategori);
  tampilkanProduk(hasilFilter);
}

function resetFilter() {
  tampilkanProduk();
}

function tambahKeKeranjang(idProduk) {
  const produk = semuaProduk.find(p => p.id === idProduk);
  if (!produk) return;

  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  const produkDalamKeranjang = keranjang.find(p => p.id === idProduk);
  if (produkDalamKeranjang) {
    produkDalamKeranjang.qty += 1;
  } else {
    keranjang.push({ id: produk.id, nama: produk.nama, harga: produk.harga, gambar: produk.gambar, qty: 1 });
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}


  document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery img, .cat-card img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    galleryImages.forEach((img) => {
      img.addEventListener("click", function () {
        lightboxImg.src = this.src;
        lightbox.style.display = "flex";
      });
    });

    // Klik di luar gambar untuk menutup
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target === lightboxImg) {
        lightbox.style.display = "none";
        resetFilter();
      }
    });
  }); 


