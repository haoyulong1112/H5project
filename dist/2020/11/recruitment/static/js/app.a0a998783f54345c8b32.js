webpackJsonp([1],{"TI/3":function(e,n){},UoMW:function(e,n){var t,i,r,o,a,s;t=document,i=window,r=t.documentElement,o=i.config.pageWidth,a="orientationchange"in i?"orientationchange":"resize",s=function(){var e=r.clientWidth;r.style.fontSize=0<o?(e&&e<o?e:o)/7.5+"px":e/7.5+"px",i.rem=e/7.5},t.addEventListener&&(i.addEventListener(a,s,!1),t.addEventListener("DOMContentLoaded",s,!1),setTimeout(function(){0===parseInt(t.defaultView.getComputedStyle(r).fontSize)&&s()},3e3))},lGPf:function(e,n){},sHsR:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("/5sW"),r={render:function(){var e=this.$createElement;return(this._self._c||e)("router-view")},staticRenderFns:[]};var o=t("VU/8")(null,r,!1,function(e){t("lGPf")},null,null).exports,a=t("Au9i"),s=t("/ocq"),c=t("BO1k"),l=t.n(c),u=function(){var e=window.location.href.split("?"),n={};if(1<e.length){var t=e[1],i=-1!==t.indexOf("%23/")?t.indexOf("%23/"):t.indexOf("#/");-1!==i&&(t=t.substr(0,i));var r=!0,o=!1,a=void 0;try{for(var s,c=l()(t.split("&"));!(r=(s=c.next()).done);r=!0){var u=s.value.split("=");u[0]&&(n[u[0]]=u[1]||"")}}catch(e){o=!0,a=e}finally{try{!r&&c.return&&c.return()}finally{if(o)throw a}}}return n}(),f=[];u.system&&(f=u.system.split("_"));var d,h=-1<f.findIndex(function(e){return"android"===e}),m=-1<f.findIndex(function(e){return"ios"===e}),p=f[1]?""+f[1]:"",g=(d=navigator.userAgent,-1<d.indexOf("Android")||d.indexOf("Linux"),d.indexOf("iPhone"),d.indexOf("iPad"),(navigator.browserLanguage||navigator.language).toLowerCase(),function(e,n,t,i){var r=4<arguments.length&&void 0!==arguments[4]?arguments[4]:config.shareImg;h?function(e,n,t,i){var r=4<arguments.length&&void 0!==arguments[4]?arguments[4]:config.shareImg;h?e&&n&&t&&i?window.fromh5data.shareCardInfo(n,r,i,t,e):console.warn("setshareinfoandroid 缺少参数"):console.warn("setshareinfoandroid 不在安卓客户端内")}(e,n,t,i,r):m&&function(e,n,t){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:config.shareImg,r=document.querySelector('meta[name="sharetitle"]'),o=document.querySelector('meta[name="description"]'),a=document.querySelector('meta[name="shareimg"]'),s=document.querySelector('meta[name="shareurl"]');r&&o&&a&&s||console.warn("setshareinfoios 缺少标签"),e&&r&&r.setAttribute("content",e),n&&o&&o.setAttribute("content",n),i&&a&&a.setAttribute("content",i),t&&s&&s.setAttribute("content",t)}(n,t,i,r)}),v=t("//Fk"),w=t.n(v),x=t("fxnj"),y=t.n(x),S=t("Xxa5"),b=t.n(S),O=t("exGp"),q=t.n(O),C=t("pFYg"),M=t.n(C),A=t("fZjL"),T=t.n(A),L=[],k=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new w.a(function(n,t){var i=e.url;if(!e.concurrent){if(i=i.split("?")[0],-1!==L.indexOf(i))return void t(new Error("请求并发 "+i));L.push(i)}(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},o=e.type?e.type.toUpperCase():"POST",a=e.url||"",s=e.contentType||"application/x-www-form-urlencoded",c=e.data||{},u=!1!==e.async;return new w.a(function(n,t){var i={};i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var r="";T()(c).forEach(function(e){r+=e+"="+c[e]+"&"}),r=r.substr(0,r.lastIndexOf("&")),"GET"==o?(a=r?a+"?"+r:a,i.open(o,a,u),i.setRequestHeader("Content-type",s),i.send()):"POST"==o?(c.system&&(a=0<a.indexOf("?")?a+"&system="+c.system:a+"?system="+c.system),i.open(o,a,u),i.setRequestHeader("Content-type",s),i.send(r)):t(new Error("不支持的type")),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var e=i.response;"object"!==(void 0===e?"undefined":M()(e))&&(e=JSON.parse(e)),n(e)}else t(i)}})})(e).then(function(e){0===e.code?n(e):t(e)}).catch(function(e){t(e)}).finally(function(){var e=L.indexOf(i);-1!==e&&L.splice(e,1)})})},D=envConfig.requestDomain,I=(envConfig.manageDomain,envConfig.requestDomain,envConfig.requestDomain,envConfig.requestDomain,navigator.userAgent),j={android:-1<I.indexOf("Android")||-1<I.indexOf("Linux"),ios:-1<I.indexOf("iPhone")||-1<I.indexOf("iPad"),iphone:-1<I.indexOf("iPhone"),weixin:-1<I.toLowerCase().indexOf("micromessenger")},E=this,_=function(r,e){return new w.a(function(n,t){var c,i;(e=e||{}).jsApiList=e.jsApiList||["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"],(r=r||{}).link=r.link||window.location.href,r.imgUrl=r.imgUrl||config.shareImg,(c=e,new w.a((i=q()(b.a.mark(function e(t,i){var r,o,a,s;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("wxconfig",j),j.weixin){e.next=4;break}return i(new Error("wxconfig 非微信浏览器")),e.abrupt("return");case 4:if(r=(c=c||{}).url||location.href,o=c.signData,a=config.wxShareDebug,o){e.next=13;break}return e.next=11,(n=r,k({url:D+"/pet-api/wx/sign",data:{url:encodeURIComponent(n)},type:"get"})).catch(function(e){i(new Error("sign error "+(e.code||"")+" "+(e.msg||"")))});case 11:s=e.sent,o={appId:s.data.appId,timestamp:s.data.timestamp,nonceStr:s.data.nonceStr,signature:s.data.signature};case 13:o.debug=!0===a,o.jsApiList=c.jsApiList,console.log(o),y.a.config(o),y.a.ready(function(e){console.log("ready"),console.log(e),t(o)}),y.a.error(function(e){console.log("error"),console.log(e),i(e)});case 19:case"end":return e.stop()}var n},e,E)})),function(e,n){return i.apply(this,arguments)}))).then(function(e){y.a.onMenuShareTimeline(r),y.a.onMenuShareAppMessage(r),y.a.onMenuShareQQ(r),y.a.onMenuShareWeibo(r),y.a.onMenuShareQZone(r),n(e)}).catch(function(e){t(e)})})},P=((new Date).getTime(),envConfig.shareDomain,(new Date).getTime()),U=j.weixin,R=envConfig.shareDomain+"/static/content/html5/byvue/dist/2020/11/recruitment/index.html",W={name:"index",data:function(){return{shareTitle:"宠物家12家店齐开，招贤纳才，待遇优厚！",shareDescribe:"只要你热爱宠物行业，不限经验，不限学历，速速报名。",fullurl:""}},created:function(){if(this.fullurl=this.getFullUrl(R),U){var e={};e.title=this.shareTitle,e.desc=this.shareDescribe,_(e)}else g("1,2",this.shareTitle,this.shareDescribe,this.fullurl)},methods:{getFullUrl:function(e){if(e)return e+"?t="+P}},components:{}},F={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"content-img"},[n("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/16052540098326406310.jpg",alt:""}}),this._v(" "),n("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/16052540187896851175.jpg",alt:""}})]),this._v(" "),n("div",{staticClass:"btn-img"},[n("a",{attrs:{href:"http://petem100.mikecrm.com/BGIPSh6"}},[n("img",{attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/16052540245391949612.png",alt:""}})])])])}]};var H=t("VU/8")(W,F,!1,function(e){t("TI/3")},null,null).exports;i.default.use(s.a);var Q=new s.a({routes:[{path:"/",redirect:"/index"},{path:"/index",name:"index",component:H,meta:{title:"店长招聘"}}]});Q.beforeEach(function(e,n,t){var i;e.meta.title&&(i=e.meta.title,document.title=i,m&&"4.9.999"<p&&(window.location.href="pethome://changeTitle_"+i)),t()});var G=Q;t("UoMW");!function(e,n){if((n=n||{}).favicon){var t=[];e.querySelector('link[rel="shortcut icon"]')&&t.push(e.querySelector('link[rel="shortcut icon"]')),e.querySelector('link[rel="icon"]')&&t.push(e.querySelector('link[rel="icon"]')),e.querySelector('link[rel="apple-touch-icon-precomposed"]')&&t.push(e.querySelector('link[rel="apple-touch-icon-precomposed"]'));var i=!0,r=!1,o=void 0;try{for(var a,s=l()(t);!(i=(a=s.next()).done);i=!0){a.value.setAttribute("href",n.favicon)}}catch(e){r=!0,o=e}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}}}(document,config),window.Toast=a.Toast,new i.default({router:G,components:{index:o},render:function(e){return e(o)}}).$mount("#app")}},["sHsR"]);
//# sourceMappingURL=app.a0a998783f54345c8b32.js.map