import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an axios instance
const axiosServices = axios.create({
    baseURL: '', // Replace with your API base URL
    withCredentials: true
});

// Define a flag to manage the token refresh state
let isRefreshing = false;
let failedQueue = [];

// Request interceptor to add the token to the headers
axiosServices.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken'); // Retrieve token from AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosServices.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.headers['x-server-errortype'] === 'AccessTokenExpired' && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    // Request new access token
                    const response = await axiosServices.get('/auth/refresh-token');
                    const newToken = response.data.data.accessToken;

                    await AsyncStorage.setItem('accessToken', newToken);
                    axiosServices.defaults.headers.common.Authorization = `Bearer ${newToken}`;

                    failedQueue.forEach((promise) => promise.resolve(newToken));
                    failedQueue = [];

                    return axiosServices(originalRequest);
                } catch (refreshError) {
                    failedQueue.forEach((promise) => promise.reject(refreshError));
                    failedQueue = [];
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(axiosServices(originalRequest));
                        },
                        reject: (err) => reject(err)
                    });
                });
            }
        }

        return Promise.reject(error.response ? error.response.data : 'Server Error');
    }
);

export default axiosServices;
