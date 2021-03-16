import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 加载邀请人页面
export const loadInviterPage = data => {
    return request({
        url: `${requestDomain}/pet-api/activity/invite/loadInviterPage`,
        data: data
    })
}

// 生成用户邀请码
export const getUserInviteCode = data => {
    return request({
        url: `${requestDomain}/pet-api/activity/invite/getUserInviteCode`,
        data: data
    })
}

// 加载我的奖励
export const myReward = data => {
    return request({
        url: `${requestDomain}/pet-api/activity/invite/myReward`,
        data: data
    })
}
