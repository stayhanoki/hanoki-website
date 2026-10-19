import { useTranslation } from "react-i18next";
import { useGuideImage } from "@/hooks/useStayGuideImages";

const FALLBACK_KITCHEN =
  "https://readdy.ai/api/search-image?query=Minimal%20Japandi%20kitchen%20with%20natural%20wood%20cabinets%2C%20ceramic%20dishes%2C%20coffee%20equipment%2C%20warm%20soft%20lighting%2C%20potted%20herbs%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20interior%20photography%2C%20clean%20organized%20space&width=800&height=600&seq=stay-guide-kitchen&orientation=landscape";

const FALLBACK_LAUNDRY =
  "https://readdy.ai/api/search-image?query=Modern%20minimal%20laundry%20area%20with%20washing%20machine%2C%20wicker%20basket%2C%20white%20linens%2C%20wooden%20shelves%2C%20warm%20soft%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20interior%20photography%2C%20cozy%20organized%20space&width=800&height=600&seq=stay-guide-laundry&orientation=landscape";

export default function SharedSpacesSection() {
  const { t } = useTranslation("stayGuide");
  const { image: kitchenImg } = useGuideImage("khu bếp ấm cúng");
  const { image: laundryImg } = useGuideImage("máy giặt và máy sấy");

  const kitchenSrc = kitchenImg || FALLBACK_KITCHEN;
  const laundrySrc = laundryImg || FALLBACK_LAUNDRY;

  return (
    <section className="bg-background-50 py-10 md:py-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-10 md:space-y-14">
        {/* Kitchen - text left, image right */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground-900 leading-tight mb-4">
              {t("sharedKitchen.title")}
            </h2>
            <p className="text-base md:text-lg text-foreground-700 leading-relaxed">
              {t("sharedKitchen.desc")}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/3] overflow-hidden bg-background-200">
              <img
                src={kitchenSrc}
                alt="Shared kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Laundry - image left, text right */}
        <div className="flex flex-col md:flex-row-reverse gap-10 md:gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground-900 leading-tight mb-4">
              {t("laundry.title")}
            </h2>
            <p className="text-base md:text-lg text-foreground-700 leading-relaxed">
              {t("laundry.desc")}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/3] overflow-hidden bg-background-200">
              <img
                src={laundrySrc}
                alt="Washer and dryer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}