import historyButtonOpen from '../assets/history.png';
import historyButtonClose from '../assets/close.png';

export type HistoryButtonType = {
    toggleCallback: Function;
    stateHistoryOpened: boolean;
};

export function HistoryButton({ toggleCallback, stateHistoryOpened }: HistoryButtonType) {
    return (
        <div onClick={() => {
            toggleCallback(!stateHistoryOpened)
        }} className="w-8 h-8 cursor-pointer hover:scale-110 duration-300">
            <img className="w-8 h-8 hover:scale-110 ease-in-out duration-300" src={stateHistoryOpened ? historyButtonClose : historyButtonOpen}/>
        </div>
    );
}
