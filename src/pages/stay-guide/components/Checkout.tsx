import { useTranslation } from "react-i18next";
import { useGuideImage } from "@/hooks/useStayGuideImages";

const FALLBACK_1 =
  "https://readdy.ai/api/search-image?query=Traveler%20packing%20luggage%20in%20a%20cozy%20Japandi%20room%2C%20warm%20soft%20lighting%2C%20minimal%20Japanese%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20lifestyle%20photography&width=600&height=600&seq=stay-guide-checkout-1&orientation=squarish";

const FALLBACK_2 =
  "https://readdy.ai/api/search-image?query=Cozy%20Japandi%20room%20interior%20with%20turned%20off%20lamp%20and%20closed%20window%20shutters%2C%20warm%20evening%20light%2C%20minimal%20Japanese%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20interior%20photography&width=600&height=600&seq=stay-guide-checkout-2&orientation=squarish";

const FALLBACK_3 =
  "https://readdy.ai/api/search-image?query=Hand%20placing%20room%20key%20on%20wooden%20reception%20desk%2C%20warm%20soft%20lighting%2C%20minimal%20Japanese%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20lifestyle%20photography&width=600&height=600&seq=stay-guide-checkout-3&orientation=squarish";

export default function CheckoutSection() {
  const { t } = useTranslation("stayGuide");
  const { images: sheetImages } = useGuideImage("trước khi rời hanoki");
  const steps = t("checkout.steps", { returnObjects: true }) as string[];

  const checkoutImages =
    sheetImages.length > 0 ? sheetImages : [FALLBACK_1, FALLBACK_2, FALLBACK_3];

  return (
    <section className="bg-background-50 py-10 md:py-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground-900 text-center leading-tight mb-12 md:mb-16">
          {t("checkout.title")}
        </h2>

        <div className="relative">
          {/* Connecting line between the step numbers */}
          <div className="hidden md:block absolute top-6 left-[16.666%] right-[16.666%] h-px bg-background-300" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-accent-500 text-background-50 font-heading text-xl mx-auto mb-4">
                  {i + 1}
                </div>
                <div className="aspect-square overflow-hidden bg-background-200">
                  <img
                    src={checkoutImages[i]}
                    alt={`Checkout step ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-base md:text-lg text-foreground-700 leading-relaxed mt-4 md:mt-5 max-w-xs mx-auto">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}