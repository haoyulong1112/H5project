/*
utils/hooks/makephonecall.js
用于客户端内打电话（兼容ios客户端）客户端外不需要使用此方法，直接用<a href="tel:123456"></a>
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default (number = config.kfnumber) => {
    if (typeof number !== 'string' && typeof number !== 'number') {
        number = config.kfnumber
    }
    // 判断手机系统
    if (system.ios) {
        if (system.version > '4.9.4') {
            window.location.href = `pethome://cellTel_${number}`
        }
    } else {
        window.location.href = `tel:${number}`
    }
}
