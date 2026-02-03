import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Finance Director',
        company: 'TechCorp Solutions',
        text: 'Abayomi transformed our invoice processing from a 15-hour weekly nightmare into a 30-minute automated workflow. The ROI was immediate and the system has been flawless for 6 months.',
        project: 'AI Invoice Processing Agent',
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Rodriguez',
        role: 'Operations Manager',
        company: 'GrowthScale Inc',
        text: 'Working with Abayomi was a game-changer. Our lead management went from chaotic spreadsheets to a pristine, zero-duplicate system. We now track every lead in real-time.',
        project: 'Lead Management System',
        rating: 5
    },
    {
        id: 3,
        name: 'David Park',
        role: 'Revenue Operations Lead  ',
        company: 'SaaS Ventures',
        text: 'The automation Abayomi built saved our team 20+ hours per week. What impressed me most was how he handled edge cases - the system never fails silently.',
        project: 'Workflow Automation',
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-32 px-6 bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                        Client Success Stories
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Real results from businesses that automated their workflows
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-8 bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 opacity-10">
                                <Quote size={48} className="text-white" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-emerald-400 text-emerald-400" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-slate-300 mb-6 relative z-10 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Project Tag */}
                            <div className="mb-4">
                                <span className="text-xs text-emerald-400 font-medium px-3 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                                    {testimonial.project}
                                </span>
                            </div>

                            {/* Author */}
                            <div className="border-t border-white/5 pt-6">
                                <p className="font-bold text-white">{testimonial.name}</p>
                                <p className="text-sm text-slate-400">{testimonial.role}</p>
                                <p className="text-sm text-slate-500">{testimonial.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note about placeholders - remove this when you add real testimonials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center"
                >
                    <p className="text-xs text-slate-600 italic">
                        * These are placeholder testimonials. Replace with real client feedback when available.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
