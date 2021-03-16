/*
utils/hooks/setshareinfoandroid.js
android分享信息设置
@author haoyulong <haoyulong@haotang365.com.cn>

@api
type 1 微信好友，2 朋友圈，3 QQ
*/
import system from '@/utils/system'

export default (type, title, desc, url, img = config.shareImg) => {
    if (!system.android) {
        console.warn('setshareinfoandroid 不在安卓客户端内')
        return
    }
    if (!type || !title || !desc || !url) {
        console.warn('setshareinfoandroid 缺少参数')
        return
    }
    window.fromh5data.shareCardInfo(title, img, url, desc, type);
}
