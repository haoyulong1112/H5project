webpackJsonp([1],{"0yGK":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/xx.png"},"4qCl":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/clubicon.png"},"8tbv":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/icon.png"},JnST:function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/appstore.png"},M9gT:function(t,e){},Tc7L:function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/lt1.png"},UoMW:function(t,e){var n,i,r,a,s,o;n=document,i=window,r=n.documentElement,a=i.config.pageWidth,s="orientationchange"in i?"orientationchange":"resize",o=function(){var t=r.clientWidth;r.style.fontSize=0<a?(t&&t<a?t:a)/7.5+"px":t/7.5+"px",i.rem=t/7.5},n.addEventListener&&(i.addEventListener(s,o,!1),n.addEventListener("DOMContentLoaded",o,!1),setTimeout(function(){0===parseInt(n.defaultView.getComputedStyle(r).fontSize)&&o()},3e3))},"WLw/":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/lt.png"},bYWS:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("/5sW"),i=r("//Fk"),l=r.n(i),a=r("pFYg"),d=r.n(a),s=r("fZjL"),p=r.n(s),o=[],c=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new l.a(function(e,n){var i=t.url;if(!t.concurrent){if(i=i.split("?")[0],-1!==o.indexOf(i))return void n(new Error("请求并发 "+i));o.push(i)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},a=t.type?t.type.toUpperCase():"POST",s=t.url||"",o=t.contentType||"application/x-www-form-urlencoded",c=t.data||{},u=!1!==t.async;return new l.a(function(e,n){var i={};i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var r="";p()(c).forEach(function(t){r+=t+"="+c[t]+"&"}),r=r.substr(0,r.lastIndexOf("&")),"GET"==a?(s=r?s+"?"+r:s,i.open(a,s,u),i.setRequestHeader("Content-type",o),i.send()):"POST"==a?(c.system&&(s=0<s.indexOf("?")?s+"&system="+c.system:s+"?system="+c.system),i.open(a,s,u),i.setRequestHeader("Content-type",o),i.send(r)):n(new Error("不支持的type")),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var t=i.response;"object"!==(void 0===t?"undefined":d()(t))&&(t=JSON.parse(t)),e(t)}else n(i)}})})(t).then(function(t){"200"===t.code?e(t):0===t.errno?e(t):n(t)}).catch(function(t){n(t)}).finally(function(){var t=o.indexOf(i);-1!==t&&o.splice(t,1)})})},u=envConfig.requestDomain,v=function(t){return c({url:u+"/club-room/room/queryRoomShareInfo",data:t})},f=r("BO1k"),m=r.n(f),h=function(){var t=window.location.href.split("?"),e={};if(1<t.length){var n=t[1],i=-1!==n.indexOf("%23/")?n.indexOf("%23/"):n.indexOf("#/");-1!==i&&(n=n.substr(0,i));var r=!0,a=!1,s=void 0;try{for(var o,c=m()(n.split("&"));!(r=(o=c.next()).done);r=!0){var u=o.value.split("=");u[0]&&(e[u[0]]=u[1]||"")}}catch(t){a=!0,s=t}finally{try{!r&&c.return&&c.return()}finally{if(a)throw s}}}return e},_=(h(),h()),y={name:"index",data:function(){return{name:"",instructions:"",headpic:[],nickname:[],totalUserCount:0,speakersCount:0,roomStatus:1,id:"",type:""}},created:function(){var i=this;this.id=_.id,this.type=_.type;var t={channel:_.id};v(t).then(function(t){if(console.log(t),"200"==t.code){i.name=t.data.name,i.instructions=t.data.instructions,i.totalUserCount=t.data.totalUserCount,i.speakersCount=t.data.speakersCount;var e=t.data.speakers;for(var n in i.roomStatus=t.data.roomStatus,e)n<2&&i.headpic.push(e[n]),n<3&&i.nickname.push(e[n])}})},methods:{openApp:function(t){window.location.href=1==t?"https://www.huitingdata.com?id="+this.id+"&type="+this.type:"https://www.huitingdata.com"}}},g={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"share1-top"},[n._m(0),n._v(" "),i("div",{on:{click:n.openApp}},[n._v("打开应用程序")])]),n._v(" "),1==n.roomStatus?i("div",{staticClass:"content"},[i("div",[n._v(n._s(n.name)),i("img",{attrs:{src:r("4qCl"),alt:""}})]),n._v(" "),i("div",[n._v(n._s(n.instructions))]),n._v(" "),i("div",[i("div",n._l(n.headpic,function(t,e){return i("img",{key:"a"+e,attrs:{src:t.headPic,alt:""}})})),n._v(" "),i("div",n._l(n.nickname,function(t,e){return i("p",{key:"b"+e},[n._v(n._s(t.nikeName)),i("img",{attrs:{src:r("Tc7L"),alt:""}})])}))]),n._v(" "),i("div",[i("span",[n._v(n._s(n.totalUserCount))]),n._v(" "),i("img",{attrs:{src:r("w87E"),alt:""}}),n._v("/"),i("span",[n._v(n._s(n.speakersCount))]),n._v(" "),i("img",{attrs:{src:r("WLw/"),alt:""}})])]):n._e(),n._v(" "),0==n.roomStatus?i("div",{staticClass:"download"},[n._m(1),n._v(" "),n._m(2),n._v(" "),i("div",{on:{click:n.openApp}},[n._v("下载")])]):n._e(),n._v(" "),0==n.roomStatus?i("div",{staticClass:"status"},[i("div",[n._v("这个房间已经结束")]),n._v(" "),i("div",[n._v("但是现在又有更多的正在开启")])]):n._e(),n._v(" "),0==n.roomStatus?i("div",{staticClass:"chakan",on:{click:function(t){n.openApp(1)}}},[n._v("查看完整事件")]):n._e(),n._v(" "),i("div",{staticClass:"des"},[n._v("还没俱乐部账号？ 获取应用程序尽早访问吧")]),n._v(" "),n._m(3)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:r("8tbv"),alt:""}}),this._v("闲聊")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:r("8tbv"),alt:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[t._v("闲聊")]),t._v(" "),n("div",[t._v("社交网络")]),t._v(" "),n("div",[n("img",{attrs:{src:r("0yGK"),alt:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"appstore"},[e("img",{attrs:{src:r("JnST"),alt:""}})])}]};var w=r("VU/8")(y,g,!1,function(t){r("M9gT")},null,null).exports;r("UoMW");!function(t,e){if((e=e||{}).favicon){var n=[];t.querySelector('link[rel="shortcut icon"]')&&n.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&n.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&n.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var i=!0,r=!1,a=void 0;try{for(var s,o=m()(n);!(i=(s=o.next()).done);i=!0){s.value.setAttribute("href",e.favicon)}}catch(t){r=!0,a=t}finally{try{!i&&o.return&&o.return()}finally{if(r)throw a}}}}(document,config),new n.a({components:{index:w},render:function(t){return t(w)}}).$mount("#app")},w87E:function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/ren.png"}},["bYWS"]);
//# sourceMappingURL=app.9681817081fd0022a0bc.js.map