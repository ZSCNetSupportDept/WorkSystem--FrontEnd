// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'whatwg-fetch'
import 'babel-polyfill'
// import ECharts from 'vue-echarts'
import 'assets/css/cssreset.css'
import 'assets/css/cv-zsc.css'
import 'assets/css/common.css'

// Vue.component('chart', ECharts)

// Vue.prototype.getCookie = getCookie

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
