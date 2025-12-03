// Script to add all portfolio content to Sanity
// Run with: node scripts/add-all-content.mjs

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const token = process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN || ''

const client = createClient({
  projectId: 'dju5bkf8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: token,
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

async function addAbout() {
  return await createOrUpdate('about', {
    title: "Who I Am",
    personalStatement: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: "I'm a ", marks: [] },
          { _type: 'span', text: "business problem-solver", marks: ['strong'] },
          { _type: 'span', text: ". I don't fit neatly into one box—and that's by design.", marks: [] }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: "Most roles are either strategy (all thinking, no execution) or operations (all execution, no strategy). ", marks: [] },
          { _type: 'span', text: "I do both.", marks: ['strong'] },
          { _type: 'span', text: " I think clearly about complex business problems, then I execute relentlessly to build solutions that scale.", marks: [] }
        ]
      }
    ],
    thinkingPrinciples: [
      { title: "First Principles", description: "Don't accept the problem as stated. Dig into root causes. What are we really trying to solve?", icon: "Brain" },
      { title: "User-First", description: "The best solutions solve real problems for real people. I obsess over understanding what users actually need, not what we assume they want.", icon: "Users" },
      { title: "Business Discipline", description: "Impact isn't just about growth—it's about sustainable unit economics. I think about P&L, sustainability, and scalability.", icon: "TrendingUp" },
      { title: "Clarity Over Complexity", description: "Complex ideas are often poorly understood ideas. I distill complex problems into clear frameworks that teams can act on.", icon: "Target" },
      { title: "Execution Mindset", description: "Strategy without execution is hallucination. I build things. I ship. I iterate based on real feedback.", icon: "Zap" }
    ],
    achievements: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Scaled a marketplace category from zero to 50% MoM growth by combining user research, vendor strategy, and relentless optimization. Improved unit economics in the process.", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Turned around unit economics across hardware, wholesale, and retail by rethinking operations, building scalable systems, and making hard tradeoff decisions.", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Built and scaled a sustainable fashion brand from scratch—navigating supply chains, multi-channel launches, and complex operations. Learned hard lessons about product-market fit when the unit economics don't work.", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Executed high-stakes negotiations ($860K competitive wins, global pricing strategy) by understanding what customers actually needed and positioning accordingly.", marks: [] }]
      }
    ],
    valueProposition: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "I'm best suited for organizations in growth mode that need someone who can:", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Think clearly about what really matters (and what's just noise)", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Own outcomes end-to-end—strategy AND execution", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Scale businesses sustainably (not just chase vanity metrics)", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Build and lead teams through ambiguity and complexity", marks: [] }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Make clear tradeoff decisions with incomplete information", marks: [] }]
      }
    ],
    interests: ['📚 Reading', '🧬 Bio-hacking', '💪 Fitness', '⚽ Football']
  })
}

async function addSkills() {
  return await createOrUpdate('skills', {
    productSkills: [
      "Product Strategy & Roadmapping",
      "User Research & Data Analysis",
      "Wireframing & Prototyping",
      "A/B Testing & Growth Experiments",
      "Agile/Scrum Methodologies",
      "Product-Market Fit Validation",
      "Feature Prioritization",
      "User Journey Mapping"
    ],
    technicalSkills: [
      "SQL & Data Analysis",
      "HTML, CSS, JavaScript",
      "Java & Verilog HDL",
      "Shopify & E-commerce Platforms",
      "Amazon Seller Central",
      "Google Analytics & Mixpanel",
      "Figma & Adobe XD",
      "Git & Version Control"
    ],
    businessSkills: [
      "P&L Management",
      "Digital Marketing (Meta Ads, Google Ads)",
      "Vendor/Partner Management",
      "Sales Strategy & Execution",
      "Financial Modeling & Valuation",
      "Go-to-Market Strategy",
      "Competitive Analysis",
      "Stakeholder Management"
    ],
    certifications: [
      "Private Equity & Venture Capital - Bocconi University",
      "PGP in Product Management - Accredian",
      "Financial Modelling & Valuation - Udemy",
      "Digital Product Design - Udemy",
      "Facebook & Instagram Ads - Young Urban Project"
    ]
  })
}

