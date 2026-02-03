import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#" className="font-heading font-bold text-2xl tracking-tighter text-white">
                    ABAYOMI
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-0 right-0 bg-slate-950 border-b border-white/5 p-6 flex flex-col gap-6"
                >
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-slate-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
