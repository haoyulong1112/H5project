import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index'
import login from './pages/login'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ]
})

router.afterEach(route => {
    // 修改页面标题
    // if (route.meta.title) {
    //     changeTitle(route.meta.title)
    // }
})

export default router
