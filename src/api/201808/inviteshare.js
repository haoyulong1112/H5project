import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 图形验证码
export const generateImageCode = mobileKey => {
    return `${requestDomain}/pet-api/activity/invite/generateImageCode?mobileKey=${mobileKey}`
}

// 校验图片验证码，发送短信验证码
export const genVerifyCode = data => {
    return request({
        url: `${requestDomain}/pet-api/activity/invite/genVerifyCode`,
        data: data
    })
}

// 被邀请人输入手机号码领取奖励
export const newUserInvited = data => {
    return request({
        url: `${requestDomain}/pet-api/activity/invite/newUserInvited`,
        data: data
    })
}

// 加载邀请人信息
export const loadInviterMessage = data => {
    return request({
        url: `${requestDomain}/pet-api/activity/invite/loadInviterMessage`,
        data: data
    })
}

// 判断是否绑定openId
export const isBindingOpenId = openId => {
    return request({
        url: `${requestDomain}/pet-api/activity/invite/isBindingOpenId`,
        data: {openId: openId}
    })
}
