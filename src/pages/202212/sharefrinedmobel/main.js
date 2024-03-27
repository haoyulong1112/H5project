import Vue from 'vue'
import index from './index.vue'
// import '@/utils/rem'
import '@/utils/favicon'
import 'vant/lib/index.css';
// import '@/utils/viewport'
import { Toast, Popup } from 'vant';

Vue.use(Popup);
window.Toast = Toast;
new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')
