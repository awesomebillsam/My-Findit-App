
import React from 'react';
import HomeIcon from './icons/HomeIcon';
import PlusIcon from './icons/PlusIcon';
import UserIcon from './icons/UserIcon';

interface BottomNavBarProps {
  onReportClick: () => void;
  onHomeClick: () => void;
  onProfileClick: () => void;
  activeView: 'feed' | 'profile';
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onReportClick, onHomeClick, onProfileClick, activeView }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-transparent">
      <div className="max-w-md mx-auto h-full flex justify-center items-center relative">
        <div className="absolute bottom-0 w-[calc(100%-2rem)] h-16 bg-white/90 backdrop-blur-lg rounded-full shadow-lg flex justify-around items-center">
            <button onClick={onHomeClick} className={`flex flex-col items-center w-1/3 transition-colors ${activeView === 'feed' ? 'text-sky-500' : 'text-slate-500'}`}>
                <HomeIcon className="h-6 w-6" />
                <span className="text-xs font-medium">Home</span>
            </button>
            <div className="w-1/3" />
            <button onClick={onProfileClick} className={`flex flex-col items-center w-1/3 transition-colors ${activeView === 'profile' ? 'text-sky-500' : 'text-slate-500'}`}>
                <UserIcon className="h-6 w-6" />
                <span className="text-xs font-medium">Profile</span>
            </button>
        </div>
        <button
          onClick={onReportClick}
          className="absolute -top-6 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-sky-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-sky-300"
          aria-label="Report an item"
        >
          <PlusIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
