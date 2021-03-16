import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 获取活动信息详情
/*
{
    "activityId" : "1", //活动ID
}
 */
export const getActivityExpress = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/loadBargainUserTaskList`,
        data: data
    })
}
