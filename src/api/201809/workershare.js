import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 获取美容师信息接口
export const queryWorkerById = data => {
    return request({
        url: `${requestDomain}/pet-api/worker/queryWorkerById`,
        data: data
    })
}
// 评论组件接口
export const commentWorker = data => {
    return request({
        url: `${requestDomain}/pet-api/comment/worker`,
        data: data
    })
}
