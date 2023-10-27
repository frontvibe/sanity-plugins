import {StringIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import ArrayMaxItems from '../components/ArrayMaxItems'

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
    type: 'array',
    of: [{type: 'fontCategory'}],
    components: {input: ArrayMaxItems},
    validation: (Rule: any) => Rule.max(1),
  })
}
