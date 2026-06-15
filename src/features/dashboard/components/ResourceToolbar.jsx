// src/features/dashboard/components/ResourceToolbar.jsx
import { Search, Plus } from 'lucide-react';
import ResourceTypeDropdown from './ResourceTypeDropdown';
import { getResourceLabel } from '../utils/resourceLabels';

const ResourceToolbar = ({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  onAddClick,
  searchLoading = false,
  searchError = null,
  searchHint = null,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
      <ResourceTypeDropdown activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <div className="w-full flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={
              activeFilter === 'Events'
                ? 'Search events or user email...'
                : `Search ${activeFilter.toLowerCase()}...`
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
          />
        </div>
        {(searchLoading || searchError || searchHint) && (
          <p className={`mt-1 text-xs ${searchError ? 'text-red-500' : 'text-gray-500'}`}>
            {searchLoading ? 'Searching registered events...' : searchError || searchHint}
          </p>
        )}
      </div>
      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-[#FD90A7] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#f77997] transition whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        Add {getResourceLabel(activeFilter)}
      </button>
    </div>
  );
};

export default ResourceToolbar;
