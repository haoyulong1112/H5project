/*
utils/getweixincode.js
获取微信code
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import useragent from '@/utils/useragent'
import getParams from '@/utils/urlparams'

const shareAppid = envConfig.shareAppid

export default (redirectUri = window.location.href, refresh = false) => {
    const code = getParams().code
    // 判断浏览器 跳转微信授权
    if (useragent.weixin && (!code || refresh)) {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${shareAppid}&redirect_uri=${escape(redirectUri)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    } else {
        return code
    }
}
