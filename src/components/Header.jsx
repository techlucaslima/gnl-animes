import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icone from '../assets/icone.png';
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    {
        isOpen && (
            <>
                <div onClick={() => setIsOpen(!alse)} className="fixed inset-0 bg-black">
                    <nav className="fixed top-0"></nav>
                </div>
            </>
        )
    }

    return (
        <header className="text-xl bg-black h-15 text-white flex p-4 justify-between items-center">
            <div className="cursor-pointer flex justify-between items-center">
                <button onClick={() => setIsOpen(!setIsOpen)} className="hidden p-2">
                    {isOpen ? (
                        <FontAwesomeIcon icon={faTimes} size="lg" className="cursor-pointer" />
                    ) : (
                        <FontAwesomeIcon icon={faBars} size="lg" className="cursor-pointer" />
                    )}
                </button>
                <Link to="/"><img src={icone} alt="ícone GNL" className="h-15" /></Link>
            </div>
            <Link to="/search"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
        </header>
    )
}

export default Header;
