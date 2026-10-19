export const SITE_NAME = "HANOKI Homestay & Cafe";

export const getSiteUrl = (): string => {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined;
  if (!raw) return "";
  return raw.replace(/\/$/, "");
};

export const HANOKI_LOGO =
  "https://storage.readdy-site.link/project_files/2bca2a75-b0f8-4945-8d11-e66de6960d4a/0bccfa1a-7880-4ca9-ad6b-b50fec8c91a3_compressed_Logo-Hanoki.ai.webp";

export const HERO_IMAGE =
  "https://readdy.ai/api/search-image?query=Japandi%20interior%20design%20with%20warm%20ambient%20lighting%2C%20hanging%20paper%20lantern%2C%20large%20ceramic%20planter%20with%20green%20plant%2C%20wooden%20shoji%20sliding%20doors%2C%20soft%20golden%20sunlight%20casting%20shadows%20on%20textured%20wall%2C%20minimal%20Japanese%20aesthetic%2C%20dark%20moody%20atmosphere%2C%20editorial%20interior%20photography%2C%20earthy%20brown%20and%20cream%20tones%2C%20wide%20angle%20shot&width=1600&height=900&seq=hero-bg-full-v3&orientation=landscape";

export const HANOKI_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "162 Triệu Việt Vương",
  addressLocality: "Hà Nội",
  addressRegion: "Hai Bà Trưng",
  addressCountry: "VN",
};

export const HANOKI_CONTACT = {
  telephone: ["+84365205396", "+84866380872"],
  email: "stayhanoki@gmail.com",
};

export const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  opens: "00:00",
  closes: "23:59",
};