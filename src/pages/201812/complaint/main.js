import Vue from 'vue'
import index from './index.vue'
import '@/utils/rem'
import { Toast } from 'mint-ui'
import '@/utils/favicon'

window.Toast = Toast

new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
