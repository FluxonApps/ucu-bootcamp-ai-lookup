import { getAuth } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import { UserView } from '../components/UserView'

const auth = getAuth();

const ProfilePage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return null;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <UserView></UserView>
        </div>
        <div className="flex justify-around">
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
