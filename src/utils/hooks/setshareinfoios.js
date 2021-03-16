/*
utils/hooks/setshareinfoios.js
向与iOS定义的meta标签插入分享信息
@author jinhuajie <jinhuajie@haotang365.com.cn>

注意：默认index.html已经有所需的meta标签，图片不传默认取全局配置
*/
export default (title, desc, url, img = config.shareImg) => {
    const titleDom = document.querySelector('meta[name="sharetitle"]')
    const descDom = document.querySelector('meta[name="description"]')
    const imgDom = document.querySelector('meta[name="shareimg"]')
    const urlDom = document.querySelector('meta[name="shareurl"]')
    if (!titleDom || !descDom || !imgDom || !urlDom) console.warn('setshareinfoios 缺少标签')
    if (title && titleDom) {
        titleDom.setAttribute('content', title)
    }
    if (desc && descDom) {
        descDom.setAttribute('content', desc)
    }
    if (img && imgDom) {
        imgDom.setAttribute('content', img)
    }
    if (url && urlDom) {
        urlDom.setAttribute('content', url)
    }
}
