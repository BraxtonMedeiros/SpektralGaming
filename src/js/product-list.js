import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function init() {
  const category = getParam("category");
  productList(".product-list", category);
  loadHeaderFooter()
}
init();
