<template>
  <div class="container" v-cloak>
    <div class="index">
      <!-- header，邀请好友按钮 -->
      <div class="header">
        <img :src="headerData.bg">
        <!-- tip, 轮播，规则按钮 -->
        <!-- <div class="header-tip">
          <div class="header-tip-swiper">
            <img src="@static/images/icons/horn.png">
            <div class="swiper-no-swiping">
              <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) in swiperList" :key="index">
                  <div class="header-tip-swiper-item">{{item}}</div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div> -->
      </div>
      <div class="header-btn" @click="invite">
        <img :src="headerData.btn">
      </div>
      <!-- 邀请奖励 -->
      <div class="yqjl block">
        <!-- <div class="block-title">邀请奖励</div> -->
        <div class="yqjl-coupon"><img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732899958027141402.png"></div>
        <div class="yqjl-title">
            5折优惠券赚取过程
        </div>
        <div class="content-img">
            <img :src="contentImg">
        </div>
      </div>
      <!-- 我的邀请战绩 -->
      <div class="block">
        <div class="block-title">我的邀请战绩</div>
        <div class="zj-content">
          <div>
            <div class="zj-num">
              {{zjData.userCount}}<span>张</span>
            </div>
            <span>获得5折优惠券</span>
          </div>
          <div>
            <div class="zj-num">
              {{zjData.userCount}}<span>人</span>
            </div>
            <span>成功邀请</span>
          </div>
        </div>
        <div class="zj-btn" @click="toPrize">
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732899960566237241.png">
        </div>
      </div>
      <!-- 参与流程 -->
      <!-- <div class="block">
        <div class="block-title">参与流程</div>
        <div class="lc-content">
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15723163222010663585.png">
        </div>
      </div> -->
      <!-- 客服电话 -->
      <div class="kf">
        <span>客服电话：</span><span @click="makephonecall" v-text="kfnum"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {loadInviterPage, getUserInviteCode} from '@/api/index'

import sharepopup from '@/utils/hooks/sharepopup'
import tologin from '@/utils/hooks/tologin'
import makephonecall from '@/utils/hooks/makephonecall'
import system from '@/utils/system'

const kfnum = config.kfnum
const yqjlTitle = config.yqjlTitle
const inviteShareTitle = config.inviteShareTitle
const inviteShareDesc = config.inviteShareDesc
const inviteShareImg = config.inviteShareImg
const inviteShareUrl = config.inviteShareUrl
// const contentImg = config.contentImg

export default {
    name: 'index',
    data () {
        return {
            contentImg: 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732899959672647440.png',
            kfnum,
            yqjlTitle,
            swiperOption: {
                autoplay: {
                    delay: 2000
                },
                loop: true,
                direction: 'vertical',
                autoHeight: true
            },
            // 滚动内容列表
            swiperList: [],
            // 头部
            headerData: {
                bg: '',
                btn: '',
                time: ''
            },
            // 任务列表
            tasks: [],
            // 战绩
            zjData: {
                money: 0,
                userCount: 0
            }
        }
    },
    async created () {
    // 登陆后 由客户端调用 获取手机号
        window.init_roll = cellPhone => {
            if (cellPhone && /^1[0-9]{10}$/.test(cellPhone)) {
                this.inviteData.cellPhone = cellPhone
                this.cellPhone = cellPhone
                this.loadInviterPage()
            }
        }
        if (this.inviteData.cellPhone) {
            this.cellPhone = this.inviteData.cellPhone
        }
        this.loadInviterPage()
    },
    methods: {
        makephonecall,
        loadInviterPage () {
            // 加载邀请人页面信息
            let data = {}
            if (this.inviteData.system) data.system = this.inviteData.system
            if (this.inviteData.imei) data.imei = this.inviteData.imei
            if (this.inviteData.cellPhone) data.cellPhone = this.inviteData.cellPhone
            if (this.inviteData.activityId) data.activityId = this.inviteData.activityId
            loadInviterPage(data).then((res) => {
                this.dataFilter(res.data)
            }).catch((err) => {
                if (err && err.msg) Toast(err.msg)
            })
        },
        invite () {
            const cellPhone = this.inviteData.cellPhone
            if (this.isLogin()) {
                // 已登录 生成用户邀请码
                getUserInviteCode({
                    cellPhone: cellPhone,
                    system: this.inviteData.system,
                    imei: this.inviteData.imei,
                    activityId: this.inviteData.activityId
                }).then(res => {
                    // 获取配置的分享信息
                    const sharetit = inviteShareTitle(this.userName)
                    const shareurl = inviteShareUrl(res.data.inviteCode, this.inviteData.activityId)
                    // 弹出客户端分享
                    sharepopup(sharetit, inviteShareDesc, shareurl, inviteShareImg)
                }).catch(err => {
                    if (err.status) Toast(err.status)
                    if (err.msg) Toast(err.msg)
                })
            }
        },
        toPrize () {
            if (this.isLogin()) {
                // 优惠券
                if (system.Terminal.platform.android) {
                    window.fromh5lucy.coupon(null);
                }
                if (system.Terminal.platform.iPhone) {
                    window.location.href = 'pethome://coupon_null';
                }
                // 礼品卡
                // this.$router.push('prize')
            }
        },
        isLogin () {
            if (!this.inviteData.cellPhone) {
                // 未登录 跳转登录
                tologin()
                return false
            }
            return true
        },
        dataFilter (data) {
            // swiper
            if (data.broadcastList && data.broadcastList.length) this.swiperList = data.broadcastList
            // header图，活动时间，ruleHtml
            if (data.activityInfo) {
                if (data.activityInfo.activityBgPic) {
                    this.headerData.bg = data.activityInfo.activityBgPic
                }
                if (data.activityInfo.buttonPic) {
                    this.headerData.btn = data.activityInfo.buttonPic
                }
                if (data.activityInfo.startTime && data.activityInfo.endTime) {
                    this.headerData.time = `${data.activityInfo.endTime.substr(0, 10).replace(/-/g, '.') || ''}`
                }
                if (data.activityInfo.activityRule) {
                    this.inviteData.ruleHtml = data.activityInfo.activityRule
                }
            }
            // 任务
            if (data.tasks && data.tasks.length > 0) this.tasks = data.tasks
            // 我的战绩
            if (data.userCount) this.zjData.userCount = data.userCount
            if (data.money) this.zjData.money = data.money
        }
    }
}
</script>

<style src="../style/index.styl" lang="stylus" scoped></style>
