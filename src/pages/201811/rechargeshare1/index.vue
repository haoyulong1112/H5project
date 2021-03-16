<template>
  <div class="container">
      <div class="imgbox">
        <div class="number" v-cloak>
            {{rechangeNum}}
        </div>
        <!-- <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15435458697595632248.jpg" > -->
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15607700078724495986.jpg" >
        <div class="btn" @click="toRecharge">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15607700076590685741.png" >
        </div>
      </div>
  </div>
</template>
<script>
import tologin from '@/utils/hooks/tologin'
import { getRechangeNum } from '@/api/201811/rechangeshare'
import torecharge from '@/utils/hooks/torecharge'
import setshareinfo from '@/utils/hooks/setshareinfo'
import wxshare from '@/utils/weixin/wxshare'
import useragent from '@/utils/useragent'
import getParams from '@/utils/urlparams'
const params = getParams()
const refresh = new Date().getTime()
const weixin = useragent.weixin
const downloadApp = config.downloadApp
const curUrl = envConfig.shareDomain + '/static/content/html5/byvue/dist/201811/rechargeshare1/index.html'
export default {
    data () {
        return {
            rechangeNum: 0,
            shareTitle: '充5000送2500，仅限200个，宠物家618充值钜惠，马上抢',
            shareDescribe: '更有充2500送1000，充1200送300，机不可失',
            fullurl: ''
        }
    },
    created () {
        this.fullurl = this.getFullUrl(curUrl);
        getRechangeNum().then(res => {
            let template = res.data.templates;
            for (let i = 0; i < template.length; i++) {
                if (template[i].tempType == 4) {
                    this.rechangeNum = template[i].extra.surplus.substring(0, template[i].extra.surplus.length - 1);
                    return;
                }
            }
        }).catch(err => {
            console.warn(err)
            if (err.msg) Toast(err.msg)
        });
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
