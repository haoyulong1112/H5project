<template>
    <div class="container">
        <div class="share1-top">
            <div><img src="~@static/images/202103/share1/icon.png" alt="">闲聊</div>
            <div @click="openApp">打开应用程序</div>
        </div>
        <div class="content" v-if="roomStatus == 1">
            <div>{{name}}<img src="~@static/images/202103/share1/clubicon.png" alt=""></div>
            <div>{{instructions}}</div>
            <div>
                <div>
                    <img v-for="(item,index) in headpic" :key="`a${index}`" :src="item.headPic" alt="">
                </div>
                <div>
                    <p v-for="(item,index) in nickname" :key="`b${index}`">{{item.nikeName}}<img src="~@static/images/202103/share1/lt1.png" alt=""></p>
                </div>
            </div>
            <div>
                <span>{{totalUserCount}}</span>
                <img src="~@static/images/202103/share1/ren.png" alt="">/<span>{{speakersCount}}</span>
                <img src="~@static/images/202103/share1/lt.png" alt="">
            </div>
        </div>
        <div class="download" v-if="roomStatus == 0">
            <div><img src="~@static/images/202103/share1/icon.png" alt=""></div>
            <div>
                <div>闲聊</div>
                <div>社交网络</div>
                <div><img src="~@static/images/202103/share1/xx.png" alt=""></div>
            </div>
            <div @click="openApp">下载</div>
        </div>
        <div class="status"  v-if="roomStatus == 0">
            <div>这个房间已经结束</div>
            <div>但是现在又有更多的正在开启</div>
        </div>
        <div class="chakan" v-if="roomStatus == 0" @click="openApp(1)">查看完整事件</div>
        <div class="des">还没俱乐部账号？ 获取应用程序尽早访问吧</div>
        <div class="appstore"><img src="~@static/images/202103/share1/appstore.png" alt=""></div>
        <div class="mask" v-if="showMask"><img src="~@static/images/202103/share1/download.png" alt=""></div>
    </div>
</template>

<script>

import { queryRoomShareInfo } from '@/api/202103/share'
import getParams from '@/utils/urlparams'
const params = getParams()

export default {
    name: 'index',
    data () {
        return {
            name: '',
            instructions: '',
            headpic: [],
            nickname: [],
            totalUserCount: 0,
            speakersCount: 0,
            // 房间状态 1正在进行 0 已结束
            roomStatus: 1,
            id: '',
            type: '',
            checkId: '',
            showMask: false
        }
    },
    created () {
        this.id = params.id;
        this.type = params.type || '';
        this.checkId = params.checkId || '';
        let data = {
            channel: params.id
        }
        queryRoomShareInfo(data).then(res => {
            if (res.code == '200') {
                this.name = res.data.name;
                this.instructions = res.data.instructions;
                this.totalUserCount = res.data.totalUserCount;
                this.speakersCount = res.data.speakersCount;
                let speakers = res.data.speakers;
                this.roomStatus = res.data.roomStatus;
                for (let i in speakers) {
                    if (i < 2) {
                        this.headpic.push(speakers[i]);
                    }
                    if (i < 3) {
                        this.nickname.push(speakers[i]);
                    }
                }
            }
        })
    },
    methods: {
        openApp(type){
            let flag = this.isQQorWeiBo();
            if(!flag){
                if(type == 1){
                    window.location.href = 'https://www.huitingdata.com?id='+this.id + '&type='+this.type + '&checkId='+this.checkId;
                }else{
                    window.location.href = 'https://www.huitingdata.com';
                }
            }else{
                this.showMask = true;
            }
        },
        // 判断是否再微博或者QQ
        isQQorWeiBo(){
            let flag = false;
            var browser = {
                versions: function () {
                    var u = navigator.userAgent;
                    return {     //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应用程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            } 
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/QQ/i) == "qq" || ua.match(/WeiBo/i) == "weibo") {
                //在新浪微博客户端打开
                flag = true
            }
            if(ua.match("micromessenger") == "micromessenger"){
                flag = false
            }
            return flag
        }
    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
