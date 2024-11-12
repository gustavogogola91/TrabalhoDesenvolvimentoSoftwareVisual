import logo from "../imgs/logo.png"
import NavApp from "./Nav";

function Header() {


    return (
        <header className="w-full flex flex-row justify-around gap-[100px] items-center bg-light-purple p-3 text-white text-bol font-bold text-[20px]">
            <a href="/"><img src={logo} alt="Logo Marketplace" className="shadow-md w-16 h-16 rounded-full" /></a>
            <p className="text-[30px]">Marketplace</p>
            <NavApp/>
        </header>
    )
}


export default Header;