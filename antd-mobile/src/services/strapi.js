// src/services/strapi.js
import axios from 'axios';

const STRAPI_API_URL = process.env.REACT_APP_STRAPI_API_URL || 'http://localhost:1337/api';

export const getHomepageTiles = async () => {
  try {
    const response = await axios.get(`${STRAPI_API_URL}/homepage?populate[tiles][populate]=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching homepage tiles:', error);
    throw error;
  }
};

// Add a helper function to resolve Strapi media URLs
export const strapiMediaUrl = (media) => {
  if (!media) return null;
  
  const baseUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${media.data.attributes.url}`;
};