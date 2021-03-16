import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index'
import login from './pages/login'
import express from './pages/express'
import changeTitle from '@/utils/hooks/changetitle'

// import express from './pages/express'

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
            component: index,
            meta: {title: '宠物家'}
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {title: '登录'}

        },
        {
            path: '/express',
            name: 'express',
            component: express,
            meta: {title: '物流'}

        }
    ]
})
//
router.afterEach(route => {
    // 修改页面标题
    if (route.meta.title) {
        changeTitle(route.meta.title)
    }
})

export default router
