import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const buttonPink = "rgba(253, 144, 167, 1)";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen)
        setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
    { name: "Community", path: "/community" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact-us" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="skip-nav sr-only focus:not-sr-only bg-gray-600 text-white p-2 block text-center z-50"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo with extra margin */}
            <NavLink
              to="/"
              aria-label="Homepage"
              className="flex items-center mr-6"
            >
              <img
                src="/NavLogo.png"
                alt="HPM Logo"
                className="h-8 md:h-10 lg:h-12 w-auto"
              />
            </NavLink>

            {/* Search bar (visible on all devices) */}
            <form
              onSubmit={handleSearch}
              className="relative mx-6 flex-1 max-w-md"
            >
              <input
                type="text"
                placeholder="Search events, articles, webinars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FD90A7] text-sm font-medium"
              ></button>
            </form>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-5 py-2 text-sm rounded-full transition-all ${
                        isActive
                          ? "bg-white text-pink-500 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: buttonPink }}
                          />
                        )}
                        {item.name}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* Only Volunteer Sign Up button */}
              <div className="flex items-center gap-3">
                <NavLink
                  to="/volunteer-signup"
                  className="px-5 py-2 rounded-full bg-[#FD90A7] text-white font-medium transition-all duration-200 hover:shadow-lg hover:opacity-90 text-sm whitespace-nowrap"
                >
                  Volunteer Sign Up
                </NavLink>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>

          {/* Mobile Menu (unchanged) */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 top-[73px] left-0 w-full h-[calc(100vh-73px)] z-40">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl border-l border-gray-200 overflow-y-auto">
                <div className="flex flex-col p-6 pt-12">
                  <div className="space-y-2">
                    {navLinks.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-pink-50 text-pink-500"
                              : "text-gray-700 hover:bg-gray-50"
                          }`
                        }
                      >
                        <span className="font-medium text-lg">{item.name}</span>
                        {({ isActive }) =>
                          isActive && (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: buttonPink }}
                            />
                          )
                        }
                      </NavLink>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
                    <NavLink
                      to="/volunteer-signup"
                      className="block text-center px-4 py-3 rounded-full bg-[#FD90A7] text-white font-medium transition-all text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Volunteer Sign Up
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="h-[73px]" />
    </>
  );
};

export default Navbar;
