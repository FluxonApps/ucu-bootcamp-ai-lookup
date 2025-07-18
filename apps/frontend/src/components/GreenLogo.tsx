import greenLogo from '../assets/lookit-green-logo.png'

export function GreenLogo() {
    return (
        <div className={"flex gap-1"}>
            <img className='object-contain w-10 h-10' src={greenLogo}></img>
            <p className="text-(--color-dark-green) text-[24px] translate-y-0.5">lookit</p>
        </div>
    );
}