<template>
    <div class="container">
        <div class="indexbox">
            <img :src="bgc1" alt="">
            <div class="btnbox">
                <img :src="btnImg" alt="" @click="goMsg">
                <div>玩互动，新用户可领取5折洗美券哦，老用户也有超级福利</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import useragent from '@/utils/useragent'
import wxshare from '@/utils/wxshare'
const weixin = useragent.weixin
const newshareData = config.shareData;
export default {
    name: 'index',
    data () {
        return {
            bgc1: 'https://api-image-dev.ichongwujia.com/html5/16267736366854155534.png',
            bgc2: 'https://api-image-prod.ichongwujia.com/html5/16261466864277718219.png',
            btnImg: 'https://api-image-prod.ichongwujia.com/html5/16261454504449559428.png'
        };
    },
    created () {
        if (weixin) {
            // 设置二次分享
            let shareData = {}
            shareData.title = newshareData.shareTitle;
            shareData.desc = newshareData.shareDescribe;
            shareData.link = this.getUrl(); ;
            wxshare(shareData)
        }
        this.$sensors.quick('isReady', () => {
            let PresetProperties = this.$sensors.getPresetProperties();
            PresetProperties['activity_id'] = '79';
            PresetProperties['activity_name'] = '年中奖活动';
            this.$sensors.track('ActivityPage_liulan', PresetProperties);
        });
    },
    computed: {
        ...mapGetters(['getUrl'])
    },
    methods: {
        goMsg () {
            this.$router.push({
                name: 'getmsg',
                path: '/getmsg'
            });
        }
    }
};
</script>

<style lang="stylus" src="../style/index.styl" scoped></style>
