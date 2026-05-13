import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { FILTER_TABS } from '../config/filterTabs';

const SearchAndFilters = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery, onAddClick }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD90A7]"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4" /></button>
        )}
      </div>
      <button onClick={onAddClick} className="px-6 py-2.5 bg-[#FD90A7] text-white rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Add New</button>
      <div className="flex gap-2">
        {FILTER_TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveFilter(tab.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${activeFilter === tab.name ? 'bg-[#FD90A7] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              <Icon className="w-4 h-4" /> {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchAndFilters;