import { useTranslation } from "react-i18next";
import { useGuideImage } from "@/hooks/useStayGuideImages";

const FALLBACK =
  "https://readdy.ai/api/search-image?query=Japandi%20homestay%20room%20interior%20with%20neatly%20made%20bed%2C%20white%20linens%2C%20wooden%20furniture%2C%20warm%20soft%20lighting%2C%20minimal%20Japanese%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20interior%20photography%2C%20welcoming%20atmosphere&width=800&height=600&seq=stay-guide-before-arrival&orientation=landscape";

export default function BeforeArrivalSection() {
  const { t } = useTranslation("stayGuide");
  const { image } = useGuideImage("trước khi bạn đến");
  const items = t("beforeArrival.items", { returnObjects: true }) as string[];

  const imgSrc = image || FALLBACK;

  return (
    <section className="bg-background-50 py-10 md:py-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Image */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="aspect-[4/3] overflow-hidden bg-background-200">
              <img
                src={imgSrc}
                alt="Before arrival"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground-900 leading-tight mb-8">
              {t("beforeArrival.title")}
            </h2>
            <ul className="space-y-4">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-secondary-600 text-sm"></i>
                  </div>
                  <p className="text-base text-foreground-700 leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}