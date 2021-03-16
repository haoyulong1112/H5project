<template>
  <div class="container">
    <!-- loading -->
    <loading :show="loading" text=""></loading>
    <div v-if="!loading" class="index" v-cloak>
      <!-- 新用户 -->
      <div v-if="newuser" v-show="!showXrlb" class="newuser">
        <div class="newuser-title">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277684354166017.png" alt="">
        </div>
        <div class="newuser-content">
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277681686760352.png">
          <div class="formbox">
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
              立即领取
            </div>
          </div>
        </div>
      </div>
      <!-- 老用户 -->
      <div v-else class="olduser-box">
        <img class="oldhf" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277682801308495.png" alt="">
        <div class="olduser">
            <img class="oldlw" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277685558666793.png" alt="">
          <div class="oldcontent"><img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646583163711642355.png" alt=""></div>
          <div class="share" @click="share">邀请好友</div>
        </div>
      </div>
      <!-- 新人礼包 -->
      <div class="xrlbbox" v-show="showXrlb">
        <div class="xrlb">
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277684354166017.png" class="xrlb-title">
          <div class="coupon-list">
            <div class="coupon-item" v-for="(item, index) of xrlblist" :key="index+new Date()">
              <div>
                <span class="coupon-amount">
                  <span class="coupon-icon">￥</span>{{item.amount}}
                </span>
              </div>
              <div>
                <span class="coupon-name">{{item.couponName}}</span>
                <span class="coupon-desc">{{item.description}}</span>
              </div>
            </div>
          </div>
          <div class="xrlb-btn" @click="touse">立即领取</div>
        </div>
        <!-- <img src="@static/images/201808/inviteshare/lb.png" class="footer-img-xrlb"> -->
      </div>
      <!-- downloadComp -->
      <!-- <download-comp></download-comp> -->
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
// import downloadComp from '@/components/download'
import { Loading } from 'vux'
import wxshare from '@/utils/wxshare'
import getParams from '@/utils/urlparams'
import useragent from '@/utils/useragent'
import getweixincode from '@/utils/getweixincode'
import {genVerifyCode, newUserInvited, logcountAdd, isBindingOpenId, ticket, addActivityLog, getUserInviteCode, generateImageCode} from '@/api'

const inviteShareTitle = config.inviteShareTitle
const inviteShareDesc = config.inviteShareDesc
const inviteShareImg = config.inviteShareImg
const newinviteShareUrl = config.newinviteShareUrl
const cellPhoneReg = config.cellPhoneReg

export default {
    name: 'index',
    data () {
        return {
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
            code: '',
            typeid: '',
            activeid: {
                zc: '',
                lyh: '',
                lq: ''
            }
        }
    },
    components: {
    // 下载公共组件
        // downloadComp,
        Loading
    },
    created () {
        this.loading = true
        // 获取链接上的参数
        const paramsObj = getParams()
        // 获取埋点
        this.typeid = paramsObj.typeid;
        this.activeid.zc = paramsObj.zc;
        this.activeid.lyh = paramsObj.lyh;
        this.activeid.lq = paramsObj.lq;
        // 注册页打点统计
        logcountAdd(this.typeid, 0).catch(err => {
            Toast(err.msg);
        })
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
        const url = newinviteShareUrl(this.inviteData.inviteCode, this.inviteData.activityId)
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
        // loadInviterMessage({
        //     activityId: this.inviteData.activityId,
        //     inviteCode: this.inviteData.inviteCode
        // }).then(res => {
        //     this.isVip = res.data.memberLevel > 0
        //     this.avatar = res.data.avatar || 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15308629880414378177.jpg'
        //     this.userName = res.data.userName
        // })
    },
    beforeMount () {
    // 生成图形码
        this.updateCode()
    },
    methods: {
        share () {
            // 老用户邀请按钮打点统计
            logcountAdd(this.typeid, this.activeid.lyh).catch(err => {
                Toast(err.msg);
            })
            Toast('立即打开APP邀请好友')
            setTimeout(() => {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haotang.pet&g_f=991653'
            }, 2000)
        },
        touse () {
            // 新用户领取按钮打点统计
            logcountAdd(this.typeid, this.activeid.lq).catch(err => {
                Toast(err.msg);
            })
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
            // 注册页领取按钮打点统计
            logcountAdd(this.typeid, this.activeid.zc).catch(err => {
                Toast(err.msg);
            })
            // 领取奖励 拦截多次点击
            if (this.newUserInvitedFlag) return
            // 获取并校验参数
            const data = {
                code: this.code.trim(),
                cellPhone: this.cellPhone.trim(),
                activityId: this.inviteData.activityId,
                openId: this.inviteData.openid,
                inviteCode: this.inviteData.inviteCode
            }
            if (!data.cellPhone) {
                Toast('请输入手机号')
                return
            } else if (!/^1[0-9]{10}$/.test(data.cellPhone)) {
                Toast('请检查手机号')
                return
            }
            if (!data.code) {
                Toast('请输入验证码')
                return
            } else if (data.code.length < 4) {
                Toast('请检查验证码')
                return
            }
            // 提交请求
            this.newUserInvitedFlag = true
            newUserInvited(data).then(res => {
                // 获取成功 弹出礼包列表
                this.xrlblist = res.data
                this.showXrlb = true
            }).catch(err => {
                if (err.status) Toast(err.status)
                if (err.msg) Toast(err.msg)
                this.newUserInvitedFlag = false
            })
        }
    }
}
</script>

<style src="./index.styl" lang="stylus"></style>
