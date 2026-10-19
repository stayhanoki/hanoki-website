import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import HeroSection from "./components/HeroSection";
import FeaturedRooms from "./components/FeaturedRooms";
import CTASection from "./components/CTASection";
import JsonLd from "@/components/base/JsonLd";
import {
  getSiteUrl,
  HANOKI_LOGO,
  HERO_IMAGE,
  HANOKI_ADDRESS,
  HANOKI_CONTACT,
  OPENING_HOURS,
} from "@/utils/seo";

export default function Home() {
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-background-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LodgingBusiness",
              name: "HANOKI Homestay & Cafe",
              description:
                "Ở HANOKI, thời gian trôi chậm hơn để bạn có thể tận hưởng trọn vẹn từng khoảnh khắc. Homestay boutique tại Việt Nam với thiết kế Japandi ấm cúng tại Tam Đảo, Sapa, Đà Lạt, Hội An, Phú Quốc.",
              url: siteUrl || undefined,
              logo: HANOKI_LOGO,
              image: HERO_IMAGE,
              ...HANOKI_CONTACT,
              address: HANOKI_ADDRESS,
              priceRange: "₫₫",
              openingHoursSpecification: OPENING_HOURS,
            },
            {
              "@type": "WebSite",
              name: "HANOKI Homestay & Cafe",
              url: siteUrl || undefined,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl || ""}/rooms?search={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedRooms />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}