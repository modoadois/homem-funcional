
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, rightAction, subtitle }) => {
  const navigate = useNavigate();

  return (
    <header className="shrink-0 pt-8 pb-4 px-6 flex items-center justify-between border-b border-transparent">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={onBack || (() => navigate(-1))} className="size-8 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
        ) : (
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary text-xl">bolt</span>
          </div>
        )}
        <div>
          <h2 className="text-sm font-black tracking-[0.1em] uppercase opacity-70">
            {title || "Disparador de Inércia"}
          </h2>
          {subtitle && <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">{subtitle}</p>}
        </div>
      </div>
      {rightAction}
    </header>
  );
};

export default Header;
