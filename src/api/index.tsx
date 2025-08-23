const fetchProducts = async () => {
  try {
    let res = await fetch(`${process.env.BACKEND_URL}/products/home`);
    res = await res.json();
    return res;
  } catch (error) {
    console.error("Error is", error);
  }
};

export { fetchProducts };
