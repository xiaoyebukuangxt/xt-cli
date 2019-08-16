import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

/**
 * @ 引入element-ui 和 echarts 以及全局css文件
 */

import 'common/css/reset.styl';
import 'common/css/element.styl';
import 'common/js/requireComponent';

// import '../theme/index.css' //主题引入 必须放在vue.use(Element)后面



import 'font-awesome/css/font-awesome.css'

//定义一个新的vue实例 全局传参
Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
