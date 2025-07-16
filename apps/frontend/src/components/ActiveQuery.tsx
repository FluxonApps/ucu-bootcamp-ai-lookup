export function ActiveQuery({ processQuery }) {
    // obtain data from user and send to callback
    return (
        <div>
            <div>
                Send your query here
            </div>
            <button onClick={processQuery}>Send</button>
        </div>
    );
}
