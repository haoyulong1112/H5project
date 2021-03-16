<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { addActivityLog } from '@/api'
import getParams from '@/utils/urlparams'
const cellPhoneReg = config.cellPhoneReg

export default {
    name: 'App',
    data () {
        return {
            transitionName: ''
        }
    },
    watch: {
        $route (to, from) {
            if (to.meta.index > from.meta.index) {
                this.transitionName = 'slide-left'
            } else {
                this.transitionName = 'slide-right'
            }
        }
    },
    created () {
    // 获取链接上的参数
        const paramsObj = getParams()

        // 获取 登录参数
        const cellPhone = paramsObj.cellPhone
        if (cellPhone && cellPhoneReg.test(cellPhone)) {
            this.inviteData.cellPhone = cellPhone
        }

        this.inviteData.system = paramsObj.system || ''
        this.inviteData.imei = paramsObj.imei || ''
        this.inviteData.activityId = paramsObj.activityId || ''

        // 重定向
        if (paramsObj.redirect) this.$router.push({name: paramsObj.redirect})
    },
    mounted () {
    // 活动统计
        addActivityLog({
            imei: this.inviteData.imei,
            cellPhone: this.inviteData.cellPhone,
            activityInfoId: this.inviteData.activityId,
            shareActivityId: 0,
            taskId: 0
        })
    }
}
</script>

<style src="./style/public.styl" lang="stylus"></style>
<style src="@/assets/style/transition.styl" lang="stylus"></style>
