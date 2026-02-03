import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-slate-900/95 backdrop-blur-md border-b border-white/5">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                <p className="text-slate-400 text-sm">{project.category}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <div className="mb-8">
                                <h4 className="text-lg font-bold text-white mb-4">Overview</h4>
                                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                                    {project.fullDescription || project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {project.tools.map(tool => (
                                    <span key={tool} className="px-3 py-1 text-sm font-medium text-slate-200 bg-slate-800 rounded-full border border-white/5">
                                        {tool}
                                    </span>
                                ))}
                            </div>

                            {/* Gallery */}
                            {project.gallery && project.gallery.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-6">Workflow Evidence</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {project.gallery.map((image, index) => (
                                            <div key={index} className="group relative rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={image}
                                                    alt={`Evidence ${index + 1}`}
                                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
