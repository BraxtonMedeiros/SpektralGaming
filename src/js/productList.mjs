import { getHoodie, getShirt, getShorts, getSweats } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.id}&category=${product.category}">
      <img
        src="${product.img}"
        alt="Image of ${product.name}"
      />
      <h3 class="card__brand">${product.name}</h3>
      <p class="product-card__price">$${product.price}</p></a>
    </li>`;
  }

export default async function productList(selector, category){
  // get the element we will insert the list into from the selector
  const element = document.querySelector(selector);
  // get the list of products 
  let products;
  switch (category) {
    case "shirt":
      products = await getShirt().then(data => data.shirts);

      break;
      case "hoodie":
        products = await getHoodie().then(data => data.hoodie);
      
      break;
      case "sweats":
        products = await getSweats().then(data => data.sweats);
      
      break;
      case "shorts":
        products = await getShorts().then(data => data.shorts);
      
      break;
  
    default:
      break;
  }
  renderListWithTemplate(productCardTemplate, element, products);
  document.querySelector(".title").innerHTML = category;
}