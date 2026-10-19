import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import JsonLd from "@/components/base/JsonLd";
import { getSiteUrl } from "@/utils/seo";
import HeroSection from "./components/HeroSection";
import QuickInfo from "./components/QuickInfo";
import BeforeArrival from "./components/BeforeArrival";
import Amenities from "./components/Amenities";
import SharedSpaces from "./components/SharedSpaces";
import HouseRules from "./components/HouseRules";
import Checkout from "./components/Checkout";
import Neighborhood from "./components/Neighborhood";
import Faq from "./components/Faq";

export default function StayGuidePage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-background-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cẩm nang lưu trú HANOKI",
          description:
            "Hướng dẫn lưu trú tại HANOKI Homestay & Cafe – thông tin nhận phòng, nội quy, tiện nghi và câu hỏi thường gặp.",
          url: siteUrl ? `${siteUrl}/stay-guide` : undefined,
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <QuickInfo />
        <BeforeArrival />
        <Amenities />
        <SharedSpaces />
        <HouseRules />
        <Checkout />
        <Neighborhood />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}