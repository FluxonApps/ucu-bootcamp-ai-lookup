import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from '../../firebase.config.ts';
import { HistoryButton } from './HistoryButton.tsx';
import historyLogo from "../assets/history.png"
import addQuerySign from "../assets/plus.png"

const auth = getAuth();

export function Sidebar({ isOpened, activePageId, setActivePageId, closeBtnCallback }) {
    const [user, userLoading] = useAuthState(auth);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        getHistoryData().then(setHistoryData);
    }, [activePageId]);

     // Do not show page content until auth state is fetched.
    if (userLoading) {
        return null;
    }

    // If user isn't signed in, redirect to auth page.
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    const getHistoryData = async () => {
        const dbQueries = collection(db, "queries");
        const userHistorySnapshot = await getDocs(query(dbQueries, where("userId", "==", user.uid)));
        return userHistorySnapshot.docs.sort((a, b) => a.data().timestamp < b.data().timestamp ? -1 : 1);
    }

    return (
        <div className={"h-screen bg-white duration-300 origin-left fixed left-0 top-0 overflow-x-hidden w-0 overflow-y-hidden z-10 " + (isOpened && "w-100 overflow-y-scroll")}>
            <div className="min-w-50 flex flex-col-reverse">
                {historyData.map(query => {
                    return (
                        <div key={query.id} onClick={() => {
                            setActivePageId(query.id);
                        }} className={"flex justify-between items-center min-w-10 border-2 border-(--color-gray) rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " + (query.id == activePageId && "scale-102 bg-[#D9D9D9]")}>
                            <img src={query.data().image} className="w-10 h-10"></img>
                            <p className={"duration-300 " + (query.id == activePageId && "text-xl")}>Query {query.data().timestamp}</p>
                        </div>
                    )
                })}
                <div onClick={() => {
                    setActivePageId(-1);
                }} className={"flex justify-between items-center min-w-10 border-2 border-(--color-gray) rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " + (activePageId == -1 && "scale-102 bg-[#D9D9D9]")}>
                    <img src={addQuerySign} className="w-10 h-10"></img>
                    <p className={"duration-300 " + (activePageId == -1 && "text-xl")}>Make new query</p>
                </div>
                <div className="flex justify-between h-22 items-center pl-2 pr-2">
                    <div className="flex gap-1 items-center">
                        <img src={historyLogo} className="h-10"></img>
                        <h1 className="text-3xl -translate-y-0.5">History</h1>
                    </div>
                    <HistoryButton toggleCallback={closeBtnCallback} stateOpened={true}></HistoryButton>
                </div>
            </div>
        </div>
    );
}
