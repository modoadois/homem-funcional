
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-50 rounded-2xl";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-background-dark shadow-lg shadow-primary/20",
    secondary: "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300",
    ghost: "bg-transparent text-slate-500 hover:text-primary",
    danger: "bg-transparent border border-red-500/20 text-red-500 hover:bg-red-500/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-4 text-base",
    lg: "px-6 h-16 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
      {icon && <span className="material-symbols-outlined font-bold">{icon}</span>}
    </button>
  );
};

export default Button;
