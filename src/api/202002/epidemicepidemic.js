import request from '@/utils/request'
const requestDomain = 'http://worker.ichongwujia.com'

// 加载邀请人页面
export const healthinfo = data => {
    return request({
        url: `${requestDomain}/pet-worker/worker/health/info`,
        data: data
    })
}

// 加载邀请人页面
export const healthsubmit = data => {
    return request({
        url: `${requestDomain}/pet-worker/worker/health/submit`,
        data: data
    })
}
