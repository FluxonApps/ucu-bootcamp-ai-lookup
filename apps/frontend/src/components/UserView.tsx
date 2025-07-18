import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import defaultUserPicture from '../assets/default-user.jpg';

const auth = getAuth();

export function UserView() {
  const [user] = useAuthState(auth);

  const [newName, setNewName] = useState(user?.displayName);
  const [newEmail, setNewEmail] = useState(user?.email);
  const [newPassword, setNewPassword] = useState("");

  if (!user || !newEmail || !newName)
  {
    alert("Error: name or email is empty");
    return;
  }

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
        <input
          className="border"
          placeholder="New password..."
          value={newPassword}
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
      </div>
      <button className="hover:scale-110 duration-300 ease-in-out bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-3" onClick={updateUser}>
        Update info
      </button>
    </div>
  );
}
