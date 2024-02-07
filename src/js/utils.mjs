// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// Retrieve data from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  // Parse JSON data if it exists, otherwise return null
  return data ? JSON.parse(data) : null;
}

// Save data to localStorage
export function setLocalStorage(key, newData) {
  let existingData = getLocalStorage(key) || []; // Get existing data or initialize an empty array
  existingData.push(newData); // Add the new data to the existing array
  localStorage.setItem(key, JSON.stringify(existingData)); // Save the updated array to localStorage
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return(product);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export function cartsuperscript(cartitemcount) {
  if (cartitemcount > 0){
    const element = document.querySelector(".item-count");
    element.innerHTML = cartitemcount;
    // Assign styles to the element
    element.style.position = "absolute";
    element.style.top = "10px";
    element.style.right = "-9px";
    element.style.backgroundColor = "var(--primary-color)";
    element.style.borderRadius = "50%";
    element.style.padding = "3px 6px";
    element.style.fontSize = "12px";
  }

}