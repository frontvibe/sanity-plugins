import {definePlugin} from 'sanity'
import {font} from './schemas/font'
import pkgjson from '../package.json'
import fontInput from './schemas/fontInput'

const pluginName = pkgjson.name

export const fontPicker = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [font, fontInput],
    },
  }
})
