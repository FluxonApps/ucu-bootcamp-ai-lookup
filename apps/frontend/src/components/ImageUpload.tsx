import { useRef, useState, ChangeEvent } from 'react';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

type ImageUploadProps = {
  onUpload: (imageUrl: string) => void;
};

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `uploads/${fileName}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      onUpload(downloadURL); // ✅ notify parent
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button
        className="px-6 py-2 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#c0c0c0] transition"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Insert picture"}
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        ref={inputRef}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
