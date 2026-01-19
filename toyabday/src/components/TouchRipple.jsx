import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TouchRipple = () => {
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const ripple = {
                x: e.clientX,
                y: e.clientY,
                id: Date.now()
            };
            setRipples((prev) => [...prev, ripple]);
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{ opacity: 0.5, scale: 0 }}
                        animate={{ opacity: 0, scale: 4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                        className="absolute w-8 h-8 rounded-full border border-rose-accent/50 bg-rose-accent/10 -translate-x-1/2 -translate-y-1/2"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TouchRipple;
