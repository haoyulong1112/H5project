// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Toast } from 'mint-ui'
import index from './index.vue'
import '@/utils/rem'
import '@/utils/favicon'

Vue.use(VueLazyload)
window.Toast = Toast

/* eslint-disable no-new */
new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
