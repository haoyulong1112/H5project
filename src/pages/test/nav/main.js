import Vue from 'vue'
import index from './index.vue'
new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
