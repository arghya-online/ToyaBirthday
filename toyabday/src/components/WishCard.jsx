import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { siteContent } from '../data/siteContent';

const WishCard = () => {
    const { content } = siteContent.sections.find(s => s.id === 'wish');
    const containerRef = useRef(null);

    useEffect(() => {
        const duration = 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFD1DC', '#D25C65', '#FFF5F7']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFD1DC', '#D25C65', '#FFF5F7']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".wish-card", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        })
            .from(".wish-title", {
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from(".wish-line", {
                opacity: 0,
                x: -20,
                duration: 1,
                stagger: 2.5, // Slow stagger for reading
                ease: "power2.out"
            }, "+=0.5");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen px-4 z-10 relative">
            <div className="wish-card bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(210,92,101,0.15)] max-w-2xl w-full text-center border border-white/60">
                <h2 className="wish-title text-3xl md:text-5xl font-serif text-deep-maroon mb-10">
                    {content.title}
                </h2>

                <div className="space-y-8 font-sans text-xl text-deep-maroon/90 leading-relaxed">
                    {content.lines.map((line, i) => (
                        <p key={i} className="wish-line">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishCard;
