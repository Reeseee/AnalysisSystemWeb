// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//导入路由router
import router from './router'
import VueRouter from 'vue-router'

//导入vuex仓库store,全局监听变量
import store from "./store";

//导入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'

//导入axios和vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import { message } from './lib/resetMessage';


Vue.use(VueRouter)
Vue.config.productionTip = false

//VUE使用element-ui
Vue.use(ElementUI)

//VUE使用axios和vue-axios
Vue.use(VueAxios, axios)

//$message的注册
Vue.prototype.$message = message;

//请求的url设置
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "/api";
  Vue.config.devtools = true;
} else {
  axios.defaults.baseURL = "";
  Vue.config.devtools = false;
}
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
