import { supabase } from "@/lib/supabase";

export const uploadAvatar = async ({
  imageSrc,
  croppedPixels,
  setUploading,
  onClose,
}) => {
  try {
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

    // ✅ ALWAYS USE SAME PATH
    const filePath = `${user.id}/avatar.png`;

    // 4️⃣ Upload new avatar (upsert replaces old)
    const { error: uploadError } = await supabase.storage
      .from("profile-pics")
      .upload(filePath, compressed, {
        upsert: true,
        contentType: "image/png",
      });

    if (uploadError) throw uploadError;

    // 5️⃣ Get public URL
    const { data } = supabase.storage
      .from("profile-pics")
      .getPublicUrl(filePath);

    // ✅ Cache busting
    const avatarUrl = `${data.publicUrl}?t=${Date.now()}`;

    // 6️⃣ Save URL in profile
    const { error: dbError } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    if (dbError) throw dbError;

    onClose();
  } catch (err) {
    console.error("Avatar upload failed:", err);
    alert("Avatar upload failed");
  } finally {
    setUploading(false);
  }
};
