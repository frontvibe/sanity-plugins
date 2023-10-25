> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install @headless.build/sanity-color-picker
yarn add @headless.build/sanity-color-picker
pnpm install @headless.build/sanity-color-picker
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {colorPicker} from '@headless.build/sanity-color-picker'

export default defineConfig({
  //...
  plugins: [colorPicker()],
})
```

## License

[MIT](LICENSE) © Thomas Cristina de Carvalho

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
