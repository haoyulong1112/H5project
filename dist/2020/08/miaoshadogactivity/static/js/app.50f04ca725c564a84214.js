webpackJsonp([1],{"2a1T":function(n,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});e("34+y");var t=e("X+yh"),o=e.n(t),a=e("/5sW"),s=e("BO1k"),l=e.n(s),r=function(){var n=window.location.href.split("?"),i={};if(1<n.length){var e=n[1],t=-1!==e.indexOf("%23/")?e.indexOf("%23/"):e.indexOf("#/");-1!==t&&(e=e.substr(0,t));var o=!0,a=!1,s=void 0;try{for(var r,c=l()(e.split("&"));!(o=(r=c.next()).done);o=!0){var d=r.value.split("=");d[0]&&(i[d[0]]=d[1]||"")}}catch(n){a=!0,s=n}finally{try{!o&&c.return&&c.return()}finally{if(a)throw s}}}return i}(),c=[];r.system&&(c=r.system.split("_"));var d,u="android"===c[0],f="ios"===c[0],g=(c[1]&&c[1],{platform:(d=navigator.userAgent,{android:-1<d.indexOf("Android")||-1<d.indexOf("Linux"),iPhone:-1<d.indexOf("iPhone"),iPad:-1<d.indexOf("iPad")}),language:(navigator.browserLanguage||navigator.language).toLowerCase()}),v=function(n,i,e,t){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:config.shareImg;u?function(n,i,e,t){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:config.shareImg;u?n&&i&&e&&t?window.fromh5data.shareCardInfo(i,o,t,e,n):console.warn("setshareinfoandroid 缺少参数"):console.warn("setshareinfoandroid 不在安卓客户端内")}(n,i,e,t,o):f&&function(n,i,e){var t=3<arguments.length&&void 0!==arguments[3]?arguments[3]:config.shareImg,o=document.querySelector('meta[name="sharetitle"]'),a=document.querySelector('meta[name="description"]'),s=document.querySelector('meta[name="shareimg"]'),r=document.querySelector('meta[name="shareurl"]');o&&a&&s&&r||console.warn("setshareinfoios 缺少标签"),n&&o&&o.setAttribute("content",n),i&&a&&a.setAttribute("content",i),t&&s&&s.setAttribute("content",t),e&&r&&r.setAttribute("content",e)}(i,e,t,o)},m=e("//Fk"),h=e.n(m),p=e("fxnj"),w=e.n(p),x=e("Xxa5"),y=e.n(x),b=e("exGp"),_=e.n(b),C=e("pFYg"),k=e.n(C),S=e("fZjL"),L=e.n(S),G=[],O=function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new h.a(function(i,e){var t=n.url;if(!n.concurrent){if(t=t.split("?")[0],-1!==G.indexOf(t))return void e(new Error("请求并发 "+t));G.push(t)}(function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},a=n.type?n.type.toUpperCase():"POST",s=n.url||"",r=n.contentType||"application/x-www-form-urlencoded",c=n.data||{},d=!1!==n.async;return new h.a(function(i,e){var t={};t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var o="";L()(c).forEach(function(n){o+=n+"="+c[n]+"&"}),o=o.substr(0,o.lastIndexOf("&")),"GET"==a?(s=o?s+"?"+o:s,t.open(a,s,d),t.setRequestHeader("Content-type",r),t.send()):"POST"==a?(c.system&&(s=0<s.indexOf("?")?s+"&system="+c.system:s+"?system="+c.system),t.open(a,s,d),t.setRequestHeader("Content-type",r),t.send(o)):e(new Error("不支持的type")),t.onreadystatechange=function(){if(4==t.readyState)if(200==t.status){var n=t.response;"object"!==(void 0===n?"undefined":k()(n))&&(n=JSON.parse(n)),i(n)}else e(t)}})})(n).then(function(n){0===n.code?i(n):e(n)}).catch(function(n){e(n)}).finally(function(){var n=G.indexOf(t);-1!==n&&G.splice(n,1)})})},A=envConfig.requestDomain,q=(envConfig.manageDomain,envConfig.requestDomain,envConfig.requestDomain,envConfig.requestDomain,navigator.userAgent),M={android:-1<q.indexOf("Android")||-1<q.indexOf("Linux"),ios:-1<q.indexOf("iPhone")||-1<q.indexOf("iPad"),iphone:-1<q.indexOf("iPhone"),weixin:-1<q.toLowerCase().indexOf("micromessenger")},D=this,T=function(o,n){return new h.a(function(i,e){var c,t;(n=n||{}).jsApiList=n.jsApiList||["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"],(o=o||{}).link=o.link||window.location.href,o.imgUrl=o.imgUrl||config.shareImg,(c=n,new h.a((t=_()(y.a.mark(function n(e,t){var o,a,s,r;return y.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(console.log("wxconfig",M),M.weixin){n.next=4;break}return t(new Error("wxconfig 非微信浏览器")),n.abrupt("return");case 4:if(o=(c=c||{}).url||location.href,a=c.signData,s=config.wxShareDebug,a){n.next=13;break}return n.next=11,(i=o,O({url:A+"/pet-api/wx/sign",data:{url:encodeURIComponent(i)},type:"get"})).catch(function(n){t(new Error("sign error "+(n.code||"")+" "+(n.msg||"")))});case 11:r=n.sent,a={appId:r.data.appId,timestamp:r.data.timestamp,nonceStr:r.data.nonceStr,signature:r.data.signature};case 13:a.debug=!0===s,a.jsApiList=c.jsApiList,console.log(a),w.a.config(a),w.a.ready(function(n){console.log("ready"),console.log(n),e(a)}),w.a.error(function(n){console.log("error"),console.log(n),t(n)});case 19:case"end":return n.stop()}var i},n,D)})),function(n,i){return t.apply(this,arguments)}))).then(function(n){w.a.onMenuShareTimeline(o),w.a.onMenuShareAppMessage(o),w.a.onMenuShareQQ(o),w.a.onMenuShareWeibo(o),w.a.onMenuShareQZone(o),i(n)}).catch(function(n){e(n)})})},E=(config.downloadApp,config.imgList,config.shareTitle,config.shareDescribe,envConfig.shareDomain,config.downloadApp),P=M.weixin,I=config.imgList,j=config.shareTitle,W=config.shareDescribe,U=envConfig.shareDomain+"/static/content/html5/byvue/dist/2020/08/miaoshadogactivity/index.html",Q={data:function(){return{shareTitle:j,shareDescribe:W,fullurl:U,imgList:I}},created:function(){if(P){var n={};n.title=this.shareTitle,n.desc=this.shareDescribe,T(n)}else v("1,2",this.shareTitle,this.shareDescribe,this.fullurl)},methods:{downloadApp:E,goGoods:function(n){if(console.log(n),P)this.downloadApp();else if(g.platform.android){var i=n.toString();window.fromh5data.goGoodsDetail(i)}else g.platform.iPhone&&(window.location.href="pethome://goGoodsDetail_"+n)}}},R={render:function(){var i=this,n=i.$createElement,e=i._self._c||n;return e("div",{staticClass:"container"},[e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[0],alt:""}})]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[1],alt:""}}),i._v(" "),e("div",{staticClass:"box3"},[e("div",{on:{click:function(n){i.goGoods(2429)}}}),i._v(" "),e("div",[e("div",{on:{click:function(n){i.goGoods(2462)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(2512)}}})])])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[2],alt:""}}),i._v(" "),e("div",{staticClass:"box1"},[e("div",{on:{click:function(n){i.goGoods(2386)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(1428)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[3],alt:""}}),i._v(" "),e("div",{staticClass:"box2"},[e("div",{on:{click:function(n){i.goGoods(2503)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(1646)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[4],alt:""}}),i._v(" "),e("div",{staticClass:"box2"},[e("div",{on:{click:function(n){i.goGoods(1171)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(1648)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[5],alt:""}}),i._v(" "),e("div",{staticClass:"box2"},[e("div",{on:{click:function(n){i.goGoods(1400)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(2506)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[6],alt:""}}),i._v(" "),e("div",{staticClass:"box2"},[e("div",{on:{click:function(n){i.goGoods(2169)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(1358)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[7],alt:""}}),i._v(" "),e("div",{staticClass:"box2"},[e("div",{on:{click:function(n){i.goGoods(1339)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(1301)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[8],alt:""}}),i._v(" "),e("div",{staticClass:"box2"},[e("div",{on:{click:function(n){i.goGoods(1620)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(2394)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[9],alt:""}}),i._v(" "),e("div",{staticClass:"box4"},[e("div",{on:{click:function(n){i.goGoods(1333)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(2511)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(1279)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(1584)}}})])]),i._v(" "),e("div",{staticClass:"imgbgc"},[e("img",{attrs:{src:i.imgList[10],alt:""}}),i._v(" "),e("div",{staticClass:"box2"},[e("div",{on:{click:function(n){i.goGoods(2481)}}}),i._v(" "),e("div",{on:{click:function(n){i.goGoods(2166)}}})])])])},staticRenderFns:[]};var X=e("VU/8")(Q,R,!1,function(n){e("xyWl")},null,null).exports;e("UoMW");!function(n,i){if((i=i||{}).favicon){var e=[];n.querySelector('link[rel="shortcut icon"]')&&e.push(n.querySelector('link[rel="shortcut icon"]')),n.querySelector('link[rel="icon"]')&&e.push(n.querySelector('link[rel="icon"]')),n.querySelector('link[rel="apple-touch-icon-precomposed"]')&&e.push(n.querySelector('link[rel="apple-touch-icon-precomposed"]'));var t=!0,o=!1,a=void 0;try{for(var s,r=l()(e);!(t=(s=r.next()).done);t=!0){s.value.setAttribute("href",i.favicon)}}catch(n){o=!0,a=n}finally{try{!t&&r.return&&r.return()}finally{if(o)throw a}}}}(document,config),window.Toast=o.a,new a.default({components:{index:X},render:function(n){return n(X)}}).$mount("#app")},"34+y":function(n,i){},UoMW:function(n,i){var e,t,o,a,s,r;e=document,t=window,o=e.documentElement,a=t.config.pageWidth,s="orientationchange"in t?"orientationchange":"resize",r=function(){var n=o.clientWidth;o.style.fontSize=0<a?(n&&n<a?n:a)/7.5+"px":n/7.5+"px"},e.addEventListener&&(t.addEventListener(s,r,!1),e.addEventListener("DOMContentLoaded",r,!1),setTimeout(function(){0===parseInt(e.defaultView.getComputedStyle(o).fontSize)&&r()},3e3))},xyWl:function(n,i){}},["2a1T"]);
//# sourceMappingURL=app.50f04ca725c564a84214.js.map