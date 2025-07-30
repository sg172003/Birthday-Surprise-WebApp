import { motion } from 'framer-motion';

interface HappyBirthdayScreenProps {
  name: string;
  onContinue: () => void;
}

const HappyBirthdayScreen = ({ name, onContinue }: HappyBirthdayScreenProps) => {
  // Generate floating balloons
  const balloons = Array.from({ length: 12 }, (_, i) => {
    const balloonColors = ['🎈', '🟥', '🟦', '🟨', '🟩', '🟪', '🟧'];
    const balloonEmoji = balloonColors[i % balloonColors.length];
    
    return (
      <motion.div
        key={i}
        className="absolute text-4xl md:text-5xl"
        initial={{
          y: '100vh',
          x: Math.random() * (window.innerWidth - 100),
          rotate: 0
        }}
        animate={{
          y: '-10vh',
          rotate: [0, 10, -10, 0],
          x: [
            Math.random() * (window.innerWidth - 100),
            Math.random() * (window.innerWidth - 100) + (Math.random() - 0.5) * 100
          ]
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "linear",
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {balloonEmoji}
      </motion.div>
    );
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 overflow-hidden">
      {/* Floating balloons background */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons}
      </div>
      
      <div className="text-center z-10 px-6">
        {/* Birthday cake */}
        <motion.div
          className="text-8xl md:text-9xl mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 8,
            delay: 0.3
          }}
        >
          🎂
        </motion.div>
        
        {/* Happy Birthday text */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-purple-800 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Happy Birthday!
        </motion.h1>
        
        {/* Name */}
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-pink-600 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {name}
        </motion.h2>
        
        {/* Continue button */}
        <motion.button
          onClick={onContinue}
          className="px-8 py-4 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Continue the Magic →
        </motion.button>
        
        {/* Sparkle effects around the cake */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400 text-xl"
              style={{
                left: '50%',
                top: '25%'
              }}
              animate={{
                x: [0, (Math.cos(i * 60 * Math.PI / 180) * 80)],
                y: [0, (Math.sin(i * 60 * Math.PI / 180) * 80)],
                scale: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 2 + (i * 0.2),
                repeatDelay: 1.5
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
        
        {/* Party popper effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${20 + i * 20}%`,
                top: '10%'
              }}
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              🎉
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappyBirthdayScreen;
