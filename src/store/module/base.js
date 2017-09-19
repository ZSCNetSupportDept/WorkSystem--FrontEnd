/**
 * Created by wenxiaoxin on 2017/3/19.
 */
import * as types from '../mutation-types'

let state = {
  info: {
    name: '',
    ID: '',
    job: '',
    workDay: '',
    workPlace: ''
  },
  todayWorkers: [],
  isWorked: false,
  nowPlace: '',
  isLog: false,
  // token: '',
  loading: false,
  openMsg: false,
  message: '',
  isOpen: false,
  isShadow: false
}

const mutations = {
  [types.SET_INFO] (state, info) {
    state.info = info
  },
  [types.SET_WORK_DAY] (state, value) {
    state.info.workDay = value
  },
  [types.SET_WORK_PLACE] (state, value) {
    state.info.workPlace = value
  },
  [types.SET_TODAY_WORKERS] (state, workers) {
    state.todayWorkers = workers
  },
  [types.SET_NOW_PLACE] (state, value) {
    state.nowPlace = value
  },
  [types.SET_IS_WORKED] (state, value) {
    state.isWorked = value
  },
  [types.SET_IS_LOG] (state, value) {
    state.isLog = value
  },
  [types.SET_LOADING] (state, value) {
    state.loading = value
  },
  [types.SET_OPEN_MSG] (state, value) {
    state.openMsg = value
  },
  [types.SET_MESSAGE] (state, value) {
    state.message = value
  },
  [types.SET_IS_OPEN] (state, value) {
    state.isOpen = value
  },
  [types.SET_IS_SHADOW] (state, value) {
    state.isShadow = value
  }
}

const actions = {
  openMsg ({commit}, message) {
    commit(types.SET_OPEN_MSG, true)
    commit(types.SET_MESSAGE, message)
  },
  closeMsg ({commit}) {
    commit(types.SET_OPEN_MSG, false)
  },
  openSth ({commit}) {
    commit(types.SET_IS_SHADOW, true)
    commit(types.SET_IS_OPEN, true)
  },
  closeSth ({commit}) {
    commit(types.SET_IS_SHADOW, false)
    commit(types.SET_IS_OPEN, false)
  },
  openShadow ({commit}) {
    commit(types.SET_IS_SHADOW, true)
  },
  closeShadow ({commit}) {
    commit(types.SET_IS_SHADOW, false)
  },
  beginLoading ({commit}) {
    commit(types.SET_LOADING, true)
  },
  endLoading ({commit}) {
    commit(types.SET_LOADING, false)
  },
  logOut ({commit}) {
    commit(types.SET_IS_LOG, false)
  },
  updateInfo ({commit}, info) {
    commit(types.SET_WORK_DAY, info.workDay)
    commit(types.SET_WORK_PLACE, info.workPlace)
  }
}

export default {
  state,
  mutations,
  actions
}
