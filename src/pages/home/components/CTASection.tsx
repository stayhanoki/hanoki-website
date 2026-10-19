import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const { t } = useTranslation("home");

  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="text-center px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground-900 font-bold">
          {t("cta.title")}
        </h2>
        <Link
          to="/rooms"
          className="mt-8 inline-flex items-center gap-2 px-10 py-4 bg-[#F3EFE7] text-[#3A2A1E] border border-[#E0D6C8] text-sm font-semibold hover:bg-[#E7DDD0] active:bg-[#DDD0C1] transition-colors whitespace-nowrap cursor-pointer"
        >
          {t("cta.startBooking")}
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </section>
  );
}