import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config.ts';

const auth = getAuth();

export function HistoryQuery({ historyPageId }) {
    const getHistoryPageData = async () => {
        const dbQueries = collection(db, "queries");
        return (await getDocs(query(dbQueries, where("__name__", "==", historyPageId)))).docs[0];
    }
=======
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config.ts';

const auth = getAuth();

export function HistoryQuery({ historyPage, newQueryCallback }) {
  const getHistoryPageData = async () => {
    const dbUser = doc(db, 'users', user?.uid);
    const dbUserData = await getDoc(dbUser);
    return dbUserData.data()?.history[historyPage];
  };
>>>>>>> 25db38e8f179c7e725b3d684a65257df80c997c4

  const [user, userLoading] = useAuthState(auth);
  const [historyPageData, setHistoryPageData] = useState();

<<<<<<< HEAD
    useEffect(() => {
        getHistoryPageData().then(data => {
            setHistoryPageData(data);
        });
    }, [historyPageId]);
=======
  useEffect(() => {
    getHistoryPageData().then((data) => {
      setHistoryPageData(data);
    });
  }, [historyPage]);
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
    return (
        <div className={"h-screen grow duration-300 w-[100%]"}>
            <div>
                History query data page {historyPageData && historyPageData.data().timestamp}
            </div>
        </div>
    );
=======
  return (
    <div>
      <div>History query data page {historyPageData && historyPageData.date}</div>
      <button onClick={newQueryCallback}>Send new query</button>
    </div>
  );
>>>>>>> 25db38e8f179c7e725b3d684a65257df80c997c4
}
