import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//表格日期显示格式转换
//import * as fecha from "element-ui/lib/utils/date"
//导入全局样式表
import './assets/css/global.css'
//导入ajax
import axios from 'axios';
//qs处理ajaxJSON参数
import qs from 'qs';

Vue.config.productionTip = false

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')
Vue.use(ElementUI);
//Vue.use(fecha);

//配置请求根路径
//axios.defaults.baseURL = 'http://192.168.31.119:62200/api/'
axios.defaults.baseURL = 'http://localhost:62200/api/'
Vue.prototype.$ajax = axios;

Vue.prototype.$qs = qs;

new Vue({
    router,
    el: '#app',
    //components: { App },
    // template: < App / > ,
    render: h => h(App)
});