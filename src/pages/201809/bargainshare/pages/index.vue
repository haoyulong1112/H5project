<template>
    <div class="container">
        <!-- loading -->
        <loading :show="loading"></loading>
        <div v-if="!loading" class="index" v-cloak>
            <!-- rule -->
            <div class="rule" @click="showRule = true">
                <span>活动规则</span>
            </div>

            <!-- content -->
            <div v-show="loadSuccess">
                <div class="content-top">
                    <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389659996395866330.png">
                </div>
                <div class="content-middle">
                    <div class="content">
                        <div class="info">
                            <div class="info-user">
                                <div>
                                    <img v-lazy="{src: userData.avatar, error: userAvatar}">
                                </div>
                                <div>
                                    <div v-text="userData.name"></div>
                                    <div v-text="userData.tip"></div>
                                </div>
                            </div>
                            <div class="info-task">
                                <div>
                                    <img :src="taskInfo.pic">
                                </div>
                                <div class="task-text">
                                    <div v-text="taskInfo.name" style="-webkit-box-orient: vertical"></div>
                                    <div>
                                        <div class="task-price">
                                            ￥<span class="font-bold" v-text="taskInfo.price"></span>
                                        </div>
                                        <div class="task-count" v-cloak>{{taskInfo.quota ? `剩余免单名额：${taskInfo.quota}` : '名额已抢光'}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="info-schedule">
                                <!-- 已砍和进度条 -->
                                <div class="info-bargained-tip" v-html="bargainedTip"></div>
                                <div class="info-schedule-tip" :class="{small: bargainedTip}">
                                    <img v-if="bargainTask.state == 2" src="@static/images/201809/bargainshare/goldcoin.png">
                                    <div v-html="bargainTask.infoScheduleTip"></div>
                                </div>
                                <mt-progress :value="bargainTask.completeProportion"></mt-progress>
                            </div>
                            <div v-if="countDownTip || bargainTask.infoTipText" class="info-tip">
                                <div class="info-tip-text">
                                    <!-- 倒计时和过期抢光提醒 -->
                                    <div v-if="countDownTip" class="global-countdown" v-html="countDownTip"></div>
                                    <div v-else v-html="bargainTask.infoTipText"></div>
                                </div>
                                <!-- 当前任务获得了道具，提示文案，此需求已砍 201809041517 -->
                                <!-- <div class="info-tip-tool">没砍价成功哦~ 不要灰心，阿宠送您一把宝刀，下次砍价更快</div> -->
                            </div>
                            <div class="info-btn">
                                <!-- 客户端内 未发起，进行中 发起并弹出分享 -->
                                <transition name="scale">
                                    <div v-if="btnState == 1" class="global-btn" @click="inviteBtnClick()">邀请好友，帮砍一刀</div>
                                    <!-- 客户端内 未发起，进行中，可用宝刀(有且未使用过) 一，同上。二，调砍一刀接口 -->
                               </transition>

                                <div v-if="btnState == 2" class="global-btn highlight w290" @click="bargain(prop.id)">用宝刀砍一刀</div>
                                <div v-if="btnState == 2" class="global-btn w310" @click="inviteBtnClick()">邀请好友帮砍</div>
                                <!-- 客户端内 已完成 一，跳客户端。二，跳列表首页 -->
                                <div v-if="btnState == 3 && bargainTask.type !== 4" class="global-btn highlight" @click="tocoupon">查看免单券</div>

                                <div v-if="btnState == 3 && (bargainTask.state == 2 && bargainTask.type == 4  && bargainTask.extendParam.logistics.deliveryStatus == '已发货')" class="global-btn highlight" @click="toexpress(bargainTask.taskId)">查看物流</div>
                                 <div v-if="btnState == 3 && (bargainTask.state == 2 && bargainTask.type == 4  && bargainTask.extendParam.logistics.deliveryStatus == '未发货')" class="greybutton global-btn highlight" >待发货</div>
                                <div v-if="btnState == 3" class="global-btn w290" @click="onceAgainClick">再免一单</div>
                                <!-- 客户端内 （活动，任务）已过期，已抢光 同上 -->
                                <div v-if="btnState == 4" class="global-btn" @click="onceAgainClick">再免一单</div>
                                <!-- 微信内 进行中 调砍一刀接口 -->
                               <div v-if="btnState == 5" class="global-btn" @click.stop="bargain()">帮好友砍一刀</div>
                                <!-- 微信内 进行中，已点过 弹分享提醒 跳下载 -->
                                <div v-if="btnState == 6" class="global-btn highlight" @click="showShareGuide = true">邀请好友帮TA</div>
                                <div v-if="btnState == 6" class="global-btn w290" @click="downloadApp">我也要免费拿</div>
                                <!-- 微信内 非进行中 同上 -->
                                <div v-if="btnState == 7" class="global-btn" @click="downloadApp">我也要免费拿</div>
                            </div>
                        </div>
                        <!-- <div v-show="false" class="invite" @click="goInvitePage">
                            <img v-if="weixin" :src="invitePicWeixin">
                            <img v-else :src="invitePicApp">
                        </div> -->
                        <div v-if="bargainLogs.length" class="record">
                            <div class="global-title">砍价记录</div>
                            <div class="record-list">
                                <div class="record-item" v-for="(item, index) in bargainLogs" :key="`a${index}`">
                                    <div class="record-title">
                                        <img v-lazy="{src: item.avatar, error: userAvatar}" :key="`${item.nickname}${item.avatar}`">
                                        <span v-text="item.nickname || '匿名'"></span>
                                    </div>
                                    <div class="record-money">
                                        <img src="@static/images/201809/bargainshare/axe.png">
                                        <div>砍掉{{item.price}}元</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-bottom">
                    <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389660685879143310.png">
                </div>
            </div>
            <!-- recommanded 推荐-->
             <div style="width:100%" v-if="bannershow">
                     <img  v-lazy="item" v-for="(item,index) in invitePic" :key="`a${index}`" style="width:100%"/>
            </div>
            <div class="recommanded" v-if="recommandedData.length && !bannershow">
                <div class="global-title">为 \ 您 \ 推 \ 荐</div>
                    <div class="recommanded-list">
                    <div class="recommanded-item" v-for="(item, index) in recommandedData" :key="`b${index}`" @click="weixin ? downloadApp() : togoodsdetail(item.id)">
                        <div>
                            <div class="recommanded-img">
                                <img v-lazy="item.thumbnail" :key="item.thumbnail">
                            </div>
                            <div class="recommanded-title" style="-webkit-box-orient: vertical">
                                <span v-text="item.title"></span>
                            </div>
                            <div v-show="item.vipCanNum" class="recommanded-tag">
                                <span>赠送{{item.vipCanNum}}个罐头币</span>
                            </div>
                            <div class="recommanded-price">
                                <div>￥<span>{{item.retailPrice}}</span></div>
                                <div>￥{{item.marketValue}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 规则弹窗组件 -->
        <rule v-model="showRule" :text="activityInfo.activityRule"></rule>
        <!-- 使用道具提醒弹窗 -->
        <mt-popup v-model="showToolConfirm" zIndex="990">
            <div>
                <div class="popup-clearbtn">
                    <img src="@static/images/icons/clear.png" @click="showToolConfirm = false">
                </div>
                <div class="tool-popup">
                    <img class="tool-title" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389705133794812669.png">
                    <img class="tool-bg" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389703744826393859.png">
                    <img class="tool-bg-left" src="@static/images/201809/bargainshare/toolpopup/bg-left.png">
                    <img class="tool-bg-right" src="@static/images/201809/bargainshare/toolpopup/bg-right.png">
                    <div class="tool-content">
                        <div class="tool-tip">
                            <div>获得宝刀砍价权利</div>
                            <img src="@static/images/201809/bargainshare/toolpopup/tool.png">
                        </div>
                        <div class="tool-btn" @click="bargain(prop.id)">
                            <div class="global-btn w433">使用宝刀再砍一刀</div>
                        </div>
                        <div class="tool-share">
                            <div class="tool-share-title">快分享给好友帮忙砍价吧</div>
                            <div class="tool-weixin-btns">
                                <div @click="inviteBtnClick(1)">
                                    <img src="@static/images/icons/weixin.png">
                                    <div>微信</div>
                                </div>
                                <div @click="inviteBtnClick(2)">
                                    <img src="@static/images/icons/wxtimeline.png">
                                    <div>朋友圈</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </mt-popup>
        <!-- 使用道具砍价成功提醒弹窗 -->
        <mt-popup v-model="showToolBargainSuccess" zIndex="990">
            <div>
                <div class="popup-clearbtn">
                    <img src="@static/images/icons/clear.png" @click="showToolBargainSuccess = false">
                </div>
                <div class="tool-popup">
                    <img class="tool-title" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389705133794812669.png">
                    <img class="tool-bg" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389703744826393859.png">
                    <img class="tool-bg-left" src="@static/images/201809/bargainshare/toolpopup/bg-left.png">
                    <img class="tool-bg-right" src="@static/images/201809/bargainshare/toolpopup/bg-right.png">
                    <div class="tool-content">
                        <div class="tool-tip">
                            <div>使用宝刀成功砍了<span>{{cutMoney}}</span>元</div>
                            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389704590506522240.png">
                        </div>
                        <div class="tool-share">
                            <div class="tool-share-title">快分享给好友帮忙砍价吧</div>
                            <div class="tool-weixin-btns">
                                <div @click="openshare(1)">
                                    <img src="@static/images/icons/weixin.png">
                                    <div>微信</div>
                                </div>
                                <div @click="openshare(2)">
                                    <img src="@static/images/icons/wxtimeline.png">
                                    <div>朋友圈</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </mt-popup>
        <!-- 砍价成功提醒弹窗 -->
        <mt-popup v-model="showBargainSuccess" zIndex="990">
            <div>
                <div class="popup-clearbtn">
                    <img src="@static/images/icons/clear.png" @click="showBargainSuccess = false">
                </div>
                <div class="tool-popup">
                    <img class="tool-title" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389704803567216922.png">
                    <img class="tool-bg" src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389703744826393859.png">
                    <img class="tool-bg-left" src="@static/images/201809/bargainshare/toolpopup/bg-left.png">
                    <img class="tool-bg-right" src="@static/images/201809/bargainshare/toolpopup/bg-right.png">
                    <div class="tool-content">
                        <div class="tool-tip">
                            <div>成功帮我砍掉<span>{{cutMoney}}</span>元</div>
                            <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389704245669182738.png">
                            <div v-if="isNewUser == 1">--送你<span style="color:#D0021B">100</span>元萌宠大礼包--</div>
                        </div>
                        <div class="tool-btn" @click="downloadApp">
                            <div v-if="isNewUser == 0" class="global-btn w433">我也要免费拿</div>
                            <div v-if="isNewUser == 1" class="global-btn w433">点击下载APP立即查看</div>
                        </div>
                    </div>
                </div>
            </div>
        </mt-popup>
        <!-- 达到上限提示弹窗 -->
        <mt-popup v-model="showUpperLimitTip" zIndex="990">
            <div>
                <div class="popup-clearbtn" @click="showUpperLimitTip = false">
                    <img src="@static/images/icons/clear.png">
                </div>
                <div class="popuptip-popup">
                    <div class="popuptip-title">
                        <img src="@static/images/icons/dogsad.png">
                        <div>今日砍价次数已达上限~</div>
                    </div>
                    <div class="popuptip-btn"  @click="downloadApp">
                        <div class="global-btn w433">我也要免费拿</div>
                    </div>
                </div>
            </div>
        </mt-popup>
        <!-- 分享引导提醒弹窗 -->
        <mt-popup v-model="showShareGuide" position="top" popupTransition="popup-fade" zIndex="990">
            <div class="share-popup">
                <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15389703131309274818.png">
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { loadShareCopy, addShareNum, loadBargainUserTask, newBargainUserTask, bargain } from '@/api/201809/bargainshare'
import { recommendedForYou, info, ticket, addActivityLog, getUserInviteCode, isBindOpenId } from '@/api'
import { Loading } from 'vux'
import rule from '@/components/201809/rule'
import getParams from '@/utils/urlparams'
import useragent from '@/utils/useragent'
import togoodsdetail from '@/utils/hooks/togoodsdetail'
import sharepopup from '@/utils/hooks/sharepopup'
import openshare from '@/utils/hooks/openshare'
import tocoupon from '@/utils/hooks/tocoupon'
import wxshare from '@/utils/weixin/wxshare'
import wxcode from '@/utils/weixin/wxcode'

const downloadApp = config.downloadApp
const userAvatar = config.userAvatar
const toolAvatar = config.toolAvatar
const bargainShareUrl = config.bargainShareUrl
const bargainUrl = config.bargainUrl
const refresh = config.refresh
const inviteUrl = config.inviteUrl
const inviteShareUrl = config.inviteShareUrl
// const invitePicApp = config.invitePicApp
// const invitePicWeixin = config.invitePicWeixin
const inviteActivityId = config.inviteActivityId
const inviteCellPhone = config.inviteCellPhone
const inviteSystem = config.inviteSystem
const inviteImei = config.inviteImei

const weixin = useragent.weixin
const params = getParams()
params.cellPhone = params.cellPhone || ''
params.system = params.system || ''
params.imei = params.imei || ''
// params.addressId = params.addressId || 0
window.bargainTaskId = params.bargainTaskId || ''

export default {
    name: 'index',
    data () {
        return {
            invitePicApp: '',
            invitePicWeixin: '',
            invitePic: [],
            weixin,
            // loading
            loading: weixin,
            // 用户微信信息
            openid: '',
            nickname: '',
            headimgurl: '',
            // 分享标题
            shareTitle: '',
            cutMoney: '',
            bargainedTip: '',
            taskId: '',
            // 滚动监听
            page: 1,
            disable: false,
            scrollLock: false,
            fetchLock: false,
            // 默认用户头像
            userAvatar,
            // 按钮状态
            btnState: '',
            // 调详情接口计数
            loadBargainUserTaskCount: 0,
            // 弹窗开关
            showRule: false,
            showToolConfirm: false,
            showToolBargainSuccess: false,
            showBargainSuccess: false,
            showShareGuide: false,
            showUpperLimitTip: false,
            // 过滤后的数据
            countdown: 0,
            countDownTip: '',
            todayBargainNum: 0,
            bargainPrice: 0,
            activityInfo: {
                activityRule: ''
            },
            userData: {
                avatar: '',
                name: '',
                tip: ''
            },
            taskInfo: {
                pic: '',
                sharePic: '',
                price: '',
                quota: '',
                name: '',
                secondLevelType: ''
            },
            bargainTask: {
                isProp: 0,
                completeProportion: 0,
                // '':未发起 1:进行中 2:成功 3:活动已过期 4:任务已过期 5:已抢光
                state: '',
                type: '',
                extentParam: {},
                completePrice: 0,
                noCompletePrice: 0,
                infoScheduleTip: '',
                infoTipText: ''
            },
            // 用于区分用户发起过的砍价任务的id，对应列表接口中的userTaskId
            bargainTaskId: params.bargainTaskId || '',
            // 商品邮寄地址id
            addressId: params.addressId || 0,
            prop: {
                id: '',
                name: '宝刀',
                state: 0,
                userId: ''
            },
            bargainLogs: [],
            recommandedData: [],
            petId: '',
            serviceId: '',
            loadSuccess: false,
            rightWeixincode: false,
            // 用于区分微信/app中是推荐还是广告位
            bannershow: false,
            isNewUser: 0,
            userId: 0,
            shareDesc: ''
        };
    },
    beforeCreate () {
        // 异常处理
        if (!params.cellPhone) {
            Toast('url不正确')
            setTimeout(downloadApp, 1000)
        }
    },
    created () {
        if (weixin) {
            // 微信内 获取code 获取openid 获取微信昵称，头像
            // 微信回调链接

            // 如果登录跳转过来，需要自动发起砍价
            let islogin = this.$route.params.islogin || false;
            this.userId = this.$route.params.userId || 0;
            this.isNewUser = this.$route.params.isNewUser || 0;
            if (islogin) {
                params.islogin = 1;
                params.userId = this.userId;
                params.isNewUser = this.isNewUser;
                // 如果登录跳转过来，需要自动发起砍价
                this.bargain();
                return;
            }

            const redirectUri = this.getFullUrl(bargainShareUrl)
            // 获取code
            const weixincode = params.code
            if (weixincode) {
                // 获取openid
                ticket(weixincode).then(res => {
                    if (res.data.openid) {
                        // 拿到openid
                        this.openid = res.data.openid
                        window.openid = this.openid;
                        this.rightWeixincode = true
                        // 获取详情
                        this.loadBargainUserTask(() => {
                            this.loading = false
                            if (this.bargainTask.type == '2') {
                                this.shareDesc = config.shareDesc1
                            } else if (this.bargainTask.type == '4') {
                                this.shareDesc = config.shareDesc2
                            } else {
                                this.shareDesc = config.shareDesc
                            }
                            // 获取分享标题 设置分享
                            this.loadShareCopy((res) => {
                                wxshare({
                                    title: res,
                                    desc: this.shareDesc,
                                    link: this.getFullUrl(bargainShareUrl),
                                    imgUrl: this.taskInfo.sharePic,
                                    success: (res) => {
                                        // 分享成功 计数
                                        addShareNum({
                                            cellPhone: params.cellPhone,
                                            system: params.system,
                                            imei: params.imei,
                                            activityId: params.activityId,
                                            taskId: params.taskId,
                                            bargainTaskId: this.bargainTaskId,
                                            openId: this.openid
                                        })
                                    }
                                })
                            })
                        })
                        // 砍价页统计（微信）
                        this.addActivityLog()
                        return info(res.data.openid, res.data.access_token)
                    }
                }).then(res => {
                    if (res.data.nickname) {
                        this.nickname = res.data.nickname;
                        window.nickname = this.nickname;
                    }
                    if (res.data.headimgurl) {
                        this.headimgurl = res.data.headimgurl;
                        window.headimgurl = this.headimgurl;
                    }
                }).catch(err => {
                    console.warn(err)
                    if (err.msg) Toast(err.msg)
                }).finally(() => {
                    if (!this.rightWeixincode) {
                        // 重新获取code
                        wxcode(redirectUri)
                    }
                })
            } else {
                wxcode(redirectUri)
            }
            this.bannershow = true
        } else {
            // 客户端内 直接获取详情
            this.loadBargainUserTask(() => {
                // 获取分享标题
                if (this.taskInfo.secondLevelType == '2') {
                    this.shareDesc = config.shareDesc1
                } else if (this.taskInfo.secondLevelType == '4') {
                    this.shareDesc = config.shareDesc2
                } else {
                    this.shareDesc = config.shareDesc
                }
                this.loadShareCopy()
            })
            // 砍价页统计（客户端内）
            this.addActivityLog()
            this.bannershow = false
            // 获取商城推荐
            this.recommendedForYou()
        }
        // // 获取商城推荐
        // this.recommendedForYou()
        // 监听滚动
        window.addEventListener('scroll', () => {
            // 截流
            if (this.disable || this.scrollLock) return
            this.scrollLock = true
            setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                const clientHeight = document.body.clientHeight
                const scrollHeight = document.body.scrollHeight
                if ((scrollTop + clientHeight) > (scrollHeight - 50)) {
                    // 滚动到底部 (滚动距离+可视高度 > 文档高度 - 50) 提前50px加载
                    if (this.fetchLock) return
                    this.fetchLock = true
                    this.page++
                    this.recommendedForYou()
                }
                this.scrollLock = false
            }, 200)
        })
    },
    methods: {
        goInvitePage () {
            if (weixin) {
                // 微信中跳邀请有礼分享页
                // 生成用户邀请码
                getUserInviteCode({
                    cellPhone: inviteCellPhone,
                    system: inviteSystem,
                    imei: inviteImei,
                    activityId: inviteActivityId
                }).then(res => {
                    window.location.href = `${inviteShareUrl}?cellPhone=${inviteCellPhone}&system=${inviteSystem}&imei=${inviteImei}&activityId=${inviteActivityId}&inviteCode201806=${res.data.inviteCode}&t=${config.refresh}`
                }).catch(err => {
                    if (err.status) Toast(err.status)
                })
            } else {
                // 客户端中跳邀请有礼发起页
                window.location.href = `${inviteUrl}?cellPhone=${params.cellPhone}&system=${params.system}&imei=${params.imei}&activityId=${inviteActivityId}&t=${config.refresh}`
            }
        },
        addActivityLog () {
            // 砍价页统计
            addActivityLog({
                cellPhone: params.cellPhone,
                system: params.system,
                imei: params.imei,
                type: 2,
                activityInfoId: params.activityId,
                // 任务id，列表传0
                shareActivityId: params.taskId,
                // 用来区分页面或按钮 0页面 1按钮
                taskId: 0,
                // 1列表页 2任务详情页 3砍价页
                pageType: 3
            })
        },
        loadBargainUserTask (callback) {
            // 获取活动，任务，用户，记录，道具等详情
            // 记录调用详情接口次数
            this.loadBargainUserTaskCount++
            let data = {
                cellPhone: params.cellPhone,
                imei: params.imei,
                system: params.system,
                activityId: params.activityId,
                taskId: params.taskId
            }
            if (weixin) data.openId = this.openid
            if (this.bargainTaskId) data.bargainTaskId = this.bargainTaskId

            loadBargainUserTask(data).then(res => {
                this.loading = false
                // 过滤数据
                this.filterDetail(res.data)
                // 设置提示文案
                this.setStateTip()
                // 设置按钮状态
                this.setBtnState()
                // 执行回调
                if (callback) callback()
                // 请求完成标记
                this.loadSuccess = true
            }).catch(err => {
                console.warn(err)
                if (err.msg) Toast(err.msg)
            })
        },
        recommendedForYou () {
            // 获取商城推荐
            recommendedForYou({
                cellPhone: params.cellPhone,
                imei: params.imei,
                system: params.system,
                type: 0,
                page: this.page
            }).then(res => {
                if (res.data && res.data.commodityList) {
                    for (let item of res.data.commodityList) {
                        this.recommandedData.push(item)
                    }
                }
                // 没数据后禁止请求
                if (!res.data || !res.data.commodityList || !res.data.commodityList.length) this.disable = true
            }).catch(err => {
                console.warn(err)
                if (err.msg) Toast(err.msg)
            }).finally(() => {
                this.fetchLock = false
            })
        },
        loadShareCopy (callback) {
            // 获取分享标题
            if (this.shareTitle) {
                // 已获取过
                if (callback) callback(this.shareTitle)
            } else {
                loadShareCopy({
                    petId: this.petId,
                    serviceId: this.serviceId,
                    taskId: params.taskId
                }).then(res => {
                    if (res.data) {
                        this.shareTitle = res.data
                        if (callback) callback(res.data)
                    } else {
                        throw new Error('缺少分享文案')
                    }
                }).catch(err => {
                    console.warn(err)
                    if (err.msg) Toast(err.msg)
                })
            }
        },
        bargain (propId) {
            // 关闭弹窗
            this.showToolConfirm = false
            // 砍一刀  btnState 2,5

            let data = {
                cellPhone: params.cellPhone,
                imei: params.imei,
                system: params.system,
                activityId: params.activityId,
                taskId: params.taskId,
                userId: params.userId || 0,
                isNewUser: params.isNewUser || 0,
                propId: propId || 0,
                source: params.source || 0,
                addressId: params.addressId || 0
            }
            // 判断是否存在openid
            if (window.openid) {
                data.openId = window.openid
                data.nickName = window.nickname
                data.pic = window.headimgurl
                // 存在则校验是否绑定openid
                isBindOpenId({openId: window.openid})
                    .then(res => {
                        if (res.data.status == 1) {
                            data.userId = res.data.userId
                            bargain(data).then(res => {
                                if (res.data) {
                                    // 获取砍掉的金额
                                    if (res.data.price) this.cutMoney = res.data.price
                                    if (propId) {
                                        this.showToolBargainSuccess = true
                                    } else {
                                        this.showBargainSuccess = true
                                    }
                                    // 发起后获取id
                                    if (res.data.bargainTask && res.data.bargainTask.id) this.bargainTaskId = res.data.bargainTask.id
                                    // 刷新详情
                                    this.loadBargainUserTask()
                                }
                            }).catch(err => {
                                console.warn(err)
                                if (err.msg) Toast(err.msg)
                            })
                        } else {
                            // 否则跳转登录页
                            this.$router.push('login')
                        }
                    })
                    .catch(err => {
                        console.warn(err)
                        if (err.msg) Toast(err.msg)
                    })
                //
            } else {
                // 不校验oppedid  道具砍
                data.userId = this.prop.userId
                bargain(data).then(res => {
                    if (res.data) {
                        // 获取砍掉的金额
                        if (res.data.price) this.cutMoney = res.data.price
                        if (propId) {
                            this.showToolBargainSuccess = true
                        } else {
                            this.showBargainSuccess = true
                        }
                        // 发起后获取id
                        if (res.data.bargainTask && res.data.bargainTask.id) this.bargainTaskId = res.data.bargainTask.id
                        // 刷新详情
                        this.loadBargainUserTask()
                    }
                }).catch(err => {
                    console.warn(err)
                    if (err.msg) Toast(err.msg)
                })
            }
        },
        inviteBtnClick (type) {
            // 点击邀请好友帮砍一刀按钮 btnState 1,2
            if (!this.bargainTask.state && !this.bargainTaskId) {
                // 未发起 调发起接口
                newBargainUserTask({
                    cellPhone: params.cellPhone,
                    imei: params.imei,
                    system: params.system,
                    activityId: params.activityId || '',
                    taskId: params.taskId || '',
                    source: params.source || 0,
                    addressId: params.addressId || 0
                }).then(res => {
                    // 发起后获取id
                    if (res.data && res.data.id) {
                        this.bargainTaskId = res.data.id
                        params.bargainTaskId = this.bargainTaskId
                        if (type) {
                            // 直接分享
                            this.openshare(type)
                        } else {
                            // 获取分享标题 弹分享弹窗
                            this.loadShareCopy((res) => {
                                sharepopup(res, this.shareDesc, this.getFullUrl(bargainShareUrl), this.taskInfo.sharePic)
                            })
                        }
                    }

                    // 刷新详情
                    this.loadBargainUserTask()
                }).catch(err => {
                    console.warn(err)
                    if (err.msg) Toast(err.msg)
                })
            } else {
                // 已发起
                if (type) {
                    // 直接分享
                    this.openshare(type)
                } else {
                    // 获取分享标题 弹分享弹窗
                    this.loadShareCopy((res) => {
                        sharepopup(res, this.shareDesc, this.getFullUrl(bargainShareUrl), this.taskInfo.sharePic)
                    })
                }
            }
        },
        onceAgainClick () {
            // 点击再免一单按钮 btnState 3,4
            window.location.href = this.getFullUrl(bargainUrl)
        },
        filterDetail (data) {
            // 过滤详情返回结果
            data = data || {}
            // activityInfo 活动信息
            if (data.activityInfo) {
                if (data.activityInfo.activityRule) this.activityInfo.activityRule = data.activityInfo.activityRule
                if (data.activityInfo.operationPicApp) this.invitePicApp = data.activityInfo.operationPicApp // app运营位图
                if (data.activityInfo.operationPicWx) this.invitePicWeixin = data.activityInfo.operationPicWx // weixin运营位图
                if (data.activityInfo.operationPic) this.invitePic = (data.activityInfo.operationPic).split(',') // weixin详情图
            }
            // user 用户信息
            if (data.user) {
                if (data.user.avatar) this.userData.avatar = data.user.avatar
                if (data.user.userName) this.userData.name = data.user.userName
            }
            if (data.avatarCopy) this.userData.tip = data.avatarCopy
            // taskInfo 活动任务信息
            if (data.taskInfo) {
                if (data.taskInfo.name) this.taskInfo.name = data.taskInfo.name
                if (data.taskInfo.pic) this.taskInfo.pic = data.taskInfo.pic
                if (data.taskInfo.sharePic) this.taskInfo.sharePic = data.taskInfo.sharePic
                if (data.taskInfo.secondLevelType) this.taskInfo.secondLevelType = data.taskInfo.secondLevelType
                if (data.taskInfo.price) {
                    this.taskInfo.price = data.taskInfo.price
                    // 未完成价格初始化为总价
                    this.bargainTask.noCompletePrice = this.taskInfo.price
                }
                if (data.taskInfo.extendParam && data.taskInfo.extendParam.surplusQuota !== undefined) this.taskInfo.quota = data.taskInfo.extendParam.surplusQuota
                if (data.taskInfo.taskContent) {
                    const taskContent = JSON.parse(data.taskInfo.taskContent)
                    if (taskContent.petId) this.petId = taskContent.petId
                    if (taskContent.serviceId) this.serviceId = taskContent.serviceId
                    // if (taskContent.taskId) this.taskId = taskContent.taskId
                }
            }
            // bargainTask 砍价任务信息
            if (data.bargainTask) {
                // 是否使用过道具
                if (data.bargainTask.isProp) this.bargainTask.isProp = data.bargainTask.isProp
                // 完成进度
                if (data.bargainTask.completeProportion) this.bargainTask.completeProportion = data.bargainTask.completeProportion * 100
                // 1:进行中 2:成功 3:活动已过期 4:任务已过期 5:已抢光
                if (data.bargainTask.state) {
                    this.bargainTask.state = data.bargainTask.state
                }
                if (data.bargainTask.type) {
                    this.bargainTask.type = data.bargainTask.type
                }
                if (data.bargainTask.extendParam) {
                    this.bargainTask.extendParam = data.bargainTask.extendParam
                }
                if (data.bargainTask.taskId) {
                    this.bargainTask.taskId = data.bargainTask.taskId
                }
                // 已砍价格，剩余价格
                if (data.bargainTask.completePrice) {
                    this.bargainTask.completePrice = data.bargainTask.completePrice
                    // 计算实际未完成价格
                    if (this.taskInfo.price) {
                        const price = this.taskInfo.price - data.bargainTask.completePrice
                        // 保留两位
                        this.bargainTask.noCompletePrice = parseInt(price * 100) / 100
                    }
                }
            }
            // prop 道具信息
            if (data.prop) {
                if (data.prop.id) this.prop.id = data.prop.id
                if (data.prop.userId) this.prop.userId = data.prop.userId
                if (data.prop.name) this.prop.name = data.prop.name
                if (data.prop.state) this.prop.state = data.prop.state
            }
            // 今日砍价次数
            if (data.todayBargainNum) this.todayBargainNum = data.todayBargainNum
            // 是否砍过此次任务(此字段值是砍掉的价钱)
            if (data.isBargained && data.isBargained.bargainPrice) this.bargainPrice = data.isBargained.bargainPrice
            // 倒计时
            if (data.countdown) {
                this.countdown = data.countdown
                this.countDownLoop()
            }
            // 砍价记录
            if (data.bargainLogs) {
                let bargainLogs = data.bargainLogs
                let newArr = []
                for (let item of bargainLogs) {
                    newArr.push({
                        avatar: item.bargaiType == 0 ? item.wxPic : toolAvatar,
                        nickname: item.wxNickName,
                        price: item.bargainPrice
                    })
                }
                this.bargainLogs = newArr
            }
        },
        setStateTip () {
            const state = this.bargainTask.state
            // 默认提示
            let infoScheduleTip = '快邀请好友帮忙砍价吧~'
            let infoTipText = ''
            let bargainedTip = ''
            // 提示文案灰色状态
            let greyInfoScheduleTip = `<span class="grey">已砍${this.bargainTask.completePrice}元，还差${this.bargainTask.noCompletePrice}元</span>`
            if (state == 1) {
                // 进行中
                if (this.bargainTask.completeProportion) {
                    // 砍价进度不为0
                    infoScheduleTip = `已砍<span class="red">${this.bargainTask.completePrice}</span>元，还差<span class="red">${this.bargainTask.noCompletePrice}</span>元`
                }
                if (this.bargainPrice) {
                    // 已砍过 提示砍过的价格
                    bargainedTip = `成功帮砍<span>${this.bargainPrice}</span>元`
                }
            } else if (state == 2) {
                // 已成功
                infoScheduleTip = `免单成功`
            } else if (state == 3) {
                // 活动已过期
                infoScheduleTip = greyInfoScheduleTip
                infoTipText = `未在活动期间内完成，已过期`
            } else if (state == 4) {
                // 任务已过期
                infoScheduleTip = greyInfoScheduleTip
                infoTipText = `未在24小时内完成，已过期`
            } else if (state == 5) {
                // 已抢光
                infoScheduleTip = greyInfoScheduleTip
                infoTipText = `小伙伴很厉害，名额已抢光~`
            }
            this.bargainTask.infoScheduleTip = infoScheduleTip
            this.bargainTask.infoTipText = infoTipText
            this.bargainedTip = bargainedTip
        },
        setBtnState () {
            // 设置按钮状态 weixin：微信中 !weixin：客户端中
            const state = this.bargainTask.state
            // 按钮状态
            let btnState = this.btnState
            if (weixin) {
                // 微信中
                if (state == 1) {
                    // 进行中
                    if (this.todayBargainNum == 3) {
                        // 当前openid达到上限
                        btnState = 6
                        // 首次拉取详情，弹出上限提醒
                        if (this.loadBargainUserTaskCount === 1) this.showUpperLimitTip = true
                    } else if (this.bargainPrice) {
                        // 当前openid参与过
                        btnState = 6
                    } else {
                        btnState = 5
                    }
                } else {
                    // 非进行中
                    btnState = 7
                }
            } else {
                // 客户端中
                if (state == '' || state == 1) {
                    // 未发起 或 进行中
                    if (this.prop.id && this.bargainTask.isProp === 0) {
                        // 可用宝刀(有且未用过)
                        btnState = 2
                        // 首次拉取详情，弹出宝刀提醒
                        if (this.loadBargainUserTaskCount === 1) {
                            setTimeout(() => {
                                this.showToolConfirm = true
                            }, 500);
                        }
                    } else {
                        btnState = 1
                    }
                } else if (state == 2) {
                    // 已完成
                    btnState = 3
                } else if (state == 3 || state == 4 || state == 5) {
                    // 活动已过期 任务已过期 已抢光
                    btnState = 4
                }
            }
            this.btnState = btnState
        },
        getFullUrl (url) {
            // 登录信息，活动id，任务id，来源（列表，详情），道具id
            if (url) {
                const cellPhone = params.cellPhone || ''
                const imei = params.imei || ''
                const system = params.system || ''
                const activityId = params.activityId || ''
                const selectedPetId = params.selectedPetId || ''
                const selectedPetName = params.selectedPetName || ''
                const vconsole = params.vconsole || ''
                const taskId = params.taskId || ''
                const bargainTaskId = params.bargainTaskId || ''
                const islogin = params.islogin || ''
                const isNewUser = params.isNewUser || 0
                const userId = params.userId || 0
                return `${url}?cellPhone=${cellPhone}&imei=${imei}&system=${system}&activityId=${activityId}&taskId=${taskId}&selectedPetId=${selectedPetId}&selectedPetName=${selectedPetName}&bargainTaskId=${bargainTaskId}&islogin=${islogin}&isNewUser=${isNewUser}&userId=${userId}&vconsole=${vconsole}&t=${refresh}`
            }
        },
        openshare (type) {
            // 获取分享标题 直接呼起分享
            this.loadShareCopy((res) => {
                openshare(type, res, this.shareDesc, this.getFullUrl(bargainShareUrl), this.taskInfo.sharePic)
            })
        },
        countDownLoop () {
            const speed = 1000
            if (this.countdown > speed && this.bargainTask.state == 1) {
                // 倒计时不小于最小单位且订单状态等于1（进行中） 开启倒计时循环
                setTimeout(() => {
                    this.countdown -= speed
                    this.countDownLoop()
                }, speed)
            } else {
                this.countdown = 0
                // 倒计时结束 更新详情状态
                this.loadBargainUserTask()
            }
            const times = [parseInt(this.countdown / 1000 / 60 / 60), parseInt(this.countdown / 1000 / 60 % 60), parseInt(this.countdown / 1000 % 60)]
            for (let i = 0, len = times.length; i < len; ++i) {
                times[i] = times[i] > 9 ? `${times[i]}` : `0${times[i]}`
            }
            const hour = times[0]
            const minute = times[1]
            const second = times[2]
            // 倒计时提示文案
            this.countDownTip = this.countdown ? `<span>${hour}</span>&nbsp;:&nbsp;<span>${minute}</span>&nbsp;:&nbsp;<span>${second}</span>后过期，加速砍起来~` : ''
        },
        toexpress (id) {
            const expressList = this.bargainTask.extendParam
            window.expressList = expressList
            this.$router.push({
                name: 'express',
                params: {
                    expressid: id
                }
            })
        },
        tocoupon,
        togoodsdetail,
        downloadApp
    },
    components: {
        rule,
        Loading
    },
    mounted () {

    }
};
</script>

<style src="../index.styl" lang="stylus"></style>
