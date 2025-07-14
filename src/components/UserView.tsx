import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import defaultUserPicture from '../assets/default-logo.jpg';

const auth = getAuth();

export function UserView() {
  const [user] = useAuthState(auth);

  const [newName, setNewName] = useState(user?.displayName);
  const [newEmail, setNewEmail] = useState(user?.email);

  const updateUser = () => {
    const name_promise = updateProfile(user, {
      displayName: newName
    });
    const email_promise = updateEmail(user, newEmail);
    Promise.all([name_promise, email_promise]).then(() => {
      alert("Profile data changed successfully")
    });
  }

  return (
    <div className="flex flex-col gap-6 border border-gray-200 px-6 py-8 items-center">
      <div className="flex flex-col gap-3 items-center">
        <div className="w-40 h-40">
          <img className="w-40 h-40 absolute rounded-full" src={defaultUserPicture}/>
          <input type="file" accept="image/*" className="bg-black opacity-0 w-40 h-40 absolute rounded-full hover:opacity-10 duration-300 ease-in-out flex items-center justify-center cursor-pointer"/>
        </div>
        <input
          className="border"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          placeholder="Name..."
        />
        <input
          className="border"
          placeholder="Email..."
          value={newEmail}
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
      </div>
      <button className="w-[75%] bg-green-500 px-2 py-1 hover:scale-110 duration-300 ease-in-out" onClick={updateUser}>
        Update info
      </button>
    </div>
  );
}
