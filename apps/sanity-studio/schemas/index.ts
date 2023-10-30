import {defineType} from 'sanity'

const color = defineType({
  name: 'color',
  title: 'Color',
  type: 'document',
  fields: [
    {
      type: 'string',
      name: 'name',
      initialValue: 'Scheme',
    },
    {
      type: 'colorPicker',
      name: 'background',
    },
    {
      type: 'rangeSlider',
      name: 'paddingTop',
      title: 'Top padding',
      options: {
        suffix: 'px',
        min: 0,
        max: 150,
      },
    },
    {
      type: 'rangeSlider',
      name: 'paddingBottom',
      title: 'Bottom padding',
      options: {
        suffix: 'px',
        min: 0,
        max: 150,
      },
    },
  ],
})

export const schemaTypes = [color]
