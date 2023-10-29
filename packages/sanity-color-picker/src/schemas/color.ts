import {defineType} from 'sanity'
import {ColorPickerInput} from '../components/ColorPickerInput'

/**
 * @public
 */
export const colorTypeName = 'colorPicker' as const

export const colorSchema = defineType({
  name: colorTypeName,
  type: 'object',
  title: 'Color',
  components: {input: ColorPickerInput},
  fields: [
    {
      name: 'hex',
      type: 'string',
      title: 'Hex',
    },
    {
      name: 'hsl',
      type: 'object',
      title: 'HSL',
      fields: [
        {
          name: 'h',
          type: 'number',
          title: 'H',
        },
        {
          name: 's',
          type: 'number',
          title: 'S',
        },
        {
          name: 'l',
          type: 'number',
          title: 'L',
        },
      ],
    },
    {
      name: 'rgb',
      type: 'object',
      title: 'RGB',
      fields: [
        {
          name: 'r',
          type: 'number',
          title: 'R',
        },
        {
          name: 'g',
          type: 'number',
          title: 'G',
        },
        {
          name: 'b',
          type: 'number',
          title: 'B',
        },
      ],
    },
  ],
})
