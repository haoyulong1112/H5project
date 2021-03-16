/*
utils/hooks/tologin.js
跳转客户端登录
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default () => {
    if (system.android) {
        window.fromh5data.login()
    }
    if (system.ios) {
        window.location.href = 'pethome://login'
    }
}
