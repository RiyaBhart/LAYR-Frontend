import axios from 'axios';
const API_URL = 'http://localhost:8000';

export const api = axios.create({ baseURL: API_URL });

// Products
export const fetchProducts = (limit=50, offset=0) => api.get(`/articles?limit=${limit}&offset=${offset}`);
export const fetchProductById = (id) => api.get(`/articles/${id}`);

// Customers
export const fetchCustomers = (limit=50, offset=0) => api.get(`/customers?limit=${limit}&offset=${offset}`);
export const fetchCustomerById = (id) => api.get(`/customers/${id}`);

// Orders
export const fetchOrders = (limit=50, offset=0) => api.get(`/orders?limit=${limit}&offset=${offset}`);
export const fetchOrderById = (id) => api.get(`/orders/${id}`);

// Reviews
export const fetchReviewsByProduct = (productId) => api.get(`/reviews?article_id=${productId}`);
export const postReview = (review) => api.post(`/reviews`, review);

// Transactions, wishlist, cart can be added similarly
