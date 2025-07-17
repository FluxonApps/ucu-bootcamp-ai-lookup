import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
<<<<<<< HEAD
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from '../../firebase.config.ts';
import { HistoryButton } from './HistoryButton.tsx';
import historyLogo from "../assets/history.png"
import addQuerySign from "../assets/plus.png"

const auth = getAuth();

export function Sidebar({ isOpened, activeQueryId, setActiveQueryId, closeBtnCallback }) {
    const [user, userLoading] = useAuthState(auth);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        getHistoryData().then(setHistoryData);
    }, [activeQueryId]);
=======
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config.ts';

const auth = getAuth();

export function Sidebar({ isOpened, activePage, setActivePage }) {
  const getHistoryData = async () => {
    const dbUser = doc(db, 'users', user?.uid);
    const dbUserData = await getDoc(dbUser);
    return dbUserData.data()?.history;
  };

  const [user, userLoading] = useAuthState(auth);
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    getHistoryData().then((data) => {
      setHistoryData(data ? data : {});
    });
  }, [activePage]);
>>>>>>> 25db38e8f179c7e725b3d684a65257df80c997c4

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return null;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

<<<<<<< HEAD
    const getHistoryData = async () => {
        const dbQueries = collection(db, "queries");
        return (await getDocs(query(dbQueries, where("userId", "==", user.uid), orderBy("timestamp", "desc")))).docs;
    }

    return (
        <div className={"h-screen duration-300 origin-left fixed left-0 top-0 overflow-x-hidden w-0 overflow-y-hidden z-10 " + (isOpened && "w-55 lg:w-100 overflow-y-scroll")}>
            <div className="min-w-50 flex flex-col">
                <div className="flex justify-between h-22 items-center pl-2 pr-2">
                    <div className="flex gap-1 items-center">
                        <img src={historyLogo} className="h-10"></img>
                        <h1 className="text-2xl lg:text-3xl -translate-y-0.5">History</h1>
                    </div>
                    <HistoryButton toggleCallback={closeBtnCallback} stateOpened={true}></HistoryButton>
                </div>
                <div onClick={() => {
                    setActiveQueryId(null);
                }} className={"flex justify-between items-center min-w-10 border-2 border-(--color-gray) rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " + (activeQueryId == null && "lg:scale-102 bg-(--color-gray)")}>
                    <img src={addQuerySign} className="w-10 h-10"></img>
                    <p className={"duration-300 " + (activeQueryId == null && "text-lg lg:text-xl")}>Make new query</p>
                </div>
                {historyData.map(query => {
                    return (
                        <div key={query.id} onClick={() => {
                            setActiveQueryId(query.id);
                        }} className={"flex justify-between items-center min-w-10 border-2 border-(--color-gray) rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " + (query.id == activeQueryId && "lg:scale-102 bg-(--color-gray)")}>
                            <img src={query.data().image} className="w-10 h-10"></img>
                            <p className={"duration-300 " + (query.id == activeQueryId && "text-lg lg:text-xl")}>Query {query.data().timestamp}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
=======
  return (
    <div
      className={
        'h-screen bg-amber-50 duration-300 origin-left fixed l-0 overflow-x-hidden w-0 overflow-y-hidden ' +
        (isOpened && 'w-100 border-r-2 overflow-y-scroll')
      }
    >
      <div className="min-w-50 flex flex-col-reverse">
        {Object.entries(historyData)
          .sort()
          .map((query, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setActivePage(query[0]);
                }}
                className={
                  'flex justify-between items-center min-w-10 border-2 rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 ' +
                  (query[0] == activePage && 'scale-102')
                }
              >
                <img src={query[1].image} className="w-10 h-10"></img>
                <p className={'duration-300 ' + (query[0] == activePage && 'text-xl')}>{query[1].date}</p>
              </div>
            );
          })}
        <h1 className="text-3xl flex items-center justify-center h-22 ml-1">History</h1>
      </div>
    </div>
  );
>>>>>>> 25db38e8f179c7e725b3d684a65257df80c997c4
}
