import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink, CheckCircle2, ZoomIn, ArrowRight } from 'lucide-react';

const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube-nocookie.com/embed/${match[2]}?rel=0&modestbranding=1` : null;
};

const ProjectModal = ({ isOpen, onClose, project }) => {
    const scrollRef = useRef(null);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || !isOpen) return;

        const handleWheel = (e) => {
            e.stopPropagation();
        };

        el.addEventListener('wheel', handleWheel, { passive: true });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [isOpen]);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (activeImage) {
                    setActiveImage(null);
                } else if (isOpen) {
                    onClose();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, activeImage, onClose]);

    if (!project) return null;

    const embedUrl = getYouTubeEmbedUrl(project.videoLink);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-stone-950/85 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Window */}
                    <motion.div
                        ref={scrollRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col z-10"
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-white/5">
                            <div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-1">
                                    {project.category}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-white leading-tight">
                                    {project.title}
                                </h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-white/5 rounded-full transition-colors ml-4"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 overflow-y-auto overscroll-contain space-y-8">
                            {/* Embedded Video Demo (if available) */}
                            {embedUrl && (
                                <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-white/10 shadow-lg bg-black">
                                    <div className="relative aspect-video w-full">
                                        <iframe
                                            src={embedUrl}
                                            title={`${project.title} Video Walkthrough`}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="px-4 py-2.5 bg-stone-900 text-stone-400 text-xs flex items-center justify-between border-t border-white/5">
                                        <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                                            <Play size={12} fill="currentColor" /> Live Workflow Walkthrough
                                        </span>
                                        <a
                                            href={project.videoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white underline underline-offset-2 flex items-center gap-1"
                                        >
                                            Open in YouTube <ExternalLink size={11} />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* ROI & Key Takeaway Banner */}
                            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <span className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold block mb-1">
                                        Verified Business Impact
                                    </span>
                                    <p className="text-base font-bold text-stone-900 dark:text-white">
                                        {project.roi}
                                    </p>
                                </div>
                                <a
                                    href="https://calendly.com/yomiautomates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                                >
                                    Build This For Your Team
                                    <ArrowRight size={14} />
                                </a>
                            </div>

                            {/* Tech Stack Pills */}
                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                                    Stack &amp; Integrations
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="px-3 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-white/5"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Full Description & Case Study */}
                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                                    Architecture &amp; Implementation Details
                                </h4>
                                <div className="text-stone-700 dark:text-stone-300 leading-relaxed text-base whitespace-pre-wrap font-sans space-y-4">
                                    {project.fullDescription || project.description}
                                </div>
                            </div>

                            {/* Gallery / Workflow Evidence */}
                            {project.gallery && project.gallery.length > 0 && (
                                <div className="pt-4 border-t border-stone-200 dark:border-white/5">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4 flex items-center justify-between">
                                        <span>Workflow Evidence &amp; System Screenshots ({project.gallery.length})</span>
                                        <span className="text-[11px] font-normal lowercase text-stone-400">Click any image to expand</span>
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {project.gallery.map((image, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setActiveImage(image)}
                                                className="group relative rounded-xl overflow-hidden border border-stone-200 dark:border-white/10 cursor-pointer bg-stone-100 dark:bg-stone-800 aspect-video"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Workflow Evidence ${index + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                                    <ZoomIn size={22} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-white/5 flex items-center justify-between">
                            <span className="text-xs text-stone-500 dark:text-stone-400">
                                Interested in an automation like this?
                            </span>
                            <a
                                href="https://calendly.com/yomiautomates"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-stone-900 dark:bg-white text-stone-50 dark:text-stone-900 rounded-lg text-xs font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                            >
                                Book a Free 15-Min Audit
                            </a>
                        </div>
                    </motion.div>

                    {/* Image Lightbox (Full Screen Zoom) */}
                    <AnimatePresence>
                        {activeImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setActiveImage(null)}
                                className="fixed inset-0 z-60 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out"
                            >
                                <motion.img
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.9 }}
                                    src={activeImage}
                                    alt="Enlarged workflow view"
                                    className="max-w-full max-h-[95vh] object-contain rounded-xl shadow-2xl"
                                />
                                <button
                                    onClick={() => setActiveImage(null)}
                                    className="absolute top-6 right-6 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
