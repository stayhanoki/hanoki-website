import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactPopup from "./ContactPopup";

const MAP_URL =
  "https://maps.google.com/maps?q=162+Tri%E1%BB%87u+Vi%E1%BB%87t+V%C6%B0%C6%A1ng+Hai+B%C3%A0+Tr%C6%B0ng+H%C3%A0+N%E1%BB%99i";

export default function QuickInfoSection() {
  const { t } = useTranslation("stayGuide");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const toggle = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  const checkInDetails = t("quickInfo.checkIn.details", {
    returnObjects: true,
  }) as string[];
  const checkOutDetails = t("quickInfo.checkOut.details", {
    returnObjects: true,
  }) as string[];

  return (
    <section className="bg-background-50 pt-10 md:pt-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-secondary-700 font-medium tracking-wide uppercase mb-10 text-center">
          {t("quickInfo.title")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Check-in */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary-100 mb-3">
              <i className="ri-login-box-line text-secondary-700 text-xl"></i>
            </div>
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground-900 mb-1">
              {t("quickInfo.checkIn.label")}
            </h3>
            <p className="text-sm text-foreground-600">
              {t("quickInfo.checkIn.summary")}{" "}
              <button
                onClick={() => toggle("checkIn")}
                className="underline text-secondary-700 hover:text-secondary-900 cursor-pointer"
              >
                {t("quickInfo.viewMore")}
              </button>
            </p>
            {expanded === "checkIn" && (
              <ul className="mt-3 space-y-2 text-left w-full">
                {checkInDetails.map((d, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground-700 leading-relaxed flex items-start gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-secondary-600 mt-0.5"></i>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Check-out */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary-100 mb-3">
              <i className="ri-logout-box-line text-secondary-700 text-xl"></i>
            </div>
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground-900 mb-1">
              {t("quickInfo.checkOut.label")}
            </h3>
            <p className="text-sm text-foreground-600">
              {t("quickInfo.checkOut.summary")}{" "}
              <button
                onClick={() => toggle("checkOut")}
                className="underline text-secondary-700 hover:text-secondary-900 cursor-pointer"
              >
                {t("quickInfo.viewMore")}
              </button>
            </p>
            {expanded === "checkOut" && (
              <ul className="mt-3 space-y-2 text-left w-full">
                {checkOutDetails.map((d, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground-700 leading-relaxed flex items-start gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-secondary-600 mt-0.5"></i>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary-100 mb-3">
              <i className="ri-map-pin-line text-secondary-700 text-xl"></i>
            </div>
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground-900 mb-1">
              {t("quickInfo.address.label")}
            </h3>
            <p className="text-sm text-foreground-600 leading-relaxed">
              {t("quickInfo.address.value")}
            </p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs text-secondary-700 hover:text-secondary-900 underline transition-colors"
            >
              <i className="ri-external-link-line text-[10px]"></i>
              {t("quickInfo.address.viewMap")}
            </a>
          </div>

          {/* Contact */}
          <button
            onClick={() => setContactOpen(true)}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary-100 mb-3">
              <i className="ri-customer-service-line text-secondary-700 text-xl"></i>
            </div>
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground-900 mb-1">
              {t("quickInfo.contact.label")}
            </h3>
            <p className="text-sm font-medium text-foreground-700">
              {t("quickInfo.contact.channel")}
            </p>
            <p className="text-xs text-foreground-600">
              {t("quickInfo.contact.support")}
            </p>
          </button>
        </div>

        {/* Divider */}
        <div className="mt-10 md:mt-12 border-t border-background-300" />
      </div>

      <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}