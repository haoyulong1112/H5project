webpackJsonp([1],{"34+y":function(t,e){},"6pq6":function(t,e){},UoMW:function(t,e){var n,i,a,o,s,r;n=document,i=window,a=n.documentElement,o=i.config.pageWidth,s="orientationchange"in i?"orientationchange":"resize",r=function(){var t=a.clientWidth;a.style.fontSize=0<o?(t&&t<o?t:o)/7.5+"px":t/7.5+"px"},n.addEventListener&&(i.addEventListener(s,r,!1),n.addEventListener("DOMContentLoaded",r,!1),setTimeout(function(){0===parseInt(n.defaultView.getComputedStyle(a).fontSize)&&r()},3e3))},cFNx:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("q/am");var i=n("4VPn"),a=n.n(i),o=(n("34+y"),n("X+yh")),s=n.n(o),r=n("/5sW"),c=n("mvHQ"),l=n.n(c),d=navigator.userAgent,h={android:-1<d.indexOf("Android")||-1<d.indexOf("Linux"),ios:-1<d.indexOf("iPhone")||-1<d.indexOf("iPad"),iphone:-1<d.indexOf("iPhone"),weixin:-1<d.toLowerCase().indexOf("micromessenger")},u=n("//Fk"),p=n.n(u),m=n("pFYg"),f=n.n(m),v=n("fZjL"),g=n.n(v),w=[],b=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new p.a(function(e,n){var i=t.url;if(!t.concurrent){if(i=i.split("?")[0],-1!==w.indexOf(i))return void n(new Error("请求并发 "+i));w.push(i)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},o=t.type?t.type.toUpperCase():"POST",s=t.url||"",r=t.contentType||"application/x-www-form-urlencoded",c=t.data||{},l=!1!==t.async;return new p.a(function(e,n){var i={};i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var a="";g()(c).forEach(function(t){a+=t+"="+c[t]+"&"}),a=a.substr(0,a.lastIndexOf("&")),"GET"==o?(s=a?s+"?"+a:s,i.open(o,s,l),i.setRequestHeader("Content-type",r),i.send()):"POST"==o?(c.system&&(s=0<s.indexOf("?")?s+"&system="+c.system:s+"?system="+c.system),i.open(o,s,l),i.setRequestHeader("Content-type",r),i.send(a)):n(new Error("不支持的type")),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var t=i.response;"object"!==(void 0===t?"undefined":f()(t))&&(t=JSON.parse(t)),e(t)}else n(i)}})})(t).then(function(t){0===t.code?e(t):n(t)}).catch(function(t){n(t)}).finally(function(){var t=w.indexOf(i);-1!==t&&w.splice(t,1)})})},y=envConfig.requestDomain,_=function(t){return b({url:y+"/pet-api/extraCard/info",data:t})},C=envConfig.requestDomain;console.log(C);var x=function(t){return b({url:C+"/pet-api/logcount/add",data:t})},k=n("BO1k"),P=n.n(k),j=function(){var t=window.location.href.split("?"),e={};if(1<t.length){var n=t[1],i=-1!==n.indexOf("%23/")?n.indexOf("%23/"):n.indexOf("#/");-1!==i&&(n=n.substr(0,i));var a=!0,o=!1,s=void 0;try{for(var r,c=P()(n.split("&"));!(a=(r=c.next()).done);a=!0){var l=r.value.split("=");l[0]&&(e[l[0]]=l[1]||"")}}catch(t){o=!0,s=t}finally{try{!a&&c.return&&c.return()}finally{if(o)throw s}}}return e},O=j(),S=[];O.system&&(S=O.system.split("_"));var I,A="android"===S[0],D="ios"===S[0],N=(S[1]&&S[1],{platform:(I=navigator.userAgent,{android:-1<I.indexOf("Android")||-1<I.indexOf("Linux"),iPhone:-1<I.indexOf("iPhone"),iPad:-1<I.indexOf("iPad")}),language:(navigator.browserLanguage||navigator.language).toLowerCase()}),q=n("fxnj"),M=n.n(q),T=n("Xxa5"),L=n.n(T),E=n("exGp"),U=n.n(E),F=envConfig.requestDomain,W=(envConfig.manageDomain,envConfig.requestDomain,envConfig.requestDomain,envConfig.requestDomain,this),Q=function(a,t){return new p.a(function(e,n){var c,i;(t=t||{}).jsApiList=t.jsApiList||["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"],(a=a||{}).link=a.link||window.location.href,a.imgUrl=a.imgUrl||config.shareImg,(c=t,new p.a((i=U()(L.a.mark(function t(n,i){var a,o,s,r;return L.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("wxconfig",h),h.weixin){t.next=4;break}return i(new Error("wxconfig 非微信浏览器")),t.abrupt("return");case 4:if(a=(c=c||{}).url||location.href,o=c.signData,s=config.wxShareDebug,o){t.next=13;break}return t.next=11,(e=a,b({url:F+"/pet-api/wx/sign",data:{url:encodeURIComponent(e)},type:"get"})).catch(function(t){i(new Error("sign error "+(t.code||"")+" "+(t.msg||"")))});case 11:r=t.sent,o={appId:r.data.appId,timestamp:r.data.timestamp,nonceStr:r.data.nonceStr,signature:r.data.signature};case 13:o.debug=!0===s,o.jsApiList=c.jsApiList,console.log(o),M.a.config(o),M.a.ready(function(t){console.log("ready"),console.log(t),n(o)}),M.a.error(function(t){console.log("error"),console.log(t),i(t)});case 19:case"end":return t.stop()}var e},t,W)})),function(t,e){return i.apply(this,arguments)}))).then(function(t){M.a.onMenuShareTimeline(a),M.a.onMenuShareAppMessage(a),M.a.onMenuShareQQ(a),M.a.onMenuShareWeibo(a),M.a.onMenuShareQZone(a),e(t)}).catch(function(t){n(t)})})},X=function(){A&&window.fromh5data.login(),D&&(window.location.href="pethome://login")},R=function(t){var e=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:window.location.href).split("#")[0].split("23%")[0].split("?"),n=e[0],i=e[1]?e[1].split("&"):[],a={},o=!0,s=!1,r=void 0;try{for(var c,l=P()(i);!(o=(c=l.next()).done);o=!0){var d=c.value;a[d.split("=")[0]]=d.split("=")[1]||""}}catch(t){s=!0,r=t}finally{try{!o&&l.return&&l.return()}finally{if(s)throw r}}var h="",u=function(t,e){var n={};for(var i in t)n[i]=t[i];for(var a in e)n[a]=e[a];return n}(a,t);for(var p in u)h+=p+"="+u[p]+"&";return n+(h?"?"+h.substring(0,h.length-1):"")},H=(j(),config.downloadApp,(new Date).getTime(),config.shareDescribe,config.shareTitle,config.link,envConfig.shareDomain,j()),z=config.downloadApp,$=(new Date).getTime(),B=h.weixin,V=config.shareDescribe,Z=config.shareTitle,G=config.link,J=envConfig.shareDomain+"/static/content/html5/byvue/dist/2020/02/brushtoothdetail/index.html",Y={data:function(){return{showsharepop:!0,showbox:!1,showConfirm:!1,fullurl:J,img1:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15825381596482243465.png",img2:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15825381671592220491.png",swiperOption:{autoplay:{delay:2e3,disableOnInteraction:!1}},bannerData:[],sellAmount:90,cardNumber:1,jian:"jian",sp:"special",agreed:!1,unitprice:"",totalprice:"",cellPhone:"",shareImg:"",system:"",newlink:G,poptitle:"请选择分享方式",shareicon:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15827836684165746680.png",title:"9.9元刷牙年卡",downloadlink:"http://a.app.qq.com/o/simple.jsp?pkgname=com.haotang.pet&g_f=991653",des:"适用于宠物家所有门店，预约洗美、特色服务时刷牙免费。",promoterUserId:"",shareObjstr:""}},created:function(){if(B){var t={};t.title=Z,t.desc=V,Q(t)}else window.init_roll=function(t){var e=R({cellPhone:t});window.location.href=e},x({typeid:"275",activeid:"276"}).then(function(t){console.log("打点成功")}).catch(function(t){Toast(t.msg)});this.getDetail()},methods:{downloadApp:z,getDetail:function(){var i=this,t=H.cellPhone||"",e=H.system,n={system:e,imei:H.imei};t&&(n.cellPhone=t),this.cellPhone=t,this.system=e,_(n).then(function(t){if(0==t.code){if(i.unitprice=t.data.price,i.sellAmount=t.data.sellAmount,i.totalprice=t.data.price.toFixed(2),i.bannerData.push(t.data.bg),i.promoterUserId=t.data.promoterUserId,t.data.shareImg)i.shareImg=t.data.shareImg,document.getElementById("js-p-share-sharefriendimg").setAttribute("content",i.shareImg);var e=document.getElementById("js-p-share-shareobj"),n={webpageUrl:i.fullurl,imgurl:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15845037154158942580.png",title:Z,description:V,path:"pages/brushingcard/brushingcard?c="+i.promoterUserId};i.shareObjstr=l()(n),e.setAttribute("content",i.shareObjstr)}})},jiafa:function(){this.cardNumber++,this.totalprice=(this.cardNumber*this.unitprice).toFixed(2)},jianfa:function(){1<this.cardNumber&&(this.cardNumber--,this.totalprice=(this.cardNumber*this.unitprice).toFixed(2))},agree:function(){this.agreed?this.agreed=!1:this.agreed=!0},changeNum:function(){this.cardNumber<1&&(Toast("购买数量不能小于1"),this.cardNumber=1),this.totalprice=(this.cardNumber*this.unitprice).toFixed(2)},buyCard:function(){B?this.downloadApp():(x({typeid:"275",activeid:"277"}).then(function(t){console.log("打点成功")}).catch(function(t){Toast(t.msg)}),this.cellPhone?"5.3.25"<=this.system.split("_")[1]?this.agreed?(N.platform.android&&window.fromh5lucy.buyItemCard(this.cardNumber,this.totalprice),N.platform.iPhone&&(window.location.href="pethome://buycard_"+this.cardNumber+"_"+this.totalprice)):Toast("请同意宠物家预付卡购卡章程"):Toast("升级到新版本才可购买哦"):X())},share:function(){B?this.downloadApp():(this.poptitle="请选择分享方式",this.showsharepop=!0,this.cellPhone&&this.shareImg?this.showConfirm=!0:(this.showConfirm=!1,N.platform.android&&window.fromh5lucy.miniProgramShare(this.shareObjstr),N.platform.iPhone&&(window.location.href="pethome://WXMiniProgram")))},shareLink:function(){B?this.downloadApp():(this.showConfirm=!1,N.platform.android&&window.fromh5lucy.miniProgramShare(this.shareObjstr),N.platform.iPhone&&(window.location.href="pethome://WXMiniProgram"))},getFullurl:function(t){if(t)return t+"?cellPhone="+(H.cellPhone||"")+"&imei="+(H.imei||"")+"&system="+(H.system||"")+"&t="+$},shareImgs:function(){B?this.downloadApp():(this.showConfirm=!1,this.showbox=!0)},closepop:function(){this.showConfirm=!1},cancelbtn:function(){this.showbox=!1},sharefriends:function(){"5.3.25"<=this.system.split("_")[1]?(N.platform.android&&window.fromh5lucy.cardImageShare(this.shareImg),N.platform.iPhone&&(window.location.href="pethome://imageCardShare_"+this.shareImg)):Toast("升级到新版本才可分享图片哦")},downloadimg:function(){"5.3.25"<=this.system.split("_")[1]?(N.platform.android&&window.fromh5lucy.savedPhotos(this.shareImg),N.platform.iPhone&&(window.location.href="pethome://savedPhotos_"+this.shareImg)):Toast("升级到新版本才可下载图片哦")},godownload:function(){N.platform.android&&window.fromh5lucy.goDownloadPage(this.downloadlink),N.platform.iPhone&&(window.location.href="pethome://downloadApp")}}},K={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"banner"},[n("div",{staticClass:"line"}),e._v(" "),n("div",{staticClass:"banner-box"},[n("swiper",{attrs:{options:e.swiperOption}},e._l(e.bannerData,function(t,e){return n("swiper-slide",{key:"a"+e},[n("img",{staticClass:"banner-swiper-item",attrs:{src:t}})])}))],1)]),e._v(" "),n("div",{staticClass:"cardDetail"},[n("div",{staticClass:"price"},[n("span",[e._v("￥")]),e._v(e._s(e.unitprice)+"\n      "),n("div",{staticClass:"sharebtn",on:{click:e.share}},[n("img",{attrs:{src:e.shareicon,alt:""}}),n("div",[e._v("分享")])])]),e._v(" "),n("div",{staticClass:"title"},[n("div",{staticClass:"title-left"},[e._v(e._s(e.title))])]),e._v(" "),n("div",{staticClass:"text"},[e._v(e._s(e.des))])]),e._v(" "),n("div",{staticClass:"totalnumber"},[n("div",{staticClass:"number-left"},[e._v("数量")]),e._v(" "),n("div",{staticClass:"number-right"},[n("div",{class:1<e.cardNumber?e.sp:e.jian,on:{click:e.jianfa}},[e._v("－")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.cardNumber,expression:"cardNumber"}],attrs:{type:"text"},domProps:{value:e.cardNumber},on:{blur:e.changeNum,input:function(t){t.target.composing||(e.cardNumber=t.target.value)}}}),e._v(" "),n("div",{staticClass:"jia",on:{click:e.jiafa}},[e._v("＋")])])]),e._v(" "),n("div",{staticClass:"shunming"},[e._m(0),e._v(" "),e._m(1),e._v(" "),n("div",{staticClass:"jieshi"},[e._v("最终解释权归宠物家所有 如有疑问可拨打4000-3000-11")]),e._v(" "),n("div",{staticClass:"agree",on:{click:e.agree}},[n("img",{attrs:{src:e.agreed?e.img2:e.img1,alt:""}}),n("div",[e._v("我已阅读并同意"),n("a",{attrs:{href:e.newlink}},[e._v("《宠物家预付卡购卡章程》")])])])]),e._v(" "),n("div",{staticClass:"fillbox"}),e._v(" "),n("div",{staticClass:"bottom"},[n("div",{staticClass:"bottom-left"},[n("span",{staticClass:"heji"},[e._v("合计:")]),e._v(" "),n("i",[e._v("￥")]),e._v(" "),n("span",{staticClass:"totalprice"},[e._v(e._s(e.totalprice))])]),e._v(" "),n("div",{staticClass:"bottom-right",on:{click:e.buyCard}},[e._v("立即购买")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showbox,expression:"showbox"}],staticClass:"shareimgbox",on:{click:e.cancelbtn}},[n("div",{staticClass:"imgbox"},[n("img",{attrs:{src:e.shareImg,alt:""}})]),e._v(" "),n("div",{staticClass:"shareimg-style"},[n("div",{staticClass:"shareimg-top"},[n("div",{on:{click:function(t){return t.stopPropagation(),e.sharefriends(t)}}},[n("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15827119625021597940.png",alt:""}}),e._v("\n              分享给好友")]),e._v(" "),n("div",{on:{click:function(t){return t.stopPropagation(),e.downloadimg(t)}}},[n("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15827119626533743156.png",alt:""}}),e._v("下载图片")])]),e._v(" "),n("div",{staticClass:"cancel",on:{click:function(t){return t.stopPropagation(),e.cancelbtn(t)}}},[e._v("取消")])])]),e._v(" "),n("mt-popup",{attrs:{zIndex:"990"},model:{value:e.showConfirm,callback:function(t){e.showConfirm=t},expression:"showConfirm"}},[n("div",{staticClass:"sharepop"},[n("div",{staticClass:"closebtn",on:{click:e.closepop}},[n("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15833776096601121540.png",alt:""}})]),e._v(" "),n("div",{staticClass:"pop-title"},[e._v(e._s(e.poptitle))]),e._v(" "),e.showsharepop?n("div",{staticClass:"pop-style"},[n("div",{staticClass:"style-left",on:{click:e.shareImgs}},[e._v("图片分享")]),e._v(" "),n("div",{staticClass:"style-right",on:{click:e.shareLink}},[e._v("链接分享")])]):n("div",{staticClass:"pop-download",on:{click:e.godownload}},[e._v("下载新版本点击跳下载")])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"shunming-title"},[e("span",{staticClass:"span1"},[this._v("使用说明")]),this._v(" "),e("span",{staticClass:"span2"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"shuoming-text"},[n("p",[t._v("1.此卡仅适用狗狗，猫咪不可使用；")]),t._v(" "),n("p",[t._v("2.预约洗澡、美容、特色服务时，刷牙免费，不可单独使用；")]),t._v(" "),n("p",[t._v("3.有效期：自绑卡之日起，一年内有效；")]),t._v(" "),n("p",[t._v("4.每张卡只可绑定一只宠物，绑定成功后不可更换且不可解绑宠物，如删除宠物则绑定卡同时失效；")]),t._v(" "),n("p",[t._v("5.此卡一经售出不予退换。")])])}]};var tt=n("VU/8")(Y,K,!1,function(t){n("6pq6")},null,null).exports;n("UoMW");!function(t,e){if((e=e||{}).favicon){var n=[];t.querySelector('link[rel="shortcut icon"]')&&n.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&n.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&n.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var i=!0,a=!1,o=void 0;try{for(var s,r=P()(n);!(i=(s=r.next()).done);i=!0){s.value.setAttribute("href",e.favicon)}}catch(t){a=!0,o=t}finally{try{!i&&r.return&&r.return()}finally{if(a)throw o}}}}(document,config);var et=n("7QTg"),nt=n.n(et);n("v2ns");r.default.use(nt.a),window.Toast=s.a,r.default.component(a.a.name,a.a),new r.default({components:{index:tt},render:function(t){return t(tt)}}).$mount("#app")},"q/am":function(t,e){},v2ns:function(t,e){}},["cFNx"]);
//# sourceMappingURL=app.044f388ba6f9be8e7275.js.map