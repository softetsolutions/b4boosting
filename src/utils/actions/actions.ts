"use server";

export async function Loginaction(formData: FormData) {
  try {
    console.log("formData", formData);
    let res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    res = await res.json();

    if (res.ok) {
    }
  } catch (error) {
    console.error("Got error while signing in", error);
  }
}
