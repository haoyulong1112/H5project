webpackJsonp([1],{"8tbv":function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/icon.png"},AlY4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("/5sW"),i=n("//Fk"),l=n.n(i),r=n("pFYg"),d=n.n(r),s=n("fZjL"),f=n.n(s),a=[],c=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new l.a(function(e,n){var o=t.url;if(!t.concurrent){if(o=o.split("?")[0],-1!==a.indexOf(o))return void n(new Error("请求并发 "+o));a.push(o)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},r=t.type?t.type.toUpperCase():"POST",s=t.url||"",a=t.contentType||"application/x-www-form-urlencoded",c=t.data||{},u=!1!==t.async;return new l.a(function(e,n){var o={};o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var i="";f()(c).forEach(function(t){i+=t+"="+c[t]+"&"}),i=i.substr(0,i.lastIndexOf("&")),"GET"==r?(s=i?s+"?"+i:s,o.open(r,s,u),o.setRequestHeader("Content-type",a),o.send()):"POST"==r?(c.system&&(s=0<s.indexOf("?")?s+"&system="+c.system:s+"?system="+c.system),o.open(r,s,u),o.setRequestHeader("Content-type",a),o.send(i)):n(new Error("不支持的type")),o.onreadystatechange=function(){if(4==o.readyState)if(200==o.status){var t=o.response;"object"!==(void 0===t?"undefined":d()(t))&&(t=JSON.parse(t)),e(t)}else n(o)}})})(t).then(function(t){"200"===t.code?e(t):0===t.errno?e(t):n(t)}).catch(function(t){n(t)}).finally(function(){var t=a.indexOf(o);-1!==t&&a.splice(t,1)})})},u=envConfig.requestDomain,p=function(t){return c({url:u+"/club-room/programme/queryProgrammeInfo",data:t})},h=(String,String,Number,String,{name:"showtoast",data:function(){return{showRule:!1}},created:function(){},methods:{showtime:function(){var t=this;this.showRule=!0,setTimeout(function(){t.showRule&&(t.showRule=!1)},2e3)}},props:{text:{type:String,default:"请注意格式"},bgc:{type:String,default:"background-color: #000; color: #fff;opacity: 0.8;"},height:{type:Number,default:1.4},top:{type:String,default:"top: 5rem;"}}}),v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.showRule,expression:"showRule"}],staticClass:"toastbox",style:t.top},[n("div",{staticClass:"toast",style:t.bgc},[t._v(t._s(t.text))])])},staticRenderFns:[]};var m=n("VU/8")(h,v,!1,function(t){n("msBG")},"data-v-227e6b76",null).exports,g=n("BO1k"),w=n.n(g),y=function(){var t=window.location.href.split("?"),e={};if(1<t.length){var n=t[1],o=-1!==n.indexOf("%23/")?n.indexOf("%23/"):n.indexOf("#/");-1!==o&&(n=n.substr(0,o));var i=!0,r=!1,s=void 0;try{for(var a,c=w()(n.split("&"));!(i=(a=c.next()).done);i=!0){var u=a.value.split("=");u[0]&&(e[u[0]]=u[1]||"")}}catch(t){r=!0,s=t}finally{try{!i&&c.return&&c.return()}finally{if(r)throw s}}}return e},_=(y(),y()),x={name:"index",data:function(){return{date:"",title:"",introduce:"",othersInfos:[],shoetext:"",id:"",type:""}},components:{showtoast:m},created:function(){this.id=_.id,this.type=_.type,this.$nextTick(function(){var r=this,t={programeId:_.id};t.programeId?p(t).then(function(t){if(console.log(t),"200"==t.code){var e=t.data.programmeInfo.createTime||"",n=t.data.programmeInfo.title||"",o=t.data.programmeInfo.introduce||"";if(r.title=n,r.introduce=o,r.othersInfos=t.data.othersInfos,e){var i=r.timestampToTime(e).split(":");r.date=i[0]+":"+i[1],console.log(r.date)}}else r.shoetext="参数错误",r.$refs.showtoast.showtime()}).catch(function(t){r.shoetext=t.msg||"系统异常",r.$refs.showtoast.showtime()}):(this.shoetext="缺少参数",this.$refs.showtoast.showtime())})},methods:{timestampToTime:function(t){var e=new Date(t);return e.getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},openApp:function(t){window.location.href=1==t?"https://www.huitingdata.com?id="+this.id+"&type="+this.type:"https://www.huitingdata.com"}}},S={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"share1-top"},[e._m(0),e._v(" "),n("div",{on:{click:e.openApp}},[e._v("打开应用程序")])]),e._v(" "),n("div",{staticClass:"content"},[n("div",[e._v(e._s(e.date))]),e._v(" "),n("div",[e._v(e._s(e.title))]),e._v(" "),n("div",e._l(e.othersInfos,function(t,e){return n("img",{key:"a"+e,attrs:{src:t.headPic,alt:""}})})),e._v(" "),n("div",[e._v(e._s(e.introduce))])]),e._v(" "),n("div",{staticClass:"chakan",on:{click:function(t){e.openApp(1)}}},[e._v("查看完整事件")]),e._v(" "),n("div",{staticClass:"des"},[e._v("还没俱乐部账号？ 获取应用程序尽早访问吧")]),e._v(" "),e._m(1),e._v(" "),n("showtoast",{ref:"showtoast",attrs:{text:e.shoetext}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:n("8tbv"),alt:""}}),this._v("闲聊")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"appstore"},[e("img",{attrs:{src:n("JnST"),alt:""}})])}]};var b=n("VU/8")(x,S,!1,function(t){n("L7mF")},null,null).exports;n("UoMW");!function(t,e){if((e=e||{}).favicon){var n=[];t.querySelector('link[rel="shortcut icon"]')&&n.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&n.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&n.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var o=!0,i=!1,r=void 0;try{for(var s,a=w()(n);!(o=(s=a.next()).done);o=!0){s.value.setAttribute("href",e.favicon)}}catch(t){i=!0,r=t}finally{try{!o&&a.return&&a.return()}finally{if(i)throw r}}}}(document,config),new o.a({components:{index:b},render:function(t){return t(b)}}).$mount("#app")},JnST:function(t,e,n){t.exports=n.p+"../../../static/images/202103/share1/appstore.png"},L7mF:function(t,e){},UoMW:function(t,e){var n,o,i,r,s,a;n=document,o=window,i=n.documentElement,r=o.config.pageWidth,s="orientationchange"in o?"orientationchange":"resize",a=function(){var t=i.clientWidth;i.style.fontSize=0<r?(t&&t<r?t:r)/7.5+"px":t/7.5+"px",o.rem=t/7.5},n.addEventListener&&(o.addEventListener(s,a,!1),n.addEventListener("DOMContentLoaded",a,!1),setTimeout(function(){0===parseInt(n.defaultView.getComputedStyle(i).fontSize)&&a()},3e3))},msBG:function(t,e){}},["AlY4"]);
//# sourceMappingURL=app.eb4f5ec76cd4e0364896.js.map