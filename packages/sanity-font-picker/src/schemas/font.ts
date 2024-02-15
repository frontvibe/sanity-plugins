import {StringIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import ArrayMaxItems from '../components/ArrayMaxItems'

export const font = defineType({
  name: 'typography',
  type: 'document',
  icon: StringIcon,
  title: 'Typography',
  fields: [
    defineField({
      type: 'object',
      name: 'heading',
      fields: [
        defineFontField({
          name: 'font',
        }),
        {
          type: 'boolean',
          name: 'capitalize',
        },
        {
          type: 'rangeSlider',
          name: 'baseSize',
          options: {
            suffix: 'px',
            min: 20,
            max: 90,
          },
          initialValue: 50,
        },
        {
          type: 'rangeSlider',
          name: 'letterSpacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
          },
          initialValue: 0,
        },
        {
          type: 'rangeSlider',
          name: 'lineHeight',
          options: {
            min: 0.8,
            max: 2,
            step: 0.025,
          },
          initialValue: 1.2,
        },
      ],
      options: {
        collapsible: true,
      },
      initialValue: {
        baseSize: 50,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    }),
    defineField({
      type: 'object',
      name: 'body',
      fields: [
        defineFontField({
          name: 'font',
        }),
        {
          type: 'rangeSlider',
          name: 'baseSize',
          options: {
            suffix: 'px',
            min: 12,
            max: 38,
          },
          initialValue: 16,
        },
        {
          type: 'rangeSlider',
          name: 'letterSpacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
          },
          initialValue: 0,
        },
        {
          type: 'rangeSlider',
          name: 'lineHeight',
          options: {
            min: 0.8,
            max: 2,
            step: 0.2,
          },
          initialValue: 1.2,
        },
      ],
      options: {
        collapsible: true,
      },
      initialValue: {
        baseSize: 16,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    }),
    defineField({
      type: 'object',
      name: 'extra',
      fields: [
        defineFontField({
          name: 'font',
        }),
        {
          type: 'boolean',
          name: 'capitalize',
        },
        {
          type: 'rangeSlider',
          name: 'baseSize',
          options: {
            suffix: 'px',
            min: 12,
            max: 150,
          },
        },
        {
          type: 'rangeSlider',
          name: 'letterSpacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
          },
        },
        {
          type: 'rangeSlider',
          name: 'lineHeight',
          options: {
            min: 0.8,
            max: 2,
            step: 0.2,
          },
        },
      ],
      initialValue: {
        baseSize: 16,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
      options: {
        collapsible: true,
      },
    }),
  ],
  preview: {
    prepare: () => ({title: 'Typography'}),
  },
})

function defineFontField(args: {name: string}) {
  const {name} = args

  return defineField({
    name,
    type: 'array',
    of: [{type: 'fontCategory'}],
    components: {input: ArrayMaxItems},
    validation: (Rule: any) => Rule.max(1),
  })
}
