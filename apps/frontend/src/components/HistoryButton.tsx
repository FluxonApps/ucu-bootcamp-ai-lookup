import historyButtonOpen from '../assets/history-button-open.png';
import historyButtonClose from '../assets/history-button-close.png';
import { useState } from 'react';

export function HistoryButton({ callback }) {
    const [isOpened, setOpened] = useState(false)

    return (
        <div onClick={() => {
            callback(!isOpened)
            setOpened(!isOpened)
        }} className="w-10 h-10 cursor-pointer hover:scale-110 duration-300 fixed top-7 left-7 z-10">
            <img className="w-10 h-10 hover:scale-110 ease-in-out duration-300" src={isOpened ? historyButtonClose : historyButtonOpen}/>
        </div>
    );
}
