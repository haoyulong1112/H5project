<template>
    <div class="login">
        <div class="user-form">
            <div class="form-cellPhone">
                <input type="number" v-model="cellPhone" :placeholder="placeholders && placeholders[0] || '请输入手机号'"/>
            </div>
            <div class="form-imgcode">
                <input type="number" v-model="imgcode" :placeholder="placeholders && placeholders[1] || '请输入图形验证码'"/>
                <img @click.stop="updateCode" :src="imgcodeUrl"/>
            </div>
            <div class="form-code">
                <input type="number" v-model="code" :placeholder="placeholders && placeholders[2] || '请输入验证码'"/>
                <span v-show="!btnStatus" :class="getCodeBtnClass">{{getCodeBtnText}}</span>
                <span v-show="btnStatus" :class="getCodeBtnClass" @click.stop="getCode">{{getCodeBtnText}}</span>
            </div>
        </div>
        <div class="user-btn" @click="confirmclicked">
            <slot name="confirmBtn">
                <div>确认</div>
            </slot>
        </div>
    </div>
</template>

<script>
/*
@props
placeholders 数组，输入框占位文案

@emit
getcode 点击获取短信验证码按钮
confirm 点击登录按钮
*/
import md5 from 'js-md5'
import { newGetLoginImageCode } from '@/api/201812/inviteactivity'

// 引入校验手机号规则
const cellPhoneReg = config.cellPhoneReg

export default {
    name: 'login',
    props: ['placeholders'],
    beforeMount () {
    // 生成图形码
        this.updateCode()
    },
    data () {
        return {
            mobileKey: '',
            imgcodeUrl: '',
            cellPhone: '',
            imgcode: '',
            code: '',
            genVerifyCodeFlag: false,
            getCodeBtnText: '获取验证码',
            getCodeBtnClass: '',
            btnStatus: true
        };
    },
    methods: {
        // 点击提交按钮
        confirmclicked () {
            if (this.checkoutNum()) {
                this.$emit('confirm', {
                    cellPhone: this.cellPhone,
                    code: this.code
                })
            }
        },
        // 点击发送验证码按钮
        getCode () {
            if (this.checkoutNum(1)) {
                this.$emit('getCode', {
                    phone: this.cellPhone,
                    code: this.imgcode,
                    encryptionCode: md5('chongwujia_2018' + this.cellPhone),
                    mobileKey: this.mobileKey
                })
            }
        },
        // 更新图形验证码
        updateCode () {
            // 刷新图形码
            this.mobileKey = `${new Date().getTime()}${parseInt((Math.random() * 9 + 1) * 100000)}`
            this.imgcodeUrl = newGetLoginImageCode(this.mobileKey)
        },
        // 倒计时
        countdown (cb) {
            // 倒计时
            this.getCodeBtnClass = 'grey';
            this.btnStatus = false;
            this.countBackwards({
                total: 60,
                callback: (res) => {
                    if (res) {
                        this.getCodeBtnText = res + '秒'
                    } else {
                        this.getCodeBtnClass = ''
                        this.getCodeBtnText = '重新获取'
                        this.genVerifyCodeFlag = false
                        this.btnStatus = true
                    }
                }
            })
            if (cb) cb()
        },
        // 校验手机号和图形验证码
        checkoutNum (type) {
            if (!this.cellPhone) {
                Toast('请输入手机号')
            } else if (!cellPhoneReg.test(this.cellPhone)) {
                Toast('请检查手机号')
            } else if (!this.imgcode) {
                Toast('请输入图形验证码')
            } else if (this.imgcode.length < 4) {
                Toast('请检查图形验证码')
            } else if (!this.code && type !== 1) {
                Toast('请输入短信验证码')
            } else if (this.code.length < 4 && type !== 1) {
                Toast('请检查短信验证码')
            } else {
                return true
            }
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
            setTimeout(() => {
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
                }
            }, time)
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/mixins.styl';

.login {
    font-family: PingFangSC-Regular;
}
.user-form
    margin: 0 auto;
    width: 4rem;
    input
        font-size: 0.28rem;
.form-cellPhone,.form-imgcode,.form-code
    position: relative;
    padding-left: 0.3rem;
    box-sizing: border-box;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #FFFFFF;
    box-shadow: 0 0.04rem 0.1rem 0 rgba(47,27,99,0.30);
    border-radius: 5px;
    margin-bottom: 0.2rem;
    border-radius: 0.5rem;
    > input
        width: 100%;
        height: 0.6rem;
        border-radius: 0.5rem;
.form-imgcode > img
    position: absolute;
    right: 0.07rem;
    top: 0.05rem;
    width: 1.2rem;
    height: 0.52rem;
    border-radius: 0.5rem;
.form-code > span
    position: absolute;
    right: 0;
    top: 0;
    width: 1.8rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    background-image: linear-gradient(0deg, #FEEA21 0%, #FEEA21 100%);
    font-size: 0.24rem;
    color: #000;
    font-weight:bold;
    border-radius: 0.5rem;
    letter-spacing: -0.37px;
    &.grey
        background: #bbb;
</style>
