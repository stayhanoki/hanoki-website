export interface SheetBooking {
  booking_code: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  room_id: string;
  room_name: string;
  room_location: string;
  room_image: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests_count: number;
  price_per_night: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled";
  special_request: string;
  created_at: string;
}

const SHEET_URL = import.meta.env.VITE_PUBLIC_GOOGLE_SHEET_URL;

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
  const lines = text.split("\n").filter((l) => l.trim());
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

export function hasSheetConfigured(): boolean {
  return !!SHEET_URL && SHEET_URL.length > 0;
}

function normalizeBooking(row: Record<string, string>): SheetBooking {
  const get = (...keys: string[]) => {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== "") return row[k];
    }
    return "";
  };

  return {
    booking_code: get("booking_code", "mã booking", "ma booking", "code")
      .trim()
      .toUpperCase(),
    guest_name: get("guest_name", "tên khách", "ten khach", "name"),
    guest_email: get("guest_email", "email", "mail"),
    guest_phone: get("guest_phone", "sđt", "sdt", "phone", "điện thoại", "dien thoai"),
    room_id: get("room_id", "mã phòng", "ma phong"),
    room_name: get("room_name", "tên phòng", "ten phong", "phòng", "phong"),
    room_location: get("room_location", "địa điểm", "dia diem", "location"),
    room_image: get("room_image", "ảnh phòng", "anh phong", "image"),
    check_in: get("check_in", "check-in", "nhận phòng", "nhan phong", "ngày đến", "ngay den"),
    check_out: get("check_out", "check-out", "trả phòng", "tra phong", "ngày đi", "ngay di"),
    nights: Number(get("nights", "số đêm", "so dem", "đêm", "dem") || 0),
    guests_count: Number(get("guests_count", "số khách", "so khach", "khách", "khach") || 0),
    price_per_night: Number(get("price_per_night", "giá/đêm", "gia/dem", "giá", "gia") || 0),
    total_price: Number(get("total_price", "tổng tiền", "tong tien", "total") || 0),
    status: (get("status", "trạng thái", "trang thai") || "confirmed") as SheetBooking["status"],
    special_request: get("special_request", "yêu cầu", "yeu cau", "note", "notes"),
    created_at: get("created_at", "ngày tạo", "ngay tao", "date"),
  };
}

export async function fetchBookingsFromSheet(): Promise<SheetBooking[]> {
  if (!SHEET_URL) {
    throw new Error(
      "Google Sheet chưa được cấu hình. Vui lòng thêm VITE_PUBLIC_GOOGLE_SHEET_URL vào file .env"
    );
  }

  const res = await fetch(SHEET_URL);
  if (!res.ok) {
    throw new Error(`Không thể đọc Google Sheet (status ${res.status})`);
  }

  const text = await res.text();
  const rows = parseCSV(text);
  return rows.map(normalizeBooking);
}

export async function fetchBookingByCode(code: string): Promise<SheetBooking | null> {
  const bookings = await fetchBookingsFromSheet();
  return bookings.find((b) => b.booking_code === code.toUpperCase()) || null;
}