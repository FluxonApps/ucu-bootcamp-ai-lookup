import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import ImageUpload from '../components/ImageUpload.tsx'
import { ProfileButton } from '../components/ProfileButton.tsx';
import { HistoryButton } from '../components/HistoryButton.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { ActiveQuery } from '../components/ActiveQuery.tsx';
import { HistoryQuery } from '../components/HistoryQuery.tsx';
import { useState, useEffect, useRef } from 'react';
import testPicture from '../assets/default-user.jpg';

const auth = getAuth();

const SearchPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const [activePage, setActivePage] = useState(-1);
  const [history, setHistory] = useState([]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current)
    {
      firstUpdate.current = false;
      return;
    }

    // load history from db here
    const historyPreview = [];
    for (let i = 1; i <= 100; ++i) {
      historyPreview.push({
          date: "Query " + i,
          image: testPicture
      });
    }
    setHistory(historyPreview);
  }, [userLoading])

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return null;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const processQuery = queryData => {
    // main logic to process the query
    setActivePage(history.length)
    setHistory(history.concat([{
      date: "Query " + (history.length + 1),
      image: testPicture
    }]));
  }

  return (
    <div className="justify-center">
      <ProfileButton></ProfileButton>
      <HistoryButton callback={isOpened => setSidebarOpened(isOpened)}></HistoryButton>
      <Sidebar isOpened={isSidebarOpened} history={history} activePage={activePage} setActivePage={setActivePage}></Sidebar>
      {activePage == -1
      ? <ActiveQuery processQuery={processQuery}></ActiveQuery>
      : <HistoryQuery queryData={history[activePage]} newQueryCallback={() => setActivePage(-1)}></HistoryQuery>}
      <ImageUpload></ImageUpload>
    </div>
  );
};

export default SearchPage;
