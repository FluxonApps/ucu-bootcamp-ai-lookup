import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import ImageProcessing from '../components/imageProcessing.tsx';

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
    <ImageProcessing userName={user.displayName} />
  );
};

export default SearchPage;
