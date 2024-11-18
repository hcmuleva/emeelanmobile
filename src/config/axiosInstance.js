import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY); // Retrieve the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
