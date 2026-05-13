// src/features/dashboard/components/ResourceTypeDropdown.jsx
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { FILTER_TABS } from '../config/filterTabs';

const ResourceTypeDropdown = ({ activeFilter, setActiveFilter }) => {
  const [open, setOpen] = useState(false);
  const currentTab = FILTER_TABS.find((t) => t.name === activeFilter);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#FD90A7] transition min-w-[160px]"
      >
        {currentTab ? (
          <>
            <currentTab.icon className="w-4 h-4 text-[#FD90A7]" />
            <span>{currentTab.name}</span>
          </>
        ) : (
          <span>Select Type</span>
        )}
        <ChevronDown className="w-4 h-4 ml-auto" />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          {FILTER_TABS.filter((tab) => tab.name !== 'Dashboard').map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveFilter(tab.name);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition ${
                  isActive ? 'bg-[#FD90A7]/5 text-[#FD90A7]' : 'text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
                {isActive && <Check className="w-4 h-4 ml-auto text-[#FD90A7]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResourceTypeDropdown;