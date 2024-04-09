import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, alertMessage  } from "./utils.mjs";

let product = {};

export default async function productDetails(productId, category) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId, category);
  // const thing = test.filter(d => d.id === productId)[0];
  // console.log(thing);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  // Check if cartContents is not an array or null
  if (!Array.isArray(cartContents) || cartContents === null) {
    // Initialize cartContents as an empty array
    cartContents = [];
  }
  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);

  alertMessage(`${product.name} added to cart!`);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.name;
  document.querySelector("#productImage").src = product.img;
  document.querySelector("#productImage").alt = product.name;
  document.querySelector("#productFinalPrice").innerText = `Now $${product.price}`;
  document.querySelector("#addToCart").dataset.id = product.id;
}