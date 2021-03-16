import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Toast, Popup } from 'mint-ui'
import index from './index.vue'
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
    components: { index },
    render: h => h(index)
}).$mount('#app')
