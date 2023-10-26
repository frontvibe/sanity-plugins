import {File, defineType} from 'sanity'

function validateFont(args: {Rule: any; mimeType: 'woff2' | 'woff' | 'ttf'}) {
  const {Rule, mimeType} = args

  return Rule.custom((file: File) => {
    if (!file || !file.asset) {
      return true
    }

    const ref = file.asset?._ref

    if (ref?.endsWith(`-${mimeType}`)) {
      return true
    }

    return `Only .${mimeType} files are allowed.`
  })
}

export default defineType({
  name: 'fontInput',
  type: 'object',
  fields: [
    {
      type: 'file',
      name: 'woff2',
      title: 'WOFF2',
      description:
        'Strongly recommended as woff2 is the most modern font format which is lighter and faster to load.',
      validation: (Rule: any) =>
        validateFont({
          mimeType: 'woff2',
          Rule,
        }),
    },
    {
      type: 'file',
      name: 'woff',
      title: 'WOFF',
      description: "Fallback for older browsers that don't support woff2.",
      validation: (Rule: any) =>
        validateFont({
          mimeType: 'woff',
          Rule,
        }),
    },
    {
      type: 'file',
      name: 'ttf',
      title: 'TTF',
      description: "Fallback for older browsers that don't support woff2 or woff.",
      validation: (Rule: any) =>
        validateFont({
          mimeType: 'ttf',
          Rule,
        }),
    },
    {
      type: 'string',
      name: 'fontStyle',
      title: 'Font style',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Italic', value: 'italic'},
        ],
        layout: 'radio',
      },
    },
    {
      type: 'number',
      name: 'fontWeight',
      title: 'Font weight',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          {title: 'Thin - 100', value: 100},
          {title: 'Extralight - 200', value: 200},
          {title: 'Light - 300', value: 300},
          {title: 'Normal - 400', value: 400},
          {title: 'Medium - 500', value: 500},
          {title: 'Semibold - 600', value: 600},
          {title: 'Bold - 700', value: 700},
          {title: 'Extrabold - 800', value: 800},
          {title: 'Black - 900', value: 900},
        ],
        layout: 'dropdown',
      },
    },
  ],
  preview: {
    select: {
      title: 'fontWeight',
      subtitle: 'fontStyle',
    },
    prepare({title, subtitle}: {title: string; subtitle: string}) {
      return {
        title: `Weight - ${title}`,
        subtitle: `Style - ${subtitle}`,
      }
    },
  },
})
