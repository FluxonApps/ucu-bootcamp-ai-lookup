import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

type ImageUploadProps = {
  onUpload: (imageUrl: string) => void;
};

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");
  const storage = getStorage();

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    onUpload(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const fileName = `${Date.now()}_${selectedFile.name}`;
    const storageRef = ref(storage, `uploads/${fileName}`);
    await uploadBytes(storageRef, selectedFile);
    const downloadURL = await getDownloadURL(storageRef);
    setPreview(downloadURL);
    console.log("Uploaded and available at:", downloadURL);
  };

  return (
    <div>
      <button
        className=" px-6 py-2 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#c0c0c0] transition"
        onClick={() => inputRef.current?.click()}
      >
        Insert picture
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        ref={inputRef}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
