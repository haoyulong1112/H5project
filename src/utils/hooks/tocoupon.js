/*
utils/hooks/tocoupon.js
跳转客户端优惠券页面
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default () => {
    if (system.android) {
        window.fromh5lucy.coupon('1')
    }
    if (system.ios) {
        window.location.href = 'pethome://coupon'
    }
}
