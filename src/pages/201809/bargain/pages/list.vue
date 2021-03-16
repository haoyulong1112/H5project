<template>
  <div class="container">
    <div class="index">
      <!-- 主列表 list -->
      <div v-show="curtab === 0" class="list">
        <!-- rule -->
        <div class="rule" @click="showRule = true">
          <span>活动规则</span>
        </div>
        <!-- banner -->
        <div class="listbanner">
          <img :src="activityBgPic">
        </div>
        <!-- pet -->
        <div class="pet-tool pet" @click="$router.push('petlist')">
          <div>选择宠物</div>
          <div>
            <div v-text="selectedPetName"></div>
            <img src="@static/images/icons/arrow.png">
          </div>
        </div>
        <!-- <button @click="$router.push('login')">登录</button> -->
        <!-- tasklist -->
        <div>
          <div
            :class="{over: item.noUseQuota == 0}"
            class="tasklist-item"
            v-for="(item, index) in bargainList"
            :key="`a${index}`"
            @click="$router.push(`detail/${item.id}`)"
          >
            <div class="item-content">
              <div>
                <img v-lazy="item.pic" :key="item.pic">
                <div v-show="item.noUseQuota == 0">已抢光</div>
              </div>
              <div>
                <div>
                  <div style="-webkit-box-orient: vertical" v-text="item.name"></div>
                </div>
                <div class="tasklist-bottom">
                  <div class="tasklist-title" v-cloak>￥
                    <span class="font-bold" v-text="item.price"></span>
                    <span class="font-red">免单名额:{{item.quota}}</span>
                  </div>
                  <div v-if="item.noUseQuota == 0" class="global-btn grey" @click.stop>已抢光</div>
                  <div v-else class="global-btn" @click.stop="taskItemClick(index)">我要免单</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 我的免单列表 mylist -->
      <div v-show="curtab === 1" class="mylist">
        <!-- tool -->
        <div class="pet-tool tool" @click="$router.push('tool')">
          <div>我的道具</div>
          <div>
            <img src="@static/images/icons/arrow.png">
          </div>
        </div>
        <!-- mytasklist -->
        <div v-if="myTaskList.length" class="mytasklist">
          <div
            class="mytasklist-item"
            v-for="(item, index) in myTaskList"
            :key="`b${index}`"
            @click="toSharePage(item.taskId, item.userTaskId)"
          >
            <div class="item-content">
              <div>
                <img v-lazy="item.pic" :key="item.pic">
                <div v-show="item.stateTipIcon" v-text="item.stateTipIcon"></div>
              </div>
              <div>
                <div :class="{over: item.stateTipIcon}" class="mytasklist-title">
                  <div v-text="item.taskName" style="-webkit-box-orient: vertical"></div>
                </div>
                <div>
                  <div class="mytasklist-statetip" v-html="item.stateTip"></div>
                </div>
              </div>
            </div>
            <div class="mytasklist-bottom">
              <div>
                <div>
                  <!-- 进行中，且有返回毫秒数，显示倒计时并监听倒计时结束，结束后刷新我的免单列表 -->
                  <countdown
                    v-if="item.state == 1 && item.countDown"
                    :milliseconds="item.countDown"
                    @over="getMyTaskList"
                  ></countdown>
                </div>
                <div class="mytasklist-btn">
                  <div
                    v-if="item.state == 1"
                    class="global-btn"
                    @click.stop="inviteClick(index)"
                  >邀请好友</div>
                  <div
                    v-if="item.state == 2 && item.type !==4" class="global-btn w200"
                    @click.stop="tocoupon"
                  >查看优惠券</div>
                  <div
                    v-if="item.state == 2 && item.type == 4 && item.logistics.deliveryStatus === '已发货' " class="global-btn"  @click.stop="toexpress(item.userTaskId)"
                  >查看物流</div>
                  <div
                    v-if="item.state == 2 && item.type == 4 && item.logistics.deliveryStatus === '未发货' " class="global-btn grey"  style="width:1.8rem"
                  @click.stop="">待发货</div>
                  <div v-if="item.state > 1" class="global-btn" @click.stop="setCurtab(0)">再免一单</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty">
          <img src="@static/images/icons/dogsad.png">
          <div>您目前没有砍价任务哦~</div>
        </div>
      </div>
      <!-- tab -->
      <div class="tab" v-cloak>
        <div class="tab-item" :class="{active: curtab === 0}" @click="setCurtab(0)">
          <div>免单列表</div>
        </div>
        <div class="tab-item" :class="{active: curtab === 1}" @click="setCurtab(1)">
          <div>我的免单</div>
        </div>
      </div>
    </div>
    <!-- 规则弹窗组件 -->
    <rule v-model="showRule" :text="activityRule"></rule>
    <!-- 正在砍价确认弹窗 -->
    <mt-popup v-model="showConfirm" zIndex="990">
      <div>
        <div class="join-clearbtn" @click="showConfirm = false">
          <img src="@static/images/icons/clear.png">
        </div>
        <div class="join-popup">
          <div class="join-title">
            <img src="@static/images/icons/dogsad.png">
            <div>该免单正在砍价中~</div>
          </div>
          <div class="join-btn" @click="toSharePage(clickedTaskId, clickedUserTaskId)">
            <div class="global-btn w433 h68">继续砍价</div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { loadShareCopy } from '@/api/201809/bargainshare';
