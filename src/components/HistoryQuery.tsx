export function HistoryQuery({ queryData, newQueryCallback }) {
    return (
        <div>
            <div>
                History query data page {queryData.date}
            </div>
            <button onClick={newQueryCallback}>Send new query</button>
        </div>
    );
}
