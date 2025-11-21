import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

export default axiosInstance

export const get = (url, config) => axiosInstance.get(url, config).then(r => r.data)
export const post = (url, data, config) => axiosInstance.post(url, data, config).then(r => r.data)
export const put = (url, data, config) => axiosInstance.put(url, data, config).then(r => r.data)
export const del = (url, config) => axiosInstance.delete(url, config).then(r => r.data)
// src/api/xyz.js
export const mockApi = () => {}; 
// Sau này code thật sẽ viết vào đây