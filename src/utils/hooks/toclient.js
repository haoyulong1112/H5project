/*
utils/hooks/tocoupon.js
跳转客户端优惠券页面
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system'

export default () => {
    if (system.Terminal.platform.android) {
        window.fromh5data.showMallAddressList();
    }
    if (system.Terminal.platform.iPhone) {
        window.location.href = 'petHome://showMallAddressList';
    }
}
