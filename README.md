> This project has been forked from [emoji-mart](https://www.npmjs.com/package/emoji-mart) which was written for React

<div align="center">
  <br><b>Emoji Mart (Vue)</b> is a Slack-like customizable<br>emoji picker component for VueJS
  <br><a href="https://jm-david.github.io/emoji-mart-vue">Demo</a> • <a href="https://github.com/jm-david/emoji-mart-vue/releases">Changelog</a>
  <br><img src="https://cloud.githubusercontent.com/assets/436043/17186519/9e71e8fe-5403-11e6-9314-21365c56a601.png">
</div>

## Installation

`npm install --save emoji-mart-vue`

## Components
### Picker
```js
import { Picker } from 'emoji-mart-vue'
```

```html
<picker set="emojione" />
<picker @select="addEmoji" />
<picker title="Pick your emoji…" emoji="point_up" />
<picker :style="{ position: 'absolute', bottom: '20px', right: '20px' }" />
<picker :i18n="{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }" />
```

| Prop | Required | Default | Description |
| ---- | :------: | ------- | ----------- |
| **autoFocus** | | `false` | Auto focus the search input when mounted |
| **color** | | `#ae65c5` | The top bar anchors select and hover color |
| **emoji** | | `department_store` | The emoji shown when no emojis are hovered, set to an empty string to show nothing |
| **include** | | `[]` | Only load included categories. Accepts [I18n categories keys](#i18n). Order will be respected, except for the `recent` category which will always be the first. |
| **exclude** | | `[]` | Don't load excluded categories. Accepts [I18n categories keys](#i18n). |
| **custom** | | `[]` | [Custom emojis](#custom-emojis) |
| **recent** | | | Pass your own frequently used emojis as array of string IDs |
| **emojiSize** | | `24` | The emoji width and height |
| **perLine** | | `9` | Number of emojis per line. While there’s no minimum or maximum, this will affect the picker’s width. This will set *Frequently Used* length as well (`perLine * 4`) |
| **i18n** | | [`{…}`](#i18n) | [An object](#i18n) containing localized strings |
| **native** | | `false` | Renders the native unicode emoji |
| **set** | | `apple` | The emoji set: `'apple', 'google', 'twitter', 'emojione', 'messenger', 'facebook'` |
| **sheetSize** | | `64` | The emoji [sheet size](#sheet-sizes): `16, 20, 32, 64` |
| **backgroundImageFn** | | ```((set, sheetSize) => …)``` | A Fn that returns that image sheet to use for emojis. Useful for avoiding a request if you have the sheet locally. |
| **emojisToShowFilter** | | ```((emoji) => true)``` | A Fn to choose whether an emoji should be displayed or not |
| **showPreview** | | `true` | Display preview section |
| **showSearch** | | `true` | Display search section |
| **showCategories** | | `true` | Display categories |
| **showSkinTones** | | `true` | Display skin tones picker |
| **emojiTooltip** | | `false` | Show emojis short name when hovering (title) |
| **skin** | | | Forces skin color: `1, 2, 3, 4, 5, 6` |
| **defaultSkin** | | `1` | Default skin color: `1, 2, 3, 4, 5, 6` |
| **pickerStyles** | | | Inline styles applied to the root element. Useful for positioning |
| **title** | | `Emoji Mart™` | The title shown when no emojis are hovered |
| **infiniteScroll** | | `true` | Scroll continuously through the categories |


| Event | Description |
| ----- | ----------- |
| **select** | Params: `(emoji) => {}` |
| **skin-change** | Params: `(skin) => {}` |


#### I18n
```js
search: 'Search',
notfound: 'No Emoji Found',
categories: {
  search: 'Search Results',
  recent: 'Frequently Used',
  people: 'Smileys & People',
  nature: 'Animals & Nature',
  foods: 'Food & Drink',
  activity: 'Activity',
  places: 'Travel & Places',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
  custom: 'Custom',
}
```

#### Sheet sizes
Sheets are served from [unpkg](https://unpkg.com), a global CDN that serves files published to [npm](https://www.npmjs.com).

| Set       | Size (`sheetSize: 16`) | Size (`sheetSize: 20`) | Size (`sheetSize: 32`) | Size (`sheetSize: 64`) |
| --------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| apple     | 334 KB                 | 459 KB                 | 1.08 MB                | 2.94 MB                |
| emojione  | 315 KB                 | 435 KB                 | 1020 KB                | 2.33 MB                |
| facebook  | 322 KB                 | 439 KB                 | 1020 KB                | 2.50 MB                |
| google    | 301 KB                 | 409 KB                 |  907 KB                | 2.17 MB                |
| messenger | 325 KB                 | 449 MB                 | 1.05 MB                | 2.69 MB                |
| twitter   | 288 KB                 | 389 KB                 |  839 KB                | 1.82 MB                |

#### Datasets
While all sets are available by default, you may want to include only a single set data to reduce the size of your bundle.

| Set       | Size (on disk) |
| --------- | -------------- |
| all       | 570 KB         |
| apple     | 484 KB         |
| emojione  | 485 KB         |
| facebook  | 421 KB         |
| google    | 483 KB         |
| messenger | 197 KB         |
| twitter   | 484 KB         |

To use these data files (or any other custom data), use the `NimblePicker` component:

```js
import data from 'emoji-mart-vue/data/messenger.json'
import { NimblePicker } from 'emoji-mart-vue'
```

```html
<nimble-picker set="messenger" :data="data" />
```

#### Examples of `emoji` object:
```js
{
  id: 'smiley',
  name: 'Smiling Face with Open Mouth',
  colons: ':smiley:',
  text: ':)',
  emoticons: [
    '=)',
    '=-)'
  ],
  skin: null,
  native: '😃'
}

{
  id: 'santa',
  name: 'Father Christmas',
  colons: ':santa::skin-tone-3:',
  text: '',
  emoticons: [],
  skin: 3,
  native: '🎅🏼'
}

{
  id: 'octocat',
  name: 'Octocat',
  colons: ':octocat',
  text: '',
  emoticons: [],
  custom: true,
  imageUrl: 'https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7'
}

```

### Emoji
```js
import { Emoji } from 'emoji-mart-vue'
```

```html
<emoji :emoji="{ id: 'santa', skin: 3 }" :size="16" />
<emoji emoji=":santa::skin-tone-3:" :size="16" />
<emoji emoji="santa" set="emojione" :size="16" />
```

| Prop | Required | Default | Description |
| ---- | :------: | ------- | ----------- |
| **emoji** | ✓ | | Either a string or an `emoji` object |
| **size** | ✓ | | The emoji width and height. |
| **native** | | `false` | Renders the native unicode emoji |
| [**fallback**](#unsupported-emojis-fallback) | | | Params: `(emoji) => {}` |
| **set** | | `apple` | The emoji set: `'apple', 'google', 'twitter', 'emojione'` |
| **sheetSize** | | `64` | The emoji [sheet size](#sheet-sizes): `16, 20, 32, 64` |
| **backgroundImageFn** | | ```((set, sheetSize) => `https://unpkg.com/emoji-datasource@3.0.0/sheet_${set}_${sheetSize}.png`)``` | A Fn that returns that image sheet to use for emojis. Useful for avoiding a request if you have the sheet locally. |
| **skin** | | `1` | Skin color: `1, 2, 3, 4, 5, 6` |
| **tooltip** | | `false` | Show emoji short name when hovering (title) |

| Event | Description |
| ----- | ----------- |
| **select** | Params: `(emoji) => {}` |
| **mouseenter** | Params: `(emoji) => {}` |
| **mouseleave** | Params: `(emoji) => {}` |

#### Unsupported emojis fallback
Certain sets don’t support all emojis (i.e. Messenger & Facebook don’t support `:shrug:`). By default the Emoji component will not render anything so that the emojis’ don’t take space in the picker when not available. When using the standalone Emoji component, you can however render anything you want by providing the `fallback` props.

To have the component render `:shrug:` you would need to:

```js
function emojiFallback(emoji) {
  return `:${emoji.short_names[0]}:`
}
```

```html
<emoji
  set="messenger"
  emoji="shrug"
  :size="24"
  :fallback="emojiFallback"
/>
```

## Custom emojis
You can provide custom emojis which will show up in their own category.

```js
import { Picker } from 'emoji-mart-vue'

const customEmojis = [
  {
    name: 'Octocat',
    short_names: ['octocat'],
    text: '',
    emoticons: [],
    keywords: ['github'],
    imageUrl: 'https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7'
  }
]
```

```html
<picker :custom="customEmojis" />
```

## Headless search
The `Picker` doesn’t have to be mounted for you to take advantage of the advanced search results.

```js
import { emojiIndex } from 'emoji-mart-vue'

emojiIndex.search('christmas').map((o) => o.native)
// => [🎄, 🎅🏼, 🔔, 🎁, ⛄️, ❄️]
```

### With custom data
```js
import data from 'emoji-mart-vue/data/messenger'
import { NimbleEmojiIndex } from 'emoji-mart-vue'

let emojiIndex = new NimbleEmojiIndex(data)
emojiIndex.search('christmas')
```

## Storage
By default EmojiMart will store user chosen skin and frequently used emojis in `localStorage`. That can however be overwritten should you want to store these in your own storage.

```js
import { store } from 'emoji-mart-vue'

store.setHandlers({
  getter: (key) => {
    // Get from your own storage (sync)
  },

  setter: (key, value) => {
    // Persist in your own storage (can be async)
  }
})
```

Possible keys are:

| Key | Value | Description |
| --- | ----- | ----------- |
| skin | `1, 2, 3, 4, 5, 6` | |
| frequently | `{ 'astonished': 11, '+1': 22 }` | An object where the key is the emoji name and the value is the usage count |
| last | 'astonished' | (Optional) Used by `frequently` to be sure the latest clicked emoji will always appear in the “Recent” category |

## Features
### Powerful search
#### Short name, name and keywords
Not only does **Emoji Mart** return more results than most emoji picker, they’re more accurate and sorted by relevance.

<img width="338" alt="summer" src="https://user-images.githubusercontent.com/436043/32532567-179f1be4-c400-11e7-885e-df6e9b52c665.png">

#### Emoticons
The only emoji picker that returns emojis when searching for emoticons.

<img width="338" alt="emoticons" src="https://user-images.githubusercontent.com/436043/32532570-1be0dd28-c400-11e7-90cd-f33396277602.png">

#### Results intersection
For better results, **Emoji Mart** split search into words and only returns results matching both terms.

<img width="338" alt="high-five" src="https://user-images.githubusercontent.com/436043/32532573-1f4a9d1e-c400-11e7-8656-921bc6c09732.png">

### Fully customizable
#### Anchors color, title and default emoji
<img width="338" alt="customizable-color" src="https://user-images.githubusercontent.com/436043/32532582-302dc9e4-c400-11e7-9b97-f37c447231ca.png"><br><img width="338" alt="pick-your-emoji" src="https://user-images.githubusercontent.com/436043/32532585-34546faa-c400-11e7-9c9d-fbbe830d4368.png">

#### Emojis sizes and length
<img width="296" alt="size-and-length" src="https://user-images.githubusercontent.com/436043/32532590-381f67de-c400-11e7-86f6-328e30d6b116.png">

#### Default skin color
As the developer, you have control over which skin color is used by default.

<img width="205" alt="skins" src="https://user-images.githubusercontent.com/436043/32532858-0a559560-c402-11e7-8680-f77f780a5a49.png">

It can however be overwritten as per user preference.

<img width="98" alt="customizable-skin" src="https://user-images.githubusercontent.com/436043/32532883-2c620e7c-c402-11e7-976c-50d32be0566c.png">

#### Multiple sets supported
Apple / Google / Twitter / EmojiOne / Messenger / Facebook

<img width="214" alt="sets" src="https://user-images.githubusercontent.com/436043/33786868-d4226e60-dc38-11e7-840a-e4cf490f5f4a.png">

## Not opinionated
**Emoji Mart** doesn’t automatically insert anything into a text input, nor does it show or hide itself. It simply returns an `emoji` object. It’s up to the developer to mount/unmount (it’s fast!) and position the picker. You can use the returned object as props for the `EmojiMart.Emoji` component. You could also use `emoji.colons` to insert text into a textarea or `emoji.native` to use the emoji.

## Development
```sh
$ yarn build
$ yarn start
$ yarn storybook
```

## 🎩 Hat tips!
Powered by [iamcal/emoji-data](https://github.com/iamcal/emoji-data) and inspired by [iamcal/js-emoji](https://github.com/iamcal/js-emoji).<br>
🙌🏼  [Cal Henderson](https://github.com/iamcal).
