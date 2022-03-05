<template>
    <div class="container">
        <div class="content">
            <div class="content_item">
                <img class="bgc" src="@static/images/202201/sharebgc.jpg" alt="">
            </div>
            <div class="loginform">
                <div class="formitem">
                    <div class="phone">手机号</div>
                    <input type="number" @input="phoneChcnge" v-model="form.cellPhone" placeholder="请输入手机号">
                </div>
                <div class="formitem code">
                    <input type="number" @input="codeChcnge" v-model="form.code" placeholder="请输入验证码">
                    <div @click="getCode" :class="codeType == 1 ? 'code hascode' : 'code'">{{codeText}}</div>
                </div>
                <div :class="canLogin ? 'loginbtn canbtn' : 'loginbtn'" @click="login">登录领取</div>
            </div>
        </div> 
        <showtoast ref="showtoast" v-bind:text="shoetext" v-bind:timesout="timesout"></showtoast>
    </div>
</template>

<script>
import { getCheckCode,loginSound } from '@/api/202103/share'
import showtoast from '@/components/showtoast/index.vue'
import md5 from 'js-md5';

import getParams from '@/utils/urlparams'
const params = getParams()
const phoneReg = /^1[3|4|6|5|7|8|9][0-9]{9}$/;
export default {
    name: 'index',
    data () {
        return {
            shoetext: '',
            id: '',
            userId: '',
            type: '',
            checkId: '',
            showMask: false,
            // 是否显示登录
            showLogin: false,
            form: {
                cellPhone: '',
                code: ''
            },
            codeType: 1,
            codeText: '获取验证码',
            // 是否可以登录
            canLogin: false,
            // 是否有邀请列表
            hasfirendList: true,
            // 当前用户userId
            currentuserId: '',
            inviteList: [],
            oldHref: '',
            timesout: 2000
        }
    },
    components: {
        showtoast
    },
    created () {
        this.userId = params.userId;
        console.log(' this.userId',this.userId)
    },
    methods: {
        login(){
            if(!this.canLogin){
                return;
            }
            let data = {
                checkCode: this.form.code,
                phone: this.form.cellPhone,
                userId: this.userId
            }
            loginSound(data).then(res => {
                console.log(res);
                if(res.code == 200){
                    sessionStorage.setItem("cellPhone", this.form.cellPhone);
                    sessionStorage.setItem("token", res.data.token);
                    this.timesout = 3000
                    this.shoetext = '领取成功请前往App查看';
                    this.$refs.showtoast.showtime();
                }
            }).catch(err => {
                this.shoetext = err.msg || '系统异常';
                this.$refs.showtoast.showtime();
            })
        },
        phoneChcnge(e){
            if(this.form.cellPhone && this.form.code){
                this.canLogin = true
            }else{
                this.canLogin = false
            }
            console.log(this.canLogin)
        },
        codeChcnge(e){
            if(this.form.cellPhone && this.form.code){
                this.canLogin = true
            }else{
                this.canLogin = false
            }
            console.log(this.canLogin)
        },
        // 点击发送验证码按钮
        getCode () { 
            if(!this.form.cellPhone){
                this.shoetext = '手机号未填写';
                this.$refs.showtoast.showtime();
                return;
            }
            if(!phoneReg.test(this.form.cellPhone)){
                this.shoetext = '手机号格式不正确';
                this.$refs.showtoast.showtime();
                return;
            }
            if (this.codeType == 1) {
                let data = {
                    phone: this.form.cellPhone,
                    encryptionCode: md5('houseclub_version01' + this.form.cellPhone)
                };
                getCheckCode(data).then(res => {
                    this.countdown();
                    if (res.code == 200) {
                        this.shoetext = '验证码已发送！';
                        this.$refs.showtoast.showtime();
                    } else {
                        this.shoetext = res.msg;
                        this.$refs.showtoast.showtime();
                    }
                }).catch(err => {
                    this.shoetext = err.msg;
                    this.$refs.showtoast.showtime();
                });
            }
        },
        // 倒计时
        countdown (cb) {
            // 倒计时
            this.countBackwards({
                total: 60,
                callback: (res) => {
                    if (res) {
                        this.codeText = res + '秒';
                        this.codeType = 2;
                    } else {
                        this.getCodeBtnClass = '';
                        this.codeText = '重新获取';
                        this.codeType = 1;
                    }
                }
            });
            if (cb) cb();
        },
        // 倒数
        countBackwards: function (options) {
            options = options || {};
            // 接收 总数，速度（量），时间（毫秒），已计数，回调函数，一次回调函数，结束回调函数
            let total = options.total ? options.total : 10;
            let speed = options.speed ? options.speed : 1;
            let time = options.time ? options.time : 1000;
            let counted = options.counted ? options.counted : 0;
            let callback = options.callback ? options.callback : 0;
            let callbackOnce = options.callbackOnce ? options.callbackOnce : 0;
            let callbackEnd = options.callbackEnd ? options.callbackEnd : 0;
            // 剩余总数
            let curentTotal = total - counted >= 0 ? total - counted : 0;
            // 执行定时器
            setTimeout(() => {
                if (curentTotal !== 0) {
                    const leftover = curentTotal - speed >= 0 ? curentTotal - speed : 0;
                    counted += speed;
                    // 执行回调
                    if (callback) {
                        callback(leftover);
                    }
                    // 执行一次回调
                    if (callbackOnce) {
                        callbackOnce(leftover);
                    }
                    // 执行结束回调
                    if (leftover == 0 && callbackEnd) {
                        callbackEnd(leftover);
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
                    });
                }
            }, time);
        }
    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
