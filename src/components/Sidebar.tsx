export function Sidebar({ isOpened, history, activePage, setActivePage }) {
    return (
        <div className={"h-screen bg-amber-50 duration-300 origin-left fixed l-0 overflow-x-hidden w-0 overflow-y-hidden " + (isOpened && "w-100 border-r-2 overflow-y-scroll")}>
            <div className="min-w-50 flex flex-col-reverse">
                {history.map((query, i) => {
                    return (
                        <div key={i} onClick={() => {
                            setActivePage(i);
                        }} className={"flex justify-between items-center min-w-10 border-2 rounded-lg p-2 hover:scale-102 duration-300 cursor-pointer m-2 " + (i == activePage && "scale-102")}>
                            <img src={query.image} className="w-10 h-10"></img>
                            <p className={"duration-300 " + (i == activePage && "text-xl")}>{query.date}</p>
                        </div>
                    )
                })}
                <h1 className="text-3xl flex items-center justify-center h-22 ml-1">History</h1>
            </div>
        </div>
    );
}
