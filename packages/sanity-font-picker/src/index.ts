import {definePlugin} from 'sanity'
import {font} from './schemas/font'
import pkgjson from '../package.json'
import fontAsset from './schemas/fontAsset'
import fontCategory from './schemas/fontCategory'

const pluginName = pkgjson.name

export const fontPicker = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [font, fontAsset, fontCategory],
    },
  }
})
