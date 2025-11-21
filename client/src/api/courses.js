// src/api/courses.js
import axios, { get as axiosGet } from './axiosClient'

// Mock data (fallback)
const exampleCourses = [
  { id: 1, title: 'Lập trình Web cơ bản', price: 500000, image: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png', description: 'Học HTML, CSS từ con số 0' },
  { id: 2, title: 'ReactJS Nâng cao', price: 1200000, image: 'https://files.fullstack.edu.vn/f8-prod/courses/13/6200af9262b30.png', description: 'Làm chủ ReactJS và Redux' },
  { id: 3, title: 'SQL Server 2022', price: 800000, image: 'https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png', description: 'Quản trị cơ sở dữ liệu bài bản' }
]

// Try to fetch from backend /api/items, fallback to mock data on error
export const getAllCourses = async () => {
  try {
    // backend returns items; adapt the response to course shape if necessary
    const items = await axiosGet('/api/items')
    if (Array.isArray(items) && items.length > 0) return items
  } catch (err) {
    // silent fallback to mock
  }
  // return mock with small delay for consistency
  return new Promise((resolve) => setTimeout(() => resolve(exampleCourses), 200))
}

export const getCourseById = async (id) => {
  try {
    const item = await axiosGet(`/api/items/${id}`)
    if (item) return item
  } catch (err) {
    // fallback
  }
  return exampleCourses.find(c => String(c.id) === String(id)) || null
}