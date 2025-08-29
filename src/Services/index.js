import axios from "axios";

// const BASE_URL = "https://otaru-backend.onrender.com/api" ;
const BASE_URL = 'http://localhost:8000/api';


export const adminLogin = async (payload) => {
    const response = await axios.post(`${BASE_URL}/admin-login`, payload);
    return response?.data;
}
export const userRegiser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/user-resgiter`, payload);
    return response?.data;
}
export const userLogin = async (payload) => {
    const response = await axios.post(`${BASE_URL}/user-login`, payload);
    return response?.data;
}
export const getAllUsers = async (token) => {
    const response = await axios.get(`${BASE_URL}/all-users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}

export const addNewProduct = async (payload, token) => {
    const response = await axios.post(`${BASE_URL}/add-product`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}
export const getAllProducts = async (token) => {
    const response = await axios.get(`${BASE_URL}/all-products`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}