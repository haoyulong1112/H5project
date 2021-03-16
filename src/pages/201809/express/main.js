import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Toast, Popup, Progress } from 'mint-ui'
import index from './index.vue'
import '@/utils/rem'
import '@/utils/favicon'
import '@/utils/vconsole'

Vue.use(VueLazyload)
window.Toast = Toast
Vue.component(Popup.name, Popup)
Vue.component(Progress.name, Progress)

new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
