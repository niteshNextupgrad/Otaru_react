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
export const deleteUserById = async (id, token) => {
    const response = await axios.delete(`${BASE_URL}/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}
export const updateUserProfile = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/user/${id}`, payload);
    return response?.data;
}



export const addNewProductCategory = async (payload,) => {
    const response = await axios.post(`${BASE_URL}/add-product-category`, payload,)
    return response?.data;
}
export const getAllProductCategories = async () => {
    const response = await axios.get(`${BASE_URL}/all-product-categories`);
    return response?.data;
}
export const updateProductCategoryById = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/product-category/${id}`, payload);
    return response?.data;
}
export const deleteProductCategoryById = async (id) => {
    const response = await axios.delete(`${BASE_URL}/product-category/${id}`);
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
export const getProductById = async (productId) => {
    const response = await axios.get(`${BASE_URL}/product/${productId}`);
    return response?.data;
}
export const getAllProducts = async () => {
    const response = await axios.get(`${BASE_URL}/all-products`);
    return response?.data;
}
export const updateProductById = async (id, payload, token) => {
    const response = await axios.put(`${BASE_URL}/product/${id}`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}
export const deleteProductById = async (id, token) => {
    const response = await axios.delete(`${BASE_URL}/product/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}



export const addNewBlog = async (payload, token) => {
    const response = await axios.post(`${BASE_URL}/add-blog`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}
export const getAllBlogs = async (token) => {
    const response = await axios.get(`${BASE_URL}/all-blogs`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}
export const getBlogBySlug = async (slug) => {
    const response = await axios.get(`${BASE_URL}/blog/${slug}`);
    return response?.data;
}
export const deleteBlogById = async (id, token) => {
    const response = await axios.delete(`${BASE_URL}/blog/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response?.data;
}



export const addNewSliderImage = async (payload) => {
    const response = await axios.post(`${BASE_URL}/add-slider-image`, payload,)
    return response?.data;
}
export const getAllSldierImages = async () => {
    const response = await axios.get(`${BASE_URL}/all-slider-images`)
    return response?.data;
}
export const deleteSliderImageById = async (id) => {
    const response = await axios.delete(`${BASE_URL}/slider-image/${id}`)
    return response?.data;
}
export const updateSliderImageById = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/slider-image/${id}`, payload)
    return response?.data;
}



export const getAllNewsLetters = async () => {
    const response = await axios.get(`${BASE_URL}/news-letters`);
    return response?.data;
}
export const subscribeNewsLetter = async (payload) => {
    const response = await axios.post(`${BASE_URL}/news-letter`, payload);
    return response?.data;
}
export const deleteNewsLetter = async (id) => {
    const response = await axios.delete(`${BASE_URL}/news-letter/${id}`);
    return response?.data;
}



export const addNewContact = async (payload) => {
    const response = await axios.post(`${BASE_URL}/contact`, payload);
    return response?.data;
}
export const getAllContacts = async () => {
    const response = await axios.get(`${BASE_URL}/contacts`);
    return response?.data;
}
export const deleteContact = async (id) => {
    const response = await axios.delete(`${BASE_URL}/contact/${id}`);
    return response?.data;
}


export const placeAnOrder = async (payload) => {
    const response = await axios.post(`${BASE_URL}/order`, payload);
    return response?.data;
}
export const getAllOrders = async () => {
    const response = await axios.get(`${BASE_URL}/all-orders`);
    return response?.data;
}
export const getOrdersByUserId = async (userId) => {
    const response = await axios.get(`${BASE_URL}/order/${userId}`);
    return response?.data;
}
export const updateOrderStatus = async (orderId, payload) => {
    const response = await axios.put(`${BASE_URL}/order/${orderId}`, payload);
    return response?.data;
}

