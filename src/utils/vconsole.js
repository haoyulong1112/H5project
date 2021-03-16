/*
utils/vconsole.js
使用vconsole调试
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
import getParams from '@/utils/urlparams'
(function (document) {
    console.log(getParams())
    /* eslint no-useless-escape: "off" */
    if (getParams().vconsole) {
        document.write('<script src="https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js"><\/script><script>new VConsole();console.log(location.href)<\/script>')
    }
})(document)
