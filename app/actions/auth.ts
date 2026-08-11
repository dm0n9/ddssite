"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const user = formData.get("username")?.toString();
  const pass = formData.get("password")?.toString();

  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    // ДОБАВЛЕН AWAIT
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });
  } else {
    return { error: "Неверный логин или пароль" };
  }

  redirect("/products");
}

export async function logoutAdmin() {
  // ДОБАВЛЕН AWAIT
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/products");
}