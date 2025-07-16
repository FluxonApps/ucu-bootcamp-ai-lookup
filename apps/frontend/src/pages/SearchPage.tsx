import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import ImageUpload from '../components/ImageUpload.tsx'
import { ProfileButton } from '../components/ProfileButton.tsx';
import { useState } from 'react'

const auth = getAuth();

const SearchPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [country, setCountry ] = useState<string|null>(null);

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return null;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSearch = (data: { country: string; imageUrl: string }) => {
    setCountry(data.country);
    setImageUrl(data.imageUrl);
  };

  return (
    <>
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
            Hello, {user.displayName}!
          </h1>
          <ImageUpload onSearch={handleSearch} />
        </div>
      ) : null}
    </>
  );
};

export default SearchPage;
