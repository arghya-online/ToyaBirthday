import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Play, Heart } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const FinalScene = ({ onReplay }) => {
    const { content, buttons } = siteContent.sections.find(s => s.id === 'final');
    const containerRef = useRef(null);
    const [showControls, setShowControls] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setShowControls(true)
        });

        tl.from(".final-heading", {
            opacity: 0,
            scale: 0.9,
            duration: 2,
            ease: "power2.out"
        })
            .from(".final-wish", {
                opacity: 0,
                y: 20,
                filter: "blur(5px)",
                stagger: 2.5,
                duration: 1.5
            }, "+=0.5")
            .from(".final-sig", {
                opacity: 0,
                y: 20,
                duration: 2,
                ease: "power2.out"
            }, "+=1");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen px-6 text-center z-10 relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-accent/10 pointer-events-none" />

            <h1 className="final-heading text-5xl md:text-7xl font-serif text-deep-maroon mb-16">
                {content.heading}
            </h1>

            <div className="space-y-8 max-w-3xl mb-20">
                {content.wishes.map((wish, i) => (
                    <p key={i} className="final-wish text-xl md:text-3xl text-deep-maroon/80 font-serif leading-relaxed">
                        {wish}
                    </p>
                ))}
            </div>

            <div className="final-sig mb-16">
                <p className="text-xl md:text-2xl italic text-rose-accent font-medium">
                    {content.signature}
                </p>
            </div>

            {showControls && (
                <div className="flex gap-6 animate-fade-in">
                    <button
                        onClick={onReplay}
                        className="flex items-center gap-2 px-8 py-3 bg-white text-deep-maroon rounded-full shadow-lg border border-gray-100 hover:scale-105 transition-transform"
                    >
                        <Play size={18} fill="currentColor" /> {buttons.replay}
                    </button>
                </div>
            )}

            <footer className="absolute bottom-6 text-sm text-deep-maroon/40 font-sans flex items-center gap-1 opacity-60">
                {content.footer} <Heart size={12} fill="currentColor" /> Arghya
            </footer>
        </div>
    );
};

export default FinalScene;
