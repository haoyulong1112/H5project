import request from '@/utils/request'
const requestDomain = envConfig.requestDomain
// 获取验证码
export const getCheckCode = data => {
    return request({
        url: `${requestDomain}/token/getRecommandCheckCode`,
        data: data
    })
}
// 登录
export const verifyRecommandCheckCode = data => {
    return request({
        url: `${requestDomain}/token/verifyRecommandCheckCode`,
        data: data
    })
}
