import Vue from 'vue'
import { Toast } from 'mint-ui'
import App from './App.vue'
import router from './router.js'
import '@/utils/rem'
import '@/utils/favicon'

window.Toast = Toast

new Vue({
    router,
    components: { App },
    render: h => h(App)
}).$mount('#app')
