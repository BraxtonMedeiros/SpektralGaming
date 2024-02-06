import productList from "./productList.mjs";
import { renderAlerts } from "./alertModule.js";

async function init() {
  await renderAlerts(); // Render alerts before rendering product list
  productList(".product-list", "tents");
}

init();