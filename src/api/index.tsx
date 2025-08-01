import { API_BASE_URL } from "./config";
const fetchProducts = async () => {
  let res = await fetch(`${API_BASE_URL}/products/home`);
  return await res.json();
};

export { fetchProducts };
