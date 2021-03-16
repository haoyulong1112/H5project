import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import VueLazyload from 'vue-lazyload'
import { Toast, Popup } from 'mint-ui'
import App from './App.vue'
import '@/utils/rem'
import '@/utils/favicon'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import clipboard from '@/utils/clipboard'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)
window.Toast = Toast
Vue.component(Popup.name, Popup)
clipboard()

new Vue({
    router,
    store,
    components: { App },
    render: h => h(App)
}).$mount('#app')
