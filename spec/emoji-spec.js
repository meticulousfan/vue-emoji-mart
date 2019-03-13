import { mount } from '@vue/test-utils'

import data from '../data/all.json'
import { EmojiIndex, EmojiView } from '../src/utils/emoji-data'
import { Emoji, NimbleEmoji } from '../src/components'

describe('Emoji', () => {
  const index = new EmojiIndex(data)
  const emoji = mount(Emoji, {
    propsData: {
      emoji: 'point_up',
    },
  })

  it('works', () => {
    expect(emoji.isVueInstance()).toBeTruthy()
    expect(emoji.html()).toContain('emoji-set-apple emoji-type-image')
    expect(emoji.vm.emojiObject.id).toBe('point_up')
  })

  test('renders correctly', () => {
    expect(emoji.element).toMatchSnapshot()
  })

  test('renders correctly native emoji', () => {
    emoji.setProps({ native: true })
    expect(emoji.element).toMatchSnapshot()
  })

  it('has correct emoji and emoji view', () => {
    let expectedEmoji = index.emoji('point_up')
    let expectedView = new EmojiView(expectedEmoji, 1, 'apple', true, undefined)
    expect(emoji.vm.emojiObject).toEqual(expectedEmoji)
    expect(emoji.vm.view).toEqual(expectedView)
  })
})

describe('Emoji native', () => {
  const index = new EmojiIndex(data)
  const emoji = mount(Emoji, {
    propsData: {
      native: true,
      emoji: 'point_up',
    },
  })

  test('renders correctly native emoji', () => {
    expect(emoji.element).toMatchSnapshot()
  })

  it('has correct emoji and emoji view', () => {
    let expectedEmoji = index.emoji('point_up')
    let expectedView = new EmojiView(expectedEmoji, 1, 'apple', true, undefined)
    expect(emoji.vm.emojiObject).toEqual(expectedEmoji)
    expect(emoji.vm.view).toEqual(expectedView)
  })
})

})
