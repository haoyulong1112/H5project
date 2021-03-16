<template>
  <div class="popup" @click="closePopup" @touchmove.prevent>
    <slot></slot>
  </div>
</template>

<script>
// 建议使用mint-ui中的popup，功能更丰富，参考其他页面写法，在pages目录下搜索关键词 mt-popup
export default {
    name: 'popup',
    data () {
        return {
            msg: 'popup'
        }
    },
    methods: {
        closePopup () {
            this.$emit('closePopup')
        }
    }
}
</script>

<style lang="stylus" scoped>
  .popup
    width: 7.5rem;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.7);
</style>
