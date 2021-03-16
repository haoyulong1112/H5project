<template>
  <div class="container">
      <div class="index">
        <!-- header -->
        <div class="header">
            <div v-cloak class="header-left">
                <div>{{titleData.realName}}</div>
                <div v-cloak v-show="titleData.upgradeTip">{{titleData.upgradeTip}}</div>
                <div><span>{{titleData.workLoc}}服务</span><span>{{titleData.level}}美容师</span></div>
                <div style="-webkit-box-orient: vertical;">简介：{{titleData.desc}}</div>
            </div>
            <div class="header-right">
                <img :src="getFullImgUrl(titleData.avatar)" alt="">
            </div>
        </div>
        <div class="skill">
            <div v-for="(item, index) in expertises" :key="`a${index}`">#{{item}}</div>
        </div>
        <!-- service -->
        <!-- <div class="service">
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
                <div v-cloak>
                    <div class="top-title">{{totalOrderAmount}}</div>
                    <div class="bottom-title">服务单</div>
                </div>
                <div v-cloak>
                    <div class="top-title">{{goodRate}}</div>
                    <div class="bottom-title">好评率</div>
                </div>
            </div>
        </div> -->
        <!-- works -->
        <div class="works">
            <div class="title">
                <div v-cloak>作品 ({{workerData.length}})</div>
                <div @click="downloadApp"><span>更多</span><img src="@static/images/icons/arrow.png" alt=""></div>
            </div>
            <div class="workslist">
                <div>
                    <img v-for="(item,index) in workerData" :key="`b${index}`" :src="getFullImgUrl(item.smallImgUrl)" @click="downloadApp" alt="">
                </div>
            </div>
        </div>
        <!-- comment 美容师评价 -->
        <div class="comment">
            <div class="title">
                <div v-cloak>全部评论 {{totalAmount}}</div>
                <div @click="downloadApp"><span>更多</span><img src="@static/images/icons/arrow.png" @click="downloadApp" alt=""></div>
            </div>
            <comment-comp :commentData="commentData"></comment-comp>
        </div>
        <!-- downloadComp -->
        <download-comp></download-comp>
        </div>
  </div>
</template>

<script>
import { queryWorkerById, commentWorker } from '@/api/201809/workershare'
import getParams from '@/utils/urlparams'
import wxshare from '@/utils/wxshare'

import downloadComp from '@/components/download'
import commentComp from '@/components/201809/comment'

const downloadApp = config.downloadApp
const getFullImgUrl = config.getFullImgUrl
const userAvatar = config.userAvatar

export default {
    name: 'Index',
    data () {
        return {
            userAvatar,
            shopData: {
                shopName: '',
                futureShop: ''
            },
            titleData: {
                title: '',
                desc: '',
                realName: '',
                avatar: '',
                workLoc: '',
                upgradeTip: ''
            },
            goodRate: 0,
            totalOrderAmount: 0,
            workerData: [],
            // 当前选中tab的index
            curtab: 2,
            detailData: [],
            // 美容师擅长
            expertises: [],
            commentData: [],
            // 评论总条数
            totalAmount: ''
        }
    },
    created () {
        // 获取详情workerId
        const params = getParams()
        let data = {}
        data.workerId = params.workerId
        data.cellPhone = params.cellPhone
        data.imei = params.imei
        data.system = params.system
        if (!data.workerId) {
            Toast('params not found')
            return
        }
        queryWorkerById(data)
            .then(res => {
                let data = res.data
                if (data) {
                // 处理返回结果
                    // console.log(data);
                    this.infoFilter(data)
                    // 设置二次分享
                    let shareData = {}
                    if (data.workerShareH5Title) shareData.title = data.workerShareH5Title
                    if (data.workerShareH5Context) shareData.desc = data.workerShareH5Context
                    if (data.avatar) shareData.imgUrl = getFullImgUrl(data.avatar)

                    wxshare(shareData)
                }
                // 请求评论数据
                commentWorker({
                    system: params.system || '',
                    workerId: params.workerId || '',
                    page: 1,
                    size: 2
                })
                    .then(res => {
                    // 处理返回结果
                        this.commentFilter(res.data)
                    })
            })
            .catch(err => {
                console.log(err)
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
            // data
            if (data) {
                this.titleData.level = data.level.name
                this.titleData.desc = data.introduction
                this.titleData.realName = data.realName
                this.titleData.avatar = data.avatar
                this.titleData.upgradeTip = data.upgradeTip
                if (data.workLoc == 1) {
                    // 1到店 2上门 3上门到店
                    data.workLoc = '到店'
                } else if (data.workLoc == 2) {
                    data.workLoc = '上门'
                } else if (data.workLoc == 3) {
                    data.workLoc = '上门到店'
                } else {
                    data.workLoc = ''
                }
                this.titleData.workLoc = data.workLoc
            }
            // expertises
            if (data.expertises) {
                this.expertises = data.expertises
            }
            // shopData
            if (data.shop) {
                this.shopData.shopName = data.shop.shopName
            }
            if (data.shop.futureShop) {
                this.shopData.futureShop = data.shop.futureShop
            }
            // levelDetail
            if (data.goodRate) {
                this.goodRate = data.goodRate
            }
            // levelDetail
            if (data.orderTotal) {
                this.totalOrderAmount = data.orderTotal
            }
            // levelDetail
            if (data.worker) {
                this.workerData = data.worker
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
        },
        getShopName (str) {
            if (str == '') {
                return
            }
            let regex = '\\（(.+?)\\）'
            let arr = str.match(regex)
            let ret = arr[1]
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
