export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-kbws.onrender.com';

/**
 * Normalizes image URLs, replacing localhost references from legacy database
 * entries with the active API base URL.
 */
export const getImageUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('http://localhost:5000')) {
    return image.replace('http://localhost:5000', API_BASE_URL);
  }
  return image;
};
