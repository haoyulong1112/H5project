<template>
    <div class="container">
        <img v-if="pageWidth == 1024" class="bgc" src="~@static/images/202212/bgc.png" alt="">
        <img v-else class="bgc" src="~@static/images/202212/bgc_small.png" alt="">
        <div class="content">
            <div class="title">
                <span>给你一个英语妈妈</span>
            </div>
            <div class="tips">图解听力闯关，告别哑巴英语</div>
            <div class="mall_list">
              <div>
                <div class="mall_title">
                  《娃娃路-听懂英语》
                </div>
                <div class="mall_name">1年会员</div>
                <div class="mall_discount">本周特惠：买一年送一年</div>
                <div class="mall_desc">解锁1000词-2000句-9000句全部关卡</div>
                <div class="mall_price">￥299</div>
              </div>
              <div>
                <div class="mall_title">
                  《娃娃路-听懂英语》
                </div>
                <div class="mall_name three">3年会员</div>
                <div class="mall_discount">本周特惠：买三年送三年</div>
                <div class="mall_desc">解锁1000词-2000句-9000句全部关卡</div>
                <div class="mall_price three">￥799</div>
              </div>
            </div>
            <div class="instrtion">
              <div class="instrt_title">
                <span>充值说明</span>
              </div>
              <div class="instrt_content">
                仅限一台设备同时使用，更换设备或重装系统，截止日期不变。
              </div>
            </div>
        </div>
        <div class="buyBtn">
          ￥799立即购买
        </div>
        <van-popup v-model="showPopup" position="center">
            <div class="pop_content">
                <img class="popup" src="~@static/images/202212/popup.png" alt="">
                <div class="contentbox">
                    <div class="popup_title">恭喜您 注册成功</div>
                    <div class="popup_gift">获得免费赠送20关</div>
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
        // if (typeof WeixinJSBridge == "undefined") {
        //   if (document.addEventListener) {
        //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        //   } else if (document.attachEvent) {
        //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        //   }
        // } else {
        //   onBridgeReady();
        // }
    },
    methods: {
        onBridgeReady(){
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
                "appId":  appId,   //公众号ID，由商户传入
                "timeStamp": timeStamp,   //时间戳，自1970年以来的秒数
                "nonceStr": timeStamp,      //随机串
                "package": timeStamp,
                "signType": timeStamp,     //微信签名方式：
                "paySign": timeStamp
              },
              function (res) {
                if ((res.errMsg || res.err_msg) === "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

                }
              }
          );
        },
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
            })
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
    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
