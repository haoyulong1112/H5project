<template>
    <div :class="$style.petlist">
        <div :class="$style.tab">
            <div>
                <div :class="curtab === index && $style.active" v-for="(item, index) in tabs" :key="`a${index}`" v-text="item" @click="curtab = index"></div>
            </div>
        </div>
        <div :class="$style.search">
            <input v-model="searchText" type="text" :placeholder="searchPlaceholder || '请输入爱宠类型'" @input="$emit('searchInput', searchText)">
        </div>
        <div :class="$style.list">
            <!-- 遍历lists -->
            <div v-show="curtab === listindex" v-for="(list, listindex) in lists" :key="`b${listindex}`">
                <!-- 遍历lists子元素（猫集合，狗集合） -->
                <div v-for="(block, i) in list" :key="`c${i}`">
                    <div :class="$style.title" v-text="block.firstLetter"></div>
                    <!-- 遍历猫/狗集合下按首字母划分的block中的内容 -->
                    <div :class="$style.item" v-for="(item, index) in block.list" :key="`d${index}`" @click="$emit('itemClicked', {id: item.petId, name: item.petName, kind: item.petKind, tabIndex: curtab})">
                        <div>
                            <img v-lazy="{src: getFullPetAvatar(item.avatar), error: userAvatar}" :key="item.avatar">
                            <div v-text="item.petName"></div>
                        </div>
                        <div v-if="item.petId == selectedPetId">
                            <img src="@static/images/icons/allright.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*
@props
tabs tab栏文案，与lists中一一对应
lists 内容大数组，与tabs中一一对应
selectedPetId 默认选中的petId
searchPlaceholder 输入框提示文案
tabIndex 初始选中的tab

@emit
itemClicked 某一项被点击时，会向上传递id，name
*/
const userAvatar = config.userAvatar
const getFullPetAvatar = config.getFullPetAvatar
export default {
    name: 'petlist',
    props: ['tabs', 'lists', 'selectedPetId', 'searchPlaceholder', 'tabIndex'],
    data () {
        return {
            userAvatar,
            // 当前选中tab的index
            curtab: this.tabIndex || 0,
            searchText: ''
        }
    },
    methods: {
        getFullPetAvatar
    }
}
</script>

<style lang="stylus" module>
@import '~@/assets/style/mixins.styl'
.petlist
    font-family PingFangSC-Regular

.tab
    display flex
    justify-content center
    padding 0.3rem 0
    > div
        display inline-flex
        height 0.54rem
        border 1px solid #BB996C
        border-radius 0.08rem
        > div
            display flex
            justify-content center
            align-items center
            width 1.8rem
            font-size 0.28rem
            color #BB996C
            background-color #fff
            border-radius 0.08rem
        > div.active
            color #fff
            background-color #BB996C
            border-radius 0

.search
    margin-bottom 0.3rem
    padding 0 0.2rem
    > input
        padding 0 0.6rem
        box-sizing border-box
        width 100%
        height 0.6rem
        border 1px solid #BB996C
        border-radius 0.08rem
        background url('@static/images/icons/search.png') no-repeat 0.2rem 0.13rem / 0.3rem

.title
    padding 0 0.2rem
    height 0.6rem
    line-height 0.6rem
    font-size 0.32rem
    color #333
    background #F2F2F2
    box-shadow inset 0 -1px 0 0 #EEEEEE

.item
    display flex
    justify-content space-between
    align-items center
    padding 0 0.3rem 0 0.18rem
    height 1.58rem
    box-shadow inset 0 -1px 0 0 #EEEEEE
    > div:first-of-type
        display flex
        align-items center
        font-size 0.28rem
        color #666666
        > img
            circle(0.98)
            margin-right 0.2rem
    > div:nth-child(2)
        display flex
        justify-content center
        align-items center
        circle(0.4)
        background-image linear-gradient(90deg, #D0021B 0%, #EB6340 100%)
        box-shadow 0 0.03rem 0.05rem 0 rgba(208,2,27,0.36)
        > img
            width 0.22rem

</style>
