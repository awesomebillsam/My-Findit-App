
import React from 'react';
import { Item, User } from '../types';
import ItemCard from './ItemCard';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface ProfilePageProps {
  user: User;
  items: Item[];
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, items, onBack }) => {
  const userItems = items.filter(item => item.author.id === user.id);

  return (
    <div className="bg-white min-h-full">
       <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 w-full shadow-sm">
            <div className="max-w-md mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">Profile</h1>
                    <div className="w-6" />
                </div>
            </div>
        </header>
        
        <div className="p-4">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-md">
                <img src={user.avatarUrl} alt={user.username} className="w-24 h-24 rounded-full ring-4 ring-sky-200" />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">{user.username}</h2>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    <p className="text-sm text-slate-500">{user.phone}</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Your Reports</h3>
                {userItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {userItems.map(item => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg">
                        <p>You haven't reported any items yet.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
