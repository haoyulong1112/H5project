<template>
  <div class="index" v-cloak>
    <!-- banner -->
    <div class="banner">
      <div v-if="bannerData.type==2" @click="downloadApp">
        <img :src="bannerData.content">
      </div>
      <div v-else-if="bannerData.type==3" class="video">
        <video-comp
          :src="bannerData.content"
          :poster="bannerData.cover"
        ></video-comp>
      </div>
    </div>
    <!-- title -->
    <div class="title">
      <div class="title-text">
        <span v-text="titleData.title"></span>
      </div>
      <div class="title-author">
        <div>
          <img v-lazy="{src: titleData.sourceIcon}">
          <span v-text="titleData.source"></span>
        </div>
        <span v-text="titleData.releaseTimeStr"></span>
      </div>
      <div class="title-tags">
        <span v-for="(item, index) in titleData.labelList" :key="`a${item}${index}`">{{item}}</span>
      </div>
    </div>
    <!-- content -->
    <div class="content">
      <div v-for="(item, index) in contentData" :key="`b${item}${index}`">
        <div v-if="item.type==1">
          <div v-html="item.content"></div>
        </div>
        <div v-else-if="item.type==2" @click="downloadApp">
          <img v-lazy="item.content">
        </div>
      </div>
    </div>
    <!-- comment -->
    <div class="comment">
      <div class="comment-title">
        <span>评论</span>
        <span @click="downloadApp">共{{commentData.total}}条评论<span>></span></span>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="(item, index) in commentData.list" :key="`c${item}${index}`">
          <div class="comment-item-info">
            <div>
              <img v-lazy="{src: item.avatar, error: userAvatar}" :key="item.avatar">
              <span v-text="item.userName"></span>
            </div>
            <span v-text="item.dateStr"></span>
          </div>
          <div class="comment-item-content">
            <div>
              <span v-text="item.content"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- downloadComp -->
    <download-comp></download-comp>
  </div>
</template>

<script>
import {encyclopediaInfo} from '@/api'
import getParams from '@/utils/urlparams'
import wxshare from '@/utils/wxshare'

import downloadComp from '@/components/download'
import videoComp from '@/components/video'

const userAvatar = config.userAvatar
const downloadApp = config.downloadApp

export default {
    name: 'Index',
    data () {
        return {
            // 默认头像
            userAvatar,
            infoData: {},
            // banner
            bannerData: {
                type: '',
                content: '',
                cover: ''
            },
            // title
            titleData: {
                title: '',
                source: '',
                sourceIcon: '',
                releaseTimeStr: '',
                labelList: []
            },
            // content
            contentData: [],
            // comment
            commentData: {
                list: [],
                total: 0
            }
        }
    },
    created () {
    // 获取详情id
        const infoId = getParams().infoId
        if (!infoId) {
            Toast('infoId not found in url')
            return
        }

        // 请求详情
        encyclopediaInfo({infoId: infoId}).then((res) => {
            // 获取主标题，副标题，封面图
            const title = res.data.title || ''
            const shareSubtitle = res.data.shareSubtitle || ''
            const collectionCover = res.data.collectionCover || ''
            // 更新页面title
            document.title = title
            // 处理返回结果
            this.infoFilter(res.data)
            // 设置二次分享
            return wxshare({
                title: title,
                desc: shareSubtitle,
                imgUrl: collectionCover
            })
        }).catch((err) => {
            const errMsg = err.msg || ''
            if (errMsg) Toast(errMsg)
        })
    },
    methods: {
    // 下载公共方法
        downloadApp,
        infoFilter (data) {
            this.infoData = data
            // banner
            if (data.topContent && data.topContent.type) {
                const type = data.topContent.type
                this.bannerData.type = type
                // type= 2图片，3视频
                if (data.topContent && data.topContent.content) {
                    if (type == 2) {
                        this.bannerData.content = data.topContent.content
                    } else if (type == 3) {
                        this.bannerData.content = data.topContent.content
                        this.bannerData.cover = data.topContent.cover
                    }
                }
            }
            // titleData 标题，来源，头像，事件，标签列表
            if (data.title) this.titleData.title = data.title
            if (data.source) this.titleData.source = data.source
            if (data.sourceIcon) this.titleData.sourceIcon = data.sourceIcon
            if (data.releaseTimeStr) this.titleData.releaseTimeStr = data.releaseTimeStr
            if (data.labelList && data.labelList.length) {
                for (let item of data.labelList) {
                    if (item.name) this.titleData.labelList.push(item.name)
                }
            }
            // contentData type= 1文本，2图片，3视频
            let content = data.content
            if (content && content.length) {
                for (let item of content) {
                    if (item.type == 1) {
                        item.content = item.content.replace(/\n/g, '<br/>')
                    }
                }
                this.contentData = content
            }
            // commentData commentNum 评论数量 commentList 评论列表
            if (data.commentNum !== undefined) this.commentData.total = data.commentNum
            if (data.commentList && data.commentList.length) {
                this.commentData.list = data.commentList
            }
        }
    },
    components: {
    // 下载公共组件
        downloadComp,
        // 视频公共组件
        videoComp
    }
}
</script>

<style src="./index.styl" lang="stylus" scoped></style>
<style>
body{background-color: #f8f8f8;}
</style>
