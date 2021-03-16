/*
utils/hooks/torecharge.js
跳转客户端充值列表页
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default () => {
    if (system.android) {
        window.fromh5lucy.goService(16, '')
    }
    if (system.ios) {
        window.location.href = 'pethome://recharge'
    }
}
