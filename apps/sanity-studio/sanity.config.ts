import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {colorPicker} from '@frontvibe/sanity-color-picker'
import {fontPicker} from '@frontvibe/sanity-font-picker'
import {rangeSlider} from '@frontvibe/sanity-plugin-range-slider'

export default defineConfig({
  name: 'default',
  title: 'headfront-debug',

  projectId: 'e2u2hine',
  dataset: 'production',

  plugins: [deskTool(), rangeSlider(), visionTool(), colorPicker(), fontPicker()],

  schema: {
    types: schemaTypes,
  },
})
