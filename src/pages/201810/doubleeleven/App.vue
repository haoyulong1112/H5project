<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script>
export default {
    name: 'App',
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isRouterAlive: true
        }
    },
    created () {
        window.isAnswer = false
        window.isNewUser = 0
        window.openid = ''
        window.contentText = ''
        window.isFirstAnswer = ''
        window.answerLogId = ''
        window.reportPic = ''
        window.curpage = 1
        window.time = true
        window.activityData = {}
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style lang="stylus" src="./style/global.styl"></style>
