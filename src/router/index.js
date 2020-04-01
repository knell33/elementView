import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'

Vue.use(VueRouter)

const routes = [{
        // 重定向
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        // name: 'login',
        component: Index
    }
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
    routes
})

export default router