<template>
  <div class="container">
        <div class="navbar-default sidebar" style="top:0;" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav nav-first-level" id="side-menu">
                    <li v-for="(item,index1) in navlist" :key="index1" @click="level1(index1)" :data-show="item.show">
                        <a :href="item.url ? item.url : '#'"><i class="fa fa-th-list fa-fw"></i>{{item.name}}<span class="fa arrow"></span></a>
                        <ul :class="item.show ? 'nav nav-second-level active' : 'nav nav-second-level collapse'" v-if="item.list && item.list.length > 0">
                            <li v-for="(item1, index2) in item.list" :key="index2" @click="level2(index1,index2)">
                                <a :href="item1.url ? item1.url : '#'" class="">{{item1.name}}</a>
                                <ul class="nav nav-third-level collapse" v-if="item1.list && item1.list.length > 0">
                                    <li v-for="(item2, index3) in item.list" :key="index3">
                                        <a :href="item2.url" class="">{{item2.name}}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            navlist: [
                {
                    url: '',
                    name: '一级菜单',
                    show: false,
                    list: [
                        {
                            url: '',
                            name: '二级菜单1',
                            list: [
                                {
                                    url: 'ccccc',
                                    name: '三级菜单1'
                                },
                                {
                                    url: 'ccccc',
                                    name: '三级菜单2'
                                }
                            ]
                        },
                        {
                            url: '',
                            name: '二级菜单2'
                        }
                    ]
                },
                {
                    url: '',
                    name: '一级菜单2',
                    show: false,
                    list: [
                        {
                            url: 'bbbb',
                            name: '二级菜单1'
                        },
                        {
                            url: '',
                            name: '二级菜单2',
                            list: [
                                {
                                    url: 'ccccc',
                                    name: '三级菜单1'
                                },
                                {
                                    url: 'ccccc',
                                    name: '三级菜单2'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    created () {

    },
    methods: {
        huanke () {
            WeixinJSBridge.call('closeWindow');
        },
        plus (a, b) {
            console.log(a + b);
        },
        level1 (index) {
            console.log(index);
            let navlist = this.navlist;
            let currentData = navlist[index];
            if (!currentData.show) {
                currentData.show = true;
            } else {
                currentData.show = false;
            }
            this.navlist[index] = currentData
        },
        level2 (a, b) {
            // let currentnavlist = this.navlist[a].list[b];
            // console.log(navlist);
            // // let currentData = navlist[index];
            // if (!currentnavlist.show) {
            //     currentData.show = true;
            // } else {
            //     currentData.show = false;
            // }
            // this.navlist[index] = currentData
        }
    }
}
</script>
<style lang="stylus">
.container,html,body
    width 100%;
    height 100%;
#side-menu .noactive{
    background: none;
}
.navbar-default
    width 200px;
    font-size 20px;
.sidebar-nav
    width 100%;
.nav
    width 100%;
    list-style-type: none;
    > li
        width 100%;
        font-size: 25px;
        > a
            text-decoration none;
a
    text-decoration none;
.nav.collapse
    display none;
.nav.active
    display block;
</style>
