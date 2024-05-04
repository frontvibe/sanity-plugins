import {ObjectDefinition, ObjectInputProps} from 'sanity'
import {z} from 'zod'

import {ColorSchema} from './components/ColorPickerInput'
import {colorTypeName} from './schemas/color'

export {ColorSchema, colorTypeName}

/** @public */
export type ColorInputValue = z.infer<typeof ColorSchema>

/** @public */
export type ColorInputProps = ObjectInputProps<ColorInputValue>

/** @public */
export interface ColorDefinition extends Omit<ObjectDefinition, 'type' | 'fields'> {
  type: typeof colorTypeName
}

declare module '@sanity/types' {
  // makes type: 'color' narrow correctly when using defineType/defineField/defineArrayMember
  export interface IntrinsicDefinitions {
    colorPicker: ColorDefinition
  }
}
