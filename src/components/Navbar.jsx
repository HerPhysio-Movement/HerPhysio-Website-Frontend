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
                className="h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 w-auto"
              />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all ${
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
              className="lg:hidden p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white border border-gray-200 rounded-2xl shadow-lg animate-fade-in">
              <div className="flex flex-col p-4 sm:p-5">
                <div className="space-y-1">
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                          isActive
                            ? "bg-pink-50 text-pink-500"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: buttonPink }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
                  <NavLink
                    to="/signin"
                    className="block text-center px-4 py-3 rounded-full border-2 transition-all text-base font-medium"
                    style={{ borderColor: buttonPink, color: buttonPink }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="block text-center px-4 py-3 rounded-full text-white font-medium transition-all text-base"
                    style={{ backgroundColor: buttonPink }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </NavLink>
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