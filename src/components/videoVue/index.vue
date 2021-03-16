<template>
  <div class="video-comp" @click="videoPlay(!btnOnly, 'video')">
    <video ref="myvideo" :style="videoStyle" airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true" :autoplay="autoplay" :loop="loop" :preload="preload" :poster="poster" @tap="$emit('tap')" @canplay="$emit('canplay')" @loadedmetadata="$emit('loadedmetadata')" @ended="videoEnd" style="object-fit: fill;">
      <source :src="src">
      当前浏览器不支持播放此视频
    </video>
  </div>
</template>

<script>
/*
@props
controls 默认 false 不使用浏览器控制条
autoplay 默认 false 不自动播放
loop 默认 false 不循环
btnOnly 默认 true 只能点击btn开始
preload 默认 auto 页面加载完后开始加载视频
playsinline 默认 true 不全屏
poster 封面图片地址
src 视频地址
videoStyle 默认 rem布局 通栏 16:9
*/
export default {
    name: 'videoc',
    props: {
        controls: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: false
        },
        btnOnly: {
            type: Boolean,
            default: true
        },
        preload: {
            type: String,
            default: 'auto'
        },
        playsinline: {
            type: String,
            default: 'true'
        },
        poster: {
            type: String,
            default: ''
        },
        src: {
            type: String,
            default: ''
        },
        videoStyle: {
            type: Object,
            default (value) {
                const ret = value || {
                    width: '7.5rem',
                    height: '4.22rem',
                    background: '#000'
                }
                return ret
            }
        }
    },
    data () {
        return {
            isPlay: this.autoplay,
            closeMusic: true,
            videoTime: '',
            videoShow: true,
            imgShow: false
        }
    },
    methods: {
    // 开始播放
        videoPlay (able, type) {
            this.$refs.myvideo.load()
            this.$refs.myvideo.removeAttribute('controls');
            if (able) {
                const video = this.$refs.myvideo
                if (video.paused) {
                    video.play()
                    this.isPlay = true
                } else {
                    video.pause()
                    this.isPlay = false
                }
            }
            if (type === 'video') {
                if (this.isPlay) {
                    const video = this.$refs.myvideo
                    video.pause()
                    this.isPlay = false
                }
            }
        },
        // 播放结束
        videoEnd () {
            this.isPlay = false
            this.$emit('videoEnd')
        },
        enableMute () {
            const video = this.$refs.myvideo
            if (this.closeMusic) {
                video.muted = true
                this.closeMusic = false
            } else {
                video.muted = false
                this.closeMusic = true
            }
        }
    },
    mounted () {
        this.$emit('videoDom', this.$refs.myvideo)
    }
}
</script>

<style lang="stylus" scoped>
.video-comp
  position: relative;
  > div
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
.video-default-btn
  width: 1.48rem;
</style>
