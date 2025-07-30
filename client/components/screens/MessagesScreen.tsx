import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessagesScreenProps {
  messages: string[];
  onContinue: () => void;
}

const MessagesScreen = ({ messages, onContinue }: MessagesScreenProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const handleCardClick = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
    } else {
      // All messages shown, reveal continue button
      setShowContinueButton(true);
    }
  };

  const remainingMessages = messages.length - currentMessageIndex;
  const currentMessage = messages[currentMessageIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 px-6">
      <div className="text-center max-w-2xl w-full">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-purple-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Special Messages
        </motion.h1>
        
        {/* Messages remaining counter */}
        {!showContinueButton && (
          <motion.p
            className="text-lg text-purple-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {remainingMessages} message{remainingMessages !== 1 ? 's' : ''} remaining
          </motion.p>
        )}
        
        {/* Card stack container */}
        <div className="relative h-80 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            {!showContinueButton && (
              <motion.div
                key={currentMessageIndex}
                className="relative cursor-pointer"
                onClick={handleCardClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background cards (stack effect) */}
                {Array.from({ length: Math.min(3, remainingMessages) }, (_, i) => (
                  <motion.div
                    key={`bg-${currentMessageIndex}-${i}`}
                    className="absolute w-80 h-60 bg-white rounded-2xl shadow-lg border-2 border-purple-200"
                    style={{
                      zIndex: 3 - i,
                      transform: `translateY(${i * 8}px) translateX(${i * 4}px) rotateZ(${i * 2}deg)`,
                      opacity: 1 - (i * 0.3)
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1 - (i * 0.05), 
                      opacity: 1 - (i * 0.3),
                      rotateZ: i * 2,
                      x: i * 4,
                      y: i * 8
                    }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                ))}
                
                {/* Main message card */}
                <motion.div
                  className="relative w-80 h-60 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border-2 border-purple-300 flex items-center justify-center p-6 z-10"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ 
                    scale: 1.1, 
                    rotate: 15, 
                    x: window.innerWidth,
                    opacity: 0 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15,
                    exit: { duration: 0.6 }
                  }}
                >
                  <p className="text-lg md:text-xl text-purple-800 text-center leading-relaxed">
                    {currentMessage}
                  </p>
                  
                  {/* Card shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* All messages revealed state */}
          {showContinueButton && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">💖</div>
              <p className="text-2xl text-purple-700 font-semibold mb-6">
                All messages revealed!
              </p>
            </motion.div>
          )}
        </div>
        
        {/* Click instruction */}
        {!showContinueButton && (
          <motion.p
            className="text-purple-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Click the card to reveal the next message ✨
          </motion.p>
        )}
        
        {/* Continue button */}
        <AnimatePresence>
          {showContinueButton && (
            <motion.button
              onClick={onContinue}
              className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Moments →
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400 text-xl"
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
    </div>
  );
};

export default MessagesScreen;
