webpackJsonp([1],{"5sji":function(t,e){},"6z2v":function(t,e){},UoMW:function(t,e){var n,i,s,o,a,r;n=document,i=window,s=n.documentElement,o=i.config.pageWidth,a="orientationchange"in i?"orientationchange":"resize",r=function(){var t=s.clientWidth;s.style.fontSize=0<o?(t&&t<o?t:o)/7.5+"px":t/7.5+"px",i.rem=t/7.5},n.addEventListener&&(i.addEventListener(a,r,!1),n.addEventListener("DOMContentLoaded",r,!1),setTimeout(function(){0===parseInt(n.defaultView.getComputedStyle(s).fontSize)&&r()},3e3))},"vRt/":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("/5sW"),s=n("mvHQ"),o=n.n(s),a=n("//Fk"),h=n.n(a),r=n("pFYg"),d=n.n(r),c=n("fZjL"),u=n.n(c),l=[],f=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new h.a(function(e,n){var i=t.url;if(!t.concurrent){if(i=i.split("?")[0],-1!==l.indexOf(i))return void n(new Error("请求并发 "+i));l.push(i)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},o=t.type?t.type.toUpperCase():"POST",a=t.url||"",r=t.contentType||"application/x-www-form-urlencoded",c=t.data||{},l=!1!==t.async;return new h.a(function(e,n){var i={};i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var s="";u()(c).forEach(function(t){s+=t+"="+c[t]+"&"}),s=s.substr(0,s.lastIndexOf("&")),"GET"==o?(a=s?a+"?"+s:a,i.open(o,a,l),i.setRequestHeader("Content-type",r),i.send()):"POST"==o?(c.system&&(a=0<a.indexOf("?")?a+"&system="+c.system:a+"?system="+c.system),i.open(o,a,l),i.setRequestHeader("Content-type",r),i.send(s)):n(new Error("不支持的type")),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var t=i.response;"object"!==(void 0===t?"undefined":d()(t))&&(t=JSON.parse(t)),e(t)}else n(i)}})})(t).then(function(t){0===t.code?e(t):0===t.errno?e(t):n(t)}).catch(function(t){n(t)}).finally(function(){var t=l.indexOf(i);-1!==t&&l.splice(t,1)})})},v=envConfig.requestDomain;console.log(v);var p=function(t){return f({url:v+"/pet-api/activity/seckill/isReceiveReward",data:t})},g=function(t){return f({url:v+"/pet-api/activity/seckill/receiveReward",data:t})},m=navigator.userAgent,w={android:-1<m.indexOf("Android")||-1<m.indexOf("Linux"),ios:-1<m.indexOf("iPhone")||-1<m.indexOf("iPad"),iphone:-1<m.indexOf("iPhone"),weixin:-1<m.toLowerCase().indexOf("micromessenger")},y=n("BO1k"),x=n.n(y),k=function(){var t=window.location.href.split("?"),e={};if(1<t.length){var n=t[1],i=-1!==n.indexOf("%23/")?n.indexOf("%23/"):n.indexOf("#/");-1!==i&&(n=n.substr(0,i));var s=!0,o=!1,a=void 0;try{for(var r,c=x()(n.split("&"));!(s=(r=c.next()).done);s=!0){var l=r.value.split("=");l[0]&&(e[l[0]]=l[1]||"")}}catch(t){o=!0,a=t}finally{try{!s&&c.return&&c.return()}finally{if(o)throw a}}}return e},_=k(),I=[];_.system&&(I=_.system.split("_"));var C,b={android:-1<I.findIndex(function(t){return"android"===t}),ios:-1<I.findIndex(function(t){return"ios"===t}),version:I[1]?""+I[1]:"",Terminal:{platform:(C=navigator.userAgent,{android:-1<C.indexOf("Android")||-1<C.indexOf("Linux"),iPhone:-1<C.indexOf("iPhone"),iPad:-1<C.indexOf("iPad")}),language:(navigator.browserLanguage||navigator.language).toLowerCase()}},O=n("fxnj"),P=n.n(O),R=function(t){var e=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:window.location.href).split("#")[0].split("23%")[0].split("?"),n=e[0],i=e[1]?e[1].split("&"):[],s={},o=!0,a=!1,r=void 0;try{for(var c,l=x()(i);!(o=(c=l.next()).done);o=!0){var h=c.value;s[h.split("=")[0]]=h.split("=")[1]||""}}catch(t){a=!0,r=t}finally{try{!o&&l.return&&l.return()}finally{if(a)throw r}}var d="",u=function(t,e){var n={};for(var i in t)n[i]=t[i];for(var s in e)n[s]=e[s];return n}(s,t);for(var f in u)d+=f+"="+u[f]+"&";return n+(d?"?"+d.substring(0,d.length-1):"")},S=function(){b.android&&window.fromh5data.login(),b.ios&&(window.location.href="pethome://login")},T=(String,String,Number,String,{name:"showtoast",data:function(){return{showRule:!1}},created:function(){},methods:{showtime:function(){var t=this;this.showRule=!0,setTimeout(function(){t.showRule&&(t.showRule=!1)},2e3)}},props:{text:{type:String,default:"请注意格式"},bgc:{type:String,default:"background-color: #000; color: #fff;opacity: 0.8;"},height:{type:Number,default:1.4},top:{type:String,default:"top: 5rem;"}}}),M={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.showRule,expression:"showRule"}],staticClass:"toastbox",style:t.top},[n("div",{staticClass:"toast",style:t.bgc},[t._v(t._s(t.text))])])},staticRenderFns:[]};var j=n("VU/8")(T,M,!1,function(t){n("5sji")},"data-v-476e7f06",null).exports,E=(k(),envConfig.shareDomain,config.couponJson,config.shareImg,config.activityId,k()),L=w.weixin,q=envConfig.shareDomain+"/static/content/html5/byvue/dist/2020/11/newshopgetCoupom/index.html",$=config.couponJson,A=config.shareImg,B=config.activityId,U={data:function(){return{shareweixn:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/16062168431302119003.png",successImg:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/16062054875845371830.png",showToast:!1,showshare:!1,activityId:B,taskId:"",shopMsg:{},canclick:!1,shoetext:"",phone:""}},created:function(){this.system=b,this.phone=E.cellPhone||"";var t=E.shopId;for(var e in $)$[e].shopId==t&&(this.shopMsg=$[e]);this.taskId=this.shopMsg.taskId,console.log("this.taskId",this.taskId),L||(window.init_roll=function(t){var e=R({cellPhone:t});window.location.href=e}),E.cellPhone&&this.getcouponstate(this.activityId,this.taskId),document.getElementById("js-p-share-sharefriendimg").setAttribute("content",A);var n=document.getElementById("js-p-share-shareobj"),i={webpageUrl:q,imgurl:A,title:this.shopMsg.shareTitle,description:this.shopMsg.shareTitle,path:"pages/index/index"};this.shareObjstr=o()(i),n.setAttribute("content",this.shareObjstr)},components:{showtoast:j},methods:{getcouponstate:function(t,i){var s=this,e={imei:E.imei||"",cellPhone:E.cellPhone||"",system:E.system||"",activityId:t,taskIds:i};p(e).then(function(t){for(var e=t.data.res,n=0;n<e.length;n++)e[n].taskid==i&&("0"==e[n].isReceive?s.canclick=!1:"1"==e[n].isReceive&&(s.canclick=!0));console.log(s.canclick)}).catch(function(t){t.msg&&(s.shoetext=t.msg,s.$refs.showtoast.showtime())})},getCoupon:function(t,e){if(this.phone){var n={imei:E.imei||"",cellPhone:E.cellPhone||"",system:E.system||"",activityId:t,taskId:e};this.getReceiveReward(n)}else S()},getReceiveReward:function(t){var n=this;this.canclick?(this.shoetext="您已经领取了该优惠券！",this.$refs.showtoast.showtime()):g(t).then(function(t){console.log(t);var e=t.data;"0"==t.code?(0==e.code&&(n.canclick=!0),n.shoetext=e.title+","+e.msg):n.shoetext=t.msg,n.$refs.showtoast.showtime()}).catch(function(t){t.msg&&(n.shoetext=t.msg,n.$refs.showtoast.showtime())})},goappoent:function(){L?P.a.miniProgram.switchTab({url:"/pages/index/index"}):b.Terminal.platform.android?window.fromh5lucy.hairdressing(""):b.Terminal.platform.iPhone&&(window.location.href="pethome://hairdressing")},close:function(){this.showToast=!1},shareBegin:function(){L?(this.shoetext="请点击右上角分享给好友",this.$refs.showtoast.showtime()):this.showshare=!0},shareBtn:function(){b.Terminal.platform.android&&window.fromh5lucy.miniProgramShare(this.shareObjstr),b.Terminal.platform.iPhone&&(window.location.href="pethome://WXMiniProgram"),this.showshare=!1},closeshare:function(){this.showshare=!1}}},W={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"imgbox"},[i("img",{staticClass:"bgc",attrs:{src:n.shopMsg.bgcImg,alt:""}}),n._v(" "),i("div",{staticClass:"acTime"},[n._v("活动时间："+n._s(n.shopMsg.avtivityTime))]),n._v(" "),i("img",{staticClass:"coupon",attrs:{src:n.canclick?n.shopMsg.couponImged:n.shopMsg.couponImg,alt:""},on:{click:function(t){n.getCoupon(n.activityId,n.taskId)}}}),n._v(" "),i("div",{staticClass:"rule"},[n._m(0),n._v(" "),i("div",{staticClass:"ruletext"},n._l(n.shopMsg.rule,function(t,e){return i("p",{key:"a"+e},[n._v(n._s(e+1)+". "+n._s(t))])}))]),n._v(" "),i("div",{staticClass:"share",on:{click:n.shareBegin}})]),n._v(" "),n.showToast?i("div",{staticClass:"toastdiv"},[i("div",{staticClass:"imgdiv"},[i("img",{attrs:{src:n.successImg,alt:""},on:{click:n.goappoent}}),n._v(" "),i("div",{staticClass:"close",on:{click:function(t){return t.stopPropagation(),n.close(t)}}},[n._v("×")])])]):n._e(),n._v(" "),n.showshare?i("div",{staticClass:"sharediv"},[i("img",{attrs:{src:n.shareweixn,alt:""}}),n._v(" "),i("div",{staticClass:"shareBtn",on:{click:n.shareBtn}}),n._v(" "),i("div",{staticClass:"closeshare",on:{click:n.closeshare}})]):n._e(),n._v(" "),i("showtoast",{ref:"showtoast",attrs:{text:n.shoetext}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[this._v("活动规则"),e("span")])}]};var z=n("VU/8")(U,W,!1,function(t){n("6z2v")},null,null).exports;n("UoMW");!function(t,e){if((e=e||{}).favicon){var n=[];t.querySelector('link[rel="shortcut icon"]')&&n.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&n.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&n.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var i=!0,s=!1,o=void 0;try{for(var a,r=x()(n);!(i=(a=r.next()).done);i=!0){a.value.setAttribute("href",e.favicon)}}catch(t){s=!0,o=t}finally{try{!i&&r.return&&r.return()}finally{if(s)throw o}}}}(document,config),new i.a({components:{index:z},render:function(t){return t(z)}}).$mount("#app")}},["vRt/"]);
//# sourceMappingURL=app.0249218a6dab64d5e009.js.map