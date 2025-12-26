"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username"); // or token
    const redirectedOnce = sessionStorage.getItem("redirectedOnce");

    if (!username && !redirectedOnce) {
      // First-time redirect to login
       alert("You need to login to access this page. Redirecting to Home.");
      sessionStorage.setItem("redirectedOnce", "true");
      router.push("/login");
    } else if (!username && redirectedOnce) {
         alert("You need to login to access this page. Redirecting to Home.");
      // Subsequent attempts: redirect to Home
      router.push("/");
    }
  }, [router]);

  return <>{children}</>; // render children if logged in
}
