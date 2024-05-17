import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import '@/utils/rem'
import '@/utils/favicon'
import 'vant/lib/index.css';
import { Toast, Popup } from 'vant';

Vue.use(Popup);
window.Toast = Toast;
new Vue({
    router,
    store,
    components: { App },
    render: h => h(App)
}).$mount('#app')

console.log(router)
// main.js
router.beforeEach(async (to,from,next) => {
  // 判断有没有openId 即授权了直接放行
  if (store.state.openId) {
      next()
  } else {
      // 没有授权去授权获取code 再放行
      const code = await getCode()
      await queryInfo(code)
      next()
  }
})

// 获取code
function getCode() {
  const code = getUrlCode().code ? getUrlCode().code : '';
  if (!code) {
      // 没有code 请求后端接口进行链接跳转获取code(链接值微信的授权链接，成功授权后会跳回 回调地址，在回调地址上 会携带code参数)
      return getWxOauthUrl({
          redirectUrl: window.location.href
      }).then(async ({data}) => {
          if (data.statusCode === 0) {
              window.location.replace(data.msg)
          }
      })
  } else {
      return code
  }
}

// 通过code 获取用户信息
function queryInfo(code) {
  return getUserInfo({code}).then(({data}) => {
      const result = data.data || {}
      store.commit('getUserInfo', result)
      store.commit('updateOpenid', result.openId)
  })
}

// 获取url 参数的通用方法
function getUrlCode() {
  // 截取url中的code方法
  const url = location.search;
  const theRequest = new Object();
  if (url.indexOf("?") !== -1) {
      const str = url.substring(1);
      const strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
  }
  return theRequest;
}

