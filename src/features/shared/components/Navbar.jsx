// src/features/shared/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Handshake } from 'lucide-react';
import { searchAPI } from '../../../services/searchAPI';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Glass effect on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent background scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper: safely extract an array from various API response shapes
  const extractResultsArray = (response) => {
    if (Array.isArray(response)) return response;
    if (response && typeof response === 'object') {
      // Common keys
      for (const key of ['results', 'data', 'items', 'hits', 'blogs', 'events', 'webinars', 'courses', 'projects', 'volunteers']) {
        if (response[key] && Array.isArray(response[key])) return response[key];
      }
      // Some APIs wrap in "response" or "body"
      if (response.response && Array.isArray(response.response)) return response.response;
    }
    return [];
  };

  // Debounced search
  const debounceTimer = useRef(null);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!value.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        // Try global search first
        const globalRes = await searchAPI.globalSearch({ q: value.trim() });
        console.log('Global search raw response:', globalRes); // for debugging
        let results = extractResultsArray(globalRes);

        // If global search returned nothing, fallback to specific searches
        if (results.length === 0) {
          console.log('Global search empty, falling back to specific searches');
          const specificResults = await Promise.allSettled([
            searchAPI.searchArticles?.({ q: value.trim() }) ?? Promise.resolve([]),
            searchAPI.searchEvents?.({ q: value.trim() }) ?? Promise.resolve([]),
            searchAPI.searchWebinars?.({ q: value.trim() }) ?? Promise.resolve([]),
            searchAPI.searchCourses?.({ q: value.trim() }) ?? Promise.resolve([]),
          ]);

          const merged = [];
          specificResults.forEach((res) => {
            if (res.status === 'fulfilled') {
              const arr = extractResultsArray(res.value);
              merged.push(...arr);
            }
          });
          results = merged;
        }

        // Ensure each result has a `type` property (add if missing)
        results = results.map((item) => ({
          ...item,
          type: item.type || item.resource_type || 'unknown',
        }));

        setSearchResults(results);
        setShowDropdown(true);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
  };

  // Handle result click – navigate to appropriate page
  const handleResultClick = (result) => {
    setShowDropdown(false);
    setSearchQuery('');
    setSearchResults([]);

    const type = result.type?.toLowerCase() || '';
    const id = result.id || result._id;

    switch (type) {
      case 'blog':
      case 'article':
        navigate(`/blog/${id}`);
        break;
      case 'event':
        navigate(`/events/${id}`);
        break;
      case 'webinar':
        navigate(`/resources#webinars`);
        break;
      case 'course':
        navigate(`/resources#courses`);
        break;
      case 'project':
        navigate(`/projects/${id}`);
        break;
      case 'volunteer':
        navigate('/community');
        break;
      default:
        if (result.url) {
          navigate(result.url);
        } else {
          navigate('/');
        }
    }
  };

  // Handle Enter key
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchResults.length > 0) {
        setShowDropdown(true);
      } else {
        navigate(`/?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us' },
    { name: 'Community', path: '/community' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact-us' },
  ];

  return (
    <>
      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-0 left-0 bg-[#1A1A1A] text-white px-4 py-2 z-50"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-pink-100 py-3 shadow-sm'
            : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <NavLink to="/" aria-label="Homepage" className="flex-shrink-0">
              <img src="/NavLogo.png" alt="Her Physio Movement" className="h-8 md:h-10 w-auto" />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#FD90A7] font-semibold'
                        : 'text-[#1D2130] hover:text-[#FD90A7]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Search bar with dropdown */}
            <div ref={searchRef} className="relative flex-1 max-w-xs lg:max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, events, webinars..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchResults.length > 0) setShowDropdown(true);
                  }}
                  className="w-full px-4 py-2 pl-9 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent text-sm transition placeholder-gray-400 text-gray-700"
                />
              </form>

              {/* Search Results Dropdown */}
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-50"
                >
                  {searchLoading && (
                    <div className="p-3 text-center text-sm text-gray-500">Searching...</div>
                  )}
                  {!searchLoading && searchResults.length === 0 && (
                    <div className="p-3 text-center text-sm text-gray-500">No results found</div>
                  )}
                  {!searchLoading &&
                    searchResults.map((result, idx) => (
                      <button
                        key={result.id || idx}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left px-4 py-3 hover:bg-[#FD90A7]/5 transition flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                      >
                        <Search className="w-4 h-4 text-[#FD90A7] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1D2130] truncate">
                            {result.title || result.name || result.event_name || 'Untitled'}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">{result.type || 'unknown'}</p>
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <NavLink
                to="/volunteer-signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FD90A7] text-white rounded-full text-sm font-semibold hover:bg-[#f77997] transition shadow-sm hover:shadow-md"
              >
                <Handshake className="w-4 h-4" />
                Volunteer
              </NavLink>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu – sliding panel */}
        <div
          className={`lg:hidden fixed inset-0 top-[73px] left-0 w-full h-[calc(100vh-73px)] z-40 transition-all duration-300 ${
            isMobileMenuOpen ? 'visible' : 'invisible'
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-full sm:w-80 bg-white shadow-xl border-l border-gray-100 transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col p-6 pt-8">
              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2.5 pl-10 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {searchResults.map((result, idx) => (
                      <button
                        key={result.id || idx}
                        onClick={() => {
                          handleResultClick(result);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-[#FD90A7]/5 transition flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                      >
                        <Search className="w-4 h-4 text-[#FD90A7] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1D2130] truncate">
                            {result.title || result.name || result.event_name || 'Untitled'}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">{result.type || 'unknown'}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </form>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-medium transition ${
                        isActive
                          ? 'bg-[#FD90A7]/10 text-[#FD90A7]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <NavLink
                  to="/volunteer-signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FD90A7] text-white rounded-full font-medium hover:bg-[#f77997] transition"
                >
                  <Handshake className="w-4 h-4" />
                  Volunteer Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[73px]" />
    </>
  );
};

export default Navbar;