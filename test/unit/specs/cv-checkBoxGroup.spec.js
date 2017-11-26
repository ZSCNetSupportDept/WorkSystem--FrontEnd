import {createTest, createVue, destroyVM} from '../util'
import cvCheckBoxGroup from '@/components/cv-checkBoxGroup'

describe('components/cv-checkBoxGroup.vue', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create correctly', () => {
    vm = createTest(cvCheckBoxGroup, {
      options: ['test1', 'test2', 'test3'],
      value: ['test1'],
      disabled: ['test2'],
      label: 'test'
    })

    const input = vm.$el.querySelectorAll('input')
    const label = vm.$el.querySelectorAll('label')
    const p = vm.$el.querySelector('p')

    expect(vm.$data.checked, 'checked status error').has.same.members(['test1'])
    expect(p.textContent, 'label text error').is.equal('test')
    expect(vm.$data.id, 'id create error').is.a('string')
    expect(input[0].id, 'first input id error').have.string('test1')
    expect(input[1].id, 'second input id error').have.string('test2')
    expect(input[2].id, 'third input id error').have.string('test3')
    expect(input[0].checked, 'first input checked status error').is.equal(true)
    expect(input[1].checked, 'second input checked status error').is.equal(false)
    expect(input[2].checked, 'third input checked status error').is.equal(false)
    expect(label[0].textContent, 'first label text error').is.equal('test1')
    expect(label[1].textContent, 'second label text error').is.equal('test2')
    expect(label[2].textContent, 'third label text error').is.equal('test3')
    expect(input[0].disabled, 'first input disabled error').is.equal(false)
    expect(input[1].disabled, 'second input disabled error').is.equal(true)
    expect(input[2].disabled, 'third input disabled error').is.equal(false)
  })

  it('parent bind value change', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-check-box-group v-model="value" :options="options"></cv-check-box-group>
          <button @click="changeValue"></button>
        </div>
      `,
      name: 'test',
      components: {
        cvCheckBoxGroup
      },
      data () {
        return {
          options: ['test1', 'test2', 'test3'],
          value: ['test1', 'test3']
        }
      },
      methods: {
        changeValue () {
          this.value = ['test1', 'test2']
        }
      }
    })

    let checkBox = vm.$el.querySelectorAll('input')
    let button = vm.$el.querySelector('button')

    expect(vm.$data.value, 'before change: value error').has.same.members(['test1', 'test3'])
    expect(checkBox[0].checked, 'before change: first checked status error').is.equal(true)
    expect(checkBox[1].checked, 'before change: second checked status error').is.equal(false)
    expect(checkBox[2].checked, 'before change: third checked status error').is.equal(true)

    button.click() // change parent bind value

    setTimeout(_ => {
      expect(vm.$data.value, 'after change: value error').has.same.members(['test1', 'test2'])
      expect(checkBox[0].checked, 'after change: first checked status error').is.equal(true)
      expect(checkBox[1].checked, 'after change: second checked status error').is.equal(true)
      expect(checkBox[2].checked, 'after change: third checked status error').is.equal(false)
      done()
    }, 20)
  })

  it('click', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-check-box-group v-model="value" :options="options"></cv-check-box-group>
        </div>
      `,
      components: {
        cvCheckBoxGroup
      },
      data () {
        return {
          options: ['test1', 'test2', 'test3'],
          value: ['test1', 'test3']
        }
      }
    })

    let checkBox = vm.$el.querySelectorAll('input')

    expect(vm.$data.value, 'before click: value error').has.same.members(['test1', 'test3'])
    expect(checkBox[0].checked, 'before click: first input checked status error').is.equal(true)
    expect(checkBox[1].checked, 'before click: second input checked status error').is.equal(false)
    expect(checkBox[2].checked, 'before click: third input checked status error').is.equal(true)

    checkBox[0].click()
    checkBox[1].click()

    setTimeout(_ => {
      expect(vm.$data.value, 'after click: value error').has.same.members(['test2', 'test3'])
      expect(checkBox[0].checked, 'after click: first input checked status error').is.equal(false)
      expect(checkBox[1].checked, 'after click: second input checked status error').is.equal(true)
      expect(checkBox[2].checked, 'after click: third input checked status error').is.equal(true)
      done()
    }, 20)
  })

  it('disabled', (done) => {
    vm = createVue({
      template: `
        <div>
          <cv-check-box-group v-model="value" :disabled="disabledOptions" :options="options"></cv-check-box-group>
        </div>
      `,
      components: {
        cvCheckBoxGroup
      },
      data () {
        return {
          options: ['test1', 'test2', 'test3'],
          value: ['test1', 'test3'],
          disabledOptions: ['test1', 'test2']
        }
      }
    })

    let checkBox = vm.$el.querySelectorAll('input')

    expect(vm.$data.value, 'before click: value error').has.same.members(['test1', 'test3'])
    expect(checkBox[0].checked, 'before click: first input checked status error').is.equal(true)
    expect(checkBox[1].checked, 'before click: second input checked status error').is.equal(false)
    expect(checkBox[2].checked, 'before click: third input checked status error').is.equal(true)

    checkBox[0].click()
    checkBox[1].click()
    checkBox[2].click()

    setTimeout(_ => {
      expect(vm.$data.value, 'after click: value error').has.same.members(['test1'])
      expect(checkBox[0].checked, 'after click: first input checked status error').is.equal(true)
      expect(checkBox[1].checked, 'after click: second input checked status error').is.equal(false)
      expect(checkBox[2].checked, 'after click: third input checked status error').is.equal(false)
      done()
    }, 20)
  })
})
