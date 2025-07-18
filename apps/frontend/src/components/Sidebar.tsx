import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    query,
    collection,
    where,
    orderBy,
    DocumentData
} from 'firebase/firestore';
import { db } from '../firebase.config.ts';
import { HistoryButton } from './HistoryButton.tsx';
import historyLogo from "../assets/history.png";
import addQuerySign from "../assets/plus.png";

const auth = getAuth();

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

    const queryCollectionRef = collection(db, "queries");
    const [historyData] = useCollection(query(
        queryCollectionRef,
        where("userId", "==", user?.uid),
        orderBy("timestamp", "desc")
    ));

    if (userLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    const showTitleSymbs: number = 25;

    return (
        <div
            className={
                "h-screen duration-300 origin-left fixed left-0 top-0 overflow-x-hidden w-0 overflow-y-hidden z-10 " +
                (isOpened && "w-55 lg:w-100 overflow-y-scroll")
            }
        >
            <div className="min-w-50 flex flex-col h-[100%]">
                <div className="flex justify-between h-22 items-center pl-2 pr-2">
                    <div className="flex gap-2 items-center">
                        <img src={historyLogo} className="h-8" />
                        <h1 className="text-xl lg:text-xl -translate-y-0.5">History</h1>
                    </div>
                    <HistoryButton toggleCallback={closeBtnCallback} stateHistoryOpened={true} />
                </div>

                {historyData?.docs?.length
                ? <div
                    onClick={() => setActiveQueryId(null)}
                    className={
                        "flex justify-between items-center min-w-10 border-2 border-(--color-grey-buttons) rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " +
                        (activeQueryId == null && "lg:scale-102 bg-(--color-grey-buttons)")
                    }
                >
                    <img src={addQuerySign} className="w-10 h-10" />
                    <p
                        className={
                            "duration-300 text-center " + (activeQueryId == null && "text-lg lg:text-xl")
                        }
                    >
                        Make new query
                    </p>
                </div>
                : <div className='text-center grow flex items-center'>
                    <p className='grow'>Create your first query!</p>
                </div>}

                {historyData && historyData.docs.map(queryDoc => {
                    const data: DocumentData | undefined = queryDoc.data();
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
                            <p className={"duration-300 text-center " + (isActive && "text-lg lg:text-xl")}>
                                {data.obtainedData.similarListings[0].title.length > showTitleSymbs
                                ? data.obtainedData.similarListings[0].title.substring(0, showTitleSymbs) + "..."
                                : data.obtainedData.similarListings[0].title}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
