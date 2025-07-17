import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import {
    query,
    collection,
    where,
    getDocs,
    orderBy,
    DocumentSnapshot
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config.ts';
import { HistoryButton } from './HistoryButton.tsx';
import historyLogo from "../assets/history.png";
import addQuerySign from "../assets/plus.png";

const auth = getAuth();

export type QueryData = {
    image: string;
    timestamp: number;
    userId: string;
}

export type SidebarType = {
    isOpened: boolean;
    activeQueryId: string | null;
    setActiveQueryId: (id: string | null) => void;
    closeBtnCallback: Function;
};

export function Sidebar({
    isOpened,
    activeQueryId,
    setActiveQueryId,
    closeBtnCallback
}: SidebarType) {
    const [user, userLoading] = useAuthState(auth);
    const [historyData, setHistoryData] = useState<DocumentSnapshot<QueryData>[]>([]);

    useEffect(() => {
        if (user) {
            getHistoryData().then(setHistoryData);
        }
    }, [activeQueryId, user]);

    if (userLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    const getHistoryData = async (): Promise<DocumentSnapshot<QueryData>[]> => {
        const dbQueries = collection(db, "queries");
        const q = query(
            dbQueries,
            where("userId", "==", user.uid),
            orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs as DocumentSnapshot<QueryData>[];
    };

    return (
        <div
            className={
                "h-screen duration-300 origin-left fixed left-0 top-0 overflow-x-hidden w-0 overflow-y-hidden z-10 " +
                (isOpened && "w-55 lg:w-100 overflow-y-scroll")
            }
        >
            <div className="min-w-50 flex flex-col">
                <div className="flex justify-between h-22 items-center pl-2 pr-2">
                    <div className="flex gap-1 items-center">
                        <img src={historyLogo} className="h-10" />
                        <h1 className="text-2xl lg:text-3xl -translate-y-0.5">History</h1>
                    </div>
                    <HistoryButton toggleCallback={closeBtnCallback} stateHistoryOpened={true} />
                </div>

                <div
                    onClick={() => setActiveQueryId(null)}
                    className={
                        "flex justify-between items-center min-w-10 border-2 border-(--color-grey-buttons) rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " +
                        (activeQueryId == null && "lg:scale-102 bg-(--color-grey-buttons)")
                    }
                >
                    <img src={addQuerySign} className="w-10 h-10" />
                    <p
                        className={
                            "duration-300 " + (activeQueryId == null && "text-lg lg:text-xl")
                        }
                    >
                        Make new query
                    </p>
                </div>

                {historyData.map((queryDoc) => {
                    const data: QueryData | undefined = queryDoc.data();
                    if (!data)
                    {
                        return "";
                    }
                    const isActive = queryDoc.id === activeQueryId;

                    return (
                        <div
                            key={queryDoc.id}
                            onClick={() => setActiveQueryId(queryDoc.id)}
                            className={
                                "flex justify-between items-center min-w-10 border-2 border-(--color-grey-buttons) rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " +
                                (isActive && "lg:scale-102 bg-(--color-grey-buttons)")
                            }
                        >
                            <img src={data.image} className="w-10 h-10" />
                            <p className={"duration-300 " + (isActive && "text-lg lg:text-xl")}>
                                Query {data.timestamp}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
