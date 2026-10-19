import { toDirectImageUrl } from "@/utils/driveImageUrl";

const SHEET_URL = import.meta.env.VITE_PUBLIC_GOOGLE_SHEET_GUIDE_URL;

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

function normalizeKey(key: string): string {
  return key.toLowerCase().trim().replace(/\s+/g, " ");
}

let cachedImages: Record<string, string[]> | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 3_600_000;
const STORAGE_KEY = "hanoki_guide_images_cache_v1";

function readLocalCache(): Record<string, string[]> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, string[]>) : null;
  } catch {
    return null;
  }
}

function writeLocalCache(images: Record<string, string[]>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch {
    // bỏ qua khi bộ nhớ đầy hoặc bị chặn
  }
}

export function getCachedGuideImages(): Record<string, string[]> | null {
  if (cachedImages) return cachedImages;
  const fromSession = readLocalCache();
  if (fromSession) {
    cachedImages = fromSession;
    return fromSession;
  }
  return null;
}

export function hasGuideSheetConfigured(): boolean {
  return !!SHEET_URL && SHEET_URL.length > 0;
}

export async function fetchGuideImages(): Promise<Record<string, string[]>> {
  if (cachedImages && Date.now() - cacheTime < CACHE_TTL_MS) {
    return cachedImages;
  }

  if (!SHEET_URL) {
    throw new Error(
      "Google Sheet Ảnh cẩm nang chưa được cấu hình. Vui lòng thêm VITE_PUBLIC_GOOGLE_SHEET_GUIDE_URL vào file .env"
    );
  }

  const res = await fetch(SHEET_URL);
  if (!res.ok) {
    throw new Error(`Không thể đọc Google Sheet Ảnh cẩm nang (status ${res.status})`);
  }

  const text = await res.text();
  const rows = parseCSV(text);

  const images: Record<string, string[]> = {};
  if (rows.length > 0) {
    const firstRow = rows[0];
    Object.entries(firstRow).forEach(([key, value]) => {
      const raw = (value || "").trim();
      if (!raw) return;
      const urls = raw
        .split(/,|;/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((url) => toDirectImageUrl(url, "w1200"));
      if (urls.length > 0) {
        images[normalizeKey(key)] = urls;
      }
    });
  }

  cachedImages = images;
  cacheTime = Date.now();
  writeLocalCache(images);
  return images;
}

export async function fetchGuideImage(sectionKey: string): Promise<string | null> {
  const images = await fetchGuideImages();
  const normalized = normalizeKey(sectionKey);
  const list = images[normalized];
  return list && list.length > 0 ? list[0] : null;
}

export async function fetchGuideImageList(sectionKey: string): Promise<string[]> {
  const images = await fetchGuideImages();
  const normalized = normalizeKey(sectionKey);
  return images[normalized] || [];
}

let preloadStarted = false;

export async function preloadGuideImages(): Promise<void> {
  if (!hasGuideSheetConfigured() || preloadStarted) return;
  preloadStarted = true;
  try {
    const images = await fetchGuideImages();
    Object.values(images).forEach((list) => {
      list.forEach((url) => {
        if (!url) return;
        const img = new Image();
        img.src = url;
      });
    });
  } catch {
    // bỏ qua lỗi
  }
}