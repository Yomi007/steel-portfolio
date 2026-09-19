import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, Brain, Database, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const skillClusters = [
    {
        category: "Workflow Orchestration & Core Engines",
        icon: Workflow,
        color: "from-amber-500/15 via-orange-500/10 to-transparent",
        borderColor: "border-amber-500/30",
        badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
        summary: "Deterministic execution engines designed for multi-branch routing, resilient retry logic, and zero silent failures.",
        capabilities: [
            { name: "n8n", desc: "Self-hosted & cloud orchestration, JS code nodes, webhook routers" },
            { name: "Make.com", desc: "Complex visual routing, data mapping, and error-handling paths" },
            { name: "Zapier", desc: "Rapid SaaS integrations, trigger-action connectors" },
            { name: "Power Automate", desc: "Enterprise Microsoft 365 & SharePoint workflows" }
        ]
    },
    {
        category: "Autonomous AI Agents & Reasoning",
        icon: Brain,
        color: "from-cyan-500/15 via-blue-500/10 to-transparent",
        borderColor: "border-cyan-500/30",
        badgeColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        summary: "Non-deterministic intelligence, contextual conversational agents, document extraction, and safety guardrails.",
        capabilities: [
            { name: "Autonomous Agents", desc: "Goal-directed tool-calling, AR recovery, dispute escalations" },
            { name: "Google Gemini", desc: "Multimodal invoice parsing, unstructured text structuring" },
            { name: "OpenRouter & Claude", desc: "Multi-model failovers, system prompts, boundary checks" },
            { name: "AI Scoring & Qualification", desc: "Lead scoring, applicant screening, credit risk analysis" }
        ]
    },
    {
        category: "Data Infrastructure & APIs",
        icon: Database,
        color: "from-emerald-500/15 via-teal-500/10 to-transparent",
        borderColor: "border-emerald-500/30",
        badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        summary: "Relational data modeling, bi-directional sync pipelines, and pristine database hygiene.",
        capabilities: [
            { name: "Airtable", desc: "Relational database schema, linked records, formula logic" },
            { name: "REST APIs & Webhooks", desc: "Custom payload parsing, Bearer auth, pagination" },
            { name: "Slack & ClickUp", desc: "Real-time escalation digests, automated task routing" },
            { name: "Closed-Loop Sync", desc: "Search-before-create logic to eliminate duplicate records" }
        ]
    },
    {
        category: "Engineering & Vibe Coding",
        icon: Sparkles,
        color: "from-purple-500/15 via-pink-500/10 to-transparent",
        borderColor: "border-purple-500/30",
        badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
        summary: "Accelerated development velocity leveraging frontier AI tooling for rapid deployment and custom scripts.",
        capabilities: [
            { name: "Vibe Coding", desc: "AI-assisted development with Google Antigravity & Claude Code" },
            { name: "JavaScript & Node.js", desc: "Custom data transformation, regex parsing, date math" },
            { name: "Cloud File Ops", desc: "Dropbox, CloudConvert & Google Drive automated pipelines" },
            { name: "Error Triggers", desc: "Dedicated fallback workflows with incident notification" }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-32 px-6 bg-stone-50 dark:bg-stone-950 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mb-4">
                        <Zap size={14} className="text-amber-500" />
                        Architectural Stack
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">
                        Tools &amp; Capabilities
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-base md:text-lg">
                        Structured technical capabilities spanning deterministic workflow engines, autonomous AI agents, and enterprise data pipes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillClusters.map((cluster, index) => {
                        const Icon = cluster.icon;
                        return (
                            <motion.div
                                key={cluster.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-3xl bg-white dark:bg-stone-900/60 border ${cluster.borderColor} backdrop-blur-sm relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300`}
                            >
                                {/* Top Header */}
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white">
                                                <Icon size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                                                {cluster.category}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 leading-relaxed">
                                        {cluster.summary}
                                    </p>

                                    {/* Capabilities list */}
                                    <div className="space-y-3">
                                        {cluster.capabilities.map((cap) => (
                                            <div
                                                key={cap.name}
                                                className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 hover:border-amber-500/30 transition-colors"
                                            >
                                                <div className="flex items-baseline justify-between mb-1">
                                                    <span className="text-sm font-semibold text-stone-900 dark:text-white">
                                                        {cap.name}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-stone-500 dark:text-stone-400">
                                                    {cap.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom accent */}
                                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-xs text-stone-400">
                                    <span>Production-tested</span>
                                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                        <ShieldCheck size={14} /> Enterprise Ready
                                    </span>
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
