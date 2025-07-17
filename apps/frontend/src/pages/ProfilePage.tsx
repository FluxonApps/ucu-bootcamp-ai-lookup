import React, { useState } from 'react';
import { Link } from 'react-router';
import { getAuth } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import lookitLogoGreen from '/src/assets/lookit-green-logo.png';
import defaultUser from '/src/assets/default_user_green.png';

const auth = getAuth();

const ProfilePage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);
  
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = () => {
    console.log('Profile updated:', formData);
  };

  const handleSignOut = () => {
    signOut();
  };

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return null;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center" 
      style={{ backgroundColor: '#F3F3F3'}}
    >
      <div className="max-w-md w-full mx-auto px-6">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={lookitLogoGreen} alt="Lookit Logo" className="w-10 h-10" />
            <span className="text-2xl font-semibold" style={{ color: '#4A6144' }}>
            lookit
            </span>
          </div>
        </div>

        <div className="bg-[#D9D9D9] rounded-lg p-8 shadow-sm">
          <div className="flex justify-center mb-8">
            <img src={defaultUser} alt="User" className="w-24 h-24 object-cover rounded-lg" />
          </div>
          <div className="space-y-4 mb-8">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-[#4A6144] focus:bg-[#B9CE59] focus:outline-none text-gray-700 bg-white placeholder-[#4A6144]"
                style={{ color: '#4A6144'}}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-[#4A6144] focus:bg-[#B9CE59] focus:outline-none text-gray-700 bg-white placeholder-[#4A6144]"
                style={{ color: '#4A6144' }}
                readOnly
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-[#4A6144] focus:bg-[#B9CE59] focus:outline-none text-gray-700 bg-white placeholder-[#4A6144]"
                style={{ color: '#4A6144' }}
              />
            </div>
          </div>


          <button
            onClick={handleUpdateProfile}
            className="w-full py-3 rounded-lg text-white text-lg mb-6 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#4A6144' }}
          >
            Change profile info
          </button>


          <div className="flex justify-center items-center gap-4 text-gray-600">
            <Link 
              to="/search" 
              className="hover:text-gray-800 transition-colors underline"
              style={{ color: '#4A6144' }}
            >
              Back to main page
            </Link>
            <span>|</span>
            <button 
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="hover:text-gray-800 transition-colors underline"
              style={{ color: '#4A6144' }}
            >
              {isSigningOut ? 'Signing out...' : 'Log out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
