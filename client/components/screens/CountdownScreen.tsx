import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownScreenProps {
  targetDate: string;
  onComplete: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownScreen = ({ targetDate, onComplete }: CountdownScreenProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCelebrationPopup, setShowCelebrationPopup] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setShowCelebrationPopup(true);
        // Auto-transition after showing popup for 2 seconds
        setTimeout(() => {
          onComplete();
        }, 2000);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const NumberBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center mb-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            className="text-2xl md:text-3xl font-bold text-purple-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        
        {/* Flip effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-purple-200 to-transparent opacity-20"
          animate={{
            scaleY: [0, 1, 0]
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        />
      </div>
      <span className="text-purple-700 font-medium text-sm md:text-base uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
      <div className="text-center px-6">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-purple-800 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Birthday Countdown
        </motion.h1>
        
        {/* Countdown boxes */}
        <motion.div
          className="flex justify-center space-x-4 md:space-x-8 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <NumberBox value={timeLeft.days} label="Days" />
          <NumberBox value={timeLeft.hours} label="Hours" />
          <NumberBox value={timeLeft.minutes} label="Minutes" />
          <NumberBox value={timeLeft.seconds} label="Seconds" />
        </motion.div>
        
        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Until the special day arrives! 🎉
        </motion.p>
        
        {/* Animated sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
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

      {/* Celebration Popup */}
      <AnimatePresence>
        {showCelebrationPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md mx-6"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">
                Time's Up!
              </h2>
              <p className="text-xl text-purple-600">
                Let's celebrate together! 🎂
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountdownScreen;
