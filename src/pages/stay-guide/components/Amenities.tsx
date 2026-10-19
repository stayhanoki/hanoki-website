import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Amenity {
  icon: string;
  label: string;
  desc: string;
}

export default function AmenitiesSection() {
  const { t } = useTranslation("stayGuide");
  const [active, setActive] = useState<number | null>(null);

  const amenities: Amenity[] = [
    {
      icon: "ri-wifi-line",
      label: t("amenities.wifi.label"),
      desc: t("amenities.wifi.desc"),
    },
    {
      icon: "ri-temp-hot-line",
      label: t("amenities.ac.label"),
      desc: t("amenities.ac.desc"),
    },
    {
      icon: "ri-drop-line",
      label: t("amenities.hotWater.label"),
      desc: t("amenities.hotWater.desc"),
    },
    {
      icon: "ri-tv-line",
      label: t("amenities.tv.label"),
      desc: t("amenities.tv.desc"),
    },
    {
      icon: "ri-restaurant-line",
      label: t("amenities.kitchen.label"),
      desc: t("amenities.kitchen.desc"),
    },
    {
      icon: "washer",
      label: t("amenities.laundry.label"),
      desc: t("amenities.laundry.desc"),
    },
  ];

  const toggle = (i: number) => setActive(active === i ? null : i);

  return (
    <section className="bg-background-50 py-10 md:py-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground-900 text-center leading-tight mb-12 md:mb-16">
          {t("amenities.title")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-5">
          {amenities.map((item, i) => (
            <button
              key={item.label}
              onClick={() => toggle(i)}
              className="bg-background-100 p-4 md:p-5 border border-background-200/70 text-center cursor-pointer transition-colors"
              aria-expanded={active === i}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary-100 mx-auto mb-3">
                {item.icon === "washer" ? (
                  <span className="relative inline-block w-5 h-5 text-secondary-700">
                    <span className="absolute inset-0 rounded-[4px] border-[1.5px] border-current"></span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-[1.5px] border-current"></span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-current"></span>
                  </span>
                ) : (
                  <i className={`${item.icon} text-secondary-700 text-xl`}></i>
                )}
              </div>
              <h3 className="font-heading text-sm font-bold text-foreground-900 leading-snug">
                {item.label}
              </h3>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === i ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}