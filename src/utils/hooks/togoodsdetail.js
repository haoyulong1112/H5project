/*
utils/hooks/togoodsdetail.js
跳转客户端商城商品详情
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default (id) => {
    if (system.android) {
        window.fromh5lucy.goService(20, id)
    }
    if (system.ios) {
        window.location.href = `pethome://goGoodsDetail_${id}`
    }
}
