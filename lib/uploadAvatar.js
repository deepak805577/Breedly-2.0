import { supabase } from "@/lib/supabase";
import { getCroppedImg } from "@/app/utils/cropImage";
import { compressImage } from "@/app/utils/compressImage";

export const uploadAvatar = async ({
  imageSrc,
  croppedPixels,
  setUploading,
  onClose,
}) => {
  try {
    if (!imageSrc || !croppedPixels) {
      throw new Error("Image not ready");
    }

    setUploading(true);

    // 1️⃣ Crop
    const croppedBlob = await getCroppedImg(imageSrc, croppedPixels);
    if (!croppedBlob) throw new Error("Crop failed");

    // 2️⃣ Compress
    const compressed = await compressImage(
      new File([croppedBlob], "avatar.png", { type: "image/png" })
    );

    // 3️⃣ Get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("No user");

    // ✅ Correct storage path
    const filePath = `${user.id}/avatar.png`;

    // 4️⃣ Upload
    const { error: uploadError } = await supabase.storage
      .from("profile-pics")
      .upload(filePath, compressed, {
        upsert: true,
        contentType: "image/png",
      });

    if (uploadError) throw uploadError;

    // 5️⃣ Public URL
    const { data } = supabase.storage
      .from("profile-pics")
      .getPublicUrl(filePath);

    const avatarUrl = `${data.publicUrl}?t=${Date.now()}`;

    // 6️⃣ Update profile
    const { error: dbError } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    if (dbError) throw dbError;

    onClose();
  } catch (err) {
    console.error("Avatar upload failed:", err);
    alert(err.message || "Avatar upload failed");
  } finally {
    setUploading(false);
  }
};