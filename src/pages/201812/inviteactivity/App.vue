<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import wxshare from '@/utils/weixin/wxshare';
export default {
    name: 'app',
    data () {
        return {
            shareTitle: '宠物家（百子湾店）狗狗洗澡0元起，马上领',
            shareDescribe: '您身边的宠物管家，带来五星级洗护体验。'
        };
    },
    created () {
        // 设置二次分享
        let shareData = {}
        shareData.title = this.shareTitle;
        shareData.desc = this.shareDescribe;
        wxshare(shareData)

        // 初始化默认值
        window.curpage = 1;
        window.openid = '';
        window.cellPhone = '';
        window.islogin = 0;
    }
}
</script>

<style lang="stylus" src="./style/global.styl"></style>
