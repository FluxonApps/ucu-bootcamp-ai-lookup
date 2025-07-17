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
import { doc, getDoc, updateDoc, query, collection, where, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config.ts';
import testPicture from '../assets/default-user.jpg';

const auth = getAuth();

const SearchPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);

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
    const dbQueries = collection(db, "queries");
    const addedDocProps = await addDoc(dbQueries, {
      image: testPicture,
      userId: user.uid,
      timestamp: new Date().getTime()
    });
    
    setActiveQuery(addedDocProps.id);
  }

  return (
    <div className={"flex flex-col duration-300 h-screen bg-(--color-white-background) " + (isSidebarOpened && "ml-55 lg:ml-100")}>
      <div className="flex justify-between items-center p-5">
        <div className={isSidebarOpened ? "scale-0" : ""}>
          <HistoryButton toggleCallback={setSidebarOpened} stateOpened={false}></HistoryButton>
        </div>
        <div className="hidden sm:block">
          <GreenLogo></GreenLogo>
        </div>
        <ProfileButton></ProfileButton>
      </div>
      <Sidebar
      isOpened={isSidebarOpened}
      activeQueryId={activeQuery}
      setActiveQueryId={setActiveQuery}
      closeBtnCallback={setSidebarOpened}/>
      {activeQuery == null
      ? <ActiveQuery processQuery={processQuery}></ActiveQuery>
      : <HistoryQuery historyPageId={activeQuery}></HistoryQuery>}
    </div>
  );
};

export default SearchPage;
