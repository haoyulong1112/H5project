/*
utils/useragent.js
用户浏览器信息
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
const u = navigator.userAgent

export default {
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    ios: u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1,
    iphone: u.indexOf('iPhone') > -1,
    weixin: u.toLowerCase().indexOf('micromessenger') > -1
}
