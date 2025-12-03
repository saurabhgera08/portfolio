// Example queries for fetching data from Sanity
// Use these in your components to replace hardcoded data

import { client } from '../../sanity/lib/client'

// Hero Section
export async function getHeroData() {
  const query = `*[_type == "hero"][0]`
  return await client.fetch(query)
}

// About Section
export async function getAboutData() {
  const query = `*[_type == "about"][0]`
  return await client.fetch(query)
}

// Work Experience
export async function getWorkExperience() {
  const query = `*[_type == "workExperience"] | order(order asc)`
  return await client.fetch(query)
}

// Projects
export async function getProjects() {
  const query = `*[_type == "project"] | order(order asc)`
  return await client.fetch(query)
}

// Projects by Category
export async function getProjectsByCategory(category: string) {
  const query = `*[_type == "project" && category == $category] | order(order asc)`
  return await client.fetch(query, { category })
}

// Books
export async function getBooks() {
  const query = `*[_type == "book"] | order(order asc)`
  return await client.fetch(query)
}

// Books by Category
export async function getBooksByCategory(category: string) {
  const query = `*[_type == "book" && category == $category] | order(order asc)`
  return await client.fetch(query, { category })
}

// Currently Reading
export async function getCurrentlyReading() {
  const query = `*[_type == "book" && category == "current"][0]`
  return await client.fetch(query)
}

// Skills
export async function getSkills() {
  const query = `*[_type == "skills"][0]`
  return await client.fetch(query)
}

// Contact Information
export async function getContactInfo() {
  const query = `*[_type == "contact"][0]`
  return await client.fetch(query)
}

