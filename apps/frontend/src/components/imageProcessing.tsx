
import ImageUpload from './ImageUpload.tsx'
import { ProfileButton } from './ProfileButton.tsx';
import { useState } from 'react'

type ImageProcessingProps = {
  userName: string | null;
};

export default function ImageProcessing ({userName}:ImageProcessingProps) {
  const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [country, setCountry ] = useState<string|null>(null);

  const handleSearch = (data: { country: string; imageUrl: string }) => {
    setCountry(data.country);
    setImageUrl(data.imageUrl);
  };

  return (
    <>
    {/* TODO change colors to one color style */}
      {imageUrl && country && (
        <div className="fixed inset-0 flex flex-col justify-center items-center">
          <h1 className="p-1 text-4xl font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
            Processing...
          </h1>
        </div>
      )}

      {!imageUrl || !country ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center">
          <ProfileButton />
          <h1 className="p-1 text-4xl font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
            Hello, {userName}!
          </h1>
          <ImageUpload onSearch={handleSearch} />
        </div>
      ) : null}
    </>
  );
};
