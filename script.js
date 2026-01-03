let cart = JSON.parse(localStorage.getItem("cart")) || [];
const folders = {
  men: {
    shirts: "images/men/shirts/",
    watches: "images/men/watches/"
  },
  women: {
    kurtas: "images/women/kurtas/",
    sarees: "images/women/sarees/",
    watches: "images/women/watches/"
  },
  kids: "images/kids/",
  electronics: "images/electronics/"
};
let allProducts = [];
function showCategory(category) {
  document.getElementById("categories").style.display = "none";
  document.getElementById("backBtn").style.display = "block";
  const products = document.getElementById("products");
  products.innerHTML = "";
  allProducts = [];
  if (typeof folders[category] === "string") {
    loadProducts(folders[category], category);
  } else {
    for (let sub in folders[category]) {
      loadProducts(folders[category][sub], sub);
    }
  }
}
function loadProducts(path, title) {
  for (let i = 1; i <= 5; i++) {
    const price = 499 + i * 200;
    const product = {
      name: title,
      price: price,
      img: `${path}${i}.jpg`
    };
    allProducts.push(product);
    document.getElementById("products").innerHTML += productCard(product);
  }
}
function productCard(p) {
  return `
    <div class="product">
      <img src="${p.img}" onclick="openDetails('${p.img}', '${p.name}', ${p.price})">
      <h4>${p.name.toUpperCase()}</h4>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price}, '${p.img}')">
        Add to Cart
      </button>
    </div>
  `;
}
function searchProducts() {
  const value = document.getElementById("searchBox").value.toLowerCase();
  const products = document.getElementById("products");

  // If user starts searching and products are not loaded yet
  if (allProducts.length === 0) {
    loadAllProducts();
  }

  products.innerHTML = "";

  allProducts
    .filter(p => p.name.toLowerCase().includes(value))
    .forEach(p => {
      products.innerHTML += productCard(p);
    });

  // Hide categories while searching
  document.getElementById("categories").style.display = "none";
  document.getElementById("backBtn").style.display = "block";
}

function openDetails(img, name, price) {
  let recent = JSON.parse(localStorage.getItem("recent")) || [];
  recent.unshift({ img, name, price });
  recent = recent.slice(0, 5);
  localStorage.setItem("recent", JSON.stringify(recent));
  localStorage.setItem("product", JSON.stringify({ img, name, price }));
  window.location.href = "product.html";
}
function addToCart(name, price,img) {
  cart.push({ name, price,img });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}
function goToCart() {
  window.location.href = "cart.html";
}
updateCartCount();
function goToOrders() {
  let user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
  } else {
    window.location.href = "track.html";
  }
}
function backToCategories() {
  document.getElementById("categories").style.display = "grid";
  document.getElementById("products").innerHTML = "";
  document.getElementById("backBtn").style.display = "none";
}
function loadAllProducts() {
  allProducts = [];
  document.getElementById("products").innerHTML = "";

  for (let category in folders) {
    if (typeof folders[category] === "string") {
      loadProducts(folders[category], category);
    } else {
      for (let sub in folders[category]) {
        loadProducts(folders[category][sub], sub);
      }
    }
  }
}

function loadRecent() {
  let recent = JSON.parse(localStorage.getItem("recent")) || [];
  let div = document.getElementById("recentProducts");
  div.innerHTML = "";
  recent.forEach(p => {
    div.innerHTML += `
      <div class="recent-card">
        <img src="${p.img}">
        <p>${p.name}</p>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}
loadRecent();
window.onload = () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.style.display = "none";
  }, 2000);
};
loadAllProducts();
