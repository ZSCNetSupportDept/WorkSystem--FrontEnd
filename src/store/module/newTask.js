/**
 * Created by wenxiaoxin on 2017/4/5.
 */
import * as types from '../mutation-types'

let state = {
  taskProperty: '工单',
  taskStatus: '未解决',
  userPhone: '',
  userPlace: '香晖苑',
  userHouse: '',
  netInfo: '中国电信',
  netAccount: '',
  introduction: ''
}

const mutations = {
  [types.SET_NT_PROPERTY] (state, value) {
    state.taskProperty = value
  },
  [types.SET_NT_STATUS] (state, status) {
    state.taskStatus = status
  },
  [types.SET_NT_USER_PHONE] (state, phone) {
    state.userPhone = phone
  },
  [types.SET_NT_USER_PLACE] (state, place) {
    state.userPlace = place
  },
  [types.SET_NT_USER_HOUSE] (state, house) {
    state.userHouse = house
  },
  [types.SET_NT_NET_INFO] (state, info) {
    state.netInfo = info
  },
  [types.SET_NT_NET_ACCOUNT] (state, account) {
    state.netAccount = account
  },
  [types.SET_NT_INTRODUCTION] (state, value) {
    state.introduction = value
  }
}

export default {
  state,
  mutations
}
