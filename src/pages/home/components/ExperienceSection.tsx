import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ExperienceSection() {
  const { t } = useTranslation("home");

  const expItems = [
    { title: t("experience.item1Title"), subtitle: t("experience.item1Subtitle") },
    { title: t("experience.item2Title"), subtitle: t("experience.item2Subtitle") },
    { title: t("experience.item3Title"), subtitle: t("experience.item3Subtitle") },
  ];

  const experiences = [
    {
      id: "01",
      title: expItems[0]?.title || "Boutique Hotel",
      subtitle: expItems[0]?.subtitle || "",
      bg: "bg-background-100",
      textColor: "text-foreground-950",
      accentBg: "bg-background-200",
      accentText: "text-foreground-950",
    },
    {
      id: "02",
      title: expItems[1]?.title || "Ecolodge",
      subtitle: expItems[1]?.subtitle || "",
      bg: "bg-background-100",
      textColor: "text-white",
      accentBg: "bg-white/20",
      accentText: "text-white",
      image:
        "https://readdy.ai/api/search-image?query=Japandi%20style%20ecolodge%20interior%20with%20natural%20bamboo%20and%20wood%20furniture%2C%20handwoven%20rattan%20textiles%2C%20soft%20diffused%20natural%20light%2C%20rustic%20minimal%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20serene%20atmosphere%2C%20editorial%20interior%20photography&width=600&height=500&seq=exp-ecolodge-01&orientation=landscape",
    },
    {
      id: "03",
      title: expItems[2]?.title || "Beach House",
      subtitle: expItems[2]?.subtitle || "",
      bg: "bg-primary-100",
      textColor: "text-foreground-950",
      accentBg: "bg-primary-200",
      accentText: "text-foreground-950",
    },
  ];

  return (
    <section className="bg-background-50 py-16 md:py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-xs text-foreground-500 tracking-widest uppercase mb-3">
              {t("experience.taglineLine1")}
              <br />
              {t("experience.taglineLine2")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground-950 leading-tight">
              <span>{t("experience.title")}</span>
            </h2>
          </div>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-300 hover:text-primary-200 transition-colors whitespace-nowrap"
          >
            {t("experience.learnMore")}
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`group relative overflow-hidden ${exp.bg} ${exp.textColor} min-h-[380px] flex flex-col`}
            >
              {index === 1 && exp.image ? (
                <>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </>
              ) : null}
              <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                <div
                  className={`w-10 h-10 flex items-center justify-center ${exp.accentBg} mb-auto`}
                >
                  <span className={`text-sm font-bold ${exp.accentText}`}>{exp.id}</span>
                </div>
                <div className="mt-8">
                  <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2">
                    {exp.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${index === 1 ? "text-white/80" : "opacity-70"}`}
                  >
                    {exp.subtitle}
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