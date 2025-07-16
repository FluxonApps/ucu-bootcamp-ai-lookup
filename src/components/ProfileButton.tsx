import { Link } from 'react-router';

import gradientBackground from '../assets/gradient-background.png';
import transparentDefaultUserPicture from '../assets/transparent-default-user.png';

export function ProfileButton() {
    return (
        <Link to="/profile">
            <div className="w-16 h-16 cursor-pointer hover:scale-110 duration-300 fixed top-5 right-5">
                <img className="w-10 h-10 rounded-2xl z-10 top-3 right-3 absolute" src={transparentDefaultUserPicture}/>
            </div>
        </Link>
    );
}
