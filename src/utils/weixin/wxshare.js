/*
utils/weixin/wxshare.js
封装微信浏览器内分享
@author jinhuajie <jinhuajie@haotang365.com.cn>

@api
shareData.title : String 分享标题
shareData.desc : String 分享描述
shareData.link : String 分享链接，默认当前链接
shareData.imgUrl : String 分享图片，默认取全局配置
shareData.type : String 分享类型,music、video或link，不填默认为link
shareData.dataUrl : String 如果type是music或video，则要提供数据链接，默认为空
shareData.success : String 用户点击了分享后执行的回调函数 以下是返回值res.errMsg和对应的含义
    'sendAppMessage:ok' 微信好友
shareData.cancel : String 用户取消分享后执行的回调函数,QQ,QQ空间,腾讯微博可用

options：添加默认的jsApiList,然后传给wxconfig

注意：返回Promise，配置成功或失败可在then，catch中捕捉，用户点击分享的行为可在success回调获取
*/

import wx from 'weixin-js-sdk'
import wxconfig from './wxconfig'

export default (shareData, options) => {
    return new Promise((resolve, reject) => {
        options = options || {}
        options.jsApiList = options.jsApiList || ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        shareData = shareData || {}
        shareData.link = shareData.link || window.location.href
        shareData.imgUrl = shareData.imgUrl || config.shareImg
        // options.url = shareData.link;
        wxconfig(options).then((res) => {
            wx.onMenuShareTimeline(shareData)
            wx.onMenuShareAppMessage(shareData)
            wx.onMenuShareQQ(shareData)
            wx.onMenuShareWeibo(shareData)
            wx.onMenuShareQZone(shareData)
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
