export interface Room {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  pricePerDay?: number;
  pricePerHour?: number;
  pricePerNextHour?: number;
  description: string;
  images: string[];
  amenities: string[];
  maxGuests: number;
  rating: number;
  reviewsCount: number;
  available: boolean;
  category: string;
  nameEn?: string;
  locationEn?: string;
  descriptionEn?: string;
  amenitiesEn?: string[];
}

export const rooms: Room[] = [
  {
    id: "ha",
    name: "Phòng Ha",
    location: "Tam Đảo, Vĩnh Phúc",
    pricePerNight: 1200000,
    pricePerDay: 1400000,
    pricePerHour: 150000,
    pricePerNextHour: 80000,
    description: "Phòng Ha mang hơi thở của núi rừng Tam Đảo, nơi sương mù buông xuống như những dải lụa mỏng mỗi sớm mai. Thiết kế giao thoa giữa kiến trúc hiện đại và hơi thở bản địa, mỗi góc nhỏ đều là một tác phẩm nghệ thuật sống động.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20bedroom%20interior%20with%20mountain%20view%20through%20floor%20to%20ceiling%20window%2C%20natural%20wood%20bed%20frame%20with%20linen%20bedding%2C%20warm%20ambient%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20ceramic%20vase%20with%20dried%20flowers%2C%20minimal%20Japanese%20aesthetic%2C%20editorial%20interior%20photography%20with%20soft%20shadows&width=600&height=800&seq=hanoki-ha-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20bathroom%20with%20natural%20stone%20bathtub%20and%20wooden%20vanity%2C%20warm%20wood%20accents%2C%20soft%20diffused%20light%2C%20earthy%20brown%20and%20cream%20color%20palette%2C%20organic%20cotton%20towels%2C%20minimal%20spa%20aesthetic%2C%20editorial%20interior%20photography&width=600&height=400&seq=hanoki-ha-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Máy giặt", "Điều hòa", "Bãi đỗ xe", "TV"],
    maxGuests: 2,
    rating: 4.8,
    reviewsCount: 128,
    available: true,
    category: "Boutique Hotel",
  },
  {
    id: "no",
    name: "Phòng No",
    location: "Ba Vì, Hà Nội",
    pricePerNight: 950000,
    pricePerDay: 1100000,
    pricePerHour: 120000,
    pricePerNextHour: 65000,
    description: "Phòng No ẩn mình giữa rừng cọ xanh thẳm của Ba Vì, là lời tỏ tình với thiên nhiên hoang dã. Căn nhà gỗ mái tranh truyền thống hòa mình vào cảnh quan núi rừng hùng vĩ, nơi tiếng chim hót đánh thức bạn mỗi bình minh.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20wooden%20cabin%20interior%20with%20large%20window%20overlooking%20green%20forest%2C%20natural%20materials%2C%20woven%20rattan%20chair%2C%20warm%20ambient%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20minimal%20Japanese%20aesthetic%2C%20cozy%20fireplace%20corner%2C%20editorial%20interior%20photography&width=600&height=800&seq=hanoki-no-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20living%20space%20with%20bamboo%20furniture%20and%20handwoven%20textiles%2C%20natural%20light%20through%20window%2C%20warm%20earthy%20brown%20and%20cream%20palette%2C%20stone%20accent%20wall%2C%20minimal%20rustic%20aesthetic%2C%20editorial%20interior%20photography&width=600&height=400&seq=hanoki-no-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Ban công", "Lò sưởi", "Vườn riêng", "Đạp xe"],
    maxGuests: 2,
    rating: 4.9,
    reviewsCount: 86,
    available: true,
    category: "Ecolodge",
  },
  {
    id: "ki",
    name: "Phòng Ki",
    location: "Đà Lạt, Lâm Đồng",
    pricePerNight: 850000,
    pricePerDay: 980000,
    pricePerHour: 110000,
    pricePerNextHour: 60000,
    description: "Phòng Ki là căn hộ ấm cúng trên đồi Langbiang, nơi mây luôn vờn quanh cửa sổ mỗi sáng. Thiết kế Scandinavian tối giản với những mảng màu ấm áp, tạo nên không gian sống động và thư giãn.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20apartment%20bedroom%20with%20mountain%20view%2C%20minimal%20Scandinavian%20design%2C%20warm%20wood%20tones%2C%20soft%20linen%20textiles%2C%20potted%20green%20plant%2C%20earthy%20brown%20and%20cream%20tones%2C%20morning%20fog%20through%20window%2C%20editorial%20interior%20photography&width=600&height=800&seq=hanoki-ki-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20kitchen%20with%20natural%20wood%20cabinets%2C%20ceramic%20dishes%2C%20soft%20natural%20light%2C%20minimal%20design%2C%20warm%20earthy%20brown%20and%20cream%20palette%2C%20small%20coffee%20corner%20with%20ceramic%20cups%2C%20editorial%20interior%20photography&width=600&height=400&seq=hanoki-ki-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Máy giặt", "Điều hòa", "Bãi đỗ xe", "Lò sưởi"],
    maxGuests: 2,
    rating: 4.7,
    reviewsCount: 95,
    available: true,
    category: "Căn hộ",
  },
  {
    id: "yu",
    name: "Phòng Yu",
    location: "Sa Pa, Lào Cai",
    pricePerNight: 1500000,
    pricePerDay: 1750000,
    pricePerHour: 180000,
    pricePerNextHour: 90000,
    description: "Phòng Yu nép mình trên sườn núi Sa Pa, nơi những thửa ruộng bậc thang trải dài tít tắp đến tận chân trời. Kiến trúc gỗ truyền thống kết hợp nội thất hiện đại, mang đến trải nghiệm nghỉ dưỡng sang trọng giữa đại ngàn Tây Bắc.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20luxury%20bedroom%20with%20panoramic%20mountain%20view%2C%20wooden%20interior%2C%20floor%20to%20ceiling%20windows%2C%20natural%20linen%20bedding%2C%20warm%20ambient%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20minimal%20Japanese%20aesthetic%2C%20editorial%20interior%20photography&width=600&height=800&seq=hanoki-yu-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20wooden%20terrace%20with%20woven%20rattan%20seating%20overlooking%20misty%20mountains%2C%20natural%20materials%2C%20warm%20golden%20hour%20light%2C%20earthy%20brown%20and%20cream%20tones%2C%20minimal%20outdoor%20design%2C%20editorial%20photography&width=600&height=400&seq=hanoki-yu-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Điều hòa", "Lò sưởi", "Bồn tắm", "Ban công"],
    maxGuests: 3,
    rating: 4.9,
    reviewsCount: 67,
    available: false,
    category: "Boutique Hotel",
  },
  {
    id: "sei",
    name: "Phòng Sei",
    location: "Hội An, Quảng Nam",
    pricePerNight: 1100000,
    pricePerDay: 1300000,
    pricePerHour: 140000,
    pricePerNextHour: 75000,
    description: "Phòng Sei nằm khuất trong con ngõ nhỏ phố cổ Hội An, nơi thời gian như ngừng trôi. Căn nhà gỗ trăm tuổi được phục dựng tỉ mỉ, giữ trọn vẹn hồn xưa với mái ngói âm dương, sân trong và giếng trời đầy ánh sáng.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20heritage%20house%20interior%20with%20wooden%20beams%20and%20natural%20light%2C%20antique%20wooden%20furniture%2C%20silk%20textile%20accents%2C%20warm%20ambient%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20peaceful%20atmosphere%2C%20editorial%20interior%20photography&width=600&height=800&seq=hanoki-sei-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20courtyard%20with%20hanging%20paper%20lantern%2C%20small%20zen%20garden%2C%20stone%20pathway%2C%20natural%20wooden%20doors%2C%20warm%20diffused%20sunlight%2C%20earthy%20brown%20and%20cream%20tones%2C%20minimal%20serene%20atmosphere%2C%20editorial%20photography&width=600&height=400&seq=hanoki-sei-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Điều hòa", "Bãi đỗ xe", "TV", "Bồn tắm"],
    maxGuests: 2,
    rating: 4.8,
    reviewsCount: 112,
    available: false,
    category: "Căn hộ",
  },
  {
    id: "hachi",
    name: "Phòng Hachi",
    location: "Phú Quốc, Kiên Giang",
    pricePerNight: 1800000,
    pricePerDay: 2100000,
    pricePerHour: 220000,
    pricePerNextHour: 110000,
    description: "Phòng Hachi mở ra trước biển xanh Phú Quốc, nơi bạn có thể bước chân trần từ giường thẳng ra bãi cát trắng mịn. Biệt thự gỗ thiết kế mở với hồ bơi riêng, mỗi sáng thức dậy là một bức tranh biển trời tuyệt mỹ.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20beachfront%20bedroom%20with%20ocean%20view%2C%20natural%20wood%20architecture%2C%20white%20linen%20bedding%2C%20minimal%20open%20design%2C%20warm%20ambient%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20tropical%20plant%20accent%2C%20editorial%20interior%20photography&width=600&height=800&seq=hanoki-hachi-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20wooden%20deck%20with%20natural%20furniture%20overlooking%20calm%20ocean%2C%20warm%20sunset%20light%2C%20minimal%20outdoor%20seating%2C%20earthy%20brown%20and%20cream%20tones%2C%20bamboo%20roof%20structure%2C%20editorial%20photography&width=600&height=400&seq=hanoki-hachi-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Điều hòa", "Bãi đỗ xe", "Bồn tắm", "Hồ bơi", "Vườn riêng"],
    maxGuests: 4,
    rating: 4.9,
    reviewsCount: 143,
    available: false,
    category: "Boutique Hotel",
  },
  {
    id: "nana",
    name: "Phòng Nana",
    location: "Mộc Châu, Sơn La",
    pricePerNight: 750000,
    pricePerDay: 880000,
    pricePerHour: 100000,
    pricePerNextHour: 55000,
    description: "Phòng Nana là căn nhà gỗ nhỏ giữa đồi chè xanh ngát Mộc Châu. Thiết kế tối giản ấm cúng với cửa sổ lớn hướng ra đồi chè bát ngát, nơi bạn có thể thưởng thức tách trà nóng và lắng nghe tiếng gió thì thầm qua hàng thông.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20small%20wooden%20cottage%20interior%20with%20large%20window%20overlooking%20green%20hills%2C%20minimal%20design%2C%20warm%20textiles%2C%20natural%20wood%20furniture%2C%20morning%20fog%2C%20earthy%20brown%20and%20cream%20tones%2C%20peaceful%20rural%20atmosphere%2C%20editorial%20interior%20photography&width=600&height=800&seq=hanoki-nana-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20wooden%20cottage%20exterior%20on%20green%20hillside%2C%20flower%20garden%2C%20natural%20wood%20porch%20with%20woven%20chair%2C%20misty%20morning%2C%20earthy%20brown%20and%20cream%20tones%2C%20minimal%20countryside%20aesthetic%2C%20editorial%20photography&width=600&height=400&seq=hanoki-nana-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Lò sưởi", "Ban công", "Vườn riêng", "Đạp xe"],
    maxGuests: 2,
    rating: 4.6,
    reviewsCount: 54,
    available: false,
    category: "Ecolodge",
  },
  {
    id: "kyuu",
    name: "Phòng Kyuu",
    location: "Ninh Bình, Ninh Bình",
    pricePerNight: 980000,
    pricePerDay: 1150000,
    pricePerHour: 125000,
    pricePerNextHour: 70000,
    description: "Phòng Kyuu nằm giữa quần thể núi đá vôi kỳ vĩ của Ninh Bình, tựa như bức tranh sơn thủy hữu tình. Căn nhà gỗ ven đầm sen với ban công hướng ra dãy núi, mỗi chiều hoàng hôn là một khoảnh khắc không thể nào quên.",
    images: [
      "https://readdy.ai/api/search-image?query=Japandi%20style%20luxury%20bungalow%20bedroom%20with%20mountain%20view%2C%20natural%20wood%20interior%2C%20large%20windows%2C%20warm%20sunset%20lighting%2C%20earthy%20brown%20and%20cream%20tones%2C%20minimal%20Japanese%20rustic%20design%2C%20natural%20linen%20bedding%2C%20editorial%20interior%20photography&width=600&height=800&seq=hanoki-kyuu-01-v2&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Japandi%20style%20wooden%20bungalow%20exterior%20surrounded%20by%20calm%20water%20and%20mountains%2C%20warm%20golden%20hour%20light%2C%20natural%20bamboo%20fence%2C%20earthy%20brown%20and%20cream%20tones%2C%20minimal%20peaceful%20landscape%2C%20editorial%20photography&width=600&height=400&seq=hanoki-kyuu-02-v2&orientation=landscape",
    ],
    amenities: ["WiFi", "Bếp", "Điều hòa", "Bãi đỗ xe", "TV", "Ban công", "Xe đưa đón"],
    maxGuests: 3,
    rating: 4.7,
    reviewsCount: 78,
    available: false,
    category: "Ecolodge",
  },
];

