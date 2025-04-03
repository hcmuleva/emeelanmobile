import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://hphtechnology.in/gathjod/api'; // Replace with your Strapi URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (identifier, password) => {
  try {
    const response = await api.post('/auth/local', {
      identifier, // can be email or username
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/auth/local/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const getAuthenticatedUser = async (jwt) => {

  try {
    const response = await api.get('/users/me', {
      params: {
        populate: '*' // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch user';
  }
};

export const getCustomMe = async (jwt) =>{
  try {
    const response = await api.get('/customme', {
     
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch user';
  }
}

export const updateCustomMe = async (jwt, updatedData) => {
  try {
    const response = await api.put('/customme', updatedData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update user data';
  }
}

export const getPaginatedUsers = async (start = 0, limit = 10) => {
    console.log("getPaginatedUsers ");
    try {
      const response = await api.get(`/users`, {
        params: {
          _start: start,
          _limit: limit,
          _sort: 'id:DESC', // Sort by newest first
          "populate[photos]": "*", // ✅ Populate photos (all fields)
          "populate[profilePicture]": "*" // ✅ Populate profile picture (all fields)
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      console.log("getPaginatedUsers response ",response.data);
      return response.data;
      
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch users';
    }
  };
  // Add to your existing API service file
export const searchUsers = async (query, start = 0, limit = 10) => {
    try {
      const response = await api.get(`/users`, {
        params: {
          _start: start,
          _limit: limit,
          _q: query, // Strapi search query
          _sort: 'username:ASC' // Better for search results
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Search failed';
    }
  };


export const resetpassword = async (userId, newPassword) => {
  try {
    const response = await api.post('/reset-password', {
      userId, // can be email or username
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Reset Password failed';
  }
};

export const photoUpload = async (formData) =>{
  try {
    const response = await api.post('/upload', {
      formData
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Upload is failed';
  }
}