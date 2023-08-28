import axios from 'axios'

const api=axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5500",
    withCredentials: true,
    headers:{
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
})

// List of endpoints
export const sendOtpRequest=(data)=>api.post('/api/send-otp',data);
export const verifyOtpRequest=(data)=>api.post('/api/verify-otp',data);
export const sendActivateRequest=(data)=>api.post('/api/activate',data)
export const logout=()=>api.post('/api/logout');
export const createRoom=(data)=>api.post('/api/create-room',data);
export const getRooms=()=>api.get('/api/get-all-rooms');


// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default api;