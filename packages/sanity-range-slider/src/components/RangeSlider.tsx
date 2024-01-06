import {RangeSlider} from '@shopify/polaris'
import {CSSProperties, ChangeEvent, useCallback, useMemo, useState} from 'react'
import {NumberInputProps, set} from 'sanity'
import {Flex, TextInput, useTheme} from '@sanity/ui'
import _ from 'lodash'

const debounce = _.debounce

type RangeSliderInputProps = NumberInputProps & {
  schemaType: {
    options?: {
      suffix?: string
      min?: number
      max?: number
      step?: number
    }
  }
}

export function RangeSliderInput(props: RangeSliderInputProps) {
  const {schemaType, value, onChange} = props
  const {options} = schemaType
  const suffix = options?.suffix
  const min = options?.min
  const max = options?.max
  const step = options?.step || 1
  const [rangeValue, setRangeValue] = useState(value || 0)

  const emitSetValue = useCallback(
    (nextValue: number) => {
      onChange(set(nextValue))
    },
    [onChange],
  )

  const debouncedSliderChange = useMemo(() => debounce(emitSetValue, 100), [emitSetValue])

  const handleRangeSliderChange = useCallback(
    (sliderValue: number) => {
      setRangeValue(sliderValue)
      debouncedSliderChange(sliderValue)
    },
    [debouncedSliderChange, setRangeValue],
  )
  const {sanity: sanityTheme} = useTheme()

  return (
    <Flex
      align={'center'}
      gap={4}
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
      <div
        style={{
          flex: '1',
        }}
      >
        <RangeSlider
          label="Slider"
          labelHidden
          output
          step={step}
          min={min || 0}
          max={max || 100}
          value={rangeValue}
          onChange={handleRangeSliderChange}
        />
      </div>
      <NumberInput
        value={rangeValue}
        min={min}
        max={max}
        step={step}
        suffix={suffix || ''}
        setValue={setRangeValue}
        onChange={onChange}
      />
    </Flex>
  )
}

function NumberInput(props: {
  suffix?: string
  min?: number
  max?: number
  value: number
  step: number
  setValue: (value: number) => void
  onChange: RangeSliderInputProps['onChange']
}) {
  const {suffix, min, max, value, setValue, onChange, step} = props

  const emitSetValue = useCallback((nextValue: number) => onChange(set(nextValue)), [onChange])

  const debouncedInputChange = useMemo(() => debounce(emitSetValue, 100), [emitSetValue])

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value ? parseFloat(e.currentTarget.value) : 0)
      debouncedInputChange(e.currentTarget.value ? parseFloat(e.currentTarget.value) : 0)
    },
    [setValue, debouncedInputChange],
  )

  return (
    <TextInput
      style={{
        maxWidth: '8rem',
      }}
      min={min}
      max={max}
      step={step}
      onChange={handleInputChange}
      type="number"
      value={value}
      iconRight={<p>{suffix}</p>}
    />
  )
}

NumberInput.defaultProps = {
  suffix: '',
  min: 0,
  max: 100,
}
