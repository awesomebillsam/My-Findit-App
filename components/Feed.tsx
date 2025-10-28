
import React, { useState } from 'react';
import { Item, Region } from '../types';
import ItemCard from './ItemCard';

const regions: Region[] = ['Local', 'America', 'Asia', 'Africa', 'Europe'];

interface FeedProps {
  items: Item[];
}

const Feed: React.FC<FeedProps> = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');

  const filteredItems = items
    .filter(item => {
        const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRegion && matchesSearch;
    })
    .sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime());

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for items (e.g., 'keys', 'wallet')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-sky-500 focus:outline-none transition-shadow"
        />
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
        <button onClick={() => setSelectedRegion('All')} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${selectedRegion === 'All' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 shadow-sm'}`}>
            All Regions
        </button>
        {regions.map(region => (
            <button key={region} onClick={() => setSelectedRegion(region)} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${selectedRegion === region ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 shadow-sm'}`}>
                {region}
            </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <h3 className="text-lg font-semibold">No items found</h3>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
