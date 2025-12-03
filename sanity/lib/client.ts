import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  // Token is optional - if provided, adds extra security
  // For public portfolios, not required but doesn't hurt
  token: import.meta.env.VITE_SANITY_TOKEN || undefined,
})

