import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Toast } from 'mint-ui'
import index from './index.vue'
import '@/utils/rem'
import '@/utils/favicon'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)
window.Toast = Toast

new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
