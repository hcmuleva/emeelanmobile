// src/services/utils/helpers.js

export const buildPopulateQuery = (fields, options = {}) => {
  // ... existing implementation ...
};

export const parseSortParam = (sortParam) => {
  // ... existing implementation ...
};

export const buildFilterQuery = (filters = {}) => {
  // ... existing implementation ...
};

/**
 * Resolves the full URL for a Strapi media asset
 * @param {Object} media - The media object from Strapi's response
 * @returns {string|null} - The full URL to the media file or null if media is invalid
 */
export const strapiMediaUrl = (media) => {
  // Return null if media is not provided or doesn't have the expected structure
  if (!media || !media.data) return null;
  
  // Get the base URL from environment variables or use default
  const baseUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
  
  // Combine base URL with the media URL from Strapi
  return `${baseUrl}${media.data.attributes.url}`;
};

const helpers = {
  buildPopulateQuery,
  parseSortParam,
  buildFilterQuery,
  strapiMediaUrl
};

export default helpers;