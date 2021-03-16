/*
utils/wxshare.js
封装微信二次分享(可用但已废弃，使用utils/weixin/wxshare.js)
@author jinhuajie <jinhuajie@haotang365.com.cn>

@api
shareData.title : String 分享标题
shareData.desc : String 分享描述
shareData.link : String 分享链接，默认当前链接
shareData.imgUrl : String 分享图片，默认取全局配置

注意：返回Promise，分享成功或失败可在then，catch中捕捉
*/

import wx from 'weixin-js-sdk'
import {sign} from '@/api/index'
import useragent from '@/utils/useragent'

export default (shareData) => {
    // 非微信
    if (!useragent.weixin) return false

    // 默认读配置的分享图片，是否开启debug
    const shareImg = config.shareImg
    const wxShareDebug = config.wxShareDebug

    shareData = shareData || {}
    shareData.title = shareData.title || ''
    shareData.desc = shareData.desc || ''
    shareData.link = shareData.link || window.location.href
    shareData.imgUrl = shareData.imgUrl || shareImg

    // 返回一个promise
    return new Promise(async (resolve, reject) => {
        const ret = await sign(location.href).catch(() => {
            reject(new Error('sign error'))
        })
        if (ret.code !== 0) {
            reject(new Error(`sign code ${ret.code} ${ret.msg}`))
        }
        wx.config({
            debug: wxShareDebug === true,
            appId: ret.data.appId,
            timestamp: ret.data.timestamp,
            nonceStr: ret.data.nonceStr,
            signature: ret.data.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ']
        })
        shareData.success = (res) => {
            resolve(res)
        }
        shareData.cancel = (res) => {
            resolve(res)
        }
        wx.ready(() => {
            wx.onMenuShareAppMessage(shareData)
            wx.onMenuShareTimeline(shareData)
            wx.onMenuShareQQ(shareData)
        })
    })
}
