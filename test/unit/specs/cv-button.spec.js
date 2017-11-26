import {createTest, createVue, destroyVM} from '../util'
import cvButton from '@/components/cv-button'

describe('components/cv-button.vue', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('label', () => {
    vm = createTest(cvButton, {
      label: '<script>alert(1)</script>'
    })
    const button = vm.$el
    expect(button.textContent, 'label init error').to.equal('<script>alert(1)</script>')
  })

  it('click', done => {
    let result
    vm = createVue({
      template: `
        <cv-button label="click test" :click="handleClick"></cv-button>
      `,
      components: {
        cvButton
      },
      methods: {
        handleClick () {
          result = 'click success'
        }
      }
    }, true)

    vm.$el.click()

    setTimeout(_ => {
      expect(result, 'click event error').to.equal('click success')
      done()
    }, 20)
  })

  it('disabled', (done) => {
    let result = 'not click'
    vm = createVue({
      template: `
        <cv-button label="disabled test" :disabled="true" :click="handleClick"></cv-button>
      `,
      components: {
        cvButton
      },
      methods: {
        handleClick () {
          result = 'click success'
        }
      }
    })

    vm.$el.click()

    setTimeout(_ => {
      expect(result, 'disabled property error').to.equal('not click')
      done()
    }, 20)
  })
})
