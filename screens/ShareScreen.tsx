
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Button from '../components/ui/Button';
import { useStats } from '../hooks/useStats';
import { getVictoryTitle } from '../services/geminiService';

interface ShareScreenProps {
  task: string;
}

const ShareScreen: React.FC<ShareScreenProps> = ({ task }) => {
  const navigate = useNavigate();
  const { stats } = useStats();
  const [victoryTitle, setVictoryTitle] = useState<string>('Processando conquista...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      const title = await getVictoryTitle(task);
      setVictoryTitle(title);
      setLoading(false);
    };
    fetchTitle();
  }, [task]);

  const handleNativeShare = async () => {
    const shareData = {
      title: 'Inércia Zero!',
      text: `Acabei de ser coroado como "${victoryTitle}"! 🚀 Consegui focar em "${task}" por 5 minutos e venci a procrastinação. Tente você também no Disparador de Inércia!`,
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Copiado! Agora cole no WhatsApp ou Instagram para celebrar!');
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  return (
    <Layout className="bg-background-dark text-white">
      <Header 
        showBack 
        title="Impacto Visual" 
        rightAction={
          <button onClick={() => navigate('/')} className="text-white/40 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        }
      />

      <main className="flex-1 flex flex-col items-center justify-center px-8 py-4 space-y-6">
        {/* Cartão de Impacto */}
        <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#0c2e17] via-black to-black rounded-[40px] p-10 flex flex-col relative overflow-hidden border border-primary/20 shadow-[0_0_80px_rgba(19,236,91,0.15)]">
          {/* Decorações de Fundo */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />
          <div className="absolute inset-0 border-[0.5px] border-white/5 rounded-[40px] scale-[0.98] pointer-events-none" />
          
          <div className="flex-1 flex flex-col justify-between items-center text-center">
            <div className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                <span className="material-symbols-outlined text-[10px] text-primary">emoji_events</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Título Honorário</span>
              </div>
              
              <div className="space-y-1">
                <h2 className={`text-4xl font-black leading-tight tracking-tighter uppercase italic text-white transition-all duration-700 ${loading ? 'opacity-20 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}`}>
                  {victoryTitle}
                </h2>
              </div>
            </div>

            <div className="w-full py-8 border-y border-white/5 my-4">
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.3em] mb-3">Missão Cumprida</p>
              <h3 className="text-xl font-bold leading-tight text-white line-clamp-2 italic opacity-90">
                "{task}"
              </h3>
            </div>

            <div className="w-full flex justify-between items-end">
              <div className="text-left">
                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Foco Ativo</p>
                <p className="text-2xl font-black text-primary tabular-nums">05:00</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse rounded-full" />
                <span className="material-symbols-outlined text-primary text-4xl relative">bolt</span>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Inércia</p>
                <p className="text-2xl font-black text-accent uppercase italic">Zero</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1 text-center opacity-60">
          <p className="text-[10px] font-bold uppercase tracking-widest">O disparador funciona</p>
          <p className="text-[10px]">Pois o segredo da coragem é o primeiro passo.</p>
        </div>
      </main>

      <footer className="p-8 space-y-4 shrink-0">
        <Button 
          onClick={handleNativeShare} 
          disabled={loading}
          className="w-full h-16 !rounded-2xl shadow-[0_10px_30px_rgba(19,236,91,0.2)]" 
          icon="ios_share"
        >
          ESPALHAR ESSA VITÓRIA
        </Button>
        <button 
          onClick={() => navigate('/')} 
          className="w-full py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white/50 transition-colors"
        >
          Voltar ao início
        </button>
      </footer>
    </Layout>
  );
};

export default ShareScreen;
