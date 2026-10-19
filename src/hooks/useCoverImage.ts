import { useState, useEffect, useCallback } from "react";
import {
  fetchCoverImage,
  getCachedCoverImages,
  hasCoverSheetConfigured,
} from "@/utils/googleSheetCover";

export interface UseCoverImageResult {
  image: string | null;
  loading: boolean;
}

export function useCoverImage(pageKey: string): UseCoverImageResult {
  const initialCached = hasCoverSheetConfigured()
    ? getCachedCoverImages()?.[pageKey.toLowerCase().trim()] ?? null
    : null;
  const [image, setImage] = useState<string | null>(initialCached);
  const [loading, setLoading] = useState(
    hasCoverSheetConfigured() && !initialCached
  );

  const load = useCallback(async () => {
    if (!hasCoverSheetConfigured()) {
      setImage(null);
      setLoading(false);
      return;
    }
    if (!getCachedCoverImages()) {
      setLoading(true);
    }
    try {
      const url = await fetchCoverImage(pageKey);
      setImage(url);
    } catch {
      // giữ nguyên ảnh hiện tại (cache) nếu tải lại lỗi
    } finally {
      setLoading(false);
    }
  }, [pageKey]);

  useEffect(() => {
    load();
  }, [load]);

  return { image, loading };
}