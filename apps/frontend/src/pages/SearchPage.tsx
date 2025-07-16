import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import ImageUpload from '../components/ImageUpload.tsx';
import { ProfileButton } from '../components/ProfileButton.tsx';
import { HistoryButton } from '../components/HistoryButton.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { ActiveQuery } from '../components/ActiveQuery.tsx';
import { HistoryQuery } from '../components/HistoryQuery.tsx';
import { useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config.ts';
import testPicture from '../assets/default-user.jpg';

const auth = getAuth();

const SearchPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const [activePage, setActivePage] = useState(-1);

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return null;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const processQuery = async queryData => {
    // here queryData must be processed and links to needed images must be saved
    const dbUser = doc(db, 'users', user?.uid);
    const dbUserData = await getDoc(dbUser);
    const newId = new Date().getTime();
    let historyObj = dbUserData.data()?.history;
    historyObj[newId] = {
      date: "Query " + (Object.entries(historyObj).length + 1),
      image: testPicture
    }
    await updateDoc(dbUser, { history: historyObj });
    setActivePage(newId);
  }

  return (
    <div className="justify-center">
      <ProfileButton></ProfileButton>
      <HistoryButton callback={isOpened => setSidebarOpened(isOpened)}></HistoryButton>
      <Sidebar isOpened={isSidebarOpened} history={history} activePage={activePage} setActivePage={setActivePage}></Sidebar>
      {activePage == -1
      ? <ActiveQuery processQuery={processQuery}></ActiveQuery>
      : <HistoryQuery historyPage={activePage} newQueryCallback={() => setActivePage(-1)}></HistoryQuery>}
      <ImageUpload></ImageUpload>
    </div>
  );
};

export default SearchPage;
