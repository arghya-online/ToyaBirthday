import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
    // Generate random hearts with more variety for depth
    const hearts = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 10}s`, // Slower, more calming
        delay: `${Math.random() * 5}s`,
        scale: Math.random() * 0.6 + 0.3, // Varying sizes
        opacity: Math.random() * 0.4 + 0.1, // Varying opacity
        blur: Math.random() > 0.6 ? "blur(2px)" : "blur(0px)", // Depth effect
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute bottom-0 text-rose-accent"
                    style={{
                        left: heart.left,
                        fontSize: `${heart.scale * 2}rem`,
                        opacity: heart.opacity,
                        filter: heart.blur
                    }}
                    animate={{
                        y: [-20, -1000],
                        opacity: [0, heart.opacity, 0],
                        rotate: [0, 45, -45, 0],
                    }}
                    transition={{
                        duration: parseFloat(heart.animationDuration),
                        repeat: Infinity,
                        delay: parseFloat(heart.delay),
                        ease: "linear",
                    }}
                >
                    ♥
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
