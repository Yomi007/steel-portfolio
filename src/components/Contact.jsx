import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

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
            // Formspree endpoint - user will replace with their own
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
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-16">

                {/* Contact Info */}
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                            Let's work <br />
                            <span className="text-slate-700">together.</span>
                        </h2>

                        <p className="text-slate-400 text-xl mb-12 max-w-md">
                            Have a project in mind? I'm always open to discussing new ideas and opportunities.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:yomiautomates@gmail.com" className="flex items-center gap-4 text-white hover:text-blue-400 transition-colors group">
                                <div className="p-4 bg-slate-900 rounded-full border border-white/5 group-hover:border-blue-500/50 transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email Me</p>
                                    <p className="text-lg font-medium">yomiautomates@gmail.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-white">
                                <div className="p-4 bg-slate-900 rounded-full border border-white/5">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Location</p>
                                    <p className="text-lg font-medium">Remote / Worldwide</p>
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
                        className="p-8 bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/5"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' && (
                                    <>
                                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
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
                                    className="text-emerald-400 text-sm text-center"
                                >
                                    Thanks! I'll get back to you soon.
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm text-center"
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
