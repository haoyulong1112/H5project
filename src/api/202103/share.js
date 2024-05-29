import request from '@/utils/request'
let requestDomain = envConfig.requestDomain
requestDomain = requestDomain ? requestDomain : 'https://wx.wawalooo.com'
// 获取验证码
export const getCheckCode = data => {
    return request({
        url: `${requestDomain}/wawalu/token/getRecommandCheckCode`,
        data: data
    })
}
// 登录
export const verifyRecommandCheckCode = data => {
    return request({
        url: `${requestDomain}/wawalu/token/verifyRecommandCheckCode`,
        data: data
    })
}

// 获取opedniD
export const getOpenId = data => {
  return request({
      url: `${requestDomain}/wawalu/weixin/getOpenId`,
      data: data,
      type: 'get'
  })
}

// 获取会员商品
export const getMall = data => {
  return request({
      url: `${requestDomain}/wawalu/product/list`,
      data: data,
      type: 'get'
  })
}

// 支付下单接口
export const createOrder = data => {
  return request({
      url: `${requestDomain}/wawalu/order/createJsOrder`,
      data: data,
      type: 'post',
      headerType: 1
  })
}
