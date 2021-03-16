import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 获取剩余充值名额
/*
{
    无
}
 */
export const getRechangeNum = data => {
    return request({
        url: `${requestDomain}/pet-api/recharge/template/list`,
        data: data
    })
}
