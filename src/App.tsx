
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import StepsScreen from './screens/StepsScreen';
import TimerScreen from './screens/TimerScreen';
import VictoryScreen from './screens/VictoryScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import ShareScreen from './screens/ShareScreen';
import { TaskStep } from './types';

const App: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<string>('');
  const [currentSteps, setCurrentSteps] = useState<TaskStep[]>([]);
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        setHasKey(false);
      }
    };
    checkKey();
  }, []);

  if (hasKey === null) return null; // Or a simple loader

  return (
    <HashRouter>
      <div className="max-w-md mx-auto h-[100dvh] flex flex-col relative overflow-hidden border-x border-slate-200 dark:border-slate-800 shadow-2xl bg-background-light dark:bg-background-dark">
        <Routes>
          <Route path="/" element={<Navigate to={hasKey ? "/home" : "/welcome"} replace />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/home" element={
            <HomeScreen onTaskSubmit={(task) => {
              setCurrentTask(task);
              setCurrentSteps([]); // Reset steps
            }} />
          } />
          <Route path="/steps" element={
            currentTask ? (
              <StepsScreen 
                task={currentTask} 
                onStepsGenerated={setCurrentSteps} 
              />
            ) : <Navigate to="/home" />
          } />
          <Route path="/timer" element={
            <TimerScreen task={currentTask} steps={currentSteps} />
          } />
          <Route path="/victory" element={<VictoryScreen task={currentTask} />} />
          <Route path="/share" element={<ShareScreen task={currentTask} />} />
          <Route path="/achievements" element={<AchievementsScreen />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
