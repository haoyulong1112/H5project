webpackJsonp([1],{"/vr9":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/download.png"},"0yGK":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/xx.png"},"4qCl":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/clubicon.png"},"8tbv":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/icon.png"},DulC:function(t,e){},JnST:function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/appstore.png"},Tc7L:function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/lt1.png"},UoMW:function(t,e){var n,i,r,s,a,o;n=document,i=window,r=n.documentElement,s=i.config.pageWidth,a="orientationchange"in i?"orientationchange":"resize",o=function(){var t=r.clientWidth;r.style.fontSize=0<s?(t&&t<s?t:s)/7.5+"px":t/7.5+"px",i.rem=t/7.5},n.addEventListener&&(i.addEventListener(a,o,!1),n.addEventListener("DOMContentLoaded",o,!1),setTimeout(function(){0===parseInt(n.defaultView.getComputedStyle(r).fontSize)&&o()},3e3))},"WLw/":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/lt.png"},bYWS:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("/5sW"),i=r("//Fk"),d=r.n(i),s=r("pFYg"),v=r.n(s),a=r("fZjL"),l=r.n(a),o=[],c=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new d.a(function(e,n){var i=t.url;if(!t.concurrent){if(i=i.split("?")[0],-1!==o.indexOf(i))return void n(new Error("请求并发 "+i));o.push(i)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},s=t.type?t.type.toUpperCase():"POST",a=t.url||"",o=t.contentType||"application/x-www-form-urlencoded",c=t.data||{},u=!1!==t.async;return new d.a(function(e,n){var i={};i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var r="";l()(c).forEach(function(t){r+=t+"="+c[t]+"&"}),r=r.substr(0,r.lastIndexOf("&")),"GET"==s?(a=r?a+"?"+r:a,i.open(s,a,u),i.setRequestHeader("Content-type",o),i.send()):"POST"==s?(c.system&&(a=0<a.indexOf("?")?a+"&system="+c.system:a+"?system="+c.system),i.open(s,a,u),i.setRequestHeader("Content-type",o),i.send(r)):n(new Error("不支持的type")),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var t=i.response;"object"!==(void 0===t?"undefined":v()(t))&&(t=JSON.parse(t)),e(t)}else n(i)}})})(t).then(function(t){"200"===t.code?e(t):0===t.errno?e(t):n(t)}).catch(function(t){n(t)}).finally(function(){var t=o.indexOf(i);-1!==t&&o.splice(t,1)})})},u=envConfig.requestDomain,p=function(t){return c({url:u+"/club-room/room/queryRoomShareInfo",data:t})},f=r("BO1k"),h=r.n(f),m=function(){var t=window.location.href.split("?"),e={};if(1<t.length){var n=t[1],i=-1!==n.indexOf("%23/")?n.indexOf("%23/"):n.indexOf("#/");-1!==i&&(n=n.substr(0,i));var r=!0,s=!1,a=void 0;try{for(var o,c=h()(n.split("&"));!(r=(o=c.next()).done);r=!0){var u=o.value.split("=");u[0]&&(e[u[0]]=u[1]||"")}}catch(t){s=!0,a=t}finally{try{!r&&c.return&&c.return()}finally{if(s)throw a}}}return e},_=(m(),m()),g={name:"index",data:function(){return{name:"",instructions:"",headpic:[],nickname:[],totalUserCount:0,speakersCount:0,roomStatus:1,id:"",type:"",checkId:"",showMask:!1}},created:function(){var i=this;this.id=_.id,this.type=_.type||"",this.checkId=_.checkId||"";var t={channel:_.id};p(t).then(function(t){if("200"==t.code){i.name=t.data.name,i.instructions=t.data.instructions,i.totalUserCount=t.data.totalUserCount,i.speakersCount=t.data.speakersCount;var e=t.data.speakers;for(var n in i.roomStatus=t.data.roomStatus,e)n<2&&i.headpic.push(e[n]),n<3&&i.nickname.push(e[n])}})},methods:{openApp:function(t){this.isQQorWeiBo()?this.showMask=!0:window.location.href=1==t?"https://www.huitingdata.com?id="+this.id+"&type="+this.type+"&checkId="+this.checkId:"https://www.huitingdata.com"},isQQorWeiBo:function(){var t=!1,e=navigator.userAgent.toLowerCase();return"qq"!=e.match(/QQ/i)&&"weibo"!=e.match(/WeiBo/i)||(t=!0),"micromessenger"==e.match("micromessenger")&&(t=!1),t}}},y={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"share1-top"},[n._m(0),n._v(" "),i("div",{on:{click:n.openApp}},[n._v("打开应用程序")])]),n._v(" "),1==n.roomStatus?i("div",{staticClass:"content"},[i("div",[n._v(n._s(n.name)),i("img",{attrs:{src:r("4qCl"),alt:""}})]),n._v(" "),i("div",[n._v(n._s(n.instructions))]),n._v(" "),i("div",[i("div",n._l(n.headpic,function(t,e){return i("img",{key:"a"+e,attrs:{src:t.headPic,alt:""}})})),n._v(" "),i("div",n._l(n.nickname,function(t,e){return i("p",{key:"b"+e},[n._v(n._s(t.nikeName)),i("img",{attrs:{src:r("Tc7L"),alt:""}})])}))]),n._v(" "),i("div",[i("span",[n._v(n._s(n.totalUserCount))]),n._v(" "),i("img",{attrs:{src:r("w87E"),alt:""}}),n._v("/"),i("span",[n._v(n._s(n.speakersCount))]),n._v(" "),i("img",{attrs:{src:r("WLw/"),alt:""}})])]):n._e(),n._v(" "),0==n.roomStatus?i("div",{staticClass:"download"},[n._m(1),n._v(" "),n._m(2),n._v(" "),i("div",{on:{click:n.openApp}},[n._v("下载")])]):n._e(),n._v(" "),0==n.roomStatus?i("div",{staticClass:"status"},[i("div",[n._v("这个房间已经结束")]),n._v(" "),i("div",[n._v("但是现在又有更多的正在开启")])]):n._e(),n._v(" "),0==n.roomStatus?i("div",{staticClass:"chakan",on:{click:function(t){n.openApp(1)}}},[n._v("查看完整事件")]):n._e(),n._v(" "),i("div",{staticClass:"des"},[n._v("还没俱乐部账号？ 获取应用程序尽早访问吧")]),n._v(" "),n._m(3),n._v(" "),n.showMask?i("div",{staticClass:"mask"},[i("img",{attrs:{src:r("/vr9"),alt:""}})]):n._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:r("8tbv"),alt:""}}),this._v("闲聊")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:r("8tbv"),alt:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[t._v("闲聊")]),t._v(" "),n("div",[t._v("社交网络")]),t._v(" "),n("div",[n("img",{attrs:{src:r("0yGK"),alt:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"appstore"},[e("img",{attrs:{src:r("JnST"),alt:""}})])}]};var w=r("VU/8")(g,y,!1,function(t){r("DulC")},null,null).exports;r("UoMW");!function(t,e){if((e=e||{}).favicon){var n=[];t.querySelector('link[rel="shortcut icon"]')&&n.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&n.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&n.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var i=!0,r=!1,s=void 0;try{for(var a,o=h()(n);!(i=(a=o.next()).done);i=!0){a.value.setAttribute("href",e.favicon)}}catch(t){r=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(r)throw s}}}}(document,config),new n.a({components:{index:w},render:function(t){return t(w)}}).$mount("#app")},w87E:function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/ren.png"}},["bYWS"]);
//# sourceMappingURL=app.16a7c92de15c79693480.js.map