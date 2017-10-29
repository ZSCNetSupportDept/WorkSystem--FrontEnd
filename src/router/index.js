import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login/login.vue'
import index from '../page/user/index.vue'
import overview from '../page/user/overview/overview.vue'
import createWork from '../page/user/createWork/createWork.vue'
import contacts from '../page/user/contacts/contacts.vue'
import createRepair from '../page/user/createRepair/createRepair.vue'
import setPassword from '../page/user/setPassword/setPassword.vue'
import setInfo from '../page/user/setInfo/setInfo.vue'
import register from '../page/user/registerWork/registerWork.vue'
import editAN from '../page/user/editAN/editAN.vue'
import resRegister from '../page/user/resRegister/resRegister.vue'
import newTask from '../page/user/newTask/newTask.vue'
import todayFinish from '../page/user/todayFinish/todayFinish.vue'
import searchToday from '../page/user/searchToday/searchToday.vue'
import searchUser from '../page/user/searchUser/searchUser.vue'
import searchID from '../page/user/searchID/searchID.vue'
import searchDay from '../page/user/searchDay/searchDay.vue'
import searchOverview from '../page/user/searchOverview/searchOverview.vue'
import searchWork from '../page/user/searchWork/searchWork.vue'
import searchExp from '../page/user/searchExp/searchExp.vue'
import addExp from '../page/user/addExp/addExp.vue'
// import os from 'components/os'
import tasks from '../page/user/tasks/tasks.vue'
// import searchAccount from '../page/user/searchAccount/searchAccount.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/os',
    //   name: 'os',
    //   component: os
    // },
    {
      path: '/user',
      component: index,
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: overview
        },
        {
          path: 'creatework',
          name: 'creatework',
          component: createWork
        },
        {
          path: 'createrepair',
          name: 'createrepair',
          component: createRepair
        },
        {
          path: 'setpassword',
          name: 'setpassword',
          component: setPassword
        },
        {
          path: 'contacts',
          name: 'contacts',
          component: contacts
        },
        {
          path: 'register',
          name: 'register',
          component: register
        },
        {
          path: 'setinfo',
          name: 'setinfo',
          component: setInfo
        },
        {
          path: 'editan',
          name: 'editan',
          component: editAN
        },
        {
          path: 'resregister',
          name: 'resregister',
          component: resRegister
        },
        {
          path: 'newtask',
          name: 'newtask',
          component: newTask
        },
        {
          path: 'todayfinish',
          name: 'todayfinish',
          component: todayFinish
        },
        {
          path: 'searchtoday',
          name: 'searchtoday',
          component: searchToday
        },
        {
          path: 'searchuser',
          name: 'searchuser',
          component: searchUser
        },
        {
          path: 'searchid',
          name: 'searchid',
          component: searchID
        },
        {
          path: 'searchday',
          name: 'searchday',
          component: searchDay
        },
        {
          path: 'searchoverview',
          name: 'searchoverview',
          component: searchOverview
        },
        {
          path: 'searchwork',
          name: 'searchwork',
          component: searchWork
        },
        {
          path: 'searchExp',
          name: 'searchexp',
          component: searchExp
        },
        {
          path: 'addExp',
          name: 'addexp',
          component: addExp
        },
        {
          path: 'tasks/:isp',
          name: 'tasks',
          component: tasks
        },
        // {
        //   path: 'searchAccount',
        //   name: 'searchaccount',
        //   component: searchAccount
        // },
        {
          path: '*',
          component: overview
        }
      ]
    },
    {
      path: '*',
      component: Login
    }
  ]
})
