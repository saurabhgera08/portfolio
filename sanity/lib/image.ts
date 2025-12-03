import imageUrlBuilder from '@sanity/image-url/lib/types/builder'
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export function urlFor(source: SanityImageSource) {
  try {
    // Check if client is properly configured
    if (!client || typeof client.config !== 'function') {
      return {
        url: () => '/placeholder.svg',
      } as any
    }
    
    const config = client.config()
    if (!config?.projectId) {
      return {
        url: () => '/placeholder.svg',
      } as any
    }
    
    const builder = createImageUrlBuilder({ 
      projectId: config.projectId, 
      dataset: config.dataset 
    })
    return builder.image(source)
  } catch (error) {
    console.warn('Image builder error:', error)
    return {
      url: () => '/placeholder.svg',
    } as any
  }
}

