import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config.ts';

const auth = getAuth();

export function HistoryQuery({ historyPage, newQueryCallback }) {
    const getHistoryPageData = async () => {
        const dbUser = doc(db, 'users', user?.uid);
        const dbUserData = await getDoc(dbUser);
        return dbUserData.data()?.history[historyPage];
    }

    const [user, userLoading] = useAuthState(auth);
    const [historyPageData, setHistoryPageData] = useState();

    useEffect(() => {
        getHistoryPageData().then(data => {
            setHistoryPageData(data);
        });
    }, [historyPage]);

    // Do not show page content until auth state is fetched.
    if (userLoading) {
        return null;
    }

    // If user isn't signed in, redirect to auth page.
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div>
            <div>
                History query data page {historyPageData && historyPageData.date}
            </div>
            <button onClick={newQueryCallback}>Send new query</button>
        </div>
    );
}
