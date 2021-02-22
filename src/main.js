import Vue from 'vue'
import App from './App.vue'
import router from "./router"


Vue.config.productionTip = false

// 引入vue-session
import VueSession from "vue-session"
Vue.use(VueSession)

// 引入ele-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入axios
import axios from "axios";
Vue.prototype.axios = axios;
axios.defaults.baseURL = "/api";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.delete['Content-Type'] = 'application/json';

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    console.log(error.response);
    return Promise.reject(error.response);
  }
);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

// new Vue({
//   el: "#app",
//   router,
//   components: { App },
//   template: "<App/>"
// });
