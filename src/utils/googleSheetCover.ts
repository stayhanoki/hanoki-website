import { toDirectImageUrl } from "@/utils/driveImageUrl";

const SHEET_URL = import.meta.env.VITE_PUBLIC_GOOGLE_SHEET_COVER_URL;

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

let cachedCovers: Record<string, string> | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 3_600_000;
const STORAGE_KEY = "hanoki_covers_cache_v1";

function readLocalCache(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, string>) : null;
  } catch {
    return null;
  }
}

function writeLocalCache(covers: Record<string, string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(covers));
  } catch {
    // bỏ qua khi bộ nhớ đầy hoặc bị chặn
  }
}

/**
 * Trả về dữ liệu ảnh cover đã cache để hiện ngay mà không cần chờ tải.
 */
export function getCachedCoverImages(): Record<string, string> | null {
  if (cachedCovers) return cachedCovers;
  const fromSession = readLocalCache();
  if (fromSession) {
    cachedCovers = fromSession;
    return fromSession;
  }
  return null;
}

export function hasCoverSheetConfigured(): boolean {
  return !!SHEET_URL && SHEET_URL.length > 0;
}

/**
 * Đọc sheet "Ảnh cover" (một dòng duy nhất, mỗi cột là tên trang
 * chứa link ảnh). Trả về map: { rooms: "...", home: "...", about: "..." }
 */
export async function fetchCoverImages(): Promise<Record<string, string>> {
  if (cachedCovers && Date.now() - cacheTime < CACHE_TTL_MS) {
    return cachedCovers;
  }

  if (!SHEET_URL) {
    throw new Error(
      "Google Sheet Ảnh cover chưa được cấu hình. Vui lòng thêm VITE_PUBLIC_GOOGLE_SHEET_COVER_URL vào file .env"
    );
  }

  const res = await fetch(SHEET_URL);
  if (!res.ok) {
    throw new Error(`Không thể đọc Google Sheet Ảnh cover (status ${res.status})`);
  }

  const text = await res.text();
  const rows = parseCSV(text);

  const covers: Record<string, string> = {};
  if (rows.length > 0) {
    const firstRow = rows[0];
    Object.entries(firstRow).forEach(([key, value]) => {
      const url = (value || "").trim();
      if (url) covers[key.toLowerCase()] = toDirectImageUrl(url);
    });
  }

  cachedCovers = covers;
  cacheTime = Date.now();
  writeLocalCache(covers);
  return covers;
}

export async function fetchCoverImage(pageKey: string): Promise<string | null> {
  const covers = await fetchCoverImages();
  const key = pageKey.toLowerCase().trim();
  return covers[key] || null;
}

let preloadStarted = false;

/**
 * Tải sẵn dữ liệu ảnh cover ngay khi mở web (chạy ngầm, không chặn giao diện),
 * đồng thời nạp luôn ảnh vào bộ nhớ trình duyệt để khi chuyển trang, ảnh cover
 * hiện ngay lập tức mà không bị nhấp nháy ảnh dự phòng.
 */
export async function preloadCoverImages(): Promise<void> {
  if (!hasCoverSheetConfigured() || preloadStarted) return;
  preloadStarted = true;
  try {
    const covers = await fetchCoverImages();
    Object.values(covers).forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  } catch {
    // bỏ qua lỗi — các trang vẫn tự tải lại khi cần
  }
}