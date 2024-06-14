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
              <div v-for="(item, index) in mallList" :key="index" :class="selectIndex == index ? 'mall_item active' :  'mall_item'" @click="seclectMall(index)">
                <div class="mall_title">
                  {{ item.title }}
                </div>
                <div :class="selectIndex == index ? 'mall_name three' : 'mall_name'">{{item.name}}</div>
                <div class="mall_discount">{{item.operationPosition}}</div>
                <div class="mall_desc">{{item.tag}}</div>
                <div :class="selectIndex == index ? 'mall_price three' : 'mall_price'">¥{{item.price}}</div>
              </div>
            </div>
            <div :class="pageWidth == 750 ? 'userPhone' : 'userPhone big'">
              <span>充值手机号：</span><input type="text" @blur="testPhone" maxlength="11" v-model="cellPhone" placeholder="请输入手机号">
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
        <!-- <van-popup v-model="showPopup" position="center">
            <div class="pop_content">
                <img class="popup" src="~@static/images/202212/popup.png" alt="">
                <div class="contentbox">
                    <div class="popup_title">恭喜您 注册成功</div>
                    <div class="popup_gift">获得免费赠送20关</div>
                    <div class="popup_download">下载app</div>
                </div>
            </div>
        </van-popup> -->
    </div>
</template>

<script>
import wxcode from '@/utils/weixin/wxcode'
import { getOpenId,getMall,createOrder } from '@/api/202103/share'
import useragent from '@/utils/useragent.js';

import getParams from '@/utils/urlparams'
import { Toast } from 'vant';
const weixin = useragent.weixin
const params = getParams()
const phoneReg = /^1[3|4|6|5|7|8|9][0-9]{9}$/;
const pageWidth = config.pageWidth;
let payFlag = true;
export default {
    name: 'index',
    data () {
        return {
            cellPhone: '',
            userId: '',
            pageWidth,
            mallList: [],
            openId: '',
            selectIndex: 0,
            slectedPrice: 0,
            phoneTest: false
        };
    },
    mounted() {
        this.openId = sessionStorage.getItem('openId') ? sessionStorage.getItem('openId') : this.openId
        console.log('this.openId===========',this.openId)
        this.getMallList();
        // 获取code
        const weixincode = params.code
        if(!this.openId){
          if(weixincode){
            getOpenId({code: weixincode}).then(res =>{
              console.log('openId==========================',res)
              if(res.code == 200){
                sessionStorage.setItem('openId', res.data.openid)
                this.openId = res.data.openid;
              }
            })
          }else{
            wxcode()
          }
        }
    },
    methods: {
        // testPhone
        testPhone(){
          if(this.cellPhone && !phoneReg.test(this.cellPhone)){
            this.phoneTest = false
            Toast('请输入正确的手机号')
            return;
          }
          this.phoneTest = true
        },
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
          console.log('this.payFlag ======',payFlag)
          if(!this.cellPhone){
            Toast('请输入手机号')
            return;
          }
          if(!this.phoneTest){
            Toast('手机号格式错误，请重新输入')
            return;
          }
          if(!payFlag){
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
          payFlag = false
          if(!weixin){
            payFlag = true;
            Toast('请在微信中打开')
            return;
          }
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
            Toast(err.msg)
            console.log('err',err)
            payFlag = true
          })
        },
        onBridgeReady(payData) {
            if(payData == null || payData == undefined || JSON.stringify(payData) == "{}"){
              Toast('支付失败');
              payFlag = true
              return;
            }
            console.log('payData+=====+========+======',payData.timeStamp)
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId": payData.appId,   //公众号ID，由商户传入
              "timeStamp": String(payData.timeStamp),   //时间戳，自1970年以来的秒数
              "nonceStr": payData.nonceStr,      //随机串
              "package": payData.package,
              "signType": payData.signType,     //微信签名方式：
              "paySign": payData.paySign
            },(res) => {
                payFlag = true
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
