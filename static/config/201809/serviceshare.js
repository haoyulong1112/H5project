window.config = window.config || {}
// config.vconsole = true
config.getDesc = function (num) {
    if (!num) {
        return '已服务0单'
    } else {
        return '已服务' + num + '单'
    }
}