export const categories = [
  { id: "all", name: "Tất cả", icon: "ri-home-line" },
  { id: "Boutique Hotel", name: "Boutique Hotel", icon: "ri-hotel-line" },
  { id: "Ecolodge", name: "Ecolodge", icon: "ri-plant-line" },
  { id: "Căn hộ", name: "Căn hộ", icon: "ri-building-line" },
];

export const allAmenities = [
  "WiFi",
  "Bếp",
  "Điều hòa",
  "Bãi đỗ xe",
  "TV",
  "Máy giặt",
  "Lò sưởi",
  "Ban công",
  "Vườn riêng",
  "Bồn tắm",
  "Hồ bơi",
  "Đạp xe",
  "Xe đưa đón",
];

export const guestCapacityOptions = [
  { value: 0, label: "Tất cả" },
  { value: 1, label: "1 khách" },
  { value: 2, label: "2 khách" },
  { value: 3, label: "3 khách" },
  { value: 4, label: "4+ khách" },
];

export const roomsEnMap: Record<string, { name: string; location: string; description: string; amenities: string[] }> = {
  ha: {
    name: "Ha Room",
    location: "Tam Dao, Vinh Phuc",
    description:
      "The Ha Room captures the spirit of Tam Dao's mountains and forests, where morning mist drifts down like thin silk ribbons each dawn. The design blends modern architecture with indigenous essence — every corner is a living work of art.",
    amenities: ["WiFi", "Kitchen", "Washing machine", "Air conditioning", "Parking", "TV"],
  },
  no: {
    name: "No Room",
    location: "Ba Vi, Hanoi",
    description:
      "The No Room hides among the deep green palm forests of Ba Vi, a love letter to wild nature. A traditional thatched-roof wooden house merges into the majestic mountain landscape, where birdsong wakes you every dawn.",
    amenities: ["WiFi", "Kitchen", "Balcony", "Fireplace", "Private garden", "Bicycles"],
  },
  ki: {
    name: "Ki Room",
    location: "Da Lat, Lam Dong",
    description:
      "The Ki Room is a cozy apartment on Langbiang Hill, where clouds always linger around the window each morning. Minimalist Scandinavian design with warm color palettes creates a lively and relaxing space.",
    amenities: ["WiFi", "Kitchen", "Washing machine", "Air conditioning", "Parking", "Fireplace"],
  },
  yu: {
    name: "Yu Room",
    location: "Sapa, Lao Cai",
    description:
      "The Yu Room nestles on the slopes of Sapa, where terraced rice fields stretch endlessly to the horizon. Traditional wooden architecture meets modern interiors, offering a luxurious retreat amid the vast Northwest wilderness.",
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Fireplace", "Bathtub", "Balcony"],
  },
  sei: {
    name: "Sei Room",
    location: "Hoi An, Quang Nam",
    description:
      "The Sei Room is tucked away in a small alley of Hoi An Ancient Town, where time seems to stand still. A century-old wooden house meticulously restored, preserving its old soul with yin-yang tile roofs, inner courtyards, and skylights full of natural light.",
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Parking", "TV", "Bathtub"],
  },
  hachi: {
    name: "Hachi Room",
    location: "Phu Quoc, Kien Giang",
    description:
      "The Hachi Room opens up to the blue sea of Phu Quoc, where you can step barefoot from bed straight onto soft white sand. An open-concept wooden villa with a private pool — every morning is a masterpiece of sea and sky.",
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Parking", "Bathtub", "Swimming pool", "Private garden"],
  },
  nana: {
    name: "Nana Room",
    location: "Moc Chau, Son La",
    description:
      "The Nana Room is a small wooden house amidst the lush green tea hills of Moc Chau. Minimalist and cozy design with large windows facing the endless tea slopes — enjoy a hot cup of tea while listening to the wind whispering through the pine trees.",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Balcony", "Private garden", "Bicycles"],
  },
  kyuu: {
    name: "Kyuu Room",
    location: "Ninh Binh, Ninh Binh",
    description:
      "The Kyuu Room sits amidst the magnificent limestone mountain complex of Ninh Binh, like a living landscape painting. A wooden house by the lotus pond with a balcony facing the mountain range — every sunset is an unforgettable moment.",
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Parking", "TV", "Balcony", "Airport transfer"],
  },
};

export const categoriesEn = [
  { id: "all", name: "All", icon: "ri-home-line" },
  { id: "Boutique Hotel", name: "Boutique Hotel", icon: "ri-hotel-line" },
  { id: "Ecolodge", name: "Ecolodge", icon: "ri-plant-line" },
  { id: "Căn hộ", name: "Apartment", icon: "ri-building-line" },
];

export const allAmenitiesEn = [
  "WiFi",
  "Kitchen",
  "Air conditioning",
  "Parking",
  "TV",
  "Washing machine",
  "Fireplace",
  "Balcony",
  "Private garden",
  "Bathtub",
  "Swimming pool",
  "Bicycles",
  "Airport transfer",
];