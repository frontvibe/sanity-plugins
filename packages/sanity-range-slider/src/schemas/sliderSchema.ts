import {defineType} from 'sanity'
import {RangeSliderInput} from '../components/RangeSlider'

/**
 * @public
 */
export const slideTypeName = 'rangeSlider' as const

export const slider = defineType({
  name: slideTypeName,
  type: 'number',
  components: {
    input: RangeSliderInput,
  },
})
