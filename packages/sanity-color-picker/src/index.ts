import {definePlugin} from 'sanity'
import {color} from './schemas/color'
import pkgjson from '../package.json'

const pluginName = pkgjson.name

export const colorPicker = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [color],
    },
  }
})
