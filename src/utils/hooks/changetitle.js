/*
utils/hooks/changetitle.js
更新title标签,iOS调用钩子
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import system from '@/utils/system';

export default title => {
    document.title = title;
    if (system.ios) {
        if (system.version > '4.9.999') {
            window.location.href = `pethome://changeTitle_${title}`;
        }
    }
};
