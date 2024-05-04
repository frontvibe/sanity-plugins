import {definePlugin} from 'sanity'

import pkgjson from '../package.json'
import {font} from './schemas/font'
import fontAsset from './schemas/fontAsset'
import fontCategory from './schemas/fontCategory'

const pluginName = pkgjson.name

/** @public */
export const fontPicker = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [font, fontAsset, fontCategory],
    },
  }
})
