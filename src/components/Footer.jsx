import React from 'react';
import { Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t border-stone-200 dark:border-white/5 bg-stone-50 dark:bg-stone-950">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white mb-8">
                    Ready to automate your workflow?
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-16">
                    <a
                        href="https://calendly.com/yomiautomates"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full font-semibold shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
                    >
                        Book a 15-min Audit <ArrowRight size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/amao-abayomi-68a6b0185/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 text-stone-900 dark:text-white border border-stone-200 dark:border-white/10 rounded-full font-medium hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
                    >
                        Connect on LinkedIn
                    </a>
                </div>

                <div className="w-full pt-8 border-t border-stone-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-stone-400 dark:text-stone-500 text-sm">
                        © {new Date().getFullYear()} Abayomi. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="mailto:yomiautomates@gmail.com"
                            className="text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors text-sm"
                        >
                            yomiautomates@gmail.com
                        </a>
                        <a
                            href="https://www.linkedin.com/in/amao-abayomi-68a6b0185/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                            aria-label="LinkedIn Profile"
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
