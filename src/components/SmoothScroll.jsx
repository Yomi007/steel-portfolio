
// React wrapper for Lenis smooth scroll
// Based on recommended implementation from Lenis docs

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef()

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        // Raf loop
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                lenis.scrollTo(this.getAttribute('href'));
            });
        });

        return () => {
            lenis.destroy()
        }
    }, [])

    return children
}
