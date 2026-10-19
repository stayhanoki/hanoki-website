import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function StorySection() {
  const { t } = useTranslation("home");

  const features = [
    { icon: "ri-home-smile-line", label: t("story.featurePrivateSpace") },
    { icon: "ri-leaf-line", label: t("story.featureEcoFriendly") },
    { icon: "ri-heart-pulse-line", label: t("story.featureWellness") },
    { icon: "ri-restaurant-line", label: t("story.featureLocalFood") },
    { icon: "ri-community-line", label: t("story.featureLocalCommunity") },
  ];

  return (
    <section className="bg-background-50 py-16 md:py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-foreground-600 tracking-wide uppercase mb-6">
          {t("story.tagline")}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground-950 leading-tight">
          {t("story.titleLine1")}
          <br />
          {t("story.titleLine2")}
          <br />
          <span>{t("story.titleLine3")}</span>
        </h2>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/rooms"
            className="px-8 py-3.5 bg-[#F3EFE7] text-[#3A2A1E] border border-[#E0D6C8] text-sm font-medium hover:bg-[#E7DDD0] active:bg-[#DDD0C1] transition-colors whitespace-nowrap"
          >
            {t("story.bookNow")}
          </Link>
        </div>

        {/* Feature badges */}
        <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2.5 px-5 py-3.5 bg-background-100"
            >
              <i className={`${feature.icon} text-foreground-950 text-lg`}></i>
              <span className="text-sm text-foreground-950 font-medium whitespace-nowrap">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}