async function addWorkExperiences() {
  const experiences = [
    {
      role: "Freelance Consultant",
      company: "Strategic Advisory & Product Design",
      duration: "Sep 2025 - Present",
      headline: "Helping businesses solve strategic problems through clarity and execution",
      story: "I advise early-stage fintech and marketplace founders on product-market fit, unit economics, and go-to-market strategy. I design product strategies, validate concepts, and optimize operations for profitability. Recent work includes designing marketplace go-to-market strategies, optimizing lending product unit economics, and building B2B SaaS roadmaps based on financial impact.",
      learnings: [
        "Strategic advisory for product-market fit and validation",
        "Unit economics analysis and P&L optimization",
        "Go-to-market strategy and customer acquisition planning",
        "Operations scaling and financial modeling",
        "Product design for marketplaces, fintech, and B2B SaaS"
      ],
      clarity: "The best consulting isn't about giving answers—it's about asking the right questions that help founders see their business clearly.",
      order: 0
    },
    {
      role: "Founder",
      company: "SWNCK",
      duration: "Jun 2023 - Sep 2025",
      headline: "Building a Business Taught Me What Real Problems Look Like",
      story: "I founded SWNCK to test whether I could build a scalable business by combining operational rigor with user-first thinking.",
      learnings: [
        "Product-market fit isn't about building the perfect product. It's about finding a customer segment + channel + positioning where unit economics work sustainably.",
        "I successfully navigated complex problems: built relationships with 40+ suppliers across 5 cities, negotiated terms for favorable pricing and quality, scaled across 4 channels (Shopify + Amazon + Flipkart + affiliates), and optimized operations to reduce CAC.",
        "But I made a strategic decision: the unit economics for our target customer (eco-conscious fashion buyers) didn't work at scale. The right call was to exit and preserve capital, not waste resources chasing a broken model."
      ],
      clarity: "I learned that desirability requires craftsmanship, but sustainability requires unit economics. You can build the most beautiful product, execute flawlessly, and still fail because the customer's willingness to pay doesn't match your cost to serve. That's not a product failure—it's market clarity. And having that clarity early saves resources, capital, and heartbreak.",
      order: 1
    },
    {
      role: "Category Head",
      company: "CityMall",
      duration: "Feb 2023 - Jun 2023",
      headline: "How Clarity of Thought Compounds Into Growth",
      story: "I took over a struggling Men's Fashion category and grew it 50% MoM by combining user research, vendor strategy, and financial discipline.",
      learnings: [
        "User insight: Why were customers not finding what they wanted? I dug into search behavior, discovered gaps between what customers looked for vs. what was available.",
        "Supply-side strategy: Why weren't vendors adopting the platform? I understood their pain (complex onboarding, unclear payouts) and fixed it. Result: 130+ quality vendors in months.",
        "Demand-side optimization: I optimized search, collections, and product assortment based on what actually sold—not what I thought should sell. AOV improved 20%.",
        "Financial discipline: I improved CM1 from -11% to -5% by understanding that growth without sustainable unit economics is just noise."
      ],
      clarity: "Complex problems dissolve when you break them down to first principles and stay obsessed with understanding the actual user.",
      order: 2
    },
    {
      role: "Brand Specialist",
      company: "Amazon",
      duration: "Oct 2021 - Jan 2023",
      headline: "Learning to Optimize for What Actually Matters",
      story: "I managed $1.2M+ in ad spends and led catalog quality initiatives for premium brands like Microsoft.",
      learnings: [
        "Data-driven decision making: Achieved 3% QoQ platform share gain by continuously analyzing conversion funnels, identifying friction points, and testing improvements.",
        "Pre-purchase UX optimization: Led initiatives to improve product messaging and purchase journey—because clarity converts better than clever copy.",
        "Ad spend optimization: Learned that throwing money at ads doesn't work. Understanding customer intent and optimizing for the right metrics does."
      ],
      clarity: "Performance marketing is about understanding what users need, not just bidding higher.",
      order: 3
    },
    {
      role: "General Manager",
      company: "Universal Batteries",
      duration: "Feb 2021 - Oct 2021",
      headline: "Operational Excellence + User-First Thinking = Sustainability",
      story: "I improved unit economics across hardware, wholesale, and retail by rethinking how the business operated.",
      learnings: [
        "Cash flow was dying (payback period 40+ days). I analyzed the entire cycle—from ordering to fulfillment to payment collection. Result: 25-day payback. That's cash flow health.",
        "Retail was broken: No scalable way to reach customers. I built an e-commerce store that let us reach beyond geographic limits and sell at better margins.",
        "Customer needs were being underserved: I sized and executed solar/power backup solutions based on what customers actually needed, not what we wanted to sell."
      ],
      clarity: "I learned that the distance between insight and impact is execution. At Amazon, I realized that the difference between good and great companies isn't analysis, it's operationalization. You can have perfect insights, but if you can't turn them into structured processes, documented playbooks, and team behaviors, they disappear when you move on. I became obsessed with this: How do I extract a behavioral insight from data? How do I test it? How do I make it permanent so it compounds? This is how you scale impact beyond your own effort.",
      order: 4
    },
    {
      role: "Account Executive",
      company: "Dell Technologies",
      duration: "Mar 2019 - Feb 2021",
      headline: "Thinking Like a Strategist While Executing Like an Operator",
      story: "I didn't just 'make quota.' I learned to think strategically about customer needs while executing relentlessly on business outcomes.",
      learnings: [
        "Pricing is strategy: Global contracts with Franklin Templeton and Facebook taught me that how you price signals your value. Pricing isn't a sales tactic—it's a product decision.",
        "Customer strategy matters more than closing speed: Instead of hunting quick wins, I planned deep customer strategies. I understood buying cycles, influencers, and actual pain points.",
        "Competitive strategy + execution: I orchestrated $860K competitive wins by understanding our real advantage, the customer's actual needs, and how to position accordingly. It wasn't luck—it was strategic + relentless."
      ],
      clarity: "The best sales come from solving real problems, not from better pitch decks.",
      order: 5
    }
  ]

  console.log('\n📝 Adding Work Experiences...')
  for (const exp of experiences) {
    await createOrUpdate('workExperience', exp)
  }
}

