<template>
  <div class="container" >
    <div class="loginpage" :style="{ height: bodyHeight + 'px' }">
        <div class="img-top"></div>
        <div class="img-mid"></div>
        <login ref="login" :placeholders="placeholders" @confirm="submit" @getCode="getCode">
            <div slot="confirmBtn" class="loginbtn"></div>
        </login>
    </div>
  </div>
</template>

<script>
// import updateurl from '@/utils/updateurl'
import login from '@/components/login/index.vue'
import { Loading } from 'vux'
import { getPhoneCode, submitLogin } from '@/api'

export default {
    name: 'index',
    data () {
        return {
            submitFlag: false,
            placeholders: ['', '', ''],
            issubmits: true,
            showToolBargainSuccess: false,
            showBargainSuccess: false,
            bodyHeight: ''
        }
    },
    components: {
        login,
        Loading
    },
    created () {
    },
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
                submitLogin(data)
                    .then(res => {
                        if (res.code == 0) {
                            // console.log(res.data.userId);
                            // window.userId = res.data.userId;
                            window.islogin = true;
                            this.$router.push({
                                name: 'index',
                                params: {
                                    islogin: 1,
                                    userId: res.data.userId,
                                    isNewUser: res.data.isNewUser
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.warn(err)
                        this.issubmits = true
                        if (err.msg) Toast(err.msg)
                    })
            }
        }
    },
    mounted () {
        this.bodyHeight = document.documentElement.clientHeight
    }
}
</script>
<style lang="stylus" scoped>
    #app
        width 100%
        height 100%
    html, body {
        height 100%
    }

    .loginpage
        text-align center
        padding-top 0.43rem
        background: url('http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15445143987586809028.jpg') no-repeat
        background-size: 100% 100%;
        width 100%
        height 100%
        background-size: 100% 100%
        -moz-background-size: 100% 100%
        -webkit-background-size: 100% 100%
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
        margin-bottom 1rem
        >img
            width 100%
    .login
        position absolute
        top 50%
        left 50%
        margin-left -2.9rem
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
        background: url('http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15445147869905387948.png') no-repeat
        background-size: 100% 100%
        -moz-background-size: 100% 100%
        -webkit-background-size: 100% 100%
        width: 4.5rem
        height: 1rem
        margin 1.25rem auto 0
        line-height: 1rem
        text-align: center
        font-family: PingFangSC-Medium
        font-weight bold
        font-size: 0.42rem
        color: #FFFFFF
        letter-spacing: 0.0017rem
    .form-code > span
        position: absolute;
        right: 0.07rem!important;
        top: 0.07rem!important;
        width: 1.7rem!important;
        height: 0.66rem!important;
        line-height: 0.66rem!important;
        background-image: linear-gradient(0deg, #FBDC1B  100%, #FBDC1B  100%)!important;
        color: #000!important;
</style>
