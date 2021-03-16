<template>
    <div class="container">
        <!-- loading -->
        <loading v-if="loading"></loading>
        <div v-if="!loading" class="index" v-cloak>
            <div v-show="curpage == 1 && appshow == 1" class="appclass">
                 <button @click="$router.push('login')">登录</button>
                <img class="appimage" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15415814156445977970.png" alt="">
                <div class="joinshare" @click="appshare">
                    <div class="participate">
                        立即分享
                    </div>
                </div>
            </div>
            <div v-show="curpage == 1 && appshow == 2" class="first">
                <div class="toast" id="toastshow">活动不存在或已过期</div>
                <img class="indexbg" :src="bgc" v-show="rulebtnshow">
                <div class="join" @click="start">
                    <div class="participate" v-show="rulebtnshow">
                        立即参与
                    </div>
                    <span>测试只适合养狗的铲屎官哦~</span>
                </div>
                <div class="rule" v-show="rulebtnshow" @click="showRule = true">查看规则>></div>
            </div>
            <div v-show="curpage == 2" class="questions-page">
                <div :class="showMusic ? (isAndriodweixin ? 'enablemute isAndriod' : 'enablemute') : (isAndriodweixin ? 'offmusic isAndriod' : 'offmusic') " id="music" @click="enableMute" v-show="!showReplay"></div>
                <div class="beginAnswer" v-show="showBegin" @click="beginAnswer">开始答题</div>
                <div class="curvideo">
                    <div @touchmove.prevent class="mask"></div>
                    <img alt="" id="videoimg" class="videoimg">
                    <div class="video" id="videodom" ref="videodom"></div>
                </div>
                <div class="modal" @touchmove.prevent v-show="videotype2end">
                    <div v-show="showReplay" :class="isAndriodweixin ? 'replay isAndriod' : 'replay'" @click="replay"></div>
                    <div v-show="showReplay" class="questions">
                        <div class="questions-detail">
                            <div v-text="curvideoobj.question"></div>
                            <div class="answer">
                                <div class="answers" v-for="(item, index) in curvideoobj.answer" :key="`a${index}`" @click="updateAnswerLog(curvideoobj.id, item.id, item.score)">
                                    <div><span>{{item.id}}.</span><span>{{item.name}}</span></div>
                                    <div class="checkbox">
                                        <div v-show="item.id == curanswer.answer"></div>
                                        <div v-show="item.id != curanswer.answer"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="jiexi" v-show="showjiexi" @click="jiexiClicked"></div>
                        </div>
                    </div>
                    <div class="overtestClick" v-show="showoverbtn">
                        <div @click="overtestClick">点击继续</div>
                    </div>
                    <div :class="isAndriodweixin ? 'nextbtn isAndriod' : 'nextbtn'" v-show="shownextbtn">
                        <div @click="nextBtnClicked">下一题</div>
                    </div>
                    <div class="getreport" v-show="showgetreport" @click="confirm">生成报告领取优惠券</div>
                </div>
            </div>
            <div v-show="curpage == 3" class="login">3</div>
            <div v-show="curpage == 4" class="report">
                <download-comp></download-comp>
                <img :src="reportPic" class="reportimage" alt="" @touchstart="longClick" @touchend="touchend">
                <div class="bottombox"></div>
                <img class="btpicture" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15415601008223676572.png" alt="">
            </div>
        </div>
        <!-- 规则弹窗组件 -->
        <rule v-model="showRule" :text="ruleText"></rule>
        <div class="window" v-show="showWindow">
            <h3 v-if="true" class="titleText">{{titleText}}</h3>
            <div class="contentText">{{contentText}}</div>
            <div v-if="true" class="botText">{{botText}}</div>
            <div v-if="showSure" class="sure" @click="sure">好的</div>
        </div>
    </div>
