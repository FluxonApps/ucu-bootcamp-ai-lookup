import greenLogo from '../assets/lookit-green-logo.png'

export function GreenLogo() {
    return (
        <div className={"flex gap-1"}>
            <img src={greenLogo}></img>
            <p className="text-(--color-dark-green) text-[32px] translate-y-0.5">lookit</p>
        </div>
    );
}