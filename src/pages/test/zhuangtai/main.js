import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/rem'

new Vue({
    router,
    store,
    components: { App },
    render: h => h(App)
}).$mount('#app')
