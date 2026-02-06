
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#102216]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 pb-8 pt-3">
      <div className="max-w-md mx-auto flex justify-around items-center px-12">
        <button 
          onClick={() => navigate('/')} 
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}
        >
          <span className="material-symbols-outlined text-2xl" style={isActive('/') ? { fontVariationSettings: "'FILL' 1" } : {}}>rocket_launch</span>
          <span className="text-[11px] font-medium">Lançar</span>
        </button>
        <button 
          onClick={() => navigate('/achievements')} 
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/achievements') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}
        >
          <span className="material-symbols-outlined text-2xl" style={isActive('/achievements') ? { fontVariationSettings: "'FILL' 1" } : {}}>military_tech</span>
          <span className="text-[11px] font-medium">Conquistas</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
