import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = 1.2;
    }

    update(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;

        if (distance < maxDistance && distance > 0) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 0.03;
            this.vy += Math.sin(angle) * force * 0.03;
        }

        this.vx += (this.baseX - this.x) * 0.008;
        this.vy += (this.baseY - this.y) * 0.008;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, isDark) {
        const color = isDark
            ? 'rgba(168, 162, 158, 0.25)'
            : 'rgba(120, 113, 108, 0.18)';
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef([]);
    const { isDark } = useTheme();
    const isDarkRef = useRef(isDark);

    // Keep ref in sync with state
    useEffect(() => {
        isDarkRef.current = isDark;
    }, [isDark]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let isVisible = true;

        const initParticles = () => {
            particlesRef.current = [];
            // Cap particles to max 45 to guarantee buttery 60/120fps performance on 4K/retina screens
            const calculatedCount = Math.floor((canvas.width * canvas.height) / 32000);
            const particleCount = Math.min(Math.max(calculatedCount, 20), 45);

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particlesRef.current.push(new Particle(x, y));
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const connectParticles = () => {
            const maxDistance = 110;
            const particles = particlesRef.current;
            const len = particles.length;

            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * (isDarkRef.current ? 0.12 : 0.07);
                        const color = isDarkRef.current
                            ? `rgba(168, 162, 158, ${opacity})`
                            : `rgba(120, 113, 108, ${opacity})`;
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (isVisible) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particlesRef.current.forEach(particle => {
                    particle.update(mouseRef.current.x, mouseRef.current.y);
                    particle.draw(ctx, isDarkRef.current);
                });

                connectParticles();
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
            data-no-transition
        />
    );
};

export default ParticleBackground;
