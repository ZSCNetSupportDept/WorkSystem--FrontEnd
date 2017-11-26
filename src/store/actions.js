/**
 * Created by wenxiaoxin on 2017/3/2.
 */
import * as types from './mutation-types'
import {
  fetchIsLogin,
  fetchTasks,
  fetchExp,
  fetchExtraWork,
  fetchPersonToday,
  fetchLogout,
  fetchPersonExtraWork
} from '../api/fetch_data'
import {
  postLogin,
  postAddExp,
  postEditAN,
  postSignWork,
  postResSignWork,
  postSetInfo,
  postSetPassword,
  postChangeTask,
  postSearch,
  postSearchToday,
  postAddTask,
  postCheckWork
} from '../api/post_data'

export default {
  FETCH_IS_LOGIN ({commit, dispatch}) {
    dispatch('beginLoading')

    return fetchIsLogin().then(data => {
      if (data.is_login !== true) {
        //  if is not login
        dispatch('endLoading')
        return data.csrf_token
      }

      //  set base data
      commit(types.SET_INFO, data.user)
      commit(types.SET_ANNOUNCE, data.announcement)
      commit(types.SET_IS_LOG, true)
      commit(types.SET_IS_WORKED, data.check)
      commit(types.SET_TODAY_WORKERS, data.works)
      commit(types.SET_OVERVIEW, data.work_orders)

      let nowPlace = data.check ? data.place : data.user.workPlace
      commit(types.SET_NOW_PLACE, nowPlace)
      commit(types.SET_CHOOSE_PLACE, nowPlace)
      commit(types.SET_USER_PLACE, nowPlace)
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_TASKS ({state, commit, dispatch}, isp) {
    dispatch('beginLoading')

    return fetchTasks(state.base.nowPlace, isp).then(data => {
      if (data.error) {
        dispatch('openMsg', '服务器出了点问题,请重试')
        return
      }

      // sort the task list
      data.work_order.sort((a, b) => {
        let tempA = a.userHouse.split('-')
        let tempB = b.userHouse.split('-')
        if (parseInt(tempA[0]) < parseInt(tempB[0])) {
          return -1
        }

        if (parseInt(tempA[1]) < parseInt(tempB[1])) {
          return -1
        }

        return 1
      })

      commit(types.SET_ISP_TASKS, data.work_order)
      commit(types.SET_ISP_WORKERS, data.works.map((worker) => {
        return worker.work_number + ' ' + worker.name
      }))

      dispatch('endLoading')
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_WORKERS ({state, dispatch}) {
    dispatch('beginLoading')

    return fetchTasks(state.base.nowPlace, '普通').then(data => {
      if (data.error) {
        dispatch('openMsg', '服务器出了点问题,请重试')
        dispatch('endLoading')
        return
      }

      return {
        workers: data.works.map((worker) => {
          return worker.work_number + ' ' + worker.name
        })
      }
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_ALL_TASKS ({state, dispatch}) {
    dispatch('beginLoading')

    let reqTasks = [fetchTasks(state.base.nowPlace, '普通'), fetchTasks(state.base.nowPlace, '投诉'),
      fetchTasks(state.base.nowPlace, '中国电信'), fetchTasks(state.base.nowPlace, '中国联通'),
      fetchTasks(state.base.nowPlace, '中国移动')]

    return Promise.all(reqTasks).then(res => {
      return {
        general: res[0],
        fuck: res[1],
        dianxin: res[2],
        liantong: res[3],
        yidong: res[4]
      }
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_EXP ({dispatch}) {
    dispatch('beginLoading')

    return fetchExp().catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_EXTRA_WORK ({dispatch}) {
    dispatch('beginLoading')

    return fetchExtraWork().catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_PERSON_EXTRA_WORK ({dispatch}) {
    dispatch('beginLoading')

    return fetchPersonExtraWork().catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_PERSON_TODAY ({dispatch}) {
    dispatch('beginLoading')

    return fetchPersonToday().catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  FETCH_LOGOUT ({dispatch}) {
    dispatch('beginLoading')

    return fetchLogout().then(data => {
      if (data.success) {
        location.reload()
      } else {
        dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
        dispatch('endLoading')
      }
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_LOGIN ({commit, dispatch}, postData) {
    dispatch('beginLoading')

    return postLogin(postData.token, postData.data).then(data => {
      if (data.error === 'username&password error') {
        return {error: '账号或密码错误'}
      }
      if (data.error === 'error') {
        return {error: '未知错误，请刷新网页，若依然无法登录，请联系管理员'}
      }

      //  set base info
      commit(types.SET_INFO, data.user)
      commit(types.SET_ANNOUNCE, data.announcement)
      commit(types.SET_IS_LOG, true)
      commit(types.SET_IS_WORKED, data.check)
      commit(types.SET_TODAY_WORKERS, data.works)
      commit(types.SET_OVERVIEW, data.work_orders)

      let nowPlace = data.check ? data.place : data.user.workPlace
      commit(types.SET_NOW_PLACE, nowPlace)
      commit(types.SET_CHOOSE_PLACE, nowPlace)
      commit(types.SET_USER_PLACE, nowPlace)

      return {success: 'success'}
    })
  },
  POST_ADD_EXP ({dispatch}, postData) {
    dispatch('beginLoading')

    return postAddExp(postData).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_EDIT_AN ({dispatch}, postData) {
    dispatch('beginLoading')

    return postEditAN(postData).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_SIGN_WORK ({dispatch}, postData) {
    dispatch('beginLoading')

    return postSignWork(postData).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_RES_SIGN_WORK ({dispatch}, postData) {
    dispatch('beginLoading')

    return postResSignWork(postData).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
      dispatch('closeSth')
    })
  },
  POST_SET_INFO ({dispatch}, postData) {
    dispatch('beginLoading')

    return postSetInfo(postData).then(data => {
      if (data.success === 'change success') {
        let info
        info.workPlace = postData.area
        info.workDay = postData.work_day
        dispatch('updateInfo', info)

        dispatch('openMsg', '提交成功')
      } else if (data.error === 'no change') {
        dispatch('openMsg', '提交失败')
      } else {
        dispatch('openMsg', '服务器出问题了')
      }

      dispatch('endLoading')
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_SET_PASSWORD ({dispatch}, postData) {
    dispatch('beginLoading')

    return postSetPassword(postData).then(data => {
      if (data.success === 'change success') {
        dispatch('openMsg', '修改成功，3秒后将跳转登录页面')

        setTimeout(() => {
          location.reload()
        }, 3000)
      } else if (data.error === 'error') {
        dispatch('openMsg', '提交失败')
      } else {
        dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      }

      dispatch('endLoading')
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_CHANGE_TASK ({dispatch}, postData) {
    dispatch('beginLoading')

    return postChangeTask(postData.isp, postData.data).then(data => {
      if (data.error === 'Has been completed') {
        dispatch('openMsg', '该任务已经被完成')
        dispatch('FETCH_TASKS', postData.isp)
      } else if (data.error) {
        dispatch('openMsg', '服务器好像出了点问题，请重试，若依然这样，请联系管理员')
      } else if (data.success) {
        dispatch('closeSth')
        dispatch('openMsg', '提交成功')
        dispatch('FETCH_TASKS', postData.isp)
      } else {
        dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      }
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_SEARCH ({dispatch}, postData) {
    dispatch('beginLoading')

    return postSearch(postData).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_SEARCH_TODAY ({dispatch}, postData) {
    dispatch('beginLoading')

    return postSearchToday(postData).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
    })
  },
  POST_ADD_TASK ({dispatch}, postData) {
    dispatch('beginLoading')

    return postAddTask(postData.type, postData.data).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
      dispatch('closeSth')
    })
  },
  POST_CHECK_WORK ({dispatch, commit}, postData) {
    dispatch('beginLoading')

    return postCheckWork(postData.type, postData.data).then(data => {
      dispatch('endLoading')
      dispatch('closeSth')
      if (data.error === 'not check in time') {
        dispatch('openMsg', '由于你不是今天的值班人员，被拒绝签到了')
      } else if (data.error === 'had been check') {
        dispatch('openMsg', '你已经签到过了')
      } else if (data.error) {
        dispatch('openMsg', '服务器好像出了点问题，请重试，若依然这样，请联系管理员')
      } else if (data.success) {
        commit('SET_IS_WORKED', data.check)
        if (data.check) {
          commit('SET_NOW_PLACE', data.place)
          commit('SET_USER_PLACE', data.place)
        }
        return {success: true}
      } else {
        dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      }
    }).catch(() => {
      dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
      dispatch('endLoading')
      dispatch('closeSth')
    })
  }
}
