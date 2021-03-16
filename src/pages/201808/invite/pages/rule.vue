<template>
  <div class="container">
    <div class="rule">
      <!-- 邀请奖励 -->
      <div class="yqjl block">
        <div class="block-title">邀请奖励</div>
        <div class="yqjl-content" v-html="ruleHtml"></div>
      </div>
      <!-- 温馨提示 -->
      <div class="block">
        <div class="block-title">温馨提示</div>
        <div class="wxts-content">
          <div class="rule-item">
            <p>1、若通过不正当手段获取奖励，经查实宠物家有权撤销该用户的活动奖励，情节严重者将追究其法律责任</p>
          </div>
          <div class="rule-item">
            <p>2、只有在宠物家app中发起邀请才有奖励哦</p>
          </div>
          <div class="rule-item">
            <p>本活动最终解释权归宠物家所有，如有疑问，请拨打{{kfnumber}}咨询</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const kfnumber = config.kfnumber
export default {
    name: 'rule',
    data () {
        return {
            kfnumber,
            ruleHtml: this.inviteData.ruleHtml
        }
    }
}
</script>

<style lang="stylus" scoped>
.container
  width: 7.5rem;
  height: 100%;
.yqjl
  margin-top: 0;
.yqjl-content
  width: 100%;
  padding: 0.3rem 0.6rem 0.4rem 0.6rem;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  font-size: 0.3rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.53rem;
.wxts-content
  width: 100%;
  padding: 0 0.6rem 0.95rem 0.6rem;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  font-size: 0.3rem;
  color: #666666;
  letter-spacing: 0;
  line-height: 0.53rem;
.rule-item:not(:last-of-type)
  margin-bottom: 0.5rem;

</style>
