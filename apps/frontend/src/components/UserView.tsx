import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router';
import lookitLogoGreen from '/src/assets/lookit-green-logo.png';
import defaultUser from '/src/assets/default_user_green.png';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
const auth = getAuth();

export function UserView() {
  const [user] = useAuthState(auth);

  const [newName, setNewName] = useState(user?.displayName);
  const [newEmail, setNewEmail] = useState(user?.email);
  const [newPassword, setNewPassword] = useState("");
  const [signOut, isSigningOut] = useSignOut(auth);
  const updateUser = () => {
    updateProfile(user, {
      displayName: newName
    }).then(() => {
      updateEmail(user, newEmail).then(() => {
        if (!newPassword)
        {
          alert("Changed data successfully")
          return;
        }
        updatePassword(user, newPassword).then(() => {
          alert("Changed data successfully")
        }).catch(() => {
          alert("Error during changing a password")
        });
      }).catch(() => {
        alert("Error during changing an email")
      });
    }).catch(() => {
      alert("Error during changing a username")
    });
  }
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-[#F3F3F3]"
    >
      <div className="max-w-md w-full mx-auto px-6">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={lookitLogoGreen} alt="Lookit Logo" className="w-10 h-10" />
            <span className="text-2xl font-semibold text-[#4A6144]">
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
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-[#4A6144] focus:bg-[#B9CE59] focus:outline-none text-[#4A6144] bg-white placeholder-[#4A6144]"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-[#4A6144] focus:bg-[#B9CE59] focus:outline-none text-[#4A6144] bg-white placeholder-[#4A6144]"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-[#4A6144] focus:bg-[#B9CE59] focus:outline-none text-[#4A6144] bg-white placeholder-[#4A6144]"
              />
            </div>
          </div>


          <button
            className="w-full py-3 rounded-lg text-white text-lg mb-6 hover:opacity-90 transition-opacity bg-[#4A6144]"
          >
            Change profile info
          </button>


          <div className="flex justify-center items-center gap-4 text-gray-600">
            <Link 
              to="/search" 
              className="hover:text-gray-800 transition-colors underline text-[#4A6144]"
            >
              Back to main page
            </Link>
            <span>|</span>
            <button 
              className="hover:text-gray-800 transition-colors underline text-[#4A6144]"
            >
              <button onClick={signOut} disabled={isSigningOut} className="hover:scale-110 duration-300 ease-in-out underline">Sign out</button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
