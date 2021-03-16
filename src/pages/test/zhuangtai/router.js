import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index'
import list from './pages/list'

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
            path: '/list',
            name: 'list',
            component: list
        }
    ]
})
export default router
