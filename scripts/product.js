const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("product-detail-container");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  })
  .then(product => {
    loading.style.display = "none";

    container.innerHTML = `
      <div class="img-zoom-container">
      <img src="${product.image}" alt="${product.title}" class="detail-img" />
      </div>
      <h2>${product.title}</h2>
      <p class="price">₹ <span id="totalPrice">${Math.round(product.price * 80)}</span></p>
      <p class="description">${product.description}</p>
      <div class="variations">
      <div class="variation-group">
      <label>Size:</label>
      <button class="variant-btn" data-size="S">S</button>
      <button class="variant-btn" data-size="M">M</button>
      <button class="variant-btn" data-size="L">L</button>
      </div>

      <div class="variation-group">
      <label>Color:</label>
      <button class="variant-btn" data-color="Black">Black</button>
      <button class="variant-btn" data-color="Blue">Blue</button>
      <button class="variant-btn" data-color="Red">Red</button>
      </div>
      </div>
      <div class="quantity-box">
      <button id="qtyMinus">−</button>
      <span id="qtyValue">1</span>
      <button id="qtyPlus">+</button>
      </div>
      <button id="addToCartBtn">Add to Cart</button>
    `;
let quantity = 1;

const qtyValue = document.getElementById("qtyValue");
const qtyPlus = document.getElementById("qtyPlus");
const qtyMinus = document.getElementById("qtyMinus");

qtyPlus.addEventListener("click", () => {
  quantity++;
  qtyValue.textContent = quantity;
  updatePrice();
});

qtyMinus.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qtyValue.textContent = quantity;
    updatePrice();
  }
});

let selectedSize = null;
let selectedColor = null;

document.querySelectorAll("[data-size]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-size]").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    selectedSize = btn.dataset.size;
    updatePrice();
  });
});

document.querySelectorAll("[data-color]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-color]").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    selectedColor = btn.dataset.color;
  });
});

const basePrice = Math.round(product.price * 80);
const totalPriceEl = document.getElementById("totalPrice");

function updatePrice() {
  let finalPrice = basePrice * quantity;

  // optional size multiplier (simple demo logic)
  if (selectedSize === "M") finalPrice *= 1.1;
  if (selectedSize === "L") finalPrice *= 1.2;

  totalPriceEl.textContent = Math.round(finalPrice);
}

const addToCartBtn = document.getElementById("addToCartBtn");
addToCartBtn.addEventListener("click", () => {
  addToCart(product, selectedSize, selectedColor);
});

  })
  .catch(err => {
    loading.style.display = "none";
    errorMsg.style.display = "block";
    console.error(err);

  });

  function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {

    cart.push({
  id: product.id,
  title: product.title,
  price: Math.round(product.price * 80),
  image: product.image,
  quantity: quantity,
  size: selectedSize,
  color: selectedColor
});

  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  addToCartBtn.textContent = "Added ✔";
  addToCartBtn.disabled = true;

setTimeout(() => {
  addToCartBtn.textContent = "Add to Cart";
  addToCartBtn.disabled = false;
}, 1500);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = total;
  }
} 