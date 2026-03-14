import React from 'react';
import { motion } from 'framer-motion';
import { Database, Workflow, Settings, Download } from 'lucide-react';

const features = [
    {
        icon: <Workflow className="text-amber-500" size={24} />,
        title: "Scalable Workflows",
        description: "Designing resilient automation architectures that grow with your business logic."
    },
    {
        icon: <Settings className="text-orange-500" size={24} />,
        title: "Process Optimization",
        description: "Identifying bottlenecks and implementing streamlined solutions for maximum ROI."
    },
    {
        icon: <Database className="text-amber-600" size={24} />,
        title: "API Integration",
        description: "Seamlessly connecting disjointed tools to create a unified data ecosystem."
    }
];

const About = () => {
    return (
        <section id="about" className="py-32 px-6 bg-stone-100 dark:bg-stone-900 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                {/* Left Content */}
                <div className="flex-1 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">
                            More than just <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                                automation.
                            </span>
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 text-lg mb-8 leading-relaxed">
                            I am a Workflow Automation Specialist and Credit Control Expert. My mission is to eliminate manual data entry and repetitive tasks, empowering teams to focus on high-value strategic work. I turn chaos into structured, automated efficiency.
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="p-3 bg-amber-50 dark:bg-white/5 rounded-xl border border-amber-100 dark:border-white/5">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-stone-900 dark:text-white font-bold mb-1">{feature.title}</h3>
                                        <p className="text-stone-500 dark:text-stone-400 text-sm">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Resume Download Button */}
                        <motion.a
                            href="/resume.pdf"
                            download
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 border border-stone-200 dark:border-white/10 hover:border-stone-300 dark:hover:border-white/20 rounded-full text-stone-900 dark:text-white font-medium transition-all mt-8"
                            aria-label="Download Resume PDF"
                        >
                            <Download size={18} />
                            Download Resume
                        </motion.a>
                    </motion.div>
                </div>

                {/* Right Image */}
                <div className="flex-1 w-full relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 rounded-full blur-3xl -z-10" />
                        <img
                            src="/yomi.jpg"
                            alt="Abayomi - Workflow Automation Specialist"
                            className="w-full h-auto rounded-3xl border border-stone-200 dark:border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
