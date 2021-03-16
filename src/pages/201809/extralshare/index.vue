<template>
  <div class="container">
      <div class="index">
        <!-- banner -->
        <div class="banner">
            <div class="banner-box" @click="downloadApp">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in bannerData" :key="`a${index}`">
                        <img class="banner-swiper-item" :src="item.img">
                    </swiper-slide>
                    <div v-show="bannerData.length > 1" class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
        <!-- title -->
        <div class="title">
            <div v-cloak><span class="span-left">{{titleData.title}}</span><span class="span-right">已服务{{titleData.amount}}单</span></div>
            <div v-text="titleData.desc"></div>
        </div>
        <!-- content -->
        <div class="content">
            <!-- 服务介绍内容 -->
            <div class="title-content">服务介绍</div>
            <div>
                <img v-lazy="getFullImgUrl(item)" v-for="(item, index) in detailData" :key="`b${index}`" @click="downloadApp">
            </div>
        </div>
        <!-- footer -->
        <div class="footer">
            <div v-cloak class="price"><span>￥{{listPrice}}</span><span>会员￥{{vipPrice}}</span></div>
        </div>
        <download-comp></download-comp>
        </div>
  </div>
</template>

<script>
import { getExtraItem } from '@/api/201809/extralshare'
import getParams from '@/utils/urlparams'
import wxshare from '@/utils/weixin/wxshare'
import downloadComp from '@/components/download'
const downloadApp = config.downloadApp
const getFullImgUrl = config.getFullImgUrl

export default {
    name: 'Index',
    data () {
        return {
            swiperOption: {
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    bulletClass: 'swiper-pagination-bullet'
                }
            },
            bannerData: [],
            titleData: {
                title: '',
                desc: '',
                amount: ''
            },
            listPrice: '',
            vipPrice: '',
            detailData: []
        }
    },
    created () {
        // 获取详情id
        const params = getParams()
        this.vipPrice = params.vipPrice
        let data = {}
        data.itemId = params.id
        data.cellPhone = params.cellPhone
        data.imei = params.imei
        data.system = params.system
        console.log(data)
        if (!data.itemId) {
            Toast('params not found')
            return
        }

        getExtraItem(data)
            .then(res => {
                let data = res.data
                console.log(data);
                if (data) {
                    // 处理返回结果
                    this.infoFilter(data)
                    // 设置二次分享
                    let shareData = {}
                    if (data.share) {
                        if (data.share.title) shareData.title = data.share.title
                        if (data.share.desc) shareData.desc = data.share.desc
                        // if (data.share.img) shareData.imgUrl = data.share.img
                    }
                    wxshare(shareData)
                }
            })
            .catch(err => {
                console.warn(err)
                if (err.msg) Toast(err.msg)
            })
    },
    methods: {
        // 下载公共方法
        downloadApp,
        // 图片兼容方法
        getFullImgUrl,
        infoFilter (data) {
            // bannerData
            if (data.banner) {
                if (data.banner) {
                    this.bannerData = data.banner
                }
            }
            // detailPic
            if (data.detailPic) {
                this.detailData = data.detailPic
            }
            // listprice
            if (data.listPrice || data.listPrice == 0) {
                this.listPrice = data.listPrice
            }
            // titleData
            if (data.name) {
                if (data.name) {
                    this.titleData.title = data.name
                }
                if (data.desc) {
                    this.titleData.desc = data.desc
                }
                if (data.serviceAmount || data.serviceAmount == 0) {
                    this.titleData.amount = data.serviceAmount
                }
            }
        }
    },
    components: {
        // 下载公共组件
        downloadComp
    }
}
</script>

<style src="./index.styl" lang="stylus"></style>
<style lang="stylus">
body
  background-color #f8f8f8

#app
    width 100%
    height 100%

</style>
