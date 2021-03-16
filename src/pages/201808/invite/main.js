// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/utils/rem'
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import { Toast } from 'mint-ui'
import router from './router.js'
import clipboard from '@/utils/clipboard'
import '@/utils/favicon'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)
window.Toast = Toast
clipboard()

// 全局变量 设备os信息
const u = navigator.userAgent
Vue.prototype.inviteData = {
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    ios: u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1,
    cellPhone: '',
    ruleHtml: ''
}

/* eslint-disable no-new */
new Vue({
    router,
    components: { App },
    render: h => h(App)
}).$mount('#app')
