<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import getParams from '@/utils/urlparams';
import { mapMutations } from 'vuex'
const params = getParams();
export default {
    name: 'app',
    data () {
        return {
        }
    },
    created () {
        // // 邀请有礼banner进来打点
        // let souce = params.souce ? params.souce : 1;
        // this.updateSouce(souce);
        // let typeid = '';
        // if (souce == 1) {
        //     typeid = '336';
        // } else {
        //     typeid = '335';
        // }
        // if (typeid) {
        // // 打点统计
        //     logcountAdd('334', typeid).catch(err => {
        //         Toast(err.msg);
        //     })
        // }
        // this.saveParams(params);
        // this.updateSelected(0);
    },
    methods: {
        ...mapMutations(['saveParams', 'updateSelected', 'updateSouce'])
    }
}
</script>

<!-- <style lang="stylus" src="./style/global.styl"></style> -->
