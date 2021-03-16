import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 获取剩余充值名额
/*
{
    无
}
 */
export const activityIsOpen = data => {
    return request({
        url: `${requestDomain}/pet-api/invite/activityIsOpen`,
        data: data
    })
}
// 是否绑定OPenid
/*
{
   openId:"o9v8Yv2TKfuSb5lOPQaIBYYmlyVY",  //openId(必传参数)
}
 */
export const newIsBindingOpenId = data => {
    return request({
        url: `${requestDomain}/pet-api/invite/isBindingOpenId`,
        data: data
    })
}
// 获取图形验证码
export const newGetLoginImageCode = mobileKey => {
    return `${requestDomain}/pet-api/invite/generateImageCode?mobileKey=${mobileKey}`
}
// 获取手机短信验证码
export const newGetPhoneCode = data => {
    return request({
        url: `${requestDomain}/pet-api/invite/genVerifyCode`,
        data: data
    })
}

// 提交表单
export const newSubmitLogin = data => {
    return request({
        url: `${requestDomain}/pet-api/invite/login`,
        data: data
    })
}
