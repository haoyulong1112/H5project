/*
utils/hooks/pointbackup.js
借用客户端point backup形式的跳转能力
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default (point, backup = '') => {
    if (!system.android && !system.ios) {
        console.warn('openshare 不在客户端内')
        return
    }
    if (!point) {
        console.warn('pointbackup 缺少point')
        return
    }
    if (system.android) {
        window.fromh5lucy.goService(parseInt(point), `${backup}`)
    }
    if (system.ios) {
        window.location.href = `pethome://goPoint_${point}_${backup}`
    }
}
