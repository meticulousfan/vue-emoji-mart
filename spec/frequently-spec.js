import { mount } from '@vue/test-utils'

import { Picker, Category } from '../src/components'
import data from '../data/all.json'
import { EmojiIndex } from '../src/utils/emoji-data'

describe('Picker frequnt category', () => {
  const picker = mount(Picker)

  it('Has default emojis initially', () => {
    let categories = picker.findAll(Category)
    expect(categories.at(1).vm.name).toBe('Recent')
    expect(categories.at(1).vm.emojis.length).toBe(16)

    const DEFAULTS = [
      '+1',
      'grinning',
      'kissing_heart',
      'heart_eyes',
      'laughing',
      'stuck_out_tongue_winking_eye',
      'sweat_smile',
      'joy',
      'scream',
      'disappointed',
      'unamused',
      'weary',
      'sob',
      'sunglasses',
      'heart',
      'hankey',
    ]

    for (let idx in categories.at(1).vm.emojis) {
      let emoji = categories.at(1).vm.emojis[idx]
      expect(emoji.id).toBe(DEFAULTS[idx])
    }
  })

  it('Picks up frequent emoji', (done) => {
    let testClicks = {
      nerd_face: 25,
      space_invader: 24,
      robot_face: 23,
    }
    for (let id in testClicks) {
      let emoji = picker.find(`[data-title="${id}"]`)
      let numClicks = testClicks[id]
      for (let num = 0; num < numClicks; num++) {
        emoji.trigger('click')
      }
    }

    expect(window.localStorage['emoji-mart.last']).toBe(
      JSON.stringify('robot_face'),
    )
    expect(window.localStorage['emoji-mart.frequently']).toEqual(
      JSON.stringify({
        '+1': 16,
        grinning: 15,
        kissing_heart: 14,
        heart_eyes: 13,
        laughing: 12,
        stuck_out_tongue_winking_eye: 11,
        sweat_smile: 10,
        joy: 9,
        scream: 8,
        disappointed: 7,
        unamused: 6,
        weary: 5,
        sob: 4,
        sunglasses: 3,
        heart: 2,
        poop: 1,
        nerd_face: 25,
        space_invader: 24,
        robot_face: 23,
      }),
    )

    // Frequently used category should be updated for the new picker.
    const index = new EmojiIndex(data)
    const newPicker = mount(Picker, {
      propsData: {
        data: index,
      },
    })
    // Wait for picker to be rendered.
    picker.vm.$nextTick(() => {
      let categories = newPicker.findAll(Category)
      let recent = categories.at(1).vm

      expect(recent.emojis[0].id).toBe('nerd_face')
      expect(recent.emojis[1].id).toBe('space_invader')
      expect(recent.emojis[2].id).toBe('robot_face')

      done()
    })
  })
})
