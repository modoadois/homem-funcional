
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTaskBreakdown } from '../services/geminiService';
import { TaskStep } from '../types';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Button from '../components/ui/Button';

interface StepsScreenProps {
  task: string;
  onStepsGenerated: (steps: TaskStep[]) => void;
}

const StepItem: React.FC<{ step: TaskStep }> = ({ step }) => (
  <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm transition-all hover:border-primary/30">
    <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
      {step.id}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug truncate">{step.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{step.desc}</p>
    </div>
    <div className="flex-shrink-0 self-center">
      <span className="material-symbols-outlined text-primary/30 text-xl">{step.icon}</span>
    </div>
  </div>
);

const StepsScreen: React.FC<StepsScreenProps> = ({ task, onStepsGenerated }) => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<TaskStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      setLoading(true);
      const data = await getTaskBreakdown(task);
      setSteps(data);
      onStepsGenerated(data);
      setLoading(false);
    };
    fetchSteps();
  }, [task, onStepsGenerated]);

  return (
    <Layout>
      <Header showBack title="Plano de Ação" />

      <div className="px-6 pt-2 pb-2 shrink-0">
        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${loading ? 'bg-slate-100 text-slate-400' : 'bg-primary/10 text-primary'}`}>
          {loading ? 'IA ANALISANDO...' : 'MICROTARIFAS PRONTAS'}
        </div>
        <h1 className="text-2xl font-bold leading-tight">O segredo é ser pequeno.</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-3 py-2 scrollbar-hide">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              </div>
            </div>
          ))
        ) : (
          steps.map(step => <StepItem key={step.id} step={step} />)
        )}
      </div>

      <footer className="p-6 shrink-0 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-center gap-2 mb-4 text-slate-400">
          <span className="material-symbols-outlined text-sm">timer</span>
          <span className="text-[10px] uppercase tracking-widest font-medium">Ciclo de lançamento de 5 minutos</span>
        </div>
        <Button 
          onClick={() => navigate('/timer')} 
          disabled={loading}
          className="w-full h-16"
          icon="flash_on"
        >
          ACEITAR O DESAFIO
        </Button>
      </footer>
    </Layout>
  );
};

export default StepsScreen;
