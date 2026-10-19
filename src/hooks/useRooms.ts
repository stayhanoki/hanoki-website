import { useState, useEffect, useMemo, useCallback } from "react";
import { rooms as mockRooms, roomsEnMap, type Room } from "@/mocks/rooms";
import {
  fetchRoomsFromSheet,
  getCachedRooms,
  hasRoomsSheetConfigured,
} from "@/utils/googleSheetRooms";

const DEFAULT_IMAGE =
  "https://readdy.ai/api/search-image?query=Minimal%20modern%20hotel%20room%20interior%20with%20warm%20natural%20light%2C%20soft%20neutral%20tones%2C%20clean%20aesthetic%2C%20editorial%20interior%20photography%2C%20empty%20room%20with%20bed%20and%20window&width=600&height=400&seq=default-room-01&orientation=landscape";

function mergeWithMock(sheetRooms: Partial<Room>[]): Room[] {
  return sheetRooms.map((sr) => {
    const mock = mockRooms.find((m) => m.id === sr.id);

    const mergedFields: Partial<Room> = {};
    if (sr.name) mergedFields.name = sr.name;
    if (sr.location) mergedFields.location = sr.location;
    if (sr.pricePerNight && sr.pricePerNight > 0)
      mergedFields.pricePerNight = sr.pricePerNight;
    if (sr.pricePerHour && sr.pricePerHour > 0)
      mergedFields.pricePerHour = sr.pricePerHour;
    if (sr.pricePerDay && sr.pricePerDay > 0)
      mergedFields.pricePerDay = sr.pricePerDay;
    if (sr.pricePerNextHour && sr.pricePerNextHour > 0)
      mergedFields.pricePerNextHour = sr.pricePerNextHour;
    if (sr.description) mergedFields.description = sr.description;
    if (sr.amenities && sr.amenities.length > 0)
      mergedFields.amenities = sr.amenities;
    if (sr.maxGuests && sr.maxGuests > 0) mergedFields.maxGuests = sr.maxGuests;
    if (sr.category) mergedFields.category = sr.category;
    if (sr.images && sr.images.length > 0)
      mergedFields.images = sr.images;
    if (sr.available !== undefined) mergedFields.available = sr.available;
    if (sr.nameEn) mergedFields.nameEn = sr.nameEn;
    if (sr.locationEn) mergedFields.locationEn = sr.locationEn;
    if (sr.descriptionEn) mergedFields.descriptionEn = sr.descriptionEn;
    if (sr.amenitiesEn && sr.amenitiesEn.length > 0)
      mergedFields.amenitiesEn = sr.amenitiesEn;

    if (mock) {
      return {
        ...mock,
        ...mergedFields,
        images: (mergedFields.images && mergedFields.images.length > 0)
          ? mergedFields.images
          : mock.images,
        rating: mock.rating,
        reviewsCount: mock.reviewsCount,
      } as Room;
    }

    return {
      id: sr.id || "",
      name: sr.name || "",
      location: sr.location || "",
      pricePerNight: sr.pricePerNight || 0,
      pricePerDay: sr.pricePerDay,
      pricePerHour: sr.pricePerHour || 0,
      pricePerNextHour: sr.pricePerNextHour,
      description: sr.description || "",
      images: [DEFAULT_IMAGE],
      amenities: sr.amenities || [],
      maxGuests: sr.maxGuests || 2,
      rating: 4.8,
      reviewsCount: 0,
      available: sr.available !== false,
      category: sr.category || "Boutique Hotel",
      nameEn: sr.nameEn,
      locationEn: sr.locationEn,
      descriptionEn: sr.descriptionEn,
      amenitiesEn: sr.amenitiesEn,
    } as Room;
  });
}

function applyLocalization(roomsList: Room[], lang?: string): Room[] {
  if (!lang?.startsWith("en")) return roomsList;
  return roomsList.map((r) => {
    const en = roomsEnMap[r.id];
    return {
      ...r,
      name: r.nameEn || en?.name || r.name,
      location: r.locationEn || en?.location || r.location,
      description: r.descriptionEn || en?.description || r.description,
      amenities:
        r.amenitiesEn && r.amenitiesEn.length > 0
          ? r.amenitiesEn
          : r.amenities,
    };
  });
}

export interface UseRoomsResult {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useRooms(lang?: string): UseRoomsResult {
  const sheetConfigured = hasRoomsSheetConfigured();
  const initialCached = sheetConfigured ? getCachedRooms() : null;
  const [baseRooms, setBaseRooms] = useState<Room[]>(
    initialCached
      ? mergeWithMock(initialCached)
      : sheetConfigured
        ? []
        : mockRooms
  );
  const [loading, setLoading] = useState(
    sheetConfigured && !initialCached
  );
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!hasRoomsSheetConfigured()) {
      setBaseRooms(mockRooms);
      return;
    }
    // Chỉ hiện trạng thái chờ nếu chưa có dữ liệu nào để hiển thị.
    if (!getCachedRooms()) {
      setLoading(true);
    }
    setError(null);
    try {
      const sheetRooms = await fetchRoomsFromSheet();
      const merged = mergeWithMock(sheetRooms);
      setBaseRooms(merged);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi không xác định");
      // Chỉ lùi về dữ liệu mẫu khi không còn gì để hiển thị.
      if (!getCachedRooms()) {
        setBaseRooms(mockRooms);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rooms = useMemo(
    () => applyLocalization(baseRooms, lang),
    [baseRooms, lang]
  );

  return { rooms, loading, error, refresh: load };
}