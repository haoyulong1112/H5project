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

export default router
