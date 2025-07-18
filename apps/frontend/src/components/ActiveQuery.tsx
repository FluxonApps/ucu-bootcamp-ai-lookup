import ImageProcessing from '../components/imageProcessing.tsx'
import { QueryData } from '../pages/SearchPage.tsx'

export type ActiveQueryType = {
    processQuery: (queryData: QueryData) => Promise<void>;
};

export function ActiveQuery({ processQuery }: ActiveQueryType) {
    return (
        <div className={"h-screen grow duration-300 w-[100%]"}>
            <ImageProcessing processQuery={processQuery}/>
        </div>
    );
}
