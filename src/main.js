// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Axios from 'axios'
import axios from '@/common/util/AxiosUtil.js'
import ElementUI from 'element-ui'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/store.js'
// import VoteMain from '@/components/voteMain'
Vue.prototype.$store=store
// Vue.prototype.$axios=Axios
Vue.prototype.$axios=axios
Vue.prototype.$qs=qs
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
