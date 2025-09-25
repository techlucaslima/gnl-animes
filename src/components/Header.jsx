import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faMagnifyingGlass, faBookmark, } from "@fortawesome/free-solid-svg-icons";
import icone from "../assets/icone.png";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const menuOpen = () => {
        setIsOpen(prev => !prev);
        document.body.style.overflow = 'hidden';
    };

    const menuClose = () => {
        setIsOpen(prev => !prev);
        document.body.style.overflow = 'auto';
    }



    return (
        <div className="text-xl flex flex-col">
            <header className="bg-blackBlue text-newWhite flex items-center justify-between px-4 py-3 h-16">
                <div className="flex items-center">
                    {/* botão visível por padrão (mobile), escondido em telas grandes */}
                    <button
                        type="button"
                        onClick={menuOpen}
                        className="p-2 block xl:hidden"
                    >
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
                    </button>

                    <Link to="/">
                        <img src={icone} alt="ícone GNL" className="h-17 w-auto" />
                    </Link>
                </div>

                <div className="text-newWhite text-xl flex gap-4">
                    <Link to="/favorite" className="hidden xl:block">
                        <FontAwesomeIcon icon={faBookmark} />
                    </Link>
                    <Link to="/search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </div>
            </header>

            {isOpen && (
                <div className="h-screen bg-blackBlue p-4 text-sm text-newWhite font-bold">
                    <nav className="flex flex-col gap-4">
                        <Link to="/" onClick={menuClose}>Início</Link>
                        <Link to="/favorites" onClick={menuClose}>Favoritos</Link>
                    </nav>
                </div>
            )}
        </div>
    );
}
