import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FloatingContact() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/84365205396"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2.5 px-4 py-3 bg-[#0068FF] text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        aria-label={t("floatingContact.chatZalo")}
      >
        <span className="w-5 h-5 flex items-center justify-center">
          <i className="ri-message-2-line text-white"></i>
        </span>
        {t("floatingContact.chatZalo")}
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/84365205396"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap ${open ? "opacity-100 translate-y-0 delay-[50ms]" : "opacity-0 translate-y-4 pointer-events-none delay-[50ms]"}`}
        aria-label={t("floatingContact.chatWhatsApp")}
      >
        <span className="w-5 h-5 flex items-center justify-center">
          <i className="ri-whatsapp-line text-white"></i>
        </span>
        {t("floatingContact.chatWhatsApp")}
      </a>

      {/* Main Toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${open ? "bg-foreground-800 rotate-45" : "bg-accent-500"}`}
        aria-label={t("floatingContact.contact")}
      >
        {open ? (
          <i className="ri-close-line text-white text-xl"></i>
        ) : (
          <i className="ri-chat-3-line text-white text-xl"></i>
        )}
      </button>
    </div>
  );
}