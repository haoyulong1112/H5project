<template>
    <div class="container">
        <div class="content">
            <div class="content_item">
                <img class="bgc" src="@static/images/202201/bgc.png" alt="">
                <div class="invitebtn" @click="openshare"></div>
            </div>
            <div class="content_item">
                <img v-if="hasfirendList" class="bgc" src="@static/images/202201/list.png" alt="">
                <img v-else class="bgc" src="@static/images/202201/nothing.png" alt="">
                <div class="firendlist" v-if="hasfirendList">
                    <div class="firendlist_item" v-for="(item,index) in inviteList" :key="index">
                        <div class="item_left">
                            <div>{{index+1}}</div>
                            <div>
                                <img :src="item.headPic" alt="">
                                <div>
                                    <div>{{item.cellPhone}}</div>
                                    <!-- <div>{{item.nikeName}}</div> -->
                                </div>
                            </div>
                        </div>
                        <div>成功领取金币</div>
                    </div>
                </div>
            </div>
        </div> 
        <showtoast ref="showtoast" v-bind:text="shoetext"></showtoast>
    </div>
</template>

<script>
import {recommendList } from '@/api/202103/share'
import showtoast from '@/components/showtoast/index.vue'

import getParams from '@/utils/urlparams'
const params = getParams()
export default {
    name: 'index',
    data () {
        return {
            shoetext: '',
            id: '',
            userId: '',
            type: '',
            checkId: '',
            showMask: false,
            // 是否可以登录
            canLogin: false,
            // 是否有邀请列表
            hasfirendList: false,
            // 当前用户userId
            inviteList: [],
            oldHref: '',
            cellPhone: ''
        }
    },
    components: {
        showtoast
    },
    created () {
        this.userId = params.userId;
        this.cellPhone = params.cellPhone;
        this.oldHref = window.location.href;
        this.getList();
    },
    methods: {
        // 获取邀请利列表
        getList(){
            if(!this.userId){
                return;
            }
            let data = {
                userId: this.userId
            }
            recommendList(data,this.cellPhone).then(res => {
                console.log(res);
                if(res.code == 200){
                    this.inviteList  = res.data;
                    if(this.inviteList.length > 0){
                        this.hasfirendList = true;
                    }else{
                        this.hasfirendList = false;
                    }
                }
            })
        },
        openshare(){
            // this.showMask = true;
            window.location.href = 'huiting://share?mobilehtml5/dist/202201/loginget/index.html';
        },
        closeMark(){
            // this.showMask = false;
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
