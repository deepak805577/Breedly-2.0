"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function ClientShell({ children }) {
  return (
    <>
      <Loader /> {/* Always on top */}
      <Navbar />
      <main className="page-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
