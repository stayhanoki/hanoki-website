import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCoverImage } from "@/hooks/useCoverImage";

const HERO_FALLBACK =
  "https://readdy.ai/api/search-image?query=Japandi%20interior%20design%20with%20warm%20ambient%20lighting%2C%20hanging%20paper%20lantern%2C%20large%20ceramic%20planter%20with%20green%20plant%2C%20wooden%20shoji%20sliding%20doors%2C%20soft%20golden%20sunlight%20casting%20shadows%20on%20textured%20wall%2C%20minimal%20Japanese%20aesthetic%2C%20dark%20moody%20atmosphere%2C%20editorial%20interior%20photography%2C%20earthy%20brown%20and%20cream%20tones%2C%20wide%20angle%20shot&width=1600&height=900&seq=hero-bg-full-v3&orientation=landscape";

const MOBILE_QUERY = "(max-width: 767px)";

export default function HeroSection() {
  const { t } = useTranslation("home");
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
  const [imgLoaded, setImgLoaded] = useState(false);

  const { image: desktopCover, loading: desktopLoading } = useCoverImage("home");
  const { image: mobileCover, loading: mobileLoading } = useCoverImage("home mobile");

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const resolved = isMobile ? mobileCover || desktopCover : desktopCover;
  const stillLoading = isMobile ? mobileLoading && desktopLoading : desktopLoading;
  const coverImage = stillLoading ? null : resolved || HERO_FALLBACK;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2D1F14]">
      {coverImage && (
        <img
          src={coverImage}
          alt="HANOKI Homestay interior"
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2D1F14]/[0.78]" />

   {/* Left Aligned Content */}
      <div className="container-page relative flex h-full flex-col justify-center pb-24 text-white">
      <h1 className="max-w-5xl text-left text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Ở HANOKI, thời gian trôi chậm hơn để bạn có thể tận hưởng trọn vẹn từng khoảnh khắc
      </h1>
      <p
        className="mt-5 max-w-xl text-left text-base leading-relaxed text-white/85 md:text-lg">
         {t("hero.tagline")}
      </p>
    </div>
    </section>
  );
}
