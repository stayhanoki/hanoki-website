import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import JsonLd from "@/components/base/JsonLd";
import { getSiteUrl, HERO_IMAGE } from "@/utils/seo";

export default function JourneyPage() {
  const { t } = useTranslation("journey");
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-background-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "HANOKI Cafe - Sắp ra mắt",
          description: "HANOKI Cafe đang được xây dựng. Quay lại sớm nhé!",
          url: siteUrl ? `${siteUrl}/journey` : undefined,
          image: HERO_IMAGE,
        }}
      />
      <Navbar />
      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-10">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Japandi%20style%20cafe%20interior%20with%20warm%20ambient%20lighting%2C%20natural%20wood%20counter%2C%20ceramic%20coffee%20cups%2C%20paper%20pendant%20lights%2C%20minimal%20Japanese%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20soft%20morning%20light%2C%20peaceful%20atmosphere%2C%20editorial%20interior%20photography&width=1600&height=900&seq=cafe-coming-soon-bg&orientation=landscape"
            alt="HANOKI Cafe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3a2a1e]/70" />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <p className="text-sm text-white/60 tracking-[0.3em] uppercase mb-6">
            {t("brand")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide leading-tight">
            {t("comingSoon")}
          </h1>
          <div className="w-12 h-px bg-foreground-50/40 mx-auto mt-8 mb-6" />
          <p className="text-sm md:text-base text-white/70 leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white text-sm font-medium tracking-wide hover:bg-primary-600 transition-colors duration-300 whitespace-nowrap"
            >
              <i className="ri-arrow-left-line"></i>
              {t("backHome")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}