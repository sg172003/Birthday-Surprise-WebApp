import { useState } from 'react';
import './global.css';

// Import all screen components
import LoadingScreen from './components/screens/LoadingScreen';
import CountdownScreen from './components/screens/CountdownScreen';
import CelebrationScreen from './components/screens/CelebrationScreen';
import HappyBirthdayScreen from './components/screens/HappyBirthdayScreen';
import MessagesScreen from './components/screens/MessagesScreen';
import MomentsScreen from './components/screens/MomentsScreen';
import LetterScreen from './components/screens/LetterScreen';
import FinalScreen from './components/screens/FinalScreen';

// Customizable configuration
export const APP_CONFIG = {
  // Birthday person's name
  birthdayPersonName: "Laddu Baccha💖",
  
  // Target birthday date (YYYY-MM-DD format)
  targetDate: "2025-07-18", // Change this to the actual birthday date
  
  // Special messages for the MessagesScreen
  messages: [
  "Being with you feels like finding peace in the chaos 🌿",
  "Your smile has a way of making the world feel right again ☀️",
  "You’re not just a part of my life—you’re the calm in my story 📖",
  "In your presence, even silence feels like a conversation worth having 💬"
  ],
  
  // Letter content for LetterScreen
  get letterContent() {
    return `Dear ${this.birthdayPersonName},

On this special day, I want to take a moment to tell you that You are not just a part of my life—you *are* my life’s most precious part.  
Your presence is a melody that brings peace to my chaos,  
a poetry that turns my ordinary into something magical.  

Main dil se kehna chahta hoon...  
_"Tere hone se roshan hai meri duniya,  
Har dua mein tu hai, har khushi mein tera saath hai."_  

I am truly very proud to have you in my life.  
You are one of the most beautiful human beings I have ever met inside and out.
 Your compassion, your laugh, your soul—they make everything better.  
Thank you for being you. For being mine.  
May this new year bring you all the joy your heart can hold,  
and may I always get the honour of walking by your side.

**Happy Birthday, meri jaan** 🎂💖

With infinite love and a heart full of you,  
Yours—forever and always 💝 Chipku
I love you 3000 baccha❤️`;
  },

  // Moments image (you can replace with actual image URL)
  momentsImageUrl: "/placeholder.svg"
};

type Screen = 'loading' | 'countdown' | 'celebration' | 'happyBirthday' | 'messages' | 'moments' | 'letter' | 'final';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');

  const goToNextScreen = () => {
    const screenOrder: Screen[] = ['loading', 'countdown', 'celebration', 'happyBirthday', 'messages', 'moments', 'letter', 'final'];
    const currentIndex = screenOrder.indexOf(currentScreen);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < screenOrder.length) {
      setCurrentScreen(screenOrder[nextIndex]);
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen onComplete={() => setCurrentScreen('countdown')} />;
      case 'countdown':
        return <CountdownScreen targetDate={APP_CONFIG.targetDate} onComplete={() => setCurrentScreen('celebration')} />;
      case 'celebration':
        return <CelebrationScreen onContinue={() => setCurrentScreen('happyBirthday')} />;
      case 'happyBirthday':
        return <HappyBirthdayScreen name={APP_CONFIG.birthdayPersonName} onContinue={() => setCurrentScreen('messages')} />;
      case 'messages':
        return <MessagesScreen messages={APP_CONFIG.messages} onContinue={() => setCurrentScreen('moments')} />;
      case 'moments':
        return <MomentsScreen imageUrl={APP_CONFIG.momentsImageUrl} onContinue={() => setCurrentScreen('letter')} />;
      case 'letter':
        return <LetterScreen content={APP_CONFIG.letterContent} onComplete={() => setCurrentScreen('final')} />;
      case 'final':
        return <FinalScreen />;
      default:
        return <LoadingScreen onComplete={() => setCurrentScreen('countdown')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
