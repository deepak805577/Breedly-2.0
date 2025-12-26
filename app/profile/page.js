"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);

  // Load user info from Supabase
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login"); // redirect if not logged in
        return;
      }
      setUser(data.user);

      // Get profile picture from localStorage if exists
      const storedPic = localStorage.getItem("profilePic");
      if (storedPic) setProfilePic(storedPic);
    };
    loadUser();
  }, [router]);

  // Handle profile picture upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    // Use user ID as filename
    const fileName = `${user.id}.png`;

    const { data, error } = await supabase.storage
      .from("profile-pics")
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("profile-pics")
      .getPublicUrl(fileName);

    setProfilePic(urlData.publicUrl);
    localStorage.setItem("profilePic", urlData.publicUrl);
    setUploading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("profilePic");
    router.push("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">My Profile</h1>

      {/* Profile Picture */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Profile Picture</label>
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-2"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-2 text-2xl font-bold">
            {user.email[0].toUpperCase()}
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        {uploading && <p>Uploading...</p>}
      </div>

      {/* User Info */}
      <div className="mb-6">
        <p><strong>Username:</strong> {user.email.split("@")[0]}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Logout */}
      <button
        className="btn-primary bg-red-500 hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
