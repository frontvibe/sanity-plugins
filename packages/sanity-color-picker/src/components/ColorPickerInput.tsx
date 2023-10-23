import type {HSBAColor} from '@shopify/polaris'

import {useCallback, useMemo, useState} from 'react'
import _ from 'lodash'
import {ObjectInputProps, set} from 'sanity'
import {Box, Dialog, Flex, Text, TextInput} from '@sanity/ui'
import {ColorPicker, hexToRgb, hsbToRgb, rgbToHex, rgbToHsb} from '@shopify/polaris'

import '@shopify/polaris/build/esm/styles.css'

const debounce = _.debounce

export function ColorPickerInput(props: ObjectInputProps) {
  const {onChange, value} = props
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState<HSBAColor>({
    hue: value?.hsl.h || 0,
    brightness: value?.hsl.l || 1,
    saturation: value?.hsl.s || 0.7,
    alpha: value?.alpha || 1,
  })
  const [hexInput, setHexInput] = useState<string>(rgbToHex(hsbToRgb(color)))

  const emitSetColor = useCallback(
    (nextColor: HSBAColor) => {
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
          alpha: nextColor.alpha,
        }),
      )
    },
    [onChange],
  )

  const debouncedColorChange = useMemo(() => debounce(emitSetColor, 100), [emitSetColor])

  const handleChange = useCallback(
    (newColor: HSBAColor) => {
      const rgb = hsbToRgb(newColor)
      const hex = rgbToHex(rgb)

      setHexInput(hex)
      setColor(newColor)
      debouncedColorChange(newColor)
    },
    [debouncedColorChange],
  )

  const validateHex = () => {
    const pattern = /^#([0-9A-Fa-f]{3}){1,2}$/

    if (pattern.test(hexInput)) {
      const rgb = hexToRgb(hexInput)
      const hsb = rgbToHsb(rgb)

      onChange(
        set({
          hex: hexInput,
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
          alpha: value?.alpha,
        }),
      )

      setColor({
        hue: hsb.hue,
        saturation: hsb.saturation,
        brightness: hsb.brightness,
        alpha: value?.alpha,
      })

      return true
    }

    setHexInput(value?.hex)
    return false
  }

  return (
    <>
      <Flex align="center" gap={3}>
        <div
          role="button"
          onClick={() => setOpen(true)}
          style={{
            cursor: 'pointer',
            border: '1px solid',
            borderColor: 'var(--card-border-color)',
            height: '2.5rem',
            width: '2.5rem',
            borderRadius: '9999px',
            overflow: 'hidden',
            backgroundColor: props.value?.hex || '#000000',
          }}
        />
        <Text
          style={{
            textTransform: 'uppercase',
          }}
        >
          {props.value?.hex || '#000000'}
        </Text>
      </Flex>
      {open && (
        <Dialog
          header="Pick a color"
          id="dialog-color"
          width={1}
          onClose={() => setOpen(false)}
          zOffset={1000}
        >
          <Box padding={4}>
            <Flex justify="center" align="center">
              <div>
                <ColorPicker fullWidth onChange={handleChange} color={color} />
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
                    onBlur={() => validateHex()}
                    onChange={(e) => setHexInput(e.currentTarget.value)}
                    value={hexInput}
                  />
                </Flex>
              </div>
            </Flex>
          </Box>
        </Dialog>
      )}
    </>
  )
}
