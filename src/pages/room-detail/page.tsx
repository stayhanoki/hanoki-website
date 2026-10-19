import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { openBookingPopup } from "@/components/feature/BookingChannelPopup";
import { useRooms } from "@/hooks/useRooms";
import JsonLd from "@/components/base/JsonLd";
import { getAmenityIcon } from "@/utils/amenityIcons";
import { getSiteUrl } from "@/utils/seo";
import NeedToKnow from "@/pages/room-detail/components/NeedToKnow";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function RoomDetail() {
  const { t, i18n } = useTranslation("roomDetail");
  const { id } = useParams<{ id: string }>();
  const { rooms, loading } = useRooms(i18n.language);
  const room = rooms.find((r) => r.id === id);
  const siteUrl = getSiteUrl();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50">
        <Navbar />
        <div className="pt-24 md:pt-28 pb-8 md:pb-12 px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
            <div className="h-4 bg-background-200 rounded w-1/3" />
            <div className="h-10 bg-background-200 rounded w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-[4/3] bg-background-200 rounded" />
              <div className="aspect-[4/3] bg-background-200 rounded" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-background-200 rounded w-1/4" />
                <div className="h-4 bg-background-200 rounded w-full" />
                <div className="h-4 bg-background-200 rounded w-full" />
                <div className="h-4 bg-background-200 rounded w-2/3" />
              </div>
              <div className="h-40 bg-background-200 rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-home-line text-4xl text-foreground-300 mb-4"></i>
          <p className="text-foreground-500">{t("notFound")}</p>
          <Link
            to="/rooms"
            className="mt-4 inline-block text-sm text-primary-600 hover:underline"
          >
            {t("backToList")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HotelRoom",
          name: room.name,
          description: room.description,
          image: room.images,
          url: siteUrl ? `${siteUrl}/room/${room.id}` : undefined,
          containedInPlace: {
            "@type": "LodgingBusiness",
            name: "HANOKI Homestay & Cafe",
          },
          amenityFeature: room.amenities.map((amenity) => ({
            "@type": "LocationFeatureSpecification",
            name: amenity,
            value: true,
          })),
          occupancy: {
            "@type": "QuantitativeValue",
            maxValue: room.maxGuests,
          },
          offers: {
            "@type": "Offer",
            price: room.pricePerNight,
            priceCurrency: "VND",
            availability: room.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            validFrom: "2026-08-07",
          },
        }}
      />
      <Navbar />
      <div className="pt-24 md:pt-28 pb-8 md:pb-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-foreground-500 mb-6">
            <Link
              to="/"
              className="hover:text-primary-600 transition-colors"
            >
              {t("breadcrumbHome")}
            </Link>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <Link
              to="/rooms"
              className="hover:text-primary-600 transition-colors"
            >
              {t("breadcrumbRooms")}
            </Link>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <span className="text-foreground-800">{room.name}</span>
          </div>

          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium mb-3">
                {room.category}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl text-foreground-900">
                {room.name}
              </h1>
              <p className="mt-2 text-foreground-500 flex items-center gap-1.5">
                <i className="ri-map-pin-line text-sm"></i>
                {room.location}
              </p>
            </div>
            <div className="flex items-center gap-4"></div>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-10">
            <div
              ref={scrollRef}
              className="flex gap-2 md:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar"
            >
              {room.images.map((img, i) => (
                <img
                  key={img}
                  src={img}
                  alt={`${room.name} - ${i + 1}`}
                  className="h-[320px] md:h-[540px] w-auto flex-shrink-0 object-contain bg-background-100 rounded-lg snap-start"
                />
              ))}
            </div>

            {room.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => scrollByAmount(-1)}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <i className="ri-arrow-left-s-line text-xl md:text-2xl"></i>
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount(1)}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <i className="ri-arrow-right-s-line text-xl md:text-2xl"></i>
                </button>
              </>
            )}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left - Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl text-foreground-900 mb-4">
                {t("intro")}
              </h2>
              <p className="text-foreground-600 leading-relaxed">
                {room.description}
              </p>

              <h3 className="font-heading text-xl text-foreground-900 mt-8 mb-4">
                {t("amenities")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 px-4 py-3 bg-background-100"
                  >
                    <i className={`${getAmenityIcon(amenity)} text-accent-600`}></i>
                    <span className="text-sm text-foreground-700">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="font-heading text-xl text-foreground-900 mt-8 mb-4">
                {t("bookingInfo")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-background-100">
                  <p className="text-xs text-foreground-500 mb-1">
                    {t("maxGuests")}
                  </p>
                  <p className="text-lg font-semibold text-foreground-800">
                    {room.maxGuests} {t("adults")}, 0 {t("children")}
                  </p>
                </div>
              </div>

              <NeedToKnow />
            </div>

            {/* Right - Booking Card */}
            <div>
              <div className="sticky top-28 p-6 bg-background-50 border border-background-200/50">
                <div className="mb-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-400 mb-3">
                    {t("pricingTitle")}
                  </p>
                  <div className="space-y-2.5">
                    {room.pricePerDay ? (
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-foreground-600">
                          {t("perDay")}
                        </span>
                        <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">
                          {formatPrice(room.pricePerDay)}
                        </span>
                      </div>
                    ) : null}
                    {room.pricePerNight ? (
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-foreground-600">
                          {t("perNight")}
                        </span>
                        <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">
                          {formatPrice(room.pricePerNight)}
                        </span>
                      </div>
                    ) : null}
                    {room.pricePerHour ? (
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-foreground-600">
                          {t("perHour")}
                        </span>
                        <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">
                          {formatPrice(room.pricePerHour)}
                        </span>
                      </div>
                    ) : null}
                    {room.pricePerNextHour ? (
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-foreground-600">
                          {t("perNextHour")}
                        </span>
                        <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">
                          {formatPrice(room.pricePerNextHour)}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 pt-3 border-t border-background-200/50 flex items-start gap-2">
                    <i className="ri-information-line text-xs text-accent-600 mt-0.5"></i>
                    <span className="text-xs text-foreground-500">
                      {t("weekendSurcharge")}
                    </span>
                  </div>
                </div>

                <ul className="mb-5 space-y-2.5">
                  <li className="flex items-center gap-2.5 text-sm text-foreground-700">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-user-line text-accent-600"></i>
                    </div>
                    <span>{t("bookingNote.maxGuests", { max: room.maxGuests })}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-foreground-700">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-id-card-line text-accent-600"></i>
                    </div>
                    <span>{t("bookingNote.idRequired")}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-foreground-700">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-forbid-2-line text-accent-600"></i>
                    </div>
                    <span>{t("bookingNote.noSmoking")}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-arrow-right-line text-accent-600"></i>
                    </div>
                    <a
                      href="#need-to-know"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("need-to-know")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-foreground-800 font-medium hover:text-primary-600 transition-colors cursor-pointer"
                    >
                      {t("bookingNote.viewConditions")}
                    </a>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={openBookingPopup}
                  className="block w-full text-center px-6 py-4 bg-[#F3EFE7] text-[#3A2A1E] border border-[#E0D6C8] text-sm font-semibold hover:bg-[#E7DDD0] active:bg-[#DDD0C1] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t("bookNow")}
                </button>

                <p className="mt-4 text-xs text-foreground-500 text-center">
                  {t("redirectNote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}