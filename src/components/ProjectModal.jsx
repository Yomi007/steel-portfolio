import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || !isOpen) return;

        const handleWheel = (e) => {
            e.stopPropagation();
            e.preventDefault();
            el.scrollTop += e.deltaY;
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [isOpen]);

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
                        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        ref={scrollRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-white/5">
                            <div>
                                <h3 className="text-2xl font-bold text-stone-900 dark:text-white">{project.title}</h3>
                                <p className="text-stone-500 dark:text-stone-400 text-sm">{project.category}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <div className="mb-8">
                                <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Overview</h4>
                                <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg whitespace-pre-wrap">
                                    {project.fullDescription || project.description}
                                </p>
                                {project.videoLink && (
                                    <a
                                        href={project.videoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg shadow-amber-500/25"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                        Watch Video Demo
                                    </a>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {project.tools.map(tool => (
                                    <span key={tool} className="px-3 py-1 text-sm font-medium text-stone-600 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 rounded-full border border-stone-200 dark:border-white/5">
                                        {tool}
                                    </span>
                                ))}
                            </div>

                            {/* Gallery */}
                            {project.gallery && project.gallery.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-6">Workflow Evidence</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {project.gallery.map((image, index) => (
                                            <div key={index} className="group relative rounded-xl overflow-hidden border border-stone-200 dark:border-white/10">
                                                <img
                                                    src={image}
                                                    alt={`Evidence ${index + 1}`}
                                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
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
