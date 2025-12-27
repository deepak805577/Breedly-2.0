"use client";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";
import ProfileAvatarModal from "@/app/components/AvatarModal";




export default function Navbar() {
  const pathname = usePathname();
  const { user, profile, loading } = useAuth();
  const [avatarOpen, setAvatarOpen] = useState(false);

  const username = profile?.username;
  const profilePic = profile?.avatar_url;

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

  if (hideNavbar || loading) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <>
      {/* TOP NAV */}
      <nav className="navbar">
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
          <li><Link href="/health-guide">Health Guide</Link></li>
          <li><Link href="/food-guide">Food Guide</Link></li>
          <li><Link href="/my-dog">My Dog</Link></li>
        </ul>
       <div className="nav-avatar" onClick={() => setAvatarOpen(true)}>
  {profilePic ? (
    <img
  src={profilePic}
  alt="Profile"
  key={profilePic}
/>

  ) : (
    <span className="nav-avatar-fallback">
      {username?.[0]?.toUpperCase()}
    </span>
  )}
</div>

      </nav>
      {/* AVATAR MODAL */}
   <ProfileAvatarModal
  open={avatarOpen}
  onClose={() => setAvatarOpen(false)}
  onAvatarUpdated={() => window.location.reload()}
/>

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

          {user ? (
            <button
              className="button"
              onClick={handleLogout}
              style={{ background: "transparent", border: "none" }}
            >
              <img
                src={profilePic || "/assets/icons/logout.png"}
                alt="Logout"
                className="icon rounded-full"
              />
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
