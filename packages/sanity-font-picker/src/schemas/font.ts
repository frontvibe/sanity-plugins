import {defineField, defineType} from 'sanity'

export const font = defineType({
  name: 'fontPicker',
  type: 'document',
  title: 'Typography',
  fields: [
    defineFontField({
      title: 'Heading Font',
      name: 'heading',
    }),
    defineFontField({
      title: 'Body Font',
      name: 'body',
    }),
    defineFontField({
      title: 'Extra Font',
      name: 'extra',
    }),
  ],
  preview: {
    prepare() {
      const title = 'Typography settings'
      return {
        title,
      }
    },
  },
})

function defineFontField(args: {title: string; name: string}) {
  const {title, name} = args

  return defineField({
    title,
    name,
    type: 'object',
    fields: [
      {
        type: 'string',
        name: 'fontFamily',
        title: 'Font family',
      },
      {
        type: 'string',
        name: 'fontCategory',
        title: 'Font category',
        description:
          'Select a font category (will be used to display a fallback stystem font while loading the font files).',
        options: {
          list: [
            {
              title: 'Serif',
              value: 'serif',
            },
            {
              title: 'Sans-serif',
              value: 'sans-serif',
            },
          ],
          layout: 'radio',
        },
        initialValue: 'sans-serif',
      },
      {
        type: 'boolean',
        name: 'antialised',
        title: 'Antialising',
        description: 'Enable antialising to smooth the font.',
      },
      {
        type: 'array',
        name: 'fontFiles',
        title: 'Font files',
        of: [{type: 'fontInput'}],
      },
    ],
  })
}
