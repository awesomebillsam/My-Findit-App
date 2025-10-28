
import React from 'react';
import { Item, ItemStatus } from '../types';
import MapPinIcon from './icons/MapPinIcon';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const statusColor = item.status === ItemStatus.Lost ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  
  const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
      <div className="relative">
        <img className="h-48 w-full object-cover" src={item.imageUrl} alt={item.name} />
        <span className={`absolute top-2 right-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${statusColor}`}>
          {item.status}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-slate-800 truncate">{item.name}</h3>
        <p className="text-sm text-slate-500 mt-1 truncate flex-grow">{item.description}</p>
        <div className="mt-3 flex items-center text-xs text-slate-400">
          <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{item.location.text}</span>
        </div>
      </div>
       <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center">
            <img src={item.author.avatarUrl} alt={item.author.username} className="h-6 w-6 rounded-full mr-2" />
            <span className="font-semibold text-slate-600">{item.author.username}</span>
          </div>
           <span>{timeSince(item.reportedAt)}</span>
        </div>
    </div>
  );
};

export default ItemCard;
