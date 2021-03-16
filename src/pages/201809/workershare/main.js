import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Toast } from 'mint-ui'
import index from './index.vue'
import '@/utils/rem'
import '@/utils/favicon'

Vue.use(VueLazyload)
window.Toast = Toast

new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
