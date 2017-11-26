/**
 * Created by Clovin on 2017/8/15.
 */
import * as types from '../mutation-types'

let state = {
  tasks: [],
  currentTask: '',
  repairDetail: '',
  repairWorkers: [],
  repairStatus: '已解决',
  workers: []
}

const mutations = {
  [types.SET_ISP_TASKS] (state, value) {
    state.tasks = value
  },
  [types.SET_ISP_CURRENT_TASK] (state, value) {
    state.currentTask = value
  },
  [types.SET_ISP_REPAIR_DETAIL] (state, value) {
    state.repairDetail = value
  },
  [types.SET_ISP_REPAIR_WORKERS] (state, value) {
    state.repairWorkers = value
  },
  [types.SET_ISP_REPAIR_STATUS] (state, value) {
    state.repairStatus = value
  },
  [types.SET_ISP_WORKERS] (state, value) {
    state.workers = value
  }
}

const actions = {
  updateTasks ({commit}, value) {
    commit(types.SET_ISP_TASKS, value)
  },
  changeCurrentTasks ({commit}, value) {
    commit(types.SET_ISP_CURRENT_TASK, value)
    commit(types.SET_ISP_REPAIR_DETAIL, '')
  }
}

export default {
  state,
  mutations,
  actions
}
