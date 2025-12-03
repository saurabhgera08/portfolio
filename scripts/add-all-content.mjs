// Script to add all portfolio content to Sanity
// Run with: node scripts/add-all-content.mjs

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const client = createClient({
  projectId: 'dju5bkf8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN || '',
})

async function checkExisting(type) {
  try {
    const existing = await client.fetch(`*[_type == "${type}"][0]`)
    return existing
  } catch (error) {
    return null
  }
}

async function createOrUpdate(type, data) {
  try {
    const existing = await checkExisting(type)
    if (existing) {
      console.log(`⚠️  ${type} already exists, skipping...`)
      return existing
    }
    
    const result = await client.create({ _type: type, ...data })
    console.log(`✅ ${type} created:`, result._id)
    return result
  } catch (error) {
    console.error(`❌ Error creating ${type}:`, error.message)
    throw error
  }
}

async function addHero() {
  return await createOrUpdate('hero', {
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
  })
}

async function addContact() {
  return await createOrUpdate('contact', {
    email: "saurabhgera08@gmail.com",
    phone: "+91 8341064488",
    linkedin: "https://www.linkedin.com/in/saurabh-gera-b8a14b147/",
    location: "Hyderabad, India",
    interestedIn: [
      "Founders and scaling businesses solving complex problems",
      "Companies in growth mode needing someone who can own outcomes end-to-end",
      "Leaders who value clarity of thought over corporate polish"
    ],
    letsTalkIf: "You're solving a problem that matters and you want a partner who thinks clearly, executes relentlessly, and isn't afraid to ask hard questions."
  })
}

async function main() {
  console.log('🚀 Adding content to Sanity...\n')
  
  if (!client.config().token) {
    console.error('❌ ERROR: No API token found!')
    console.log('\n📋 To fix this:')
    console.log('1. Go to: https://sanity.io/manage')
    console.log('2. Click your project → "API" → "Tokens"')
    console.log('3. Create a token with "Editor" permissions')
    console.log('4. Add it to your .env file: SANITY_TOKEN=your-token-here')
    console.log('5. Run this script again\n')
    process.exit(1)
  }

  try {
    await addHero()
    await addContact()
    console.log('\n✅ Done! Your content has been added to Sanity.')
    console.log('📝 You can add more content (About, Projects, etc.) through:')
    console.log('   https://sanity.io/manage → Your Project → API → Vision')
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()

