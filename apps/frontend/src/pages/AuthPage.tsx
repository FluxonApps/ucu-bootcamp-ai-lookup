'use client'
import { useEffect } from 'react';
import { getAuth, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';


import { db, app } from '../firebase.config.ts';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

const AuthPage = () => {
  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, signInLoading] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, signUpLoading] = useCreateUserWithEmailAndPassword(auth);
  const [viewPassword, setViewPass] = useState(false)

  const [showSignIn, setShowSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchAuthMode = () => {
    setShowSignIn((prevState) => !prevState);
    setEmail('');
    setPassword('');
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      alert('Successfully signed in!');
    } catch (e) {
      console.error(e);
      alert('Failed to sign in. Please, try again.');
    }
  };

  const signUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      // Save user to database.
      updateProfile(res.user, {
        displayName: username
      });
      const userDocRef = doc(db, 'users', res.user.uid);
      await setDoc(userDocRef, { email });

      alert('Successfully signed up!');
    } catch (e) {
      console.error(e);
      alert('Failed to create a new user. Please, try again.');
    }
  };

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showSignIn) {
      await signIn();
    } else {
      await signUp();
    }
  };

  const handleGoogleAuth = async () => {
    await signInWithPopup(auth, provider)
  };
  


  const isMobile = useIsMobile();
  if (user) {
    return <Navigate to="/search" replace />;
  }

  if (isMobile) {
    return (
      <div className="min-h-screen">
        <div className="max-w-md mx-auto pt-8 px-6">
          <div className="rounded-2xl p-8 text-white mb-8"
            style={{
              background: 'linear-gradient(135deg, #334A40 0%, #617749 50%, #C0D55B 100%)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src="src/assets/logowhite.png" alt="Search" className="w-12 h-12" />
              <div>
                <span className="text-2xl font-bold">Welcome to </span>
                <span className="bg-white px-3 py-1 rounded-lg text-2xl font-bold" style={{ color: '#4A6144' }}>
                  Lookit
                </span>
              </div>
            </div>
            <p className="text-lg mb-6 opacity-90">
              Find a better price for a product online - instantly.
            </p>
            <h2 className="text-2xl font-bold mb-4 leading-tight">
              Our app searches for products related to your image across the web.
            </h2>
            <p className="text-base opacity-90">
              Whether it's fashion, furniture, or gadgets - we've got you covered.
            </p>
          </div>
          <form onSubmit={handleAuth}>
            <h2 className="text-3xl font-bold text-gray-900">
              {showSignIn ? 'Welcome back!' : 'Create an account'}
            </h2>
            <p className="mb-6" style={{ color: '#ACC1A4' }}>
              {showSignIn ? 'Create a new account? ' : 'Already have an account? '}
              <span className="text-[#4A6144] underline cursor-pointer" onClick={switchAuthMode}>
                {showSignIn ? 'Sign up' : "Log in"}
              </span>
            </p>
          <div className="space-y-4">
            {!showSignIn && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                className="reginput w-full"
                minLength={6}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="reginput w-full"
              required
            />
            <div className="relative">
              <input
                type={viewPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="reginput w-full"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setViewPass(!viewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                <img src={`src/assets/eye-${!viewPassword ? "show" : "hide"}.png`} alt="Toggle password" className="w-6 h-6" />
              </button>
            </div> 
            <button
              type="submit"
              className=" bg-[#4A6144] text-white rounded-[8px] h-[50px] py-2 font-medium hover:bg-[#546B4E] active:bg-[#4C5C48] w-full"
            >
              {!showSignIn ? 'Register' : 'Login'}
            </button>
          </div>
          <hr className="my-6 border-t" style={{ borderColor: '#ACC1A4', borderWidth: 1 }} />
          <div className="mt-6">
            <div
              onClick={handleGoogleAuth}
              className="bg-[#4A6144] text-white rounded-[8px] h-[50px] py-2 font-medium hover:bg-[#546B4E] active:bg-[#4C5C48] flex justify-center items-center gap-2"
            >
              <img src="src/assets/google_icon.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </div>
          </div>
        </form>
        <div className='h-5'></div>
      </div>
    </div>
  );
}                       
  return (
      <div className="flex h-full bg-[#F3F3F3]">
        <div className="w-full backgroundgrad bg-contain bg-no-repeat relative flex flex-col-reverse">

          <div className='flex flex-col pl-6 py-6 bg-contain m-4 bg-no-repeat max-[1214px]:bg-white rounded-[25px] min-[1214px]:bg-[url(../src/assets/Rectangle10.png)]'>
            <div className='flex items-center gap-1'>
              <img src='src/assets/logo.png' className='w-10 h-10' />
              <h2 className='text-[#4A6144] text-4xl font-medium'>Welcome to  <span className='bg-[#4A6144] pt-1 pb-0.5 px-1 pr-16 rounded-lg text-white'>Lookit</span></h2>
            </div>
            <span className='mt-2 text-md text-[#4A6144] font-medium'>Find a better price for a product online - instantly.</span>
            <span className='mt-4 text-xl min-[1354px]:text-2xl min-[1644px]:w-[50%] w-[65%] text-[#4A6144] font-medium'>Our app searches for products related to your image across the web.</span>
            <span className='mt-10 text-sm min-[1184px]:text-md w-[65%] text-[#4A6144] font-medium'>Whether it's fashion, furniture, or gadgets – we've got you covered.</span>
          </div>

          <div className='flex mb-auto text-white text-3xl font-medium items-center mt-4 ml-4'>
            <img src='../src/assets/logowhite.png' className='object-contain w-10' />
            <span>lookit</span>
          </div>

        </div>

          <form className="flex items-center" onSubmit={handleAuth}>
            <div className="flex flex-col gap-4 w-[390px] xl:w-[450px] rounded-md ml-6 pr-16 py-8">
              <h2 className="text-[42px] font-semibold tracking-tight text-[#2E2E2E]">{showSignIn ? 'Welcome back!' : 'Create an account'}</h2>
              <span className='text-[#ACC1A4] text-md '>{showSignIn ? 'Create a new account? ' : 'Already have an account? '}<span className='text-[#4A6144] underline cursor-pointer'  onClick={switchAuthMode} >{showSignIn ? 'Sign up' : "Log in"}</span></span>
              {!showSignIn && <input
                className="reginput"
                placeholder="Username"
                type="text"
                name="username"
                onChange={handleUsernameChange}
                value={username}
                minLength={6}
                required
              />}
              <input
                className="reginput"
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleEmailChange}
                value={email}
                required
              />
              <div className='w-full relative'>
                <img className='w-6 right-4 align-middle absolute cursor-pointer top-[14px]' onClick={() => {setViewPass(!viewPassword)}} src={`src/assets/eye-${!viewPassword ? "show" : "hide"}.png`} />
                <input
                  className="reginput w-full"
                  placeholder="Password"
                  type={!viewPassword ? "password" : "text"}
                  name="password"
                  onChange={handlePasswordChange}
                  value={password}
                  minLength={6}
                  required
                  />
              </div>
              <button type="submit" className="mt-22 bg-[#4A6144] text-white rounded-[8px] h-[50px] py-2 font-medium hover:bg-[#546B4E] active:bg-[#4C5C48]">
                {!showSignIn ? 'Register' : 'Login'}
              </button>
              <hr className='border-[#4A6144]' />

              <div onClick={handleGoogleAuth} className="cursor-pointers bg-[#4A6144] text-white rounded-[8px] h-[50px] py-2 font-medium flex justify-center items-center gap-2 hover:bg-[#546B4E] active:bg-[#4C5C48]">
                <img src='src\assets\google_icon.png' className='object-contain w-8'/>
                <span>Continue with Google</span>
              </div>
            </div>
          </form>
      </div>
  );
};

        
export default AuthPage;
