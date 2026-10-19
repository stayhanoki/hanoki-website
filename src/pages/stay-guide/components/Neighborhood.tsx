import { useTranslation } from "react-i18next";

const NEIGHBORHOOD_IMG =
  "https://readdy.ai/api/search-image?query=Hanoi%20Old%20Quarter%20street%20scene%20at%20golden%20hour%2C%20Trieu%20Viet%20Vuong%20street%20with%20colonial%20architecture%2C%20motorbikes%2C%20local%20cafes%2C%20warm%20amber%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20travel%20photography%2C%20Vietnamese%20urban%20charm&width=1200&height=675&seq=stay-guide-neighborhood&orientation=landscape";

export default function NeighborhoodSection() {
  const { t } = useTranslation("stayGuide");

  return (
    <section className="bg-background-100 py-10 md:py-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground-900 text-center leading-tight mb-6">
          {t("neighborhood.title")}
        </h2>
        <p className="text-base md:text-lg text-foreground-700 text-center leading-relaxed max-w-3xl mx-auto mb-10 md:mb-14">
          {t("neighborhood.desc")}
        </p>
        <div className="aspect-[16/9] overflow-hidden bg-background-200 mb-8">
          <img
            src={NEIGHBORHOOD_IMG}
            alt="Neighborhood around Hanoki"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <a
            href="https://maps.google.com/maps?q=162+Tri%E1%BB%87u+Vi%E1%BB%87t+V%C6%B0%C6%A1ng+Hai+B%C3%A0+Tr%C6%B0ng+H%C3%A0+N%E1%BB%99i"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 text-background-50 text-sm font-medium tracking-wide hover:bg-primary-600 transition-colors whitespace-nowrap"
          >
            <i className="ri-map-pin-line"></i>
            {t("neighborhood.viewMap")}
          </a>
        </div>
      </div>
    </section>
  );
}