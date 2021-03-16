<template>
  <div class="container">
    <!-- loading -->
    <loading :show="loading" text=""></loading>
    <div v-if="!loading" class="index" v-cloak>
      <!-- 新用户 -->
      <div v-if="newuser" v-show="!showXrlb" class="newuser">
        <div class="newuser-title">
          <div class="title-avatar">
            <img :src="(avatar && avatar !== 'http://demo.cwjia.cn' && avatar !== 'http://static.ichongwujia.com' )?avatar:'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732900299464274914.png'">
            <img v-show="isVip" src="@static/images/201808/inviteshare/vip.png">
          </div>
          <div class="slogen">
            <span v-cloak>您的好友 {{userName}}</span>
            <span>送你宠物家新人优惠</span>
          </div>
        </div>
        <div class="newuser-content">
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732900299017557492.png">
          <div>
            <div class="newuser-form">
              <div class="form-cellPhone">
                <input type="number" v-model="cellPhone" placeholder="请输入手机号 领取大礼包"/>
              </div>
              <div class="form-imgcode">
                <input type="number" v-model="imgcode" placeholder="请输入图形验证码"/>
                <img @click.stop="updateCode" :src="imgcodeUrl"/>
              </div>
              <div class="form-code">
                <input type="number" v-model="code" placeholder="请输入验证码"/>
                <span :class="getCodeBtnClass" @click.stop="genVerifyCode">{{getCodeBtnText}}</span>
              </div>
            </div>
            <div class="newuser-btn" @click="newUserInvited">
              <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732900295906284281.png">
              <!-- <p class="global-tip">只有在宠物家app中发起邀请才有奖励哦</p> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 老用户 -->
      <div v-else class="olduser-box">
        <div class="olduser">
          <div class="olduserimg">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732900923405529524.png" alt="">
          </div>
          <!-- <p v-text="oldUserTip1"></p>
          <p v-text="oldUserTip2" style="color: #FF3A1E;"></p>
          <p class="olduser-tip"><img src="@static/images/201808/inviteshare/xlb.png"><span v-html="oldUserTip3"></span></p> -->
          <div @click="share"><img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732900923970218588.png"></div>
        </div>
      </div>
      <!-- 新人礼包 -->
      <div class="xrlbbox" v-show="showXrlb">
        <div class="xrlb">
          <!-- <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15726088488803286517.png" class="xrlb-title">
          <div class="coupon-list">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15726094185304991723.png" alt="">
          </div> -->
          <div class="newuserimg">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15762357202316290305.png" alt="">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15922904840082228947.png" alt="">
          </div>
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732900685056488195.png" class="xrlb-btn" @click="touse">
        </div>
        <!-- <img src="@static/images/201808/inviteshare/lb.png" class="footer-img-xrlb"> -->
      </div>
      <!-- downloadComp -->
      <download-comp></download-comp>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import downloadComp from '@/components/download'
import { Loading } from 'vux'
import wxshare from '@/utils/wxshare'
import getParams from '@/utils/urlparams'
import useragent from '@/utils/useragent'
import getweixincode from '@/utils/getweixincode'
import {genVerifyCode, loadInviterMessage, isBindingOpenId, ticket, addActivityLog, getUserInviteCode, generateImageCode} from '@/api'

const oldUserTip1 = config.oldUserTip1
const oldUserTip2 = config.oldUserTip2
const oldUserTip3 = config.oldUserTip3
const inviteShareTitle = config.inviteShareTitle
const inviteShareDesc = config.inviteShareDesc
const inviteShareImg = config.inviteShareImg
const inviteShareUrl = config.inviteShareUrl
const cellPhoneReg = config.cellPhoneReg

