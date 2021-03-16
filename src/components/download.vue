<template>
  <div :class="$style.download" :style="style">
    <div :class="$style.content">
      <img :src="downloadLogo" alt="宠物家">
      <div :class="$style.slogen">
        <span v-text="downloadTitle"></span>
        <span v-text="downloadDescription"></span>
      </div>
    </div>
    <div :class="$style.btn" @click="downloadApp">立即打开</div>
  </div>
</template>

<script>
/*
@props
position 默认 bottom 可选top将组件fixed到顶部
*/
const downloadApp = config.downloadApp
const downloadLogo = config.downloadLogo
const downloadTitle = config.downloadTitle
const downloadDescription = config.downloadDescription
export default {
    name: 'download',
    props: {
        position: {
            type: String,
            default: 'bottom'
        }
    },
    data () {
        return {
            style: {[this.position]: 0},
            downloadLogo: downloadLogo,
            downloadTitle: downloadTitle,
            downloadDescription: downloadDescription
        }
    },
    methods: {
        downloadApp
    }
}
</script>

<style lang="stylus" module>
  .download
    position: fixed;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
    width: 7.5rem;
    height: 1.28rem;
    background: rgba(0,0,0,0.7);
    font-family: PingFangSC-Regular;
    font-size: 0.3rem;
    color: #FFFFFF;
    letter-spacing: -0.75px;
    .content
      flex: 1;
      flex-shrink: 0;
      display: flex;
      img
        width: 0.8rem;
        height: 0.8rem;
      .slogen
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 0.2rem;
        > span:last-of-type
          font-size: 0.24rem;
          letter-spacing: -0.6px;
        > span
          line-height: 1.5em;
    .btn
      flex-shrink: 0;
      padding: 0 0.3rem;
      box-sizing: border-box;
      width: 1.8rem;
      height: 0.58rem;
      line-height: 0.58rem;
      text-align: center;
      background: #C8161D;
      border-radius: 0.12rem;
</style>
