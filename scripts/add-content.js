// Script to add initial content to Sanity
// Run with: node scripts/add-content.js

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'dju5bkf8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || '', // Set this in your .env
})

async function addHero() {
  try {
    const hero = {
      _type: 'hero',
      headline: "Scaling Businesses Through\nClear Thinking &\nRelentless Execution",
      headlineHighlight: "Relentless Execution",
      subheadline: "I've driven 50%+ MoM growth, built profitable unit economics, and led cross-functional teams to win in competitive markets. I think clearly about complex problems and execute relentlessly on what matters.",
      ctaPrimary: "Explore My Work",
      ctaSecondary: "Get in Touch",
      stats: [
        { value: "$5M+", label: "Annual Revenue Managed", highlight: false },
        { value: "$860K", label: "Competitive Wins", highlight: false },
        { value: "50%+", label: "MoM Growth Driven", highlight: true },
        { value: "$1.2M+", label: "Market Share Leader", highlight: false },
        { value: "3%", label: "QoQ Share Gains", highlight: false },
        { value: "Profitable", label: "Unit Economics", highlight: true },
      ],
    }
    
    const existing = await client.fetch('*[_type == "hero"][0]')
    if (existing) {
      console.log('✅ Hero already exists')
      return existing
    }
    
    const result = await client.create(hero)
    console.log('✅ Hero created:', result._id)
    return result
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

async function main() {
  console.log('🚀 Adding content to Sanity...')
  await addHero()
  console.log('✅ Done! Check your Sanity dashboard.')
}

main()
