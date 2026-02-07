import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';

interface WelcomeScreenProps {
  onKeySet: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onKeySet }) => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');

  const handleOpenGoogleAI = () => {
    // Abre o Google AI Studio em nova aba
    window.open('https://aistudio.google.com/apikey', '_blank');
    // Mostra o campo para colar a chave
    setShowInput(true);
  };

  const handleSaveKey = () => {
    const trimmedKey = apiKey.trim();
    
    // Validação básica
    if (!trimmedKey) {
      setError('Por favor, cole sua chave da API');
      return;
    }
    
    if (trimmedKey.length < 20) {
      setError('Chave inválida. Verifique se copiou corretamente.');
      return;
    }

    // Salva no localStorage
    localStorage.setItem('gemini_api_key', trimmedKey);
    
    // Notifica o App que a chave foi configurada
    onKeySet();
    
    // Navega para home
    navigate('/home');
  };

  return (
    <Layout className="bg-background-dark text-white">
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center space-y-10">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
          <div className="relative size-24 bg-gradient-to-b from-white/10 to-transparent border border-white/20 rounded-[2rem] flex items-center justify-center shadow-2xl">
            <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tighter leading-none uppercase italic">
            Configuração <br />
            <span className="text-primary text-4xl">Sem Custos</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
            O Google exige uma chave de API para usar o Gemini, mas o uso é gratuito com cota generosa.
          </p>
        </div>

        {/* Guia de Ajuda */}
        <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-left space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Como funciona:</p>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="size-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
              <p className="text-[11px] text-slate-300">
                Clique no botão abaixo para abrir o <strong>Google AI Studio</strong>.
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
              <p className="text-[11px] text-slate-300">
                Faça login e clique em <strong>"Get API Key"</strong> ou <strong>"Create API Key"</strong>.
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="size-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
              <p className="text-[11px] text-slate-300">
                Copie a chave gerada e cole aqui no app. Pronto!
              </p>
            </div>
          </div>
        </div>

        {/* Botões e Input */}
        <div className="w-full space-y-4">
          {!showInput ? (
            <Button 
              onClick={handleOpenGoogleAI}
              variant="primary"
              className="w-full h-18 !rounded-2xl !text-lg !bg-white !text-black flex items-center justify-center gap-3 shadow-2xl hover:!bg-slate-100 transition-all active:scale-95"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              OBTER CHAVE DA API
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setError('');
                  }}
                  placeholder="Cole sua chave da API aqui..."
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
                {error && (
                  <p className="text-red-400 text-xs px-2">{error}</p>
                )}
              </div>
              
              <Button 
                onClick={handleSaveKey}
                variant="primary"
                className="w-full h-14 !rounded-2xl !text-base !bg-primary !text-black font-bold shadow-2xl hover:!bg-primary/90 transition-all active:scale-95"
              >
                SALVAR E CONTINUAR
              </Button>

              <button
                onClick={() => setShowInput(false)}
                className="text-slate-500 text-xs underline hover:text-slate-300 transition-colors"
              >
                Voltar
              </button>
            </div>
          )}

          <a 
            href="https://ai.google.dev/gemini-api/docs/api-key" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary/40 hover:text-primary transition-colors text-[10px] font-bold uppercase underline decoration-primary/10 underline-offset-4"
          >
            Ver documentação oficial
            <span className="material-symbols-outlined text-[10px]">open_in_new</span>
          </a>
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-[9px] text-white/20 font-medium uppercase tracking-[0.3em]">
          Sua chave fica salva apenas no seu navegador
        </p>
      </footer>
    </Layout>
  );
};

export default WelcomeScreen;
