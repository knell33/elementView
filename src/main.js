import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import axios from 'axios';
//qs处理ajaxJSON参数
import qs from 'qs';

Vue.config.productionTip = false

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')

Vue.use(ElementUI);
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});