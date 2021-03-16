/*
utils/weixin/wxcode.js
跳转到微信授权获取code
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
export default (redirectUri = window.location.href, scope = 'snsapi_userinfo') => {
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${envConfig.shareAppid}&redirect_uri=${escape(redirectUri)}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
    window.location.href = url
    console.log(escape(redirectUri));
    console.log(url);
}
