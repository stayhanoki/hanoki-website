import { useTranslation } from "react-i18next";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import JsonLd from "@/components/base/JsonLd";
import {
  getSiteUrl,
  HANOKI_LOGO,
  HANOKI_ADDRESS,
  HANOKI_CONTACT,
  OPENING_HOURS,
} from "@/utils/seo";

export default function Contact() {
  const { t } = useTranslation("contact");
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-background-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              name: "Liên hệ HANOKI",
              description:
                "Liên hệ với HANOKI Homestay & Cafe để đặt phòng và nhận tư vấn.",
              url: siteUrl ? `${siteUrl}/contact` : undefined,
            },
            {
              "@type": "Organization",
              name: "HANOKI Homestay & Cafe",
              logo: HANOKI_LOGO,
              ...HANOKI_CONTACT,
              address: HANOKI_ADDRESS,
              openingHoursSpecification: OPENING_HOURS,
            },
          ],
        }}
      />
      <Navbar />
      <div className="pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-secondary-700 font-medium tracking-wide uppercase mb-3">
            {t("tagline")}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground-900 leading-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-foreground-500 mb-10 max-w-lg">
            {t("description")}
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-100 flex-shrink-0">
                <i className="ri-mail-line text-accent-700"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-800">
                  {t("email")}
                </p>
                <p className="text-sm text-foreground-500">
                  stayhanoki@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 flex-shrink-0">
                <i className="ri-phone-line text-primary-700"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-800">
                  {t("phoneZalo")}
                </p>
                <p className="text-sm text-foreground-500">
                  +84 365 205 396
                </p>
                <p className="text-sm text-foreground-500">
                  +84 866 380 872
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-100 flex-shrink-0">
                <i className="ri-whatsapp-line text-secondary-700"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-800">
                  {t("whatsapp")}
                </p>
                <p className="text-sm text-foreground-500">
                  +84 365 205 396
                </p>
                <p className="text-sm text-foreground-500">
                  +84 866 380 872
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3A2A1E] flex-shrink-0">
                <i className="ri-map-pin-line text-[#F3EFE7]"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-800">
                  {t("address")}
                </p>
                <p className="text-sm text-foreground-500">
                  {t("addressValue")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-heading text-lg md:text-xl text-foreground-900 mb-4">
              {t("socialTitle")}
            </h2>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/hanoki.stay/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-700 hover:bg-secondary-600 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-facebook-line text-lg"></i>
              </a>
              <a
                href="https://www.tiktok.com/@hanoki.stay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 hover:bg-accent-600 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-tiktok-line text-lg"></i>
              </a>
            </div>
          </div>

          <div className="mt-10 aspect-[4/3] rounded-2xl overflow-hidden bg-background-200">
            <iframe
              src="https://maps.google.com/maps?q=162+Tri%E1%BB%87u+Vi%E1%BB%87t+V%C6%B0%C6%A1ng+Hai+B%C3%A0+Tr%C6%B0ng+H%C3%A0+N%E1%BB%99i&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HANOKI Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}