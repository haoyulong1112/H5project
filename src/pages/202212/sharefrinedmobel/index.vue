<template>
    <div class="container">
        <img v-if="pageWidth == 1024" class="bgc" src="~@static/images/202212/bgc.png" alt="">
        <img v-else class="bgc" src="~@static/images/202212/bgc_small.png" alt="">
        <div class="content">
            <div class="title">
                <img src="~@static/images/202212/left.png" alt="">
                <span>邀请好友注册</span>
                <img src="~@static/images/202212/right.png" alt="">
            </div>
            <div class="tips">领取即送15天免费使用权</div>
            <div :class="pageWidth == 750 ? 'formbox small' : 'formbox'">
                <img class="formboxbgc" v-if="pageWidth == 1024" src="~@static/images/202212/red.png" alt="">
                <img class="formboxbgc" v-else src="~@static/images/202212/red_small.png" alt="">
                <img class="formboxboy" v-if="pageWidth == 1024" src="~@static/images/202212/boy.png" alt="">
                <!-- <img class="formboxboy" style="right: -60px;" v-else src="~@static/images/202212/boy_small.png" alt=""> -->

                <div class="form">
                    <div :class="pageWidth == 750 ? 'formitem small' : 'formitem'">
                        <input type="number" placeholder="请输入手机号" autocomplete="new-password" :class="pageWidth == 750 ?'phone small' : 'phone'" maxlength="11" @input="phoneChcnge" v-model="form.cellPhone">
                    </div>
                    <div :class="pageWidth == 750 ? 'formitem small' : 'formitem'">
                        <input type="number" placeholder="请输入验证码" autocomplete="new-password" :class="pageWidth == 750 ?'phone small' : 'phone'" @input="codeChcnge" v-model="form.code">
                        <span @click="getCode" :class="codeType == 1 ? 'codeclass' : 'codeclass code'">{{codeText}}</span>
                    </div>
                </div>
                <div class="getbtn" @click="getReword">立即领取</div>
            </div>
            <div :class="pageWidth == 750 ? 'explain small' : 'explain'">
                <div class="explain_title" :style="pageWidth == 750 ? 'height: 69px' : ''">
                    <img src="~@static/images/202212/smallStar.png" alt="">
                    <span class="morespan" :style="pageWidth == 750 ? 'font-size: 32px' : ''">活动说明</span>
                    <img src="~@static/images/202212/smallStar.png" alt="">
                </div>
                <div :class="pageWidth == 750 ? 'explain_content small' : 'explain_content'">
                    <div :class="pageWidth == 750 ? 'small' : ''">
                        <img src="~@static/images/202212/Star.png" alt="">好友注册即可领取15天免费使用权
                    </div>
                    <div :class="pageWidth == 750 ? 'small' : ''">
                        <img src="~@static/images/202212/Star.png" alt="">娃娃路是一个针对哑巴英语的图解听力练习APP
                    </div>
                    <!-- <div :class="pageWidth == 750 ? 'small' : ''">
                        <img src="~@static/images/202212/Star.png" alt="">同时赠送双方各20积分
                    </div> -->
                    <div :class="pageWidth == 750 ? 'small' : ''">
                        <img src="~@static/images/202212/Star.png" alt="">注册后，应用商店搜“娃娃路”下载APP，用该手机号登录即用
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="showPopup" position="center">
            <div class="pop_content">
                <img class="popup" src="~@static/images/202212/popup.png" alt="">
                <div class="contentbox">
                    <div class="popup_title">恭喜您 注册成功</div>
                    <!-- <div class="popup_gift">获得免费赠送20关</div> -->
                    <div class="popup_download">下载app</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { getCheckCode, verifyRecommandCheckCode } from '@/api/202103/share'
import md5 from 'js-md5';

import getParams from '@/utils/urlparams'
import { Toast } from 'vant';
const params = getParams()
const phoneReg = /^1[3|4|6|5|7|8|9][0-9]{9}$/;
const pageWidth = config.pageWidth;
export default {
    name: 'index',
    data () {
        return {
            cellPhone: '',
            code: '',
            form: {
                cellPhone: '',
                code: ''
            },
            codeType: 1,
            codeText: '获取验证码',
            showPopup: false,
            // 是否可以登录
            canLogin: false,
            timesout: 2000,
            userId: '',
            pageWidth
        };
    },
    created () {
        this.userId = params.userId
    },
    methods: {
        getReword () {
            if (!this.canLogin) {
                return;
            }
            let data = {
                checkCode: this.form.code,
                phone: this.form.cellPhone,
                userId: this.userId
            }
            verifyRecommandCheckCode(data).then(res => {
                if (res.code == 200) {
                    this.showPopup = true;
                }
            }).catch(err => {
              Toast(err.msg)
            })
        },
        codeChcnge (e) {
            if (this.form.cellPhone && this.form.code) {
                this.canLogin = true
            } else {
                this.canLogin = false
            }
            console.log(this.canLogin)
        },
        phoneChcnge (e) {
            if (this.form.cellPhone && this.form.code) {
                this.canLogin = true
            } else {
                this.canLogin = false
            }
            console.log(this.canLogin)
        },
        // 点击发送验证码按钮
        getCode () {
            if (!this.form.cellPhone) {
                // this.shoetext = '手机号未填写';
                Toast('手机号未填写')
                return;
            }
            if (!phoneReg.test(this.form.cellPhone)) {
                // this.shoetext = '手机号格式不正确';
                // this.$refs.showtoast.showtime();
                Toast('手机号格式不正确')
                return;
            }
            if (this.codeType == 1) {
                let data = {
                    phone: this.form.cellPhone,
                    encryptionCode: md5('wwl_version01' + this.form.cellPhone)
                };
                getCheckCode(data).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.countdown();
                        Toast('验证码已发送！')
                    } else {
                        Toast(res.msg)
                    }
                }).catch(err => {
                    console.log(err)
                    Toast(err.msg)
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
