import '@shopify/polaris/build/esm/styles.css'

import {definePlugin} from 'sanity'

import pkgjson from '../package.json'
import {colorSchema} from './schemas/color'

const pluginName = pkgjson.name

/** @public */
export const colorPicker = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [colorSchema],
    },
  }
})

export * from './types'