</template>
<script>
import { Loading } from 'vux'
import { getActivityQuestionData, submitData, isBindingOpenId, isLongPress, addActivityLog } from '@/api/201810/loadactivityquestion'
import rule from '@/components/201809/rule'
import setshareinfo from '@/utils/hooks/setshareinfo'
import newopenshare from '@/utils/hooks/newopenshare'
import getParams from '@/utils/urlparams';
import wxshare from '@/utils/weixin/wxshare';
import { ticket, info } from '@/api'
import wxcode from '@/utils/weixin/wxcode'
import useragent from '@/utils/useragent'
import downloadComp from '@/components/download'
const downloadApp = config.downloadApp
const params = getParams()
const weixin = useragent.weixin
const refresh = new Date().getTime()
const curUrl = envConfig.shareDomain + '/static/content/html5/byvue/dist/201810/doubleeleven/index.html'
export default {
    inject: ['reload'],
    name: 'Index',
    data () {
        return {
            loading: false,
            // 控制当前显示的页面
            curpage: window.curpage,
            activityId: '',
            openid: window.openid,
            channel: '',
            nickname: '',
            wxPic: '',
            isNewUser: window.isNewUser,
            startTimes: '',
            timeSlot: '',
            cellPhone: '',
            bgc: '',
            answerLogId: window.answerLogId,
            titleText: '恭喜',
            contentText: window.contentText,
            botText: '',
            isFirstAnswer: window.isFirstAnswer,
            reportPic: window.reportPic,
            msg: '',
            myvideodom: '',
            showRule: false,
            rulebtnshow: false,
            showTitleWindow: false,
            showWindow: false,
            showSure: false,
            showBegin: false,
            toastshow: false,
            ruleText: '',
            replayStatus: false,
            rebuild: true,
            videotype2end: false,
            showReplay: false,
            showjiexi: false,
            shownextbtn: false,
            showoverbtn: false,
            showgetreport: false,
            showbtpicture: false,
            closeMusic: true,
            rightWeixincode: false,
            appshow: '',
            isAndriodweixin: '',
            capture: '',
            videObj: '',
            startTime: '',
            endTime: '',
            answerTime: '',
            bindingStatus: '',
            isAnswer: window.isAnswer,
            num: 0,
            answerLog: [],
            videoArray: [],
            anwser: [],
            addActivityLog: {
                imei: params.imei || '',
                cellPhone: params.cellPhone || '',
                type: '3',
                activityInfoId: params.activityId || '',
                taskId: '0',
                pageType: '0'
            },
            curvideo: 0,
            player: null,
            touchflag: true,
            timers: window.time,
            fullurl: '',
            shareTitle: '',
            shareDescribe: '',
            showMusic: true,
            buildTan: false,
            issubmit: true
        };
    },
    computed: {
        // 相当于data,是动态计算出的
        curvideoobj () {
            return this.videoArray[this.curvideo] || {}
        },
        curanswer () {
            for (let item of this.answerLog) {
                if (item.id == this.curvideoobj.id) {
                    return item
                }
            }
        }
    },
    created () {
        this.fullurl = this.getFullUrl(curUrl);
        this.isAndriodweixin = this.isAndriodWeiXin()
        // mediaMgr初始化
        mediaMgr.init()
        // 判断当前页面
        this.repush()
        if (weixin) {
            this.appshow = 2
            this.channel = 0
            this.addActivityLog.pageType = 2
            addActivityLog(this.addActivityLog)
            // 微信内 获取code 获取openid 获取微信昵称，头像
            // 微信回调链接
            // 获取code
            const weixincode = params.code
            if (weixincode) {
                // 获取openid
                ticket(weixincode).then(res => {
                    if (res.data.openid) {
                        // 拿到openid
                        window.openid = res.data.openid
                        this.rightWeixincode = true
                    }
                    return info(res.data.openid, res.data.access_token)
                }).then(res => {
                    if (res.data.nickname) this.nickname = res.data.nickname || ''
                    if (res.data.headimgurl) this.wxPic = res.data.headimgurl || ''
                }).catch(err => {
                    console.warn(err)
                    if (err.msg) Toast(err.msg)
                }).finally(() => {
                    if (!this.rightWeixincode) {
                        // 重新获取code
                        if (this.curpage == 1) {
                            wxcode(this.fullurl)
                        }
                    }
                })
            } else {
                if (this.curpage == 1) {
                    wxcode(this.fullurl)
                }
            }
        } else {
            this.appshow = 1
            this.addActivityLog.pageType = 1
            this.cellPhone = params.cellPhone || window.cellPhone
            this.channel = 1
            if (this.curpage == 1) {
                addActivityLog(this.addActivityLog)
            }
        }

        // 获取详情id
        this.activityId = params.activityId || ''
        let data = {activityId: this.activityId}

        if (!data.activityId) {
            Toast('params not found')
            return
        }
        // 获取活动详情
        if (this.curpage == 1) {
            getActivityQuestionData(data).then(res => {
                let data = res.data
                if (data) {
                    $('#toastshow').hide()
                    this.rulebtnshow = true;
                    // 处理返回结果
                    this.infoFilter(data)
                    if (weixin) {
                        // 设置二次分享
                        let shareData = {}
                        shareData.title = this.shareTitle
                        shareData.desc = this.shareDescribe
                        wxshare(shareData)
                    } else {
                        setshareinfo('1,2', this.shareTitle, this.shareDescribe, this.fullurl)
                    }
                }
            }).catch(err => {
                console.warn(err)
                $('#toastshow').show()
                if (err.msg) Toast(err.msg)
            })
        }
    },
    beforeCreate () {},
    mounted () {},
    methods: {
        // app分享
        appshare () {
            newopenshare('1,2', this.shareTitle, this.shareDescribe, this.fullurl);
        },
        // 判断是否安卓微信
        isAndriodWeiXin () {
            let o = navigator.userAgent.toLowerCase()
            let s = o.indexOf('micromessenger') > -1
            let a = o.indexOf('android') > -1
            if (s && a) {
                return true
            } else {
                return false
            }
        },
        // 重新进去当前页面时需要执行repush 来判断是否需要直接进入第4页
        repush () {
            if (this.curpage == 4) {
                if (this.reportPic) {
                    setTimeout(() => {
                        this.showWindow = true
                        this.showbtpicture = true
                    }, 500)
                    // console.log(this.isNewUser)
                    if (this.isNewUser == '0') {
                        setTimeout(() => {
                            this.showWindow = false
                        }, 3000)
                        this.showSure = false
                        if (this.isFirstAnswer == '1') {
                            this.showTitleWindow = true
                            this.botText = '请到APP中查看'
                        } else {
                            this.showTitleWindow = false
                            this.titleText = ''
                            this.botText = ''
                        }
                    } else {
                        this.showSure = true
                        this.showTitleWindow = true
                        this.botText = '在APP中登录还可获得100元大礼包查看'
                    }
                }
            }
        },
        // 进入微信需要重新加载并获取新的微信链接
        getFullUrl (url) {
            // 登录信息
            if (url) {
                const cellPhone = params.cellPhone || ''
                const imei = params.imei || ''
                const system = params.system || ''
                const activityId = params.activityId || ''
                return `${url}?cellPhone=${cellPhone}&imei=${imei}&system=${system}&activityId=${activityId}&t=${refresh}`
            }
        },
        // 优惠券确认按钮
        sure () {
            this.showWindow = false
        },
        // 长按识别
        longClick () {
            this.startTimes = new Date().getTime()
            // 兼容微信
            this.touchflag = true
            setTimeout(() => {
                if (this.touchflag) {
                    this.isLongPressPic()
                }
            }, 2000)
        },
        touchend () {
            this.touchflag = false
            this.timeSlot = (new Date().getTime()) - this.startTimes
            if (this.timeSlot > 2000) {
                this.isLongPressPic()
            }
        },
        // 长按发送请求
        isLongPressPic () {
            isLongPress({answerLogId: this.answerLogId}).then(res => {
            }).catch(err => {
                console.warn(err)
                if (err.msg) Toast(err.msg)
            })
        },
        // 处理数据
        infoFilter (data) {
            // 背景图
            if (data.activityBgPic) {
                this.bgc = data.activityBgPic;
            }
            // 活动规则
            if (data.activityRule) {
                this.ruleText = data.activityRule;
            }
            // 活动标题
            if (data.shareTitle) {
                this.shareTitle = data.shareTitle
            }
            // 活动标题
            if (data.shareDescribe) {
                this.shareDescribe = data.shareDescribe
            }
            // 视频库
            // 开始视频
            if (data.activityVedio1) {
                let videoFirst = {
                    src: data.activityVedio1 || '',
                    src_ts: data.activityVedio1Ts || '',
                    Capture: data.activityVedio1Capture || '',
                    duration: data.activityVedio1Length || '',
                    type: 1
                }
                this.videoArray.push(videoFirst)
            }
            // 问题视频
            if (data.questionList) {
                for (let item of data.questionList) {
                    // 创建问题视频模板
                    let videoQuestion = {
                        answer: item.answer || [],
                        id: item.id || '',
                        question: item.question || '',
                        src: item.questionVedio || '',
                        src_ts: item.questionVedioTs || '',
                        Capture: item.questionVedioCapture || '',
                        duration: item.questionVedioLength || '',
                        type: 2
                    }
                    // 添加到数据数组中
                    this.videoArray.push(videoQuestion)
                    // 创建答案视频模板
                    let answerVideo = {
                        type: 3,
                        src: item.answerVedio || '',
                        src_ts: item.answerVedioTs || '',
                        Capture: item.answerVedioCapture || '',
                        duration: item.answerVedioLength || ''
                    }
                    // 添加到数据数组中
                    this.videoArray.push(answerVideo)
                    // 创建答案模板
                    let answerItem = {
                        id: item.id || '',
                        answer: '',
                        score: ''
                    }
                    // 添加到答案数据数组
                    this.answerLog.push(answerItem)
                }
            }
            // 结束视频
            if (data.activityVedio2) {
                let videoLast = {
                    src: data.activityVedio2 || '',
                    src_ts: data.activityVedio2Ts || '',
                    Capture: data.activityVedio2Capture || '',
                    duration: data.activityVedio2Length || '',
                    type: 4
                }
                this.videoArray.push(videoLast)
            }
        },
        // 更新答题数据
        updateAnswerLog (qid, aid, cid) {
            if (qid && aid) {
                for (let item of this.answerLog) {
                    if (item.id == qid) {
                        item.answer = aid
                        item.score = cid
                        this.showjiexi = true
                    }
                }
            }
        },
        // 完成提交请求
        complete (adata) {
            submitData(adata).then(res => {
                this.answerLogId = res.data.answerLogId
                this.reportPic = res.data.reportPic
                this.isFirstAnswer = res.data.isFirstAnswer
                this.contentText = res.data.msg
                this.issubmit = true
                this.curpage = 4
                this.repush()
            }).catch(err => {
                this.issubmit = true
                console.warn(err)
                if (err.msg) Toast(err.msg)
            })
        },
        // 查看解析
        jiexiClicked () {
            this.showReplay = false
            this.showjiexi = false
            this.curvideo++
            window.videObj.pause()
            this.goVideo(this.chooseVideoUrl(this.videoArray[this.curvideo]), this.videoArray[this.curvideo].Capture);

            let videoNum = this.videoArray.length - 2
            if (this.curvideo == videoNum) {
                // this.showoverbtn = true
                this.shownextbtn = false
            }
        },
        // 下一题按钮
        nextBtnClicked () {
            this.shownextbtn = false
            this.curvideo++
            window.videObj.pause()
            this.goVideo(this.chooseVideoUrl(this.videoArray[this.curvideo]), this.videoArray[this.curvideo].Capture);
        },
        // 完成答题按钮
        overtestClick () {
            // 完成答题答题打点统计
            this.addActivityLog.taskId = '2'
            this.addActivityLog.pageType = '0'
            addActivityLog(this.addActivityLog)
            this.showoverbtn = false
            this.shownextbtn = false
            this.curvideo++
            window.videObj.pause()
            this.goVideo(this.chooseVideoUrl(this.videoArray[this.curvideo]), this.videoArray[this.curvideo].Capture);
        },
        // 声音控制
        enableMute () {
            window.videObj.muted = this.showMusic ? 1 : 0
            this.showMusic = !this.showMusic
        },
        // 立即参与按钮
        start () {
            // 开始答题打点统计
            this.addActivityLog.taskId = '1'
            this.addActivityLog.pageType = '0'
            addActivityLog(this.addActivityLog)
            this.videoType = 1
            this.startTime = new Date().getTime()
            let videourl = this.chooseVideoUrl(this.videoArray[0]);
            this.goVideo(videourl, this.videoArray[0].Capture);
            this.curpage = 2;
        },
        // 视频结束事件
        videoEnd () {
            const i = this.curvideo
            if (this.videoArray[i].type === 1) {
                this.curvideo = 1
                this.showBegin = true;
            }
            if (this.videoArray[i].type === 2) {
                this.videotype2end = true
                this.showReplay = true
            }
            if (this.videoArray[i].type === 4) {
                this.endTime = new Date().getTime()
                let times1 = (this.endTime - this.startTime) % (24 * 3600 * 1000)
                let times2 = times1 % (3600 * 1000)
                let minutes = Math.floor(times2 / (60 * 1000))
                let times3 = times2 % (60 * 1000)
                let seconds = Math.round(times3 / 1000)
                this.answerTime = (minutes + '分' + seconds + '秒') || '';
                this.showgetreport = true
            }
            window.videostop = true;
        },
        // 确认提交按钮
        confirm () {
            this.videotype2end = false
            // 确认提交后将是否答题状态置为true
            window.isAnswer = true
            // 创建答题数据模板
            let data = {
                activityId: this.activityId,
                answerLog: JSON.stringify(this.answerLog),
                cellPhone: this.cellPhone,
                completeTime: this.answerTime,
                channel: this.channel,
                nickName: this.nickname,
                wxPic: this.wxPic,
                isNewUser: this.isNewUser
            }
            // 将数据赋值给系统变量方便登录跳转后使用
            window.activityData = data;
            // console.log(window.activityData)
            // 判断是否存在openid
            if (window.openid) {
                // 存在则校验是否绑定openid
                isBindingOpenId({openId: window.openid}).then(res => {
                    this.bindingStatus = res.data.status
                    // 若绑定openid则提交答题信息
                    if (this.bindingStatus == 1) {
                        data.cellPhone = res.data.cellPhone
                        // console.log(data)
                        // 提交答题
                        if (this.issubmit) {
                            this.issubmit = false
                            this.complete(data)
                        }
                    } else {
                        // 否则跳转登录
                        this.$router.push('login')
                    }
                }).catch(err => {
                    console.warn(err)
                    if (err.msg) Toast(err.msg)
                })
                // 判断是否存在cellphone若存在则表示在app中已登录直接提交答题数据
            } else if (this.cellPhone) {
                this.complete(data)
            } else {
                // 否则跳转登录页
                this.$router.push('login')
            }
        },
        // 播放视频
        goVideo (videname, Capture) {
            $('#videoimg').attr('src', Capture);
            // $('#videoimg').show();
            // 隐藏重播按钮
            this.showReplay = false
            // 初始化video
            mediaMgr.initQuestion(videname, this.curvideo);
            let tmpvide = mediaMgr.video[videname];
            window.videObj = tmpvide
            // 视频声音状态控制
            window.videObj.muted = this.showMusic ? 0 : 1
            $('#videodom').html(tmpvide.domElement);
            $('#videodom video').attr('poster', Capture)
            mediaMgr.video[videname].load()
            setTimeout(() => {
                tmpvide.play();
                window.videostop = false;
            }, 300);
            window.videObj.addEventListener('ended', this.videoEnd);
            window.videObj.addEventListener('timeupdate', () => {
                let curtimes = window.videObj.getCurrentTime()
                if (curtimes > 0.01) {
                    // $('#videoimg').fadeOut(500, () => {
                    if (this.videoArray[this.curvideo].type == 3) {
                        if (this.curvideo !== (this.videoArray.length - 2)) {
                            this.shownextbtn = true
                        } else {
                            this.showoverbtn = true
                        }
                    }
                    // });
                }
            });
        },
        // 重新播放按钮
        replay () {
            this.showjiexi = false
            for (let item of this.answerLog) {
                if (item.id == this.curvideoobj.id) {
                    item.answer = ''
                }
            }
            window.videObj.pause()
            let videourl = this.chooseVideoUrl(this.videoArray[this.curvideo]);
            this.goVideo(videourl, this.videoArray[this.curvideo].Capture);
        },
        // 选择视频链接
        chooseVideoUrl (obj) {
            let tmpvideourl = obj.src
            return tmpvideourl;
        },
        // 开始答题按钮
        beginAnswer () {
            window.videObj.pause()
            let videourl = this.chooseVideoUrl(this.videoArray[this.curvideo]);
            this.goVideo(videourl, this.videoArray[this.curvideo].Capture);
            this.showBegin = false;
        },
        // 下载公共方法
        downloadApp
    },
    components: {
        Loading,
        rule,
        // 下载公共组件
        downloadComp
    }
};
</script>

<style lang="stylus" src="../style/index.styl" scoped></style>
