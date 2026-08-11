"use client";
import { useState, useTransition } from "react";
import { loginAdmin } from "../actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await loginAdmin(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#0f172a" }}>Вход в панель управления</h1>
        
        {error && (
          <div style={{ padding: "10px", background: "#fef2f2", color: "#ef4444", borderRadius: "6px", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
            {error}
          </div>
        )}

        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "bold" }}>Логин</label>
            <input type="text" name="username" required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", color: "#000" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "bold" }}>Пароль</label>
            <input type="password" name="password" required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", color: "#000" }} />
          </div>

          <button type="submit" disabled={isPending} style={{ padding: "14px", background: isPending ? "#94a3b8" : "#0ea5e9", color: "#fff", border: "none", borderRadius: "6px", cursor: isPending ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "1rem", marginTop: "10px" }}>
            {isPending ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  );
}