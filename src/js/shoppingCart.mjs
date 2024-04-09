import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);
}

function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  // Find index of item with given id
  const index = cartItems.findIndex(item => item.id == itemId);
  if (index !== -1) {
    // Remove item from array
    cartItems.splice(index, 1);
    // Update local storage
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    // Re-render cart
    shoppingCart();
  }
}

function displayCartTotal(total) {
  if (total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".cart-footer").classList.remove("hide");
    // Clear previous total before updating
    document.querySelector(".cart-total").innerText = "Total: ";
    // Format total with maximum of two decimal places
    const formattedTotal = total.toFixed(2);
    document.querySelector(".cart-total").innerText += ` $${formattedTotal}`;
  } else {
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.img}"
      alt="${item.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.price}</p>
  <button class="remove" data-id="${item.id}">X</button>
</li>`;

  return newItem;
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.price);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total;
}

// Add event listener to each remove button
document.addEventListener("click", function(event) {
  if (event.target.matches(".remove")) {
    const itemId = event.target.dataset.id;
    removeFromCart(itemId);
  }
});