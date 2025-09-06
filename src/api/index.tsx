const fetchProducts = async () => {
  try {
    console.log(
      "process.env.NEXT_PUBLIC_BACKEND_URL",
      process.env.NEXT_PUBLIC_BACKEND_URL
    );
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/home`
    );
    res = await res.json();

    console.log("res is", res);
    return res;
  } catch (error) {
    console.error("Error is", error);
  }
};

export { fetchProducts };
