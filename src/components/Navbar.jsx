import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="bg-slate-700 p-2 px-4 text-white">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="logo flex items-center relative top-1">
                        <span className="text-green-500 lol text-3xl">&lt;</span>
                        <p className="lol text-3xl">Pass</p>
                        <span className="text-green-500 lol text-3xl">OP/&gt;</span>
                    </div>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex space-x-6">
                        <li><a href="#" className="hover:underline italic font-serif">Home</a></li>
                        <li><a href="#" className="hover:underline italic font-serif">About</a></li>
                        <li><a href="#" className="hover:underline italic font-serif">Services</a></li>
                        <li><a href="#" className="hover:underline italic font-serif">Contact</a></li>
                    </ul>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-2" : "max-h-0"}`}>
                    <ul className="flex flex-col gap-3 pb-2">
                        <li><a href="#" className="hover:underline italic font-serif">Home</a></li>
                        <li><a href="#" className="hover:underline italic font-serif">About</a></li>
                        <li><a href="#" className="hover:underline italic font-serif">Services</a></li>
                        <li><a href="#" className="hover:underline italic font-serif">Contact</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar