
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { INITIAL_MEDALS } from '../constants';
import { useStats } from '../hooks/useStats';
import { Medal } from '../types';
import Layout from '../components/Layout';
import Header from '../components/Header';

const MedalItem: React.FC<{ medal: Medal, unlocked: boolean }> = ({ medal, unlocked }) => (
  <div className="flex flex-col items-center gap-1.5 group">
    <div 
      className={`relative overflow-hidden rounded-xl aspect-square flex items-center justify-center transition-all duration-700 
      ${unlocked 
        ? 'bg-gradient-to-br from-white/10 to-transparent border-2 border-primary/40 shadow-[0_0_15px_rgba(19,236,91,0.1)]' 
        : 'bg-slate-200 dark:bg-white/5 border border-transparent scale-90 opacity-40'
      } w-full`}
      style={unlocked ? { borderColor: `${medal.color}66`, boxShadow: `0 0 15px ${medal.color}22` } : {}}
    >
      {unlocked ? (
        <>
          <div className="absolute inset-0 bg-current opacity-5 animate-pulse" style={{ color: medal.color }} />
          <div className="absolute inset-0 shimmer opacity-20" />
          <span className="material-symbols-outlined text-3xl" style={{ color: medal.color, fontVariationSettings: "'FILL' 1" }}>{medal.icon}</span>
        </>
      ) : (
        <span className="material-symbols-outlined text-2xl text-slate-400 dark:text-slate-600 grayscale">{medal.icon}</span>
      )}
    </div>
    <p className={`text-[9px] font-black text-center leading-tight uppercase tracking-tighter ${unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-700'}`}>
      {medal.label}
    </p>
  </div>
);

const AchievementsScreen: React.FC = () => {
  const { stats } = useStats();
  
  const isUnlocked = (medal: Medal) => {
    if (medal.requirement.type === 'tasks') return stats.tasksCompleted >= medal.requirement.value;
    return stats.streak >= medal.requirement.value;
  };

  const unlockedCount = INITIAL_MEDALS.filter(isUnlocked).length;
  const nextMedal = INITIAL_MEDALS.find(m => !isUnlocked(m)) || INITIAL_MEDALS[INITIAL_MEDALS.length - 1];
  
  const progressPercent = isUnlocked(nextMedal) ? 100 : Math.min(100, Math.round(((nextMedal.requirement.type === 'tasks' ? stats.tasksCompleted : stats.streak) / nextMedal.requirement.value) * 100));

  return (
    <Layout>
      <Header showBack title="Conquistas" subtitle="Galeria de Honra" />

      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-20 space-y-4 min-h-0 scrollbar-hide">
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl p-4 bg-white dark:bg-[#1a2e21] shadow-sm border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-0.5">
              <span className="material-symbols-outlined text-xs">schedule</span>
              <p className="text-[10px] font-bold uppercase tracking-wider">Movimento</p>
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold tabular-nums">{stats.minutesFocused.toLocaleString('pt-BR')}</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold">min</p>
            </div>
          </div>
          
          <div className="flex-1 rounded-xl p-4 bg-white dark:bg-[#1a2e21] shadow-sm border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-0.5">
              <span className="material-symbols-outlined text-xs">local_fire_department</span>
              <p className="text-[10px] font-bold uppercase tracking-wider">Sequência</p>
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold tabular-nums">{stats.streak}</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold">dias</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#1a2e21] border border-slate-200 dark:border-white/10 p-4 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${progressPercent === 100 ? 'bg-primary/20 border-primary/40' : 'bg-accent/10 border-accent/20'}`}>
                <span className={`material-symbols-outlined text-2xl ${progressPercent === 100 ? 'text-primary' : 'text-accent'}`}>{nextMedal.icon}</span>
              </div>
              <div>
                <p className="text-slate-400 text-[9px] font-bold uppercase">Próxima</p>
                <h4 className="text-sm font-bold truncate">{nextMedal.label}</h4>
              </div>
            </div>
            <div className="text-right">
              <p className="text-accent text-sm font-black">{progressPercent}%</p>
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-black/40 h-2 rounded-full overflow-hidden">
            <div className="bg-accent h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between px-1">
            <h3 className="text-sm font-black uppercase tracking-tight">Galeria</h3>
            <span className="text-[10px] text-primary font-bold">{unlockedCount}/{INITIAL_MEDALS.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {INITIAL_MEDALS.map((medal, idx) => (
              <MedalItem key={idx} medal={medal} unlocked={isUnlocked(medal)} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </Layout>
  );
};

export default AchievementsScreen;
