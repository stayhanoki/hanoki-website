import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { openBookingPopup } from "@/components/feature/BookingChannelPopup";

export default function Navbar() {
  const { t, i18n } = useTranslation("common");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/rooms", label: t("nav.rooms") },
    { path: "/journey", label: t("nav.cafe") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const currentLang = i18n.language?.startsWith("en") ? "en" : "vi";

  const setLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3A2A1E] border-b border-[#f3efe7]/[0.08]">
        <div className="flex items-center justify-between h-20 md:h-24 px-6 md:px-10 lg:px-16">
          {/* Left Group: Hamburger + MENU + Language */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Hamburger + MENU label */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 cursor-pointer"
              aria-label={t("nav.toggleMenu")}
            >
              <div className="flex flex-col items-center justify-center gap-[5px]">
                <span className="block w-5 h-px transition-all duration-300 bg-[#f3efe7]" />
                <span className="block w-5 h-px transition-all duration-300 bg-[#f3efe7]" />
                <span className="block w-5 h-px transition-all duration-300 bg-[#f3efe7]" />
              </div>
              <span className="hidden md:inline-block text-xs font-medium tracking-widest text-[#f3efe7] whitespace-nowrap">
                {t("nav.menu")}
              </span>
            </button>

            {/* Language Dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-xs font-medium tracking-wide transition-colors duration-300 whitespace-nowrap text-[#f3efe7] cursor-pointer"
                aria-label="Switch language"
              >
                <i className="ri-global-line text-sm"></i>
                <span className={currentLang === "vi" ? "font-semibold" : "text-[#f3efe7]/70"}>
                  {currentLang === "vi" ? "VIE" : "ENG"}
                </span>
              </button>

              {langOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#f7f4ef] rounded-md shadow-xl border border-[#e0d6c8] overflow-hidden min-w-[160px] py-1 z-50">
                  <button
                    onClick={() => setLang("vi")}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      currentLang === "vi"
                        ? "text-[#3a2a1e] bg-[#f3efe7] font-medium"
                        : "text-[#3a2a1e]/70 hover:bg-[#f3efe7]/50"
                    }`}
                  >
                    <span className="text-lg">🇻🇳</span>
                    <span>Tiếng Việt</span>
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      currentLang === "en"
                        ? "text-[#3a2a1e] bg-[#f3efe7] font-medium"
                        : "text-[#3a2a1e]/70 hover:bg-[#f3efe7]/50"
                    }`}
                  >
                    <span className="text-lg">🇬🇧</span>
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Center: Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center transition-opacity duration-300 hover:opacity-80 whitespace-nowrap"
          >
            <img
              src="https://storage.readdy-site.link/project_files/2bca2a75-b0f8-4945-8d11-e66de6960d4a/ec24edcc-7825-46cb-b11e-d4f2dd8bd6ea_compressed_Screenshot-2026-07-10-173234.webp"
              alt="Hanoki"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Right Group: Book Now */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={openBookingPopup}
              className="inline-flex items-center px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap bg-[#F3EFE7] text-[#3A2A1E] border border-[#E0D6C8] hover:bg-[#E7DDD0] active:bg-[#DDD0C1] cursor-pointer"
            >
              {t("nav.bookNow")}
            </button>
          </div>
        </div>
      </nav>

      {/* Side Panel Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Dark backdrop */}
          <div
            className="absolute inset-0 bg-black/40 transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />

          {/* Side Panel */}
          <div className="absolute top-0 left-0 h-full w-80 lg:w-1/4 bg-[#f7f4ef] flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Header bar */}
            <div className="flex items-center justify-between h-20 md:h-24 px-6 md:px-8">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center transition-opacity duration-300 hover:opacity-80 whitespace-nowrap"
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://storage.readdy-site.link/project_files/2bca2a75-b0f8-4945-8d11-e66de6960d4a/ec24edcc-7825-46cb-b11e-d4f2dd8bd6ea_compressed_Screenshot-2026-07-10-173234.webp"
                    alt="Hanoki"
                    className="h-10 md:h-12 w-auto"
                  />
                </div>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center"
                aria-label={t("nav.closeMenu")}
              >
                <i className="ri-close-line text-2xl text-[#3a2a1e]" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium tracking-widest transition-colors duration-300 ${
                    isActive(link.path)
                      ? "text-[#3a2a1e]"
                      : "text-[#3a2a1e]/60 hover:text-[#3a2a1e]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Language options in mobile menu */}
              <button
                onClick={() => setLang("vi")}
                className={`mt-2 text-sm font-medium tracking-wider transition-colors duration-300 cursor-pointer ${
                  currentLang === "vi" ? "text-[#3a2a1e] font-semibold" : "text-[#3a2a1e]/60 hover:text-[#3a2a1e]"
                }`}
              >
                <span className="mr-1">🇻🇳</span> Tiếng Việt
              </button>
              <button
                onClick={() => setLang("en")}
                className={`text-sm font-medium tracking-wider transition-colors duration-300 cursor-pointer ${
                  currentLang === "en" ? "text-[#3a2a1e] font-semibold" : "text-[#3a2a1e]/60 hover:text-[#3a2a1e]"
                }`}
              >
                <span className="mr-1">🇬🇧</span> English
              </button>
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-center pb-10 md:pb-14">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openBookingPopup();
                }}
                className="px-8 py-3 bg-[#F3EFE7] text-[#3A2A1E] border border-[#E0D6C8] text-sm font-medium tracking-wide hover:bg-[#E7DDD0] active:bg-[#DDD0C1] transition-colors duration-300 cursor-pointer"
              >
                {t("nav.bookNowMobile")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}