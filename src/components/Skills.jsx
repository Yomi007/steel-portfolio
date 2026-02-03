import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Workflow, Database, Zap, Brain, Layers } from 'lucide-react';

const skills = [
    {
        name: 'Make.com',
        icon: Workflow,
        description: 'Complex workflow automation',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/20'
    },
    {
        name: 'n8n',
        icon: Zap,
        description: 'Self-hosted automation',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/20'
    },
    {
        name: 'Airtable',
        icon: Database,
        description: 'Database & workflows',
        color: 'from-orange-500/20 to-yellow-500/20',
        borderColor: 'border-orange-500/20'
    },
    {
        name: 'Google Gemini',
        icon: Brain,
        description: 'AI integration',
        color: 'from-indigo-500/20 to-purple-500/20',
        borderColor: 'border-indigo-500/20'
    },
    {
        name: 'Zapier',
        icon: Zap,
        description: 'Quick automations',
        color: 'from-orange-500/20 to-red-500/20',
        borderColor: 'border-orange-500/20'
    },
    {
        name: 'Power Automate',
        icon: Layers,
        description: 'Microsoft integrations',
        color: 'from-blue-500/20 to-indigo-500/20',
        borderColor: 'border-blue-500/20'
    },
    {
        name: 'React & Tailwind',
        icon: Code2,
        description: 'Web development',
        color: 'from-cyan-500/20 to-blue-500/20',
        borderColor: 'border-cyan-500/20'
    }
];

const Skills = () => {
    return (
        <section className="py-32 px-6 bg-slate-950">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                        Tools & Technologies
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Expertise in leading automation platforms and modern web technologies
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative p-6 bg-gradient-to-br ${skill.color} rounded-2xl border ${skill.borderColor} hover:border-white/20 transition-all duration-300`}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-4 bg-white/5 rounded-xl mb-4 group-hover:bg-white/10 transition-colors">
                                        <Icon size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {skill.name}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        {skill.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
