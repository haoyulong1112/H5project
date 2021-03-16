import Vue from 'vue'
import index from './index.vue'
import '@/utils/rem'
import { Toast } from 'mint-ui'
import '@/utils/favicon'
// import getParams from '@/utils/urlparams'
// import torecharge from '@/utils/hooks/torecharge'
import updateurl from '@/utils/updateurl'

window.Toast = Toast
new Vue({
    components: { index },
    render: h => h(index)
}).$mount('#app')

// 登录回调
window.init_roll = cellPhone => {
    const url = updateurl({
        cellPhone: cellPhone
    })
    window.location.href = url
}
