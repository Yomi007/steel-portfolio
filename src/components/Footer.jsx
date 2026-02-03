import React from 'react';
import { Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t border-white/5 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    Ready to automate your workflow?
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-16">
                    <a
                        href="https://calendly.com/yomiautomates"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white text-slate-950 rounded-full font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                    >
                        Book a 15-min Audit <ArrowRight size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/amao-abayomi-68a6b0185/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 text-white border border-white/10 rounded-full font-medium hover:bg-white/5 transition-colors"
                    >
                        Connect on LinkedIn
                    </a>
                </div>

                <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Abayomi Portfolio. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/amao-abayomi-68a6b0185/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
