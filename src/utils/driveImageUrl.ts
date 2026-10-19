/**
 * Chuyển link Google Drive (share/file/open/uc) thành link ảnh trực tiếp
 * để dùng được trong thẻ <img>. Các link khác (ibb, readdy.ai, ...) giữ nguyên.
 *
 * Dùng CDN trực tiếp của Google (lh3.googleusercontent.com) thay vì endpoint
 * thumbnail vì CDN này nhanh hơn hẳn và không bị nghẽn khi tải nhiều ảnh.
 */
const DEFAULT_SIZE = "w1600";

function withSize(base: string, size?: string): string {
  const width = size || DEFAULT_SIZE;
  return `${base}=${width}`;
}

export function toDirectImageUrl(url: string, size?: string): string {
  const trimmed = url.trim();

  // Dạng: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) {
    return withSize(
      `https://lh3.googleusercontent.com/d/${fileMatch[1]}`,
      size
    );
  }

  // Dạng: https://drive.google.com/open?id=FILE_ID
  const openMatch = trimmed.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (openMatch) {
    return withSize(
      `https://lh3.googleusercontent.com/d/${openMatch[1]}`,
      size
    );
  }

  // Dạng: https://drive.google.com/uc?export=view&id=FILE_ID hoặc ?id=FILE_ID
  const ucMatch = trimmed.match(/drive\.google\.com\/uc\?(?:[^&]*&)*id=([^&]+)/);
  if (ucMatch) {
    return withSize(
      `https://lh3.googleusercontent.com/d/${ucMatch[1]}`,
      size
    );
  }

  return trimmed;
}