<template>
  <div class="container">
    <div class="prize">
      <div v-if="empty" class="empty">
        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389696677792146411.png">
        <p>您还没有奖励</p>
        <p>邀请好友就能获得哦~</p>
      </div>
      <div v-else class="notempty">
        <!-- <div class="content">
          <div v-if="activeList.length" class="active">
            <div class="active-item" v-for="(item, index) in activeList" :key="index+new Date()">
              <div class="item-title">{{item.grantTime}}</div>
              <div class="item-content">
                <div class="item-top">
                  <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389695762749308792.png">
                  <div class="item-top-left">
                    ￥<span>{{item.totalCost}}</span>
                  </div>
                  <div class="item-top-right">
                    <div class="item-top-title">礼品卡</div>
                    <div class="item-top-des">充值到余额，可支付所有服务和商品</div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-bottom-code">{{item.reward}}</div>
                  <div class="item-bottom-btn clipboard" data-clipboard-action="copy" :data-clipboard-text="item.reward">复制充值</div>
                </div>
              </div>
            </div>
            <div class="active-btn" @click="toRecharge">
              <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389697196618592451.png">
            </div>
            <div class="active-tip">本卡，不兑现、不找零、不退款</div>
          </div>
          <div v-if="usedList.length" class="used">
            <div class="used-title">
              <span>已使用</span>
            </div>
            <div class="used-item" v-for="(item, index) in usedList" :key="index+new Date()">
              <div class="item-content">
                <div class="item-top">
                  <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389696102056164794.png">
                  <div class="item-top-left">
                    ￥<span>{{item.totalCost}}</span>
                  </div>
                  <div class="item-top-right">
                    <div class="item-top-title">礼品卡</div>
                    <div class="item-top-des">充值到余额，可支付所有服务和商品</div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-bottom-code">{{item.reward}}</div>
                  <div class="item-bottom-btn">复制充值</div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="content1024">
            <div class="item1024" v-for="(item, index) in usedList" :key="`a${index}`">
                <div class="item1024-title">{{item.grantTime}}</div>
                <div class="item1024-content">
                    <div class="item1024-left">
                        <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15404486722913362711.png">
                        <div>
                            ￥<span>{{item.totalCost}}</span>
                        </div>
                    </div>
                    <div class="item1024-right">
                        <div>礼品卡</div>
                        <div>已充值到余额，请到我的余额页面查看</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myReward } from '@/api/index'
import tologin from '@/utils/hooks/tologin'
import torecharge from '@/utils/hooks/torecharge'
export default {
    name: 'prize',
    data () {
        return {
            empty: true,
            activeList: [],
            usedList: []
        }
    },
    methods: {
        toRecharge () {
            // 是否登录
            const cellPhone = this.inviteData.cellPhone
            if (cellPhone) {
                torecharge()
            } else {
                tologin()
            }
        }
    },
    created () {
    // 未登录不调用
        if (!this.inviteData.cellPhone) return
        // 加载我的奖励
        myReward({
            system: this.inviteData.system,
            imei: this.inviteData.imei,
            cellPhone: this.inviteData.cellPhone,
            activityId: this.inviteData.activityId
        }).then(res => {
            let rewards = res.data.rewards || []
            if (rewards.length) {
                this.empty = false
                for (let i of rewards) {
                    let tpl = {}
                    // 获取面额，兑换码，发放时间
                    tpl.grantTime = i.grantTime ? i.grantTime : ''
                    tpl.totalCost = i.totalCost ? i.totalCost : ''
                    tpl.reward = i.reward ? JSON.parse(i.reward)[0].serialNum : ''
                    if (i.grantStatus) {
                        this.usedList.push(tpl)
                    } else {
                        this.activeList.push(tpl)
                    }
                }
            }
        }).catch(err => {
            if (err.status) Toast(err.status)
            if (err.msg) Toast(err.msg)
        })
    }
}
</script>

<style src="../style/prize.styl" lang="stylus" scoped></style>
