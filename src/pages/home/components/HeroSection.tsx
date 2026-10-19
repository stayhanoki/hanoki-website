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

      {/* Centered Content */}
      <div className="relative z-10 text-center px-6">
        <img
          src="https://storage.readdy-site.link/project_files/2bca2a75-b0f8-4945-8d11-e66de6960d4a/0bccfa1a-7880-4ca9-ad6b-b50fec8c91a3_compressed_Logo-Hanoki.ai.webp"
          alt="Hanoki Homestay & Cafe"
          className="h-20 sm:h-28 md:h-32 lg:h-40 w-auto mx-auto mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        />
        <p
          className="text-sm md:text-base text-[#f3efe7]/70 leading-relaxed max-w-sm mx-auto"
        >
          {t("hero.tagline")}
        </p>
      </div>
    </section>
  );
}