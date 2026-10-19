import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-[#3A2A1E] pt-20 pb-10 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left - HANOKI & Contact */}
          <div>
            {/* Logo + Social Icons */}
            <div className="flex items-center gap-4 mb-5">
              <Link
                to="/"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <img
                  src="https://storage.readdy-site.link/project_files/2bca2a75-b0f8-4945-8d11-e66de6960d4a/ec24edcc-7825-46cb-b11e-d4f2dd8bd6ea_compressed_Screenshot-2026-07-10-173234.webp"
                  alt="Hanoki"
                  className="h-10 md:h-12 w-auto"
                />
              </Link>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/hanoki.stay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#f3efe7]/20 hover:border-[#f3efe7]/60 hover:text-white transition-all text-[#f3efe7]/60"
                  aria-label="Instagram"
                >
                  <i className="ri-instagram-line text-sm"></i>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#f3efe7]/20 hover:border-[#f3efe7]/60 hover:text-white transition-all text-[#f3efe7]/60"
                  aria-label="Facebook"
                >
                  <i className="ri-facebook-line text-sm"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@hanoki.stay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#f3efe7]/20 hover:border-[#f3efe7]/60 hover:text-white transition-all text-[#f3efe7]/60"
                  aria-label="TikTok"
                >
                  <i className="ri-tiktok-line text-sm"></i>
                </a>
              </div>
            </div>
            <div className="space-y-2.5 ml-1">
              {/* Tel / Zalo */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-phone-line text-sm text-[#f3efe7]/60"></i>
                </div>
                <div>
                  <p className="text-sm text-[#f3efe7]/70 flex">
                    <span className="w-[110px] flex-shrink-0 text-[#f3efe7]/90">{t("footer.telZalo")}</span>
                    <span>+84 365 205 396</span>
                  </p>
                  <p className="text-sm text-[#f3efe7]/70 flex">
                    <span className="w-[110px] flex-shrink-0"></span>
                    <span>+84 866 380 872</span>
                  </p>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-whatsapp-line text-sm text-[#f3efe7]/60"></i>
                </div>
                <div>
                  <p className="text-sm text-[#f3efe7]/70 flex">
                    <span className="w-[110px] flex-shrink-0 text-[#f3efe7]/90">{t("footer.whatsapp")}</span>
                    <span>+84 365 205 396</span>
                  </p>
                  <p className="text-sm text-[#f3efe7]/70 flex">
                    <span className="w-[110px] flex-shrink-0"></span>
                    <span>+84 866 380 872</span>
                  </p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-sm text-[#f3efe7]/60"></i>
                </div>
                <p className="text-sm text-[#f3efe7]/70 flex">
                  <span className="w-[110px] flex-shrink-0 text-[#f3efe7]/90">{t("footer.email")}</span>
                  <span>stayhanoki@gmail.com</span>
                </p>
              </div>
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-map-pin-line text-sm text-[#f3efe7]/60"></i>
                </div>
                <p className="text-sm text-[#f3efe7]/70">
                  {t("footer.address")}
                  <a
                    href="https://maps.google.com/maps?q=162+Tri%E1%BB%87u+Vi%E1%BB%87t+V%C6%B0%C6%A1ng+Hai+B%C3%A0+Tr%C6%B0ng+H%C3%A0+N%E1%BB%99i"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2.5 inline-flex items-center gap-1 text-xs text-[#f3efe7]/50 hover:text-white underline transition-colors"
                  >
                    <i className="ri-external-link-line text-[10px]"></i>{t("footer.viewMap")}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right - Explore */}
          <div className="mt-12 lg:mt-0 lg:pl-12">
            <p className="text-xs font-medium tracking-widest text-[#f3efe7]/50 uppercase mb-5">
              {t("footer.explore")}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/rooms"
                className="text-sm text-[#f3efe7]/70 hover:text-white transition-colors whitespace-nowrap"
              >
                {t("footer.exploreRooms")}
              </Link>
              <Link
                to="/journey"
                className="text-sm text-[#f3efe7]/70 hover:text-white transition-colors whitespace-nowrap"
              >
                {t("footer.exploreCafe")}
              </Link>
              <Link
                to="/stay-guide"
                className="text-sm text-[#f3efe7]/70 hover:text-white transition-colors whitespace-nowrap"
              >
                {t("nav.stayGuide")}
              </Link>
              <Link
                to="/contact"
                className="text-sm text-[#f3efe7]/70 hover:text-white transition-colors whitespace-nowrap"
              >
                {t("footer.exploreContact")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#f3efe7]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-accent-500">
              <i className="ri-leaf-line text-white text-xs"></i>
            </div>
            <img
              src="https://storage.readdy-site.link/project_files/2bca2a75-b0f8-4945-8d11-e66de6960d4a/ec24edcc-7825-46cb-b11e-d4f2dd8bd6ea_compressed_Screenshot-2026-07-10-173234.webp"
              alt="Hanoki"
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <p className="text-xs text-[#f3efe7]/60">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}