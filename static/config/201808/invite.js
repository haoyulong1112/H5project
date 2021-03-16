window.config = window.config || {}
//   config.vconsole = true
config.inviteShareTitle = function () {
    return '你的好友送来一张5折优惠券，立即领取！'
}
config.inviteShareDesc = '宠物洗澡仅需一杯咖啡钱，最低24.5元，北京所有【宠物家】门店通用。'
config.inviteShareImg = 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15690470902670425207.png'
config.inviteShareUrl = function (inviteCode, activityId) {
    inviteCode = inviteCode || ''
    activityId = activityId || ''
    return envConfig.shareDomain + '/static/content/html5/byvue/dist/201808/inviteshare/index.html?inviteCode201806=' + inviteCode + '&activityId=' + activityId
}
config.yqjlTitle = '成功邀请达到'
config.contentImg = 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15403779770971337547.png'
