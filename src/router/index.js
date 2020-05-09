import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import va from '../components/valid.vue'
//获取登录用户名
import { getUserName } from '../utility/User.js'
Vue.use(VueRouter)

const routes = [{
        // 重定向到Index界面
        path: '/',
        redirect: '/noAuthority' //重定向
    },
    //主页面
    {
        path: '/index',
        //name: 'Index',
        component: Index,
        meta: {
            keepAlive: true, // 需要缓存
            requireAuth: true, //需要登录
        }
    },
    {
        path: '/permission',
        //name: 'Permission',
        component: () =>
            import ('@/components/Permission'),
        meta: {
            keepAlive: true, // 需要缓存
            requireAuth: true, //需要登录
        }
    },
    {
        path: '/noAuthority',
        component: () =>
            import ('@/components/NoAuthority'),
        meta: {

        }
    },
    {
        path: '/va',
        component: va
    },
]

const router = new VueRouter({
    mode: 'history', //去除url#
    routes
})

//导航守卫(登录拦截)
router.beforeEach((to, from, next) => {
    let isLogin = window.sessionStorage.getItem('user');
    if (to.meta.requireAuth) { //判断进入的路由是否需要登录
        if (isLogin != null) { //是否具有登录信息
            next();
        } else {
            alert("您不具备访问该页面的权限");
            next({
                path: '/noAuthority',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next(); //如果不需要登录则直接进入页面
    }

})

export default router