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
  { id: 1, nama: "Cenige Besar", harga: 150000, gambar: "Cenige besar.jpeg", kategori: "Jaitan" },
  { id: 2, nama: "Cenige Gantungan Kecil", harga: 80000, gambar: "Cenige gantungan kecil.jpeg", kategori: "Jaitan" },
  { id: 3, nama: "Cenige Gantungan", harga: 120000, gambar: "Cenige gantungan utk galungan.jpeg", kategori: "Galungan" },
  { id: 4, nama: "Cenige Tamiyang", harga: 90000, gambar: "Cenige tamiyang Ter utk Kuningan.jpeg", kategori: "Galungan" },
  { id: 5, nama: "Gantungan", harga: 90000, gambar: "Gantungan.jpeg", kategori: "Jaitan" },
  { id: 6, nama: "Gelungan Rejang Dewa", harga: 90000, gambar: "Gelungan rejang dewa.jpeg", kategori: "Jaitan" },
  { id: 7, nama: "Gelungan Sanggah Penjor", harga: 90000, gambar: "Gelungan sanggah Penjor.jpeg", kategori: "Galungan" },
  { id: 8, nama: "Janur Jering", harga: 90000, gambar: "Janur jering.jpeg", kategori: "Galungan" },
  { id: 9, nama: "Janur Kembang Mayang", harga: 90000, gambar: "Janur kembang Mayang.jpeg", kategori: "Galungan" },
  { id: 10, nama: "Janur Merak", harga: 90000, gambar: "Janur merak.jpeg", kategori: "Galungan" },
  { id: 11, nama: "Janur Penjor", harga: 90000, gambar: "Janur penjor.jpeg", kategori: "Galungan" },
  { id: 12, nama: "Kolong' Penjor 4,5meter", harga: 90000, gambar: "Kolong2 Penjor 4,5meter.jpeg", kategori: "Galungan" },
  { id: 13, nama: "Lamak", harga: 90000, gambar: "Lamak.jpeg", kategori: "Jaitan" },
  { id: 14, nama: "Sampian Gebogan", harga: 90000, gambar: "Sampian gebogan.jpeg", kategori: "Jaitan" },
  { id: 15, nama: "Sampian Penjor Besar", harga: 90000, gambar: "Sampian Penjor besar.jpeg", kategori: "Galungan" },
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


