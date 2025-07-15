import { Link } from 'react-router';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import ImageUpload from '../components/ImageUpload.tsx'

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
    <div className="flex justify-center">
      <ImageUpload />
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default SearchPage;
