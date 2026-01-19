import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const DoctorScene = () => {
    const { image, caption, content } = siteContent.sections.find(s => s.id === 'doctor');
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".doc-frame", {
            scale: 0.5,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.2)"
        })
            .from(".doc-overlay-text", {
                opacity: 0,
                y: 20,
                duration: 1
            }, "-=0.5")
            .from(".doc-heading", {
                opacity: 0,
                y: -30,
                duration: 1,
                ease: "power2.out"
            })
            .from(".doc-line", {
                opacity: 0,
                duration: 1.5,
                stagger: 2.5
            }, "+=0.5");

        // Sparkle animation loop
        gsap.to(".sparkle-icon", {
            scale: 1.2,
            rotation: 15,
            opacity: 1,
            duration: 2,
            stagger: {
                each: 0.5,
                repeat: -1,
                yoyo: true
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen px-4 z-10 relative">
            <div className="relative mb-10">
                <div className="doc-frame relative z-10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.6)] border-4 border-white/80 max-w-sm md:max-w-md">
                    <img src={image} alt="Doctor Sumedha" className="w-full h-auto object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-deep-maroon/70 via-transparent to-transparent opacity-80" />

                    <div className="doc-overlay-text absolute bottom-6 left-0 right-0 text-center text-white font-serif text-2xl tracking-wide">
                        {caption}
                    </div>
                </div>

                {/* Sparkles */}
                <div className="sparkle-icon absolute -top-8 -right-8 text-yellow-300 z-20 opacity-50">
                    <Sparkles size={48} />
                </div>
                <div className="sparkle-icon absolute -bottom-6 -left-6 text-rose-300 z-20 opacity-50">
                    <Sparkles size={36} />
                </div>
            </div>

            <div className="max-w-2xl text-center space-y-6">
                <h2 className="doc-heading text-4xl md:text-5xl font-serif text-deep-maroon font-bold">
                    {content.heading}
                </h2>

                <div className="space-y-4">
                    {content.lines.map((line, i) => (
                        <p key={i} className="doc-line text-lg md:text-xl text-deep-maroon/90 font-medium leading-relaxed">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorScene;
