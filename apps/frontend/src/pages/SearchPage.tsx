import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import { ProfileButton } from '../components/ProfileButton.tsx';
import { HistoryButton } from '../components/HistoryButton.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { ActiveQuery } from '../components/ActiveQuery.tsx';
import { HistoryQuery } from '../components/HistoryQuery.tsx';
import { GreenLogo } from '../components/GreenLogo.tsx';
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
    <div className={"flex flex-col duration-300 h-screen " + (isSidebarOpened && "ml-100")}>
      <HistoryButton toggleCallback={isOpened => setSidebarOpened(isOpened)} stateOpened={false}></HistoryButton>
      <ProfileButton></ProfileButton>
      <Sidebar
      isOpened={isSidebarOpened}
      activePageId={activePage}
      setActivePageId={setActivePage}
      closeBtnCallback={isOpened => setSidebarOpened(isOpened)}/>
      {activePage == -1
      ? <ActiveQuery processQuery={processQuery}></ActiveQuery>
      : <HistoryQuery historyPageId={activePage}></HistoryQuery>}
    </div>
  );
};

export default SearchPage;
