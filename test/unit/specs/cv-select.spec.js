import {createTest, createVue, destroyVM} from '../util'
import cvSelect from '@/components/cv-select'

describe('components/cv-select.vue', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create correctly', () => {
    vm = createTest(cvSelect, {
      options: ['test1', 'test2', 'test3'],
      value: 'test1'
    })

    const input = vm.$el.querySelector('input')
    const option = vm.$el.querySelectorAll('.cv-select-dropdown__item')
    const select = vm.$el

    expect(vm.$data.select, 'mounted func init error').is.equal('test1')
    expect(vm.$data.isSelecting, 'data id init error').is.equal(false)
    expect(select.classList.contains('cv-select--disabled'), 'select disabled error').to.equal(false)
    expect(select.classList.contains('cv-select--selecting'), 'select open dropdown status error').to.equal(false)
    expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'first item select error').to.equal(true)
    expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'second item select error').to.equal(false)
    expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'third item select error').to.equal(false)
    expect(option[0].classList.contains('cv-select-dropdown__item--disabled'), 'first item disabled error').to.equal(false)
    expect(option[1].classList.contains('cv-select-dropdown__item--disabled'), 'second item disabled error').to.equal(false)
    expect(option[2].classList.contains('cv-select-dropdown__item--disabled'), 'third item disabled error').to.equal(false)
    expect(input.value, 'input value error').to.equal('test1')
  })

  it('parent bind value change', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-select label="test" v-model="value" :options="options"></cv-select>
          <button @click="changeValue"></button>
        </div>
      `,
      name: 'test',
      components: {
        cvSelect
      },
      data () {
        return {
          options: ['test1', 'test2', 'test3'],
          value: 'test1'
        }
      },
      methods: {
        changeValue () {
          this.value = this.options[(this.options.indexOf(this.value) + 1) % this.options.length]
        }
      }
    })

    const button = vm.$el.querySelector('button')
    const option = vm.$el.querySelectorAll('.cv-select-dropdown__item')

    expect(vm.$data.value, 'before click: value error').is.equal('test1')
    expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'before click: first option select status error').is.equal(true)
    expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'before click: second option select status error').is.equal(false)
    expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'before click: third option select status error').is.equal(false)

    button.click()

    setTimeout(_ => {
      expect(vm.$data.value, 'before click: value error').is.equal('test2')
      expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'before click: first option select status error').is.equal(false)
      expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'before click: second option select status error').is.equal(true)
      expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'before click: third option select status error').is.equal(false)
      done()
    }, 20)
  })

  it('click', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-select label="test" v-model="value" :options="options"></cv-select>
        </div>
      `,
      name: 'test',
      components: {
        cvSelect
      },
      data () {
        return {
          options: ['test1', 'test2', 'test3'],
          value: 'test1'
        }
      }
    })

    const input = vm.$el.querySelector('input')
    const option = vm.$el.querySelectorAll('.cv-select-dropdown__item')
    const select = vm.$el.querySelector('.cv-select')

    expect(vm.$data.value, 'before click: value error').is.equal('test1')
    expect(select.classList.contains('cv-select--selecting'), 'before click: dropdown close error').to.equal(false)
    expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'before click: first option select status error').is.equal(true)
    expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'before click: second option select status error').is.equal(false)
    expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'before click: third option select status error').is.equal(false)

    input.click()

    setTimeout(_ => {
      expect(select.classList.contains('cv-select--selecting'), 'after click: dropdown open error').to.equal(true)

      option[2].click()
      setTimeout(_ => {
        expect(select.classList.contains('cv-select--selecting'), 'after click: dropdown close error').to.equal(false)
        expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'after click: first option select status error').is.equal(false)
        expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'after click: second option select status error').is.equal(false)
        expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'after click: third option select status error').is.equal(true)
        done()
      }, 20)
    }, 20)
  })

  it('disabled', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-select label="disabled test" :disabled="true"  v-model="value" :options="options"></cv-select>
        </div>
      `,
      name: 'test',
      components: {
        cvSelect
      },
      data () {
        return {
          options: ['test1', 'test2', 'test3'],
          value: 'test1'
        }
      }
    })

    const input = vm.$el.querySelector('input')
    const option = vm.$el.querySelectorAll('.cv-select-dropdown__item')
    const select = vm.$el.querySelector('.cv-select')

    expect(vm.$data.value, 'before click: value error').is.equal('test1')
    expect(select.classList.contains('cv-select--selecting'), 'before click: dropdown close error').to.equal(false)
    expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'before click: first option select status error').is.equal(true)
    expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'before click: second option select status error').is.equal(false)
    expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'before click: third option select status error').is.equal(false)

    input.click()

    setTimeout(_ => {
      expect(select.classList.contains('cv-select--selecting'), 'after click: dropdown open error').to.equal(false)

      option[2].click()
      setTimeout(_ => {
        expect(select.classList.contains('cv-select--selecting'), 'after click: dropdown close error').to.equal(false)
        expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'after click: first option select status error').is.equal(true)
        expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'after click: second option select status error').is.equal(false)
        expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'after click: third option select status error').is.equal(false)
        done()
      }, 20)
    }, 20)
  })

  it('disabled options', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-select label="disabled test" :disabledOptions="disabledOptions"  v-model="value" :options="options"></cv-select>
        </div>
      `,
      name: 'test',
      components: {
        cvSelect
      },
      data () {
        return {
          options: ['test1', 'test2', 'test3'],
          value: 'test1',
          disabledOptions: ['test2']
        }
      }
    })

    const input = vm.$el.querySelector('input')
    const option = vm.$el.querySelectorAll('.cv-select-dropdown__item')
    const select = vm.$el.querySelector('.cv-select')

    expect(vm.$data.value, 'before click: value error').is.equal('test1')
    expect(select.classList.contains('cv-select--selecting'), 'before click: dropdown close error').to.equal(false)
    expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'before click: first option select status error').is.equal(true)
    expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'before click: second option select status error').is.equal(false)
    expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'before click: third option select status error').is.equal(false)

    input.click()

    setTimeout(_ => {
      expect(select.classList.contains('cv-select--selecting'), 'after click: dropdown open error').to.equal(true)

      option[1].click()
      setTimeout(_ => {
        expect(select.classList.contains('cv-select--selecting'), 'after click: dropdown close error').to.equal(true)
        expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'after click: first option select status error').is.equal(true)
        expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'after click: second option select status error').is.equal(false)
        expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'after click: third option select status error').is.equal(false)

        option[2].click()

        setTimeout(_ => {
          expect(select.classList.contains('cv-select--selecting'), 'after click: dropdown close error').to.equal(false)
          expect(option[0].classList.contains('cv-select-dropdown__item--select'), 'after click: first option select status error').is.equal(false)
          expect(option[1].classList.contains('cv-select-dropdown__item--select'), 'after click: second option select status error').is.equal(false)
          expect(option[2].classList.contains('cv-select-dropdown__item--select'), 'after click: third option select status error').is.equal(true)
          done()
        }, 20)
      }, 20)
    }, 20)
  })
})
