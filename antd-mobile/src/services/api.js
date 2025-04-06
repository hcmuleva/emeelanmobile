import axios from 'axios';
import qs from 'qs';

// const API_URL = 'http://localhost:1337/api'; // Replace with your Strapi URL
const API_URL = process.env.REACT_APP_API_URL; // Replace with your Strapi URL

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

export const register = async (data) => {
  try {
    const response = await api.post('/auth/local/register', {
      ...data
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

export const getPaginatedUsers = async (start = 0, limit = 10) => {
    try {
      const response = await api.get(`/users`, {
        params: {
          _start: start,
          _limit: limit,
          _sort: 'id:asc', // Sort by newest first
          "populate[photos]": "*", // ✅ Populate photos (all fields)
          "populate[profilePicture]": "*", // ✅ Populate profile picture (all fields)
          "populate[Height]": "*"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      return response.data;
      
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch users';
    }
  };

// get admin
export const getPaginatedAdminUsers = async () => {
  try {
    const response = await api.get('custom-admins', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,  // Use correct token
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch Admins");
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

export const uploadImage = async (formData,jwt) => {
  console.log("uploadImage function called", "token", jwt); 
  try {
    // ✅ Upload files to Strapi using Axios
    const uploadResponse = await api.post('/upload', formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data' // Important for file uploads
      }
    });
  
    // Handle successful upload
    console.log('Upload successful:', uploadResponse);
    return uploadResponse.data; // Return the uploaded file data
  } catch (error) {
    console.error('Upload failed:', error.message);
    // Handle error (show toast, etc.)
  }
}

// new Apicalls start
// update Data of me,
export const updateUserData = async (data, jwt, userId) => {
  try {
    // console.log("Sending update:", { photos: photoIds });

    const response = await api.put(`/users/${userId}`, {
      ...data,
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error("Strapi update error:", error.response?.data || error.message);
    throw error.response?.data?.message || 'Update failed';
  }
};

export const getUserById = async (userId, jwt) => {
  try {
    const response = await api.get(`/users/${userId}`,{
      params: {
        populate: '*' // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Strapi update error:", error.response?.data || error.message);
    throw error.response?.data?.message || 'Update failed';
  }
};
// new Apicalls End

const filteredUsers = async () => {
  const filters = {
    AND: [
      { Gotra: 'Parmar' },
      { State: 'Gujarat' }
    ],
    OR: [
      { Profession: 'Engineer' },
      { Profession: 'Doctor' }
    ],
    marital: 'Unmarried',
    age: { $gte: 25, $lte: 35 } // Age range
  };

  const response = await fetch(`/api/users?_start=0&_limit=10&filters=${encodeURIComponent(JSON.stringify(filters))}`);
  const data = await response.json();
  return data;
}