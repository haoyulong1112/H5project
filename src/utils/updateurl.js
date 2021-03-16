/*
utils/updateurl.js
更新url参数
@author jinhuajie <jinhuajie@haotang365.com.cn>

注意：会舍弃#号或%23后面的部分，因为ios客户端不支持url带#号，如果使用了vue-router时不能直接把参数拼在路由后面通过$router获取，如有路由跳转需求，可自定义一个redirect参数
*/
import mergeobject from '@/utils/mergeobject'
export default (options, url = window.location.href) => {
    const oldUrl = url.split('#')[0].split('23%')[0]
    const oldUrlArr = oldUrl.split('?')
    const hostname = oldUrlArr[0]
    const oldParamsArr = oldUrlArr[1] ? oldUrlArr[1].split('&') : []
    let params = {}
    for (let item of oldParamsArr) {
        params[item.split('=')[0]] = item.split('=')[1] || ''
    }
    let paramsString = ''
    const mergedParams = mergeobject(params, options)
    for (let item in mergedParams) {
        paramsString += `${item}=${mergedParams[item]}&`
    }
    return `${hostname}${paramsString ? '?' + paramsString.substring(0, paramsString.length - 1) : ''}`
}
