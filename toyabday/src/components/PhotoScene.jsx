import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { siteContent } from '../data/siteContent';

const PhotoScene = () => {
    const { image, caption, content } = siteContent.sections.find(s => s.id === 'photo');
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".photo-frame", {
            scale: 0.8,
            rotation: -5,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        })
            .to(".photo-curtain", {
                height: 0,
                duration: 1.5,
                ease: "power2.inOut"
            }, "-=1")
            .from(".photo-caption", {
                opacity: 0,
                y: 20,
                duration: 1
            })
            .from(".photo-line", {
                opacity: 0,
                y: 20,
                stagger: 2,
                duration: 1,
                ease: "power2.out"
            }, "+=0.5");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen px-4 z-10 relative">
            <div className="photo-frame bg-white pb-6 rounded-2xl shadow-2xl max-w-[90%] md:max-w-md w-full transform rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="bg-gray-100 aspect-[3/4] mb-4 relative">
                    <img
                        src={image}
                        alt="Her photo"
                        className="w-full h-full object-cover"
                    />
                    <div className="photo-curtain absolute inset-0 bg-white z-10" />
                </div>

                <p className="photo-caption text-center font-serif text-3xl text-deep-maroon italic px-4">
                    {caption}
                </p>
            </div>

            <div className="mt-12 space-y-6 text-center max-w-lg">
                {content.lines.map((line, i) => (
                    <p key={i} className="photo-line text-xl md:text-2xl font-medium text-deep-maroon/80">
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default PhotoScene;
