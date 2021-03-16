<template>
  <div class="container">
    <div class="loginpage">
        <div class="img-top"><img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15415064332893807850.png" alt=""></div>
        <div class="img-mid"><img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15415067662872695860.png" alt=""></div>
        <div class="login-text">注册或登录即可查看报告还有惊喜优惠券哦~</div>
        <login ref="login" :placeholders="placeholders" @confirm="submit" @getCode="getCode">
            <div slot="confirmBtn" class="loginbtn">立即领取</div>
        </login>
    </div>
  </div>
</template>

<script>
import login from '@/components/login/index.vue'
import { submitData } from '@/api/201810/loadactivityquestion'
import { Loading } from 'vux'
import { getPhoneCode, submitLogin } from '@/api'

export default {
    name: 'index',
    data () {
        return {
            submitFlag: false,
            placeholders: ['', '', ''],
            issubmits: true
        }
    },
    components: {
        login,
        Loading
    },
    created () {},
    beforeMount () {},
    methods: {
        getCode: function (data) {
            // 获取手机号data
            let getCodeData = data
            getCodeData.openid = window.openid || ''
            // 发送手机验证码
            getPhoneCode(getCodeData).then(res => {
                this.$refs.login.countdown()
            }).catch(err => {
                console.warn(err)
                if (err.msg) Toast(err.msg)
            })
        },
        submit: function (data) {
            data.openId = window.openid || ''
            if (this.issubmits) {
                this.issubmits = false;
                submitLogin(data).then(res => {
                    if (!window.openid) {
                        window.activityData.channel = 1
                    }
                    window.activityData.cellPhone = res.data.cellPhone
                    window.activityData.isNewUser = res.data.isNewUser
                    window.isNewUser = res.data.isNewUser
                    console.log(window.activityData)
                    submitData(window.activityData).then(res => {
                        window.answerLogId = res.data.answerLogId
                        window.reportPic = res.data.reportPic
                        window.isFirstAnswer = res.data.isFirstAnswer
                        window.contentText = res.data.msg
                        this.issubmits = true
                        window.curpage = 4
                        this.$router.go(-1)
                    }).catch(err => {
                        this.issubmits = true
                        console.warn(err)
                        if (err.msg) Toast(err.msg)
                    })
                }).catch(err => {
                    console.warn(err)
                    this.issubmits = true
                    if (err.msg) Toast(err.msg)
                })
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .container
        width 100%
        height 100%
        background: linear-gradient(180deg, #FEF5DE 0%, #FEE2D2 100%);
    .loginpage
        text-align center
        padding-top 0.43rem
        background: linear-gradient(180deg, #FEF5DE 0%, #FEE2D2 100%);
    .img-top
        width 5.61rem
        height 0.98rem
        margin 0 auto
        > img
            width 100%
    .img-mid
        width 4.59rem
        height 2.96rem
        margin 0 auto
        margin-top 0.32rem
        >img
            width 100%
    .login-text
        font-family: PingFangSC-Regular
        font-weight bold
        line-height 0.42rem
        margin 0 auto 0.3rem
        width 3.3rem
        font-size: 0.3rem
        color: #000000
        letter-spacing: 0
        text-align: center
    .loginbtn
        background: url('http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15415064323402925552.png') no-repeat
        background-size: 100% 100%
        -moz-background-size: 100% 100%
        -webkit-background-size: 100% 100%
        width: 4.22rem
        height: 1.26rem
        margin 1.25rem auto 0
        line-height: 1rem
        text-align: center
        font-family: PingFangSC-Medium
        font-weight bold
        font-size: 0.42rem
        color: #FFFFFF
        letter-spacing: 0.0017rem
</style>
