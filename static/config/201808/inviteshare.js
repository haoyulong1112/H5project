window.config = window.config || {}
// config.vconsole = true
config.inviteShareTitle = function () {
    return '你的好友送来一张5折优惠券，立即领取！'
}
config.inviteShareDesc = '宠物洗澡仅需一杯咖啡钱，最低24.5元，北京所有【宠物家】门店通用。'
config.inviteShareImg = 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15690470902670425207.png'
config.inviteShareUrl = function (inviteCode, activityId) {
    inviteCode = inviteCode || ''
    activityId = activityId || ''
    return `${location.href.split('#')[0].split('?')[0]}?activityId=${activityId}&inviteCode201806=${inviteCode}`
}
config.oldUserTip1 = 'hi，您已经是宠物家的老朋友了，'
config.oldUserTip2 = 'App中邀请好友就可以领取奖励啦！'
config.oldUserTip3 = '好友可得<span style="color: #FF3A1E">新人首单专享4折券</span>'
config.newinviteShareUrl = function (inviteCode, activityId) {
    inviteCode = inviteCode || ''
    activityId = activityId || ''
    return `${location.href.split('#')[0].split('?')[0]}?activityId=${activityId}&inviteCode201806=${inviteCode}&${location.href.split('#')[0].split('?')[1]}`
}
// config.oldUsertext = '好友可得100元新人专享大礼包'
