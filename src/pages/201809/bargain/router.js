import Vue from 'vue'
import Router from 'vue-router'
import changeTitle from '@/utils/hooks/changetitle'
import petlist from './pages/petlist'
import list from './pages/list'
import detail from './pages/detail'
import tool from './pages/tool'
import login from './pages/login'
import express from './pages/express'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/list'
        },
        {
            path: '/list',
            name: 'list',
            component: list,
            meta: {title: '活动列表'}
        },
        {
            path: '/petlist',
            name: 'petlist',
            component: petlist,
            meta: {title: '宠物列表'}
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: detail,
            meta: {title: '服务详情'},
            props: true
        },
        {
            path: '/tool',
            name: 'tool',
            component: tool,
            meta: {title: '我的道具'}
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
            meta: {title: '物流详情'}

        }
    ],
    scrollBehavior (to, from, savedPosition) {
        // 返回上一个组件离开时的位置
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
//
router.afterEach(route => {
    // 修改页面标题
    if (route.meta.title) {
        changeTitle(route.meta.title)
    }
})

export default router
