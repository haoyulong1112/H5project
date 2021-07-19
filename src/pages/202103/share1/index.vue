<template>
    <div class="container">
        <div class="share1-top">
            <div><img src="~@static/images/202103/share1/icon.png" alt="">闲聊</div>
            <div @click="openApp">打开应用程序</div>
        </div>
        <div class="content">
            <div>{{date}}</div>
            <div>{{title}}</div>
            <div><img v-for="(item,index) in othersInfos" :key="`a${index}`" :src="item.headPic" alt=""></div>
            <div>{{introduce}}</div>
        </div>
        <div class="chakan" @click="openApp(1)">查看完整事件</div>
        <div class="des">还没俱乐部账号？ 获取应用程序尽早访问吧</div>
        <div class="appstore"><img src="~@static/images/202103/share1/appstore.png" alt=""></div>
        <!-- toast提示 -->
        <showtoast ref="showtoast" v-bind:text="shoetext"></showtoast>
        <div class="mask" v-if="showMask"><img src="~@static/images/202103/share1/download.png" alt=""></div>
    </div>
</template>

<script>
import { queryProgrammeInfo } from '@/api/202103/share'
import showtoast from '@/components/showtoast/index.vue'

import getParams from '@/utils/urlparams'
const params = getParams()

export default {
    name: 'index',
    data () {
        return {
            date: '',
            title: '',
            introduce: '',
            othersInfos: [],
            shoetext: '',
            id: '',
            type: '',
            checkId: '',
            showMask: false
        }
    },
    components: {
        showtoast
    },
    created () {
        this.id = params.id;
        this.type = params.type || '';
        this.checkId = params.checkId || '';
        this.$nextTick(function () {
            let data = {
                programeId: params.id
            }
            if (data.programeId) {
                queryProgrammeInfo(data).then(res => {
                    if (res.code == '200') {
                        let date = res.data.programmeInfo.startTime || '';
                        let title = res.data.programmeInfo.title || '';
                        let introduce = res.data.programmeInfo.introduce || '';
                        this.title = title;
                        this.introduce = introduce;
                        this.othersInfos = res.data.othersInfos;
                        if (date) {
                            let newdate = this.timestampToTime(date);
                            let datearr = newdate.split(':');
                            this.date = datearr[0] + ':' + datearr[1];
                        }
                    } else {
                        this.shoetext = '参数错误';
                        this.$refs.showtoast.showtime();
                    }
                }).catch(err => {
                    this.shoetext = err.msg || '系统异常';
                    this.$refs.showtoast.showtime();
                })
            } else {
                this.shoetext = '缺少参数';
                this.$refs.showtoast.showtime();
            }
        })
    },
    methods: {
        timestampToTime (timestamp) {
            var date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            let strDate = Y + M + D + h + m + s;
            return strDate;
        },
        openApp (type) {
            let flag = this.isQQorWeiBo();
            console.log('flag=' + flag);
            if (!flag) {
                if (type == 1) {
                    window.location.href = 'https://www.huitingdata.com?id=' + this.id + '&type=' + this.type + '&checkId=' + this.checkId;
                } else {
                    window.location.href = 'https://www.huitingdata.com';
                }
            } else {
                this.showMask = true;
            }
        },
        // 判断是否再微博或者QQ
        isQQorWeiBo () {
            let flag = false;
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/QQ/i) == 'qq' || ua.match(/WeiBo/i) == 'weibo') {
                // 在新浪微博客户端打开
                flag = true
            }
            if (ua.match('micromessenger') == 'micromessenger') {
                flag = false
            }
            return flag
        }
    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
