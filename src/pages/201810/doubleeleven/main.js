import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { Toast } from 'mint-ui'
import App from './App.vue'
import router from './router.js'
import '@/utils/rem'
import '@/utils/favicon'

Vue.use(VueLazyload)
window.Toast = Toast

new Vue({
    router,
    components: { App },
    render: h => h(App)
}).$mount('#app')

// var hidden = 'hidden';
// // 各个浏览器属性兼容
// if (hidden in document) { document.addEventListener('visibilitychange', onchange); } else if ((hidden = 'mozHidden') in document) { document.addEventListener('mozvisibilitychange', onchange); } else if ((hidden = 'webkitHidden') in document) { document.addEventListener('webkitvisibilitychange', onchange); } else if ((hidden = 'msHidden') in document) { document.addEventListener('msvisibilitychange', onchange); } else if ('onfocusin' in document) { document.onfocusin = document.onfocusout = onchange; } else { window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange; }

// // 主要功能代码
// // 网页状态改变事件
// function onchange () {
//     if (!document[hidden]) {
//         console.log(window.videObj)
//         if (window.videObj) {
//             setTimeout(function () {
//                 var o = navigator.userAgent.toLowerCase()
//                 var s = o.indexOf('micromessenger') > -1
//                 var a = o.indexOf('android') > -1 || o.indexOf('linux') > -1
//                 if (!(s && a)) {
//                     window.videObj.play()
//                 }
//             }, 300)
//         }
//     }
// }
