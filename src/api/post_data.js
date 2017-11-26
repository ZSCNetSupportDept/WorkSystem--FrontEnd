/**
 * Created by Clovin on 2017/8/21.
 */
import {getCookie} from '../utils/cookieManager'

/*
 *  post data for login
 *
 *  @params  {string} token
 *           {JSON}   data
 *  @return  {JSON}
 **/
export function postLogin (token, data) {
  return fetch('work/try_login/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': token
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for add experience
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postAddExp (data) {
  return fetch('/work/experience_add/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for edit announce
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postEditAN (data) {
  return fetch('work/change_announcement/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for sign work
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postSignWork (data) {
  return fetch('work/extra_work_add/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for respond request sign work
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postResSignWork (data) {
  return fetch('work/extra_work_change/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for set user's information
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postSetInfo (data) {
  return fetch('work/personal_change/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for set user's password
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postSetPassword (data) {
  return fetch('work/password_change/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for change task's status
 *
 *  @params  {string}  isp
 *           {JSON}    data
 *  @returns {JSON}
 **/
export function postChangeTask (isp, data) {
  return fetch(isp === '普通' ? 'work/work_situation_change/' : 'work/work_order_change/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  post data for search
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postSearch (data) {
  return fetch('work/inquire/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  }).then(res => {
    return res.json()
  })
}

/*
 *  post data for search a place's task today
 *
 *  @params  {JSON} data
 *  @returns {JSON}
 **/
export function postSearchToday (data) {
  return fetch('work/view_today/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  }).then(res => {
    return res.json()
  })
}

/*
 *  post data for add task
 *
 *  @params  {string} type
 *           {JSON}   data
 *  @returns {JSON}
 **/
export function postAddTask (type, data) {
  return fetch(type === '普通' ? 'work/work_situation_add/' : 'work/work_order_add/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  }).then(res => {
    return res.json()
  })
}

/*
 *  post data for sign in work or sign out work
 *
 *  @params  {string} type
 *           {JSON}   data
 *  @returns {JSON}
 **/
export function postCheckWork (type, data) {
  return fetch(type === 'in' ? 'work/check_in/' : 'work/check_out/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: data
  }).then(res => {
    return res.json()
  })
}
