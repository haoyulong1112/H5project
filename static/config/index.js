(function(window) {
    // 区分环境的配置 252 demo prod
    var demoConfig = {
        // 请求域名头 pet-pai
        requestDomain: 'http://8.141.49.230:8200',
        //跨域
        // requestDomain: 'http://8.141.49.230',
    }

    var prodConfig = {
        // 请求域名头 pet-pai
        requestDomain: 'http://ch.huitingdata.com',
        // 分享appid
        // shareAppid: '',
        // 分享域名头
        shareDomain: 'http://www.huitingdata.com',
        // 管理域名头
        manageDomain: ''
    }

    // 固定的配置
    var config = {
        // rem布局页面最大宽度
        pageWidth: 640,
        // 分享图片
        shareImg: '~@static/images/icons/xianliao.png',
        // favicon
        favicon: '~@static/images/icons/xianliao.png',
        // 跳转应用宝下载APP
        downloadApp: function() { window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haotang.pet&g_f=991653' },
        // 下载组件logo
        downloadLogo: 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15655992124122270752.png',
        // 下载组件title
        downloadTitle: '咸聊',
        // 下载组件description
        downloadDescription: '专注您的聊天社交',
        // 客服电话
        kfnum: '400-030-0011',
        kfnumber: '4000300011',
    }

    // 通过hostname区分环境
    var demoDomainArray = ['8.141.49.230']
    var prodDomainArray = ['h5.huitingdata.com']

    var hostname = window.location.hostname

    function isItemInStr(str, arr) {
        for (var i = 0, len = arr.length; i < len; ++i) {
            if (str.indexOf(arr[i]) !== -1) { return true }
        }
        return false
    }

    window.config = config
    window.envConfig = {}
    if (isItemInStr(hostname, demoDomainArray)) {
        window.envConfig = demoConfig
    }
    if (isItemInStr(hostname, prodDomainArray)) {
        window.envConfig = prodConfig
    }
    console.log(window.envConfig)
}(window))
