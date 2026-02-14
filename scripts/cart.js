const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "0";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" />
      <div>
        <h4>${item.title}</h4>
        <p>₹ ${item.price}</p>
        <p>Size: ${item.size} | Color: ${item.color}</p>

        <div class="qty">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartItemsEl.appendChild(div);
  });

  updateTotal();
}

renderCart();

function increaseQty(index) {
  cart[index].quantity += 1;
  saveCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    saveCart();
  }
}

function updateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  cartTotalEl.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}