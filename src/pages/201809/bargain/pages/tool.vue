<template>
    <div class="container">
        <div class="index">
            <!-- 道具列表 list -->
            <div v-if="toolListData.length" class="list">
                <div class="item" v-for="(item, index) in toolListData" :key="`a${index}`">
                    <div>
                        <div>
                            <div class="tool-img">
                                <img src="@static/images/201809/bargainshare/toolpopup/tool.png">
                            </div>
                            <div class="tool-text">
                                <div v-text="item.name"></div>
                                <div>使用{{item.name}}可以多砍一刀哦~</div>
                            </div>
                        </div>
                        <div class="global-btn w156" @click="setCurtab(0); $router.push('list')">去使用</div>
                    </div>
                </div>
            </div>
            <!-- 无道具 empty -->
            <div v-else class="empty">
                <img src="@static/images/icons/dogsad.png">
                <div>目前还没有获得道具哦~</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { loadBargainPropList } from '@/api/201809/bargain'
export default {
    name: 'tool',
    data () {
        return {
            toolListData: []
        };
    },
    computed: {
        ...mapState(['cellPhone', 'system', 'imei', 'activityId'])
    },
    methods: {
        ...mapMutations(['setCurtab'])
    },
    async created () {
        try {
            const res = await loadBargainPropList({
                cellPhone: this.cellPhone,
                system: this.system,
                imei: this.imei,
                activityId: this.activityId
            })
            if (res.data) {
                if (res.data.propList) this.toolListData = res.data.propList
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.warn(err)
        }
    }
};
</script>

<style src="../style/tool.styl" lang="stylus" scoped></style>
