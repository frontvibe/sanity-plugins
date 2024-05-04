import '@shopify/polaris/build/esm/styles.css'

import {definePlugin} from 'sanity'

import pkgjson from '../package.json'
import {slider} from './schemas/sliderSchema'

const pluginName = pkgjson.name

/** @public */
export const rangeSlider = definePlugin(() => {
  return {
    name: pluginName,
    schema: {
      types: [slider],
    },
  }
})
