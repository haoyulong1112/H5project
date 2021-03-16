/*
utils/urlparams.js
获取url参数
@author jinhuajie <jinhuajie@haotang365.com.cn>

注意：因ios客户端不支持url带#号，因此使用了vue-router时不能直接把参数拼在路由后面通过$router获取，要用此方法获取，如有路由跳转需求，可自定义一个redirect参数
*/
export default () => {
    const paramarr = window.location.href.split('?')
    let ret = {}
    if (paramarr.length > 1) {
        let params = paramarr[1]
        // 去除#号
        const index = params.indexOf('%23/') !== -1 ? params.indexOf('%23/') : params.indexOf('#/')
        if (index !== -1) params = params.substr(0, index)
        for (let i of params.split('&')) {
            const j = i.split('=')
            if (j[0]) ret[j[0]] = j[1] || ''
        }
    }
    return ret
}
