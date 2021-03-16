import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 获取百科详情
/*
{
    "itemId" : "1", //单项ID
    "shopId" : "7", //门店ID
    "serviceLoc" : "1", //服务方式
    "serviceId" : "1", //服务ID
    "petId" : "162" //犬种ID
}
 */
export const getExtraItem = data => {
    return request({
        url: `${requestDomain}/pet-api/appointment/getExtraItem`,
        data: data
    })
}
