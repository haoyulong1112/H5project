/*
utils/system.js
当页面通过客户端打开，获取url中的system信息
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import urlparams from '@/utils/urlparams';
const params = urlparams();

let system = [];
if (params.system) {
    system = params.system.split('_');
}

export default {
    android: system.findIndex(item => item === 'android') > -1,
    ios: system.findIndex(item => item === 'ios') > -1,
    version: system[1] ? `${system[1]}` : '',
    Terminal: {
        // 辨别移动终端类型
        platform: (function () {
            let u = navigator.userAgent;
            return {
                // android终端或者uc浏览器
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                // 是否为iPhone或者QQHD浏览器
                iPhone: u.indexOf('iPhone') > -1,
                // 是否iPad
                iPad: u.indexOf('iPad') > -1
            };
        })(),
        // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
        language: (
            navigator.browserLanguage || navigator.language
        ).toLowerCase()
    }
};
