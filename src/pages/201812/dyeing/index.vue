<template>
  <div class="container">
      <div class="imgbox">
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15441503642601552175.jpg" >
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15441503644784134211.jpg" >
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15441503646667282085.jpg" >
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15441503648680559952.jpg" >
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15441503650619143353.jpg" >
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15441503653037067875.jpg" >
        <div class="btn" @click="goSpeciallist">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15441503877056960073.png" >
        </div>
      </div>
  </div>
</template>
<script>
import setshareinfo from '@/utils/hooks/setshareinfo'
import wxshare from '@/utils/weixin/wxshare'
import useragent from '@/utils/useragent'
import system from '@/utils/system'
import getParams from '@/utils/urlparams'
const params = getParams()
const refresh = new Date().getTime()
const downloadApp = config.downloadApp
const weixin = useragent.weixin
const curUrl = envConfig.shareDomain + '/static/content/html5/byvue/dist/201812/dyeing/index.html'
export default {
    data () {
        return {
            shareTitle: '造型炫酷的萌宠，都需要雕花染色',
            shareDescribe: '宠物家精湛造型技术。打造时尚炫酷萌宠，天然染色原材料。温和无害，立即体验→',
            fullurl: ''
        }
    },
    created () {
        this.fullurl = this.getFullUrl(curUrl);
        // 设置分享
        if (weixin) {
            // 设置二次分享
            let shareData = {}
            shareData.title = this.shareTitle;
            shareData.desc = this.shareDescribe;
            wxshare(shareData)
        } else {
            setshareinfo('1,2', this.shareTitle, this.shareDescribe, this.fullurl)
        }
    },
    methods: {
        // 下载公共方法
        downloadApp,
        goSpeciallist () {
            if (weixin) {
                downloadApp();
            } else {
                if (system.Terminal.platform.android) {
                    window.fromh5lucy.unusualServe('12');
                }
                if (system.Terminal.platform.iPhone) {
                    window.location.href = 'pethome://unusualServe_12';
                }
            }
        },
        // 进入微信需要重新加载并获取新的微信链接
        getFullUrl (url) {
            // 登录信息
            if (url) {
                const cellPhone = params.cellPhone || ''
                const imei = params.imei || ''
                const system = params.system || ''
                return `${url}?cellPhone=${cellPhone}&imei=${imei}&system=${system}&t=${refresh}`
            }
        }
    }
}
</script>
<style src="./index.styl" lang="stylus"></style>
