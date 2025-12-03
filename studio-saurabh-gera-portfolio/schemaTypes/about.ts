import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      default: 'Who I Am',
    }),
    defineField({
      name: 'personalStatement',
      title: 'Personal Statement',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thinkingPrinciples',
      title: 'Thinking Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            { name: 'icon', type: 'string', title: 'Icon Name (from lucide-react)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'valueProposition',
      title: 'Where I\'m Valuable',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'interests',
      title: 'Personal Interests',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

