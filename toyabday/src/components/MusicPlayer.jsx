import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio('/bg-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // Suggest interaction for autoplay policies
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(e => console.log("Audio play failed:", e));
            }
            // Remove listeners once we've tried to play
            ['click', 'touchstart', 'keydown'].forEach(event =>
                window.removeEventListener(event, handleInteraction)
            );
        };

        // Try to play immediately (might work if user already interacted with domain)
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
            // If failed, wait for interaction
            ['click', 'touchstart', 'keydown'].forEach(event =>
                window.addEventListener(event, handleInteraction)
            );
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            ['click', 'touchstart', 'keydown'].forEach(event =>
                window.removeEventListener(event, handleInteraction)
            );
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="hidden fixed bottom-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full text-rose-accent shadow-lg border border-rose-accent/20"
            style={{ boxShadow: isPlaying ? "0 0 15px rgba(210, 92, 101, 0.4)" : "none" }}
        >
            {isPlaying ? <Music size={24} className="animate-pulse" /> : <VolumeX size={24} />}
        </motion.button>
    );
};

export default MusicPlayer;
