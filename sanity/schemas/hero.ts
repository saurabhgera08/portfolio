import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Highlighted Text (in headline)',
      type: 'string',
      description: 'The text that will be highlighted in gradient',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA Button Text',
      type: 'string',
      default: 'Explore My Work',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA Button Text',
      type: 'string',
      default: 'Get in Touch',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'highlight', type: 'boolean', title: 'Highlight (colored)', default: false },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
})

