import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import { Sidebar } from '../components/Sidebar.tsx';
import { ActiveQuery } from '../components/ActiveQuery.tsx';
import { HistoryQuery } from '../components/HistoryQuery.tsx';
import { Header } from '../components/Header.tsx';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config.ts';
import { ResultItem } from '../components/imageProcessing.tsx'

export type AnswerData = {
  similarListings: Array<ResultItem>
}

export type QueryData = {
  originalImg: string,
  obtainedData: Object
}

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

  const processQuery = async (queryData: QueryData) => {
    console.log(queryData);
    
    // here queryData must be processed and links to needed images must be saved
    const dbQueries = collection(db, "queries");
    const addedDocProps = await addDoc(dbQueries, {
      image: queryData?.originalImg,
      userId: user.uid,
      timestamp: new Date().getTime(),
      obtainedData: queryData?.obtainedData
    });
    
    setActiveQuery(addedDocProps.id);
  }

  return (
    <div>
      <Sidebar
      isOpened={isSidebarOpened}
      activeQueryId={activeQuery}
      setActiveQueryId={setActiveQuery}
      closeBtnCallback={setSidebarOpened}/>
      <div className={"flex flex-col duration-300 h-screen bg-(--color-white-background) " + (isSidebarOpened && "hidden lg:ml-100 lg:block")}>
        <Header isSidebarOpened={isSidebarOpened} setSidebarOpened={setSidebarOpened}></Header>
        {activeQuery == null
        ? <ActiveQuery processQuery={processQuery}></ActiveQuery>
        : <HistoryQuery queryId={activeQuery}></HistoryQuery>}
      </div>
    </div>
  );
};

export default SearchPage;
