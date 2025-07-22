
//6287846725885
// checkout
document.addEventListener("DOMContentLoaded", function () {
  loadCart();
  document.getElementById("checkoutBtn").addEventListener("click", checkoutKeWhatsApp);
});

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("keranjang")) || [];
  const cartList = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartList.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartList.innerHTML = "<li>Keranjang kosong.</li>";
    cartTotal.textContent = "Rp 0";
    return;
  }

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <div>
        <strong>${item.nama}</strong><br>
        Harga: Rp ${item.harga.toLocaleString()}<br>
        Jumlah: 
        <button onclick="ubahQty(${index}, -1)">➖</button>
        <span>${item.qty}</span>
        <button onclick="ubahQty(${index}, 1)">➕</button><br>
        Subtotal: Rp ${(item.harga * item.qty).toLocaleString()}
      </div>
    `;
    cartList.appendChild(li);
    total += item.harga * item.qty;
  });

  cartTotal.textContent = `Rp ${total.toLocaleString()}`;
}

function ubahQty(index, perubahan) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  if (!keranjang[index]) return;

  keranjang[index].qty += perubahan;

  if (keranjang[index].qty <= 0) {
    keranjang.splice(index, 1);
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  loadCart();
}

// mengarah ke wa

document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("btnCheckout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", kirimPesanKeWhatsApp);
  }
});

function kirimPesanKeWhatsApp() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  // Buat pesan WhatsApp
  let pesan = "Om Swastiastu, saya ingin memesan:\n\n";
  let total = 0;

  keranjang.forEach((item, i) => {
    const subtotal = item.harga * item.qty;
    pesan += `- ${item.nama} (x${item.qty}) = Rp ${subtotal.toLocaleString()}\n`;
    total += subtotal;
  });

  pesan += `\nTotal: Rp ${total.toLocaleString()}`;
  
  // Nomor tujuan WA (tanpa + dan tanpa 0 di depan)
  const noWhatsApp = "6287846725885"; // ganti dengan nomor kamu

  // Encode dan redirect ke WA
  const url = `https://wa.me/${noWhatsApp}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}

