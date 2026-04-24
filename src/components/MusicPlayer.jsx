import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Track list — reads from public/mp3/
const tracks = [
    { title: "Gbe Body Trap", src: "/mp3/Gbe Body Trap.mp3" },
    { title: "Gbedu Activate", src: "/mp3/Gbedu Activate.mp3" },
    { title: "Highlander", src: "/mp3/Highlander.mp3" },
    { title: "I Feel Am", src: "/mp3/I Feel Am.mp3" },
    { title: "Na You", src: "/mp3/Na You.mp3" },
    { title: "Sweet Melody", src: "/mp3/Sweet Melody.mp3" },
    { title: "Tanko Groove", src: "/mp3/Tanko Groove.mp3" },
    { title: "The Rhythm of Recovery", src: "/mp3/The Rhythm of Recovery.mp3" },
];

// Format time in mm:ss
const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// SVG Icons as components
const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

const PrevIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
);

const NextIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
);

const ShuffleIcon = ({ active }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active ? "#f59e0b" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
);

const VolumeIcon = ({ muted, volume }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {!muted && volume > 0 && (
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        )}
        {!muted && volume > 0.5 && (
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        )}
        {(muted || volume === 0) && (
            <line x1="23" y1="9" x2="17" y2="15" />
        )}
    </svg>
);

const MusicNoteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const ListIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

