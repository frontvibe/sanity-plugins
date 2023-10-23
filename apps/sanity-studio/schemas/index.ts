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
      type: 'polarisColorPicker',
      name: 'background',
    },
  ],
})

export const schemaTypes = [color]
