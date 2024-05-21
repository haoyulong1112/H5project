/*
utils/weixin/wxcode.js
跳转到微信授权获取code
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
export default (redirectUri = window.location.href, scope = 'snsapi_base') => {
  console.log('redirectUri',redirectUri)
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4921723aacdd5734&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
    window.location.href = url
}
