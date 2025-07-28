const fetchProducts = async () => {
  let res = await fetch(`${process.env.BACKEND_URL}/products/home`);
  return await res.json();
};

export { fetchProducts };
