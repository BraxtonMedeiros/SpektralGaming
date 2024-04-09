const baseURL = import.meta.env.VITE_SERVER_URLS;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } 
  else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function getShirt() {
  const response = await fetch(`/data/shirt.json`).then(r => r.json());
  return response;
}

export async function getHoodie() {
  const response = await fetch(`/data/hoodie.json`).then(r => r.json());
  return response;
}

export async function getSweats() {
  const response = await fetch(`/data/sweats.json`).then(r => r.json());
  return response;
}

export async function getShorts() {
  const response = await fetch(`/data/shorts.json`).then(r => r.json());
  return response;
}

export async function findProductById(productId, category) {
  let group;
  switch (category) {
    case "shirt":
      group = await getShirt().then(data => data.shirts);
      
      return group.filter(d => d.id == productId)[0];
      
      case "hoodie":
        group = await getHoodie().then(data => data.hoodie);
      
      return group.filter(d => d.id == productId)[0];
      
      case "sweats":
        group = await getSweats().then(data => data.sweats);
      
      return group.filter(d => d.id == productId)[0];
      
      case "shorts":
        group = await getShorts().then(data => data.shorts);
      
      return group.filter(d => d.id == productId)[0];
  
    default:
      break;
  }

}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout", options).then(convertToJson)
}

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}