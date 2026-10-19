export function getAmenityIcon(amenity: string): string {
  const raw = amenity.trim().toLowerCase();

  const wifi = ["wifi", "wi-fi", "internet", "mạng"];
  if (wifi.some((k) => raw.includes(k))) return "ri-wifi-line";

  const kitchen = ["bếp", "nhà bếp", "kitchen", "cooking", "nấu ăn"];
  if (kitchen.some((k) => raw.includes(k))) return "ri-restaurant-line";

  const washing = ["máy giặt", "washing machine", "washer", "giặt"];
  if (washing.some((k) => raw.includes(k))) return "ri-t-shirt-line";

  const ac = ["điều hòa", "máy lạnh", "air conditioning", "ac", "air con", "lạnh"];
  if (ac.some((k) => raw.includes(k))) return "ri-snowflake-line";

  const parking = ["bãi đỗ xe", "parking", "đỗ xe", "chỗ đậu"];
  if (parking.some((k) => raw.includes(k))) return "ri-parking-box-line";

  const tv = ["tv", "television"];
  if (tv.some((k) => raw.includes(k))) return "ri-tv-line";

  const fireplace = ["lò sưởi", "fireplace", "sưởi"];
  if (fireplace.some((k) => raw.includes(k))) return "ri-fire-line";

  const balcony = ["ban công", "balcony", "terrace"];
  if (balcony.some((k) => raw.includes(k))) return "ri-layout-masonry-line";

  const garden = ["vườn riêng", "private garden", "vườn", "garden"];
  if (garden.some((k) => raw.includes(k))) return "ri-plant-line";

  const bathtub = ["bồn tắm", "bathtub", "tắm", "bath"];
  if (bathtub.some((k) => raw.includes(k))) return "ri-drop-line";

  const pool = ["hồ bơi", "swimming pool", "pool", "bể bơi"];
  if (pool.some((k) => raw.includes(k))) return "ri-water-flash-line";

  const bike = ["đạp xe", "bicycles", "bike", "xe đạp"];
  if (bike.some((k) => raw.includes(k))) return "ri-bike-line";

  const transfer = ["xe đưa đón", "airport transfer", "transfer", "đưa đón", "taxi", "shuttle"];
  if (transfer.some((k) => raw.includes(k))) return "ri-car-line";

  const pets = ["thú cưng", "pets", "pet"];
  if (pets.some((k) => raw.includes(k))) return "ri-heart-line";

  const breakfast = ["ăn sáng", "breakfast", "buffet"];
  if (breakfast.some((k) => raw.includes(k))) return "ri-cup-line";

  const gym = ["gym", "gymnasium", "thể dục", "fitness"];
  if (gym.some((k) => raw.includes(k))) return "ri-run-line";

  return "ri-check-line";
}