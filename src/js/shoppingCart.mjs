import { findProductById } from "./productData.mjs";
import productDetails from "./productDetails.mjs";
import productList from "./productList.mjs";
import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);

  // Add event listener to each remove button
  const removeButtons = document.querySelectorAll("#remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.id;
      removeFromCart(itemId);
    });
  });
}

function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  // Find index of item with given id
  const index = cartItems.findIndex(item => item.Id === itemId);
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
    document.querySelector(".cart-total").innerText += ` $${total}`;
  } else {
    document.querySelector(".cart-footer").classList.add("hide");
  }
}
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id="remove" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total;
}