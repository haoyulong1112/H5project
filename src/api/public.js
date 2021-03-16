import request from '@/utils/request'
const requestDomain = envConfig.requestDomain
const manageDomain = envConfig.manageDomain

// 获取openId
export const ticket = code => {
    return request({
        url: `${requestDomain}/pet-api/wx/ticket`,
        data: {code: code}
    })
}

// 是否绑定OPenid
/*
{
   openId:"o9v8Yv2TKfuSb5lOPQaIBYYmlyVY",  //openId(必传参数)
}
 */
export const isBindOpenId = data => {
    return request({
        url: `${requestDomain}/pet-api/user/activity/isBindingOpenId`,
        data: data
    })
}

// 获取微信用户信息
/*
返回结果
city:""
country:"中国"
groupid:0
headimgurl:"http://thirdwx.qlogo.cn/mmopen/Z7r1ORJtSn5C47unGp2LuuVjjZDy8QSYzCuHQsFL1dAS1vxtGqzUTvichFjSuMJh7HTjl1pcqibic9Op8Sic9dHjoEiaYRVg8Vsuf/132"
language:"zh_CN"
nickname:""
openid:""
province:""
qr_scene:0
qr_scene_str:""
remark:""
sex:1
subscribe:1
subscribe_scene:"ADD_SCENE_QR_CODE"
subscribe_time:1509453441
tagid_list:[]
*/
export const info = (openId, accessToken) => {
    return request({
        url: `${requestDomain}/pet-api/wx/info`,
        data: {
            accessToken: accessToken,
            openId: openId
        }
    })
}

// 获取微信签名
export const sign = url => {
    console.log('new', url);
    return request({
        url: `${requestDomain}/pet-api/wx/sign`,
        data: {url: encodeURIComponent(url)},
        type: 'get'
    })
}
// 获取图形验证码
export const getLoginImageCode = mobileKey => {
    return `${requestDomain}/pet-api/user/activity/generateImageCode?mobileKey=${mobileKey}`
}
// 获取手机短信验证码
export const getPhoneCode = data => {
    return request({
        url: `${requestDomain}/pet-api/user/activity/genVerifyCode`,
        data: data
    })
}

// 提交表单
export const submitLogin = data => {
    return request({
        url: `${requestDomain}/pet-api/user/activity/login`,
        data: data
    })
}
// 活动统计
/*
邀请有礼
{
    "imei":"868062022063060" , //imei
    "cellPhone":"15995495110" , //手机号
    "activityInfoId":"1" , //活动页面活动的ID (必传参数默认传0)
    "shareActivityId":"1" , //分享页面的活动ID  (必传参数默认传0)
    "taskId":"0" , //(对应活动页面任务ID)(必传参数默认传0)
}
砍价
{
    "imei":"868062022063060" , //imei
    "cellPhone":"15995495110" , //手机号
    "type":"2" ,                //2砍价
    "activityInfoId":"1" ,      //活动的ID (必传参数)
    "shareActivityId":"1" ,     //砍价页面的活动ID  (必传参数默认传0)
    "taskId":"0" ,              //(对应活动页面任务ID)(必传参数)
    "pageType":"0" ,            //砍价活动页面类型（1列表页 2任务详情页 3砍价页）(必传参数)
}
*/
export const addActivityLog = data => {
    return request({
        url: `${requestDomain}/pet-api/logcount/addActivityLog`,
        data: data
    })
}

// 打点统计
export const logcountAdd = (typeid, activeid) => {
    return request({
        url: `${manageDomain}/logcount/add`,
        data: {typeid: typeid, activeid: activeid}
    })
}

// 订单评价
/*
{
    "serviceId" : "1", //服务Id
    "serviceType" : "1", //服务类型(1:洗澡、2:美容、3:特色服务)
    "type" : "1", //服务分类(1:洗护、2:寄养、3:游泳、4:训犬)
    "hasImg" : "1", //有图(0:否、1:是)
    "page" : "1" //页码
}
*/
export const commentService = data => {
    return request({
        url: `${requestDomain}/pet-api/comment/service`,
        data: data
    })
}

// 商城推荐
/*
接口文档 http://192.168.0.252/static/content/design/pet/mall/recommendedForYou.html
{
    type=1  //类型  0首页等 1商品详情页
    page=1  //页数  从1开始
    commodityId=1 //当然商品详情页的时候传此参数
}
*/
export const recommendedForYou = data => {
    return request({
        url: `${requestDomain}/pet-api/mall/commodity/recommendedForYou`,
        data: data
    })
}
