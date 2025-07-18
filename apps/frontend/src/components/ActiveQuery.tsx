import ImageProcessing from '../components/imageProcessing.tsx'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export type ActiveQueryType = {
    processQuery: (imageUrl: string) => void;
};

const auth = getAuth();

export function ActiveQuery({ processQuery }: ActiveQueryType) {
    // obtain data from user and send to callback
    const [user, userLoading] = useAuthState(auth);

    return (
        <div className={"h-screen grow duration-300 w-[100%]"}>
            <ImageProcessing userName={user.displayName} processQuery={processQuery}/>
        </div>
    );
}
