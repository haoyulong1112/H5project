import Vue from 'vue'
import index from './index.vue'
import '@/utils/rem'
import '@/utils/favicon'
new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
