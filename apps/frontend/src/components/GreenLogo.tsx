import greenLogo from '../assets/lookit-green-logo.png'

export function GreenLogo() {
    return (
        <div className={"flex gap-1"}>
            <img src={greenLogo}></img>
            <p className="text-[#4A6144] text-[32px]">lookit</p>
        </div>
    );
}