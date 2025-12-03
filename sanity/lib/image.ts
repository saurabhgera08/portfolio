import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Safely create builder only if client is configured
let builder: ReturnType<typeof imageUrlBuilder> | null = null

try {
  if (client && typeof client.config === 'function') {
    const config = client.config()
    if (config?.projectId) {
      builder = imageUrlBuilder(client)
    }
  }
} catch (error) {
  console.warn('Failed to initialize image builder:', error)
}

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return a dummy builder that returns placeholder
    return {
      url: () => '/placeholder.svg',
      width: () => ({ url: () => '/placeholder.svg' }),
      height: () => ({ url: () => '/placeholder.svg' }),
    } as any
  }
  return builder.image(source)
}

