import { useState, useRef, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";

const SearchAndFilters = ({
  activeFilter,
  setActiveFilter,
  visibleTabs,
  onAddClick,
  searchQuery,
  setSearchQuery,
  globalSearchResults,
  onSearchResultClick,
}) => {
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (result) => {
    onSearchResultClick(result);
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-96" ref={wrapperRef}>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search everything..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setShowResults(true)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowResults(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={onAddClick}
              className="px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center gap-2 min-w-[44px] min-h-[44px] whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {/* Global search results dropdown */}
          {showResults && globalSearchResults.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
              {globalSearchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left px-4 py-3 hover:bg-pink-50 focus:outline-none focus:bg-pink-50 transition flex items-center gap-3 border-b border-gray-100 last:border-0"
                >
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      result.type === "Projects"
                        ? "bg-green-100 text-green-800"
                        : result.type === "Articles"
                          ? "bg-blue-100 text-blue-800"
                          : result.type === "Events"
                            ? "bg-purple-100 text-purple-800"
                            : result.type === "Webinar"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {result.type}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {result.displayName}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveFilter(tab.name);
                  setSearchQuery("");
                  setShowResults(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition whitespace-nowrap min-w-[44px] min-h-[44px] ${
                  activeFilter === tab.name
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
