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
            <div v-text="titleData.title" style="-webkit-box-orient: vertical"></div>
            <div v-text="titleData.desc"></div>
        </div>
        <!-- service -->
        <div class="service">
            <div class="service-item" v-for="(item, index) in serviceData" :key="`b${index}`" @click="downloadApp">
                <div>
                    <div class="service-icon">
                        <img v-lazy="getFullImgUrl(item.icon)" :key="item.icon">
                    </div>
                    <div class="service-title">
                        <div v-text="item.name"></div>
                        <div v-text="item.desc_bottom"></div>
                    </div>
                </div>
                <div>
                    <div class="service-price">
                        <div v-html="filterPrice(item.vip_price)"></div>
                        <div v-html="filterPrice(item.price)"></div>
                    </div>
                    <div class="service-btn">预约</div>
                </div>
            </div>
        </div>
        <!-- tab -->
        <div class="tab" v-cloak>
            <div :class="{active: curtab === index}" v-for="(item, index) in tabData" :key="`c${index}`" @click="tabClick(index)">{{item}}</div>
        </div>
        <!-- content -->
        <div class="content">
            <!-- 服务介绍内容 -->
            <div v-show="curtab === 0">
                <img v-lazy="getFullImgUrl(item)" v-for="(item, index) in detailData" :key="`d${index}`" @click="downloadApp">
            </div>
            <!-- 预约须知内容 -->
            <div v-show="curtab === 1">
                <img v-lazy="getFullImgUrl(item)" v-for="(item, index) in tipsData" :key="`e${index}`" @click="downloadApp">
            </div>
            <!-- commentComp 店铺评价 -->
            <comment-comp v-show="curtab === 2" :commentData="commentData"></comment-comp>
        </div>
        <!-- downloadComp -->
        <download-comp></download-comp>
        </div>
  </div>
</template>

<script>
import { commentService } from '@/api'
import { queryLastOrderInfo, queryServiceDetail } from '@/api/201809/serviceshare'
import getParams from '@/utils/urlparams'
import wxshare from '@/utils/weixin/wxshare'

import downloadComp from '@/components/download'
import commentComp from '@/components/201809/comment'

const downloadApp = config.downloadApp
const getFullImgUrl = config.getFullImgUrl
const getDesc = config.getDesc

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
                desc: ''
            },
            serviceData: [],
            // 当前选中tab的index
            curtab: 0,
            detailData: [],
            tipsData: [],
            commentData: [],
            // 评论总条数
            totalAmount: ''
        }
    },
    computed: {
        tabData () {
            return ['服务介绍', '预约须知', `服务评价${this.totalAmount}`]
        }
    },
    created () {
        // 获取详情id
        const params = getParams()
        queryLastOrderInfo(params)
            .then(res => {
                queryServiceDetail(params).then(res => {
                    if (res.code == 0) {
                        let datadetail = res.data;
                        this.infoFilter(datadetail);
                    }
                })
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
                commentService({
                    cellPhone: params.cellPhone || '',
                    system: params.system || '',
                    imei: params.imei || '',
                    serviceId: params.serviceId || '',
                    serviceType: params.serviceType,
                    type: params.type || '',
                    page: 1
                })
                    .then(res => {
                    // 处理返回结果
                        this.commentFilter(res.data)
                    })
            })
            .catch(err => {
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
            if (data.banners) {
                this.bannerData = data.banners
            }
            // detailData
            if (data.detailImgs) {
                this.detailData = data.detailImgs
            }
            // titleData
            if (data.service) {
                if (data.service.name) {
                    this.titleData.title = data.service.name
                }
                if (data.service.serviceAmount) {
                    this.titleData.desc = getDesc(data.service.serviceAmount)
                }
            }
            // serviceData
            if (data.servicePrice) {
                if (data.servicePrice.services) {
                    this.serviceData = data.servicePrice.services
                }
            }
            // tipsData
            if (data.remind) {
                this.tipsData = data.remind
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
        filterPrice (data) {
            let ret = ''
            if (data) {
                const arr = data.split('@@')
                for (let i = 0, len = arr.length; i < len; ++i) {
                    if (i === 1) {
                        ret += '<span>' + arr[i]
                    } else if (i === len - 1) {
                        ret += '</span>' + arr[i]
                    } else {
                        ret += arr[i]
                    }
                }
            }
            return ret
        }
    },
    components: {
        // 下载公共组件
        downloadComp,
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
