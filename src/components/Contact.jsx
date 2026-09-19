import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Calendar, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://formspree.io/f/xvzqdown', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-32 px-6 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-stone-100 dark:from-stone-900 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-start">

                {/* Left Column: Direct Booking & Fast-Track */}
                <div className="flex-1 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Clock size={14} />
                            Rapid Engagement
                        </div>

                        <h2 className="font-heading text-5xl md:text-7xl font-bold text-stone-900 dark:text-white mb-6 tracking-tight">
                            Let's eliminate your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                                bottlenecks.
                            </span>
                        </h2>

                        <p className="text-stone-600 dark:text-stone-300 text-lg mb-8 max-w-lg leading-relaxed">
                            Whether you need an autonomous AR recovery agent, an end-to-end FinOps overhaul, or custom n8n/Make workflows, let's connect.
                        </p>

                        {/* Fast Track Booking Box */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/25 dark:border-amber-500/20 mb-8 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm mb-2">
                                <Calendar size={18} />
                                <span>Fast-Track: 15-Minute Diagnostic Call</span>
                            </div>
                            <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
                                Pick a time that suits you. We will tear down your current manual workflow and pinpoint 2–3 high-ROI automation opportunities.
                            </p>
                            <a
                                href="https://calendly.com/yomiautomates"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-amber-500/20 hover:gap-3"
                            >
                                Open Calendly Schedule <ArrowRight size={16} />
                            </a>
                        </div>

                        <div className="space-y-4">
                            <a href="mailto:yomiautomates@gmail.com" className="flex items-center gap-4 text-stone-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors group">
                                <div className="p-3.5 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-white/5 group-hover:border-amber-500/50 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 dark:text-stone-500">Email Directly</p>
                                    <p className="text-base font-medium">yomiautomates@gmail.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-stone-900 dark:text-white">
                                <div className="p-3.5 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-white/5">
                                    <ShieldCheck size={20} className="text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 dark:text-stone-500">Response Guarantee</p>
                                    <p className="text-base font-medium">Replies within 24 business hours</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <div className="flex-1 max-w-lg w-full">
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="p-8 bg-white/80 dark:bg-stone-900/50 backdrop-blur-sm rounded-3xl border border-stone-200 dark:border-white/5"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-stone-900 dark:bg-white text-stone-50 dark:text-stone-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' && (
                                    <>
                                        <div className="w-5 h-5 border-2 border-stone-50 dark:border-stone-950 border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                )}
                                {status === 'success' && (
                                    <>
                                        <CheckCircle size={18} />
                                        Message Sent!
                                    </>
                                )}
                                {status === 'error' && (
                                    <>
                                        <AlertCircle size={18} />
                                        Failed - Try Again
                                    </>
                                )}
                                {status === 'idle' && (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-amber-600 dark:text-amber-400 text-sm text-center"
                                >
                                    Thanks! I'll get back to you soon.
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 dark:text-red-400 text-sm text-center"
                                >
                                    Oops! Something went wrong. Please email me directly at yomiautomates@gmail.com
                                </motion.p>
                            )}
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
