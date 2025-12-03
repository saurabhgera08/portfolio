import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero Section')
        .child(S.document().schemaType('hero').documentId('hero')),
      S.divider(),
      S.listItem()
        .title('About Section')
        .child(S.document().schemaType('about').documentId('about')),
      S.divider(),
      S.listItem()
        .title('Work Experience')
        .child(
          S.documentTypeList('workExperience')
            .title('Work Experience')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Projects')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Books')
        .child(
          S.documentTypeList('book')
            .title('Books')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Skills & Certifications')
        .child(S.document().schemaType('skills').documentId('skills')),
      S.divider(),
      S.listItem()
        .title('Contact Information')
        .child(S.document().schemaType('contact').documentId('contact')),
    ])
