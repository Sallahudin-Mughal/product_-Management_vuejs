import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function get(enpoint, done) {
  try {
    const response = await API.get(enpoint);
    done(response);
  } catch (err) {
    done(err);
  }
}

/**
 * function getAuthLogin data username and password and token
 * if matched user login Successfully
 *
 * @param {Object} headers
 * @param {Object} body
 * @returns post object to backend and hit API
 */
export function getAuthLogin(headers, body) {
  return API.post("/auth/login", body, { headers });
}

/**
 * function take 2 parameters headers contain refresh token and body
 * contains data like token and time
 *
 * @param {Object} headers
 * @param {Object} body
 * @returns refresh token
 */
export function refreshToken(body) {
  return API.post("/auth/refresh", body);
}

/**
 *
 * @param {Object} headers
 * @returns
 */
export function getCurrentAuthUser(headers) {
  return API.get("/auth/me", { headers });
}

export function getAllProducts() {
  return API.get("/products");
}

// get product by limit
export function getProductsByLimit(limit = 100, skip = 0) {
  return API.get(`/products?limit=${limit}&skip=${skip}`);
}

export function addProduct(body) {
  return API.post("/products/add", body);
}

export function updateProduct(id, body) {
  return API.put(`/products/${id}`, body);
}

export function deleteProduct(id) {
  return API.delete(`/products/${id}`);
}

export function getSingleProduct(id) {
  return API.get(`/products/${id}`);
}

export function searchProducts(query) {
  return API.get(`/products/search?q=${query}`);
}

/**
 * get cart details by user id
 *
 * @param {Number, String} id
 * @returns {Object} object have details of Cart
 */
export function getCartByUserID(id) {
  return API.get(`/carts/user/${id}`);
}

/**
 * Create new Cart
 *
 * @param {Object} body
 * @param {Object} headers
 * @returns {Object} object have details of Cart
 */
export function addNewCart(body, headers) {
  return API.post(`/carts/add`, body, { headers });
}

// update cart
export function updateCart(id, body, headers) {
  return API.put(`/carts/${id}`, body, { headers });
}

// Delete cart
export function deleteCart(id) {
  return API.delete(`/carts/${id}`);
}
