import { loginRequest } from "./productData.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
    try {
      const token = await loginRequest(creds);
      setLocalStorage(tokenKey, token);
      window.location = redirect;
    } catch (err) {
      alertMessage(err.message.message);
    }
  }
function checkLogin(){

}

function isTokenValid(){

}