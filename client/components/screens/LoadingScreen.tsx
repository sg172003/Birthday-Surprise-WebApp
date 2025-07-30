import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate floating hearts
  const floatingHearts = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-pink-200 text-xl opacity-30"
      initial={{ 
        y: "100vh", 
        x: Math.random() * window.innerWidth,
        opacity: 0
      }}
      animate={{ 
        y: "-20vh", 
        opacity: [0, 0.3, 0],
        rotate: [0, 360]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`
      }}
    >
      💖
    </motion.div>
  ));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingHearts}
      </div>
      
      <div className="text-center z-10">
        {/* Main heart with pulse animation */}
        <motion.div
          className="text-8xl mb-8"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💖
        </motion.div>
        
        {/* Main text */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-purple-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Preparing Something Special
        </motion.h1>
        
        {/* Subtext */}
        <motion.p
          className="text-xl md:text-2xl text-purple-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          For someone very special...
        </motion.p>
        
        {/* Loading dots */}
        <motion.div
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
