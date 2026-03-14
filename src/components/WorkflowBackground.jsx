import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const nodes = [
    { id: 1, x: 20, y: 30, color: 'bg-amber-500' },
    { id: 2, x: 50, y: 60, color: 'bg-orange-500' },
    { id: 3, x: 80, y: 30, color: 'bg-amber-400' },
    { id: 4, x: 50, y: 20, color: 'bg-orange-400' },
    { id: 5, x: 30, y: 70, color: 'bg-amber-600' },
    { id: 6, x: 70, y: 70, color: 'bg-orange-300' },
];

const connections = [
    { from: 1, to: 2 },
    { from: 4, to: 1 },
    { from: 4, to: 3 },
    { from: 2, to: 3 },
    { from: 1, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 6 },
];

const WorkflowBackground = () => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const { width, height } = dimensions;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <motion.div
                className="relative w-full h-full opacity-20"
                initial={{ scale: 1.1 }}
                animate={{
                    x: [0, -20, 0],
                    y: [0, -10, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {width > 0 && height > 0 && (
                    <svg className="absolute inset-0 w-full h-full">
                        {connections.map((conn, i) => {
                            const startNode = nodes.find(n => n.id === conn.from);
                            const endNode = nodes.find(n => n.id === conn.to);

                            return (
                                <g key={i}>
                                    <motion.path
                                        d={`M ${startNode.x}% ${startNode.y}% Q 50% 50% ${endNode.x}% ${endNode.y}%`}
                                        stroke="url(#warmGradient)"
                                        strokeWidth="2"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.5 }}
                                        transition={{ duration: 2, delay: i * 0.2 }}
                                    />
                                    <motion.circle
                                        r="3"
                                        fill="#f59e0b"
                                        initial={{ offsetDistance: "0%" }}
                                        animate={{ offsetDistance: "100%" }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                            ease: "linear",
                                            repeatDelay: 1
                                        }}
                                        style={{
                                            offsetPath: `path("M ${startNode.x * width / 100} ${startNode.y * height / 100} Q ${width / 2} ${height / 2} ${endNode.x * width / 100} ${endNode.y * height / 100}")`
                                        }}
                                    />
                                </g>
                            );
                        })}
                        <defs>
                            <linearGradient id="warmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f59e0b" />
                                <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                        </defs>
                    </svg>
                )}

                {nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        className={`absolute w-12 h-12 rounded-2xl ${node.color} blur-xl`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: node.id * 0.5,
                        }}
                    />
                ))}

                {nodes.map((node) => (
                    <motion.div
                        key={`node-${node.id}`}
                        className="absolute w-4 h-4 bg-amber-400 dark:bg-white rounded-full border-4 border-stone-50 dark:border-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: node.id * 0.2 }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default WorkflowBackground;