import { addActivityLog } from '@/api';
import rule from '@/components/201809/rule';
import countdown from '@/components/201809/countdown';
import tologin from '@/utils/hooks/tologin'
import sharepopup from '@/utils/hooks/sharepopup';
import toclient from '@/utils/hooks/toclient';
import tocoupon from '@/utils/hooks/tocoupon';
import { MessageBox } from 'mint-ui';
// import getParams from '@/utils/urlparams';

// const params = getParams()
// const shareDesc = config.shareDesc;

export default {
    name: 'list',
    data () {
        return {
            showRule: false,
            showConfirm: false,
            // 任务id
            clickedTaskId: '',
            // 当前用户发起过任务的id
            clickedUserTaskId: '',
            // 滚动监听
            page: 1,
            scrollLock: false,
            expressId: window.expressId,
            bargainTaskId: '',
            shareDesc: ''
        };
    },

    computed: {
        ...mapState([
            'cellPhone',
            'imei',
            'system',
            'activityRule',
            'activityBgPic',
            'curtab',
            'bargainList',
            'myTaskList',
            'activityId',
            'selectedPetId',
            'selectedPetName',
            'fetchLock',
            'listpage'
        ]),
        ...mapGetters(['getUrl'])
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
        // 列表页统计
        addActivityLog({
            cellPhone: this.cellPhone,
            system: this.system,
            imei: this.imei,
            type: 2,
            activityInfoId: this.activityId,
            // 任务id，列表传0
            shareActivityId: 0,
            // 用来区分页面或按钮 0页面 1按钮
            taskId: 0,
            // 1列表页 2任务详情页 3砍价页
            pageType: 1
        });

        // 监听滚动
        window.addEventListener('scroll', () => {
            // 截流
            if (this.scrollLock) return;
            this.scrollLock = true;
            setTimeout(() => {
                const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
                const clientHeight = document.body.clientHeight;
                const scrollHeight = document.body.scrollHeight;
                if (scrollTop + clientHeight > scrollHeight - 50) {
                    // 滚动到底部 (滚动距离+可视高度 > 文档高度 - 50) 提前50px加载
                    if (this.fetchLock) return;
                    this.setFetchLock(true);
                    this.updateListpage();
                    this.getBargainList();
                }
                this.scrollLock = false;
            }, 200);
        });

        // 将方法绑定到window下面，提供给外部调用
        window['goSharePage'] = (a, b, c) => {
            this.toSharePage(a, b, c)
        }
    },

    methods: {
        sharepopup,
        tocoupon,
        ...mapMutations(['setCurtab', 'setFetchLock', 'updateListpage']),
        ...mapActions(['getMyTaskList', 'getBargainList']),
        inviteClick (index) {
            // 点击邀请好友
            const item = this.myTaskList[index];
            if (item.type == '2') {
                this.shareDesc = config.shareDesc1
            } else if (item.type == '4') {
                this.shareDesc = config.shareDesc2
            } else {
                this.shareDesc = config.shareDesc
            }
            this.bargainTaskId = item.userTaskId
            this.expressId = item.taskId
            // 获取分享标题
            loadShareCopy({
                petId: item.taskContent.petId,
                serviceId: item.taskContent.serviceId,
                taskId: item.taskId
            })
                .then(res => {
                    if (res.data) {
                    // 弹出分享
                        sharepopup(
                            res.data,
                            this.shareDesc,
                            this.getUrl({
                                taskId: item.taskId,
                                bargainTaskId: item.userTaskId
                            }),
                            item.pic
                        );
                    } else {
                        throw new Error('缺少分享文案');
                    }
                })
                .catch(err => {
                    console.warn(err);
                    if (err.msg) Toast(err.msg);
                });
        },

        taskItemClick (index) {
            // 点击我要免单按钮
            // return
            const taskInfo = this.bargainList[index];
            window.taskId = taskInfo.id;
            // return;
            // 列表页按钮统计
            addActivityLog({
                cellPhone: this.cellPhone,
                system: this.system,
                imei: this.imei,
                type: 2,
                activityInfoId: this.activityId,
                // 任务id，列表传0
                shareActivityId: taskInfo.id,
                // 用来区分页面或按钮 0页面 1按钮
                taskId: 1,
                // 1列表页 2任务详情页 3砍价页
                pageType: 1
            });
            if (this.cellPhone) {
                // 已登录
                if (taskInfo.joinState) {
                    // 此任务进行中提示
                    this.clickedTaskId = taskInfo.id;
                    this.clickedUserTaskId = taskInfo.userTaskId;
                    this.serviceId = taskInfo.taskContent.serviceId;
                    this.clickedPetId = taskInfo.taskContent.petId;
                    this.showConfirm = true;
                } else {
                    // 判断当前砍价类型是不是商品
                    if (taskInfo.secondLevelType == '4') {
                        // 发起 不带 bargainTaskId
                        // 调用客户端的选择地址
                        toclient();
                    } else {
                        // 调用发起页方法
                        this.toSharePage(taskInfo.id)
                    }
                }
            } else {
                tologin()
            }
        },
        toSharePage (taskId, bargainTaskId, addressId) {
            // 去发起页（砍价状态页）
            window.location.href = this.getUrl({
                taskId: taskId,
                bargainTaskId: bargainTaskId,
                addressId: addressId || 0
            });
        },
        toexpress (id) {
            const expressList = this.myTaskList
            window.expressList = expressList
            this.$router.push({
                name: 'express',
                params: {
                    id: id
                }
            })
        }
    },

    components: {
    // 规则弹窗组件
        rule,
        // 倒计时组件
        countdown
    }
};
</script>
<style src="../style/list.styl" lang="stylus" scoped></style>
