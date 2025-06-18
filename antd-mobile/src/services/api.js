import axios from "axios";
import qs from "qs";

// const API_URL = 'http://localhost:1337/api'; // Replace with your Strapi URL

const API_URL = process.env.REACT_APP_API_URL;

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

export const getPaginatedUsers = async (start = 0, limit = 10, filters = {}) => {
  try {

    if (filters.DOB_gte) {
      filters.DOB = { ...(filters.DOB || {}), $gte: filters.DOB_gte };
    }
    if (filters.DOB_lte) {
      filters.DOB = { ...(filters.DOB || {}), $lte: filters.DOB_lte };
    }
    if (filters.gotra) {
      filters.gotra = { $ne: filters.gotra };
    }
    const strapiFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== '' && value !== null && value !== undefined
      )
    );
    const { DOB_gte, DOB_lte, ...modifiedFilters } = strapiFilters;

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
export const getPaginatedAdminUsers = async (start = 0, limit = 10, filters = {}) => {
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

export const newConnectionRequest = async (data) => {
  const jwt = localStorage.getItem("jwt")
  try {
    const reaponse = await api.post(`/connectionrequests`,
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",
        }
      }
    );
    return reaponse.data
  } catch (error) {
    console.error("error", error)
  }
}
//connectionrequest
export const updateConnectionRequest = async (reqid, data) => {
  const jwt = localStorage.getItem("jwt")
  try {
    const reaponse = await api.put(`/custom-requests/${reqid}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",
        }
      }
    );
    return reaponse.data
  } catch (error) {
    console.error("error", error)
  }
}

export const findConnectionRequest = async (userId1, userId2) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const response = await api.get("/customconnectionrequest/findAcceptedConnection", {
      params: {
        userId1: Number(userId1),
        userId2: Number(userId2)
      },
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    console.log("API Response:", response.data);

    // Check for data structure existence
    if (response.data?.data?.id) {
      console.log("Found connection ID:", response.data.data.id);
      // Return the entire response.data object so we have access to both id and attributes
      return response.data;
    }

    console.log("No accepted connection found");
    return null;
  } catch (err) {
    console.error("Error finding connection request:", err);
    console.error("Error details:", err.response?.data);
    throw new Error(err.response?.data?.message || "Failed to find connection");
  }
};

export const updateConnectionStatus = async (reqid, data) => {
  const jwt = localStorage.getItem("jwt");
  
  try {
    console.log("Updating connection ID:", reqid, "with data:", data);
    
    const response = await api.put(`/connectionrequests/${reqid}`, {
      data: data
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      }
    });
    
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update error:", error);
    console.error("Error response:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to update connection status");
  }
};

export const fetchConnectionRequest = async (query = "", page = 1, pageSize = 10) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const params = {
      populate: ["sender", "receiver"],
      page,
      pageSize,
    };

    if (query) {
      params.query = query;
    }

    const response = await api.get("/connectionrequests", {
      params,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    return {
      data: response.data.data || [],
      meta: response.data.meta || { pagination: { page: 1, pageSize: 10, total: 0 } },
    };
  } catch (error) {
    console.error("Error fetching connection requests:", error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, total: 0 } } };
  }
};

// Improved API function for fetching engaged requests
export const getEngagedRequests = async (start = 0, limit = 10) => {
  // Note: Avoid localStorage in Claude artifacts - this is for your actual implementation
  const jwt = localStorage.getItem("jwt");

  try {
    const response = await api.get(`/customconnectionrequest/findEngagedConnection`, {
      params: {
        _start: start,
        _limit: limit,
        _sort: 'createdAt:DESC',
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data
  } catch (error) {
    console.error("Failed to fetch ENGAGED requests:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw error; // Throw the error to be caught by the calling function
  }
}

// Helper function to process API response
const processApiResponse = (data, page, pageSize) => {
  let apiData = [];
  let apiPagination = {
    page: page,
    pageSize: pageSize,
    total: 0,
    pageCount: 1
  };

  if (data?.data && Array.isArray(data.data)) {
    apiData = data.data.map(item => ({
      id: item.id,
      status: item.attributes?.status || item.status || 'ENGAGED',
      message: item.attributes?.message || item.message || 'Engaged',
      createdAt: item.attributes?.createdAt || item.createdAt,
      updatedAt: item.attributes?.updatedAt || item.updatedAt,
      publishedAt: item.attributes?.publishedAt || item.publishedAt,
      sender: item.attributes?.sender?.data?.attributes || item.attributes?.sender || item.sender,
      receiver: item.attributes?.receiver?.data?.attributes || item.attributes?.receiver || item.receiver
    }));
    
    if (data.meta?.pagination) {
      apiPagination = data.meta.pagination;
    }
  } else if (Array.isArray(data)) {
    apiData = data;
  }

  return {
    results: apiData,
    pagination: apiPagination
  };
};

// Alternative function if you need to handle the exact data structure from your sample
export const getEngagedRequestsFromSample = (sampleData, page = 1, pageSize = 10) => {
  // This function handles the exact structure from your paste.txt
  if (!sampleData?.data) {
    return {
      results: [],
      pagination: { page: 1, pageSize: pageSize, total: 0, pageCount: 1 }
    };
  }

  // Filter engaged items
  const engagedItems = sampleData.data.filter(item => 
    item.status?.toLowerCase() === 'engaged'
  );

  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = engagedItems.slice(startIndex, endIndex);

  return {
    results: paginatedItems,
    pagination: {
      page: page,
      pageSize: pageSize,
      total: engagedItems.length,
      pageCount: Math.ceil(engagedItems.length / pageSize)
    }
  };
};



// Add to your existing API service file
export const searchUsers = async (query, start = 0, limit = 10) => {
  try {
    const params = {
      _start: start,
      _limit: limit,
      _sort: "username:ASC",
      filters: {
        $or: [
          { FirstName: { $containsi: query } },
          { LastName: { $containsi: query } },
          { Country: { $containsi: query } },
          { State: { $containsi: query } },
          { City: { $containsi: query } },
          { Profession: { $containsi: query } },
          { district: { $containsi: query } },
          { userstatus: { $containsi: query } },
          { Gotra: { $containsi: query } },
          {
            id: !isNaN(parseInt(query)) ? { $eq: parseInt(query) } : undefined
          }
        ].filter(Boolean), // removes undefined if `id` is not a number
      }
    }

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
export const searchAdmins = async (query, start = 0, limit = 10, filters = {}) => {
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


export const getBreakingNews = async (jwt) => {
  try {
    const response = await api.get("/breakingmessages", {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Get failed";
  }
}


export const getSingleNews = async (newsId, jwt) => {
  try {
    const response = await api.get(`/breakingmessages/${newsId}`, {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Get failed";
  }
}

export const getDonners = async (jwt) => {
  try {
    const response = await api.get("/donners", {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Get failed";
  }
}
export const createAndUpdateDonners = async (data, jwt) => {
  try {
    const reaponse = await api.post(`/donners`,
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",
        }
      }
    );
    return reaponse.data
  } catch (error) {
    console.error("error", error)
  }
}

export const getSingleDonner = async (donorId, jwt) => {
  try {
    const response = await api.get(`/donners/${donorId}`, {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Get failed";
  }
}


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

  try {
    // ✅ Upload files to Strapi using Axios
    const uploadResponse = await api.post("/upload", formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });

    // Handle successful upload
    return uploadResponse.data; // Return the uploaded file data
  } catch (error) {
    console.error("Upload failed:", error.message);
    // Handle error (show toast, etc.)
  }
};

export const createQRCODEBySuperAdmin = async (data, jwt) => {
  try {
    const reaponse = await api.post(`/donationqrcodes`,
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",
        }
      }
    );
    return reaponse.data
  } catch (error) {
    console.error("error", error)
  }
}

export const updateUser = async (data, userId) => {
  try {
    const response = await api.put(`/users/${userId}`, {
      ...data,
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
// new Apicalls start
// update Data of me,
export const updateUserData = async (data, userId, jwt) => {
  try {
    const response = await api.put(`/customupdateuser/${userId}`,
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",
        }
      })
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
export const customsingleuser = async (userId, jwt) => {
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

export const createBreakingNews = async (data, jwt) => {
  try {
    const reaponse = await api.post(`/breakingmessages`,
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Use correct token
          "Content-Type": "application/json",
        }
      }
    );
    return reaponse.data
  } catch (error) {
    console.error("error", error)
  }
}

export const getQrCards = async (jwt) => {
  try {
    const response = await api.get("/donationqrcodes", {
      params: {
        populate: "*", // Populates all relations
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    return response.data
  } catch (err) {
    throw err.response?.data?.message || "Error in getting donation qr cards"
  }
}

export const getPincode = async (pincode) => {
  try {

    const response = await api.get(`/pincodes?filters[pincode]=${pincode}`)
    return response.data
  } catch (err) {
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



export const getSamaj = async (filters) => {

  try {
    const response = await api.get(`/samajs`,{
         params: {

        filters,

      },
    })
    return response.data
  } catch (err) {
    throw err.response?.data?.message || "Error in samaj call"
  }
}


   export const getSamajTitle = async (orgsku) => {

  try {
    const response = await api.get(`/samajs?filters[samaj_type][$eq]=${orgsku}`,)
    return response.data
  } catch (err) {
    throw err.response?.data?.message || "Error in samaj call"
  }
}