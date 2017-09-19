/**
 * Created by wenxiaoxin on 2017/5/17.
 */
import Vue from 'vue'
import Xinput from 'components/views/Xinput.vue'

function getRenderedText(Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({propsData}).$mount()
  return vm.$el.textContent
}

describe('text type input', () => {

})

