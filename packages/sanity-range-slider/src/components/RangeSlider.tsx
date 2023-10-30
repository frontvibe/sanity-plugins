import {RangeSlider} from '@shopify/polaris'
import {CSSProperties, useCallback, useMemo, useState} from 'react'
import {NumberInputProps, set} from 'sanity'
import {useTheme} from '@sanity/ui'
import _ from 'lodash'

const debounce = _.debounce

type RangeSliderInputProps = NumberInputProps & {
  schemaType: {
    options?: {
      suffix?: string
      min?: number
      max?: number
    }
  }
}

export function RangeSliderInput(props: RangeSliderInputProps) {
  const {schemaType, value, onChange} = props
  const {options} = schemaType
  const suffix = options?.suffix
  const min = options?.min
  const max = options?.max
  const [rangeValue, setRangeValue] = useState(value || 0)

  const emitSetValue = useCallback(
    (nextValue: number) => {
      onChange(set(nextValue))
    },
    [onChange],
  )

  const debouncedColorChange = useMemo(() => debounce(emitSetValue, 100), [emitSetValue])

  const handleRangeSliderChange = useCallback(
    (sliderValue: number) => {
      setRangeValue(sliderValue)
      debouncedColorChange(sliderValue)
    },
    [debouncedColorChange, setRangeValue],
  )
  const {sanity: sanityTheme} = useTheme()

  return (
    <div
      style={
        {
          '--p-color-bg-fill-brand': sanityTheme.color.dark
            ? sanityTheme.color.base.focusRing
            : sanityTheme.color.base.fg,
          '--p-color-bg-surface': sanityTheme.color.dark ? sanityTheme.color.base.border : '#fff',
          '--p-color-border': sanityTheme.color.base.border,
        } as CSSProperties
      }
    >
      <RangeSlider
        label="Slider"
        labelHidden
        output
        min={min || 0}
        max={max || 100}
        value={rangeValue}
        onChange={handleRangeSliderChange}
        suffix={
          <p
            style={{
              minWidth: '24px',
              textAlign: 'right',
            }}
          >
            {rangeValue}
            {suffix && `${suffix}`}
          </p>
        }
      />
    </div>
  )
}
