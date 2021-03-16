<template>
  <div class="container">
      <div class="imgbox">
          <div class="btn">
            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15429401470257073393.png" alt="" @click="govip">
          </div>
      </div>
  </div>
</template>
<script>
import system from '@/utils/system'
export default {
    methods: {
        govip () {
            if (system.Terminal.platform.android) {
                window.fromh5data.goMember();
            }
            if (system.Terminal.platform.iPhone) {
                window.location.href = 'pethome://goMember_null';
            }
        }
    }
}
</script>

<style src="./index.styl" lang="stylus"></style>
