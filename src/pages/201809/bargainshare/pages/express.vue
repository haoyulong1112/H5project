<template>
  <div class="container">
    <!-- 收货地址 -->
    <div class="userInfo clearfloat">
      <div class="user">收货人：
        <span>{{express.logistics.consigner}}</span>
      </div>
      <div class="cellPhone">{{express.logistics.mobile}}</div>
       <div class="userAdressLeft">
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15438326214449766815.png" />
      </div>
      <div class="userAdress clearfloat">收货地址：
        <span>{{express.logistics.address}}</span>
      </div>
       <div class="userAdressRight">
          <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15438326289177063933.png" />
      </div>
    </div>
    <div class="topbar"></div>
    <div class="expInfo">
      <div class="expleft">
        <div class="express clearfloat">物流公司：
          <span>{{express.logistics.express}}</span>
        </div>
        <div class="express_no clearfloat">
            <div>快递单号：<span class="expressNo">{{express.logistics.expressNo}}</span></div>
        </div>
      </div>
      <div >
         <clipboard :text="express.logistics.expressNo" class="clipboard"></clipboard>
      </div>
    </div>
    <div class="middlebar"></div>
    <div class="package-status">
      <div class="status-box">
        <ul class="status-list">
            <li class="latest" v-for="(item,index) in expressInfo" :key="`a${index}`" >
                <div class="status-content-latest">{{item.context}}</div>
                <div class="status-time-latest">{{item.time}}</div>
                <div class="status-line"></div>
            </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import clipboard from '@/components/clipboards'
import getParams from '@/utils/urlparams'

const params = getParams()
params.cellPhone = params.cellPhone || ''
params.system = params.system || ''
params.imei = params.imei || ''

export default {
    name: 'express',
    props: ['expressid'],
    data () {
        return {
            taskId: '',
            expressInfo: [],
            express: {}

        };
    },
    computed: {

    },

    created () {
        this.express = window.expressList
        console.log(this.express, 1)
        this.expressInfo = JSON.parse(this.express.logistics.info)
    },
    methods: {

    },
    components: {
        // 复制组件
        clipboard
    }

};
</script>

<style lang="stylus" scoped>
// @import '~@/assets/style/mixins.styl';

// .index {
//   font-family: PingFangSC-Regular;
// }

.container {
  font-size: 0.28rem;
  color: #999;
  font-family: PingFangSC-Regular;
}

.clearfloat {
  clear: both;
}

.userInfo {
  width: 100%;
  height: 1.85rem;
}

.user {
  float: left;
  height: 0.3rem;
  line-height 0.3rem
  font-size: 0.32rem;
  color: #333;
  margin: 0.3rem 0 0.1rem 0.8rem;
}

.cellPhone {
  float: right;
  margin: 0.3rem 0.8rem 0 0;
  height: 0.4rem;
  line-height 0.4rem
}

.userAdress {
  color #666
  display inline-block
  width: 5.9rem;
  height: 0.92rem;
  margin-left: 0.8rem;
  line-height: 0.46rem;
}

// 左侧小图标
.userAdressLeft > img {
   content: '';
   position absolute
   top 0.95rem
   left 0.3rem
   height 0.4rem
   width: 0.28rem
}

// 右侧小图标
.userAdressRight > img {
   content: '';
   position absolute
   top 0.83rem
   right 0.3rem
   height 0.26rem
   width: 0.16rem
}

.expressNo {
    color:#151515
}

.expInfo {
  width: 100%;
  height: 1.5rem;
}

.expleft {
  float: left;
  height: 0.8rem;
  margin: 0.4rem 0 0 0.3rem;
  line-height: 0.4rem;
}

.expleft span {
  color: #151515;
}

.express_no {
  margin-top: 0.07rem;
}
>span {
    color #151515
}

.clipboard {
  float right
  display:flex;
  justify-content center
  align-items center
  margin 0.86rem 0.3rem 0.3rem
  background: #F8F8F8;
  border: 1px solid #979797;
  border-radius: 7px;
  font-size: 0.2rem;
  color: #666;
  width: 0.9rem;
  height: 0.4rem;
  line-height 0.4rem
  text-align center
}

.topbar {
  width: 100%;
  height: 0.2rem;
  background-color: #f8f8f8;
}

.middlebar {
  width: 100%;
  height: 0.3rem;
  background-color: #f8f8f8;
}

.package-status {
  width 100%
}

.package-status .status-list {
  margin: 0;
  padding: 0;
  margin-top: -0.05rem;
  padding-left: 0.1rem;
  list-style: none;
}

.package-status .status-list li {
  border-left: 0.02rem solid #ddd;
  text-align: left;
  margin-left: 0.25rem;
  margin-right: 0.2rem;
}
// 左侧变点
.package-status .status-list li:before {
  content: '';
  border: 0.06rem solid #f3f3f3;
  background-color: #ddd;
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 0.3rem;
  margin-left: -0.15rem;
  margin-bottom: -0.4rem;
}

.package-status .status-list .latest:before {
  background-color: #c9b498;
  border-color: rgb(245, 232, 215);
}

.package-status .status-box {
  overflow: hidden;
}

.package-status .status-list li {
  height: auto;
}

.package-status .status-list {
  margin-top: -0.08rem;
}

.package-status .status-box {
  position: relative;
}

.package-status .status-box:before {
  content: ' ';
  position absolute
  background-color: #f3f3f3;
  display: block;
  top: -0.08rem;
  left: 0.2rem;
  width: 0.1rem;
  height: 0.04rem;
}

.package-status .status-list {
  margin-top: 0;
}

.status-list li {
  padding-top: 0.1rem;
  position relative
}
// 物流内容
.status-content-latest {
  text-align: left;
  margin-left: 0.4rem;
  margin-top: -0.2rem;
  line-height: 0.4rem;
}
// 物流时间
.status-time-latest {
  text-align: left;
  margin-left: 0.4rem;
  font-size: 0.22rem;
  margin-top: 0.1rem;
}
//地边线
.status-line {
  border-bottom: 1px solid #ccc;
  margin-left: 0.4rem;
  margin-top: 0.2rem;
  display: block;
}
//第一行变色
.status-list li:first-child {
    color #BB996C
}
</style>
