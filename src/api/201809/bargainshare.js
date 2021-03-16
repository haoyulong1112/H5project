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

// 加载分享文案
/*
登录参数
{
    petId:139   //宠物类型id
    serviceId:2 //服务id
}
*/
export const loadShareCopy = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/loadShareCopy`,
        data: data
    })
}

// 微信好友分享次数计数
/*
登录参数
{
    "activityId" : 1 //活动id
    "taskId" : 1 //互动任务id。activityTaskInfo的id
    "openId" : 1 //openId
}
*/
export const addShareNum = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/addShareNum`,
        data: data
    })
}

// 砍价任务详情
/*
登录参数
{
    "activityId" : 1 //活动id
    "taskId" : 1 //互动任务id。activityTaskInfo的id
    "openId" : 1 //openId 微信中访问必须有此参数
}
*/
export const loadBargainUserTask = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/loadBargainUserTask`,
        data: data
    })
}

// 砍价任务发起
/*
登录参数
{
    "activityId" : 1 //活动id
    "taskId" : 1 //互动任务id。activityTaskInfo的id
    "source" : 1 //来源。0 列表 1详情
}
*/
export const newBargainUserTask = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/newBargainUserTask`,
        data: data
    })
}

// 砍价
/*
登录参数
{
    "activityId" : 1 //活动id
    "taskId" : 1 //互动任务id。activityTaskInfo的id
    "propId" : 1 //道具id
    "openId" : 1 //openId
    "nickName" : 1 //微信昵称
    "pic" : 1 //微信头像
}
*/
export const bargain = data => {
    return request({
        url: `${requestDomain}/pet-api/bargain/bargain`,
        data: data
    })
}
