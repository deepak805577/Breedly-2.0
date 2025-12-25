"use client";
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
    const [count, setCount] = useState(0);

  // 🚫 Hide navbar on immersive flows
  const hideNavbar =
    pathname.startsWith("/breed-selector") ||
    pathname.startsWith("/results") ||
    pathname.startsWith("/adoption-guide") ||
    pathname.startsWith("/adoption-success") ||
    pathname.startsWith("/breeds") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/my-dog") ||
    pathname.startsWith("/food-guide") ||
    pathname.startsWith("/health-guide");

  // ✅ IMPORTANT: stop rendering completely
  if (hideNavbar) return null;

  useEffect(() => {
    supabase
      .from('user_favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_email', 'test@breedly.com')
      .single()
      .then(({ count }) => setCount(count || 0));


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
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/breed-selector">Breed Selector</Link>
          </li>
          <li>
            <Link href="/breeds">Breeds</Link>
          </li>
          {/*<li><Link href="/blog">Guides</Link></li>*/}
          <li>
            <Link href="/health-guide">Health Guide</Link>
          </li>
          <li>
            <Link href="/food-guide">Food Guide</Link>
          </li>
          <li>
            <Link href="/my-dog">My Dog</Link>
          </li>
          <a href="/dashboard" className="ml-4 bg-purple-500 text-white px-4 py-2 rounded">
  👤 My Breedly
</a>


        </ul>

        <div className="nav-right">
          <Link href="/login" className="btn-primary">
            🐶 Register
          </Link>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      {/*<div className={`bottom-nav ${hideNavbar ? "nav-hidden" : ""}`}>
        <NavItem href="/" label="Home" icon="home-icon(1)" pathname={pathname} />
        <NavItem href="/breed-selector" label="Select" icon="quiz-icon(1)" pathname={pathname} />
        <NavItem href="/breeds" label="Breeds" icon="breed-icon(1)" pathname={pathname} />
        <NavItem href="/my-dog" label="My Dog" icon="paw-icon(1)" pathname={pathname} />
        <NavItem href="/login" label="Profile" icon="login-icon(1)" pathname={pathname} />
      </div>*/}
      <div className={`bottom-navbar ${hideNavbar ? "nav-hidden" : ""}`}>
        <div className="button-container">
          <Link href="/" className="button">
            <img
              src="/assets/icons/home-icon(1).png"
              alt="Home"
              className="icon"
            />
          </Link>
          <Link href="/breed-selector" className="button">
            <img
              src="/assets/icons/quiz-icon(1).png"
              alt="Quiz"
              className="icon"
            />
          </Link>
          <Link href="/breeds" className="button">
           <img
              src="/assets/icons/breed-icon(1).png"
              alt="Breeds"
              className="icon"
            />
          </Link>

          <Link href="/my-dog" className="button">
            <img
              src="/assets/icons/paw-icon(1).png"
              alt="My DOg"
              className="icon"
            />
          </Link>
          <Link href="/login" className="button">
            <img
              src="/assets/icons/login-icon(1).png"
              alt="Login"
              className="icon"
            />
          </Link>
        </div>
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
