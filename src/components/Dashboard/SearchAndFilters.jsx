import { Search, Plus, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
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
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent font-poppins"
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
              className="px-4 py-3 bg-[#FD90A7] text-white rounded-xl hover:bg-[#f77997] transition flex items-center gap-2 min-w-[44px] min-h-[44px] whitespace-nowrap font-poppins font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {showResults && globalSearchResults.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
              {globalSearchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left px-4 py-3 hover:bg-[#FD90A7]/10 focus:outline-none transition flex items-center gap-3 border-b border-gray-100 last:border-0 font-poppins"
                >
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    result.type === "Projects" ? "bg-green-100 text-green-800" :
                    result.type === "Articles" ? "bg-blue-100 text-blue-800" :
                    result.type === "Events" ? "bg-purple-100 text-purple-800" :
                    result.type === "Webinar" ? "bg-orange-100 text-orange-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {result.type}
                  </span>
                  <span className="text-sm font-medium text-[#1D2130]">{result.displayName}</span>
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
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition whitespace-nowrap min-w-[44px] min-h-[44px] font-poppins ${
                  activeFilter === tab.name
                    ? "bg-[#FD90A7] text-white shadow-md"
                    : "bg-gray-100 text-[#525560] hover:bg-gray-200"
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