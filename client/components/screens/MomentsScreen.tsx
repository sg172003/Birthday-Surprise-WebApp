import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MomentsScreenProps {
  imageUrl: string;
  onContinue: () => void;
}

const MomentsScreen = ({ imageUrl, onContinue }: MomentsScreenProps) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="text-center max-w-4xl w-full">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-purple-800 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Moments With You
        </motion.h1>

        <AnimatePresence mode="wait">
          {!showFallback ? (
            <motion.div
              key="frame"
              className="relative mx-auto mb-12 w-full max-w-2xl"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-white p-4 rounded-3xl shadow-2xl transform rotate-1">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="Special moment"
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-xl">Beautiful Memories</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-200 transform rotate-45 opacity-80"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-200 transform rotate-45 opacity-80"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-yellow-200 transform rotate-45 opacity-80"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-200 transform rotate-45 opacity-80"></div>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-300/20 via-purple-300/20 to-indigo-300/20 rounded-3xl blur-xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="fallback"
              className="mb-12 px-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-xl md:text-2xl text-purple-700 font-semibold">
                Oops 😢, It seems like We don't have any moments together 😭😭. <br />
                Please meet me soon baccha , so that We can create Our own beautiful moment together.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={onContinue}
          className="px-8 py-4 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          One Last Thing →
        </motion.button>

        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-2xl"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400 text-lg"
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
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MomentsScreen;
