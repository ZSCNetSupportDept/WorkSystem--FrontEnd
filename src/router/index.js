import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/Login'
import index from 'components/index'
import overview from 'components/users/overview'
import createWork from 'components/users/createWork'
import contacts from 'components/users/contacts'
import createRepair from 'components/users/createRepair'
import setPassword from 'components/users/setPassword'
import setInfo from 'components/users/setInfo'
import register from 'components/users/registerWork'
import editan from 'components/users/editan'
import resregister from 'components/users/resregister'
import newTask from 'components/users/newTask'
import todayFinish from 'components/users/todayFinish'
import searchToday from 'components/users/searchToday'
import searchUser from 'components/users/searchUser'
import searchID from 'components/users/searchID'
import searchDay from 'components/users/searchDay'
import searchOverview from 'components/users/searchOverview'
import searchWork from 'components/users/searchWork'
import searchExp from 'components/users/searchExp'
import addExp from 'components/users/addExp'
// import os from 'components/os'
import tasks from 'components/users/tasks'

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
          component: editan
        },
        {
          path: 'resregister',
          name: 'resregister',
          component: resregister
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
