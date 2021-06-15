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
            checkId: ''
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
            console.log(res);
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
            if(type == 1){
                window.location.href = 'https://www.huitingdata.com?id='+this.id + '&type='+this.type + '&checkId='+this.checkId;
            }else{
                window.location.href = 'https://www.huitingdata.com';
            }
        }
    }
};
</script>

<style src="./index.styl" lang="stylus"></style>
