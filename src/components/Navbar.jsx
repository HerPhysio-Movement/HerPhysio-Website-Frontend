import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const buttonPink = "rgba(253, 144, 167, 1)";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
            {/* Logo */}
            <NavLink to="/" aria-label="Homepage" className="flex items-center">
              <img
                src="/NavLogo.png"
                alt="HPM Logo"
                className="h-8 md:h-10 lg:h-12 w-auto"
              />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        isActive
                          ? "bg-white text-[#FD90A7] shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="flex items-center gap-3">
                <NavLink
                  to="/signin"
                  className="px-5 py-2 rounded-full border-2 transition-all duration-200 hover:bg-pink-50 text-sm font-medium whitespace-nowrap"
                  style={{ borderColor: buttonPink, color: buttonPink }}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-5 py-2 rounded-full text-white font-medium transition-all duration-200 hover:shadow-lg hover:opacity-90 text-sm whitespace-nowrap"
                  style={{ backgroundColor: buttonPink }}
                >
                  Sign Up
                </NavLink>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className={`transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                <Menu size={20} />
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <X size={20} />
              </div>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 top-[73px] left-0 w-full h-[calc(100vh-73px)] z-40">
              {/* Backdrop with blur */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fadeIn"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Menu panel */}
              <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl border-l border-gray-200 overflow-y-auto animate-slideIn">
                <div className="flex flex-col p-6 pt-12">
                  <div className="space-y-2">
                    {navLinks.map((item, index) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-pink-50 text-[#FD90A7]"
                              : "text-gray-700 hover:bg-gray-50"
                          } animate-fadeInUp`
                        }
                        style={{ animationDelay: `${index * 0.1}s` }}
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

                  <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col gap-3">
                    <NavLink
                      to="/signin"
                      className="block text-center px-4 py-4 rounded-full border-2 transition-all text-base font-medium animate-fadeInUp"
                      style={{ borderColor: buttonPink, color: buttonPink, animationDelay: '0.5s' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="block text-center px-4 py-4 rounded-full text-white font-medium transition-all text-base animate-fadeInUp"
                      style={{ backgroundColor: buttonPink, animationDelay: '0.6s' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="h-[73px]" />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;