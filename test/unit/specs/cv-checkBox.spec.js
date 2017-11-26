import {createTest, createVue, destroyVM} from '../util'
import cvCheckBox from '@/components/cv-checkBox'

describe('components/cv-checkBox.vue', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create correctly', () => {
    vm = createTest(cvCheckBox, {
      label: 'test label',
      value: true
    })

    const input = vm.$el.querySelector('input')
    const label = vm.$el.querySelector('label')

    expect(vm.$data.checked, 'mounted func init error').is.equal(true)
    expect(vm.$data.id, 'data id init error').is.a('string')
    expect(input.id, 'input id bind error').to.equal('test label' + vm.$data.id)
    expect(input.disabled, 'input disabled error').to.equal(false)
    expect(input.checked, 'input checked status error').to.equal(true)
    expect(label.textContent, 'label text error').to.equal('test label')
    expect(label.htmlFor, 'label bind html error').to.equal('test label' + vm.$data.id)
  })

  it('parent bind value change', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-check-box label="disabled test" v-model="checkBoxValue"></cv-check-box>
          <button @click="changeValue"></button>
        </div>
      `,
      name: 'test',
      components: {
        cvCheckBox
      },
      data () {
        return {
          checkBoxValue: true
        }
      },
      methods: {
        changeValue () {
          this.checkBoxValue = !this.checkBoxValue
        }
      }
    })

    let checkBox = vm.$el.querySelector('input')
    let button = vm.$el.querySelector('button')

    expect(vm.$data.checkBoxValue, 'before click: value error').is.equal(true)
    expect(checkBox.checked, 'before click: checked status error').is.equal(true)

    button.click() // change parent bind value

    setTimeout(_ => {
      expect(vm.$data.checkBoxValue, 'after click: value error').is.equal(false)
      expect(checkBox.checked, 'after click: checked status error').is.equal(false)
      done()
    }, 20)
  })

  it('click', (done) => {
    vm = createVue({
      template: `
        <cv-check-box label="disabled test" v-model="checkBoxValue"></cv-check-box>
      `,
      name: 'test',
      components: {
        cvCheckBox
      },
      data () {
        return {
          checkBoxValue: true
        }
      }
    })

    let checkBox = vm.$el.querySelector('input')

    expect(vm.$data.checkBoxValue, 'before click: value error').is.equal(true)
    expect(checkBox.checked, 'before click: checked status error').is.equal(true)

    checkBox.click()

    setTimeout(_ => {
      expect(vm.$data.checkBoxValue, 'after click: value error').is.equal(false)
      expect(checkBox.checked, 'after click: checked status error').is.equal(false)
      done()
    }, 20)
  })

  it('disabled', (done) => {
    vm = createVue({
      template: `
        <cv-check-box label="disabled test" :disabled="true" v-model="checkBoxValue"></cv-check-box>
      `,
      name: 'test',
      components: {
        cvCheckBox
      },
      data () {
        return {
          checkBoxValue: true
        }
      }
    })

    let checkBox = vm.$el.querySelector('input')

    expect(vm.$data.checkBoxValue, 'before click: value error').is.equal(true)
    expect(checkBox.checked, 'before click: checked status error').is.equal(true)

    checkBox.click()

    setTimeout(_ => {
      expect(vm.$data.checkBoxValue, 'after click: value error').is.equal(true)
      expect(checkBox.checked, 'after click: checked status error').is.equal(true)
      done()
    }, 20)
  })

  it('click when isGroup is true', (done) => {
    vm = createVue({
      template: `
        <cv-check-box label="test" @input="getInputEvent" :value="checkBoxValue.indexOf('test') !== -1"></cv-check-box>
      `,
      name: 'checkBoxGroup',
      components: {
        cvCheckBox
      },
      data () {
        return {
          checkBoxValue: []
        }
      },
      methods: {
        getInputEvent () {
          let index = this.checkBoxValue.indexOf('test')
          if (index !== -1) {
            this.checkBoxValue.splice(index, 1)
          } else {
            this.checkBoxValue.push('test')
          }
        }
      }
    })

    let checkBox = vm.$el.querySelector('input')

    expect(vm.$data.checkBoxValue, 'before first click: value error').is.eql([])
    expect(checkBox.checked, 'before first click: checked status error').is.equal(false)

    checkBox.click()

    setTimeout(_ => {
      expect(vm.$data.checkBoxValue, 'after first click: value error').is.eql(['test'])
      expect(checkBox.checked, 'after first click: checked status error').is.equal(true)

      // click second
      checkBox.click()
      setTimeout(_ => {
        expect(vm.$data.checkBoxValue, 'after second click: value error').is.eql([])
        expect(checkBox.checked, 'after second click: checked status error').is.equal(false)
        done()
      }, 20)
    }, 20)
  })

  it('parent bind value change when isGroup is true', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-check-box label="test" @input="getInputEvent" :value="checkBoxValue.indexOf('test') !== -1"></cv-check-box>
          <button @click="changeValue"></button>
        </div>
      `,
      name: 'checkBoxGroup',
      components: {
        cvCheckBox
      },
      data () {
        return {
          checkBoxValue: []
        }
      },
      methods: {
        getInputEvent () {
          let index = this.checkBoxValue.indexOf('test')
          if (index !== -1) {
            this.checkBoxValue.splice(index, 1)
          } else {
            this.checkBoxValue.push('test')
          }
        },
        changeValue () {
          this.checkBoxValue = ['test']
        }
      }
    })

    let checkBox = vm.$el.querySelector('input')
    let button = vm.$el.querySelector('button')

    expect(vm.$data.checkBoxValue, 'before first click: value error').has.same.members([])
    expect(checkBox.checked, 'before first click: checked status error').is.equal(false)

    button.click() // change parent bind value

    setTimeout(_ => {
      expect(vm.$data.checkBoxValue, 'after first click: value error').has.same.members(['test'])
      expect(checkBox.checked, 'after first click: checked status error').is.equal(true)
      done()
    }, 20)
  })
})
