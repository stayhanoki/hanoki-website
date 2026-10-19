import { useTranslation } from "react-i18next";

interface ContactPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactPopup({ open, onClose }: ContactPopupProps) {
  const { t, i18n } = useTranslation("stayGuide");
  const isEn = i18n.language?.startsWith("en");

  if (!open) return null;

  const channels = [
    {
      name: "Zalo",
      sub: "0365.205.396",
      href: "https://zalo.me/0365205396",
      icon: "ri-chat-1-line",
    },
    {
      name: "Zalo 2",
      sub: "0866.380.872",
      href: "https://zalo.me/0866380872",
      icon: "ri-chat-1-line",
    },
    {
      name: "WhatsApp",
      sub: "+84 365 205 396",
      href: "https://wa.me/84365205396",
      icon: "ri-whatsapp-line",
    },
    {
      name: "WhatsApp 2",
      sub: "+84 866 380 872",
      href: "https://wa.me/84866380872",
      icon: "ri-whatsapp-line",
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-background-50 w-full max-w-sm mx-4 p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-foreground-400 hover:text-foreground-700 transition-colors cursor-pointer"
          aria-label={isEn ? "Close" : "Đóng"}
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        <h2 className="font-heading text-xl md:text-2xl text-foreground-900 text-center mb-1">
          {t("quickInfo.contact.channel")}
        </h2>
        <p className="text-sm text-foreground-500 text-center mb-6">
          {t("quickInfo.contact.support")}
        </p>

        <div className="grid grid-cols-1 gap-3">
          {channels.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 border border-background-200 bg-background-100 hover:bg-background-200 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-100 flex-shrink-0">
                <i className={`${ch.icon} text-secondary-700 text-xl`}></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground-900">
                  {ch.name}
                </p>
                <p className="text-xs text-foreground-500">{ch.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}