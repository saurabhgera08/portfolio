import { createClient } from '@sanity/client'

// Safely create client only if projectId is available
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const token = import.meta.env.VITE_SANITY_TOKEN

// Create a dummy client if projectId is missing (prevents crashes)
export const client = projectId 
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
      token: token || undefined,
    })
  : {
      // Dummy client that returns null for all queries
      fetch: async () => null,
      config: () => ({ projectId: '', dataset }),
    } as any

