/**
 * Created by wenxiaoxin on 2017/4/7.
 */
import * as types from '../mutation-types'

let state = {
  search: [
    // {
    //   id: '',
    //   taskProperty: '普通报修',
    //   repairStatus: '未解决',
    //   userPhone: '',
    //   userPlace: '',
    //   userHouse: '',
    //   netInfo: '中国电信',
    //   netAccount: '',
    //   workRecord: [
    //     {
    //       workMan: [
    //         {
    //           id: '',
    //           name: ''
    //         }
    //       ],
    //       workDetail: '',
    //       workDay: ''
    //     }
    //   ]
    // }
  ]
}

const mutations = {
  [types.SET_TF_SEARCH] (state, value) {
    state.search = value
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}

