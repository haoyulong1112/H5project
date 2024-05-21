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
              <div v-for="(item, index) in mallList" :key="index" :class="selectIndex == index ? 'mall_item active' : 'mall_item'" @click="seclectMall(index)">
                <div class="mall_title">
                  {{ item.title }}
                </div>
                <div :class="index > 0 ? 'mall_name three' : 'mall_name'">{{item.name}}</div>
                <div class="mall_discount">{{item.operationPosition}}</div>
                <div class="mall_desc" v-if="index == 0">{{item.tag}}</div>
                <div class="mall_desc" v-else>发金卡戴珊发快解散付款</div>
                <div :class="index > 0 ? 'mall_price three' : 'mall_price'">￥{{item.price}}</div>
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
        <div class="buyBtn" @click="buyFun">
          ￥{{slectedPrice}}立即购买
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
import wxcode from '@/utils/weixin/wxcode'
import { getOpenId,getMall,createOrder } from '@/api/202103/share'

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
            pageWidth,
            mallList: [],
            openId: 'oPGzTt3Xakd5R4KUDLWXy2PVN0OE',
            selectIndex: 0,
            slectedPrice: 0,
            cellPhone: '17839193019',
            payFlag: true
        };
    },
    mounted() {
        this.openId = localStorage.getItem('openId') ? localStorage.getItem('openId') : this.openId
        // 获取code
        const weixincode = params.code
        if(!this.openId){
          if(weixincode){
            getOpenId({code: weixincode}).then(res =>{
              console.log(res)
              if(res.code == 200){
                localStorage.setItem('openId', res.data.openid)
                this.openId = res.data.openid;
              }
            })
          }else{
            wxcode()
          }
        }
        this.getMallList();
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
        // 获取商品信息
        getMallList(){
          let data = {
            type: 3
          }
          getMall(data).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.mallList = res.data
              this.slectedPrice = this.mallList[0].price;
            }
          })
        },
        seclectMall(index){
          this.selectIndex = index
          this.slectedPrice = this.mallList[index].price;
        },
        buyFun(){
          if(!this.payFlag){
            return;
          }
          let mall = this.mallList[this.selectIndex];
          let data = {
            productId: mall.id,
            openid: this.openId,
            cellPhone: this.cellPhone,
            payWay: 3,
            price: mall.price,
            dayNum: mall.dayNum
          }
          this.payFlag = false
          createOrder(data).then(res => {

            if (res.code == 200) {
                let payData = res.data
                console.log('payData',payData)
                console.log('WeixinJSBridge',WeixinJSBridge)
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(payData), false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(payData));
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(payData));
                    }
                } else {
                    this.onBridgeReady(payData);
                }
            }
          }).catch(err => {
            console.log('err',err)
            this.payFlag = true
          })
        },
        onBridgeReady(payData) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId":  payData.appId,   //公众号ID，由商户传入
              "timeStamp": payData.timeStamp,   //时间戳，自1970年以来的秒数
              "nonceStr": payData.nonceStr,      //随机串
              "package": payData.package,
              "signType": payData.signType,     //微信签名方式：
              "paySign": payData.paySign
            },
            function(res) {
                this.payFlag = true
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  alert('支付成功');
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  alert('支付取消');
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  alert('支付失败');
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
            });
        },
    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
