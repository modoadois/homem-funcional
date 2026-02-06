
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIMER_DURATION } from '../constants';
import { useStats } from '../hooks/useStats';
import { useTimer } from '../hooks/useTimer';
import { TaskStep } from '../types';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Button from '../components/ui/Button';

interface TimerScreenProps {
  task: string;
  steps: TaskStep[];
}

const TimerScreen: React.FC<TimerScreenProps> = ({ task, steps }) => {
  const navigate = useNavigate();
  const { addSession } = useStats();
  const [showSteps, setShowSteps] = useState(false);
  
  // Memoized to prevent useTimer effect from re-running unnecessarily
  const handleComplete = useCallback(() => {
    addSession(TIMER_DURATION / 60);
    navigate('/victory');
  }, [addSession, navigate]);

  const { formatTime, progress } = useTimer(TIMER_DURATION, handleComplete);

  const firstStep = steps[0];

  return (
    <Layout className="bg-background-dark text-white">
      <Header 
        title="Foco Ativo" 
        rightAction={
          <button 
            onClick={() => setShowSteps(!showSteps)}
            aria-label={showSteps ? "Fechar lista de passos" : "Ver lista de passos"}
            className={`size-10 rounded-xl flex items-center justify-center transition-all ${showSteps ? 'bg-primary text-background-dark shadow-[0_0_15px_rgba(19,236,91,0.5)]' : 'bg-white/5 text-white/40'}`}
          >
            <span className="material-symbols-outlined">{showSteps ? 'close' : 'checklist'}</span>
          </button>
        }
      />

      <main className="flex-1 flex flex-col items-center justify-center px-8 relative overflow-hidden">
        {/* Banner de próxima ação */}
        {!showSteps && firstStep && (
          <div className="absolute top-0 left-6 right-6 p-4 rounded-2xl bg-white/5 border border-primary/20 backdrop-blur-md animate-fade-in flex items-center gap-4">
            <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">{firstStep.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[8px] uppercase tracking-widest font-black text-primary/60">Sua micro-missão</p>
              <h3 className="text-sm font-bold truncate">{firstStep.title}</h3>
            </div>
          </div>
        )}

        <div className={`flex flex-col items-center transition-all duration-500 ${showSteps ? 'opacity-20 scale-90 blur-md pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="relative flex items-center justify-center mb-8 shrink-0">
            <svg className="w-64 h-64 md:w-72 md:h-72">
              <circle className="text-white/5" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="4" />
              <circle 
                className="text-primary progress-ring-circle" 
                cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" 
                strokeDasharray={2 * Math.PI * 110} 
                strokeDashoffset={(1 - progress / 100) * (2 * Math.PI * 110)} 
                strokeLinecap="round" strokeWidth="8"
                style={{ filter: 'drop-shadow(0 0 15px rgba(19, 236, 91, 0.4))' }}
              />
            </svg>
            
            <div className="absolute flex flex-col items-center">
              <span className="text-7xl font-black tracking-tighter tabular-nums leading-none">
                {formatTime()}
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mt-2">contagem regressiva</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-xs shrink-0">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <div className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Alvo: "{task}"</span>
            </div>
          </div>
        </div>

        {/* Overlay de passos */}
        {showSteps && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 space-y-3 animate-in fade-in zoom-in duration-300">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Dividir para conquistar</p>
            {steps.map((step) => (
              <div key={step.id} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl">
                <span className="size-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary text-xs font-black">{step.id}</span>
                <div className="flex-1">
                  <span className="block text-sm font-bold text-white/90 leading-tight">{step.title}</span>
                  <span className="block text-[10px] text-white/40">{step.desc}</span>
                </div>
                <span className="material-symbols-outlined text-white/20 text-xl">{step.icon}</span>
              </div>
            ))}
            <button 
              onClick={() => setShowSteps(false)}
              className="mt-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors py-2 px-4"
            >
              Voltar ao Timer
            </button>
          </div>
        )}
      </main>

      <footer className="px-10 pb-10 shrink-0 space-y-6">
        <Button 
          onClick={handleComplete}
          className="w-full h-16 !rounded-2xl shadow-[0_0_30px_rgba(19,236,91,0.2)]"
          icon="check_circle"
        >
          MISSÃO CUMPRIDA
        </Button>

        <div className="w-full space-y-2">
          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/30 px-1">
            <span>Início</span>
            <span>Fluxo</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary/60 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(19,236,91,0.5)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/')} 
          className="w-full flex items-center justify-center gap-2 text-white/20 hover:text-white/40 transition-colors text-[10px] font-black uppercase tracking-widest py-2"
        >
          Abandonar Missão
        </button>
      </footer>
    </Layout>
  );
};

export default TimerScreen;
