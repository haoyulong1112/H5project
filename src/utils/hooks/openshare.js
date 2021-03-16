/*
utils/hooks/openshare.js
直接呼起分享目标APP
@author jinhuajie <jinhuajie@haotang365.com.cn>

@api
type 1 微信好友，2 朋友圈，3 QQ
*/
import system from '@/utils/system'
import setshareinfo from '@/utils/hooks/setshareinfoios'
import sharepopup from './sharepopup'

export default (type, title, desc, url, img = config.shareImg) => {
    if (!system.android && !system.ios) {
        console.warn('openshare 不在客户端内')
        return
    }
    if (!type || !title || !desc || !url) {
        console.warn('openshare 缺少参数')
        return
    }
    if (system.version > '4.9.6') {
        if (system.android) {
            window.fromh5data.goShareCardInfo(title, img, url, desc, type)
        }
        if (system.ios) {
            setshareinfo(title, desc, url, img)
            window.location.href = 'pethome://shareCard';
            setTimeout(function () {
                window.location.href = `pethome://goShareCardInfo_${type}`
            }, 300);
        }
    } else {
        // 兼容4.9.6及以下
        sharepopup(title, desc, url, img)
    }
}
