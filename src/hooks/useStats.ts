
import { useState, useEffect, useCallback } from 'react';
import { UserStats } from '../types';
import { getStats, recordSessionCompletion as recordInStorage } from '../services/statsService';

export const useStats = () => {
  const [stats, setStats] = useState<UserStats>(getStats());

  const refreshStats = useCallback(() => {
    setStats(getStats());
  }, []);

  const addSession = useCallback((minutes: number) => {
    const updated = recordInStorage(minutes);
    setStats(updated);
    return updated;
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return { stats, addSession, refreshStats };
};
