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
           <!--  <div v-show="showGoodRate" class="title-goodrate">
                <div v-text="titleData.goodRate"></div>
                <div>好评率</div>
            </div> -->
            <div class="title-name">
                <span v-text="titleData.name"></span>
                <a v-if="titleData.phone" :href="`tel:${titleData.phone}`">
                    <img src="@static/images/icons/phone-green.png">
                </a>
            </div>
            <div class="title-opentime">
                <span>营业时间：</span><span v-text="titleData.openTime"></span>
            </div>
            <div class="title-wx">
                <span>店铺微信：</span><span v-text="titleData.wxnum"></span>
                <img src="@static/images/icons/qrcode.png" @click="showWximg = true">
            </div>
            <div class="title-address">
                <div>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</div><span v-text="titleData.address"></span>
            </div>
        </div>
        <!-- tab -->
        <div class="tab" v-cloak>
            <div :class="{active: curtab === index}" v-for="(item, index) in tabData" :key="`c${index}`" @click="tabClick(index)">{{item}}</div>
        </div>
        <!-- content -->
        <div class="content">
            <!-- 服务项目 -->
            <div class="content-list" v-show="curtab === 0">
                <div v-for="(item, index) in serviceData" :key="`d${index}`" @click="downloadApp">
                    <img v-lazy="{src: getFullImgUrl(item.img), error: userAvatar}" :key="item.img">
                    <div v-text="item.itemName"></div>
                </div>
            </div>
            <!-- 店铺成员 -->
            <div class="content-list" v-show="curtab === 1">
                <div v-for="(item, index) in memberData" :key="`d${index}`" @click="downloadApp">
                    <img v-lazy="{src: getFullImgUrl(item.avatar), error: userAvatar}" :key="item.avatar">
                    <div v-text="item.realName"></div>
                    <div v-text="item.duty"></div>
                </div>
            </div>
            <!-- commentComp 店铺评价 -->
            <comment-comp v-show="curtab === 2" :commentData="commentData"></comment-comp>
        </div>
        <!-- 弹窗组件 -->
        <mt-popup v-model="showWximg" zIndex="990">
            <div class="wximg">
                <div class="wximg-content">
                    <div class="wximg-title">
                        <div>阿宠微信号：{{titleData.wxnum}}</div>
                        <clipboard :text="titleData.wxnum"></clipboard>
                    </div>
                    <div class="wximg-img">
                        <img :src="titleData.wximg">
                    </div>
                    <div class="wximg-tip">
                        <span>长按保存到相册</span>
                    </div>
                </div>
                <div @click="showWximg = false" class="wximg-btn">
                    <img src="@static/images/icons/clear.png">
                </div>
            </div>
        </mt-popup>
        <!-- downloadComp -->
        <download-comp></download-comp>
        </div>
  </div>
</template>

<script>
import { shopInfo, commentShop } from '@/api/201809/shopshare'
import getParams from '@/utils/urlparams'
import wxshare from '@/utils/wxshare'

import downloadComp from '@/components/download'
import clipboard from '@/components/clipboard'
import commentComp from '@/components/201809/comment'

const downloadApp = config.downloadApp
// const showGoodRate = config.showGoodRate
const getFullImgUrl = config.getFullImgUrl
const userAvatar = config.userAvatar

export default {
    name: 'Index',
    data () {
        return {
            userAvatar,
            // showGoodRate,
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
                name: '',
                phone: '',
                openTime: '',
                wxnum: '',
                wximg: '',
                address: ''
            },
            // 当前选中tab的index
            curtab: 0,
            serviceData: [],
            memberData: [],
            commentData: [],
            // 评论总条数
            totalAmount: '',
            // 店铺二维码弹窗开关
            showWximg: false
        }
    },
    computed: {
        tabData () {
            return ['服务项目', '店铺成员', `店铺评价${this.totalAmount}`]
        }
    },
    created () {
        // 获取详情id
        const params = getParams()
        shopInfo(params)
            .then(res => {
                let data = res.data
                if (data) {
                    // 处理返回结果
                    this.infoFilter(data)
                    // 设置二次分享
                    let shareData = {}
                    if (data.share) {
                        if (data.share.title) shareData.title = data.share.title
                        if (data.share.desc) shareData.desc = data.share.desc
                        if (data.share.img) shareData.imgUrl = data.share.img
                    }
                    wxshare(shareData)
                }
                // 请求评论数据
                let requestData = params
                requestData.shopId = params.shopId || ''
                requestData.size = 2
                requestData.system = params.system || ''
                commentShop(requestData)
                    .then(res => {
                    // 处理返回结果
                        this.commentFilter(res.data)
                    })
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
        tabClick (index) {
            this.curtab = index
        },
        infoFilter (data) {
            // bannerData
            if (data.bannerImg) {
                this.bannerData = data.bannerImg
            }
            // titleData
            if (data.shopName) {
                this.titleData.name = data.shopName
            }
            if (data.address) {
                this.titleData.address = data.address
            }
            if (data.shopWxNum) {
                this.titleData.wxnum = data.shopWxNum
            }
            if (data.shopWxImg) {
                this.titleData.wximg = data.shopWxImg
            }
            // if (data.goodRate) {
            //     this.titleData.goodRate = data.goodRate
            // }
            if (data.phone) {
                this.titleData.phone = data.phone
            }
            if (data.openTime) {
                this.titleData.openTime = data.openTime
            }
            // serviceData
            if (data.serviceItems) {
                this.serviceData = data.serviceItems
            }
            // memberData
            if (data.members) {
                this.memberData = data.members
            }
        },
        commentFilter (data) {
            data = data || {}
            // commentData
            if (data.totalAmount) {
                this.totalAmount = `(${data.totalAmount})`
            }
            const list = data.dataset
            if (list) {
                for (let i = 0, len = list.length; i < len; ++i) {
                    // 只取两条评论
                    if (i === 2) {
                        break
                    }
                    this.commentData.push(list[i])
                }
            }
        },
        getTotalAmount (data) {
            if (data) this.totalAmount = `(${data})`
        }
    },
    components: {
        // 下载公共组件
        downloadComp,
        // 复制组件
        clipboard,
        // 评论公共组件
        commentComp
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
