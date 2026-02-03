import React, { useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const Counter = ({ from = 0, to, duration = 1.5, suffix = '', prefix = '' }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(from);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(from);

    useEffect(() => {
        if (isInView) {
            motionValue.set(to);
        }
    }, [isInView, to, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });

        return () => unsubscribe();
    }, [springValue]);

    return (
        <span ref={ref}>
            {prefix}{displayValue}{suffix}
        </span>
    );
};

export default Counter;
