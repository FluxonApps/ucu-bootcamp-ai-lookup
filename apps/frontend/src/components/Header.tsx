import { GreenLogo } from '../components/GreenLogo.tsx';
import { ProfileButton } from '../components/ProfileButton.tsx';
import { HistoryButton } from '../components/HistoryButton.tsx';

export function Header({ isSidebarOpened, setSidebarOpened }) {
    return (
        <div className="flex justify-between items-center p-5">
            <div className={isSidebarOpened ? "scale-0" : ""}>
                <HistoryButton toggleCallback={setSidebarOpened} stateOpened={false}></HistoryButton>
            </div>
            <div className="hidden sm:block">
                <GreenLogo></GreenLogo>
            </div>
            <ProfileButton></ProfileButton>
        </div>
    )
}
