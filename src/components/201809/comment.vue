<template>
  <div :class="$style.commentComp">
    <div :class="$style.item" v-for="(item, index) in commentData" :key="`a${index}`" @click="downloadApp">
        <div :class="$style.info">
            <div>
                <div :class="$style.avatar">
                    <img v-lazy="{src: item.user.avatar, error: userAvatar}" :key="item.user.avatar">
                    <img v-if="item.user.isVip" v-lazy="require('@static/images/icons/vip.png')">
                </div>
                <div :class="$style.name">
                    <div v-text="item.user.userName"></div>
                    <star-comp :score="item.grade"></star-comp>
                </div>
            </div>
            <div v-text="item.created"></div>
        </div>
        <div :class="$style.content" v-text="item.content"></div>
        <div :class="$style.imgList">
            <img v-lazy="item" v-for="(item, index) in item.imgList" :key="`b${index}`">
        </div>
        <div :class="$style.tip" v-cloak>
            <span v-if="item.serviceName" v-text="item.serviceName"></span>
            <span v-if="item.appointment">服务时间: {{item.appointment}}</span>
        </div>
    </div>
  </div>
</template>

<script>
/*
@props
评论数据格式
commentData = [{
    "content": "评论内容", //评论内容
    "id": 1, //评论ID
    "grade": 5, //星级
    "user": { //用户信息
        "id": 55556073, //用户ID
        "userName": "用户昵称", //用户昵称
        "avatar": "" //用户头像
    },
    "serviceName": "中级洗护套餐", //服务名称
    "appointment": "2018-06-30 16:30", //服务时间
    "created": "2018-06-30", //发表评论时间
    "imgList": [],//评论图片
    "extraItems": [ //单项
        {"name":"刷牙"},
        {"name":"修脚"}
    ]
}]
*/
import starComp from '@/components/201809/star'
const userAvatar = config.userAvatar
const downloadApp = config.downloadApp
export default {
    name: 'comment',
    props: {
        commentData: {
            type: Array,
            default (data) {
                return data || []
            }
        }
    },
    data () {
        return {
            userAvatar
        }
    },
    methods: {
        downloadApp
    },
    components: {
        starComp
    }
}
</script>

<style lang="stylus" module>
@import '~@/assets/style/mixins.styl'
.comment-comp
    font-family PingFangSC-Regular

.item
    padding 0.3rem 0.2rem
    background-color #fff
    font-size 0.28rem
    color #333333
.info
    margin-bottom 0.2rem
    display flex
    justify-content space-between
    height 0.88rem
    > div
        display flex
        align-items center
    > div:last-of-type
        height 0.4rem
        color #666666
.avatar
    position relative
    > img:first-of-type
        circle(0.88)
    > img:nth-of-type(2)
        position absolute
        right 0
        bottom 0
        width 0.3rem
.name
    margin-left 0.12rem
    font-size 0.3rem
    line-height 0.42rem
.content
    margin-bottom 0.2rem
.tip
    ellipsis()
    font-size 0.24rem
    color #999999
    > span:first-of-type
        margin-right 0.3rem
.imgList
    display flex
    overflow auto
    > img
        margin-bottom 0.2rem
        margin-right 0.2rem
        height 1.62rem

</style>
