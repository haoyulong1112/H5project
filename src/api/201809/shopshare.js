import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 门店详情
/*
/comment/shop
{
    "lat" : "39.938255", //地址纬度
    "lng" : "116.489995", //地址经度
    "shopId" : "3" //门店ID
}
*/
export const shopInfo = data => {
    return request({
        url: `${requestDomain}/pet-api/shop/info`,
        data: data
    })
}

// 门店详情
/*
{
    "shopId" : "1", //门店ID
    "page" : "1", //页码
    "size" : "10" //每页显示的数据条数
}
*/
export const commentShop = data => {
    return request({
        url: `${requestDomain}/pet-api/comment/shop`,
        data: data
    })
}
