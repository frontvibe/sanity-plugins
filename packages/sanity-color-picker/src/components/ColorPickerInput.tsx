import {Box, Card, Dialog, Flex, Text, TextInput} from '@sanity/ui'
import type {HSBColor} from '@shopify/polaris'
import {ColorPicker, hexToRgb, hsbToRgb, rgbToHex, rgbToHsb} from '@shopify/polaris'
import _ from 'lodash'
import {FormEvent, useCallback, useMemo, useState} from 'react'
import {ObjectInputProps, set} from 'sanity'
import {z} from 'zod'

const hexaRegex = /^#([0-9A-Fa-f]{3}){1,2}$/

/** @public */
export const ColorSchema = z.object({
  hex: z.string().refine((value) => hexaRegex.test(value)),
  hsl: z.object({
    h: z.number(),
    s: z.number(),
    l: z.number(),
  }),
  rgb: z.object({
    r: z.number(),
    g: z.number(),
    b: z.number(),
  }),
})

const debounce = _.debounce

function parseColorPickerValue(value: any) {
  try {
    ColorSchema.parse(value)
  } catch (error) {
    return false
  }

  return true
}

export function ColorPickerInput(props: ObjectInputProps) {
  const {onChange, value} = props
  const [isDialogOpen, setDialogOpen] = useState(false)

  const toggleDialog = useCallback(() => {
    setDialogOpen(!isDialogOpen)
  }, [setDialogOpen, isDialogOpen])

  return !value || parseColorPickerValue(value) ? (
    <>
      <Flex align="center" gap={3}>
        <div
          role="button"
          onClick={toggleDialog}
          style={{
            cursor: 'pointer',
            border: '1px solid',
            borderColor: 'var(--card-border-color)',
            height: '2.5rem',
            width: '2.5rem',
            borderRadius: '9999px',
            overflow: 'hidden',
            backgroundColor: props.value?.hex || 'transparent',
            backgroundImage: props.value?.hex
              ? 'none'
              : "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAvSURBVHgBrY2xDQAwDMJIj+H/d+CZtCNbhsYbyJJLUiMgmRMHA/9C9SMP28uJUbg7LQqVKef1WwAAAABJRU5ErkJggg==')",
          }}
        />
        <Text
          style={{
            textTransform: props.value?.hex ? 'uppercase' : 'none',
          }}
        >
          {props.value?.hex || 'Choose a color'}
        </Text>
      </Flex>
      {isDialogOpen && (
        <ColorPickerDialog toggleDialog={toggleDialog} onChange={onChange} value={value} />
      )}
    </>
  ) : (
    <Flex>
      <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="critical">
        <Text align="center" size={[2, 2, 3]}>
          Invalid initial value
        </Text>
      </Card>
    </Flex>
  )
}

function ColorPickerDialog(props: {
  toggleDialog: () => void
  onChange: (value: any) => void
  value: any
}) {
  const {toggleDialog, onChange, value} = props
  const [color, setColor] = useState<HSBColor>({
    hue: typeof value?.hsl.h === 'undefined' ? 0 : value?.hsl.h,
    brightness: typeof value?.hsl.l === 'undefined' ? 1 : value?.hsl.l,
    saturation: typeof value?.hsl.s === 'undefined' ? 0 : value?.hsl.s,
  })

  const [hexInputValue, setHexInputValue] = useState<string>(rgbToHex(hsbToRgb(color)))
  const emitSetColor = useCallback(
    (nextColor: HSBColor) => {
      const rgb = hsbToRgb(nextColor)
      const hex = rgbToHex(rgb)

      onChange(
        set({
          hex,
          hsl: {
            h: nextColor.hue,
            s: nextColor.saturation,
            l: nextColor.brightness,
          },
          rgb: {
            r: rgb.red,
            g: rgb.green,
            b: rgb.blue,
          },
        }),
      )
    },
    [onChange],
  )

  // Debounce the onChange event for 100ms
  const debouncedColorChange = useMemo(() => debounce(emitSetColor, 100), [emitSetColor])

  const handleColorPickerChange = useCallback(
    (newColor: HSBColor) => {
      const rgb = hsbToRgb(newColor)
      const hex = rgbToHex(rgb)

      // Update hexadecimal input in real time
      setHexInputValue(hex)
      // Update polaris color picker in real time
      setColor(newColor)
      // Debounce the onChange event to update value in Sanity dataset
      debouncedColorChange(newColor)
    },
    [debouncedColorChange],
  )

  return (
    <Dialog header="Pick a color" id="dialog-color" width={1} onClose={toggleDialog} zOffset={1000}>
      <Box padding={4}>
        <Flex justify="center" align="center">
          <div>
            <ColorPicker fullWidth onChange={handleColorPickerChange} color={color} />
            <HexInput
              value={value}
              color={color}
              onChange={onChange}
              hexInputValue={hexInputValue}
              setHexInputValue={setHexInputValue}
              setColor={setColor}
            />
          </div>
        </Flex>
      </Box>
    </Dialog>
  )
}

function HexInput(props: {
  value: any
  color: HSBColor
  onChange: (value: any) => void
  hexInputValue: string
  setHexInputValue: (value: any) => void
  setColor: (value: any) => void
}) {
  const {value, color, onChange, hexInputValue, setHexInputValue, setColor} = props
  const [validity, setValidity] = useState<string | undefined>(undefined)

  const validateHex = useCallback(
    (value: string) => {
      if (hexaRegex.test(value)) {
        setValidity(undefined)
        const rgb = hexToRgb(value)
        const hsb = rgbToHsb(rgb)

        onChange(
          set({
            hex: value,
            hsl: {
              h: hsb.hue,
              s: hsb.saturation,
              l: hsb.brightness,
            },
            rgb: {
              r: rgb.red,
              g: rgb.green,
              b: rgb.blue,
            },
          }),
        )

        setColor({
          hue: hsb.hue,
          saturation: hsb.saturation,
          brightness: hsb.brightness,
        })

        return true
      }

      setValidity('Invalid hexadecimal value')
      return false
    },
    [hexInputValue, onChange, setColor, value, setHexInputValue],
  )

  const handleHexInputChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setHexInputValue(e.currentTarget.value)
      validateHex(e.currentTarget.value)
    },
    [setHexInputValue, validateHex],
  )

  return (
    <Flex paddingTop={2} align="center" gap={3}>
      <div
        style={{
          backgroundColor: rgbToHex(hsbToRgb(color)),
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '5px',
          border: '1px solid',
          borderColor: 'var(--card-border-color)',
        }}
      />
      <TextInput
        style={{
          textTransform: 'uppercase',
        }}
        customValidity={validity}
        onChange={(e) => handleHexInputChange(e)}
        value={hexInputValue}
      />
    </Flex>
  )
}
