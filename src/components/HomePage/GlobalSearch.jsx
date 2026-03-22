import { useState } from "react";
import { Search } from "lucide-react";

const GlobalSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search events, articles, webinars..."
        value={query}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD90A7]"
      />
    </div>
  );
};
export default GlobalSearch;
