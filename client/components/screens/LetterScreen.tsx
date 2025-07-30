import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./LetterScreen.css";
interface LetterScreenProps {
  content: string;
  onComplete: () => void;
}

const LetterScreen = ({ content, onComplete }: LetterScreenProps) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Typing effect with auto-scroll
  useEffect(() => {
    if (!isEnvelopeOpen) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1));
        index++;

        // Auto-scroll to bottom
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    }, 90); // Slower typing speed

    return () => clearInterval(timer);
  }, [isEnvelopeOpen, content, onComplete]);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
  };

  const sparkles = Array.from({ length: 15 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-yellow-400 text-sm pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
      animate={{
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
        opacity: [0, 0.8, 0]
      }}
      transition={{
        duration: 2 + Math.random(),
        repeat: Infinity,
        delay: Math.random() * 3
      }}
    >
      ✨
    </motion.div>
  ));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          <motion.div
            key="envelope"
            className="flex items-center justify-center min-h-screen px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-amber-800 mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                A Special Letter For You
              </motion.h1>

              <motion.div
                className="relative cursor-pointer mx-auto"
                onClick={handleEnvelopeClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <div className="w-80 h-56 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg shadow-xl relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-200 to-orange-300 origin-top"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)"
                    }}
                    animate={{ rotateX: [0, 0, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <div className="absolute top-12 left-8 right-8 bottom-8 bg-white rounded shadow-inner">
                    <div className="p-4 text-xs text-gray-600 leading-relaxed">
                      <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="w-4/5 h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="w-3/5 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    💖
                  </motion.div>
                </div>
              </motion.div>

              <motion.p
                className="text-amber-700 text-lg mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                Click to open ✨
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="min-h-screen p-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 pointer-events-none">
              {sparkles}
            </div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                ref={scrollRef}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl p-8 md:p-12 relative border border-amber-200 overflow-y-auto hide-scrollbar"
                style={{ maxHeight: 'calc(100vh - 6rem)' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] rounded-2xl"></div>

                <div className="relative z-10">
                  <motion.div
                    className="text-amber-800 text-lg md:text-xl leading-relaxed whitespace-pre-line font-serif"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    {displayedText}
                    {!isTypingComplete && (
                      <motion.span
                        className="inline-block w-0.5 h-6 bg-amber-600 ml-1"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {isTypingComplete && (
                    <motion.div
                      className="mt-8 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="text-3xl text-pink-500">💕</div>
                    </motion.div>
                  )}
                </div>

                <div className="absolute -bottom-2 -right-2 w-full h-full bg-amber-900/10 rounded-2xl -z-10"></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetterScreen;
