import {createTest, createVue, destroyVM} from '../util'
import cvTextInput from '@/components/cv-textInput'

describe('components/cv-textInput.vue', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('text input create correctly', () => {
    vm = createTest(cvTextInput, {
      type: 'text',
      placeholder: 'placeholder',
      label: 'test',
      value: 'test',
      errormsg: 'error'
    })

    const input = vm.$el.querySelector('input')
    const label = vm.$el.querySelector('label')
    const error = vm.$el.querySelector('p')

    expect(vm.$data.text, 'text init error').is.equal('test')
    expect(vm.$el.classList.contains('cv-text-input--disabled')).is.equal(false)
    expect(input.type, 'input type error').is.equal('text')
    expect(input.value, 'input value error').is.equal('test')
    expect(input.id, 'input id error').is.equal('test')
    expect(input.placeholder, 'input placeholder error').is.equal('placeholder')
    expect(label.textContent, 'label text error').is.equal('test')
    expect(error.style.display, 'error msg display error').is.equal('none')
    expect(error.textContent, 'error msg text error').is.equal('error')
  })

  it('password input create correctly', () => {
    vm = createTest(cvTextInput, {
      type: 'password',
      placeholder: 'placeholder',
      label: 'test',
      value: 'test',
      haserror: true,
      errormsg: 'error'
    })

    const input = vm.$el.querySelector('input')
    const label = vm.$el.querySelector('label')
    const error = vm.$el.querySelector('p')

    expect(vm.$data.text, 'text init error').is.equal('test')
    expect(vm.$el.classList.contains('cv-text-input--disabled')).is.equal(false)
    expect(input.type, 'input type error').is.equal('password')
    expect(input.value, 'input value error').is.equal('test')
    expect(input.id, 'input id error').is.equal('test')
    expect(input.placeholder, 'input placeholder error').is.equal('placeholder')
    expect(label.textContent, 'label text error').is.equal('test')
    expect(error.style.display, 'error msg display error').is.equal('')
    expect(error.textContent, 'error msg text error').is.equal('error')
  })

  it('parent bind value change', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-text-input label="test" v-model="value" type="text"></cv-text-input>
          <button @click="changeValue"></button>
        </div>
      `,
      components: {
        cvTextInput
      },
      data () {
        return {
          value: 'before'
        }
      },
      methods: {
        changeValue () {
          this.value = 'after'
        }
      }
    })

    const button = vm.$el.querySelector('button')
    const input = vm.$el.querySelector('input')

    expect(vm.$data.value, 'before change: value error').is.equal('before')
    expect(input.value, 'before change: input value error').is.equal('before')

    button.click()

    setTimeout(_ => {
      expect(vm.$data.value, 'after change: value error').is.equal('after')
      expect(input.value, 'after change: input value error').is.equal('after')
      done()
    }, 20)
  })

  it('input', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-text-input label="test" v-model="value" type="text"></cv-text-input>
        </div>
      `,
      components: {
        cvTextInput
      },
      data () {
        return {
          value: 'before'
        }
      }
    })

    const input = vm.$el.querySelector('input')
    const simulateEvent = (text, event) => {
      input.value = text
      input.dispatchEvent(new Event(event))
    }

    expect(vm.$data.value, 'before input: value error').is.equal('before')
    expect(input.value, 'before input: input value error').is.equal('before')

    simulateEvent('after', 'input')

    setTimeout(_ => {
      expect(vm.$data.value, 'after input: value error').is.equal('after')
      expect(input.value, 'after input: input value error').is.equal('after')
      done()
    }, 20)
  })

  it('disabled', () => {
    vm = createVue({
      template: `
        <div>
          <cv-text-input label="test" :disabled="true" v-model="value" type="text"></cv-text-input>
        </div>
      `,
      components: {
        cvTextInput
      },
      data () {
        return {
          value: 'before'
        }
      }
    })

    const input = vm.$el.querySelector('input')
    const el = vm.$el.querySelector('.cv-text-input')
    expect(el.classList.contains('cv-text-input--disabled'), 'disabled class error').is.equal(true)
    expect(vm.$data.value, 'value error').is.equal('before')
    expect(input.value, 'input value error').is.equal('before')
    expect(input.disabled, 'input disabled error').is.equal(true)
  })
})
