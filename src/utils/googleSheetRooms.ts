import type { Room } from "@/mocks/rooms";
import { toDirectImageUrl } from "@/utils/driveImageUrl";

const SHEET_URL = import.meta.env.VITE_PUBLIC_GOOGLE_SHEET_ROOMS_URL;

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values.map((v) => v.replace(/^"|"$/g, "").replace(/""/g, '"'));
}

function parseCSV(text: string): Record<string, string>[] {
  const cleaned = text.replace(/^\uFEFF/, "");
  const lines = cleaned.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());
  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return row;
  });
}

function getValue(row: Record<string, string>, ...keys: string[]): string {
  for (const k of keys) {
    const key = k.toLowerCase().trim();
    if (row[key] !== undefined && row[key] !== "") return row[key];
  }
  return "";
}

function parseBoolean(val: string): boolean {
  const v = val.trim().toLowerCase();
  if (!v) return true;
  if (
    v === "false" ||
    v === "không" ||
    v === "khong" ||
    v === "no" ||
    v === "0"
  ) {
    return false;
  }
  return true;
}

let cachedRooms: Partial<Room>[] | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 3_600_000;
const STORAGE_KEY = "hanoki_rooms_cache_v1";

function readLocalCache(): Partial<Room>[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Partial<Room>[]) : null;
  } catch {
    return null;
  }
}

function writeLocalCache(rooms: Partial<Room>[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  } catch {
    // bộ nhớ trình duyệt đầy hoặc bị chặn — bỏ qua, không ảnh hưởng chức năng
  }
}

/**
 * Trả về dữ liệu phòng đã cache (từ bộ nhớ trong phiên hoặc sessionStorage)
 * để hiện ngay mà không cần chờ tải. Trả về null nếu chưa từng tải.
 */
export function getCachedRooms(): Partial<Room>[] | null {
  if (cachedRooms) return cachedRooms;
  const fromSession = readLocalCache();
  if (fromSession) {
    cachedRooms = fromSession;
    return fromSession;
  }
  return null;
}

export function hasRoomsSheetConfigured(): boolean {
  return !!SHEET_URL && SHEET_URL.length > 0;
}

export async function fetchRoomsFromSheet(): Promise<Partial<Room>[]> {
  if (cachedRooms && Date.now() - cacheTime < CACHE_TTL_MS) {
    return cachedRooms;
  }

  if (!SHEET_URL) {
    throw new Error(
      "Google Sheet chưa được cấu hình. Vui lòng thêm VITE_PUBLIC_GOOGLE_SHEET_ROOMS_URL vào file .env"
    );
  }

  const res = await fetch(SHEET_URL);
  if (!res.ok) {
    throw new Error(`Không thể đọc Google Sheet (status ${res.status})`);
  }

  const text = await res.text();
  const rows = parseCSV(text);

  const result = rows.map((row) => ({
    id: getValue(row, "id", "mã phòng", "ma phong")
      .trim()
      .toLowerCase(),
    name: getValue(row, "tên phòng", "ten phong", "name"),
    location: getValue(row, "địa điểm", "dia diem", "location"),
    pricePerNight: Number(
      getValue(
        row,
        "giá/đêm",
        "gia/dem",
        "giá",
        "gia",
        "price",
        "price_per_night",
        "pricepernight"
      ) || 0
    ),
    pricePerDay: Number(
      getValue(
        row,
        "giá/ngày",
        "gia/ngay",
        "giá ngày",
        "gia ngay",
        "price_per_day",
        "priceperday"
      ) || 0
    ),
    pricePerHour: Number(
      getValue(
        row,
        "giá 2 giờ",
        "gia 2 gio",
        "giá combo 2 giờ",
        "gia combo 2 gio",
        "price_2_hours",
        "price_two_hours",
        "giá/giờ",
        "gia/gio",
        "giá/giơ",
        "price_per_hour",
        "priceperhour"
      ) || 0
    ),
    pricePerNextHour: Number(
      getValue(
        row,
        "giá giờ tiếp theo",
        "gia gio tiep theo",
        "giá giờ tiếp",
        "gia gio tiep",
        "price_per_next_hour",
        "pricepernexthour"
      ) || 0
    ),
    description: getValue(row, "mô tả", "mo ta", "description"),
    amenities: getValue(row, "tiện nghi", "tien nghi", "amenities", "amenity")
      .split(/,|;/)
      .map((s) => s.trim())
      .filter(Boolean),
    maxGuests: Number(
      getValue(
        row,
        "số khách",
        "so khach",
        "khách",
        "khach",
        "max_guests",
        "maxguests",
        "guests"
      ) || 0
    ),
    images: getValue(row, "ảnh", "anh", "hình ảnh", "hinh anh", "image", "images", "Ảnh phòng", "ảnh phòng")
      .split(/,|;/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((url) => toDirectImageUrl(url, "w1200")),
    nameEn: getValue(row, "tên phòng en", "ten phong en", "name en", "name_en", "nameen"),
    locationEn: getValue(row, "địa điểm en", "dia diem en", "location en", "location_en"),
    descriptionEn: getValue(row, "mô tả en", "mo ta en", "description en", "description_en"),
    amenitiesEn: getValue(
      row,
      "tiện nghi en",
      "tien nghi en",
      "amenities en",
      "amenity en",
      "amenities_en",
      "amenitiesen"
    )
      .split(/,|;/)
      .map((s) => s.trim())
      .filter(Boolean),
    available: parseBoolean(
      getValue(
        row,
        "còn trống",
        "con trong",
        "trống",
        "trong",
        "available",
        "status"
      )
    ),
    category: getValue(
      row,
      "hạng mục",
      "hang muc",
      "category",
      "type",
      "loại"
    ),
  }));

  cachedRooms = result;
  cacheTime = Date.now();
  writeLocalCache(result);
  return result;
}

let preloadStarted = false;

/**
 * Tải sẵn dữ liệu phòng và nạp luôn ảnh vào bộ nhớ trình duyệt ngay khi mở web,
 * để khi vào trang chi tiết phòng, ảnh hiện ngay mà không bị nhấp nháy.
 */
export async function preloadRoomsImages(): Promise<void> {
  if (!hasRoomsSheetConfigured() || preloadStarted) return;
  preloadStarted = true;
  try {
    const rooms = await fetchRoomsFromSheet();
    rooms.forEach((room) => {
      (room.images || []).forEach((url) => {
        if (!url) return;
        const img = new Image();
        img.src = url;
      });
    });
  } catch {
    // bỏ qua lỗi — các trang vẫn tự tải lại khi cần
  }
}