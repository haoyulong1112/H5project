webpackJsonp([1],{"/pMc":function(t,e){},"34+y":function(t,e){},UoMW:function(t,e){var i,n,o,a,s,c;i=document,n=window,o=i.documentElement,a=n.config.pageWidth,s="orientationchange"in n?"orientationchange":"resize",c=function(){var t=o.clientWidth;o.style.fontSize=0<a?(t&&t<a?t:a)/7.5+"px":t/7.5+"px"},i.addEventListener&&(n.addEventListener(s,c,!1),i.addEventListener("DOMContentLoaded",c,!1),setTimeout(function(){0===parseInt(i.defaultView.getComputedStyle(o).fontSize)&&c()},3e3))},m3vE:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("34+y");var n=i("X+yh"),o=i.n(n),a=i("/5sW"),s=i("//Fk"),d=i.n(s),c=i("pFYg"),g=i.n(c),r=i("fZjL"),h=i.n(r),l=[],u=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new d.a(function(e,i){var n=t.url;if(!t.concurrent){if(n=n.split("?")[0],-1!==l.indexOf(n))return void i(new Error("请求并发 "+n));l.push(n)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},a=t.type?t.type.toUpperCase():"POST",s=t.url||"",c=t.contentType||"application/x-www-form-urlencoded",r=t.data||{},l=!1!==t.async;return new d.a(function(e,i){var n={};n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var o="";h()(r).forEach(function(t){o+=t+"="+r[t]+"&"}),o=o.substr(0,o.lastIndexOf("&")),"GET"==a?(s=o?s+"?"+o:s,n.open(a,s,l),n.setRequestHeader("Content-type",c),n.send()):"POST"==a?(r.system&&(s=0<s.indexOf("?")?s+"&system="+r.system:s+"?system="+r.system),n.open(a,s,l),n.setRequestHeader("Content-type",c),n.send(o)):i(new Error("不支持的type")),n.onreadystatechange=function(){if(4==n.readyState)if(200==n.status){var t=n.response;"object"!==(void 0===t?"undefined":g()(t))&&(t=JSON.parse(t)),e(t)}else i(n)}})})(t).then(function(t){0===t.code?e(t):i(t)}).catch(function(t){i(t)}).finally(function(){var t=l.indexOf(n);-1!==t&&l.splice(t,1)})})},v=envConfig.requestDomain;console.log(v);var m=function(t){return u({url:v+"/pet-api/activity/bath/state",data:t})},p=function(t){return u({url:v+"/pet-api/activity/bath/join",data:t})},f=function(t){return u({url:v+"/pet-api/activity/seckill/isReceiveReward",data:t})},w=function(t){return u({url:v+"/pet-api/activity/seckill/receiveReward",data:t,type:"get"})},y=function(t){return u({url:v+"/pet-api/logcount/addActivityLog",data:t})},b=i("BO1k"),x=i.n(b),C=function(){var t=window.location.href.split("?"),e={};if(1<t.length){var i=t[1],n=-1!==i.indexOf("%23/")?i.indexOf("%23/"):i.indexOf("#/");-1!==n&&(i=i.substr(0,n));var o=!0,a=!1,s=void 0;try{for(var c,r=x()(i.split("&"));!(o=(c=r.next()).done);o=!0){var l=c.value.split("=");l[0]&&(e[l[0]]=l[1]||"")}}catch(t){a=!0,s=t}finally{try{!o&&r.return&&r.return()}finally{if(a)throw s}}}return e},k=C(),_=[];k.system&&(_=k.system.split("_"));var S,I="android"===_[0],P="ios"===_[0],L=_[1]?""+_[1]:"",A={platform:(S=navigator.userAgent,{android:-1<S.indexOf("Android")||-1<S.indexOf("Linux"),iPhone:-1<S.indexOf("iPhone"),iPad:-1<S.indexOf("iPad")}),language:(navigator.browserLanguage||navigator.language).toLowerCase()},T=function(t,e,i){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:config.shareImg,o=document.querySelector('meta[name="sharetitle"]'),a=document.querySelector('meta[name="description"]'),s=document.querySelector('meta[name="shareimg"]'),c=document.querySelector('meta[name="shareurl"]');o&&a&&s&&c||console.warn("setshareinfoios 缺少标签"),t&&o&&o.setAttribute("content",t),e&&a&&a.setAttribute("content",e),n&&s&&s.setAttribute("content",n),i&&c&&c.setAttribute("content",i)},M=function(t,e,i,n){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:config.shareImg;I?function(t,e,i,n){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:config.shareImg;I?t&&e&&i&&n?window.fromh5data.shareCardInfo(e,o,n,i,t):console.warn("setshareinfoandroid 缺少参数"):console.warn("setshareinfoandroid 不在安卓客户端内")}(t,e,i,n,o):P&&T(e,i,n,o)},D=i("fxnj"),O=i.n(D),q=i("Xxa5"),R=i.n(q),G=i("exGp"),E=i.n(G),j=envConfig.requestDomain,X=(envConfig.manageDomain,envConfig.requestDomain,envConfig.requestDomain,envConfig.requestDomain,navigator.userAgent),N={android:-1<X.indexOf("Android")||-1<X.indexOf("Linux"),ios:-1<X.indexOf("iPhone")||-1<X.indexOf("iPad"),iphone:-1<X.indexOf("iPhone"),weixin:-1<X.toLowerCase().indexOf("micromessenger")},Q=this,U=function(o,t){return new d.a(function(e,i){var r,n;(t=t||{}).jsApiList=t.jsApiList||["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"],(o=o||{}).link=o.link||window.location.href,o.imgUrl=o.imgUrl||config.shareImg,(r=t,new d.a((n=E()(R.a.mark(function t(i,n){var o,a,s,c;return R.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("wxconfig",N),N.weixin){t.next=4;break}return n(new Error("wxconfig 非微信浏览器")),t.abrupt("return");case 4:if(o=(r=r||{}).url||location.href,a=r.signData,s=config.wxShareDebug,a){t.next=13;break}return t.next=11,(e=o,u({url:j+"/pet-api/wx/sign",data:{url:encodeURIComponent(e)},type:"get"})).catch(function(t){n(new Error("sign error "+(t.code||"")+" "+(t.msg||"")))});case 11:c=t.sent,a={appId:c.data.appId,timestamp:c.data.timestamp,nonceStr:c.data.nonceStr,signature:c.data.signature};case 13:a.debug=!0===s,a.jsApiList=r.jsApiList,console.log(a),O.a.config(a),O.a.ready(function(t){console.log("ready"),console.log(t),i(a)}),O.a.error(function(t){console.log("error"),console.log(t),n(t)});case 19:case"end":return t.stop()}var e},t,Q)})),function(t,e){return n.apply(this,arguments)}))).then(function(t){O.a.onMenuShareTimeline(o),O.a.onMenuShareAppMessage(o),O.a.onMenuShareQQ(o),O.a.onMenuShareWeibo(o),O.a.onMenuShareQZone(o),e(t)}).catch(function(t){i(t)})})},W=function(t,e,i,n){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:config.shareImg;I||P?t&&e&&i&&n?"4.9.6"<L?(I&&window.fromh5data.shareCardInfoDidlog(i,o,n,e,t),P&&(T(e,i,n,o),window.location.href="pethome://share_"+t)):function(t,e,i){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:config.shareImg;I||P?t&&e&&i?(I&&(L<"4.9.5"?window.fromh5data.shareCardInfoDidlog(e,n,i,t):L<"5.0.0"?window.fromh5data.shareCardInfoDidlogNoQQ(e,n,i,t):window.fromh5data.shareCardInfoDidlog(e,n,i,t,"1,2")),P&&(T(t,e,i,n),window.location.href="pethome://share")):console.warn("sharepopup 缺少参数"):console.warn("sharepopup 不在客户端内")}(e,i,n,o):console.warn("openshare 缺少参数"):console.warn("openshare 不在客户端内")},V=function(){I&&window.fromh5data.login(),P&&(window.location.href="pethome://login")},B=function(t){var e=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:window.location.href).split("#")[0].split("23%")[0].split("?"),i=e[0],n=e[1]?e[1].split("&"):[],o={},a=!0,s=!1,c=void 0;try{for(var r,l=x()(n);!(a=(r=l.next()).done);a=!0){var d=r.value;o[d.split("=")[0]]=d.split("=")[1]||""}}catch(t){s=!0,c=t}finally{try{!a&&l.return&&l.return()}finally{if(s)throw c}}var g="",h=function(t,e){var i={};for(var n in t)i[n]=t[n];for(var o in e)i[o]=e[o];return i}(o,t);for(var u in h)g+=u+"="+h[u]+"&";return i+(g?"?"+g.substring(0,g.length-1):"")},H=(config.downloadApp,C()),z=(config.imgList,config.dogimg,config.catimg,envConfig.shareDomain,envConfig.shareDomain,H.cellPhone,H.system,H.imei,H.helpactivityid,config.downloadApp),F=N.weixin,Z=C(),J=config.imgList,$=config.dogimg,Y=config.catimg,K=envConfig.shareDomain+"/static/content/html5/byvue/dist/2019/05/spike/index.html",tt=envConfig.shareDomain+"/static/content/html5/byvue/dist/2019/05/newstoreactivity/index.html?cellPhone="+Z.cellPhone+"&system="+Z.system+"&imei="+Z.imei+"&activityId="+Z.helpactivityid+"&cwj_bannershare=1",et={data:function(){return{shareTitle:"宠物家XXX店开业啦，宝贝洗澡美容免单等你来领！",shareDescribe:"宠物洗澡、美容免单数量，先到先得，快带宝贝来变美吧~",fullurl:K,appshareTitle:"快来送%去宠物家XX店，赢40元大红包~",appshareDescribe:"更多宠物洗澡、美容免单机会，先到先得，快带宝贝来变美吧~",appfullurl:tt,canclick0:!0,canclick1:!0,imgshow0:!0,imgshow1:!0,helpactivityStatus:"",playhelpshow:!0,playhelpingshow:!1,playhelpovershow:!1,totalBathValue:"",petName:"",tabIndex:1,imgList:[],dogimg:[],catimg:[]}},created:function(){var i=this;this.imgList=J,this.dogimg=$,this.catimg=Y,"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?O.a.miniProgram.getEnv(function(t){if(t.miniprogram)i.getcouponstate(Z.activityId,Z.taskIds);else{var e={};e.title=i.shareTitle,e.desc=i.shareDescribe,U(e)}}):(alert("不在微信里"),window.init_roll=function(t){var e=B({cellPhone:t});window.location.href=e,Z.cellPhone=t},Z.cellPhone&&(this.getcouponstate(Z.activityId,Z.taskIds),this.gethelpactivityuserState(Z.helpactivityid)),this.activityLog("86","0","0"),M("1,2",this.shareTitle,this.shareDescribe,this.fullurl))},methods:{downloadApp:z,getcouponstate:function(t,e){var n=this,i={imei:Z.imei||"",cellPhone:Z.cellPhone||"",system:Z.system||"",activityId:t,taskIds:e};alert("状态"),f(i).then(function(t){alert("cheng");for(var e=t.data.res,i=0;i<e.length;i++)331==e[i].taskid&&("0"==e[i].isReceive?(n.canclick0=!0,n.imgshow0=!0):"1"==e[i].isReceive&&(n.canclick0=!1,n.imgshow0=!1)),332==e[i].taskid&&("0"==e[i].isReceive?(n.canclick1=!0,n.imgshow1=!0):"1"==e[i].isReceive&&(n.canclick1=!1,n.imgshow1=!1))}).catch(function(t){alert("bai"),t.msg&&Toast(t.msg)})},changeTab:function(t){this.tabIndex=t},goGoods:function(e){var i=this;"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?O.a.miniProgram.getEnv(function(t){t.miniprogram?O.a.miniProgram.navigateTo({url:"/pages/shopdetails/shopdetails?id="+e}):i.downloadApp()}):(alert("不在微信里"),A.platform.android?window.fromh5lucy.goGoodsDetail(e):A.platform.iPhone&&(window.location.href="pethome://goGoodsDetail_"+e))},getcoupon:function(t,e,i){var n=this;alert("领券"),console.log(t),console.log(e),console.log(i);var o={imei:Z.imei||"",cellPhone:Z.cellPhone||"",system:Z.system||"",activityId:t,taskId:e};"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?O.a.miniProgram.getEnv(function(t){t.miniprogram?Z.cellPhone?(alert("点击事件触发领取接口"),n.getReceiveReward(o,i)):O.a.miniProgram.navigateTo({url:"/pages/loginstyle/loginstyle?source=goods"}):n.downloadApp()}):Z.cellPhone?this.getReceiveReward(o,i):V(),this.activityLog(t,e,"1")},getReceiveReward:function(t,i){var n=this;console.log(t),console.log(i),alert("进来了"),this["canclick"+i]&&w(t).then(function(t){console.log(t),alert("成功了");var e=t.data;"0"==t.code?(0==e.code&&(n["imgshow"+i]=!1,n["canclick"+i]=!1),Toast(e.title+","+e.msg)):Toast(t.msg)}).catch(function(t){alert("失败了"),t.msg&&Toast(t.msg)})},playhelp:function(){F?this.downloadApp():Z.cellPhone?0==this.helpactivityStatus?Toast("活动未开始"):1==this.helpactivityStatus?window.location.href=this.appfullurl:2==this.helpactivityStatus&&Toast("活动已结束"):V()},gethelpactivityuserState:function(i){var n=this,t={cellPhone:Z.cellPhone||"",activityId:i};p(t).then(function(t){var e=t.data;0==e.activityStatus?n.helpactivityStatus=0:1==e.activityStatus?(n.helpactivityStatus=1,null==e.idenCode||""==e.idenCode?(n.playhelpshow=!0,n.playhelpingshow=!1,n.playhelpovershow=!1):(n.playhelpshow=!1,n.playhelpingshow=!0,n.playhelpovershow=!1,n.gethelpactivityState(i))):2==e.activityStatus&&(n.helpactivityStatus=2)}).catch(function(t){t.msg&&Toast(t.msg)})},gethelpactivityState:function(t){var i=this,e={cellPhone:Z.cellPhone||"",activityId:t};m(e).then(function(t){var e=t.data;i.totalBathValue=e.totalBathValue,i.petName=e.petName,3==e.status&&(i.playhelpshow=!1,i.playhelpingshow=!1,i.playhelpovershow=!0),i.appshareTitle="快来送"+e.petName+"去宠物家XX店，赢40元大红包~"}).catch(function(t){t.msg&&Toast(t.msg)})},lookhelpactivity:function(){F?this.downloadApp():Z.cellPhone?window.location.href=this.appfullurl:V()},appshare:function(){W("1,2",this.appshareTitle,this.appshareDescribe,this.appfullurl)},goCouponlist:function(){F?this.downloadApp():Z.cellPhone?(A.platform.android&&window.fromh5lucy.coupon(null),A.platform.iPhone&&(window.location.href="pethome://coupon_null")):V()},activityLog:function(t,e,i){var n={imei:Z.imei||"",cellPhone:Z.cellPhone||"",type:4,activityInfoId:t,shareActivityId:e,taskId:i,pageType:1};y(n).then(function(t){console.log("打点成功")})}}},it={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.imgList[0],alt:""}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.imgList[1],alt:""}}),e._v(" "),i("div",{staticClass:"couponbox"},[i("div",{on:{click:function(t){e.getcoupon("117","331","0")}}}),e._v(" "),i("div",{on:{click:function(t){e.getcoupon("117","332","1")}}})])]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.imgList[2],alt:""}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.imgList[3],alt:""}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.imgList[4],alt:""}}),e._v(" "),i("div",{staticClass:"tabbox"},[i("div",{class:1==e.tabIndex?"tab-item active":"tab-item",on:{click:function(t){e.changeTab(1)}}},[i("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15900466089200781956.png",alt:""}}),e._v("狗粮热销推荐"),i("div",{directives:[{name:"show",rawName:"v-show",value:1==e.tabIndex,expression:"tabIndex == 1"}],staticClass:"lineb"})]),e._v(" "),i("div",{staticClass:"line"}),e._v(" "),i("div",{class:2==e.tabIndex?"tab-item active":"tab-item",on:{click:function(t){e.changeTab(2)}}},[i("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15900466089845724126.png",alt:""}}),e._v("猫粮热销推荐"),i("div",{directives:[{name:"show",rawName:"v-show",value:2==e.tabIndex,expression:"tabIndex == 2"}],staticClass:"lineb"})])])]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.imgList[5],alt:""}})]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:1==e.tabIndex,expression:"tabIndex == 1"}],staticClass:"pet-box"},[i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.dogimg[0],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(24)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.dogimg[1],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1279)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.dogimg[2],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1637)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.dogimg[3],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(2429)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.dogimg[4],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1468)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.dogimg[5],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1339)}}})])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2==e.tabIndex,expression:"tabIndex == 2"}],staticClass:"pet-box"},[i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.catimg[0],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1634)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.catimg[1],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1364)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.catimg[2],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1277)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.catimg[3],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(1253)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.catimg[4],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(2431)}}})]),e._v(" "),i("div",{staticClass:"imgbgc"},[i("img",{attrs:{src:e.catimg[5],alt:""}}),e._v(" "),i("div",{staticClass:"goodsbox",on:{click:function(t){e.goGoods(2384)}}})])])])},staticRenderFns:[]};var nt=i("VU/8")(et,it,!1,function(t){i("/pMc")},null,null).exports;i("UoMW");!function(t,e){if((e=e||{}).favicon){var i=[];t.querySelector('link[rel="shortcut icon"]')&&i.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&i.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&i.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var n=!0,o=!1,a=void 0;try{for(var s,c=x()(i);!(n=(s=c.next()).done);n=!0){s.value.setAttribute("href",e.favicon)}}catch(t){o=!0,a=t}finally{try{!n&&c.return&&c.return()}finally{if(o)throw a}}}}(document,config),window.Toast=o.a,new a.default({components:{index:nt},render:function(t){return t(nt)}}).$mount("#app")}},["m3vE"]);
//# sourceMappingURL=app.fdbad2e2a089b07c72bb.js.map