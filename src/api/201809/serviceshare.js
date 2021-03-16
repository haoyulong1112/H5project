import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 用户上一单信息
/*
{
    "serviceType" : "1", //服务类型(1:洗澡、2:美容、3:特色服务),必传
    "serviceId" : "1", //服务ID
    "workerId" : "1" //美容师ID
}
*/
export const queryLastOrderInfo = data => {
    return request({
        url: `${requestDomain}/pet-api/appointment/queryLastOrderInfo`,
        data: data
    })
}

// 服务详情
/*
{
    "serviceType" : "1", //服务类型(1:洗澡、2:美容、3:特色服务),必传
    "strp" : "140_1_3466_0", //服务组装
    "shopId" : "7" //门店ID,非必填
}
*/
export const queryServiceDetail = data => {
    return request({
        url: `${requestDomain}/pet-api/appointment/queryServiceDetail`,
        data: data
    })
}
