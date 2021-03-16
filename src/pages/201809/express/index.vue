<template>
    <div class="container">
        <!-- 收货地址 -->
       <div class="userInfo clearfloat">
            <div class="user"> 收货人：<span >1111</span></div>
            <div class="cellPhone"> 13567894567</div>
            <div class="userAdress clearfloat"> 收货地址：<span >北京市朝阳区活动开始口味经济法来了</span></div>
       </div>
       <div class="topbar"></div>
       <div class="expInfo">
         <div class="expleft">
            <div class="express clearfloat">物流公司：<span>1114411</span>
           </div>
           <div class="express_no clearfloat">快递单号：<span>34444444444</span>
           </div>
         </div>
         <div><button type="button" class="copyButton clearfloat">复制</button></div>
       </div>
       <div class="middlebar"></div>
        <div class="package-status">
            <div class="status-box" >
                <ul  class="status-list">
                    <li class="latest">
                        <div class="status-content-latest">您的包裹从北京通州出发</div>
                        <div class="status-time-latest">2017-08-20 14:16</div>
                        <div class="status-line"></div>
                    </li>
                    <li>
                        <div class="status-content-before">包裹正在等待揽收</div>
                        <div class="status-time-before">2017-08-19 09:21</div>
                        <div class="status-line"></div>
                    </li>
                    <li>
                        <div class="status-content-before">包裹出库</div>
                        <div class="status-time-before">2017-08-19 06:21</div>
                        <div class="status-line"></div>
                    </li>
                    <li>
                        <div class="status-content-before">打包完成</div>
                        <div class="status-time-before">2017-08-19 01:21</div>
                        <div class="status-line"></div>
                    </li>
                    <li>
                        <div class="status-content-before">卖家发货</div>
                        <div class="status-time-before">2017-08-18 09:11</div>
                        <div class="status-line"></div>
                    </li >
                    <li>
                        <div class="status-content-before">您的订单开始处理</div>
                        <div class="status-time-before">2017-08-17 23:31</div>
                        <!-- <div class="status-line"></div> -->
                    </li>

                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// import login from '@/components/login/index.vue'
// import { getActivityExpress } from '@/api/201811/express'

import getParams from '@/utils/urlparams'

const params = getParams()
params.cellPhone = params.cellPhone || ''
params.system = params.system || ''
params.imei = params.imei || ''

export default {
    name: 'index',
    data () {

    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
