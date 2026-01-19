import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { siteContent } from '../data/siteContent';

const Intro = () => {
    const { content } = siteContent.sections.find(s => s.id === 'intro');
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".intro-greeting", { opacity: 0, y: 30, duration: 1.5, ease: "power2.out" })
            .from(".intro-sub", { opacity: 0, duration: 1.5, ease: "power2.out" }, "+=0.5")
            .from(".intro-heading", { scale: 0.8, opacity: 0, duration: 2, ease: "elastic.out(1, 0.5)" }, "+=0.5")
            .from(".intro-note", { opacity: 0, y: 10, duration: 1.5, ease: "power2.out" }, "+=1");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative z-10 font-serif">
            <h2 className="intro-greeting text-3xl md:text-4xl font-light text-rose-accent mb-6">
                {content.greeting}
            </h2>

            <p className="intro-sub text-xl text-deep-maroon/80 mb-10 font-sans">
                {content.subgreeting}
            </p>

            <div className="overflow-hidden mb-8">
                <h1 className="intro-heading text-6xl md:text-8xl font-bold text-deep-maroon leading-none">
                    {content.heading}
                </h1>
            </div>

            <p className="intro-note text-base md:text-lg text-deep-maroon/60 italic mt-8 animate-pulse">
                {content.note}
            </p>
        </div>
    );
};

export default Intro;
