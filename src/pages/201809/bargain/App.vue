<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import getParams from '@/utils/urlparams'
import updateurl from '@/utils/updateurl'
const params = getParams()

export default {
    name: 'App',
    methods: {
        ...mapMutations(['saveParams', 'updateCellPhone', 'setCurtab', 'setSelectedPetInfo']),
        ...mapActions(['getBargainList', 'getMyTaskList'])
    },
    created () {
        window.taskInfo = {}
        window.expressList = {}
        window.addressInfo = {}
        window.taskId = '';
        window.expressList = []

        // 获取url参数存入store
        this.saveParams(params)
        this.setCurtab(params.curtab)
        this.setSelectedPetInfo({
            id: params.selectedPetId,
            name: decodeURIComponent(params.selectedPetName || '')
        })
        // 重定向到子路由
        if (params.petredirect) this.$router.push(params.petredirect)
        // 获取砍价活动入口列表
        this.getBargainList()
        // 获取我的免单列表
        if (params.cellPhone) {
            this.getMyTaskList()
        } else {
            // 登录回调
            window.init_roll = cellPhone => {
                const url = updateurl({
                    cellPhone: cellPhone
                })
                window.location.href = url
            }
        }
    }
}
</script>

<style src="./style/global.styl" lang="stylus"></style>
