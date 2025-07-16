import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from '../../firebase.config.ts';

const auth = getAuth();

export function Sidebar({ isOpened, activePage, setActivePage }) {
    const getHistoryData = async () => {
        const dbUser = doc(db, 'users', user?.uid);
        const dbUserData = await getDoc(dbUser);
        console.log(dbUserData.data()?.history);
        
        return dbUserData.data()?.history;
    }

    const [user, userLoading] = useAuthState(auth);
    const [historyData, setHistoryData] = useState({});

    useEffect(() => {
        getHistoryData().then(data => {
            setHistoryData(data ? data : {});
        });
    }, [activePage]);

    // Do not show page content until auth state is fetched.
    if (userLoading) {
        return null;
    }

    // If user isn't signed in, redirect to auth page.
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className={"h-screen bg-amber-50 duration-300 origin-left fixed l-0 overflow-x-hidden w-0 overflow-y-hidden " + (isOpened && "w-100 border-r-2 overflow-y-scroll")}>
            <div className="min-w-50 flex flex-col-reverse">
                {Object.entries(historyData).sort().map((query, i) => {
                    return (
                        <div key={i} onClick={() => {
                            setActivePage(query[0]);
                        }} className={"flex justify-between items-center min-w-10 border-2 rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " + (query[0] == activePage && "scale-102")}>
                            <img src={query[1].image} className="w-10 h-10"></img>
                            <p className={"duration-300 " + (query[0] == activePage && "text-xl")}>{query[1].date}</p>
                        </div>
                    )
                })}
                <h1 className="text-3xl flex items-center justify-center h-22 ml-1">History</h1>
            </div>
        </div>
    );
}
