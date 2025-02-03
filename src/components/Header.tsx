import { GithubLogo } from "@phosphor-icons/react";

const Header = () => {

    return (
        <nav className="w-full bg-slate-950 fixed z-10">
            
            <h1 className="text-white p-6 flex font-light items-center gap-3 leading-none"> <GithubLogo size={28} color="#ffffff" weight="fill" /><span className="text-3xl font-semibold">GitHub /</span>Profile</h1>
        </nav>
    )

}

export default Header;