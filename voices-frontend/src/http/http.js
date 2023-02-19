import axios from 'axios'

const api=axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5500",
    withCredentials: true, // this will send credentials(cookies,authentication header,tls certificate) with every request
    // to do the same with fetch use credentials: include and with xhr use withCredentials
    headers:{

        'Content-type': 'application/json',
        Accept: 'application/json'
    }
})



// List of endpoints

export const sendOtpRequest=(data)=>api.post('/api/send-otp',data);
export const verifyOtpRequest=(data)=>api.post('/api/verify-otp',data);

export default api;