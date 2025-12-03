import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills & Certifications',
  type: 'document',
  fields: [
    defineField({
      name: 'productSkills',
      title: 'Product Management Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technicalSkills',
      title: 'Technical Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'businessSkills',
      title: 'Business & Growth Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

