import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { useRooms } from "@/hooks/useRooms";
import { useCoverImage } from "@/hooks/useCoverImage";
import JsonLd from "@/components/base/JsonLd";
import { getAmenityIcon } from "@/utils/amenityIcons";
import { getSiteUrl } from "@/utils/seo";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function Rooms() {
  const { t, i18n } = useTranslation("rooms");
  const isEn = i18n.language?.startsWith("en");

  const { rooms: localizedRooms, loading } = useRooms(i18n.language);
  const { image: coverImage, loading: coverLoading } = useCoverImage("rooms");
  const [heroImgLoaded, setHeroImgLoaded] = useState(false);

  const HERO_FALLBACK =
    "https://readdy.ai/api/search-image?query=Japandi%20style%20hotel%20room%20interior%20with%20soft%20morning%20light%20through%20window%2C%20minimal%20design%20with%20natural%20wood%20and%20linen%20textures%2C%20warm%20ambient%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20peaceful%20zen%20atmosphere%2C%20ceramic%20accents%20and%20dried%20flowers%2C%20editorial%20interior%20photography&width=1600&height=600&seq=rooms-hero-bg-v2&orientation=landscape";

  const heroImage = coverLoading ? null : coverImage || HERO_FALLBACK;

  const availableRooms = useMemo(() => {
    return localizedRooms.filter((room) => room.available);
  }, [localizedRooms]);

  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-background-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Danh sách phòng HANOKI",
          itemListElement: localizedRooms.map((room, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "HotelRoom",
              name: room.name,
              description: room.description,
              url: siteUrl ? `${siteUrl}/room/${room.id}` : undefined,
              image: room.images[0],
              containedInPlace: {
                "@type": "LodgingBusiness",
                name: "HANOKI Homestay & Cafe",
              },
              offers: {
                "@type": "Offer",
                price: room.pricePerNight,
                priceCurrency: "VND",
                availability: room.available
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              },
            },
          })),
        }}
      />
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-24 md:pt-28 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden bg-background-50">
        <div className="absolute inset-0">
          {heroImage && (
            <img
              src={heroImage}
              alt=""
              onLoad={() => setHeroImgLoaded(true)}
              className={`w-full h-full object-cover object-[50%_60%] transition-opacity duration-1000 ${
                heroImgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-background-50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="text-sm text-white/70 font-medium tracking-wide uppercase mb-4">
            {t("heroTagline")}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            {t("heroTitle1")}
            <br />
            <span>{t("heroTitle2")}</span>
          </h1>
        </div>
      </div>

      {/* Room Grid */}
      <div className="py-8 md:py-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="block overflow-hidden bg-background-50 border border-background-200/50">
                  <div className="relative aspect-[4/3] overflow-hidden bg-background-200 animate-pulse" />
                  <div className="p-4 md:p-5 space-y-3">
                    <div className="h-5 bg-background-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-background-200 rounded animate-pulse w-1/2" />
                    <div className="h-3 bg-background-200 rounded animate-pulse w-full" />
                    <div className="h-3 bg-background-200 rounded animate-pulse w-2/3" />
                    <div className="pt-3 border-t border-background-200/50 flex items-center justify-between">
                      <div className="h-4 bg-background-200 rounded animate-pulse w-1/3" />
                      <div className="h-4 bg-background-200 rounded animate-pulse w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : availableRooms.length === 0 ? (
            <div className="text-center py-24 md:py-32">
              <div className="w-20 h-20 mx-auto mb-6 bg-background-200 rounded-full flex items-center justify-center">
                <i className="ri-search-line text-2xl text-foreground-400"></i>
              </div>
              <h3 className="font-heading text-xl text-foreground-800 mb-2">
                {t("emptyTitle")}
              </h3>
              <p className="text-sm text-foreground-500 max-w-sm mx-auto">
                {t("emptyDescription")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {availableRooms.map((room) => (
                <Link
                  key={room.id}
                  to={`/room/${room.id}`}
                  className="group block overflow-hidden bg-background-50 border border-background-200/50 hover:border-background-300 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-background-200">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                        {room.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-base md:text-lg font-semibold text-foreground-900 group-hover:text-primary-700 transition-colors line-clamp-1">
                          {room.name}
                        </h3>
                        <p className="mt-1 text-xs md:text-sm text-foreground-500 flex items-center gap-1">
                          <i className="ri-map-pin-line text-xs"></i>
                          {room.location}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs md:text-sm text-foreground-600 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-background-100 text-[11px] text-foreground-600"
                        >
                          <i className={`${getAmenityIcon(amenity)} text-[10px]`}></i>
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="text-[11px] text-foreground-400">
                          +{room.amenities.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-background-200/50 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-foreground-400 font-normal">
                          {t("from")}
                        </span>
                        <span className="text-base md:text-lg font-bold text-foreground-800">
                          {formatPrice(room.pricePerNight)}
                        </span>
                        <span className="text-xs md:text-sm font-normal text-foreground-500">
                          {" "}
                          {t("perNight")}
                        </span>
                        {room.pricePerHour ? (
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-xs md:text-sm font-medium text-foreground-600">
                              {formatPrice(room.pricePerHour)}
                            </span>
                            <span className="text-[11px] md:text-xs font-normal text-foreground-400">
                              {t("perHour")}
                            </span>
                          </div>
                        ) : null}
                        <div className="flex items-center gap-1 mt-0.5">
                          <i className="ri-information-line text-[10px] text-foreground-400"></i>
                          <span className="text-[10px] text-foreground-400">
                            {t("priceVaries")}
                          </span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-foreground-500">
                        <i className="ri-user-line"></i>
                        {room.maxGuests}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}