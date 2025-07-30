import { motion } from 'framer-motion';

const FinalScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-950 to-pink-950 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="text-center px-6 relative z-10">
        {/* Main title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          Happy Birthday Once Again!🥳
        </motion.h1>

        {/* Code icon and illustration container */}
        <motion.div
          className="flex flex-col items-center space-y-6 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {/* Coding icon */}
          <div className="text-5xl md:text-7xl text-cyan-300 font-serif font-bold drop-shadow-lg">
            My dear Laddu Baccha
          </div>

          {/* Simple illustration */}
          <motion.div
            className="flex items-center space-x-4"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-4xl animate-bounce">🎂</div>
            <div className="text-4xl animate-pulse">✨</div>
            <div className="text-4xl animate-bounce">💖</div>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-purple-200 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Made with love 💖
        </motion.p>

        {/* End message */}
        <motion.div
          className="mt-12 text-pink-300 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <div className="text-lg md:text-xl font-semibold mb-2">
            Thank you for celebrating 🎉 your 20th birthday with me😊
          </div>
          <div className="text-lg md:text-xl font-semibold mb-2">
            Your presence makes every moment brighter. Here's to many more adventures together! 🎉
          </div>
        </motion.div>

        {/* Subtle floating stars */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-white opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 12}px`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        {/* Gentle glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent z-0"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
    
  );
};

export default FinalScreen;
