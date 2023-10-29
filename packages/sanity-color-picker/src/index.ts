import {definePlugin} from 'sanity'
import {colorSchema} from './schemas/color'
import pkgjson from '../package.json'

const pluginName = pkgjson.name

export const colorPicker = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [colorSchema],
    },
  }
})

export type {ColorInputValue, ColorInputProps, ColorDefinition} from './types'
