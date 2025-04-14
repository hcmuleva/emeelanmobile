import axios from "axios";
import qs from "qs";

// const API_URL = 'http://localhost:1337/api'; // Replace with your Strapi URL
const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL", API_URL);
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (identifier, password) => {
  try {
    const response = await api.post('/custom-login', {
      identifier, // can be email or username
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const register = async (data) => {
  try {
    const response = await api.post("/auth/local/register", {
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const getAuthenticatedUser = async (jwt) => {
  try {
    const response = await api.get("/users/me", {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user";
  }
};

export const getCustomMe = async (jwt) => {
  try {
    const response = await api.get("/customme", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user";
  }
};

export const getPaginatedUsers = async (start = 0, limit = 10,filters = {}) => {
    try {
      console.log("getPaginatedUsers filters",filters, " end")
      if (filters.DOB_gte) {
        filters.DOB = { ...(filters.DOB || {}), $gte: filters.DOB_gte };
      }
      if (filters.DOB_lte) {
        filters.DOB = { ...(filters.DOB || {}), $lte: filters.DOB_lte };
      }
       if (filters.gotra) {
        filters.gotra = {  $ne: filters.gotra };
      }
      const strapiFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== '' && value !== null && value !== undefined
        )
      );
      const {DOB_gte,DOB_lte, ...modifiedFilters} = strapiFilters;
      console.log("getPaginatedUsers filters",modifiedFilters, " end")

      const response = await api.get(`/users`, {
        params: {
          _start: start,
          _limit: limit,
          filters: modifiedFilters, // ✅ Use filters
          _sort: 'id:desc', // Sort by newest first
          "populate[photos]": "*", // ✅ Populate photos (all fields)
          "populate[profilePicture]": "*", // ✅ Populate profile picture (all fields)
          "populate[Height]": "*",
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
export const getPaginatedAdminUsers = async (start = 0, limit = 10,filters = {}) => {
  try {
    const response = await api.get("/custom-admins", {
      params: {
        _start: start,
        _limit: limit,
        filters,
        _sort: 'id:desc', // Sort by newest first
        "populate[photos]": "*", // ✅ Populate photos (all fields)
        "populate[profilePicture]": "*", // ✅ Populate profile picture (all fields)
        "populate[Height]": "*",
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Use correct token
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch Admins");
  }
};

export const newConnectionRequest = async( data)=>{
  const jwt = localStorage.getItem("jwt")
  console.log("jwt", jwt)
  try {
    const reaponse = await api.post(`/connectionrequests`, 
        {data: data},
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",}
      }
    );
    return reaponse.data
  } catch (error) {
    console.error("error", error)
  }
}
//connectionrequest
export const updateConnectionRequest = async(id, data)=>{
  const jwt = localStorage.getItem("jwt")
  console.log("DATA",data)
  console.log("jwt", jwt)
  try {
    const reaponse = await api.put(`/connectionrequests/${id}`, 
        {data: data},
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",}
      }
    );
    return reaponse.data
  } catch (error) {
    console.error("error", error)
  }
}
export const getEngagedRequests = async (page = 1, pageSize = 10) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const response = await api.get(
      `/connectionrequests?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=updatedAt:desc&filters[status][$eq]=ENGGAGED&populate[sender][populate]=*&populate[receiver][populate]=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return {
      data: response.data.data.map((item) => ({
        id: item.id,
        updatedAt: item.attributes.updatedAt,
        sender: {
          ...item.attributes.sender?.data?.attributes,
          id: item.attributes.sender?.data?.id,
        },
        receiver: {
          ...item.attributes.receiver?.data?.attributes,
          id: item.attributes.receiver?.data?.id,
        },
      })),
      pagination: response.data.meta.pagination,
    };
  } catch (error) {
    console.error("Failed to fetch ENGAGED requests", error);
    return {
      data: [],
      pagination: { page: 1, pageSize: 10, total: 0, pageCount: 1 },
    };
  }
};

export const findConnectionRequest = async (userId1, userId2) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const response = await api.get(
      `/connectionrequests?filters[$or][0][sender][id][$eq]=${userId1}&filters[$or][0][receiver][id][$eq]=${userId2}&filters[$or][1][sender][id][$eq]=${userId2}&filters[$or][1][receiver][id][$eq]=${userId1}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.data?.data?.length > 0) {
      const item = response.data.data[0];
      return {
        id: item.id,
        ...item.attributes,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error finding connection request", err);
    return null;
  }
};

// Add to your existing API service file
export const searchUsers = async (query, start = 0, limit = 10) => {
  try {
    const params = {
      _start: start,
      _limit: limit,
      _q: query, // Strapi search query
      _sort: "username:ASC",
      filters: {
        $or: [
          { FirstName: { $containsi: query } },
          { LastName: { $containsi: query } },
        ],
      },
    }
    console.log(params)
    const response = await api.get(`/users`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Search failed";
  }
};

//search ADMIN
export const searchAdmins = async (query, start = 0, limit = 10,filters={}) => {
  try {
    const params = {
      _start: start,
      _limit: limit,
      _q: query, // Strapi search query
      _sort: "username:ASC",

      filters: {
        ...filters,
        $or: [
          { FirstName: { $containsi: query } },
          { LastName: { $containsi: query } },
        ],
      },
    }
    console.log(params)
    const response = await api.get(`/custom-admins`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Search failed";
  }
};


export const resetpassword = async (userId, newPassword) => {
  try {
    const response = await api.post("/reset-password", {
      userId, // can be email or username
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Reset Password failed";
  }
};

export const photoUpload = async (formData) => {
  try {
    const response = await api.post("/upload", {
      formData,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Upload is failed";
  }
};

export const uploadImage = async (formData, jwt) => {
  console.log("uploadImage function called", "token", jwt);
  try {
    // ✅ Upload files to Strapi using Axios
    const uploadResponse = await api.post("/upload", formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });

    // Handle successful upload
    console.log("Upload successful:", uploadResponse);
    return uploadResponse.data; // Return the uploaded file data
  } catch (error) {
    console.error("Upload failed:", error.message);
    // Handle error (show toast, etc.)
  }
};

// new Apicalls start
// update Data of me,
export const updateUserData = async (data, userId) => {
  try {
    // console.log("Sending update:", { photos: photoIds });

    const response = await api.put(`/users/${userId}`, {
      ...data,
    } );
    return response.data;

  } catch (error) {
    console.error(
      "Strapi update error:",
      error.response?.data || error.message
    );
    throw error.response?.data?.message || "Update failed";
  }
};

export const getUserById = async (userId, jwt) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Strapi update error:",
      error.response?.data || error.message
    );
    throw error.response?.data?.message || "Update failed";
  }
};
export const customsingleuser = async (userId, jwt) =>{
  console.log("Request recieved ", userId, " Token ", jwt)
  try {
    const response = await api.get(`/custom-singleuser/${userId}`, {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Strapi update error:",
      error.response?.data || error.message
    );
    throw error.response?.data?.message || "Update failed";
  }
}
// new Apicalls End

const filteredUsers = async () => {
  const filters = {
    AND: [{ Gotra: "Parmar" }, { State: "Gujarat" }],
    OR: [{ Profession: "Engineer" }, { Profession: "Doctor" }],
    marital: "Unmarried",
    age: { $gte: 25, $lte: 35 }, // Age range
  };

  const response = await fetch(
    `/api/users?_start=0&_limit=10&filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}`
  );
  const data = await response.json();
  return data;
};

export const getPincode = async(pincode) =>{
  try{

    const response =await api.get(`/pincodes?filters[pincode]=${pincode}`)
    return response.data
  } catch(err){
    throw err.response?.data?.message || "Error in getting pincode"
  }
}

//mappls service
const MAPPLS_API_KEY = process.env.REACT_APP_MAPPLS_TOKEN;
const MAPPLS_BASE_URL = 'https://apis.mappls.com/advancedmaps/v1';

// Create a new axios instance for Mappls
const mapplsApi = axios.create({
  baseURL: MAPPLS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const reverseGeocode = async (latitude, longitude) => {
  try {
    // Make a request to the Mappls API
    console.log("Using Mappls API key:", MAPPLS_API_KEY ? "Key is set" : "Key is not set");
    
    const response = await mapplsApi.get(`/${MAPPLS_API_KEY}/rev_geocode`, {
      params: {
        lat: latitude,
        lng: longitude
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Mappls API error:", error.response?.data || error.message);
    
    // If we get a CORS error, provide a helpful error message
    if (error.message.includes('Network Error') || error.message.includes('CORS')) {
      throw new Error("CORS issue detected. Please implement a server-side proxy for this API call.");
    }
    
    throw new Error(error.response?.data?.message || 'Location lookup failed');
  }
};

