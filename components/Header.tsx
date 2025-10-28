
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 w-full shadow-sm">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            <span className="text-sky-500">Find</span>It
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
