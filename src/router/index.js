import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import va from '../components/valid.vue'
Vue.use(VueRouter)

const routes = [{
        // 重定向到Index界面
        path: '/',
        redirect: '/index' //重定向
    },
    //主页面
    {
        path: '/index',
        // name: 'login',
        component: Index
    },
    {
        path: '/va',
        component: va
    }
    //
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history', //去除url#
    routes
})

export default router