<template>
  <div class="container">
      <div class="imgbox">
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15608530949099934667.jpg" >
        <div class="btn" @click="toRecharge">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15608522233348722216.png" >
        </div>
      </div>
  </div>
</template>
<script>
import tologin from '@/utils/hooks/tologin'
import torecharge from '@/utils/hooks/torecharge'
import setshareinfo from '@/utils/hooks/setshareinfo'
import wxshare from '@/utils/weixin/wxshare'
import useragent from '@/utils/useragent'
import getParams from '@/utils/urlparams'
const params = getParams()
const refresh = new Date().getTime()
const weixin = useragent.weixin
const downloadApp = config.downloadApp
const curUrl = envConfig.shareDomain + '/static/content/html5/byvue/dist/201811/rechargeshare/index.html'
export default {
    data () {
        return {
            rechangeNum: 0,
            shareTitle: '充2500送1000，截止到6.30，宠物家年中充值钜惠，马上充',
            shareDescribe: '更有充1200送300，机不可失',
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
        toRecharge () {
            if (weixin) {
                downloadApp();
            } else {
                // 是否登录
                let cellPhone = params.cellPhone
                if (cellPhone) {
                    torecharge()
                } else {
                    tologin()
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
