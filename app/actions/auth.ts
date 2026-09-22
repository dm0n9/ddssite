"use server";

import { cookies } from "next/headers";

export async function loginAdmin(formData: FormData) {
  const user = formData.get("username")?.toString().trim();
  const pass = formData.get("password")?.toString().trim();

  const envUser = process.env.ADMIN_USER?.trim();
  const envPass = process.env.ADMIN_PASS?.trim();

  if (!envUser || !envPass) {
    console.error("ОШИБКА: ADMIN_USER или ADMIN_PASS не заданы в файле .env!");
    return { error: "Ошибка конфигурации сервера: проверьте .env" };
  }

  if (user !== envUser || pass !== envPass) {
    return { error: "Неверный логин или пароль" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: false, // Обязательно false для работы без HTTPS
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}