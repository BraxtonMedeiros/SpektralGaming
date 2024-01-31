import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  setLocalStorage("so-cart", product);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;

  // Calculate and display discount
  const discount = calculateDiscount(product.SuggestedRetailPrice, product.FinalPrice);

  const discountElement = document.createElement("p");
  discountElement.id = "productDiscount";
  discountElement.textContent = `${discount}% OFF!`;

  // Create a container div and append both price and discount to it
  const containerDiv = document.createElement("div");
  containerDiv.appendChild(document.querySelector("#productFinalPrice"));
  containerDiv.appendChild(discountElement);

  // Append the container div to .product-detail
  document.querySelector(".product-detail").appendChild(containerDiv);

  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#addToCart").dataset.id = product.Id;
}

function calculateDiscount(listedPrice, finalPrice) {
  // Parse input values as numbers
  const originalPrice = parseFloat(listedPrice) * (1 + 15 / 100); // Assuming 15% off already
  const discount = ((originalPrice - parseFloat(finalPrice)) / originalPrice) * 100;

  // Check for NaN or Infinity
  if (isNaN(discount) || !isFinite(discount)) {
    return 0; // Return 0% discount in case of invalid values
  }

  return discount.toFixed(1); // Round to one decimal place
}