export default {
    name: 'index',
    data () {
        return {
            oldUserTip1,
            oldUserTip2,
            oldUserTip3,
            // loading
            loading: true,
            // 显示新人礼包
            showXrlb: false,
            // 新人优惠券列表
            xrlblist: [],
            // 新用户标识
            newuser: true,
            // 邀请人信息
            userName: '',
            avatar: '',
            isVip: '',
            // 表单信息
            genVerifyCodeFlag: false,
            newUserInvitedFlag: false,
            mobileKey: '',
            cellPhone: '',
            imgcode: '',
            imgcodeUrl: '',
            getCodeBtnText: '获取验证码',
            getCodeBtnClass: '',
            code: ''
        }
    },
    components: {
    // 下载公共组件
        downloadComp,
        Loading
    },
    created () {
        alert('活动已结束！');
        this.loading = true
        // 获取链接上的参数
        const paramsObj = getParams()

        // 获取 活动id 邀请码
        this.inviteData.activityId = paramsObj.activityId || ''
        this.inviteData.inviteCode = paramsObj.inviteCode201806 || ''
        this.inviteData.cellPhone = paramsObj.cellPhone || ''
        this.inviteData.system = paramsObj.system || ''
        this.inviteData.imei = paramsObj.imei || ''

        if (!this.inviteData.inviteCode) {
            // 生成用户邀请码
            getUserInviteCode({
                cellPhone: this.inviteData.cellPhone,
                system: this.inviteData.system,
                imei: this.inviteData.imei,
                activityId: this.inviteData.activityId
            }).then(res => {
                this.inviteData.inviteCode = res.data.inviteCode
            }).catch(err => {
                if (err.status) Toast(err.status)
            })
        }

        const url = inviteShareUrl(this.inviteData.inviteCode, this.inviteData.activityId)
        if (useragent.weixin) {
            const weixincode = getweixincode(url)
            if (weixincode) {
                // 设置二次分享
                wxshare({
                    title: inviteShareTitle(),
                    desc: inviteShareDesc,
                    imgUrl: inviteShareImg,
                    link: url
                })
                // 获取openid
                ticket(weixincode).then(res => {
                    // 活动统计
                    if (this.inviteData.activityId) {
                        addActivityLog({
                            activityInfoId: 0,
                            shareActivityId: this.inviteData.activityId,
                            taskId: 0
                        })
                    }
                    if (res.data.errcode === 40163) {
                        // code已使用
                        getweixincode(url, true)
                    }
                    // 根据openid判断新老用户
                    this.inviteData.openid = res.data.openid || ''
                    return isBindingOpenId(this.inviteData.openid)
                }).then(res => {
                    if (res.data.status === 1) {
                        // 老用户
                        this.newuser = false
                    }
                }).catch(err => {
                    if (err.status) Toast(err.status)
                }).finally(() => {
                    this.loading = false
                })
            } else {
                getweixincode(url, true)
            }
        } else {
            this.loading = false
            // 活动统计
            if (this.inviteData.activityId) {
                addActivityLog({
                    activityInfoId: 0,
                    shareActivityId: this.inviteData.activityId,
                    taskId: 0
                })
            }
        }

        // 加载邀请人信息
        loadInviterMessage({
            activityId: this.inviteData.activityId,
            inviteCode: this.inviteData.inviteCode
        }).then(res => {
            this.isVip = res.data.memberLevel > 0
            this.avatar = res.data.avatar || 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15732900299464274914.png'
            this.userName = res.data.userName
        })
    },
    beforeMount () {
    // 生成图形码
        this.updateCode()
    },
    methods: {
        share () {
            Toast('立即打开APP邀请好友')
            setTimeout(() => {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haotang.pet&g_f=991653'
            }, 2000)
        },
        touse () {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haotang.pet&g_f=991653'
        },
        updateCode () {
            // 刷新图形码
            this.mobileKey = `${new Date().getTime()}${parseInt((Math.random() * 9 + 1) * 100000)}`
            this.imgcodeUrl = generateImageCode(this.mobileKey)
        },
        genVerifyCode () {
            // 获取验证码 拦截多次点击
            if (this.genVerifyCodeFlag) return
            // 获取并校验参数
            const data = {
                openId: this.inviteData.openid,
                code: this.imgcode.trim(),
                phone: this.cellPhone.trim(),
                mobileKey: this.mobileKey,
                encryptionCode: md5('haotang_jishubu01' + this.cellPhone.trim())
            }
            if (!data.phone) {
                Toast('请输入手机号')
                return
            } else if (!cellPhoneReg.test(data.phone)) {
                Toast('请检查手机号')
                return
            }
            if (!data.code) {
                Toast('请输入图形验证码')
                return
            } else if (data.code.length < 4) {
                Toast('请检查图形验证码')
                return
            }
            // 提交请求
            this.genVerifyCodeFlag = true
            genVerifyCode(data).then(res => {
                // 倒计时
                this.getCodeBtnClass = 'grey'
                this.countBackwards({
                    total: 60,
                    callback: (res) => {
                        if (res) {
                            this.getCodeBtnText = res + '秒'
                        } else {
                            this.getCodeBtnClass = ''
                            this.getCodeBtnText = '重新获取'
                            this.genVerifyCodeFlag = false
                        }
                    }
                })
            }).catch(err => {
                if (err) {
                    if (err.code === 1011) {
                        // 老用户 切换成老用户
                        this.newuser = false
                    } else if (err.code) {
                        Toast(err.msg)
                    } else {
                        Toast(err.status)
                    }
                }
                this.genVerifyCodeFlag = false
            })
        },
        // 倒数
        countBackwards: function (options) {
            options = options || {}
            // 接收 总数，速度（量），时间（毫秒），已计数，回调函数，一次回调函数，结束回调函数
            let total = options.total ? options.total : 10
            let speed = options.speed ? options.speed : 1
            let time = options.time ? options.time : 1000
            let counted = options.counted ? options.counted : 0
            let callback = options.callback ? options.callback : 0
            let callbackOnce = options.callbackOnce ? options.callbackOnce : 0
            let callbackEnd = options.callbackEnd ? options.callbackEnd : 0
            // 剩余总数
            let curentTotal = total - counted >= 0 ? total - counted : 0
            // 执行定时器
            let loop = setTimeout((loop) => {
                if (curentTotal !== 0) {
                    const leftover = curentTotal - speed >= 0 ? curentTotal - speed : 0
                    counted += speed
                    // 执行回调
                    if (callback) {
                        callback(leftover)
                    }
                    // 执行一次回调
                    if (callbackOnce) {
                        callbackOnce(leftover)
                    }
                    // 执行结束回调
                    if (leftover == 0 && callbackEnd) {
                        callbackEnd(leftover)
                    }
                    // 循环
                    this.countBackwards({
                        total: total,
                        speed: speed,
                        time: time,
                        counted: counted,
                        callback: callback,
                        callbackOnce: callbackOnce,
                        callbackEnd: callbackEnd
                    })
                } else {
                    loop = null
                }
            }, time)
            console.log(loop)
        },
        newUserInvited () {
            // 领取奖励 拦截多次点击
            alert('活动已结束！');

            // if (this.newUserInvitedFlag) return
            // // 获取并校验参数
            // const data = {
            //     code: this.code.trim(),
            //     cellPhone: this.cellPhone.trim(),
            //     activityId: this.inviteData.activityId,
            //     openId: this.inviteData.openid,
            //     inviteCode: this.inviteData.inviteCode
            // }
            // if (!data.cellPhone) {
            //     Toast('请输入手机号')
            // } else if (!/^1[0-9]{10}$/.test(data.cellPhone)) {
            //     Toast('请检查手机号')
            // }
            // if (!data.code) {
            //     Toast('请输入验证码')
            // } else if (data.code.length < 4) {
            //     Toast('请检查验证码')
            // }
            // // 提交请求
            // this.newUserInvitedFlag = true
            // newUserInvited(data).then(res => {
            //     // 获取成功 弹出礼包列表
            //     this.xrlblist = res.data
            //     this.showXrlb = true
            // }).catch(err => {
            //     if (err.status) Toast(err.status)
            //     if (err.msg) Toast(err.msg)
            //     this.newUserInvitedFlag = false
            // })
        }
    }
}
</script>

<style src="./index.styl" lang="stylus"></style>
