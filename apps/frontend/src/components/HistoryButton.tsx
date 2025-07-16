
import historyButtonOpen from '../assets/history.png';
import historyButtonClose from '../assets/close.png';

export function HistoryButton({ toggleCallback, stateOpened }) {
    return (
        <div onClick={() => {
            toggleCallback(!stateOpened)
        }} className="w-10 h-10 cursor-pointer hover:scale-110 duration-300">
            <img className="w-10 h-10 hover:scale-110 ease-in-out duration-300" src={stateOpened ? historyButtonClose : historyButtonOpen}/>
        </div>
    );
}
