import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index'
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
        }
    ]
})

export default router
