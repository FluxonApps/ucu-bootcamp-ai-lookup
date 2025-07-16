import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import ImageUpload from '../components/ImageUpload.tsx'
import { ProfileButton } from '../components/ProfileButton.tsx';

const auth = getAuth();

const SearchPage = () => {
  const [user, userLoading] = useAuthState(auth);

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return null;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="justify-center">
      <ProfileButton></ProfileButton>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <p className='flex w-screen'>1</p>
      <ImageUpload></ImageUpload>
    </div>
  );
};

export default SearchPage;
