import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { deskStructure } from './sanity/desk'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  
  projectId: 'dju5bkf8',
  dataset: 'production',
  
  basePath: '/admin',
  
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
})

