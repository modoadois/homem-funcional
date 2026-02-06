
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  noScroll?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '', noScroll = true }) => {
  return (
    <div className={`h-full flex flex-col relative ${noScroll ? 'overflow-hidden' : 'overflow-y-auto'} ${className}`}>
      {children}
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-5%] left-[-10%] w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  );
};

export default Layout;
