"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";


export default function ClientShell({ children }) {
  const [mounted, setMounted] = useState(false);

  // Ensures everything runs only on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid SSR mismatch

  return (
    <>
      <Loader /> {/* Always on top */}
      <Navbar />
      <main className="page-content">{children}</main>
      <Footer />
    </>
  );
}