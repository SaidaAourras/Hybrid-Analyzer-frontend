"use client";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const logout = async () => {
    // nettoie localStorage
    localStorage.clear();

    // appelle le backend si nécessaire
    try {
      await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    router.push("/auth/login");
  };

  return { logout };
}
