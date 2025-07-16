import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config.ts';

const auth = getAuth();

export function HistoryQuery({ historyPageId }) {
    const getHistoryPageData = async () => {
        const dbQueries = collection(db, "queries");
        return (await getDocs(query(dbQueries, where("__name__", "==", historyPageId)))).docs[0];
    }

    const [user, userLoading] = useAuthState(auth);
    const [historyPageData, setHistoryPageData] = useState();

    useEffect(() => {
        getHistoryPageData().then(data => {
            setHistoryPageData(data);
        });
    }, [historyPageId]);

    // Do not show page content until auth state is fetched.
    if (userLoading) {
        return null;
    }

    // If user isn't signed in, redirect to auth page.
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className={"h-screen grow duration-300 w-[100%]"}>
            <div>
                History query data page {historyPageData && historyPageData.data().timestamp}
            </div>
        </div>
    );
}
