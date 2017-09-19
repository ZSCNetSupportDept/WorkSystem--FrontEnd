/**
 * Created by wenxiaoxin on 2017/3/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import base from './module/base'
import createWork from './module/createWork'
import createRepair from './module/createRepair'
import overview from './module/overview'
import tasks from './module/tasks'
import newTask from './module/newTask'
import todayFinish from './module/todayFinish'

Vue.use(Vuex)

/* eslint-disable no-new */
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  mutations,
  modules: {
    base,
    createWork,
    createRepair,
    overview,
    tasks,
    newTask,
    todayFinish
  },
  strict: debug
})
