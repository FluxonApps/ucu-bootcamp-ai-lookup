import { Link } from 'react-router';

import accountCircle from '../assets/account-circle.png';

export function ProfileButton() {
    return (
        <Link to="/profile">
            <div className="cursor-pointer hover:scale-110 duration-300 relative">
                <img className="w-10 h-10 rounded-full bg-(--color-dark-green)"/>
                <img className="w-8 h-8 rounded-2xl z-10 top-1 left-1 absolute" src={accountCircle}/>
            </div>
        </Link>
    );
}
