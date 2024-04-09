
import { renderAlerts } from "./alertModule.js";
import { loadHeaderFooter } from "./utils.mjs";

async function init() {
  await renderAlerts(); // Render alerts before rendering product list
  loadHeaderFooter();
}
init();