const MusicPlayer = () => {
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);

    const track = tracks[currentTrack];

    // Update time
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => handleNext();

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack, shuffle]);

    // Handle volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
        if (isMinimized) setIsMinimized(false);
    }, [isPlaying, isMinimized]);

    const handleNext = useCallback(() => {
        if (shuffle) {
            let next;
            do {
                next = Math.floor(Math.random() * tracks.length);
            } while (next === currentTrack && tracks.length > 1);
            setCurrentTrack(next);
        } else {
            setCurrentTrack((prev) => (prev + 1) % tracks.length);
        }
        setCurrentTime(0);
        setTimeout(() => {
            if (isPlaying && audioRef.current) {
                audioRef.current.play().catch(() => {});
            }
        }, 100);
    }, [shuffle, currentTrack, isPlaying]);

    const handlePrev = useCallback(() => {
        if (currentTime > 3) {
            // Restart current track if more than 3 seconds in
            audioRef.current.currentTime = 0;
        } else {
            setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
            setCurrentTime(0);
            setTimeout(() => {
                if (isPlaying && audioRef.current) {
                    audioRef.current.play().catch(() => {});
                }
            }, 100);
        }
    }, [currentTime, isPlaying]);

    const handleSeek = (e) => {
        const bar = progressRef.current;
        if (!bar) return;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const time = percent * duration;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const selectTrack = (index) => {
        setCurrentTrack(index);
        setCurrentTime(0);
        setIsPlaying(true);
        setShowPlaylist(false);
        if (isMinimized) setIsMinimized(false);
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().catch(() => {});
            }
        }, 100);
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    // Minimized floating button
    if (isMinimized) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                {/* Pulse rings */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{
                        scale: [1, 1.8, 2.2],
                        opacity: [0.4, 0.15, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/15"
                    animate={{
                        scale: [1, 1.5, 1.8],
                        opacity: [0.3, 0.1, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.4,
                    }}
                />
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    onClick={() => setIsMinimized(false)}
                    className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 flex items-center justify-center hover:shadow-amber-500/50 hover:scale-110 transition-all duration-300"
                    title="Open Music Player"
                    id="music-player-toggle"
                >
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                    >
                        <MusicNoteIcon />
                    </motion.div>
                </motion.button>
            </div>
        );
    }

    return (
        <>
            <audio ref={audioRef} src={track.src} preload="metadata" />

            <AnimatePresence>
                {showPlaylist && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-24 right-6 z-50 w-80 max-h-80 rounded-2xl overflow-hidden"
                        style={{
                            background: 'rgba(28, 25, 23, 0.92)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div className="p-4 border-b border-white/5">
                            <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                                <MusicNoteIcon /> Playlist
                                <span className="text-stone-500 text-xs ml-auto">{tracks.length} tracks</span>
                            </h4>
                        </div>
                        <div className="overflow-y-auto max-h-60 custom-scrollbar">
                            {tracks.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => selectTrack(i)}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors hover:bg-white/5 ${
                                        i === currentTrack ? 'bg-amber-500/10' : ''
                                    }`}
                                    id={`playlist-track-${i}`}
                                >
                                    <span className={`text-xs w-5 text-center ${
                                        i === currentTrack ? 'text-amber-400' : 'text-stone-600'
                                    }`}>
                                        {i === currentTrack && isPlaying ? (
                                            <motion.span
                                                animate={{ opacity: [1, 0.3, 1] }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                            >♫</motion.span>
                                        ) : (
                                            i + 1
                                        )}
                                    </span>
                                    <span className={`text-sm truncate ${
                                        i === currentTrack ? 'text-amber-400 font-medium' : 'text-stone-300'
                                    }`}>
                                        {t.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-6 right-6 z-50"
                id="music-player"
            >
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: 'rgba(28, 25, 23, 0.92)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(245,158,11,0.08)',
                        width: isExpanded ? '340px' : '300px',
                        transition: 'width 0.3s ease',
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 pt-3 pb-1">
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                                className="text-amber-400"
                            >
                                <MusicNoteIcon />
                            </motion.div>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                                Now Playing
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1 text-stone-500 hover:text-white transition-colors"
                                title={isExpanded ? "Collapse" : "Expand"}
                            >
                                {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </button>
                            <button
                                onClick={() => {
                                    setIsMinimized(true);
                                    setShowPlaylist(false);
                                }}
                                className="p-1 text-stone-500 hover:text-white transition-colors text-xs"
                                title="Minimize"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Track Info */}
                    <div className="px-4 pb-2">
                        <motion.h3
                            key={track.title}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white font-semibold text-sm truncate"
                        >
                            {track.title}
                        </motion.h3>
                        <p className="text-stone-500 text-[11px]">
                            Track {currentTrack + 1} of {tracks.length}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-4 pb-1">
                        <div
                            ref={progressRef}
                            onClick={handleSeek}
                            className="w-full h-1.5 bg-white/5 rounded-full cursor-pointer group relative overflow-hidden"
                        >
                            <motion.div
                                className="h-full rounded-full relative"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                                }}
                            >
                                <div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </motion.div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-stone-600">{formatTime(currentTime)}</span>
                            <span className="text-[10px] text-stone-600">{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="px-4 pb-3 flex items-center justify-between">
                        <button
                            onClick={() => setShuffle(!shuffle)}
                            className={`p-1.5 rounded-full transition-colors ${
                                shuffle ? 'text-amber-400 bg-amber-400/10' : 'text-stone-500 hover:text-white'
                            }`}
                            title="Shuffle"
                            id="music-shuffle"
                        >
                            <ShuffleIcon active={shuffle} />
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                className="p-1.5 text-stone-400 hover:text-white transition-colors"
                                title="Previous"
                                id="music-prev"
                            >
                                <PrevIcon />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
                                title={isPlaying ? "Pause" : "Play"}
                                id="music-play"
                            >
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>

                            <button
                                onClick={handleNext}
                                className="p-1.5 text-stone-400 hover:text-white transition-colors"
                                title="Next"
                                id="music-next"
                            >
                                <NextIcon />
                            </button>
                        </div>

                        <button
                            onClick={() => setShowPlaylist(!showPlaylist)}
                            className={`p-1.5 rounded-full transition-colors ${
                                showPlaylist ? 'text-amber-400 bg-amber-400/10' : 'text-stone-500 hover:text-white'
                            }`}
                            title="Playlist"
                            id="music-playlist-toggle"
                        >
                            <ListIcon />
                        </button>
                    </div>

                    {/* Expanded: Volume Control */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-4 pb-3 flex items-center gap-3 border-t border-white/5 pt-3">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="text-stone-500 hover:text-white transition-colors"
                                        title={isMuted ? "Unmute" : "Mute"}
                                    >
                                        <VolumeIcon muted={isMuted} volume={volume} />
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => {
                                            setVolume(parseFloat(e.target.value));
                                            setIsMuted(false);
                                        }}
                                        className="flex-1 accent-amber-500 h-1 cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #f59e0b ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.05) ${(isMuted ? 0 : volume) * 100}%)`,
                                            borderRadius: '4px',
                                            WebkitAppearance: 'none',
                                            height: '4px',
                                        }}
                                        id="music-volume"
                                    />
                                    <span className="text-[10px] text-stone-600 w-7 text-right">
                                        {isMuted ? '0' : Math.round(volume * 100)}%
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
};

export default MusicPlayer;
