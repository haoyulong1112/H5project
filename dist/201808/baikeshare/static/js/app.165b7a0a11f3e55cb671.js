webpackJsonp([1],{"34+y":function(t,e){},CTF1:function(t,e){},Mw0j:function(t,e){},UoMW:function(t,e){var n,o,a,i,r,s;n=document,o=window,a=n.documentElement,i=o.config.pageWidth,r="orientationchange"in o?"orientationchange":"resize",s=function(){var t=a.clientWidth;a.style.fontSize=0<i?(t&&t<i?t:i)/7.5+"px":t/7.5+"px"},n.addEventListener&&(o.addEventListener(r,s,!1),n.addEventListener("DOMContentLoaded",s,!1),setTimeout(function(){0===parseInt(n.defaultView.getComputedStyle(a).fontSize)&&s()},3e3))},VxWY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("34+y");var o=n("X+yh"),a=n.n(o),i=n("/5sW"),r=n("cTzj"),s=n.n(r),c=n("BO1k"),m=n.n(c),l=n("//Fk"),d=n.n(l),u=n("pFYg"),p=n.n(u),v=n("fZjL"),f=n.n(v),y=[],h=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new d.a(function(e,n){var o=t.url;if(!t.concurrent){if(o=o.split("?")[0],-1!==y.indexOf(o))return void n(new Error("请求并发 "+o));y.push(o)}(function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},i=t.type?t.type.toUpperCase():"POST",r=t.url||"",s=t.contentType||"application/x-www-form-urlencoded",c=t.data||{},l=!1!==t.async;return new d.a(function(e,n){var o={};o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject;var a="";f()(c).forEach(function(t){a+=t+"="+c[t]+"&"}),a=a.substr(0,a.lastIndexOf("&")),"GET"==i?(r=a?r+"?"+a:r,o.open(i,r,l),o.setRequestHeader("Content-type",s),o.send()):"POST"==i?(o.open(i,r,l),o.setRequestHeader("Content-type",s),o.send(a)):n(new Error("不支持的type")),o.onreadystatechange=function(){if(4==o.readyState)if(200==o.status){var t=o.response;"object"!==(void 0===t?"undefined":p()(t))&&(t=JSON.parse(t)),e(t)}else n(o)}})})(t).then(function(t){0===t.code?e(t):n(t)}).catch(function(t){n(t)}).finally(function(){var t=y.indexOf(o);-1!==t&&y.splice(t,1)})})},g=envConfig.requestDomain,w=(envConfig.manageDomain,envConfig.requestDomain),_=function(t){return h({url:w+"/pet-api/encyclopedia/info",data:t})},C=(envConfig.requestDomain,envConfig.requestDomain,function(){var t=window.location.href.split("?"),e={};if(1<t.length){var n=t[1],o=-1!==n.indexOf("%23/")?n.indexOf("%23/"):n.indexOf("#/");-1!==o&&(n=n.substr(0,o));var a=!0,i=!1,r=void 0;try{for(var s,c=m()(n.split("&"));!(a=(s=c.next()).done);a=!0){var l=s.value.split("=");l[0]&&(e[l[0]]=l[1]||"")}}catch(t){i=!0,r=t}finally{try{!a&&c.return&&c.return()}finally{if(i)throw r}}}return e}),x=n("Xxa5"),D=n.n(x),S=n("exGp"),b=n.n(S),P=n("fxnj"),L=n.n(P),O=navigator.userAgent,T=(-1<O.indexOf("Android")||O.indexOf("Linux"),-1<O.indexOf("iPhone")||O.indexOf("iPad"),O.indexOf("iPhone"),-1<O.toLowerCase().indexOf("micromessenger")),k=this,A=function(i){if(!T)return!1;var n,t=config.shareImg,r=config.wxShareDebug;return(i=i||{}).title=i.title||"",i.desc=i.desc||"",i.link=i.link||window.location.href,i.imgUrl=i.imgUrl||t,new d.a((n=b()(D.a.mark(function t(n,o){var a;return D.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(e=location.href,h({url:g+"/pet-api/wx/sign",data:{url:encodeURIComponent(e)},type:"get"})).catch(function(){o(new Error("sign error"))});case 2:0!==(a=t.sent).code&&o(new Error("sign code "+a.code+" "+a.msg)),L.a.config({debug:!0===r,appId:a.data.appId,timestamp:a.data.timestamp,nonceStr:a.data.nonceStr,signature:a.data.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareQQ"]}),i.success=function(t){n(t)},i.cancel=function(t){n(t)},L.a.ready(function(){L.a.onMenuShareAppMessage(i),L.a.onMenuShareTimeline(i),L.a.onMenuShareQQ(i)});case 8:case"end":return t.stop()}var e},t,k)})),function(t,e){return n.apply(this,arguments)}))},I=n("bOdI"),M=n.n(I),q=config.downloadApp,E=config.downloadLogo,j=config.downloadTitle,B=config.downloadDescription,$=(String,config.downloadApp),z=config.downloadLogo,U=config.downloadTitle,F=config.downloadDescription,R={name:"popup",props:{position:{type:String,default:"bottom"}},data:function(){return{style:M()({},this.position,0),downloadLogo:z,downloadTitle:U,downloadDescription:F}},methods:{downloadApp:$}},N={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.$style.download,style:t.style},[n("div",{class:t.$style.content},[n("img",{attrs:{src:t.downloadLogo,alt:"宠物家"}}),t._v(" "),n("div",{class:t.$style.slogen},[n("span",{domProps:{textContent:t._s(t.downloadTitle)}}),t._v(" "),n("span",{domProps:{textContent:t._s(t.downloadDescription)}})])]),t._v(" "),n("div",{class:t.$style.btn,on:{click:t.downloadApp}},[t._v("立即打开")])])},staticRenderFns:[]};var W=n("VU/8")(R,N,!1,function(t){this.$style=n("wJBi")},null,null).exports,V=(Boolean,Boolean,Boolean,Boolean,String,String,String,String,Object,{name:"popup",props:{controls:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!1},loop:{type:Boolean,default:!1},btnOnly:{type:Boolean,default:!0},preload:{type:String,default:"auto"},playsinline:{type:String,default:"true"},poster:{type:String,default:""},src:{type:String,default:""},videoStyle:{type:Object,default:function(t){return t||{width:"7.5rem",height:"4.22rem",background:"#000"}}}},data:function(){return{isPlay:this.autoplay}},methods:{videoPlay:function(t,e){if(t){var n=this.$refs.video;n.paused?(n.play(),this.isPlay=!0):(n.pause(),this.isPlay=!1)}"video"===e&&(this.isPlay&&(this.$refs.video.pause(),this.isPlay=!1))},videoEnd:function(){this.isPlay=!1}}}),G={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"video-comp",on:{click:function(t){e.videoPlay(!e.btnOnly,"video")}}},[n("video",{ref:"video",style:e.videoStyle,attrs:{controls:e.controls,autoplay:e.autoplay,loop:e.loop,preload:e.preload,"x5-playsinline":e.playsinline,poster:e.poster},on:{ended:e.videoEnd}},[n("source",{attrs:{src:e.src}}),e._v("\n    当前浏览器不支持播放此视频\n  ")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.isPlay,expression:"!isPlay"}],on:{click:function(t){t.stopPropagation(),e.videoPlay(!0)}}},[e._t("default",[n("img",{staticClass:"video-default-btn",attrs:{src:"http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15336408142824474541.png"}})])],2)])},staticRenderFns:[]};var H=n("VU/8")(V,G,!1,function(t){n("Mw0j")},"data-v-1d18cc3a",null).exports,X=config.userAvatar,J=(config.downloadApp,config.userAvatar),Q={name:"Index",data:function(){return{src:"",userAvatar:J,infoData:{},bannerData:{type:"",content:"",cover:""},titleData:{title:"",source:"",sourceIcon:"",releaseTimeStr:"",labelList:[]},contentData:[],commentData:{list:[],total:0}}},created:function(){var a=this,t=C().infoId;t?_({infoId:t}).then(function(t){var e=t.data.title||"",n=t.data.shareSubtitle||"",o=t.data.collectionCover||"";return document.title=e,a.infoFilter(t.data),A({title:e,desc:n,imgUrl:o})}).catch(function(t){var e=t.msg||"";e&&Toast(e)}):Toast("infoId not found in url")},methods:{downloadApp:config.downloadApp,infoFilter:function(t){if((this.infoData=t).topContent&&t.topContent.type){var e=t.topContent.type;this.bannerData.type=e,t.topContent&&t.topContent.content&&(2==e?this.bannerData.content=t.topContent.content:3==e&&(this.bannerData.content=t.topContent.content,this.bannerData.cover=t.topContent.cover))}if(t.title&&(this.titleData.title=t.title),t.source&&(this.titleData.source=t.source),t.sourceIcon&&(this.titleData.sourceIcon=t.sourceIcon),t.releaseTimeStr&&(this.titleData.releaseTimeStr=t.releaseTimeStr),t.labelList&&t.labelList.length){var n=!0,o=!1,a=void 0;try{for(var i,r=m()(t.labelList);!(n=(i=r.next()).done);n=!0){var s=i.value;s.name&&this.titleData.labelList.push(s.name)}}catch(t){o=!0,a=t}finally{try{!n&&r.return&&r.return()}finally{if(o)throw a}}}var c=t.content;if(c&&c.length){var l=!0,d=!1,u=void 0;try{for(var p,v=m()(c);!(l=(p=v.next()).done);l=!0){var f=p.value;1==f.type&&(f.content=f.content.replace(/\n/g,"<br/>"))}}catch(t){d=!0,u=t}finally{try{!l&&v.return&&v.return()}finally{if(d)throw u}}this.contentData=c}void 0!==t.commentNum&&(this.commentData.total=t.commentNum),t.commentList&&t.commentList.length&&(this.commentData.list=t.commentList)}},components:{downloadComp:W,videoComp:H}},Y={render:function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("div",{staticClass:"index"},[o("div",{staticClass:"banner"},[2==n.bannerData.type?o("div",{on:{click:n.downloadApp}},[o("img",{attrs:{src:n.bannerData.content}})]):3==n.bannerData.type?o("div",{staticClass:"video"},[o("video-comp",{attrs:{src:n.bannerData.content,poster:n.bannerData.cover}})],1):n._e()]),n._v(" "),o("div",{staticClass:"title"},[o("div",{staticClass:"title-text"},[o("span",{domProps:{textContent:n._s(n.titleData.title)}})]),n._v(" "),o("div",{staticClass:"title-author"},[o("div",[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:{src:n.titleData.sourceIcon},expression:"{src: titleData.sourceIcon}"}]}),n._v(" "),o("span",{domProps:{textContent:n._s(n.titleData.source)}})]),n._v(" "),o("span",{domProps:{textContent:n._s(n.titleData.releaseTimeStr)}})]),n._v(" "),o("div",{staticClass:"title-tags"},n._l(n.titleData.labelList,function(t,e){return o("span",{key:"a"+t+e},[n._v(n._s(t))])}))]),n._v(" "),o("div",{staticClass:"content"},n._l(n.contentData,function(t,e){return o("div",{key:"b"+t+e},[1==t.type?o("div",[o("div",{domProps:{innerHTML:n._s(t.content)}})]):2==t.type?o("div",{on:{click:n.downloadApp}},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.content,expression:"item.content"}]})]):n._e()])})),n._v(" "),o("div",{staticClass:"comment"},[o("div",{staticClass:"comment-title"},[o("span",[n._v("评论")]),n._v(" "),o("span",{on:{click:n.downloadApp}},[n._v("共"+n._s(n.commentData.total)+"条评论"),o("span",[n._v(">")])])]),n._v(" "),o("div",{staticClass:"comment-list"},n._l(n.commentData.list,function(t,e){return o("div",{key:"c"+t+e,staticClass:"comment-item"},[o("div",{staticClass:"comment-item-info"},[o("div",[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:{src:t.avatar,error:n.userAvatar},expression:"{src: item.avatar, error: userAvatar}"}]}),n._v(" "),o("span",{domProps:{textContent:n._s(t.userName)}})]),n._v(" "),o("span",{domProps:{textContent:n._s(t.dateStr)}})]),n._v(" "),o("div",{staticClass:"comment-item-content"},[o("div",[o("span",{domProps:{textContent:n._s(t.content)}})])])])}))]),n._v(" "),o("img",{attrs:{src:n.src,alt:""}}),n._v(" "),o("img",{ref:"testimg"}),n._v(" "),o("div",{ref:"output"}),n._v(" "),o("download-comp")],1)},staticRenderFns:[]};var Z=n("VU/8")(Q,Y,!1,function(t){n("CTF1"),n("tC9f")},"data-v-07553746",null).exports;n("UoMW");!function(t,e){if((e=e||{}).favicon){var n=[];t.querySelector('link[rel="shortcut icon"]')&&n.push(t.querySelector('link[rel="shortcut icon"]')),t.querySelector('link[rel="icon"]')&&n.push(t.querySelector('link[rel="icon"]')),t.querySelector('link[rel="apple-touch-icon-precomposed"]')&&n.push(t.querySelector('link[rel="apple-touch-icon-precomposed"]'));var o=!0,a=!1,i=void 0;try{for(var r,s=m()(n);!(o=(r=s.next()).done);o=!0){r.value.setAttribute("href",e.favicon)}}catch(t){a=!0,i=t}finally{try{!o&&s.return&&s.return()}finally{if(a)throw i}}}}(document,config),i.default.use(s.a),window.Toast=a.a,new i.default({components:{index:Z},render:function(t){return t(Z)}}).$mount("#app")},tC9f:function(t,e){},wJBi:function(t,e){t.exports={download:"src-components--download-3Gy4G_0",content:"src-components--download-1qp7S_0",slogen:"src-components--download-32GTD_0",btn:"src-components--download-2em-R_0"}}},["VxWY"]);
//# sourceMappingURL=app.165b7a0a11f3e55cb671.js.map