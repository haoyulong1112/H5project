/*
utils/hooks/sharepopup.js
打开客户端分享弹窗
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'
import setshareinfo from '@/utils/hooks/setshareinfoios'

export default (title, desc, url, img = config.shareImg) => {
    if (!system.android && !system.ios) {
        console.warn('sharepopup 不在客户端内')
        return
    }
    if (!title || !desc || !url) {
        console.warn('sharepopup 缺少参数')
        return
    }
    if (system.android) {
        // shareCardInfoDidlogNoQQ shareCardInfoDidlog 有qq
        if (system.version < '4.9.5') {
            window.fromh5data.shareCardInfoDidlog(desc, img, url, title)
        } else if (system.version < '5.0.0') {
            window.fromh5data.shareCardInfoDidlogNoQQ(desc, img, url, title)
        } else {
            // 1,2代表微信好友和朋友圈
            window.fromh5data.shareCardInfoDidlog(desc, img, url, title, '1,2')
        }
    }
    if (system.ios) {
        setshareinfo(title, desc, url, img)
        window.location.href = 'pethome://share'
    }
}
