import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Toast, Popup, Progress } from 'mint-ui'
import App from './App.vue'
import router from './router.js'
import '@/utils/rem'
import '@/utils/favicon'
import '@/utils/vconsole'

Vue.use(VueLazyload)
window.Toast = Toast
Vue.component(Popup.name, Popup)
Vue.component(Progress.name, Progress)

new Vue({
    router,
    components: { App },
    render: h => h(App)
}).$mount('#app')
