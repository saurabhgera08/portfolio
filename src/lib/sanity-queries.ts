// Example queries for fetching data from Sanity
// Use these in your components to replace hardcoded data

import { client } from '../../sanity/lib/client'
import { urlFor } from '../../sanity/lib/image'

// Helper to safely fetch from Sanity
async function safeFetch(query: string, params?: Record<string, any>) {
  try {
    // Check if client is configured
    const config = client.config?.() || {}
    if (!config.projectId || !import.meta.env.VITE_SANITY_PROJECT_ID) {
      return null
    }
    return await client.fetch(query, params || {})
  } catch (error) {
    console.warn('Sanity fetch error:', error)
    return null
  }
}

// Helper to process image URLs
function processImage(image: any): string | null {
  if (!image) return null
  try {
    return urlFor(image).url() || null
  } catch {
    return null
  }
}

// Hero Section
export async function getHeroData() {
  const query = `*[_type == "hero"][0]`
  return await safeFetch(query)
}

// About Section
export async function getAboutData() {
  const query = `*[_type == "about"][0]`
  return await safeFetch(query)
}

// Work Experience
export async function getWorkExperience() {
  const query = `*[_type == "workExperience"] | order(order asc)`
  return await safeFetch(query)
}

// Projects
export async function getProjects() {
  const query = `*[_type == "project"] | order(order asc) {
    ...,
    images[]
  }`
  const projects = await safeFetch(query)
  if (!projects) return null
  
  // Process image URLs
  return projects.map((project: any) => ({
    ...project,
    images: project.images?.map((img: any) => processImage(img) || '/placeholder.svg') || []
  }))
}

// Projects by Category
export async function getProjectsByCategory(category: string) {
  const query = `*[_type == "project" && category == $category] | order(order asc)`
  return await safeFetch(query, { category })
}

// Books
export async function getBooks() {
  const query = `*[_type == "book"] | order(order asc) {
    ...,
    coverImage
  }`
  const books = await safeFetch(query)
  if (!books) return null
  
  // Process image URLs
  return books.map((book: any) => ({
    ...book,
    image: processImage(book.coverImage) || '/placeholder.svg'
  }))
}

// Books by Category
export async function getBooksByCategory(category: string) {
  const query = `*[_type == "book" && category == $category] | order(order asc) {
    ...,
    coverImage
  }`
  const books = await safeFetch(query, { category })
  if (!books) return null
  
  // Process image URLs
  return books.map((book: any) => ({
    ...book,
    image: processImage(book.coverImage) || '/placeholder.svg'
  }))
}

// Currently Reading
export async function getCurrentlyReading() {
  const query = `*[_type == "book" && category == "current"][0] {
    ...,
    coverImage
  }`
  const book = await safeFetch(query)
  if (!book) return null
  
  return {
    ...book,
    image: processImage(book.coverImage) || '/placeholder.svg'
  }
}

// Skills
export async function getSkills() {
  const query = `*[_type == "skills"][0]`
  return await safeFetch(query)
}

// Contact Information
export async function getContactInfo() {
  const query = `*[_type == "contact"][0]`
  return await safeFetch(query)
}

