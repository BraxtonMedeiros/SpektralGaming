import productList from "./productList.mjs";
import { cartsuperscript, loadHeaderFooter, getParam } from "./utils.mjs";

async function init() {
  const category = getParam("category");
  productList(".product-list", category);
  cartsuperscript(); // Call cartsuperscript after productList
  loadHeaderFooter()
}
init();
