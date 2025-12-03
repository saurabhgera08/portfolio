// This file is for embedding Sanity Studio in your app
// Run: npm run studio to use standalone Studio instead

import { createRoot } from 'react-dom/client'
import { Studio } from 'sanity'
import config from '../sanity.config'

function StudioPage() {
  return <Studio config={config} />
}

const rootElement = document.getElementById('sanity-studio-root')
if (rootElement) {
  createRoot(rootElement).render(<StudioPage />)
}

