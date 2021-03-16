import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

/*
登录参数
{
    "cellPhone" : "18888888888", //用户注册手机号码
    "system" : "ios_3.5.0", //操作平台
    "imei" : "DE302402-7A0C-43FE-A65D-F8F2D36BBB21" //IMEI
}
*/

// 砍价列表
/*
登录参数
{
    activityId:1,   //活动ID(必传参数)
    petId:156,      //宠物ID
    page:1,         //页码(必传参数)
}
*/
export const loadBargainListPage = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/loadBargainListPage`,
        data: data
    })
}

// 任务类型详情
/*
登录参数
{
    activityId:1,   //活动ID(必传参数)
    taskId:25,      //任务ID(必传参数)
}
*/
export const loadBargainTaskInfoPage = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/loadBargainTaskInfoPage`,
        data: data
    })
}

// 任务宠物列表
/*
登录参数
{
    activityId:1,   //活动ID(必传参数)
    petName:25,     //宠物昵称
}
*/
export const queryActivityBargainPetList = data => {
    return request({
        url: `${requestDomain}/pet-api/pet/queryActivityBargainPetList
        `,
        data: data
    })
}

// 我的免单列表
/*
登录参数
{
    activityId:1,   //活动ID(必传参数)
}
*/
export const loadBargainUserTaskList = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/loadBargainUserTaskList`,
        data: data
    })
}

// 我的道具列表
/*
登录参数
{
    activityId:1,   //活动ID(必传参数)
}
*/
export const loadBargainPropList = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/loadBargainPropList`,
        data: data
    })
}
