webpackJsonp([1],{"0VS3":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("34+y");var n=i("X+yh"),a=i.n(n),o=i("/5sW"),s=i("NC6I"),c=i.n(s),r=(Boolean,String,String,String,{name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(t){this.$emit("update:show",t)}}}),l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:t.transition}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading",class:t.text?"":"vux-loading-no-text"},[i("div",{staticClass:"weui-mask_transparent"}),t._v(" "),i("div",{staticClass:"weui-toast",style:{position:t.position}},[i("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),t.text?i("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2):t._e()])])])},staticRenderFns:[]};var d=i("VU/8")(r,l,!1,function(t){i("ErAa")},null,null).exports,u=i("Xxa5"),v=i.n(u),h=i("exGp"),p=i.n(h),f=i("//Fk"),g=i.n(f),m=i("fxnj"),w=i.n(m),y=i("pFYg"),C=i.n(y),x=i("fZjL"),_=i.n(x),b=[],I=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new g.a(function(e,i){var n=t.url;if(!t.concurrent){if(n=n.split("?")[0],-1!==b.indexOf(n))return void i(new Error("请求并发 "+n));b.push(n)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},o=t.type?t.type.toUpperCase():"POST",s=t.url||"",c=t.contentType||"application/x-www-form-urlencoded",r=t.data||{},l=!1!==t.async;return new g.a(function(e,i){var n={};n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var a="";_()(r).forEach(function(t){a+=t+"="+r[t]+"&"}),a=a.substr(0,a.lastIndexOf("&")),"GET"==o?(s=a?s+"?"+a:s,n.open(o,s,l),n.setRequestHeader("Content-type",c),n.send()):"POST"==o?(n.open(o,s,l),n.setRequestHeader("Content-type",c),n.send(a)):i(new Error("不支持的type")),n.onreadystatechange=function(){if(4==n.readyState)if(200==n.status){var t=n.response;"object"!==(void 0===t?"undefined":C()(t))&&(t=JSON.parse(t)),e(t)}else i(n)}})})(t).then(function(t){0===t.code?e(t):i(t)}).catch(function(t){i(t)}).finally(function(){var t=b.indexOf(n);-1!==t&&b.splice(t,1)})})},k=envConfig.requestDomain,S=envConfig.manageDomain,T=function(t){return I({url:k+"/pet-api/wx/ticket",data:{code:t}})},D=function(t){return I({url:k+"/pet-api/logcount/addActivityLog",data:t})},P=function(t,e){return I({url:S+"/logcount/add",data:{typeid:t,activeid:e}})},O=(envConfig.requestDomain,envConfig.requestDomain),q=function(t){return I({url:O+"/pet-api/activity/invite/getUserInviteCode",data:t})},U=envConfig.requestDomain,E=function(t){return U+"/pet-api/activity/invite/generateImageCode?mobileKey="+t},A=function(t){return I({url:U+"/pet-api/activity/invite/genVerifyCode",data:t})},j=function(t){return I({url:U+"/pet-api/activity/invite/newUserInvited",data:t})},M=function(t){return I({url:U+"/pet-api/activity/invite/isBindingOpenId",data:{openId:t}})},B=navigator.userAgent,L=(-1<B.indexOf("Android")||B.indexOf("Linux"),-1<B.indexOf("iPhone")||B.indexOf("iPad"),B.indexOf("iPhone"),-1<B.toLowerCase().indexOf("micromessenger")),V=this,F=function(o){if(!L)return!1;var i,t=config.shareImg,s=config.wxShareDebug;return(o=o||{}).title=o.title||"",o.desc=o.desc||"",o.link=o.link||window.location.href,o.imgUrl=o.imgUrl||t,new g.a((i=p()(v.a.mark(function t(i,n){var a;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(e=location.href,I({url:k+"/pet-api/wx/sign",data:{url:encodeURIComponent(e)},type:"get"})).catch(function(){n(new Error("sign error"))});case 2:0!==(a=t.sent).code&&n(new Error("sign code "+a.code+" "+a.msg)),w.a.config({debug:!0===s,appId:a.data.appId,timestamp:a.data.timestamp,nonceStr:a.data.nonceStr,signature:a.data.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareQQ"]}),o.success=function(t){i(t)},o.cancel=function(t){i(t)},w.a.ready(function(){w.a.onMenuShareAppMessage(o),w.a.onMenuShareTimeline(o),w.a.onMenuShareQQ(o)});case 8:case"end":return t.stop()}var e},t,V)})),function(t,e){return i.apply(this,arguments)}))},N=i("BO1k"),X=i.n(N),z=function(){var t=window.location.href.split("?"),e={};if(1<t.length){var i=t[1],n=-1!==i.indexOf("%23/")?i.indexOf("%23/"):i.indexOf("#/");-1!==n&&(i=i.substr(0,n));var a=!0,o=!1,s=void 0;try{for(var c,r=X()(i.split("&"));!(a=(c=r.next()).done);a=!0){var l=c.value.split("=");l[0]&&(e[l[0]]=l[1]||"")}}catch(t){o=!0,s=t}finally{try{!a&&r.return&&r.return()}finally{if(o)throw s}}}return e},R=envConfig.shareAppid,$=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:window.location.href,e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],i=z().code;if(!L||i&&!e)return i;window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+R+"&redirect_uri="+escape(t)+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"},K=(config.inviteShareTitle,config.inviteShareDesc,config.inviteShareImg,config.newinviteShareUrl,config.cellPhoneReg,config.inviteShareTitle),W=config.inviteShareDesc,G=config.inviteShareImg,H=config.newinviteShareUrl,Q=config.cellPhoneReg,J={name:"index",data:function(){return{loading:!0,showXrlb:!1,xrlblist:[],newuser:!0,userName:"",avatar:"",isVip:"",genVerifyCodeFlag:!1,newUserInvitedFlag:!1,mobileKey:"",cellPhone:"",imgcode:"",imgcodeUrl:"",getCodeBtnText:"获取验证码",getCodeBtnClass:"",code:"",typeid:"",activeid:{zc:"",lyh:"",lq:""}}},components:{Loading:d},created:function(){var e=this;this.loading=!0;var t=z();this.typeid=t.typeid,this.activeid.zc=t.zc,this.activeid.lyh=t.lyh,this.activeid.lq=t.lq,P(this.typeid,0).catch(function(t){Toast(t.msg)}),this.inviteData.activityId=t.activityId||"",this.inviteData.inviteCode=t.inviteCode201806||"",this.inviteData.cellPhone=t.cellPhone||"",this.inviteData.system=t.system||"",this.inviteData.imei=t.imei||"",this.inviteData.inviteCode||q({cellPhone:this.inviteData.cellPhone,system:this.inviteData.system,imei:this.inviteData.imei,activityId:this.inviteData.activityId}).then(function(t){e.inviteData.inviteCode=t.data.inviteCode}).catch(function(t){t.status&&Toast(t.status)});var i=H(this.inviteData.inviteCode,this.inviteData.activityId);if(L){var n=$(i);n?(F({title:K(),desc:W,imgUrl:G,link:i}),T(n).then(function(t){return e.inviteData.activityId&&D({activityInfoId:0,shareActivityId:e.inviteData.activityId,taskId:0}),40163===t.data.errcode&&$(i,!0),e.inviteData.openid=t.data.openid||"",M(e.inviteData.openid)}).then(function(t){1===t.data.status&&(e.newuser=!1)}).catch(function(t){t.status&&Toast(t.status)}).finally(function(){e.loading=!1})):$(i,!0)}else this.loading=!1,this.inviteData.activityId&&D({activityInfoId:0,shareActivityId:this.inviteData.activityId,taskId:0})},beforeMount:function(){this.updateCode()},methods:{share:function(){P(this.typeid,this.activeid.lyh).catch(function(t){Toast(t.msg)}),Toast("立即打开APP邀请好友"),setTimeout(function(){window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haotang.pet&g_f=991653"},2e3)},touse:function(){P(this.typeid,this.activeid.lq).catch(function(t){Toast(t.msg)}),window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haotang.pet&g_f=991653"},updateCode:function(){this.mobileKey=""+(new Date).getTime()+parseInt(1e5*(9*Math.random()+1)),this.imgcodeUrl=E(this.mobileKey)},genVerifyCode:function(){var e=this;if(!this.genVerifyCodeFlag){var t={openId:this.inviteData.openid,code:this.imgcode.trim(),phone:this.cellPhone.trim(),mobileKey:this.mobileKey,encryptionCode:c()("haotang_jishubu01"+this.cellPhone.trim())};t.phone?Q.test(t.phone)?t.code?t.code.length<4?Toast("请检查图形验证码"):(this.genVerifyCodeFlag=!0,A(t).then(function(t){e.getCodeBtnClass="grey",e.countBackwards({total:60,callback:function(t){t?e.getCodeBtnText=t+"秒":(e.getCodeBtnClass="",e.getCodeBtnText="重新获取",e.genVerifyCodeFlag=!1)}})}).catch(function(t){t&&(1011===t.code?e.newuser=!1:t.code?Toast(t.msg):Toast(t.status)),e.genVerifyCodeFlag=!1})):Toast("请输入图形验证码"):Toast("请检查手机号"):Toast("请输入手机号")}},countBackwards:function(t){var i=this,n=(t=t||{}).total?t.total:10,a=t.speed?t.speed:1,o=t.time?t.time:1e3,s=t.counted?t.counted:0,c=t.callback?t.callback:0,r=t.callbackOnce?t.callbackOnce:0,l=t.callbackEnd?t.callbackEnd:0,d=0<=n-s?n-s:0,e=setTimeout(function(t){if(0!==d){var e=0<=d-a?d-a:0;s+=a,c&&c(e),r&&r(e),0==e&&l&&l(e),i.countBackwards({total:n,speed:a,time:o,counted:s,callback:c,callbackOnce:r,callbackEnd:l})}else null},o);console.log(e)},newUserInvited:function(){var e=this;if(P(this.typeid,this.activeid.zc).catch(function(t){Toast(t.msg)}),!this.newUserInvitedFlag){var t={code:this.code.trim(),cellPhone:this.cellPhone.trim(),activityId:this.inviteData.activityId,openId:this.inviteData.openid,inviteCode:this.inviteData.inviteCode};t.cellPhone?/^1[0-9]{10}$/.test(t.cellPhone)?t.code?t.code.length<4?Toast("请检查验证码"):(this.newUserInvitedFlag=!0,j(t).then(function(t){e.xrlblist=t.data,e.showXrlb=!0}).catch(function(t){t.status&&Toast(t.status),t.msg&&Toast(t.msg),e.newUserInvitedFlag=!1})):Toast("请输入验证码"):Toast("请检查手机号"):Toast("请输入手机号")}}}},Y={render:function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",{staticClass:"container"},[n("loading",{attrs:{show:i.loading,text:""}}),i._v(" "),i.loading?i._e():n("div",{staticClass:"index"},[i.newuser?n("div",{directives:[{name:"show",rawName:"v-show",value:!i.showXrlb,expression:"!showXrlb"}],staticClass:"newuser"},[i._m(0),i._v(" "),n("div",{staticClass:"newuser-content"},[n("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277681686760352.png"}}),i._v(" "),n("div",{staticClass:"formbox"},[n("div",{staticClass:"newuser-form"},[n("div",{staticClass:"form-cellPhone"},[n("input",{directives:[{name:"model",rawName:"v-model",value:i.cellPhone,expression:"cellPhone"}],attrs:{type:"number",placeholder:"请输入手机号 领取大礼包"},domProps:{value:i.cellPhone},on:{input:function(t){t.target.composing||(i.cellPhone=t.target.value)}}})]),i._v(" "),n("div",{staticClass:"form-imgcode"},[n("input",{directives:[{name:"model",rawName:"v-model",value:i.imgcode,expression:"imgcode"}],attrs:{type:"number",placeholder:"请输入图形验证码"},domProps:{value:i.imgcode},on:{input:function(t){t.target.composing||(i.imgcode=t.target.value)}}}),i._v(" "),n("img",{attrs:{src:i.imgcodeUrl},on:{click:function(t){return t.stopPropagation(),i.updateCode(t)}}})]),i._v(" "),n("div",{staticClass:"form-code"},[n("input",{directives:[{name:"model",rawName:"v-model",value:i.code,expression:"code"}],attrs:{type:"number",placeholder:"请输入验证码"},domProps:{value:i.code},on:{input:function(t){t.target.composing||(i.code=t.target.value)}}}),i._v(" "),n("span",{class:i.getCodeBtnClass,on:{click:function(t){return t.stopPropagation(),i.genVerifyCode(t)}}},[i._v(i._s(i.getCodeBtnText))])])]),i._v(" "),n("div",{staticClass:"newuser-btn",on:{click:i.newUserInvited}},[i._v("\n            立即领取\n          ")])])])]):n("div",{staticClass:"olduser-box"},[n("img",{staticClass:"oldhf",attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277682801308495.png",alt:""}}),i._v(" "),n("div",{staticClass:"olduser"},[n("img",{staticClass:"oldlw",attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277685558666793.png",alt:""}}),i._v(" "),i._m(1),i._v(" "),n("div",{staticClass:"share",on:{click:i.share}},[i._v("邀请好友")])])]),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:i.showXrlb,expression:"showXrlb"}],staticClass:"xrlbbox"},[n("div",{staticClass:"xrlb"},[n("img",{staticClass:"xrlb-title",attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277684354166017.png"}}),i._v(" "),n("div",{staticClass:"coupon-list"},i._l(i.xrlblist,function(t,e){return n("div",{key:e+new Date,staticClass:"coupon-item"},[n("div",[n("span",{staticClass:"coupon-amount"},[n("span",{staticClass:"coupon-icon"},[i._v("￥")]),i._v(i._s(t.amount)+"\n              ")])]),i._v(" "),n("div",[n("span",{staticClass:"coupon-name"},[i._v(i._s(t.couponName))]),i._v(" "),n("span",{staticClass:"coupon-desc"},[i._v(i._s(t.description))])])])})),i._v(" "),n("div",{staticClass:"xrlb-btn",on:{click:i.touse}},[i._v("立即领取")])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"newuser-title"},[e("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646277684354166017.png",alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"oldcontent"},[e("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15646583163711642355.png",alt:""}})])}]};var Z=i("VU/8")(J,Y,!1,function(t){i("NGwh")},null,null).exports,tt=i("cTzj"),et=i.n(tt);i("UoMW");!function(t,e){if((e=e||{}).favicon){var i=[];t.querySelector('link[rel="shortcut icon"]')&&i.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&i.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&i.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var n=!0,a=!1,o=void 0;try{for(var s,c=X()(i);!(n=(s=c.next()).done);n=!0){s.value.setAttribute("href",e.favicon)}}catch(t){a=!0,o=t}finally{try{!n&&c.return&&c.return()}finally{if(a)throw o}}}}(document,config),o.default.use(et.a),window.Toast=a.a;var it=navigator.userAgent;o.default.prototype.inviteData={android:-1<it.indexOf("Android")||-1<it.indexOf("Linux"),ios:-1<it.indexOf("iPhone")||-1<it.indexOf("iPad"),weixin:-1<it.toLowerCase().indexOf("micromessenger"),openid:"",activityId:"",inviteCode:""},new o.default({components:{index:Z},render:function(t){return t(Z)}}).$mount("#app")},"34+y":function(t,e){},ErAa:function(t,e){},NGwh:function(t,e){},UoMW:function(t,e){var i,n,a,o,s,c;i=document,n=window,a=i.documentElement,o=n.config.pageWidth,s="orientationchange"in n?"orientationchange":"resize",c=function(){var t=a.clientWidth;a.style.fontSize=0<o?(t&&t<o?t:o)/7.5+"px":t/7.5+"px"},i.addEventListener&&(n.addEventListener(s,c,!1),i.addEventListener("DOMContentLoaded",c,!1),setTimeout(function(){0===parseInt(i.defaultView.getComputedStyle(a).fontSize)&&c()},3e3))}},["0VS3"]);
//# sourceMappingURL=app.c4ae1f0f8118fbe72d7c.js.map