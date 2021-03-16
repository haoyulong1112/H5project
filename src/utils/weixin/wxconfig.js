/*
utils/weixin/wxconfig.js
使用微信js-sdk前的基础配置
@author jinhuajie <jinhuajie@haotang365.com.cn>

注意：返回Promise，配置成功或失败可在then，catch中捕捉

文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
*/

import wx from 'weixin-js-sdk'
import { sign } from '@/api/index'
import useragent from '@/utils/useragent'
import system from '@/utils/system'

export default (options) => {
    return new Promise(async (resolve, reject) => {
        if (!useragent.weixin) {
            reject(new Error(`wxconfig 非微信浏览器`))
            return
        }

        // 接收参数
        options = options || {}
        // 获取签名时只能用页面原始链接请求，且vue在ios分享时需要去除#后面的字符
        let url = location.href;
        if (system.Terminal.platform.iPhone) {
            url = url.split('#')[0];
        }
        let signData = options.signData

        // 是否开启debug
        const wxShareDebug = config.wxShareDebug

        // 不传签名时调接口获取签名
        if (!signData) {
            const ret = await sign(url).catch((err) => {
                reject(new Error(`sign error ${err.code || ''} ${err.msg || ''}`))
            })
            signData = {
                appId: ret.data.appId,
                timestamp: ret.data.timestamp,
                nonceStr: ret.data.nonceStr,
                signature: ret.data.signature
            }
        }
        signData.debug = wxShareDebug === true
        signData.jsApiList = options.jsApiList

        console.log(signData)
        wx.config(signData)
        wx.ready((res) => {
            console.log('ready')
            console.log(res)
            resolve(signData)
        })
        wx.error((err) => {
            console.log(err)
            reject(err)
        })
    })
}
