webpackJsonp([1],{HRfX:function(e,n){},UoMW:function(e,n){var t,i,o,s,r,a;t=document,i=window,o=t.documentElement,s=i.config.pageWidth,r="orientationchange"in i?"orientationchange":"resize",a=function(){var e=o.clientWidth;o.style.fontSize=0<s?(e&&e<s?e:s)/7.5+"px":e/7.5+"px",i.rem=e/7.5},t.addEventListener&&(i.addEventListener(r,a,!1),t.addEventListener("DOMContentLoaded",a,!1),setTimeout(function(){0===parseInt(t.defaultView.getComputedStyle(o).fontSize)&&a()},3e3))},"t/vQ":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("/5sW"),o=t("mvHQ"),s=t.n(o),r=navigator.userAgent,a={android:-1<r.indexOf("Android")||-1<r.indexOf("Linux"),ios:-1<r.indexOf("iPhone")||-1<r.indexOf("iPad"),iphone:-1<r.indexOf("iPhone"),weixin:-1<r.toLowerCase().indexOf("micromessenger")},c=t("BO1k"),p=t.n(c),l=function(){var e=window.location.href.split("?"),n={};if(1<e.length){var t=e[1],i=-1!==t.indexOf("%23/")?t.indexOf("%23/"):t.indexOf("#/");-1!==i&&(t=t.substr(0,i));var o=!0,s=!1,r=void 0;try{for(var a,c=p()(t.split("&"));!(o=(a=c.next()).done);o=!0){var l=a.value.split("=");l[0]&&(n[l[0]]=l[1]||"")}}catch(e){s=!0,r=e}finally{try{!o&&c.return&&c.return()}finally{if(s)throw r}}}return n},d=l(),u=[];d.system&&(u=d.system.split("_"));var h,f={android:-1<u.findIndex(function(e){return"android"===e}),ios:-1<u.findIndex(function(e){return"ios"===e}),version:u[1]?""+u[1]:"",Terminal:{platform:(h=navigator.userAgent,{android:-1<h.indexOf("Android")||-1<h.indexOf("Linux"),iPhone:-1<h.indexOf("iPhone"),iPad:-1<h.indexOf("iPad")}),language:(navigator.browserLanguage||navigator.language).toLowerCase()}},v=t("fxnj"),g=t.n(v),m=function(e){var n=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:window.location.href).split("#")[0].split("23%")[0].split("?"),t=n[0],i=n[1]?n[1].split("&"):[],o={},s=!0,r=!1,a=void 0;try{for(var c,l=p()(i);!(s=(c=l.next()).done);s=!0){var d=c.value;o[d.split("=")[0]]=d.split("=")[1]||""}}catch(e){r=!0,a=e}finally{try{!s&&l.return&&l.return()}finally{if(r)throw a}}var u="",h=function(e,n){var t={};for(var i in e)t[i]=e[i];for(var o in n)t[o]=n[o];return t}(o,e);for(var f in h)u+=f+"="+h[f]+"&";return t+(u?"?"+u.substring(0,u.length-1):"")},w=function(){f.android&&window.fromh5data.login(),f.ios&&(window.location.href="pethome://login")},y=t("//Fk"),x=t.n(y),_=t("pFYg"),C=t.n(_),O=t("fZjL"),b=t.n(O),T=[],P=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new x.a(function(n,t){var i=e.url;if(!e.concurrent){if(i=i.split("?")[0],-1!==T.indexOf(i))return void t(new Error("请求并发 "+i));T.push(i)}(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},s=e.type?e.type.toUpperCase():"POST",r=e.url||"",a=e.contentType||"application/x-www-form-urlencoded",c=e.data||{},l=!1!==e.async;return new x.a(function(n,t){var i={};i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var o="";b()(c).forEach(function(e){o+=e+"="+c[e]+"&"}),o=o.substr(0,o.lastIndexOf("&")),"GET"==s?(r=o?r+"?"+o:r,i.open(s,r,l),i.setRequestHeader("Content-type",a),i.send()):"POST"==s?(c.system&&(r=0<r.indexOf("?")?r+"&system="+c.system:r+"?system="+c.system),i.open(s,r,l),i.setRequestHeader("Content-type",a),i.send(o)):t(new Error("不支持的type")),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var e=i.response;"object"!==(void 0===e?"undefined":C()(e))&&(e=JSON.parse(e)),n(e)}else t(i)}})})(e).then(function(e){0===e.code?n(e):0===e.errno?n(e):t(e)}).catch(function(e){t(e)}).finally(function(){var e=T.indexOf(i);-1!==e&&T.splice(e,1)})})},k=envConfig.misrequestDomain,M=function(e){return P({url:k+"/mis/coupon/api/sendcouponbyhd",data:e,type:"get"})},I=(l(),envConfig.shareDomain,config.couponJson,config.shareImg,l()),S=a.weixin,j=envConfig.shareDomain+"/static/content/html5/byvue/dist/2020/11/newshopgetCoupom/index.html",E=config.couponJson,L=config.shareImg,q={data:function(){return{shareweixn:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/16062168431302119003.png",successImg:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/16062054875845371830.png",showToast:!1,showshare:!1,shopMsg:{},phone:""}},created:function(){this.system=f,this.phone=I.cellPhone||"";var e=I.shopId;for(var n in E)E[n].shopId==e&&(this.shopMsg=E[n]);S||(window.init_roll=function(e){var n=m({cellPhone:e});window.location.href=n}),document.getElementById("js-p-share-sharefriendimg").setAttribute("content",L);var t=document.getElementById("js-p-share-shareobj"),i={webpageUrl:j,imgurl:L,title:this.shopMsg.shareTitle,description:this.shopMsg.shareTitle,path:"pages/index/index"};this.shareObjstr=s()(i),t.setAttribute("content",this.shareObjstr)},methods:{getCoupon:function(e){var n=this;if(console.log(e),console.log(this.phone),this.phone){var t={coupontid:e,phonestr:this.phone,num:1};M(t).then(function(e){console.log(e),0==e.errno&&(n.showToast=!0)})}else S?g.a.miniProgram.navigateTo({url:"/pages/loginstyle/loginstyle?source=web"}):w()},goappoent:function(){S?g.a.miniProgram.switchTab({url:"/pages/index/index"}):f.Terminal.platform.android?window.fromh5lucy.hairdressing(""):f.Terminal.platform.iPhone&&(window.location.href="pethome://hairdressing")},close:function(){this.showToast=!1},shareBegin:function(){S?alert("请点击右上角分享给好友"):this.showshare=!0},shareBtn:function(){f.Terminal.platform.android&&window.fromh5lucy.miniProgramShare(this.shareObjstr),f.Terminal.platform.iPhone&&(window.location.href="pethome://WXMiniProgram"),this.showshare=!1},closeshare:function(){this.showshare=!1}}},A={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{staticClass:"imgbox"},[i("img",{staticClass:"bgc",attrs:{src:t.shopMsg.bgcImg,alt:""}}),t._v(" "),i("div",{staticClass:"acTime"},[t._v("活动时间："+t._s(t.shopMsg.avtivityTime))]),t._v(" "),i("img",{staticClass:"coupon",attrs:{src:t.shopMsg.couponImg,alt:""},on:{click:function(e){t.getCoupon(t.shopMsg.couponId)}}}),t._v(" "),i("div",{staticClass:"rule"},[t._m(0),t._v(" "),i("div",{staticClass:"ruletext"},t._l(t.shopMsg.rule,function(e,n){return i("p",{key:"a"+n},[t._v(t._s(n+1)+". "+t._s(e))])}))]),t._v(" "),i("div",{staticClass:"share",on:{click:t.shareBegin}})]),t._v(" "),t.showToast?i("div",{staticClass:"toastdiv"},[i("div",{staticClass:"imgdiv"},[i("img",{attrs:{src:t.successImg,alt:""},on:{click:t.goappoent}}),t._v(" "),i("div",{staticClass:"close",on:{click:function(e){return e.stopPropagation(),t.close(e)}}},[t._v("×")])])]):t._e(),t._v(" "),t.showshare?i("div",{staticClass:"sharediv"},[i("img",{attrs:{src:t.shareweixn,alt:""}}),t._v(" "),i("div",{staticClass:"shareBtn",on:{click:t.shareBtn}}),t._v(" "),i("div",{staticClass:"closeshare",on:{click:t.closeshare}})]):t._e()])},staticRenderFns:[function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"title"},[this._v("活动规则"),n("span")])}]};var B=t("VU/8")(q,A,!1,function(e){t("HRfX")},null,null).exports;t("UoMW");!function(e,n){if((n=n||{}).favicon){var t=[];e.querySelector('link[rel="shortcut icon"]')&&t.push(e.querySelector('link[rel="shortcut icon"]')),e.querySelector('link[rel="icon"]')&&t.push(e.querySelector('link[rel="icon"]')),e.querySelector('link[rel="apple-touch-icon-precomposed"]')&&t.push(e.querySelector('link[rel="apple-touch-icon-precomposed"]'));var i=!0,o=!1,s=void 0;try{for(var r,a=p()(t);!(i=(r=a.next()).done);i=!0){r.value.setAttribute("href",n.favicon)}}catch(e){o=!0,s=e}finally{try{!i&&a.return&&a.return()}finally{if(o)throw s}}}}(document,config);var H=t("Au9i");window.Toast=H.Toast,new i.default({components:{index:B},render:function(e){return e(B)}}).$mount("#app")}},["t/vQ"]);
//# sourceMappingURL=app.fa34f6bc6a59c6a8b130.js.map