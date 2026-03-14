import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WorkflowBackground from './WorkflowBackground';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
            <WorkflowBackground />
            <div className="max-w-5xl w-full z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-sm mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        Available for Audits
                    </div>

                    <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-stone-900 dark:text-white leading-[1.1] mb-8">
                        Automating the <br />
                        <span className="shimmer-text">
                            boring stuff.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-2xl mb-10 leading-relaxed">
                        I build intelligent workflows using Make.com, n8n, and Airtable that save businesses 20+ hours a week. Focus on growth, let robots handle the rest.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.a
                            href="#work"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 rounded-full font-medium flex items-center gap-2 hover:bg-stone-800 dark:hover:bg-white transition-colors"
                        >
                            See My Workflows
                            <ArrowRight size={18} />
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 text-stone-900 dark:text-white border border-stone-300 dark:border-white/10 rounded-full font-medium hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
                        >
                            Contact Me
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
