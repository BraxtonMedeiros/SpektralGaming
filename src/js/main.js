import productList from "./productList.mjs";
import { renderAlerts } from "./alertModule.js";
import { cartsuperscript } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function init() {
  await renderAlerts(); // Render alerts before rendering product list
  productList(".product-list", "tents");
  cartsuperscript(); // Call cartsuperscript after productList
  loadHeaderFooter()
}
init();
