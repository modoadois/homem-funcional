
import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialSeconds: number, onComplete: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, []);

  const progress = (1 - timeLeft / initialSeconds) * 100;

  return { 
    timeLeft, 
    formatTime: () => formatTime(timeLeft), 
    progress,
    isActive,
    pause: () => setIsActive(false),
    resume: () => setIsActive(true)
  };
};
