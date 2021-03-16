<template>
     <div class="container">
        <div class="index">
            <div class="content">
                <!-- banner -->
                <div class="banner">
                    <div class="banner-box">
                        <swiper :options="swiperOption">
                            <swiper-slide v-for="(item, index) in bannerData" :key="`a${index}`">
                                <img class="banner-swiper-item" :src="item">
                            </swiper-slide>
                            <div v-show="bannerData.length > 1" class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </div>
                </div>
                <!-- title -->
                <div class="title">
                    <div class="title-name" style="-webkit-box-orient: vertical">
                        <div v-text="name"></div>
                    </div>
                    <div class="title-price">
                        <span>￥{{price}}</span>
                        <span>免单名额:{{quota}}</span>
                    </div>
                </div>
                <!-- 服务介绍 -->
                <div class="pet-tool red">
                    <div>
                        <span></span>
                        <span>详情</span>
                    </div>
                </div>
                <!-- 服务介绍详情 -->
                <div class="detail-imgs">
                    <img v-lazy="item" v-for="(item, index) in detailImgsData" :key="`b${index}`">
                </div>
            </div>
            <!-- tab -->
            <div class="tab" v-cloak>
                <div v-if="!(systemInfo.ios && systemInfo.version < '5.0.0') && isshow" class="tab-item" @click="pointbackup(point, backup)">
                    <div>直接下单</div>
                </div>
                <div v-if="flag" class="tab-item" :class="{over: !noUseQuota}" @click="tabItemClick">
                    <div>我要免单</div>
                </div>
                  <div v-else class="tab-item" :class="{over: !noUseQuota}" >
                    <div>我要免单</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { addActivityLog } from '@/api'
import { loadBargainTaskInfoPage } from '@/api/201809/bargain'
import pointbackup from '@/utils/hooks/pointbackup'
import toclient from '@/utils/hooks/toclient'
import { MessageBox } from 'mint-ui'
import tologin from '@/utils/hooks/tologin'
import systemInfo from '@/utils/system'
const downloadApp = config.downloadApp

export default {
    name: 'detail',
    props: ['id'],
    data () {
        return {
            isshow: true,
            swiperOption: {
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    bulletClass: 'swiper-pagination-bullet'
                }
            },
            bannerData: [],
            detailImgsData: [],
            name: '',
            price: 0,
            quota: 0,
            noUseQuota: 0,
            serviceId: '',
            petId: '',
            userTaskId: '',
            point: '',
            backup: '',
            systemInfo,
            flag: true
        };
    },
    computed: {
        ...mapState(['cellPhone', 'system', 'imei', 'activityId']),
        ...mapGetters(['getUrl'])
    },
    async created () {
        try {
            const res = await loadBargainTaskInfoPage({
                cellPhone: this.cellPhone,
                system: this.system,
                imei: this.imei,
                activityId: this.activityId,
                taskId: this.id
            })
            window.res = res;
            if (res.data) {
                this.filterDetail(res.data)
                if (res.data.secondLevelType == 3 || res.data.secondLevelType == 4 || res.data.secondLevelType == 2) {
                    this.isshow = false
                } else if (res.data.secondLevelType == 1) {
                    this.isshow = true
                };
            } else {
                throw new Error(res)
            };
            if (res.data.noUseQuota == 0) {
                this.flag = false
            } else {
                this.flag = true
            }
        } catch (err) {
            console.warn(err)
        }
    },
    mounted () {
        // 客户端回调传入地址信息
        window.setMallAddress = function (id, name, cellpone, addr) {
            let str = name + '  ' + cellpone + '  ' + addr;
            MessageBox.confirm(str, '请确认您的收货地址')
                .then(action => {
                    if (action == 'confirm') { // 确认的回调
                        goSharePage(window.taskId, '', id);
                    }
                })
                .catch(err => { // 取消的回调
                    if (err == 'cancel') {
                        toclient();
                    }
                });
        };

        // 详情页统计
        addActivityLog({
            cellPhone: this.cellPhone,
            system: this.system,
            imei: this.imei,
            type: 2,
            activityInfoId: this.activityId,
            // 任务id，列表传0
            shareActivityId: this.id,
            // 用来区分页面或按钮 0页面 1按钮
            taskId: 0,
            // 1列表页 2任务详情页 3砍价页
            pageType: 2
        });

        // 将方法绑定到window下面，提供给外部调用
        window['goSharePage'] = (a, b, c) => {
            this.toSharePage(a, b, c)
        };

        // 把vue组件的methods方法绑定到window
        // window.goSharePage = this.toSharePage;
    },
    methods: {
        downloadApp,
        pointbackup,
        tabItemClick () {
            if (this.noUseQuota) {
                // 详情页按钮统计
                addActivityLog({
                    cellPhone: this.cellPhone,
                    system: this.system,
                    imei: this.imei,
                    type: 2,
                    activityInfoId: this.activityId,
                    // 任务id，列表传0
                    shareActivityId: this.id,
                    // 用来区分页面或按钮 0页面 1按钮
                    taskId: 1,
                    // 1列表页 2任务详情页 3砍价页
                    pageType: 2
                })
            };
            if (this.cellPhone) {
                // 判断当前砍价类型是不是商品
                if (window.res.data.secondLevelType == '4') {
                    toclient();
                } else {
                    //    去发起页（砍价状态页）
                    this.toSharePage(taskInfo.id)
                }
            } else {
                tologin()
            }
        },
        filterDetail (data) {
            // 用户任务id
            if (data.userTaskId) this.userTaskId = data.userTaskId
            // 任务名
            if (data.name) this.name = data.name
            // 任务价格
            if (data.price) this.price = data.price
            // 任务名额
            if (data.quota) this.quota = data.quota
            // 剩余名额
            if (data.noUseQuota) this.noUseQuota = data.noUseQuota
            // banner
            if (data.picList3) this.bannerData = data.picList3
            // detail
            if (data.picList4) this.detailImgsData = data.picList4
            // 任务信息 petId serviceId point backup
            if (data.taskContent) {
                if (data.taskContent.petId) this.petId = data.taskContent.petId
                if (data.taskContent.serviceId) this.serviceId = data.taskContent.serviceId
                if (data.taskContent.point) this.point = data.taskContent.point
                if (data.taskContent.backup) this.backup = data.taskContent.backup
            }
        },
        toSharePage (taskId, bargainTaskId, addressId) {
            // 去发起页（砍价状态页）
            window.location.href = this.getUrl({
                taskId: this.id,
                serviceId: this.serviceId,
                petId: this.petId,
                bargainTaskId: this.userTaskId,
                source: 1,
                addressId: addressId
            });
        }
    }
};

</script>

<style src="../style/detail.styl" lang="stylus" scoped></style>
