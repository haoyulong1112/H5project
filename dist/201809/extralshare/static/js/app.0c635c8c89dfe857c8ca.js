webpackJsonp([1],{"34+y":function(e,n){},"47P8":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});t("34+y");var o=t("X+yh"),i=t.n(o),a=t("/5sW"),r=t("cTzj"),s=t.n(r),l=t("//Fk"),d=t.n(l),c=t("pFYg"),u=t.n(c),p=t("fZjL"),f=t.n(p),v=[],g=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new d.a(function(n,t){var o=e.url;if(!e.concurrent){if(o=o.split("?")[0],-1!==v.indexOf(o))return void t(new Error("请求并发 "+o));v.push(o)}(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},a=e.type?e.type.toUpperCase():"POST",r=e.url||"",s=e.contentType||"application/x-www-form-urlencoded",l=e.data||{},c=!1!==e.async;return new d.a(function(n,t){var o={};o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var i="";f()(l).forEach(function(e){i+=e+"="+l[e]+"&"}),i=i.substr(0,i.lastIndexOf("&")),"GET"==a?(r=i?r+"?"+i:r,o.open(a,r,c),o.setRequestHeader("Content-type",s),o.send()):"POST"==a?(o.open(a,r,c),o.setRequestHeader("Content-type",s),o.send(i)):t(new Error("不支持的type")),o.onreadystatechange=function(){if(4==o.readyState)if(200==o.status){var e=o.response;"object"!==(void 0===e?"undefined":u()(e))&&(e=JSON.parse(e)),n(e)}else t(o)}})})(e).then(function(e){0===e.code?n(e):t(e)}).catch(function(e){t(e)}).finally(function(){var e=v.indexOf(o);-1!==e&&v.splice(e,1)})})},m=envConfig.requestDomain,w=function(e){return g({url:m+"/pet-api/appointment/getExtraItem",data:e})},h=t("BO1k"),y=t.n(h),x=function(){var e=window.location.href.split("?"),n={};if(1<e.length){var t=e[1],o=-1!==t.indexOf("%23/")?t.indexOf("%23/"):t.indexOf("#/");-1!==o&&(t=t.substr(0,o));var i=!0,a=!1,r=void 0;try{for(var s,l=y()(t.split("&"));!(i=(s=l.next()).done);i=!0){var c=s.value.split("=");c[0]&&(n[c[0]]=c[1]||"")}}catch(e){a=!0,r=e}finally{try{!i&&l.return&&l.return()}finally{if(a)throw r}}}return n},_=t("fxnj"),b=t.n(_),C=t("Xxa5"),D=t.n(C),S=t("exGp"),P=t.n(S),O=envConfig.requestDomain,A=(envConfig.manageDomain,envConfig.requestDomain,envConfig.requestDomain,envConfig.requestDomain,navigator.userAgent),k={android:-1<A.indexOf("Android")||-1<A.indexOf("Linux"),ios:-1<A.indexOf("iPhone")||-1<A.indexOf("iPad"),iphone:-1<A.indexOf("iPhone"),weixin:-1<A.toLowerCase().indexOf("micromessenger")},M=this,I=function(i,e){return new d.a(function(n,t){var l,o;(e=e||{}).jsApiList=e.jsApiList||["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"],(i=i||{}).link=i.link||window.location.href,i.imgUrl=i.imgUrl||config.shareImg,(l=e,new d.a((o=P()(D.a.mark(function e(t,o){var i,a,r,s;return D.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("wxconfig",k),k.weixin){e.next=4;break}return o(new Error("wxconfig 非微信浏览器")),e.abrupt("return");case 4:if(i=(l=l||{}).url||location.href,a=l.signData,r=config.wxShareDebug,a){e.next=13;break}return e.next=11,(n=i,g({url:O+"/pet-api/wx/sign",data:{url:encodeURIComponent(n)},type:"get"})).catch(function(e){o(new Error("sign error "+(e.code||"")+" "+(e.msg||"")))});case 11:s=e.sent,a={appId:s.data.appId,timestamp:s.data.timestamp,nonceStr:s.data.nonceStr,signature:s.data.signature};case 13:a.debug=!0===r,a.jsApiList=l.jsApiList,console.log(a),b.a.config(a),b.a.ready(function(e){console.log("ready"),console.log(e),t(a)}),b.a.error(function(e){console.log("error"),console.log(e),o(e)});case 19:case"end":return e.stop()}var n},e,M)})),function(e,n){return o.apply(this,arguments)}))).then(function(e){b.a.onMenuShareTimeline(i),b.a.onMenuShareAppMessage(i),b.a.onMenuShareQQ(i),b.a.onMenuShareWeibo(i),b.a.onMenuShareQZone(i),n(e)}).catch(function(e){t(e)})})},L=t("bOdI"),T=t.n(L),q=config.downloadApp,E=config.downloadLogo,U=config.downloadTitle,F=config.downloadDescription,Q=(String,config.downloadApp),j=config.downloadLogo,R=config.downloadTitle,z=config.downloadDescription,$={name:"download",props:{position:{type:String,default:"bottom"}},data:function(){return{style:T()({},this.position,0),downloadLogo:j,downloadTitle:R,downloadDescription:z}},methods:{downloadApp:Q}},W={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{class:e.$style.download,style:e.style},[t("div",{class:e.$style.content},[t("img",{attrs:{src:e.downloadLogo,alt:"宠物家"}}),e._v(" "),t("div",{class:e.$style.slogen},[t("span",{domProps:{textContent:e._s(e.downloadTitle)}}),e._v(" "),t("span",{domProps:{textContent:e._s(e.downloadDescription)}})])]),e._v(" "),t("div",{class:e.$style.btn,on:{click:e.downloadApp}},[e._v("立即打开")])])},staticRenderFns:[]};var G=t("VU/8")($,W,!1,function(e){this.$style=t("r2eQ")},null,null).exports,X=(config.downloadApp,config.getFullImgUrl,{name:"Index",data:function(){return{swiperOption:{autoplay:{delay:2e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",bulletClass:"swiper-pagination-bullet"}},bannerData:[],titleData:{title:"",desc:"",amount:""},listPrice:"",vipPrice:"",detailData:[]}},created:function(){var o=this,e=x();this.vipPrice=e.vipPrice;var n={};n.itemId=e.id,n.cellPhone=e.cellPhone,n.imei=e.imei,n.system=e.system,console.log(n),n.itemId?w(n).then(function(e){var n=e.data;if(console.log(n),n){o.infoFilter(n);var t={};n.share&&(n.share.title&&(t.title=n.share.title),n.share.desc&&(t.desc=n.share.desc)),I(t)}}).catch(function(e){console.warn(e),e.msg&&Toast(e.msg)}):Toast("params not found")},methods:{downloadApp:config.downloadApp,getFullImgUrl:config.getFullImgUrl,infoFilter:function(e){e.banner&&e.banner&&(this.bannerData=e.banner),e.detailPic&&(this.detailData=e.detailPic),(e.listPrice||0==e.listPrice)&&(this.listPrice=e.listPrice),e.name&&(e.name&&(this.titleData.title=e.name),e.desc&&(this.titleData.desc=e.desc),(e.serviceAmount||0==e.serviceAmount)&&(this.titleData.amount=e.serviceAmount))}},components:{downloadComp:G}}),Z={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container"},[o("div",{staticClass:"index"},[o("div",{staticClass:"banner"},[o("div",{staticClass:"banner-box",on:{click:t.downloadApp}},[o("swiper",{attrs:{options:t.swiperOption}},[t._l(t.bannerData,function(e,n){return o("swiper-slide",{key:"a"+n},[o("img",{staticClass:"banner-swiper-item",attrs:{src:e.img}})])}),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:1<t.bannerData.length,expression:"bannerData.length > 1"}],staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1)]),t._v(" "),o("div",{staticClass:"title"},[o("div",{},[o("span",{staticClass:"span-left"},[t._v(t._s(t.titleData.title))]),o("span",{staticClass:"span-right"},[t._v("已服务"+t._s(t.titleData.amount)+"单")])]),t._v(" "),o("div",{domProps:{textContent:t._s(t.titleData.desc)}})]),t._v(" "),o("div",{staticClass:"content"},[o("div",{staticClass:"title-content"},[t._v("服务介绍")]),t._v(" "),o("div",t._l(t.detailData,function(e,n){return o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.getFullImgUrl(e),expression:"getFullImgUrl(item)"}],key:"b"+n,on:{click:t.downloadApp}})}))]),t._v(" "),o("div",{staticClass:"footer"},[o("div",{staticClass:"price"},[o("span",[t._v("￥"+t._s(t.listPrice))]),o("span",[t._v("会员￥"+t._s(t.vipPrice))])])]),t._v(" "),o("download-comp")],1)])},staticRenderFns:[]};var H=t("VU/8")(X,Z,!1,function(e){t("QiB4"),t("zxRZ")},null,null).exports;t("UoMW");!function(e,n){if((n=n||{}).favicon){var t=[];e.querySelector('link[rel="shortcut icon"]')&&t.push(e.querySelector('link[rel="shortcut icon"]')),e.querySelector('link[rel="icon"]')&&t.push(e.querySelector('link[rel="icon"]')),e.querySelector('link[rel="apple-touch-icon-precomposed"]')&&t.push(e.querySelector('link[rel="apple-touch-icon-precomposed"]'));var o=!0,i=!1,a=void 0;try{for(var r,s=y()(t);!(o=(r=s.next()).done);o=!0){r.value.setAttribute("href",n.favicon)}}catch(e){i=!0,a=e}finally{try{!o&&s.return&&s.return()}finally{if(i)throw a}}}}(document,config);var B=t("7QTg"),N=t.n(B);t("v2ns");a.default.use(N.a),a.default.use(s.a),window.Toast=i.a,new a.default({components:{index:H},render:function(e){return e(H)}}).$mount("#app")},QiB4:function(e,n){},UoMW:function(e,n){var t,o,i,a,r,s;t=document,o=window,i=t.documentElement,a=o.config.pageWidth,r="orientationchange"in o?"orientationchange":"resize",s=function(){var e=i.clientWidth;i.style.fontSize=0<a?(e&&e<a?e:a)/7.5+"px":e/7.5+"px"},t.addEventListener&&(o.addEventListener(r,s,!1),t.addEventListener("DOMContentLoaded",s,!1),setTimeout(function(){0===parseInt(t.defaultView.getComputedStyle(i).fontSize)&&s()},3e3))},r2eQ:function(e,n){e.exports={download:"src-components--download-3Gy4G_0",content:"src-components--download-1qp7S_0",slogen:"src-components--download-32GTD_0",btn:"src-components--download-2em-R_0"}},v2ns:function(e,n){},zxRZ:function(e,n){}},["47P8"]);
//# sourceMappingURL=app.0c635c8c89dfe857c8ca.js.map