async function main() {
  console.log('🚀 Adding content to Sanity...\n')
  
  if (!token) {
    console.error('❌ ERROR: No API token found!')
    console.log('\n📋 To fix this:')
    console.log('1. Go to: https://sanity.io/manage')
    console.log('2. Click your project → "API" → "Tokens"')
    console.log('3. Create a token with "Editor" permissions')
    console.log('4. Add it to your .env file: SANITY_TOKEN=your-token-here')
    console.log('5. Run this script again\n')
    process.exit(1)
  }
  
  console.log('✅ Token found, connecting to Sanity...\n')

  try {
    await addHero()
    await addContact()
    await addAbout()
    await addSkills()
    await addWorkExperiences()
    console.log('\n✅ Done! All your content has been added to Sanity!')
    console.log('\n📝 What was added:')
    console.log('   ✅ Hero section')
    console.log('   ✅ Contact information')
    console.log('   ✅ About section')
    console.log('   ✅ Skills & Certifications')
    console.log('   ✅ Work Experience (6 entries)')
    console.log('\n💡 You can still add Projects and Books later through:')
    console.log('   https://sanity.io/manage → Your Project → API → Vision')
    console.log('\n🎉 Your portfolio will now fetch content from Sanity!')
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('token')) {
      console.log('\n💡 Make sure your SANITY_TOKEN is set in .env file')
    }
    process.exit(1)
  }
}

main()

