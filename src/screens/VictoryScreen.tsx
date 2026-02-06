
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIMER_DURATION } from '../constants';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Button from '../components/ui/Button';

const MOODS = [
  { label: 'Leve', icon: 'cloud', message: 'O peso da tarefa sumiu!' },
  { label: 'Orgulho', icon: 'workspace_premium', message: 'Você é maior que seu medo.' },
  { label: 'Energia', icon: 'bolt', message: 'O impulso inicial é seu!' },
  { label: 'Foco', icon: 'center_focus_strong', message: 'A mente está calibrada.' },
];

interface VictoryScreenProps {
  task: string;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ task }) => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  const minutes = Math.floor(TIMER_DURATION / 60);
  const seconds = TIMER_DURATION % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <Layout className="bg-background-light dark:bg-background-dark">
      <Header 
        showBack 
        onBack={() => navigate('/')} 
        title="Missão Concluída" 
        rightAction={
          <button onClick={() => navigate('/achievements')} className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">military_tech</span>
          </button>
        }
      />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-125"></div>
          <div className="relative w-36 h-36 bg-gradient-to-br from-primary to-[#0ba33f] rounded-full flex items-center justify-center medal-glow border-4 border-white/20">
            <div className="absolute inset-0 rounded-full shimmer opacity-30"></div>
            <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <div className="absolute -top-2 -right-1 text-primary">
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Você é imparável.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-medium max-w-[240px] mx-auto">
            {selectedMood !== null ? MOODS[selectedMood].message : "Você venceu a batalha contra a inércia."}
          </p>
        </div>

        <div className="w-full space-y-3 pt-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Como você se sente após agir?</p>
          <div className="grid grid-cols-4 gap-2">
            {MOODS.map((mood, idx) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(idx)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                  selectedMood === idx 
                    ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={selectedMood === idx ? { fontVariationSettings: "'FILL' 1" } : {}}>{mood.icon}</span>
                <span className="text-[9px] font-bold uppercase">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm shrink-0">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-xs">timer</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-60">Tempo</span>
            </div>
            <div className="text-lg font-bold tabular-nums">{formattedTime}</div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#fa5538] text-xs">keyboard_double_arrow_up</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-60">Impulso</span>
            </div>
            <div className="text-lg font-bold text-primary">Ativado</div>
          </div>
        </div>
      </main>

      <footer className="p-6 space-y-3 pb-10 w-full shrink-0">
        <Button 
          onClick={() => navigate('/')} 
          className="w-full h-16" 
          icon="rocket_launch"
        >
          MANTER O FLUXO
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => navigate('/share')} 
            className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold py-3 text-sm rounded-xl transition-all"
          >
            <span className="material-symbols-outlined text-sm">share</span>
            Compartilhar
          </button>
          <button 
            onClick={() => navigate('/achievements')} 
            className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold py-3 text-sm rounded-xl transition-all"
          >
            <span className="material-symbols-outlined text-sm">military_tech</span>
            Galeria
          </button>
        </div>
      </footer>
    </Layout>
  );
};

export default VictoryScreen;
