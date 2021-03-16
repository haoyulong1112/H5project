/*
utils/clipboard.js
封装clipboard，返回Promise（已废弃，封装了更方便的复制组件，components/clipboard.vue）
@author jinhuajie <jinhuajie@haotang365.com.cn>

@api className 默认使用.clipboard类绑定

注意： toast提示依赖了mint-ui
*/
import Clipboard from 'clipboard'
import { Toast } from 'mint-ui'
window.Toast = Toast

export default (className = '.clipboard') => {
    let clipboard = new Clipboard(className)
    return new Promise((resolve, reject) => {
        clipboard.on('success', e => {
            Toast('复制成功')
            resolve()
        })
        clipboard.on('error', e => {
            Toast('该浏览器不支持自动复制')
            reject(new Error('该浏览器不支持自动复制'))
        })
    })
}
