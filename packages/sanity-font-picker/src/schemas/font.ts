import {StringIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const font = defineType({
  name: 'typography',
  type: 'document',
  icon: StringIcon,
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
        name: 'fontName',
        title: 'Font name',
      },
      {
        type: 'string',
        name: 'fontType',
        title: 'Font type',
        description:
          'Select a font type (will be used to display a fallback stystem font while loading the font assets).',
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
        name: 'antialiased',
        title: 'Antialiasing',
        description: 'Enable antialiasing to smooth the font.',
      },
      {
        type: 'array',
        name: 'fontAssets',
        title: 'Font assets',
        of: [{type: 'fontAsset'}],
      },
    ],
  })
}
