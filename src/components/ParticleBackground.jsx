import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = 1.5;
            }

            update(mouseX, mouseY) {
                // Mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force * 0.05;
                    this.vy += Math.sin(angle) * force * 0.05;
                }

                // Return to base position
                this.vx += (this.baseX - this.x) * 0.01;
                this.vy += (this.baseY - this.y) * 0.01;

                // Apply velocity with damping
                this.vx *= 0.95;
                this.vy *= 0.95;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw(ctx) {
                ctx.fillStyle = 'rgba(148, 163, 184, 0.3)'; // slate-400 with low opacity
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particlesRef.current.push(new Particle(x, y));
            }
        };
        initParticles();

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Connect particles with lines
        const connectParticles = () => {
            const maxDistance = 120;
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                particle.update(mouseRef.current.x, mouseRef.current.y);
                particle.draw(ctx);
            });

            connectParticles();

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
        />
    );
};

export default ParticleBackground;
