// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index.vue'
import VueLazyload from 'vue-lazyload'
import { Toast } from 'mint-ui'
import '@/utils/rem'
import '@/utils/favicon'

Vue.use(VueLazyload)
window.Toast = Toast

// 全局变量 设备os信息
const u = navigator.userAgent
Vue.prototype.inviteData = {
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    ios: u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1,
    weixin: u.toLowerCase().indexOf('micromessenger') > -1,
    openid: '',
    activityId: '',
    inviteCode: ''
}

/* eslint-disable no-new */
new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
