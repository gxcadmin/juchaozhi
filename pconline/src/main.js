// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//将axios注册为全局变量
import axios from 'axios'
Vue.prototype.$http = axios;
Vue.config.productionTip = false

import store from './vuex/Store'
// 引入自定义MIXIN
import MTMixin  from './mixin/MTMixin'
//注册全局MIXIN
Vue.mixin(MTMixin)

// 导入字体库
import "./assets/css/font-awesome.min.css"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
