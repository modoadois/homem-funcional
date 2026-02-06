
import { UserStats } from "../types";

const STORAGE_KEY = 'inertia_disparador_stats';

const DEFAULT_STATS: UserStats = {
  minutesFocused: 0,
  streak: 0,
  tasksCompleted: 0
};

interface ExtendedStats extends UserStats {
  lastCompletionDate?: string; // stored as toDateString()
}

export const getStats = (): ExtendedStats => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_STATS;
  try {
    const parsed = JSON.parse(stored);
    // Check if streak is still valid (was last completion today or yesterday?)
    const today = new Date();
    const lastDate = parsed.lastCompletionDate ? new Date(parsed.lastCompletionDate) : null;
    
    if (lastDate) {
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // If more than 1 day has passed since last completion, reset streak
      // Note: diffDays 1 is tomorrow, so > 1 means a day was skipped
      if (diffDays > 1 && today.toDateString() !== lastDate.toDateString()) {
        parsed.streak = 0;
        saveStats(parsed);
      }
    }
    
    return parsed;
  } catch {
    return DEFAULT_STATS;
  }
};

const saveStats = (stats: ExtendedStats) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
};

export const recordSessionCompletion = (minutes: number) => {
  const stats = getStats();
  const today = new Date().toDateString();
  const lastDate = stats.lastCompletionDate;

  // Update minutes and tasks
  stats.minutesFocused += minutes;
  stats.tasksCompleted += 1;

  // Update streak
  if (!lastDate) {
    stats.streak = 1;
  } else if (lastDate === today) {
    // Already did something today, streak stays the same
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastDate === yesterday.toDateString()) {
      stats.streak += 1;
    } else {
      stats.streak = 1;
    }
  }

  stats.lastCompletionDate = today;
  saveStats(stats);
  return stats;
};
