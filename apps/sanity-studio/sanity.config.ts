import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {colorPicker} from '@headless.build/sanity-color-picker'
import {fontPicker} from '@headless.build/sanity-font-picker'

export default defineConfig({
  name: 'default',
  title: 'headfront-debug',

  projectId: 'e2u2hine',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), colorPicker(), fontPicker()],

  schema: {
    types: schemaTypes,
  },
})
