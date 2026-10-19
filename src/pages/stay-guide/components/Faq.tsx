import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection() {
  const { t } = useTranslation("stayGuide");
  const items = t("faq.items", { returnObjects: true }) as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-background-50 py-10 md:py-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground-900 text-center leading-tight mb-12 md:mb-16">
          {t("faq.title")}
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-background-100 border border-background-200/70"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer"
                aria-expanded={openIndex === i}
              >
                <span className="text-base md:text-lg text-foreground-900 font-medium leading-relaxed">
                  {item.q}
                </span>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <i
                    className={`ri-add-line text-foreground-500 transition-transform duration-300 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  ></i>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-base text-foreground-700 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}