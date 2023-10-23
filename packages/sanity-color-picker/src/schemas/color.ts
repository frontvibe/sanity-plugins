import {defineType} from 'sanity'
import {ColorPickerInput} from '../components/ColorPickerInput'

export const color = defineType({
  name: 'polarisColorPicker',
  type: 'object',
  title: 'Color',
  components: {input: ColorPickerInput},
  fields: [
    {
      title: 'Hex',
      name: 'hex',
      type: 'string',
    },
  ],
})
