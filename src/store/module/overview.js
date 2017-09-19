/**
 * Created by wenxiaoxin on 2017/3/19.
 */
import * as types from '../mutation-types'

let state = {
  announce: '',
  overview: {
    telecom: '',
    mobile: '',
    unicom: '',
    complaints: ''
  }
}

const mutations = {
  [types.SET_ANNOUNCE] (state, announce) {
    state.announce = announce
  },
  [types.SET_OVERVIEW] (state, overview) {
    state.overview = overview
  }
}

const actions = {
  updateOverview ({commit}, overview) {
    commit('SET_ANNOUNCE', overview.announce)
    commit('SET_OVERVIEW', overview.overview)
  }
}

export default {
  state,
  mutations,
  actions
}
