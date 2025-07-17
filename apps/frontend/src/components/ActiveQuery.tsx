import ImageUpload from '../components/ImageUpload.tsx'

export type ActiveQueryType = {
    processQuery: (imageUrl: string) => void;
};

export function ActiveQuery({ processQuery }: ActiveQueryType) {
    // obtain data from user and send to callback
    return (
        <div className={"h-screen grow duration-300 w-[100%]"}>
            <p>Send your query here</p>
            <ImageUpload onUpload={processQuery}></ImageUpload>
        </div>
    );
}
