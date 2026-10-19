import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

export function openBookingPopup() {
  window.dispatchEvent(new CustomEvent("open-booking-popup"));
}

export default function BookingChannelPopup() {
  const { i18n } = useTranslation("common");
  const isEn = i18n.language?.startsWith("en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-booking-popup", handler);
    return () => window.removeEventListener("open-booking-popup", handler);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  if (!open) return null;

  const channels = [
    {
      name: "Zalo",
      sub: "0365.205.396",
      href: "https://zalo.me/0365205396",
      icon: "ri-chat-1-line",
      color: "bg-[#0068FF]/10 text-[#0068FF] border-[#0068FF]/20 hover:bg-[#0068FF]/15",
    },
    {
      name: "Zalo 2",
      sub: "0866.380.872",
      href: "https://zalo.me/0866380872",
      icon: "ri-chat-1-line",
      color: "bg-[#0068FF]/10 text-[#0068FF] border-[#0068FF]/20 hover:bg-[#0068FF]/15",
    },
    {
      name: "WhatsApp",
      sub: "+84 365 205 396",
      href: "https://wa.me/84365205396",
      icon: "ri-whatsapp-line",
      color: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 hover:bg-[#25D366]/15",
    },
    {
      name: "WhatsApp 2",
      sub: "+84 866 380 872",
      href: "https://wa.me/84866380872",
      icon: "ri-whatsapp-line",
      color: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 hover:bg-[#25D366]/15",
    },
    {
      name: "Instagram",
      sub: "@hanoki.stay",
      href: "https://www.instagram.com/hanoki.stay/",
      icon: "ri-instagram-line",
      color: "bg-[#E4405F]/10 text-[#E4405F] border-[#E4405F]/20 hover:bg-[#E4405F]/15",
    },
    {
      name: "TikTok",
      sub: "@hanoki.stay",
      href: "https://www.tiktok.com/@hanoki.stay",
      icon: "ri-tiktok-line",
      color: "bg-foreground-900/10 text-foreground-900 border-foreground-300/30 hover:bg-foreground-900/15",
    },
    {
      name: "Facebook",
      sub: "Hanoki Homestay",
      href: "https://www.facebook.com/hanoki.stay",
      icon: "ri-facebook-line",
      color: "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20 hover:bg-[#1877F2]/15",
    },
    {
      name: "Airbnb",
      sub: isEn ? "Coming soon" : "Sắp mở",
      href: "",
      icon: "ri-home-smile-line",
      color: "bg-background-200 text-foreground-400 border-background-300 cursor-not-allowed",
      disabled: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative bg-[#f7f4ef] w-full max-w-md mx-4 p-6 md:p-8 shadow-2xl">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-foreground-400 hover:text-foreground-700 transition-colors cursor-pointer"
          aria-label={isEn ? "Close" : "Đóng"}
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        <h2 className="font-heading text-xl md:text-2xl text-foreground-900 text-center mb-1">
          {isEn ? "Book Your Stay" : "Đặt phòng"}
        </h2>
        <p className="text-sm text-foreground-500 text-center mb-6">
          {isEn
            ? "Choose a channel to contact Hanoki"
            : "Chọn kênh để liên hệ với Hanoki"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {channels.map((ch) =>
            ch.disabled ? (
              <div
                key={ch.name}
                className={`flex items-center gap-3 px-4 py-3 border ${ch.color} transition-colors`}
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className={`${ch.icon} text-xl`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{ch.name}</p>
                  <p className="text-xs text-foreground-400">{ch.sub}</p>
                </div>
              </div>
            ) : (
              <a
                key={ch.name}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className={`flex items-center gap-3 px-4 py-3 border ${ch.color} transition-colors cursor-pointer`}
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className={`${ch.icon} text-xl`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{ch.name}</p>
                  <p className="text-xs text-foreground-500 truncate">{ch.sub}</p>
                </div>
              </a>
            )
          )}
        </div>

        <p className="mt-5 text-xs text-foreground-400 text-center leading-relaxed">
          {isEn
            ? "Our team will reply within 15 minutes during business hours (7:00 – 24:00)."
            : "Đội ngũ Hanoki sẽ phản hồi trong vòng 15 phút trong khung giờ hoạt động (7:00 – 24:00)."}
        </p>
      </div>
    </div>
  );
}