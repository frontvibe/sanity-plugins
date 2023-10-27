import {definePlugin} from 'sanity'
import {font} from './schemas/font'
import pkgjson from '../package.json'
import fontAsset from './schemas/fontAsset'

const pluginName = pkgjson.name

export const fontPicker = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [font, fontAsset],
    },
  }
})
