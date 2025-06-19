document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  let cart = JSON.parse(localStorage.getItem("thingsToBuy")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");


  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">ADD TO CART!!</button>
    `;
    productList.appendChild(productDiv);
  });


  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find(p => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveData();
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let tp = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item) => {
        tp += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("product");
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button delete-id="${item.id}">DELETE</button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${tp.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }


  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const itemToBeDeletedId = parseInt(e.target.getAttribute("delete-id"));
      const itemToBeDeleted = cart.find(c => c.id === itemToBeDeletedId);
      removeFromCart(itemToBeDeleted);
    }
  });

  function removeFromCart(itemToBeDeleted) {
    cart.pop(itemToBeDeleted)
    renderCart()
    saveData()
  }

  function saveData() {
    localStorage.setItem("thingsToBuy", JSON.stringify(cart));
  }


  checkOutBtn.addEventListener("click", () => {
    cart = [];
    localStorage.removeItem("thingsToBuy");
    alert("SUCCESSFUL!!!!!!!!!!!!!!");
    renderCart();
  });
});
