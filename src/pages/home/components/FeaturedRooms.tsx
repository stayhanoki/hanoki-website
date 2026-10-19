import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useRooms } from "@/hooks/useRooms";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

const cardBgColors = [
  "bg-background-200",
  "bg-background-200",
  "bg-background-200",
  "bg-background-200",
];

export default function FeaturedRooms() {
  const { t, i18n } = useTranslation("home");
  const { rooms: allRooms, loading } = useRooms(i18n.language);
  const featuredRooms = useMemo(() => allRooms.slice(0, 3), [allRooms]);
  const isEn = i18n.language?.startsWith("en");

  if (loading) {
    return (
      <section className="bg-background-50 py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div className="space-y-3">
              <div className="h-4 bg-background-200 rounded animate-pulse w-32" />
              <div className="h-10 bg-background-200 rounded animate-pulse w-64" />
              <div className="h-10 bg-background-200 rounded animate-pulse w-48" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="block overflow-hidden bg-background-100">
                <div className="relative aspect-[3/4] overflow-hidden bg-background-200 animate-pulse" />
                <div className="p-4 md:p-5 space-y-3">
                  <div className="h-5 bg-background-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-background-200 rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-background-200 rounded animate-pulse w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background-50 py-16 md:py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-sm text-secondary-700 font-medium tracking-wide uppercase mb-3">
              {t("featured.journeyTitle")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground-900 leading-tight">
              {t("featured.titleLine1")}
              <br />
              <span>{t("featured.titleLine2")}</span>
            </h2>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featuredRooms.map((room, index) => (
            <Link
              key={room.id}
              to={`/room/${room.id}`}
              className="group block overflow-hidden bg-background-100 transition-all duration-500"
            >
              <div
                className={`relative aspect-[3/4] overflow-hidden ${cardBgColors[index % cardBgColors.length]}`}
              >
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                    {room.category}
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-heading text-base md:text-lg font-semibold text-foreground-950 group-hover:text-primary-300 transition-colors line-clamp-1">
                  {room.name}
                </h3>
                <p className="mt-1 text-xs text-foreground-500 line-clamp-1">
                  {room.location}
                </p>
                <div className="mt-3">
                  {room.pricePerDay ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-foreground-800">
                        {formatPrice(room.pricePerDay)}
                      </span>
                      <span className="text-xs font-normal text-foreground-500">
                        {isEn ? "/ day (2pm - 12pm)" : " / ngày (14h - 12h)"}
                      </span>
                    </div>
                  ) : null}
                  {room.pricePerHour ? (
                    <div className="mt-0.5 flex items-baseline gap-1">
                      <span className="text-xs font-medium text-foreground-600">
                        {formatPrice(room.pricePerHour)}
                      </span>
                      <span className="text-[11px] font-normal text-foreground-400">
                        {isEn ? "/ first 2 hours" : "/ 2 giờ đầu"}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}