import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, DollarSign, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';

const RoiCalculator = () => {
    const [teamSize, setTeamSize] = useState(4);
    const [hoursPerWeek, setHoursPerWeek] = useState(10);
    const [hourlyRate, setHourlyRate] = useState(45);

    // Calculations
    const weeklyHours = teamSize * hoursPerWeek;
    const monthlyHours = Math.round(weeklyHours * 4.33);
    const monthlyCost = Math.round(monthlyHours * hourlyRate);
    const annualCost = monthlyCost * 12;

    // Conservative 80% reclamation rate with n8n/Make/AI agents
    const monthlyReclaimedHours = Math.round(monthlyHours * 0.8);
    const annualSavings = Math.round(annualCost * 0.8);

    return (
        <section id="calculator" className="py-28 px-6 bg-stone-100/70 dark:bg-stone-900/60 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                        <Calculator size={14} />
                        Workflow ROI Estimator
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">
                        How Much Is Manual Work Costing You?
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-base md:text-lg">
                        Adjust the sliders to estimate how many operational hours and capital your business burns on repetitive tasks every year.
                    </p>
                </motion.div>

                {/* Calculator Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls Column (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 bg-white dark:bg-stone-950 p-8 rounded-3xl border border-stone-200 dark:border-white/10 shadow-xl flex flex-col justify-between"
                    >
                        <div className="space-y-8">
                            {/* Slider 1: Team Size */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
                                        <Users size={18} className="text-amber-500" />
                                        Team Members Doing Repetitive Tasks
                                    </label>
                                    <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white font-bold text-sm">
                                        {teamSize} {teamSize === 1 ? 'person' : 'people'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="25"
                                    step="1"
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                    className="w-full accent-amber-500 h-2 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
                                />
                                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                                    <span>1 person</span>
                                    <span>12 people</span>
                                    <span>25 people</span>
                                </div>
                            </div>

                            {/* Slider 2: Hours/Week */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
                                        <Clock size={18} className="text-amber-500" />
                                        Hours Spent Weekly on Repetitive Tasks (Per Person)
                                    </label>
                                    <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white font-bold text-sm">
                                        {hoursPerWeek} hrs/week
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="2"
                                    max="30"
                                    step="1"
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                                    className="w-full accent-amber-500 h-2 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
                                />
                                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                                    <span>2 hrs (minor)</span>
                                    <span>15 hrs (heavy ops)</span>
                                    <span>30 hrs (manual bottleneck)</span>
                                </div>
                            </div>

                            {/* Slider 3: Hourly Cost */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
                                        <DollarSign size={18} className="text-amber-500" />
                                        Average Hourly Compensation
                                    </label>
                                    <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white font-bold text-sm">
                                        ${hourlyRate}/hr
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="150"
                                    step="5"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                                    className="w-full accent-amber-500 h-2 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
                                />
                                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                                    <span>$20/hr</span>
                                    <span>$85/hr</span>
                                    <span>$150/hr</span>
                                </div>
                            </div>
                        </div>

                        {/* Benchmark notes */}
                        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-white/10 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                            <span>Based on typical 80% time recovery across FinOps, client intake, and data entry workflows.</span>
                        </div>
                    </motion.div>

                    {/* Results Column (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 text-white p-8 rounded-3xl border border-stone-800 shadow-2xl flex flex-col justify-between relative overflow-hidden"
                    >
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div>
                            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5 mb-2">
                                <Sparkles size={14} />
                                Estimated Annual Savings
                            </span>
                            
                            {/* Giant Dollar Figure */}
                            <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                                ${annualSavings.toLocaleString()}
                                <span className="text-sm text-stone-400 font-normal"> /year</span>
                            </div>

                            <p className="text-stone-400 text-xs mb-8">
                                Equivalent to <strong className="text-amber-400 font-semibold">${Math.round(annualSavings / 12).toLocaleString()}/month</strong> in productive capacity reclaimed.
                            </p>

                            {/* Breakdown cards */}
                            <div className="space-y-3 mb-8">
                                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                                    <span className="text-xs text-stone-300">Hours Lost to Manual Ops:</span>
                                    <span className="text-sm font-bold text-red-400">{monthlyHours.toLocaleString()} hrs/mo</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                                    <span className="text-xs text-amber-200">Reclaimable with Automation:</span>
                                    <span className="text-sm font-bold text-amber-400">+{monthlyReclaimedHours.toLocaleString()} hrs/mo</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div>
                            <a
                                href="https://calendly.com/yomiautomates"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all text-sm group"
                            >
                                Reclaim These Hours — Book an Audit
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <p className="text-center text-[11px] text-stone-500 mt-2.5">
                                Zero-commitment 15-minute diagnostic call.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RoiCalculator;
