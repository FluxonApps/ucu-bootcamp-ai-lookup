import ImageUpload from '../components/ImageUpload.tsx'

export function ActiveQuery({ processQuery }) {
    // obtain data from user and send to callback
    return (
        <div className={"h-screen grow duration-300 w-[100%]"}>
            <div>
                Send your query here
                <ImageUpload></ImageUpload>
            </div>
            <button onClick={processQuery}>Send</button>
        </div>
    );
}
