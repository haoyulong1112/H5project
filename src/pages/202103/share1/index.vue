<template>
    <div class="container">
        <div class="share1-top">
            <div><img src="~@static/images/202103/share1/icon.png" alt="">闲聊</div>
            <div>打开应用程序</div>
        </div>
        <div class="content">
            <div>{{date}}</div>
            <div>{{title}}</div>
            <!-- <div>MIND BODY GAME<img src="~@static/images/202103/share1/clubicon.png" alt=""></div> -->
            <div><img v-for="(item,index) in othersInfos" :key="`a${index}`" :src="item.headPic" alt=""></div>
            <div>{{introduce}}</div>
        </div>
        <!-- <div class="hasacount">已有账号</div> -->
        <div class="chakan">查看完整事件</div>
        <div class="des">还没俱乐部账号？ 获取应用程序尽早访问吧</div>
        <div class="appstore"><img src="~@static/images/202103/share1/appstore.png" alt=""></div>
    </div>
</template>

<script>
import { queryProgrammeInfo } from '@/api/202103/share'

import getParams from '@/utils/urlparams'
const params = getParams()

export default {
    name: 'index',
    data () {
        return {
            date: '',
            title: '',
            introduce: '',
            othersInfos: []
        }
    },
    created () {
        let data = {
            programeId: params.id
        }
        queryProgrammeInfo(data).then(res => {
            console.log(res);
            if (res.code == '200') {
                let date = res.data.programmeInfo.createTime || '';
                let title = res.data.programmeInfo.title || '';
                let introduce = res.data.programmeInfo.introduce || '';
                this.title = title;
                this.introduce = introduce;
                this.othersInfos = res.data.othersInfos;
                if (date) {
                    let newdate = this.timestampToTime(date);
                    let datearr = newdate.split(':');
                    this.date = datearr[0] + ':' + datearr[1];
                    console.log(this.date);
                }
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
        }
    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
