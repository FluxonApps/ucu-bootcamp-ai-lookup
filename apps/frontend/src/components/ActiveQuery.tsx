import ImageProcessing from '../components/imageProcessing.tsx'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { QueryData } from '../pages/SearchPage.tsx'
import { Navigate } from 'react-router';

export type ActiveQueryType = {
    processQuery: (queryData: QueryData) => Promise<void>;
};

const auth = getAuth();

export function ActiveQuery({ processQuery }: ActiveQueryType) {
    // obtain data from user and send to callback
    const [user, userLoading] = useAuthState(auth);

    if (userLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className={"h-screen grow duration-300 w-[100%]"}>
            <ImageProcessing userName={user?.displayName} processQuery={processQuery}/>
        </div>
    );
}
