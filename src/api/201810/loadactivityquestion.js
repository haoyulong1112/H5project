import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 获取活动信息详情
/*
{
    "activityId" : "1", //活动ID
}
 */
export const getActivityQuestionData = data => {
    return request({
        url: `${requestDomain}/pet-api/question/loadActivityQuestion`,
        data: data
    })
}

// 提交答题信息
/*
{
    activityId:"28",    //活动ID(必传参数)
    answerLog:"[{"id":"11","answer":"A","score":"28"},{"id":"12","answer":"D","score":"18"},{"id":"13","answer":"C","score":"8"},{"id":"14","answer":"D","score":"18"},{"id":"15","answer":"A","score":"18"}]", //答题信息(必传参数) id问题的ID
    cellPhone:"15995495140",    //用户手机号(必传参数)
    completeTime:"45秒",         //答题时长(必传参数)
    channel:"0",    //渠道 0:微信 1:app(必传参数)
    nickName:"",    //微信昵称(channel = 0 必传参数)
    wxPic:"",       //微信头像(channel = 0 必传参数)
    isNewUser:"0",  //是否是新用户 0否 1是
}
 */
export const submitData = data => {
    return request({
        url: `${requestDomain}/pet-api/question/completionActivityQuestion`,
        data: data,
        type: 'post'
    })
}

// 是否绑定OPenid
/*
{
   openId:"o9v8Yv2TKfuSb5lOPQaIBYYmlyVY",  //openId(必传参数)
}
 */
export const isBindingOpenId = data => {
    return request({
        url: `${requestDomain}/pet-api/user/activity/isBindingOpenId`,
        data: data
    })
}

// 是否长按图片
/*
{
   answerLogId:1,  //报告对应的记录ID(必传参数)
}
 */
export const isLongPress = data => {
    return request({
        url: `${requestDomain}/pet-api/question/isLongPress`,
        data: data
    })
}
// 打点统计
/*
{
   "imei":"868062022063060" , //imei
        "cellPhone":"15995495110" , //手机号
        "type":"3" ,                //3双十一答题(必传参数)
        "activityInfoId":"1" ,      //活动的ID (必传参数)
        "taskId":"0" ,              //(对应活动页面打点的ID)(0页面浏览 1开始答题按钮 2完成答题按钮 )
        "pageType":"0" ,            //页面打开的渠道 1APP 2微信
}
 */
export const addActivityLog = data => {
    return request({
        url: `${requestDomain}/pet-api/logcount/addActivityLog`,
        data: data
    })
}
