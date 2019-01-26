import {Radio, RadioList} from 'mand-mobile'
import {mount} from '@vue/test-utils'
import triggerTouch from '../../popup/test/touch-trigger'

describe('Radio', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a radio', () => {
    let name = ''
    wrapper = mount(Radio, {
      propsData: {
        name: '123',
      },
      listeners: {
        input(val) {
          name = val
        },
      },
    })
    wrapper.find('.md-radio').trigger('click')
    expect(name).toEqual('123')
  })

  it('create a radio list', done => {
    let value = 0
    wrapper = mount(RadioList, {
      propsData: {
        value,
        options: [{value: 0, text: '选项1'}, {value: 1, text: '选项2', disabled: true}, {value: 2, text: '选项3'}],
        defaultIndex: 1,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    expect(wrapper.findAll('.md-radio-item').length).toEqual(3)
    wrapper
      .findAll('.md-radio-item')
      .at(1)
      .trigger('click')
    expect(
      wrapper
        .findAll('.md-radio-item')
        .at(0)
        .classes('is-selected'),
    ).toBe(true)
    wrapper
      .findAll('.md-radio-item')
      .at(2)
      .trigger('click')
    expect(value).toEqual(2)
    wrapper.vm.select(1)
    expect(value).toEqual(1)
    wrapper.vm.selectByIndex(2)
    expect(value).toEqual(2)

    wrapper.setProps({value: 1})

    wrapper.vm.options = [{text: '选项1'}, {text: '选项2'}]
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-radio-item').length).toEqual(2)
      done()
    })
  })

  it('create a radio list with input', () => {
    let value = 0
    wrapper = mount(RadioList, {
      propsData: {
        value,
        options: [{value: 0, text: '选项1'}, {value: 1, text: '选项2'}, {value: 2, text: '选项3'}],
        hasInput: true,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    const input = wrapper.find('.md-input-item-input')
    input.trigger('focus')
    triggerTouch(input.element, 'input', 0, 0, '123')
    expect(value).toEqual('123')
  })
})
