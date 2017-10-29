/**
 * Created by wenxiaoxin on 2017/3/19.
 */
import * as types from '../mutation-types'

let state = {
  repairStatus: '未解决',
  userPhone: '',
  userPlace: '',
  userHouse: '',
  netInfo: '中国电信',
  netAccount: '',
  repairDetail: '',
  repairWorkers: []
}

const mutations = {
  [types.SET_REPAIR_STATUS] (state, status) {
    state.repairStatus = status
  },
  [types.SET_USER_PHONE] (state, phone) {
    state.userPhone = phone
  },
  [types.SET_USER_PLACE] (state, place) {
    state.userPlace = place
  },
  [types.SET_USER_HOUSE] (state, house) {
    state.userHouse = house
  },
  [types.SET_NET_INFO] (state, info) {
    state.netInfo = info
  },
  [types.SET_NET_ACCOUNT] (state, account) {
    state.netAccount = account
  },
  [types.SET_REPAIR_DETAIL] (state, detail) {
    state.repairDetail = detail
  },
  [types.SET_REPAIR_WORKERS] (state, workers) {
    state.repairWorkers = workers
  }
}

export default {
  state,
  mutations
}
