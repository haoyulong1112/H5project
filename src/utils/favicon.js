/*
utils/favicon.js
读配置设置favicon
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/
((function (document, config) {
    config = config || {}
    if (!config.favicon) return

    let doms = []
    if (document.querySelector('link[rel="shortcut icon"]')) doms.push(document.querySelector('link[rel="shortcut icon"]'))
    if (document.querySelector('link[rel="icon"]')) doms.push(document.querySelector('link[rel="icon"]'))
    if (document.querySelector('link[rel="apple-touch-icon-precomposed"]')) doms.push(document.querySelector('link[rel="apple-touch-icon-precomposed"]'))
    for (let i of doms) {
        i.setAttribute('href', config.favicon)
    }
})(document, config))
