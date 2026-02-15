document.addEventListener('DOMContentLoaded', () =>
     {
        fetchProducts();
     });
const samosa = document.querySelector('.samosa');
const navLinks = 
document.querySelector(".nav-links");

samosa.addEventListener('click', () => {
    navLinks.classList.toggle("show-menu");
});

 fetch("https://fakestoreapi.com/products")
    .then(Response => Response.json())
    .then(products => {
        products.forEach(product => {
            const productData = {
                name: product.title,
                price: product.price,
            };

            console.log("Product Data:", productData);
        });
    })
    .catch(error => {
        console.error("Error fetching products:", error);
    });
function fetchProducts() {
  const loading = document.getElementById("loading");
  const errorMsg = document.getElementById("error");

  loading.style.display = "block";
  errorMsg.style.display = "none";

  fetch("https://fakestoreapi.com/products")
    .then(res => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(products => {
      loading.style.display = "none";
      renderProducts(products);
    })
    .catch(error => {
      loading.style.display = "none";
      errorMsg.style.display = "block";
      console.error("Error fetching products:", error);
    });
}

    function renderProducts(products) {
  const productGrid = document.getElementById("product-grid");

  productGrid.innerHTML = ""; // clear old content

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
  <a href="product.html?id=${product.id}">
    <img src="${product.image}" alt="${product.title}" loading="lazy"
      sizes="(max-width: 600px) 100vw, 
      (max-width: 1200px) 50vw, 33vw"/>
    <h3>${product.title}</h3>
  </a>
  <p class="price">₹ ${Math.round(product.price * 80)}</p>
  <button class="add-to-cart">Add to Cart</button>
`;

    productGrid.appendChild(card);
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = total;
  }
}