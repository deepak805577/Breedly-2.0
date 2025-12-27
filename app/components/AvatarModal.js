"use client";
import './avatar.css';
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { supabase } from "@/lib/supabase";
import { getCroppedImg } from "@/app/utils/cropImage";
import { compressImage } from "@/app/utils/compressImage";

export default function ProfileAvatarModal({ open, onClose }) {
  const [user, setUser] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
  }, [open]);

  if (!open) return null;

  const onCropComplete = (_, pixels) => {
    setCroppedPixels(pixels);
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageSrc(URL.createObjectURL(file));
  };

  const resetImage = () => {
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const uploadAvatar = async () => {
    if (!croppedPixels || !user) return;

    try {
      setUploading(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedPixels);
      const compressedFile = await compressImage(
        new File([croppedBlob], "avatar.png", { type: "image/png" })
      );

      const filePath = `${user.id}.png`;

      await supabase.storage
        .from("profile-pics")
        .upload(filePath, compressedFile, { upsert: true });

      const { data } = supabase.storage
        .from("profile-pics")
        .getPublicUrl(filePath);

      await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="avatar-overlay">
      <div className="avatar-modal">

        {/* HEADER */}
        <div className="avatar-header">
          <h2>Profile Picture</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* USER INFO */}
        {user && (
          <div className="avatar-user">
            <div className="avatar-user-circle">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="avatar-user-name">
                {user.user_metadata?.name || "User"}
              </p>
              <p className="avatar-user-email">{user.email}</p>
            </div>
          </div>
        )}

        {/* BODY */}
        <div className="avatar-body">
          {!imageSrc ? (
            <label className="avatar-upload">
              <p>Click to upload image</p>
              <span>PNG, JPG (max 5MB)</span>
              <input type="file" accept="image/*" hidden onChange={onFileChange} />
            </label>
          ) : (
            <>
              {/* CIRCULAR PREVIEW */}
              <div className="avatar-preview-wrapper">
                <div className="avatar-preview">
                  <img src={imageSrc} alt="Preview" />
                </div>
                <p className="avatar-preview-text">Preview</p>
              </div>

              {/* CROPPER */}
              <div className="avatar-cropper">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* ZOOM */}
              <div className="avatar-zoom">
                <label>Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                />
              </div>

              {/* ACTIONS */}
              <div className="avatar-actions">
                <button onClick={resetImage} className="btn-outline">
                  Change
                </button>
                <button
                  onClick={uploadAvatar}
                  disabled={uploading}
                  className="btn-primaryy"
                >
                  {uploading ? "Saving..." : "Save"}
                </button>
              </div>

              <button className="btn-logout">Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
