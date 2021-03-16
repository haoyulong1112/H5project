/*
utils/hooks/setshareinfo.js
设置分享信息判断是安卓或IOS
@author haoyulong <haoyulong@haotang365.com.cn>

注意：默认index.html已经有所需的meta标签，图片不传默认取全局配置
*/

import system from '@/utils/system'
import setshareinfoandroid from '@/utils/hooks/setshareinfoandroid'
import setshareinfoios from '@/utils/hooks/setshareinfoios'
export default (type, title, desc, url, img = config.shareImg) => {
    if (system.android) {
        setshareinfoandroid(type, title, desc, url, img)
    } else if (system.ios) {
        setshareinfoios(title, desc, url, img)
    }
}
