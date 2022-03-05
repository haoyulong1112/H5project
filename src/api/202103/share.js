import request from '@/utils/request'
const requestDomain = envConfig.requestDomain
// 获取验证码
export const getCheckCode = data => {
    return request({
        url: `${requestDomain}/sound-live/token/getCheckCode`,
        data: data
    })
}
// 登录
export const loginSound = data => {
    return request({
        url: `${requestDomain}/sound-live/token/verifyCheckCode`,
        data: data
    })
}

// 登录
export const recommendList = (data,cellPhone) => {
    return request({
        url: `${requestDomain}/sound-live/admin/recommend/list`,
        data: data,
        header: {
            type: 1,
            cellPhone: cellPhone
        }
    })
}
