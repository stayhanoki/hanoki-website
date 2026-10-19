import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function HouseRulesSection() {
  const { t } = useTranslation("stayGuide");
  const [activeRule, setActiveRule] = useState<number | null>(null);

  const rules = [
    { icon: "ri-volume-mute-line", text: t("houseRules.quietHours") },
    { icon: "ri-forbid-line", text: t("houseRules.noSmoking") },
    { icon: "ri-notification-off-line", text: t("houseRules.noParty") },
    { icon: "ri-user-add-line", text: t("houseRules.visitors") },
    { icon: "ri-brush-line", text: t("houseRules.cleanliness") },
    { icon: "ri-settings-3-line", text: t("houseRules.noMoving") },
    { icon: "ri-alarm-warning-line", text: t("houseRules.reportDamage") },
    { icon: "ri-shield-check-line", text: t("houseRules.liability") },
    { icon: "ri-scales-3-line", text: t("houseRules.legalCompliance") },
    { icon: "ri-heart-line", text: t("houseRules.loveHome") },
  ];

  const toggleRule = (i: number) => setActiveRule(activeRule === i ? null : i);

  return (
    <section className="bg-secondary-600 py-14 md:py-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-background-50 text-center leading-tight mb-10 md:mb-14">
          {t("houseRules.title")}
        </h2>

        {/* Icon row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-8">
          {rules.map((rule, i) => (
            <button
              key={i}
              onClick={() => toggleRule(i)}
              aria-expanded={activeRule === i}
              className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border transition-colors cursor-pointer ${
                activeRule === i
                  ? "bg-background-50 border-background-50"
                  : "border-background-50/60 hover:border-background-50"
              }`}
            >
              <i
                className={`${rule.icon} text-xl ${
                  activeRule === i ? "text-secondary-700" : "text-background-50"
                }`}
              ></i>
            </button>
          ))}
        </div>

        {/* Active rule text */}
        <div className="max-w-lg mx-auto text-center min-h-[3.5rem]">
          {activeRule !== null && (
            <p className="text-base md:text-lg text-background-50 leading-relaxed whitespace-pre-line">
              {rules[activeRule].text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}