import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGuideImage } from "@/hooks/useStayGuideImages";
import { hasGuideSheetConfigured } from "@/utils/googleSheetStayGuide";

const FALLBACK_DESKTOP =
  "https://readdy.ai/api/search-image?query=Cozy%20Japandi%20homestay%20entrance%20with%20warm%20golden%20lighting%2C%20wooden%20door%20with%20brass%20handle%2C%20potted%20plants%2C%20soft%20shadows%20on%20textured%20wall%2C%20minimal%20Japanese%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20interior%20photography%2C%20peaceful%20atmosphere&width=1600&height=700&seq=stay-guide-hero-desktop&orientation=landscape";

const FALLBACK_MOBILE =
  "https://readdy.ai/api/search-image?query=Cozy%20Japandi%20homestay%20interior%20with%20warm%20golden%20lighting%2C%20wooden%20shoji%20screen%2C%20potted%20plants%2C%20soft%20shadows%2C%20minimal%20Japanese%20aesthetic%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20interior%20photography%2C%20vertical%20composition&width=800&height=1000&seq=stay-guide-hero-mobile&orientation=portrait";

export default function HeroSection() {
  const { t } = useTranslation("stayGuide");
  const { image, loading } = useGuideImage("cẩm nang lưu trú");
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  const desktopSrc = image || FALLBACK_DESKTOP;
  const mobileSrc = image || FALLBACK_MOBILE;

  // Chỉ hiện ảnh dự phòng khi chắc chắn không có ảnh từ Google Sheet.
  // Trong lúc tải dữ liệu, giữ nền thương hiệu để tránh nhấp nháy ảnh dự phòng.
  const ready = !!image || (!loading && !hasGuideSheetConfigured());

  return (
    <section className="relative min-h-[420px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-primary-900">
      {ready ? (
        <>
          {/* Desktop hero image */}
          <img
            src={desktopSrc}
            alt="Hanoki Stay Guide"
            onLoad={() => setDesktopLoaded(true)}
            className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              desktopLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Mobile hero image */}
          <img
            src={mobileSrc}
            alt="Hanoki Stay Guide"
            onLoad={() => setMobileLoaded(true)}
            className={`md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              mobileLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-primary-900/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-800" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p className="text-sm md:text-base tracking-[0.35em] text-background-50/70 uppercase mb-4">
          {t("hero.subtitle")}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background-50 leading-tight mb-6">
          {t("hero.title")}
        </h1>
        <p className="text-base md:text-lg text-background-50/80 leading-relaxed max-w-lg mx-auto">
          {t("hero.description")}
        </p>
      </div>
    </section>
  );
}