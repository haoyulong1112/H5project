/*
utils/request.js
对ajax再封装一层，拦截并发请求，也可以扩展其他请求/响应拦截器
@author jinhuajie <jinhuajie@haotang365.com.cn>

@api
options.concurrent 默认阻止url相同的请求并发，否则传true

注意：状态码为200，且java接口返回的code===0才会返回响应成功，即then函数中不需要判断code===0，code非0属于异常，做异常处理需要在catch函数里捕捉错误信息
*/

import ajax from '@/utils/ajax'

// 初始化一个数组保存当前请求
let ajaxArray = []

export default (options = {}) => {
    return new Promise((resolve, reject) => {
    // 是否阻止相同的请求并发 默认阻止
        let ajaxUrl = options.url
        if (!options.concurrent) {
            ajaxUrl = ajaxUrl.split('?')[0]
            if (ajaxArray.indexOf(ajaxUrl) !== -1) {
                reject(new Error(`请求并发 ${ajaxUrl}`))
                return
            }
            ajaxArray.push(ajaxUrl)
        }
        ajax(options).then((res) => {
            if (res.code === 0) {
                // code===0才会返回响应成功
                resolve(res)
            } else if (res.errno === 0) {
                resolve(res)
            } else {
                reject(res)
            }
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            // 从请求记录数组中移除当前请求
            const i = ajaxArray.indexOf(ajaxUrl)
            if (i !== -1) ajaxArray.splice(i, 1)
        })
    })
}
