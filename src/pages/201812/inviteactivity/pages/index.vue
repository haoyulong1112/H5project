<template>
    <div class="container">
        <!-- loading -->
        <loading v-if="loading"></loading>
        <div v-if="!loading" class="index" v-cloak>
            <div v-show="curpage == 1" class="success">
                <div class="phone" v-text="textcontent"></div>
                <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15453684765750278696.png" />
                <div class="used" @click="todownload"></div>
            </div>
            <div v-show="curpage == 2" class="fail">
                <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15456189343945176993.png" />
            </div>
        </div>
    </div>
</template>
<script>
import { Loading } from 'vux'
import { activityIsOpen, newIsBindingOpenId } from '@/api/201812/inviteactivity'
import getParams from '@/utils/urlparams';
import { ticket } from '@/api'
import wxcode from '@/utils/weixin/wxcode'
import useragent from '@/utils/useragent'
const downloadApp = config.downloadApp
const params = getParams()
const weixin = useragent.weixin
const refresh = new Date().getTime()
const curUrl = envConfig.shareDomain + '/static/content/html5/byvue/dist/201812/inviteactivity/index.html'

export default {
    name: 'index',
    data () {
        return {
            loading: true,
            // 控制当前显示的页面
            curpage: window.curpage,
            openid: '',
            cellPhone: window.cellPhone,
            isNewUser: window.isNewUser,
            fullurl: '',
            rightWeixincode: false,
            textcontent: ''
        };
    },
    created () {
        this.loading = true
        if (window.cellPhone) {
            this.loading = false;
            this.checkPhone(window.cellPhone);
            return;
        }
        if (window.islogin == 1) {
            this.loading = false;
            return;
        }
        this.fullurl = this.getFullUrl(curUrl);
        activityIsOpen().then(res => {
            if (res.data.isOpen == 1) {
                Toast('活动已结束');
                this.returnAllScreen();
            } else {
                if (weixin) {
                    // 微信内 获取code 获取openid 获取微信昵称，头像
                    // 微信回调链接
                    // 获取code
                    const weixincode = params.code;
                    if (weixincode) {
                        // 获取openid
                        ticket(weixincode).then(res => {
                            if (res.data.openid) {
                                // 拿到openid
                                window.openid = res.data.openid
                                this.rightWeixincode = true
                            }
                            if (window.openid) {
                                newIsBindingOpenId({openId: window.openid}).then(res => {
                                    this.loading = false;
                                    if (res.data.status == 1) {
                                        if (res.data.isAvailable == 0) {
                                            this.cellPhone = res.data.cellPhone;
                                            this.checkPhone(this.cellPhone);
                                        } else {
                                            this.curpage = 2;
                                        }
                                    } else {
                                        this.$router.push('login');
                                    }
                                })
                            }
                        }).catch(err => {
                            console.warn(err)
                            if (err.msg) Toast(err.msg)
                        }).finally(() => {
                            if (!this.rightWeixincode) {
                                // 重新获取code
                                wxcode(this.fullurl)
                            }
                        })
                    } else {
                        wxcode(this.fullurl)
                    }
                }
            }
        })
    },
    methods: {
        // 进入微信需要重新加载并获取新的微信链接
        getFullUrl (url) {
            // 登录信息
            if (url) {
                return `${url}?t=${refresh}`
            }
        },
        // 处理手机号使其第三位和第七位后有空格
        checkPhone (phone) {
            var arr1 = phone.split('');
            arr1[2] = arr1[2] + ' ';
            arr1[6] = arr1[6] + ' ';
            var str = arr1.join('');
            this.textcontent = str || '';
        },
        // 跳转app下载页
        todownload () {
            if (weixin) {
                downloadApp();
            }
        },
        returnAllScreen () {
            WeixinJSBridge.call('closeWindow');
        },
        // 下载公共方法
        downloadApp
    },
    components: {
        Loading
    }
};
</script>

<style lang="stylus" src="../style/index.styl" scoped></style>
