webpackJsonp([1],{"34+y":function(e,n){},A8xR:function(e,n){},B3fi:function(e,n){},ErAa:function(e,n){},HaDj:function(e,n){},UoMW:function(e,n){var t,o,i,a,s,r;t=document,o=window,i=t.documentElement,a=o.config.pageWidth,s="orientationchange"in o?"orientationchange":"resize",r=function(){var e=i.clientWidth;i.style.fontSize=0<a?(e&&e<a?e:a)/7.5+"px":e/7.5+"px"},t.addEventListener&&(o.addEventListener(s,r,!1),t.addEventListener("DOMContentLoaded",r,!1),setTimeout(function(){0===parseInt(t.defaultView.getComputedStyle(i).fontSize)&&r()},3e3))},ec3h:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});t("34+y");var o=t("X+yh"),i=t.n(o),a=t("/5sW"),s=t("//Fk"),d=t.n(s),r=t("fxnj"),l=t.n(r),c=t("Xxa5"),u=t.n(c),p=t("exGp"),h=t.n(p),f=t("pFYg"),g=t.n(f),v=t("fZjL"),m=t.n(v),w=[],x=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new d.a(function(n,t){var o=e.url;if(!e.concurrent){if(o=o.split("?")[0],-1!==w.indexOf(o))return void t(new Error("请求并发 "+o));w.push(o)}(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},a=e.type?e.type.toUpperCase():"POST",s=e.url||"",r=e.contentType||"application/x-www-form-urlencoded",c=e.data||{},l=!1!==e.async;return new d.a(function(n,t){var o={};o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var i="";m()(c).forEach(function(e){i+=e+"="+c[e]+"&"}),i=i.substr(0,i.lastIndexOf("&")),"GET"==a?(s=i?s+"?"+i:s,o.open(a,s,l),o.setRequestHeader("Content-type",r),o.send()):"POST"==a?(o.open(a,s,l),o.setRequestHeader("Content-type",r),o.send(i)):t(new Error("不支持的type")),o.onreadystatechange=function(){if(4==o.readyState)if(200==o.status){var e=o.response;"object"!==(void 0===e?"undefined":g()(e))&&(e=JSON.parse(e)),n(e)}else t(o)}})})(e).then(function(e){0===e.code?n(e):t(e)}).catch(function(e){t(e)}).finally(function(){var e=w.indexOf(o);-1!==e&&w.splice(e,1)})})},C=envConfig.requestDomain,b=(envConfig.manageDomain,function(e){return x({url:C+"/pet-api/wx/ticket",data:{code:e}})}),y=(envConfig.requestDomain,envConfig.requestDomain,envConfig.requestDomain,navigator.userAgent),_={android:-1<y.indexOf("Android")||-1<y.indexOf("Linux"),ios:-1<y.indexOf("iPhone")||-1<y.indexOf("iPad"),iphone:-1<y.indexOf("iPhone"),weixin:-1<y.toLowerCase().indexOf("micromessenger")},S=this,k=function(i,e){return new d.a(function(n,t){var c,o;(e=e||{}).jsApiList=e.jsApiList||["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"],(i=i||{}).link=i.link||window.location.href,i.imgUrl=i.imgUrl||config.shareImg,(c=e,new d.a((o=h()(u.a.mark(function e(t,o){var i,a,s,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("wxconfig",_),_.weixin){e.next=4;break}return o(new Error("wxconfig 非微信浏览器")),e.abrupt("return");case 4:if(i=(c=c||{}).url||location.href,a=c.signData,s=config.wxShareDebug,a){e.next=13;break}return e.next=11,(n=i,x({url:C+"/pet-api/wx/sign",data:{url:encodeURIComponent(n)},type:"get"})).catch(function(e){o(new Error("sign error "+(e.code||"")+" "+(e.msg||"")))});case 11:r=e.sent,a={appId:r.data.appId,timestamp:r.data.timestamp,nonceStr:r.data.nonceStr,signature:r.data.signature};case 13:a.debug=!0===s,a.jsApiList=c.jsApiList,console.log(a),l.a.config(a),l.a.ready(function(e){console.log("ready"),console.log(e),t(a)}),l.a.error(function(e){console.log("error"),console.log(e),o(e)});case 19:case"end":return e.stop()}var n},e,S)})),function(e,n){return o.apply(this,arguments)}))).then(function(e){l.a.onMenuShareTimeline(i),l.a.onMenuShareAppMessage(i),l.a.onMenuShareQQ(i),l.a.onMenuShareWeibo(i),l.a.onMenuShareQZone(i),n(e)}).catch(function(e){t(e)})})},P={name:"app",data:function(){return{shareTitle:"宠物家（百子湾店）狗狗洗澡0元起，马上领",shareDescribe:"您身边的宠物管家，带来五星级洗护体验。"}},created:function(){var e={};e.title=this.shareTitle,e.desc=this.shareDescribe,k(e),window.curpage=1,window.openid="",window.cellPhone="",window.islogin=0}},T={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var O=t("VU/8")(P,T,!1,function(e){t("A8xR")},null,null).exports,A=t("/ocq"),B=(Boolean,String,String,String,{name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(e){this.$emit("update:show",e)}}}),E={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:e.transition}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading",class:e.text?"":"vux-loading-no-text"},[t("div",{staticClass:"weui-mask_transparent"}),e._v(" "),t("div",{staticClass:"weui-toast",style:{position:e.position}},[t("i",{staticClass:"weui-loading weui-icon_toast"}),e._v(" "),e.text?t("p",{staticClass:"weui-toast__content"},[e._v(e._s(e.text||"加载中")),e._t("default")],2):e._e()])])])},staticRenderFns:[]};var M=t("VU/8")(B,E,!1,function(e){t("ErAa")},null,null).exports,D=envConfig.requestDomain,q=function(e){return x({url:D+"/pet-api/invite/activityIsOpen",data:e})},U=function(e){return x({url:D+"/pet-api/invite/isBindingOpenId",data:e})},j=function(e){return D+"/pet-api/invite/generateImageCode?mobileKey="+e},N=function(e){return x({url:D+"/pet-api/invite/genVerifyCode",data:e})},F=function(e){return x({url:D+"/pet-api/invite/login",data:e})},I=t("BO1k"),L=t.n(I),R=function(){var e=window.location.href.split("?"),n={};if(1<e.length){var t=e[1],o=-1!==t.indexOf("%23/")?t.indexOf("%23/"):t.indexOf("#/");-1!==o&&(t=t.substr(0,o));var i=!0,a=!1,s=void 0;try{for(var r,c=L()(t.split("&"));!(i=(r=c.next()).done);i=!0){var l=r.value.split("=");l[0]&&(n[l[0]]=l[1]||"")}}catch(e){a=!0,s=e}finally{try{!i&&c.return&&c.return()}finally{if(a)throw s}}}return n},$=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:window.location.href,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"snsapi_userinfo",t="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+envConfig.shareAppid+"&redirect_uri="+escape(e)+"&response_type=code&scope="+n+"&state=STATE#wechat_redirect";window.location.href=t,console.log(escape(e)),console.log(t)},W=(config.downloadApp,R(),(new Date).getTime(),envConfig.shareDomain,config.downloadApp),V=R(),H=_.weixin,K=(new Date).getTime(),Q=envConfig.shareDomain+"/static/content/html5/byvue/dist/201812/inviteactivity/index.html",X={name:"index",data:function(){return{loading:!0,curpage:window.curpage,openid:"",cellPhone:window.cellPhone,isNewUser:window.isNewUser,fullurl:"",rightWeixincode:!1,textcontent:""}},created:function(){var t=this;if(this.loading=!0,window.cellPhone)return this.loading=!1,void this.checkPhone(window.cellPhone);1!=window.islogin?(this.fullurl=this.getFullUrl(Q),q().then(function(e){if(1==e.data.isOpen)Toast("活动已结束"),t.returnAllScreen();else if(H){var n=V.code;n?b(n).then(function(e){e.data.openid&&(window.openid=e.data.openid,t.rightWeixincode=!0),window.openid&&U({openId:window.openid}).then(function(e){t.loading=!1,1==e.data.status?0==e.data.isAvailable?(t.cellPhone=e.data.cellPhone,t.checkPhone(t.cellPhone)):t.curpage=2:t.$router.push("login")})}).catch(function(e){console.warn(e),e.msg&&Toast(e.msg)}).finally(function(){t.rightWeixincode||$(t.fullurl)}):$(t.fullurl)}})):this.loading=!1},methods:{getFullUrl:function(e){if(e)return e+"?t="+K},checkPhone:function(e){var n=e.split("");n[2]=n[2]+" ",n[6]=n[6]+" ";var t=n.join("");this.textcontent=t||""},todownload:function(){H&&W()},returnAllScreen:function(){WeixinJSBridge.call("closeWindow")},downloadApp:W},components:{Loading:M}},z={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container"},[e.loading?t("loading"):e._e(),e._v(" "),e.loading?e._e():t("div",{staticClass:"index"},[t("div",{directives:[{name:"show",rawName:"v-show",value:1==e.curpage,expression:"curpage == 1"}],staticClass:"success"},[t("div",{staticClass:"phone",domProps:{textContent:e._s(e.textcontent)}}),e._v(" "),t("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15453684765750278696.png"}}),e._v(" "),t("div",{staticClass:"used",on:{click:e.todownload}})]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:2==e.curpage,expression:"curpage == 2"}],staticClass:"fail"},[t("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15456189343945176993.png"}})])])],1)},staticRenderFns:[]};var J=t("VU/8")(X,z,!1,function(e){t("B3fi")},"data-v-65a37da7",null).exports,Z=t("NC6I"),G=t.n(Z),Y=(config.cellPhoneReg,config.cellPhoneReg),ee={name:"login",props:["placeholders"],beforeMount:function(){this.updateCode()},data:function(){return{mobileKey:"",imgcodeUrl:"",cellPhone:"",imgcode:"",code:"",genVerifyCodeFlag:!1,getCodeBtnText:"获取验证码",getCodeBtnClass:"",btnStatus:!0}},methods:{confirmclicked:function(){this.checkoutNum()&&this.$emit("confirm",{cellPhone:this.cellPhone,code:this.code})},getCode:function(){this.checkoutNum(1)&&this.$emit("getCode",{phone:this.cellPhone,code:this.imgcode,encryptionCode:G()("chongwujia_2018"+this.cellPhone),mobileKey:this.mobileKey})},updateCode:function(){this.mobileKey=""+(new Date).getTime()+parseInt(1e5*(9*Math.random()+1)),this.imgcodeUrl=j(this.mobileKey)},countdown:function(e){var n=this;this.getCodeBtnClass="grey",this.btnStatus=!1,this.countBackwards({total:60,callback:function(e){e?n.getCodeBtnText=e+"秒":(n.getCodeBtnClass="",n.getCodeBtnText="重新获取",n.genVerifyCodeFlag=!1,n.btnStatus=!0)}}),e&&e()},checkoutNum:function(e){if(this.cellPhone)if(Y.test(this.cellPhone))if(this.imgcode)if(this.imgcode.length<4)Toast("请检查图形验证码");else if(this.code||1===e){if(!(this.code.length<4&&1!==e))return!0;Toast("请检查短信验证码")}else Toast("请输入短信验证码");else Toast("请输入图形验证码");else Toast("请检查手机号");else Toast("请输入手机号")},countBackwards:function(e){var n=this,t=(e=e||{}).total?e.total:10,o=e.speed?e.speed:1,i=e.time?e.time:1e3,a=e.counted?e.counted:0,s=e.callback?e.callback:0,r=e.callbackOnce?e.callbackOnce:0,c=e.callbackEnd?e.callbackEnd:0,l=0<=t-a?t-a:0;setTimeout(function(){if(0!==l){var e=0<=l-o?l-o:0;a+=o,s&&s(e),r&&r(e),0==e&&c&&c(e),n.countBackwards({total:t,speed:o,time:i,counted:a,callback:s,callbackOnce:r,callbackEnd:c})}},i)}}},ne={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"login"},[t("div",{staticClass:"user-form"},[t("div",{staticClass:"form-cellPhone"},[t("input",{directives:[{name:"model",rawName:"v-model",value:n.cellPhone,expression:"cellPhone"}],attrs:{type:"number",placeholder:n.placeholders&&n.placeholders[0]||"请输入手机号"},domProps:{value:n.cellPhone},on:{input:function(e){e.target.composing||(n.cellPhone=e.target.value)}}})]),n._v(" "),t("div",{staticClass:"form-imgcode"},[t("input",{directives:[{name:"model",rawName:"v-model",value:n.imgcode,expression:"imgcode"}],attrs:{type:"number",placeholder:n.placeholders&&n.placeholders[1]||"请输入图形验证码"},domProps:{value:n.imgcode},on:{input:function(e){e.target.composing||(n.imgcode=e.target.value)}}}),n._v(" "),t("img",{attrs:{src:n.imgcodeUrl},on:{click:function(e){return e.stopPropagation(),n.updateCode(e)}}})]),n._v(" "),t("div",{staticClass:"form-code"},[t("input",{directives:[{name:"model",rawName:"v-model",value:n.code,expression:"code"}],attrs:{type:"number",placeholder:n.placeholders&&n.placeholders[2]||"请输入验证码"},domProps:{value:n.code},on:{input:function(e){e.target.composing||(n.code=e.target.value)}}}),n._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:!n.btnStatus,expression:"!btnStatus"}],class:n.getCodeBtnClass},[n._v(n._s(n.getCodeBtnText))]),n._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:n.btnStatus,expression:"btnStatus"}],class:n.getCodeBtnClass,on:{click:function(e){return e.stopPropagation(),n.getCode(e)}}},[n._v(n._s(n.getCodeBtnText))])])]),n._v(" "),t("div",{staticClass:"user-btn",on:{click:n.confirmclicked}},[n._t("confirmBtn",[t("div",[n._v("确认")])])],2)])},staticRenderFns:[]};var te=t("VU/8")(ee,ne,!1,function(e){t("HaDj")},"data-v-44dbc080",null).exports,oe={name:"loginpage",data:function(){return{submitFlag:!1,placeholders:["","",""],issubmits:!0,isgetCode:!0}},components:{login:te},beforeMount:function(){},methods:{getCode:function(e){var n=this,t=e;t.openId=window.openid||"",this.isgetCode&&(this.isgetCode=!1,N(t).then(function(e){n.isgetCode=!0,n.$refs.login.countdown()}).catch(function(e){n.isgetCode=!0,14==e.code?(window.curpage=2,window.islogin=1,n.$router.push("index")):15==e.code?(window.curpage=1,window.islogin=1,window.cellPhone=t.phone,n.$router.push("index")):(console.warn(e),e.msg&&Toast(e.msg))}))},submit:function(e){var n=this;e.openId=window.openid||"",this.issubmits&&(this.issubmits=!1,F(e).then(function(e){n.issubmits=!0,window.curpage=1,window.islogin=1,window.cellPhone=e.data.cellPhone,n.$router.push("index")}).catch(function(e){console.warn(e),n.issubmits=!0,e.msg&&Toast(e.msg)}))}}},ie={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container"},[t("div",{staticClass:"loginpage"},[t("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15457094930483277074.png",alt:""}}),e._v(" "),t("login",{ref:"login",attrs:{placeholders:e.placeholders},on:{confirm:e.submit,getCode:e.getCode}},[t("div",{staticClass:"loginbtn",attrs:{slot:"confirmBtn"},slot:"confirmBtn"},[e._v("立即领取")])])],1)])},staticRenderFns:[]};var ae=t("VU/8")(oe,ie,!1,function(e){t("uVFD")},null,null).exports;a.default.use(A.a);var se=new A.a({routes:[{path:"/",redirect:"/index"},{path:"/index",name:"index",component:J},{path:"/login",name:"login",component:ae}]});t("UoMW");!function(e,n){if((n=n||{}).favicon){var t=[];e.querySelector('link[rel="shortcut icon"]')&&t.push(e.querySelector('link[rel="shortcut icon"]')),e.querySelector('link[rel="icon"]')&&t.push(e.querySelector('link[rel="icon"]')),e.querySelector('link[rel="apple-touch-icon-precomposed"]')&&t.push(e.querySelector('link[rel="apple-touch-icon-precomposed"]'));var o=!0,i=!1,a=void 0;try{for(var s,r=L()(t);!(o=(s=r.next()).done);o=!0){s.value.setAttribute("href",n.favicon)}}catch(e){i=!0,a=e}finally{try{!o&&r.return&&r.return()}finally{if(i)throw a}}}}(document,config),window.Toast=i.a,new a.default({router:se,components:{App:O},render:function(e){return e(O)}}).$mount("#app")},uVFD:function(e,n){}},["ec3h"]);
//# sourceMappingURL=app.2648b658f19678038905.js.map