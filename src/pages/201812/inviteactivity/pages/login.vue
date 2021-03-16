<template>
  <div class="container">
    <div class="loginpage">
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15457094930483277074.png" alt="">
        <login ref="login" :placeholders="placeholders" @confirm="submit" @getCode="getCode">
            <div slot="confirmBtn" class="loginbtn">立即领取</div>
        </login>
    </div>
  </div>
</template>

<script>
import login from '@/components/login1/index.vue'
import { newGetPhoneCode, newSubmitLogin } from '@/api/201812/inviteactivity'

export default {
    name: 'loginpage',
    data () {
        return {
            submitFlag: false,
            placeholders: ['', '', ''],
            issubmits: true,
            isgetCode: true
        }
    },
    components: {
        login
    },
    beforeMount () {},
    methods: {
        getCode: function (data) {
            // 获取手机号data
            let getCodeData = data
            getCodeData.openId = window.openid || ''
            // 发送手机验证码
            if (this.isgetCode) {
                this.isgetCode = false;
                newGetPhoneCode(getCodeData).then(res => {
                    this.isgetCode = true;
                    // 走正常登录流程
                    this.$refs.login.countdown();
                }).catch(err => {
                    this.isgetCode = true;
                    if (err.code == 14) {
                        // 跳转至无效用户页面
                        window.curpage = 2;
                        window.islogin = 1;
                        this.$router.push('index');
                    } else if (err.code == 15) {
                        // 跳转至有效用户页面领取优惠券
                        window.curpage = 1;
                        window.islogin = 1;
                        window.cellPhone = getCodeData.phone;
                        this.$router.push('index');
                    } else {
                        console.warn(err)
                        if (err.msg) Toast(err.msg)
                    }
                })
            }
        },
        submit: function (data) {
            data.openId = window.openid || ''
            if (this.issubmits) {
                this.issubmits = false;
                newSubmitLogin(data).then(res => {
                    this.issubmits = true
                    // 登录成功后跳转至有效用户页面
                    window.curpage = 1;
                    window.islogin = 1;
                    window.cellPhone = res.data.cellPhone;
                    this.$router.push('index');
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
<style lang="stylus">
@import '~@/assets/style/mixins.styl';
    .loginpage
        text-align center
        > img
            width:100%;
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
    .loginbtn
        background: #FEEA21;
        width: 4rem
        color #DC1F36;
        height 0.65rem;
        line-height 0.65rem;
        border-radius: 0.1rem;
        text-align: center
        font-family: PingFangSC-Medium
        font-weight bold
        font-size: 0.4rem
        letter-spacing: 0.0017rem
    .login
        position absolute
        top:7.55rem;
        left: 50%;
        margin-left: -2rem;
</style>
