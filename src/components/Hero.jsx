import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import WorkflowBackground from './WorkflowBackground';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 relative overflow-hidden">
            <WorkflowBackground />
            <div className="max-w-5xl w-full z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    {/* Status Pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs md:text-sm font-medium mb-8 backdrop-blur-md shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        <span>Available for Workflow Audits &amp; AI Agent Architecture</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-[1.08] mb-8">
                        Engineering Autonomous <br />
                        <span className="shimmer-text">
                            AI Agents &amp; Workflows.
                        </span>
                    </h1>

                    {/* Value-driven subheadline */}
                    <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-3xl mb-10 leading-relaxed font-normal">
                        I architect self-driving systems with <strong className="text-stone-900 dark:text-white font-semibold">n8n</strong>, <strong className="text-stone-900 dark:text-white font-semibold">Make.com</strong>, and <strong className="text-stone-900 dark:text-white font-semibold">Airtable</strong> that eliminate manual bottlenecks, accelerate revenue operations, and reclaim <span className="text-amber-600 dark:text-amber-400 font-semibold underline decoration-amber-500/30 underline-offset-4">20+ hours every week</span>.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
                        <motion.a
                            href="https://calendly.com/yomiautomates"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all text-base"
                        >
                            <Calendar size={18} />
                            Book a 15-Min Audit
                        </motion.a>

                        <motion.a
                            href="#work"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-8 py-4 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 rounded-full font-semibold flex items-center gap-2 hover:bg-stone-800 dark:hover:bg-white transition-all text-base"
                        >
                            Explore Systems
                            <ArrowRight size={18} />
                        </motion.a>

                        <motion.a
                            href="#calculator"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-6 py-4 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-white/10 rounded-full font-medium hover:bg-stone-100 dark:hover:bg-white/5 transition-all text-sm"
                        >
                            Calculate Your ROI
                        </motion.a>
                    </div>

                    {/* High-Credibility Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                        <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/50 backdrop-blur-md border border-stone-200 dark:border-white/5 text-center flex flex-col items-center">
                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-2xl mb-1">
                                <TrendingUp size={20} />
                                <span>97%</span>
                            </div>
                            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                                Manual Time Reduction in AR
                            </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/50 backdrop-blur-md border border-stone-200 dark:border-white/5 text-center flex flex-col items-center">
                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-2xl mb-1">
                                <Clock size={20} />
                                <span>20+ Hrs</span>
                            </div>
                            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                                Reclaimed Weekly Per Business
                            </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/50 backdrop-blur-md border border-stone-200 dark:border-white/5 text-center flex flex-col items-center">
                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-2xl mb-1">
                                <ShieldCheck size={20} />
                                <span>100% Zero</span>
                            </div>
                            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                                Silent Failures via Smart Triggers
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
