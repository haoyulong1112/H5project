/*
utils/hooks/tomall.js
跳转客户端商城首页
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default () => {
    if (system.android) {
        window.fromh5lucy.goService(21, '')
    }
    if (system.ios) {
        window.location.href = `pethome://goService_21`
    }
}
