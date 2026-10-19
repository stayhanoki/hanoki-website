import { useState, useEffect, useCallback } from "react";
import {
  fetchGuideImageList,
  getCachedGuideImages,
  hasGuideSheetConfigured,
} from "@/utils/googleSheetStayGuide";

export interface UseGuideImageResult {
  image: string | null;
  images: string[];
  loading: boolean;
}

export function useGuideImage(sectionKey: string): UseGuideImageResult {
  const cached = getCachedGuideImages();
  const normalizedKey = sectionKey.toLowerCase().trim().replace(/\s+/g, " ");
  const initialImages = cached ? cached[normalizedKey] || [] : [];
  const [image, setImage] = useState<string | null>(initialImages[0] ?? null);
  const [images, setImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(
    hasGuideSheetConfigured() && initialImages.length === 0
  );

  const load = useCallback(async () => {
    if (!hasGuideSheetConfigured()) {
      setImage(null);
      setImages([]);
      setLoading(false);
      return;
    }
    try {
      const list = await fetchGuideImageList(sectionKey);
      setImages(list);
      setImage(list.length > 0 ? list[0] : null);
    } catch {
      // giữ nguyên ảnh hiện tại (cache) nếu tải lại lỗi
    } finally {
      setLoading(false);
    }
  }, [sectionKey]);

  useEffect(() => {
    load();
  }, [load]);

  return { image, images, loading };
}