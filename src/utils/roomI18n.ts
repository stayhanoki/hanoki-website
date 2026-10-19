import { rooms, roomsEnMap, categories, categoriesEn, allAmenities, allAmenitiesEn } from "@/mocks/rooms";
import type { Room } from "@/mocks/rooms";

export function getLocalizedRooms(lang?: string): Room[] {
  if (!lang?.startsWith("en")) return rooms;
  return rooms.map((r) => ({
    ...r,
    ...(roomsEnMap[r.id] || {}),
  }));
}

export function getLocalizedRoom(id: string, lang?: string): Room | undefined {
  const room = rooms.find((r) => r.id === id);
  if (!room || !lang?.startsWith("en")) return room;
  return { ...room, ...(roomsEnMap[id] || {}) };
}

export function getLocalizedCategories(lang?: string) {
  if (!lang?.startsWith("en")) return categories;
  return categoriesEn;
}

export function getLocalizedAmenities(lang?: string) {
  if (!lang?.startsWith("en")) return allAmenities;
  return allAmenitiesEn;
}