"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // 🚫 Hide navbar on immersive flows
  const hideNavbar =
    pathname.startsWith("/breed-selector") ||
    pathname.startsWith("/results")||
    pathname.startsWith("/adoption-guide")||
    pathname.startsWith("/adoption-success")||
    pathname.startsWith("/breeds")||
    pathname.startsWith("/login")||
    pathname.startsWith("/my-dog")||
    pathname.startsWith("/food-guide")||
    pathname.startsWith("/health-guide");

    


  // ✅ IMPORTANT: stop rendering completely
  if (hideNavbar) return null;

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    const handleScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* TOP NAV */}
      <nav className={`navbar ${hideNavbar ? "nav-hidden" : ""}`}>
        <div className="nav-left">
          <img
            src="/assets/dog (2).png"
            alt="BreedLy Logo"
            className="logo-img"
          />
          <div className="logo-text">
            <h1>BreedLy 🐾</h1>
            <span>Know About Paws</span>
          </div>
        </div>

        <ul className="nav-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/breed-selector">Breed Selector</Link></li>
          <li><Link href="/breeds">Breeds</Link></li>
         { /*<li><Link href="/blog">Guides</Link></li>*/}
         <li><Link href="/health-guide">Health Guide</Link></li>
         <li><Link href="/food-guide">Food Guide</Link></li>
          <li><Link href="/my-dog">My Dog</Link></li>
        </ul>

        <div className="nav-right">
          <Link href="/login" className="btn-primary">🐶 Register</Link>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <div className={`bottom-nav ${hideNavbar ? "nav-hidden" : ""}`}>
        <NavItem href="/" label="Home" icon="home-icon(1)" pathname={pathname} />
        <NavItem href="/breed-selector" label="Select" icon="quiz-icon(1)" pathname={pathname} />
        <NavItem href="/breeds" label="Breeds" icon="breed-icon(1)" pathname={pathname} />
        <NavItem href="/my-dog" label="My Dog" icon="paw-icon(1)" pathname={pathname} />
        <NavItem href="/login" label="Profile" icon="login-icon(1)" pathname={pathname} />
      </div>
    </>
  );
}

function NavItem({ href, label, icon, pathname }) {
  return (
    <Link href={href} className={pathname === href ? "active-bottom" : ""}>
      <img src={`/assets/icons/${icon}.png`} alt={label} />
      <span>{label}</span>
    </Link>
  );
}
