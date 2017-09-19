/**
 * Created by wenxiaoxin on 2017/3/20.
 */
import * as types from '../mutation-types'

let state = {
  choosePlace: '',
  toolsDetail: '',
  hasTools: false,
  toolKit: []
}

const mutations = {
  [types.SET_CHOOSE_PLACE] (state, value) {
    state.choosePlace = value
  },
  [types.SET_TOOLS_DETAIL] (state, toolsDetail) {
    state.toolsDetail = toolsDetail
  },
  [types.SET_HAS_TOOLS] (state, has) {
    state.hasTools = has
  },
  [types.UPDATE_TOOL_KIT] (state, tools) {
    state.toolKit.splice(0, state.toolKit.length)
    tools.forEach((tool) => {
      state.toolKit.push(tool)
    })
  }
}

const actions = {
  updateToolKit ({commit}, tools) {
    commit(types.UPDATE_TOOL_KIT, tools)
  }
}

export default {
  state,
  mutations,
  actions
}
