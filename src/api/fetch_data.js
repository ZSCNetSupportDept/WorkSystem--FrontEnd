/**
 * Created by Clovin on 2017/8/21.
 */

/*
 *  fetch whether the userAgent was login.
 *
 *  @returns Promise(dataJSON)
 **/
export function fetchIsLogin () {
  return fetch('work/is_login', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  fetch tasks list
 *
 *  @params   {string} place
 *            {string} isp
 *  @returns  Promise(dataJSON)
 **/
export function fetchTasks (place, isp) {
  return fetch(isp === '普通' ? 'work/work_situation_view/' + place + '/'
    : 'work/work_order_view/' + place + '/' + isp + '/',
    {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (isp === '普通') {
        data.work_order = data.work_situation
      }
      return data
    })
}

/*
 *  fetch Exp list
 *
 *  @returns Promise(dataJSON)
 **/
export function fetchExp () {
  return fetch('/work/experience_view/', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  fetch people who sign extra work list
 *
 *  @returns Promise(dataJSON)
 **/
export function fetchExtraWork () {
  return fetch('work/extra_work_view/', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  fetch person's extra work
 *
 *  @returns Promise(dataJSON)
 **/
export function fetchPersonExtraWork () {
  return fetch('work/personal_extra_work_view/', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  fetch person's finished work today
 *
 *  @returns Promise(dataJSON)
 **/
export function fetchPersonToday () {
  return fetch('work/person_today/', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
}

/*
 *  try log out
 *
 *  @returns Promise(dataJSON)
 **/
export function fetchLogout () {
  return fetch('work/try_logout/', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
}
