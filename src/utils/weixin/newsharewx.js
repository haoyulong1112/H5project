import { sign } from '@/api/index'
import wx from 'weixin-js-sdk'
var dqUrl = location.href;

export default (data) => {
    var linkUrl = data.link;// 没有设置分享页面链接的时候，直接分享当前页面
    console.log('linkUrl', linkUrl);
    console.log('dqUrl', dqUrl);
    sign({url: dqUrl}).then(res => {
        wx.config({
            debug: false,
            appId: res.data.appId, // 必填，appID公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ']
        });
        wx.ready(function () {
            var shareData = {
                title: data.title, // 分享标题
                desc: data.desc,
                link: linkUrl,
                imgUrl: data.imgUrl || config.shareImg, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: function (ret) {
                    console.log(ret);
                },
                cancel: function (err) {
                    console.log(err);
                }
            }
            console.log(shareData);
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.error((err) => {
                console.log(err)
            })
        });
    })
}
