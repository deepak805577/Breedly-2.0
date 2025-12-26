"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

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

  if (hideNavbar) return null;

  useEffect(() => {
    // Get logged-in info from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedProfilePic = localStorage.getItem("profilePic");

    if (storedUsername) setUsername(storedUsername);
    if (storedProfilePic) setProfilePic(storedProfilePic);

    // Scroll effect
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    const handleScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("profilePic");
    window.location.href = "/login";
  };

  return (
    <>
      {/* TOP NAV */}
      <nav className={`navbar ${hideNavbar ? "nav-hidden" : ""}`}>
        <div className="nav-left">
          <img src="/assets/dog (2).png" alt="BreedLy Logo" className="logo-img" />
          <div className="logo-text">
            <h1>BreedLy 🐾</h1>
            <span>Know About Paws</span>
          </div>
        </div>

        <ul className="nav-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/breed-selector">Breed Selector</Link></li>
          <li><Link href="/breeds">Breeds</Link></li>
          <li><Link href="/health-guide">Health Guide</Link></li>
          <li><Link href="/food-guide">Food Guide</Link></li>
          <li><Link href="/my-dog">My Dog</Link></li>
        </ul>

        <div className="nav-right flex items-center gap-4">
          {username ? (
            <>
              {/* Profile Pic */}
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  {username[0].toUpperCase()}
                </div>
              )}

              {/* Username */}
              <span className="hidden md:inline-block">{username}</span>

              {/* Logout */}
              <button
                className="btn-primary bg-red-500 hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary">
              🐶 Register
            </Link>
          )}
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <div className={`bottom-navbar ${hideNavbar ? "nav-hidden" : ""}`}>
        <div className="button-container">
          <Link href="/" className="button">
            <img src="/assets/icons/home-icon(1).png" alt="Home" className="icon" />
          </Link>
          <Link href="/breed-selector" className="button">
            <img src="/assets/icons/quiz-icon(1).png" alt="Quiz" className="icon" />
          </Link>
          <Link href="/breeds" className="button">
            <img src="/assets/icons/breed-icon(1).png" alt="Breeds" className="icon" />
          </Link>
          <Link href="/my-dog" className="button">
            <img src="/assets/icons/paw-icon(1).png" alt="My Dog" className="icon" />
          </Link>

          {/* Mobile login/logout */}
          {username ? (
            <button
              className="button"
              onClick={handleLogout}
              style={{ background: "transparent", border: "none" }}
            >
              <img src={profilePic || "/assets/icons/logout.png"} alt="Logout" className="icon rounded-full" />
            </button>
          ) : (
            <Link href="/login" className="button">
              <img src="/assets/icons/login-icon(1).png" alt="Login" className="icon" />
            </Link>
          )}
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
