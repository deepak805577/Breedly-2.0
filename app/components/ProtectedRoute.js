"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username"); // or "token" if you saved that
    if (!username) {
      alert("Please login first!");
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>; // render children if logged in
}

