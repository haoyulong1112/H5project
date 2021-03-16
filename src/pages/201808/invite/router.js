import Vue from 'vue'
import Router from 'vue-router'
import changeTitle from '@/utils/hooks/changetitle'
import index from './pages/index'
import prize from './pages/prize'
import rule from './pages/rule'

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
            meta: {index: 1, title: '邀请有礼'}
        },
        {
            path: '/prize',
            name: 'prize',
            component: prize,
            meta: {index: 2, title: '我的奖励'}
        },
        {
            path: '/rule',
            name: 'rule',
            component: rule,
            meta: {index: 3, title: '活动规则'}
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

router.afterEach(route => {
    // 修改页面标题
    if (route.meta.title) {
        changeTitle(route.meta.title)
    }
})

export default router
