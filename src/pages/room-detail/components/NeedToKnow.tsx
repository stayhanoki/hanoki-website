import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TermsPopup from "@/pages/room-detail/components/TermsPopup";

interface NeedToKnowItem {
  q: string;
  a: string;
  linkLabel?: string;
}

const ICONS = [
  "ri-calendar-check-line",
  "ri-group-line",
  "ri-calendar-event-line",
  "ri-shield-check-line",
  "ri-time-line",
];

export default function NeedToKnow() {
  const { t } = useTranslation("roomDetail");
  const items = t("needToKnow.items", { returnObjects: true }) as NeedToKnowItem[];
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [termsOpen, setTermsOpen] = useState<boolean>(false);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div id="need-to-know" className="mt-10">
      <h3 className="font-heading text-xl text-foreground-900 mb-4">
        {t("needToKnow.title")}
      </h3>

      <div className="border border-background-200/70 divide-y divide-background-200/70">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className={open ? "bg-[#EFE9DE]" : "bg-background-50"}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-3 px-4 md:px-5 py-4 text-left cursor-pointer"
                aria-expanded={open}
              >
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 text-foreground-500">
                  <i className={`${ICONS[i]} text-lg`}></i>
                </div>
                <span className="flex-1 text-sm md:text-base text-foreground-900 font-medium leading-snug">
                  {item.q}
                </span>
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <i
                    className={`ri-arrow-down-s-line text-foreground-400 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-4 md:px-5 pb-4 pl-14 md:pl-[60px]">
                  <p className="text-sm text-foreground-600 leading-relaxed">
                    {item.a}
                  </p>
                  {item.linkLabel && (
                    <button
                      type="button"
                      onClick={() => setTermsOpen(true)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800 underline underline-offset-4 cursor-pointer"
                    >
                      {item.linkLabel}
                      <i className="ri-arrow-right-up-line text-xs"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        to="/stay-guide"
        className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-foreground-800 hover:text-primary-600 transition-colors cursor-pointer"
      >
        {t("needToKnow.viewFullGuide")}
        <i className="ri-arrow-right-line"></i>
      </Link>

      <TermsPopup open={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
}