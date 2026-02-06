
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Button from '../components/ui/Button';

interface HomeScreenProps {
  onTaskSubmit: (task: string) => void;
}

const QUICK_SUGGESTIONS = [
  { label: 'E-mails', icon: 'mail', prompt: 'Responder apenas o primeiro e-mail da caixa' },
  { label: 'Escrever', icon: 'edit', prompt: 'Abrir o documento e escrever o título' },
  { label: 'Estudos', icon: 'menu_book', prompt: 'Abrir o material de estudo na página atual' },
  { label: 'Organizar', icon: 'inventory_2', prompt: 'Retirar 3 itens fora do lugar na mesa' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ onTaskSubmit }) => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [error, setError] = useState(false);

  const handleStart = (customTask?: string) => {
    const finalTask = customTask || task;
    if (!finalTask.trim()) {
      setError(true);
      return;
    }
    onTaskSubmit(finalTask);
    navigate('/steps');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask(e.target.value);
    if (error && e.target.value.trim()) setError(false);
  };

  return (
    <Layout>
      <Header 
        rightAction={
          <button 
            onClick={() => navigate('/achievements')} 
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-primary/60 hover:text-primary"
          >
            <span className="material-symbols-outlined">military_tech</span>
          </button>
        }
      />

      <main className="flex-1 flex flex-col px-6 justify-center w-full min-h-0 space-y-6">
        <div className="space-y-2 shrink-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            O que você está <span className="text-primary underline decoration-primary/20 underline-offset-4">adiando</span> agora?
          </h1>
          <p className="text-slate-500 dark:text-primary/60 text-base font-medium leading-relaxed">
            A regra é simples: comece por apenas 5 minutos.
          </p>
        </div>

        <div className="relative group shrink-0 h-[140px]">
          <textarea 
            autoFocus
            value={task}
            onChange={handleInputChange}
            className={`w-full h-full bg-white dark:bg-slate-900/40 border-2 rounded-2xl p-5 text-lg focus:ring-0 transition-all duration-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 shadow-inner resize-none ${
              error ? 'border-red-500 animate-pulse' : 'border-slate-200 dark:border-slate-800 focus:border-primary'
            }`} 
            placeholder="Ex: Abrir aquele e-mail..."
          />
          {error && (
            <div className="absolute -bottom-6 left-2 flex items-center gap-1 text-red-500 text-xs font-bold animate-bounce">
              <span className="material-symbols-outlined text-sm">error</span>
              <span>Escreva o que deseja começar</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Atalhos de Inércia Zero</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((sug) => (
              <button
                key={sug.label}
                onClick={() => handleStart(sug.prompt)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold hover:border-primary transition-all active:scale-95 text-slate-600 dark:text-slate-300"
              >
                <span className="material-symbols-outlined text-sm text-primary">{sug.icon}</span>
                {sug.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 pt-4">
          <span className="material-symbols-outlined text-sm">bolt</span>
          <span className="text-xs font-medium italic">Vença a inércia em 5 minutos de foco.</span>
        </div>
      </main>

      <footer className="px-6 pb-10 pt-4 shrink-0 w-full">
        <Button 
          onClick={() => handleStart()} 
          className="w-full h-16" 
          size="lg" 
          icon="rocket_launch"
        >
          DISPARAR AGORA
        </Button>
      </footer>
    </Layout>
  );
};

export default HomeScreen;
