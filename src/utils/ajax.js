/* eslint-disable */
/*
utils/ajax.js
封装ajax，支持Promise
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
export default (options = {}) => {
    const type = options.type ? options.type.toUpperCase() : 'POST'
    let url = options.url || ''
    const contentType = options.contentType || 'application/x-www-form-urlencoded'
    const data = options.data || {}
    const async = options.async !== false

    return new Promise((resolve, reject) => {
        let requestObj = {}
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest()
        } else {
            requestObj = new ActiveXObject()
        }

        let dataStr = ''
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        if (type == 'GET') {
            url = dataStr ? url + '?' + dataStr : url
            requestObj.open(type, url, async)
            requestObj.setRequestHeader('Content-type', contentType)
            requestObj.send()
        } else if (type == 'POST') {
            if (data.system) {
                if (url.indexOf('?') > 0) {
                    url = url + '&system=' + data.system;
                } else {
                    url = url + '?system=' + data.system;
                }
            }
            requestObj.open(type, url, async)
            requestObj.setRequestHeader('Content-type', contentType)
            requestObj.send(dataStr)
        } else {
            reject(new Error('不支持的type'))
        }

        requestObj.onreadystatechange = () => {
            if (requestObj.readyState == 4) {
                if (requestObj.status == 200) {
                    let obj = requestObj.response
                    if (typeof obj !== 'object') {
                        obj = JSON.parse(obj)
                    }
                    resolve(obj)
                } else {
                    reject(requestObj)
                }
            }
        }
    })
}