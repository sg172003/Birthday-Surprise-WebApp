import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationScreenProps {
  onContinue?: () => void;
}

const CelebrationScreen = ({ onContinue }: CelebrationScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBlowInstruction, setShowBlowInstruction] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showHappyBirthday, setShowHappyBirthday] = useState(false);
  const [showAfterEffect, setShowAfterEffect] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRefs = useRef<{
    instructionTimer?: NodeJS.Timeout;
    afterEffectTimer?: NodeJS.Timeout;
    completeTimer?: NodeJS.Timeout;
  }>({});

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    // Add comprehensive error handling for audio loading
    const handleAudioError = (e: Event) => {
      console.error('Audio failed to load:', e);
      console.error('Audio error details:', {
        networkState: audio.networkState,
        readyState: audio.readyState,
        error: audio.error
      });
    };

    const handleAudioLoaded = () => {
      console.log('Audio loaded successfully:', {
        duration: audio.duration,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
    };

    const handleLoadStart = () => {
      console.log('Audio loading started...');
    };

    const handleProgress = () => {
      console.log('Audio loading progress...');
    };

    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('canplaythrough', handleAudioLoaded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('progress', handleProgress);

    // Test if the browser supports the audio format
    const canPlayMP3 = audio.canPlayType('audio/mpeg');
    console.log('Browser MP3 support:', canPlayMP3);

    // Simplified audio setup - just try local file first
    audio.src = '/happy-birthday-theme.mp3';

    // Force load the audio
    audio.load();

    const tryPlay = async () => {
      try {
        // Wait for audio to be ready
        if (audio.readyState < 2) { // HAVE_CURRENT_DATA
          await new Promise((resolve) => {
            const checkReady = () => {
              if (audio.readyState >= 2) {
                resolve(true);
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
          });
        }

        await audio.play();
        console.log('Background music started immediately.');
        // Don't set audioReady automatically - wait for user interaction
      } catch (err) {
        // This is expected - browsers block autoplay for security
        console.log('🎵 Audio autoplay blocked (normal browser behavior). Music will start on first user interaction.');
        setAudioBlocked(true);

        const resumeAudio = async () => {
          try {
            if (audio.readyState >= 2) {
              await audio.play();
              console.log('🎵 Background music started after user interaction!');
              setAudioBlocked(false);
              setAudioReady(true);
            } else {
              console.log('🎵 Audio not ready yet, will try again...');
              // Try again after a short delay
              setTimeout(async () => {
                try {
                  await audio.play();
                  console.log('🎵 Background music started successfully!');
                  setAudioBlocked(false);
                  setAudioReady(true);
                } catch (retryErr) {
                  console.log('🎵 Unable to play background music, continuing without audio.');
                  setAudioBlocked(false);
                  setAudioReady(true); // Continue without audio
                }
              }, 500);
            }
          } catch (e) {
            console.log('🎵 Unable to play background music, continuing without audio.');
            setAudioBlocked(false);
            setAudioReady(true); // Continue without audio
          }
        };

        // Listen for any user interaction to start audio
        const events = ['click', 'touchstart', 'keydown'];
        events.forEach(event => {
          document.addEventListener(event, resumeAudio, { once: true });
        });
      }
    };

    // Wait a bit for the audio to start loading before trying to play
    setTimeout(tryPlay, 500);

    console.log('🎬 CelebrationScreen mounted - starting confetti');
    setShowConfetti(true);

    // Set video as loaded for testing
    setTimeout(() => {
      console.log('🎬 Setting video as loaded after 1s');
      setVideoLoaded(true);
    }, 1000);

    // Don't start timers immediately - wait for audio to be ready

    return () => {
      // Clear all timers
      Object.values(timerRefs.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });

      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.removeEventListener('canplaythrough', handleAudioLoaded);
        audioRef.current.removeEventListener('loadstart', handleLoadStart);
        audioRef.current.removeEventListener('progress', handleProgress);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Start video timeline when audio is ready
  useEffect(() => {
    if (audioReady) {
      console.log('🎬 Audio is ready! Starting video timeline...');

      // Clear any existing timers first
      Object.values(timerRefs.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });

      // Start the video timeline - show instruction much earlier
      timerRefs.current.instructionTimer = setTimeout(() => {
        console.log('🎬 Showing blow instruction');
        setShowBlowInstruction(true);
      }, 500); // Show instruction almost immediately after video starts

      timerRefs.current.afterEffectTimer = setTimeout(() => {
        console.log('🎬 Starting after effects (candles blowing out)');
        setShowBlowInstruction(false);
        setShowAfterEffect(true);
      }, 14000); // Added +2s: 12s + 2s = 14s

      timerRefs.current.completeTimer = setTimeout(() => {
        console.log('🎬 Showing happy birthday');
        setShowHappyBirthday(true);
      }, 16000); // Added +2s: 14s + 2s = 16s
    }
  }, [audioReady]);

  // No automatic fallback - video only starts with user interaction

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onContinue?.();
  };

  // Handle screen click to start video and audio
  const handleScreenClick = async () => {
    if (!audioReady) {
      console.log('🎬 User clicked! Starting video and audio...');

      // Try to start audio
      if (audioRef.current) {
        try {
          if (audioRef.current.readyState >= 2) {
            await audioRef.current.play();
            console.log('🎵 Audio started successfully!');
          } else {
            console.log('🎵 Audio not ready, but continuing with video');
          }
        } catch (e) {
          console.log('🎵 Audio failed, but continuing with video');
        }
      }

      // Start video timeline regardless of audio success
      setAudioBlocked(false);
      setAudioReady(true);
    }
  };

  // Generate responsive confetti pieces that match our theme
  const confettiPieces = Array.from({ length: 40 }, (_, i) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
      <motion.div
        key={i}
        className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
        style={{ backgroundColor: randomColor }}
        initial={{
          x: '50vw',
          y: '50vh',
          scale: 0,
          rotate: 0
        }}
        animate={showConfetti ? {
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
          scale: [0, 1, 0.8],
          rotate: Math.random() * 720
        } : {}}
        transition={{
          duration: 3 + Math.random() * 2,
          ease: "easeOut",
          delay: Math.random() * 0.5
        }}
      />
    );
  });

  return (
    <div
      className="fixed inset-0 overflow-hidden pb-20 sm:pb-24 md:pb-28 cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 25%, #e17055 50%, #fd79a8 75%, #6c5ce7 100%)'
      }}
      onClick={handleScreenClick}
    >

      {/* Confetti explosion */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {confettiPieces}
      </div>

      {/* Video Container with Advanced Background Removal */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative"
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 234, 167, 0.3) 30%, rgba(250, 177, 160, 0.2) 60%, transparent 100%)',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: showHappyBirthday ? 0.8 : 1,
            opacity: 1,
            y: showHappyBirthday ? -80 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
        >
          <video
            autoPlay
            muted
            playsInline
            onLoadedData={(e) => {
              setVideoLoaded(true);
              e.currentTarget.playbackRate = 0.75;
            }}
            className="w-auto h-64 sm:h-80 md:h-96 lg:h-[500px] max-w-none rounded-full"
            style={{
              // Lighter filters for clearer cake visibility
              filter: 'contrast(1.3) saturate(1.2) brightness(1.1)',

              // More aggressive masking to isolate just the cake
              maskImage: `
                radial-gradient(
                  ellipse 200px 300px at center,
                   rgba(0,0,0,1) 0%,
                   rgba(0,0,0,0.95) 35%,
                   rgba(0,0,0,0.8) 50%,
                   rgba(0,0,0,0.4) 70%,
                   rgba(0,0,0,0.1) 85%,
                   rgba(0,0,0,0) 100%
                )
              `,
              WebkitMaskImage: `
                radial-gradient(
                  ellipse 200px 300px at center,
                   rgba(0,0,0,1) 0%,
                   rgba(0,0,0,0.95) 35%,
                   rgba(0,0,0,0.8) 50%,
                   rgba(0,0,0,0.4) 70%,
                   rgba(0,0,0,0.1) 85%,
                   rgba(0,0,0,0) 100%
                )
              `,

              // Remove dark blend mode for clearer image
              mixBlendMode: 'normal'
            }}
          >
            <source
              src="https://cdn.builder.io/o/assets%2F12887d79bc5a481492fa1cde99e9bd2f%2F184ce27e3ed94aadb11c170d6ee3989e?alt=media&token=087233ed-e05c-4bc1-9c74-8437991a2b31&apiKey=12887d79bc5a481492fa1cde99e9bd2f"
              type="video/mp4"
            />
          </video>

          {/* Multiple overlay layers for seamless blending */}

          {/* Color correction layer */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background: `
                radial-gradient(
                  ellipse 200px 300px at center,
                   transparent 0%,
                   transparent 30%,
                   rgba(255, 255, 255, 0.05) 50%,
                   rgba(255, 234, 167, 0.08) 70%,
                   rgba(250, 177, 160, 0.12) 90%,
                   rgba(225, 112, 85, 0.15) 100%
                )
              `,
              mixBlendMode: 'soft-light'
            }}
          />

          {/* Background replacement layer */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background: `
                radial-gradient(
                  ellipse 250px 350px at center,
                   transparent 0%,
                   transparent 60%,
                   rgba(255, 234, 167, 0.05) 70%,
                   rgba(250, 177, 160, 0.1) 85%,
                   rgba(225, 112, 85, 0.2) 100%
                )
              `,
              mixBlendMode: 'normal'
            }}
          />
        </motion.div>
      </div>

      {/* User interaction prompt */}
      <AnimatePresence>
        {!audioReady && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-2xl border-2 border-yellow-400 text-center max-w-md mx-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Ready for the Show?
              </h2>
              <p className="text-gray-600 mb-4">
                Click anywhere to start the birthday celebration!
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>🎵 Music</span>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom "Blow out the candles" instruction overlay */}
      <AnimatePresence>
        {showBlowInstruction && !showHappyBirthday && videoLoaded && (
          <motion.div
            className="absolute top-8 sm:top-12 md:top-16 left-1/2 transform -translate-x-1/2 z-40 px-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-2xl border-2 sm:border-4"
              style={{ borderColor: '#fdcb6e' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 text-center">
                Blow out the candles! 🎂
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center">
                Watch the magic happen ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* After Effect - Magical sparkle explosion when candles are blown out */}
      <AnimatePresence>
        {showAfterEffect && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Realistic sparkle explosion */}
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-lg sm:text-xl md:text-2xl"
                style={{
                  left: '50%',
                  top: '50%'
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1, 0],
                  x: [0, (Math.cos(i * 14.4 * Math.PI / 180) * (80 + Math.random() * 60))],
                  y: [0, (Math.sin(i * 14.4 * Math.PI / 180) * (80 + Math.random() * 60))],
                  rotate: [0, 720],
                  opacity: [0, 1, 0.8, 0]
                }}
                transition={{
                  duration: 2.5,
                  ease: "easeOut",
                  delay: i * 1
                }}
              >
                ✨
              </motion.div>
            ))}

            {/* Realistic golden particles */}
            {Array.from({ length: 40 }, (_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  backgroundColor: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#ffed4e' : '#ff9500'
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.5, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, -Math.random() * 150 - 50, -Math.random() * 250 - 100],
                  opacity: [0, 1, 0.6, 0],
                  rotate: [0, Math.random() * 360]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: "easeOut",
                  delay: Math.random() * 0.8
                }}
              />
            ))}

            {/* Magic burst effect */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 3],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.5 }}
            >
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,235,59,0.6) 30%, rgba(255,193,7,0.4) 60%, transparent 100%)'
                }}
              />
            </motion.div>

            {/* Text effect */}
            <motion.div
              className="absolute left-1/2 top-1/4 sm:top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center px-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.8)' }}
                animate={{
                  scale: [1, 1.1, 1],
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.8)',
                    '0 0 30px rgba(255,235,59,1)',
                    '0 0 20px rgba(255,255,255,0.8)'
                  ]
                }}
                transition={{ duration: 1, repeat: 2 }}
              >
                ✨ Magical! ✨
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Happy Birthday text and continue button - Fixed at bottom center */}
      <AnimatePresence>
        {showHappyBirthday && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 backdrop-blur-md border-t border-white/20 shadow-2xl z-50"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 234, 167, 0.6) 0%, rgba(250, 177, 160, 0.6) 25%, rgba(225, 112, 85, 0.6) 50%, rgba(253, 121, 168, 0.6) 75%, rgba(108, 92, 231, 0.6) 100%)',
              borderImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%) 1'
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
              <div className="text-center">
                <motion.h1
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #dee2e6 75%, #adb5bd 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 2px 10px rgba(255,255,255,0.3)'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                >
                  Happy Birthday! 
                </motion.h1>

                <motion.button
                  onClick={handleContinue}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-2xl overflow-hidden group relative backdrop-blur-sm border-2 border-white/20 transform transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Enhanced shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                    animate={{
                      translateX: ['100%', '100%', '-100%', '-100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <span className="relative z-10">
                    Continue the Magic! ✨
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient floating sparkles around the edges */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-200 text-base sm:text-lg md:text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 360],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Subtle edge vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
               transparent 0%,
               transparent 70%,
               rgba(0,0,0,0.1) 100%
            )
          `
        }}
      />
    </div>
  );
};

export default CelebrationScreen;
