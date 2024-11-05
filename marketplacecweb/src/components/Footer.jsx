
function Footer() {
    return (
        <footer className="w-full bg-light-purple text-white py-8 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <a href="/" className="text-2xl font-bold hover:text-gray-300">Marketplace</a>
                </div>

                <div className="mb-4">
                    <ul className="flex space-x-4">
                        <li><a href="" className="hover:text-gray">Sobre</a></li>
                        <li><a href="" className="hover:text-gray">Serviços</a></li>
                        <li><a href="" className="hover:text-gray">Contato</a></li>
                    </ul>
                </div>

                <div className="flex space-x-4">
                    <a href="" className="hover:text-gray">Facebook</a>
                    <a href="" className="hover:text-gray">Twitter</a>
                    <a href="" className="hover:text-gray">Instagram</a>
                </div>
            </div>
            <div className="text-center mt-4 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Marketplace. Todos os direitos reservados.
            </div>
        </footer>
    )
}


export default Footer;