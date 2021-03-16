
$.fn.extend({
    animateCss: function(t, e) {
        var n = function(t) {
            var e = {
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MozAnimation: "mozAnimationEnd",
                WebkitAnimation: "webkitAnimationEnd"
            };
            for (var n in e)
                if (void 0 !== t.style[n])
                    return e[n]
        }(document.createElement("div"));
        return this.addClass("animated " + t).one(n, function() {
            $(this).removeClass("animated " + t),
            "function" == typeof e && e()
        }),
        this
    }
}),
function() {
    var t = [].slice
      , e = {}.hasOwnProperty
      , n = function(t, n) {
        function i() {
            this.constructor = t
        }
        for (var r in n)
            e.call(n, r) && (t[r] = n[r]);
        return i.prototype = n.prototype,
        t.prototype = new i,
        t.__super__ = n.prototype,
        t
    };
    !function(e, i) {
        var r, o;
        r = e.ImgLoaderNs = {},
        r.support = {},
        r.support.xhr2 = null != i.FormData,
        r.createCachedFunction = function(t) {
            var n;
            return n = {},
            function(i, r) {
                return n[i] || (n[i] = e.Deferred(function(e) {
                    return t(e, i, r)
                }).promise()),
                n[i]
            }
        }
        ,
        r.fetchImg = r.createCachedFunction(function(t, n, i) {
            var o, s, a, u;
            return a = new Image,
            s = function() {
                return a.onload = a.onerror = null
            }
            ,
            t.always(s),
            o = e(a),
            a.onload = function() {
                return t.resolve(o)
            }
            ,
            a.onerror = function() {
                return t.reject(o)
            }
            ,
            r.support.xhr2 && (null != i ? i.useXHR2 : void 0) ? (u = new r.Xhr2Request(n,{
                timeout: i.timeout
            }),
            t.xhr = u,
            u.on("progress", function() {
                return t.notify(u.currentLoadedInfo())
            }),
            u.on("loadend timeout", function() {
                return a.src = n
            }),
            u.send()) : a.src = n
        }),
        function() {
            var t;
            t = {},
            r.loadImg = function(n, i, o) {
                return e.Deferred(function(e) {
                    return r.fetchImg(n, {
                        useXHR2: i,
                        timeout: o
                    }).progress(function(t) {
                        return e.notify(t)
                    }).then(function(i) {
                        var r, o;
                        return t[n] || (t[n] = i),
                        r = t[n],
                        o = r.clone(),
                        t[n] = o,
                        e.resolve(r)
                    }, function(t) {
                        return e.reject(t)
                    })
                }).promise()
            }
        }(),
        r.loadImgWoCache = function(t, n, i) {
            return e.Deferred(function(e) {
                return r.fetchImg(t, {
                    useXHR2: n,
                    timeout: i
                }).progress(function(t) {
                    return e.notify(t)
                }).then(function(t) {
                    return e.resolve(t)
                }, function(t) {
                    return e.reject(t)
                })
            }).promise()
        }
        ,
        o = function(t) {
            return e.Deferred(function(e) {
                return setTimeout(function() {
                    return e.resolve()
                }, t)
            })
        }
        ,
        r.Event = function() {
            function e() {
                this._callbacks = {}
            }
            return e.prototype.on = function(t, e) {
                var n, i, r, o, s;
                for (n = t.split(" "),
                o = 0,
                s = n.length; s > o; o++)
                    i = n[o],
                    (r = this._callbacks)[i] || (r[i] = []),
                    this._callbacks[i].push(e);
                return this
            }
            ,
            e.prototype.one = function(t, e) {
                return this.on(t, function() {
                    return this.off(t, arguments.callee),
                    e.apply(this, arguments)
                })
            }
            ,
            e.prototype.trigger = function() {
                var e, n, i, r, o, s, a;
                if (e = arguments.length >= 1 ? t.call(arguments, 0) : [],
                i = e.shift(),
                r = null != (a = this._callbacks) ? a[i] : void 0) {
                    for (o = 0,
                    s = r.length; s > o && (n = r[o],
                    !1 !== n.apply(this, e)); o++)
                        ;
                    return this
                }
            }
            ,
            e.prototype.off = function(t, e) {
                var n, i, r, o, s;
                if (!t)
                    return this._callbacks = {},
                    this;
                if (!(i = null != (s = this._callbacks) ? s[t] : void 0))
                    return this;
                if (!e)
                    return delete this._callbacks[t],
                    this;
                for (n = r = 0,
                o = i.length; o > r; n = ++r)
                    if (i[n] === e) {
                        i = i.slice(),
                        i.splice(n, 1),
                        this._callbacks[t] = i;
                        break
                    }
                return this
            }
            ,
            e.prototype.bind = function() {
                return this.on.apply(this, arguments)
            }
            ,
            e.prototype.unbind = function() {
                return this.off.apply(this, arguments)
            }
            ,
            e
        }(),
        r.Xhr2Request = function(t) {
            function i(t, n) {
                this.url = t,
                i.__super__.constructor.apply(this, arguments),
                this.options = e.extend({
                    timeout: 1e4
                }, n),
                this._prepare()
            }
            return n(i, t),
            i.prototype._prepare = function() {
                var t, e = this;
                return t = !1,
                this._request = new XMLHttpRequest,
                this._request.open("GET", this.url),
                this._request.timeout = this.options.timeout,
                this._request.onloadend = function() {
                    return e.trigger("loadend")
                }
                ,
                this._request.onprogress = function(n) {
                    return t || (t = !0,
                    e.totalSize = n.totalSize,
                    e.trigger("firstprogress")),
                    e.loadedSize = n.loaded,
                    e.loadedRatio = e.loadedSize / e.totalSize,
                    e.trigger("progress")
                }
                ,
                this._request.ontimeout = function() {
                    return e.options.timeout
                }
                ,
                this
            }
            ,
            i.prototype.currentLoadedInfo = function() {
                return {
                    totalSize: this.totalSize,
                    loadedSize: this.loadedSize,
                    loadedRatio: this.loadedRatio
                }
            }
            ,
            i.prototype.send = function() {
                return this._request.send(),
                this
            }
            ,
            i
        }(r.Event),
        r.LoaderItem = function(t) {
            function i(t, e, n) {
                this.src = t,
                this._useXHR2 = null == e || e,
                this._timeout = null != n ? n : 1e4,
                i.__super__.constructor.apply(this, arguments)
            }
            return n(i, t),
            i.prototype.load = function() {
                var t = this;
                return e.Deferred(function(e) {
                    return r.loadImg(t.src, t._useXHR2, t._timeout).progress(function(e) {
                        return t.trigger("progress", e)
                    }).then(function(n) {
                        return t.$img = n,
                        t.trigger("success", t.$img),
                        t.trigger("complete", t.$img),
                        e.resolve(t.$img)
                    }, function(n) {
                        return t.$img = n,
                        t.trigger("error", t.$img),
                        t.trigger("complete", t.$img),
                        e.reject(t.$img)
                    })
                })
            }
            ,
            i
        }(r.Event),
        r.AbstractLoader = function(t) {
            function e() {
                e.__super__.constructor.apply(this, arguments)
            }
            return n(e, t),
            e.prototype._prepareProgressInfo = function() {
                var t, e;
                return t = this.items || this._presets,
                e = t.length,
                this.progressInfo = {
                    loadedFileCount: 0,
                    totalFileCount: e,
                    loadedRatio: 0
                },
                this.ratioPerItem = 1 / e,
                this
            }
            ,
            e.prototype._updateProgressInfo = function(t, e) {
                var n, i;
                return i = this.progressInfo,
                n = e.loadedRatio * this.ratioPerItem,
                i.loadedRatio = i.loadedRatio + n - (t.lastLoadedRatio || 0),
                i.loadedRatio > 1 && (i.loadedRatio = 1),
                t.lastLoadedRatio = n,
                this
            }
            ,
            e
        }(r.Event),
        r.BasicLoader = function(i) {
            function o(t, e) {
                this._useXHR2 = null == t || t,
                this._timeout = null != e ? e : 1e4,
                o.__super__.constructor.apply(this, arguments),
                this.items = []
            }
            return n(o, i),
            o.prototype.add = function(t) {
                var n;
                return "string" === e.type(t) && (n = t,
                t = new r.LoaderItem(n,this._useXHR2,this._timeout)),
                this.items.push(t),
                t
            }
            ,
            o.prototype.load = function() {
                var n, i, o = this;
                return this._prepareProgressInfo(),
                i = this.progressInfo,
                n = e.map(this.items, function(t) {
                    return t.on("progress", function(e) {
                        return o._updateProgressInfo(t, e),
                        o.trigger("progress", i)
                    }),
                    t.on("complete", function(t) {
                        return i.loadedFileCount += 1,
                        r.support.xhr2 && o._useXHR2 || (i.loadedRatio = i.loadedFileCount / i.totalFileCount,
                        o.trigger("progress", i)),
                        o.trigger("itemload", t, i)
                    }),
                    t.load()
                }),
                e.Deferred(function(r) {
                    return e.when.apply(o, n).always(function() {
                        var n, s;
                        return s = arguments.length >= 1 ? t.call(arguments, 0) : [],
                        n = e(s),
                        i.loadedRatio = 1,
                        o.trigger("progress", i),
                        o.trigger("allload", n, i),
                        r.resolve(n, i)
                    })
                }).promise()
            }
            ,
            o.prototype.kill = function() {
                var t, e, n, i;
                for (i = this.items,
                e = 0,
                n = i.length; n > e; e++)
                    t = i[e],
                    t.off();
                return this.trigger("kill"),
                this.off(),
                this
            }
            ,
            o
        }(r.AbstractLoader),
        r.ChainLoader = function(t) {
            function i(t, n, r, o) {
                this._pipesize = t,
                this._delay = null != n ? n : 0,
                this._useXHR2 = r,
                this._timeout = o,
                i.__super__.constructor.apply(this, arguments),
                this._presets = [],
                this._inLoadCount = 0,
                this._allDoneDefer = e.Deferred()
            }
            return n(i, t),
            i.prototype._finished = function() {
                return this.progressInfo.loadedFileCount === this._presets.length
            }
            ,
            i.prototype._nextLoadAllowed = function() {
                return this._inLoadCount < this._pipesize
            }
            ,
            i.prototype._getImgs = function() {
                return e(e.map(this._presets, function(t) {
                    return t.item.$img
                }))
            }
            ,
            i.prototype._handleNext = function() {
                var t, n, i = this;
                return n = this.progressInfo,
                this._finished() ? this._allloadFired ? this : (this._allloadFired = !0,
                t = this._getImgs(),
                this.trigger("progress", n),
                this.trigger("allload", t, n),
                this._allDoneDefer.resolve(t),
                this) : (e.each(this._presets, function(t, e) {
                    var s;
                    return s = e.item,
                    !!e.started || !!i._nextLoadAllowed() && (i._inLoadCount += 1,
                    e.started = !0,
                    s.on("progress", function(t) {
                        return i._updateProgressInfo(s, t),
                        i.trigger("progress", n)
                    }),
                    s.on("complete", function(s) {
                        var a;
                        return e.done = !0,
                        a = function() {
                            return n.loadedFileCount += 1,
                            i._inLoadCount -= 1,
                            r.support.xhr2 && i._useXHR2 || (n.loadedRatio = n.loadedFileCount / n.totalFileCount,
                            i.trigger("progress", n)),
                            i.trigger("itemload", s, n),
                            e.defer.resolve(s),
                            o(i._delay).done(function() {
                                return i._handleNext()
                            })
                        }
                        ,
                        0 === t ? a() : i._presets[t - 1].defer.always(function() {
                            return a()
                        })
                    }),
                    s.load())
                }),
                this)
            }
            ,
            i.prototype.add = function(t) {
                var n, i;
                return "string" === e.type(t) && (i = t,
                t = new r.LoaderItem(i,this._useXHR2,this._timeout)),
                n = {
                    item: t,
                    done: !1,
                    started: !1,
                    defer: e.Deferred()
                },
                this._presets.push(n),
                n.defer
            }
            ,
            i.prototype.load = function() {
                return this._prepareProgressInfo(),
                this._handleNext(),
                this._allDoneDefer
            }
            ,
            i.prototype.kill = function() {
                var t, e, n, i;
                for (i = this._presets,
                e = 0,
                n = i.length; n > e; e++)
                    t = i[e],
                    t.item.off();
                return this.trigger("kill"),
                this.off(),
                this
            }
            ,
            i
        }(r.AbstractLoader),
        r.LoaderFacade = function() {
            function n(t) {
                var n, i, o, s, a;
                for (this.options = n = e.extend({
                    srcs: [],
                    pipesize: 0,
                    delay: 100,
                    timeout: 1e4,
                    useXHR2: !1
                }, t),
                this.loader = n.pipesize ? new r.ChainLoader(n.pipesize,n.delay,n.useXHR2,n.timeout) : new r.BasicLoader(n.useXHR2,n.timeout),
                a = n.srcs,
                o = 0,
                s = a.length; s > o; o++)
                    i = a[o],
                    this.loader.add(i)
            }
            var i, o, s, a, u;
            for (o = ["bind", "trigger", "on", "off", "load", "one", "unbind", "add", "kill"],
            s = function(e) {
                return n.prototype[e] = function() {
                    var n;
                    return n = arguments.length >= 1 ? t.call(arguments, 0) : [],
                    this.loader[e].apply(this.loader, n)
                }
            }
            ,
            a = 0,
            u = o.length; u > a; a++)
                i = o[a],
                s(i);
            return n
        }
        .call(this),
        e.loadImg = r.loadImg,
        e.loadImgWoCache = r.loadImgWoCache,
        e.ImgLoader = r.LoaderFacade,
        e.calcNaturalWH = r.calcNaturalWH,
        e.calcRectFitImgWH = r.calcRectFitImgWH
    }(jQuery, this, this.document)
}
.call(this);
var JSMpeg = {
    Player: null,
    VideoElement: null,
    BitBuffer: null,
    Source: {},
    Demuxer: {},
    Decoder: {},
    Renderer: {},
    AudioOutput: {},
    Now: function() {
        return window.performance ? window.performance.now() / 1e3 : Date.now() / 1e3
    },
    CreateVideoElements: function() {
        for (var t = document.querySelectorAll(".jsmpeg"), e = 0; e < t.length; e++)
            new JSMpeg.VideoElement(t[e])
    },
    Fill: function(t, e) {
        if (t.fill)
            t.fill(e);
        else
            for (var n = 0; n < t.length; n++)
                t[n] = e
    }
};
"complete" === document.readyState ? JSMpeg.CreateVideoElements() : document.addEventListener("DOMContentLoaded", JSMpeg.CreateVideoElements),
JSMpeg.VideoElement = function() {
    "use strict";
    var t = function(e) {
        var n = e.dataset.url;
        if (!n)
            throw "VideoElement has no `data-url` attribute";
        var i = function(t, e) {
            for (var n in e)
                t.style[n] = e[n]
        };
        this.container = e,
        i(this.container, {
            display: "inline-block",
            position: "relative",
            minWidth: "80px",
            minHeight: "80px"
        }),
        this.canvas = document.createElement("canvas"),
        this.canvas.width = 960,
        this.canvas.height = 540,
        i(this.canvas, {
            display: "block",
            width: "100%"
        }),
        this.container.appendChild(this.canvas),
        this.playButton = document.createElement("div"),
        this.playButton.innerHTML = t.PLAY_BUTTON,
        i(this.playButton, {
            zIndex: 2,
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            maxWidth: "75px",
            maxHeight: "75px",
            margin: "auto",
            opacity: "0.7",
            cursor: "pointer"
        }),
        this.container.appendChild(this.playButton);
        var r = {
            canvas: this.canvas
        };
        for (var o in e.dataset)
            try {
                r[o] = JSON.parse(e.dataset[o])
            } catch (t) {
                r[o] = e.dataset[o]
            }
        if (this.player = new JSMpeg.Player(n,r),
        e.playerInstance = this.player,
        !r.poster || r.autoplay || this.player.options.streaming || (r.decodeFirstFrame = !1,
        this.poster = new Image,
        this.poster.src = r.poster,
        this.poster.addEventListener("load", this.posterLoaded),
        i(this.poster, {
            display: "block",
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }),
        this.container.appendChild(this.poster)),
        this.player.options.streaming || this.container.addEventListener("click", this.onClick.bind(this)),
        (r.autoplay || this.player.options.streaming) && (this.playButton.style.display = "none"),
        this.player.audioOut && !this.player.audioOut.unlocked) {
            var s = this.container;
            (r.autoplay || this.player.options.streaming) && (this.unmuteButton = document.createElement("div"),
            this.unmuteButton.innerHTML = t.UNMUTE_BUTTON,
            i(this.unmuteButton, {
                zIndex: 2,
                position: "absolute",
                bottom: "10px",
                right: "20px",
                width: "75px",
                height: "75px",
                margin: "auto",
                opacity: "0.7",
                cursor: "pointer"
            }),
            this.container.appendChild(this.unmuteButton),
            s = this.unmuteButton),
            this.unlockAudioBound = this.onUnlockAudio.bind(this, s),
            s.addEventListener("touchstart", this.unlockAudioBound, !1),
            s.addEventListener("click", this.unlockAudioBound, !0)
        }
    };
    return t.prototype.onUnlockAudio = function(t, e) {
        this.unmuteButton && (e.preventDefault(),
        e.stopPropagation()),
        this.player.audioOut.unlock(function() {
            this.unmuteButton && (this.unmuteButton.style.display = "none"),
            t.removeEventListener("touchstart", this.unlockAudioBound),
            t.removeEventListener("click", this.unlockAudioBound)
        }
        .bind(this))
    },
    t.prototype.onClick = function(t) {
        this.player.isPlaying ? (this.player.pause(),
        this.playButton.style.display = "block") : (this.player.play(),
        this.playButton.style.display = "none",
        this.poster && (this.poster.style.display = "none"))
    }
    ,
    t.PLAY_BUTTON = '<svg style="max-width: 75px; max-height: 75px;" viewBox="0 0 200 200" alt="Play video"><circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/><polygon points="70, 55 70, 145 145, 100" fill="#fff"/></svg>',
    t.UNMUTE_BUTTON = '<svg style="max-width: 75px; max-height: 75px;" viewBox="0 0 75 75"><polygon class="audio-speaker" stroke="none" fill="#fff" points="39,13 22,28 6,28 6,47 21,47 39,62 39,13"/><g stroke="#fff" stroke-width="5"><path d="M 49,50 69,26"/><path d="M 69,50 49,26"/></g></svg>',
    t
}(),
JSMpeg.Player = function() {
    "use strict";
    var t = function(t, e) {
        this.options = e || {},
        e.source ? (this.source = new e.source(t,e),
        e.streaming = !!this.source.streaming) : t.match(/^wss?:\/\//) ? (this.source = new JSMpeg.Source.WebSocket(t,e),
        e.streaming = !0) : !1 !== e.progressive ? (this.source = new JSMpeg.Source.AjaxProgressive(t,e),
        e.streaming = !1) : (this.source = new JSMpeg.Source.Ajax(t,e),
        e.streaming = !1),
        this.maxAudioLag = e.maxAudioLag || .25,
        this.loop = !1 !== e.loop,
        this.autoplay = !!e.autoplay || e.streaming,
        this.demuxer = new JSMpeg.Demuxer.TS(e),
        this.source.connect(this.demuxer),
        !1 !== e.video && (this.video = new JSMpeg.Decoder.MPEG1Video(e),
        this.renderer = !e.disableGl && JSMpeg.Renderer.WebGL.IsSupported() ? new JSMpeg.Renderer.WebGL(e) : new JSMpeg.Renderer.Canvas2D(e),
        this.demuxer.connect(JSMpeg.Demuxer.TS.STREAM.VIDEO_1, this.video),
        this.video.connect(this.renderer)),
        !1 !== e.audio && JSMpeg.AudioOutput.WebAudio.IsSupported() && (this.audio = new JSMpeg.Decoder.MP2Audio(e),
        this.audioOut = new JSMpeg.AudioOutput.WebAudio(e),
        this.demuxer.connect(JSMpeg.Demuxer.TS.STREAM.AUDIO_1, this.audio),
        this.audio.connect(this.audioOut)),
        Object.defineProperty(this, "currentTime", {
            get: this.getCurrentTime,
            set: this.setCurrentTime
        }),
        Object.defineProperty(this, "volume", {
            get: this.getVolume,
            set: this.setVolume
        }),
        this.unpauseOnShow = !1,
        !1 !== e.pauseWhenHidden && document.addEventListener("visibilitychange", this.showHide.bind(this)),
        this.source.start(),
        this.autoplay && this.play()
    };
    return t.prototype.showHide = function(t) {
        "hidden" === document.visibilityState ? (this.unpauseOnShow = this.wantsToPlay,
        this.pause()) : this.unpauseOnShow && this.play()
    }
    ,
    t.prototype.play = function(t) {
        this.animationId = requestAnimationFrame(this.update.bind(this)),
        this.wantsToPlay = !0
    }
    ,
    t.prototype.pause = function(t) {
        cancelAnimationFrame(this.animationId),
        this.wantsToPlay = !1,
        this.isPlaying = !1,
        this.audio && this.audio.canPlay && (this.audioOut.stop(),
        this.seek(this.currentTime))
    }
    ,
    t.prototype.getVolume = function() {
        return this.audioOut ? this.audioOut.volume : 0
    }
    ,
    t.prototype.setVolume = function(t) {
        this.audioOut && (this.audioOut.volume = t)
    }
    ,
    t.prototype.stop = function(t) {
        this.pause(),
        this.seek(0),
        this.video && !1 !== this.options.decodeFirstFrame && this.video.decode()
    }
    ,
    t.prototype.destroy = function() {
        this.pause(),
        this.source.destroy(),
        this.renderer.destroy(),
        this.audioOut.destroy()
    }
    ,
    t.prototype.seek = function(t) {
        var e = this.audio && this.audio.canPlay ? this.audio.startTime : this.video.startTime;
        this.video && this.video.seek(t + e),
        this.audio && this.audio.seek(t + e),
        this.startTime = JSMpeg.Now() - t
    }
    ,
    t.prototype.getCurrentTime = function() {
        return this.audio && this.audio.canPlay ? this.audio.currentTime - this.audio.startTime : this.video.currentTime - this.video.startTime
    }
    ,
    t.prototype.setCurrentTime = function(t) {
        this.seek(t)
    }
    ,
    t.prototype.update = function() {
        if (this.animationId = requestAnimationFrame(this.update.bind(this)),
        !this.source.established)
            return void (this.renderer && this.renderer.renderProgress(this.source.progress));
        this.isPlaying || (this.isPlaying = !0,
        this.startTime = JSMpeg.Now() - this.currentTime),
        this.options.streaming ? this.updateForStreaming() : this.updateForStaticFile()
    }
    ,
    t.prototype.updateForStreaming = function() {
        if (this.video && this.video.decode(),
        this.audio) {
            var t = !1;
            do {
                this.audioOut.enqueuedTime > this.maxAudioLag && (this.audioOut.resetEnqueuedTime(),
                this.audioOut.enabled = !1),
                t = this.audio.decode()
            } while (t);this.audioOut.enabled = !0
        }
    }
    ,
    t.prototype.updateForStaticFile = function() {
        var t = !1
          , e = 0;
        if (this.audio && this.audio.canPlay) {
            for (; !t && this.audio.decodedTime - this.audio.currentTime < .25; )
                t = !this.audio.decode();
            this.video && this.video.currentTime < this.audio.currentTime && (t = !this.video.decode()),
            e = this.demuxer.currentTime - this.audio.currentTime
        } else if (this.video) {
            var n = JSMpeg.Now() - this.startTime + this.video.startTime
              , i = n - this.video.currentTime
              , r = 1 / this.video.frameRate;
            this.video && i > 0 && (i > 2 * r && (this.startTime += i),
            t = !this.video.decode()),
            e = this.demuxer.currentTime - n
        }
        this.source.resume(e),
        t && this.source.completed && (this.loop ? this.seek(0) : this.pause())
    }
    ,
    t
}(),
JSMpeg.BitBuffer = function() {
    "use strict";
    var t = function(e, n) {
        "object" == typeof e ? (this.bytes = e instanceof Uint8Array ? e : new Uint8Array(e),
        this.byteLength = this.bytes.length) : (this.bytes = new Uint8Array(e || 1048576),
        this.byteLength = 0),
        this.mode = n || t.MODE.EXPAND,
        this.index = 0
    };
    return t.prototype.resize = function(t) {
        var e = new Uint8Array(t);
        0 !== this.byteLength && (this.byteLength = Math.min(this.byteLength, t),
        e.set(this.bytes, 0, this.byteLength)),
        this.bytes = e,
        this.index = Math.min(this.index, this.byteLength << 3)
    }
    ,
    t.prototype.evict = function(t) {
        var e = this.index >> 3
          , n = this.bytes.length - this.byteLength;
        if (this.index === this.byteLength << 3 || t > n + e)
            return this.byteLength = 0,
            void (this.index = 0);
        0 !== e && (this.bytes.copyWithin ? this.bytes.copyWithin(0, e, this.byteLength) : this.bytes.set(this.bytes.subarray(e, this.byteLength)),
        this.byteLength = this.byteLength - e,
        this.index -= e << 3)
    }
    ,
    t.prototype.write = function(e) {
        var n = "object" == typeof e[0]
          , i = 0
          , r = this.bytes.length - this.byteLength;
        if (n)
            for (var i = 0, o = 0; o < e.length; o++)
                i += e[o].byteLength;
        else
            i = e.byteLength;
        if (i > r)
            if (this.mode === t.MODE.EXPAND) {
                var s = Math.max(2 * this.bytes.length, i - r);
                this.resize(s)
            } else
                this.evict(i);
        if (n)
            for (var o = 0; o < e.length; o++)
                this.appendSingleBuffer(e[o]);
        else
            this.appendSingleBuffer(e)
    }
    ,
    t.prototype.appendSingleBuffer = function(t) {
        t = t instanceof Uint8Array ? t : new Uint8Array(t),
        this.bytes.set(t, this.byteLength),
        this.byteLength += t.length
    }
    ,
    t.prototype.findNextStartCode = function() {
        for (var t = this.index + 7 >> 3; t < this.byteLength; t++)
            if (0 == this.bytes[t] && 0 == this.bytes[t + 1] && 1 == this.bytes[t + 2])
                return this.index = t + 4 << 3,
                this.bytes[t + 3];
        return this.index = this.byteLength << 3,
        -1
    }
    ,
    t.prototype.findStartCode = function(t) {
        for (var e = 0; ; )
            if ((e = this.findNextStartCode()) === t || -1 === e)
                return e;
        return -1
    }
    ,
    t.prototype.nextBytesAreStartCode = function() {
        var t = this.index + 7 >> 3;
        return t >= this.byteLength || 0 == this.bytes[t] && 0 == this.bytes[t + 1] && 1 == this.bytes[t + 2]
    }
    ,
    t.prototype.peek = function(t) {
        for (var e = this.index, n = 0; t; ) {
            var i = this.bytes[e >> 3]
              , r = 8 - (7 & e)
              , o = r < t ? r : t
              , s = r - o;
            n = n << o | (i & 255 >> 8 - o << s) >> s,
            e += o,
            t -= o
        }
        return n
    }
    ,
    t.prototype.read = function(t) {
        var e = this.peek(t);
        return this.index += t,
        e
    }
    ,
    t.prototype.skip = function(t) {
        return this.index += t
    }
    ,
    t.prototype.rewind = function(t) {
        this.index = Math.max(this.index - t, 0)
    }
    ,
    t.prototype.has = function(t) {
        return (this.byteLength << 3) - this.index >= t
    }
    ,
    t.MODE = {
        EVICT: 1,
        EXPAND: 2
    },
    t
}(),
JSMpeg.Source.Ajax = function() {
    "use strict";
    var t = function(t, e) {
        this.url = t,
        this.destination = null,
        this.request = null,
        this.completed = !1,
        this.established = !1,
        this.progress = 0
    };
    return t.prototype.connect = function(t) {
        this.destination = t
    }
    ,
    t.prototype.start = function() {
        this.request = new XMLHttpRequest,
        this.request.onreadystatechange = function() {
            this.request.readyState === this.request.DONE && 200 === this.request.status && this.onLoad(this.request.response)
        }
        .bind(this),
        this.request.onprogress = this.onProgress.bind(this),
        this.request.open("GET", this.url),
        this.request.responseType = "arraybuffer",
        this.request.send()
    }
    ,
    t.prototype.resume = function(t) {}
    ,
    t.prototype.destroy = function() {
        this.request.abort()
    }
    ,
    t.prototype.onProgress = function(t) {
        this.progress = t.loaded / t.total
    }
    ,
    t.prototype.onLoad = function(t) {
        this.established = !0,
        this.completed = !0,
        this.progress = 1,
        this.destination && this.destination.write(t)
    }
    ,
    t
}(),
JSMpeg.Source.AjaxProgressive = function() {
    "use strict";
    var t = function(t, e) {
        this.url = t,
        this.destination = null,
        this.request = null,
        this.completed = !1,
        this.established = !1,
        this.progress = 0,
        this.fileSize = 0,
        this.loadedSize = 0,
        this.chunkSize = e.chunkSize || 1048576,
        this.isLoading = !1,
        this.loadStartTime = 0,
        this.throttled = !1 !== e.throttled,
        this.aborted = !1
    };
    return t.prototype.connect = function(t) {
        this.destination = t
    }
    ,
    t.prototype.start = function() {
        this.request = new XMLHttpRequest,
        this.request.onreadystatechange = function() {
            this.request.readyState === this.request.DONE && (this.fileSize = parseInt(this.request.getResponseHeader("Content-Length")),
            this.loadNextChunk())
        }
        .bind(this),
        this.request.onprogress = this.onProgress.bind(this),
        this.request.open("HEAD", this.url),
        this.request.send()
    }
    ,
    t.prototype.resume = function(t) {
        if (!this.isLoading && this.throttled) {
            8 * this.loadTime + 2 > t && this.loadNextChunk()
        }
    }
    ,
    t.prototype.destroy = function() {
        this.request.abort(),
        this.aborted = !0
    }
    ,
    t.prototype.loadNextChunk = function() {
        var t = this.loadedSize
          , e = Math.min(this.loadedSize + this.chunkSize - 1, this.fileSize - 1);
        if (t >= this.fileSize || this.aborted)
            return void (this.completed = !0);
        this.isLoading = !0,
        this.loadStartTime = JSMpeg.Now(),
        this.request = new XMLHttpRequest,
        this.request.onreadystatechange = function() {
            this.request.readyState === this.request.DONE && this.request.status >= 200 && this.request.status < 300 ? this.onChunkLoad(this.request.response) : this.request.readyState === this.request.DONE && this.loadFails++ < 3 && this.loadNextChunk()
        }
        .bind(this),
        0 === t && (this.request.onprogress = this.onProgress.bind(this)),
        this.request.open("GET", this.url + "?" + t + "-" + e),
        this.request.setRequestHeader("Range", "bytes=" + t + "-" + e),
        this.request.responseType = "arraybuffer",
        this.request.send()
    }
    ,
    t.prototype.onProgress = function(t) {
        this.progress = t.loaded / t.total
    }
    ,
    t.prototype.onChunkLoad = function(t) {
        this.established = !0,
        this.progress = 1,
        this.loadedSize += t.byteLength,
        this.loadFails = 0,
        this.isLoading = !1,
        this.destination && this.destination.write(t),
        this.loadTime = JSMpeg.Now() - this.loadStartTime,
        this.throttled || this.loadNextChunk()
    }
    ,
    t
}(),
JSMpeg.Source.WebSocket = function() {
    "use strict";
    var t = function(t, e) {
        this.url = t,
        this.options = e,
        this.socket = null,
        this.callbacks = {
            connect: [],
            data: []
        },
        this.destination = null,
        this.reconnectInterval = void 0 !== e.reconnectInterval ? e.reconnectInterval : 5,
        this.shouldAttemptReconnect = !!this.reconnectInterval,
        this.completed = !1,
        this.established = !1,
        this.progress = 0,
        this.reconnectTimeoutId = 0
    };
    return t.prototype.connect = function(t) {
        this.destination = t
    }
    ,
    t.prototype.destroy = function() {
        clearTimeout(this.reconnectTimeoutId),
        this.shouldAttemptReconnect = !1,
        this.socket.close()
    }
    ,
    t.prototype.start = function() {
        this.shouldAttemptReconnect = !!this.reconnectInterval,
        this.progress = 0,
        this.established = !1,
        this.socket = new WebSocket(this.url,this.options.protocols || null),
        this.socket.binaryType = "arraybuffer",
        this.socket.onmessage = this.onMessage.bind(this),
        this.socket.onopen = this.onOpen.bind(this),
        this.socket.onerror = this.onClose.bind(this),
        this.socket.onclose = this.onClose.bind(this)
    }
    ,
    t.prototype.resume = function(t) {}
    ,
    t.prototype.onOpen = function() {
        this.progress = 1,
        this.established = !0
    }
    ,
    t.prototype.onClose = function() {
        this.shouldAttemptReconnect && (clearTimeout(this.reconnectTimeoutId),
        this.reconnectTimeoutId = setTimeout(function() {
            this.start()
        }
        .bind(this), 1e3 * this.reconnectInterval))
    }
    ,
    t.prototype.onMessage = function(t) {
        this.destination && this.destination.write(t.data)
    }
    ,
    t
}(),
JSMpeg.Demuxer.TS = function() {
    "use strict";
    var t = function(t) {
        this.bits = null,
        this.leftoverBytes = null,
        this.guessVideoFrameEnd = !0,
        this.pidsToStreamIds = {},
        this.pesPacketInfo = {},
        this.startTime = 0,
        this.currentTime = 0
    };
    return t.prototype.connect = function(t, e) {
        this.pesPacketInfo[t] = {
            destination: e,
            currentLength: 0,
            totalLength: 0,
            pts: 0,
            buffers: []
        }
    }
    ,
    t.prototype.write = function(t) {
        if (this.leftoverBytes) {
            var e = t.byteLength + this.leftoverBytes.byteLength;
            this.bits = new JSMpeg.BitBuffer(e),
            this.bits.write([this.leftoverBytes, t])
        } else
            this.bits = new JSMpeg.BitBuffer(t);
        for (; this.bits.has(1504) && this.parsePacket(); )
            ;
        var n = this.bits.byteLength - (this.bits.index >> 3);
        this.leftoverBytes = n > 0 ? this.bits.bytes.subarray(this.bits.index >> 3) : null
    }
    ,
    t.prototype.parsePacket = function() {
        if (71 !== this.bits.read(8) && !this.resync())
            return !1;
        var t = 187 + (this.bits.index >> 3)
          , e = (this.bits.read(1),
        this.bits.read(1))
          , n = (this.bits.read(1),
        this.bits.read(13))
          , i = (this.bits.read(2),
        this.bits.read(2))
          , r = (this.bits.read(4),
        this.pidsToStreamIds[n]);
        if (e && r) {
            var o = this.pesPacketInfo[r];
            o && o.currentLength && this.packetComplete(o)
        }
        if (1 & i) {
            if (2 & i) {
                var s = this.bits.read(8);
                this.bits.skip(s << 3)
            }
            if (e && this.bits.nextBytesAreStartCode()) {
                this.bits.skip(24),
                r = this.bits.read(8),
                this.pidsToStreamIds[n] = r;
                var a = this.bits.read(16);
                this.bits.skip(8);
                var u = this.bits.read(2);
                this.bits.skip(6);
                var l = this.bits.read(8)
                  , c = this.bits.index + (l << 3)
                  , o = this.pesPacketInfo[r];
                if (o) {
                    var d = 0;
                    if (2 & u) {
                        this.bits.skip(4);
                        var h = this.bits.read(3);
                        this.bits.skip(1);
                        var f = this.bits.read(15);
                        this.bits.skip(1);
                        var p = this.bits.read(15);
                        this.bits.skip(1),
                        d = (1073741824 * h + 32768 * f + p) / 9e4,
                        this.currentTime = d,
                        -1 === this.startTime && (this.startTime = d)
                    }
                    var m = a ? a - l - 3 : 0;
                    this.packetStart(o, d, m)
                }
                this.bits.index = c
            }
            if (r) {
                var o = this.pesPacketInfo[r];
                if (o) {
                    var g = this.bits.index >> 3
                      , v = this.packetAddData(o, g, t)
                      , y = !e && 2 & i;
                    (v || this.guessVideoFrameEnd && y) && this.packetComplete(o)
                }
            }
        }
        return this.bits.index = t << 3,
        !0
    }
    ,
    t.prototype.resync = function() {
        if (!this.bits.has(9024))
            return !1;
        for (var t = this.bits.index >> 3, e = 0; e < 187; e++)
            if (71 === this.bits.bytes[t + e]) {
                for (var n = !0, i = 1; i < 5; i++)
                    if (71 !== this.bits.bytes[t + e + 188 * i]) {
                        n = !1;
                        break
                    }
                if (n)
                    return this.bits.index = t + e + 1 << 3,
                    !0
            }
        return console.warn("JSMpeg: Possible garbage data. Skipping."),
        this.bits.skip(1496),
        !1
    }
    ,
    t.prototype.packetStart = function(t, e, n) {
        t.totalLength = n,
        t.currentLength = 0,
        t.pts = e
    }
    ,
    t.prototype.packetAddData = function(t, e, n) {
        return t.buffers.push(this.bits.bytes.subarray(e, n)),
        t.currentLength += n - e,
        0 !== t.totalLength && t.currentLength >= t.totalLength
    }
    ,
    t.prototype.packetComplete = function(t) {
        t.destination.write(t.pts, t.buffers),
        t.totalLength = 0,
        t.currentLength = 0,
        t.buffers = []
    }
    ,
    t.STREAM = {
        PACK_HEADER: 186,
        SYSTEM_HEADER: 187,
        PROGRAM_MAP: 188,
        PRIVATE_1: 189,
        PADDING: 190,
        PRIVATE_2: 191,
        AUDIO_1: 192,
        VIDEO_1: 224,
        DIRECTORY: 255
    },
    t
}(),
JSMpeg.Decoder.Base = function() {
    "use strict";
    var t = function(t) {
        this.destination = null,
        this.canPlay = !1,
        this.collectTimestamps = !t.streaming,
        this.timestamps = [],
        this.timestampIndex = 0,
        this.startTime = 0,
        this.decodedTime = 0,
        Object.defineProperty(this, "currentTime", {
            get: this.getCurrentTime
        })
    };
    return t.prototype.connect = function(t) {
        this.destination = t
    }
    ,
    t.prototype.write = function(t, e) {
        this.collectTimestamps && (0 === this.timestamps.length && (this.startTime = t,
        this.decodedTime = t),
        this.timestamps.push({
            index: this.bits.byteLength << 3,
            time: t
        })),
        this.bits.write(e),
        this.canPlay = !0
    }
    ,
    t.prototype.seek = function(t) {
        if (this.collectTimestamps) {
            this.timestampIndex = 0;
            for (var e = 0; e < this.timestamps.length && !(this.timestamps[e].time > t); e++)
                this.timestampIndex = e;
            var n = this.timestamps[this.timestampIndex];
            n ? (this.bits.index = n.index,
            this.decodedTime = n.time) : (this.bits.index = 0,
            this.decodedTime = this.startTime)
        }
    }
    ,
    t.prototype.decode = function() {
        this.advanceDecodedTime(0)
    }
    ,
    t.prototype.advanceDecodedTime = function(t) {
        if (this.collectTimestamps) {
            for (var e = -1, n = this.timestampIndex; n < this.timestamps.length && !(this.timestamps[n].index > this.bits.index); n++)
                e = n;
            if (-1 !== e && e !== this.timestampIndex)
                return this.timestampIndex = e,
                void (this.decodedTime = this.timestamps[this.timestampIndex].time)
        }
        this.decodedTime += t
    }
    ,
    t.prototype.getCurrentTime = function() {
        return this.decodedTime
    }
    ,
    t
}(),
JSMpeg.Decoder.MPEG1Video = function() {
    "use strict";
    var t = function(t) {
        JSMpeg.Decoder.Base.call(this, t);
        var e = t.videoBufferSize || 524288
          , n = t.streaming ? JSMpeg.BitBuffer.MODE.EVICT : JSMpeg.BitBuffer.MODE.EXPAND;
        this.bits = new JSMpeg.BitBuffer(e,n),
        this.customIntraQuantMatrix = new Uint8Array(64),
        this.customNonIntraQuantMatrix = new Uint8Array(64),
        this.blockData = new Int32Array(64),
        this.currentFrame = 0,
        this.decodeFirstFrame = !1 !== t.decodeFirstFrame
    };
    return t.prototype = Object.create(JSMpeg.Decoder.Base.prototype),
    t.prototype.constructor = t,
    t.prototype.write = function(e, n) {
        if (JSMpeg.Decoder.Base.prototype.write.call(this, e, n),
        !this.hasSequenceHeader) {
            if (-1 === this.bits.findStartCode(t.START.SEQUENCE))
                return !1;
            this.decodeSequenceHeader(),
            this.decodeFirstFrame && this.decode()
        }
    }
    ,
    t.prototype.decode = function() {
        if (!this.hasSequenceHeader)
            return !1;
        if (-1 === this.bits.findStartCode(t.START.PICTURE)) {
            this.bits.byteLength,
            this.bits.index;
            return !1
        }
        return this.decodePicture(),
        this.advanceDecodedTime(1 / this.frameRate),
        !0
    }
    ,
    t.prototype.readHuffman = function(t) {
        var e = 0;
        do {
            e = t[e + this.bits.read(1)]
        } while (e >= 0 && 0 !== t[e]);return t[e + 2]
    }
    ,
    t.prototype.frameRate = 30,
    t.prototype.decodeSequenceHeader = function() {
        var e = this.bits.read(12)
          , n = this.bits.read(12);
        if (this.bits.skip(4),
        this.frameRate = t.PICTURE_RATE[this.bits.read(4)],
        this.bits.skip(30),
        e === this.width && n === this.height || (this.width = e,
        this.height = n,
        this.initBuffers(),
        this.destination && this.destination.resize(e, n)),
        this.bits.read(1)) {
            for (var i = 0; i < 64; i++)
                this.customIntraQuantMatrix[t.ZIG_ZAG[i]] = this.bits.read(8);
            this.intraQuantMatrix = this.customIntraQuantMatrix
        }
        if (this.bits.read(1)) {
            for (var i = 0; i < 64; i++) {
                var r = t.ZIG_ZAG[i];
                this.customNonIntraQuantMatrix[r] = this.bits.read(8)
            }
            this.nonIntraQuantMatrix = this.customNonIntraQuantMatrix
        }
        this.hasSequenceHeader = !0
    }
    ,
    t.prototype.initBuffers = function() {
        this.intraQuantMatrix = t.DEFAULT_INTRA_QUANT_MATRIX,
        this.nonIntraQuantMatrix = t.DEFAULT_NON_INTRA_QUANT_MATRIX,
        this.mbWidth = this.width + 15 >> 4,
        this.mbHeight = this.height + 15 >> 4,
        this.mbSize = this.mbWidth * this.mbHeight,
        this.codedWidth = this.mbWidth << 4,
        this.codedHeight = this.mbHeight << 4,
        this.codedSize = this.codedWidth * this.codedHeight,
        this.halfWidth = this.mbWidth << 3,
        this.halfHeight = this.mbHeight << 3,
        this.currentY = new Uint8ClampedArray(this.codedSize),
        this.currentY32 = new Uint32Array(this.currentY.buffer),
        this.currentCr = new Uint8ClampedArray(this.codedSize >> 2),
        this.currentCr32 = new Uint32Array(this.currentCr.buffer),
        this.currentCb = new Uint8ClampedArray(this.codedSize >> 2),
        this.currentCb32 = new Uint32Array(this.currentCb.buffer),
        this.forwardY = new Uint8ClampedArray(this.codedSize),
        this.forwardY32 = new Uint32Array(this.forwardY.buffer),
        this.forwardCr = new Uint8ClampedArray(this.codedSize >> 2),
        this.forwardCr32 = new Uint32Array(this.forwardCr.buffer),
        this.forwardCb = new Uint8ClampedArray(this.codedSize >> 2),
        this.forwardCb32 = new Uint32Array(this.forwardCb.buffer)
    }
    ,
    t.prototype.currentY = null,
    t.prototype.currentCr = null,
    t.prototype.currentCb = null,
    t.prototype.pictureType = 0,
    t.prototype.forwardY = null,
    t.prototype.forwardCr = null,
    t.prototype.forwardCb = null,
    t.prototype.fullPelForward = !1,
    t.prototype.forwardFCode = 0,
    t.prototype.forwardRSize = 0,
    t.prototype.forwardF = 0,
    t.prototype.decodePicture = function(e) {
        if (this.currentFrame++,
        this.bits.skip(10),
        this.pictureType = this.bits.read(3),
        this.bits.skip(16),
        !(this.pictureType <= 0 || this.pictureType >= t.PICTURE_TYPE.B)) {
            if (this.pictureType === t.PICTURE_TYPE.PREDICTIVE) {
                if (this.fullPelForward = this.bits.read(1),
                this.forwardFCode = this.bits.read(3),
                0 === this.forwardFCode)
                    return;
                this.forwardRSize = this.forwardFCode - 1,
                this.forwardF = 1 << this.forwardRSize
            }
            var n = 0;
            do {
                n = this.bits.findNextStartCode()
            } while (n === t.START.EXTENSION || n === t.START.USER_DATA);for (; n >= t.START.SLICE_FIRST && n <= t.START.SLICE_LAST; )
                this.decodeSlice(255 & n),
                n = this.bits.findNextStartCode();
            if (-1 !== n && this.bits.rewind(32),
            this.destination && this.destination.render(this.currentY, this.currentCr, this.currentCb),
            this.pictureType === t.PICTURE_TYPE.INTRA || this.pictureType === t.PICTURE_TYPE.PREDICTIVE) {
                var i = this.forwardY
                  , r = this.forwardY32
                  , o = this.forwardCr
                  , s = this.forwardCr32
                  , a = this.forwardCb
                  , u = this.forwardCb32;
                this.forwardY = this.currentY,
                this.forwardY32 = this.currentY32,
                this.forwardCr = this.currentCr,
                this.forwardCr32 = this.currentCr32,
                this.forwardCb = this.currentCb,
                this.forwardCb32 = this.currentCb32,
                this.currentY = i,
                this.currentY32 = r,
                this.currentCr = o,
                this.currentCr32 = s,
                this.currentCb = a,
                this.currentCb32 = u
            }
        }
    }
    ,
    t.prototype.quantizerScale = 0,
    t.prototype.sliceBegin = !1,
    t.prototype.decodeSlice = function(t) {
        for (this.sliceBegin = !0,
        this.macroblockAddress = (t - 1) * this.mbWidth - 1,
        this.motionFwH = this.motionFwHPrev = 0,
        this.motionFwV = this.motionFwVPrev = 0,
        this.dcPredictorY = 128,
        this.dcPredictorCr = 128,
        this.dcPredictorCb = 128,
        this.quantizerScale = this.bits.read(5); this.bits.read(1); )
            this.bits.skip(8);
        do {
            this.decodeMacroblock()
        } while (!this.bits.nextBytesAreStartCode())
    }
    ,
    t.prototype.macroblockAddress = 0,
    t.prototype.mbRow = 0,
    t.prototype.mbCol = 0,
    t.prototype.macroblockType = 0,
    t.prototype.macroblockIntra = !1,
    t.prototype.macroblockMotFw = !1,
    t.prototype.motionFwH = 0,
    t.prototype.motionFwV = 0,
    t.prototype.motionFwHPrev = 0,
    t.prototype.motionFwVPrev = 0,
    t.prototype.decodeMacroblock = function() {
        for (var e = 0, n = this.readHuffman(t.MACROBLOCK_ADDRESS_INCREMENT); 34 === n; )
            n = this.readHuffman(t.MACROBLOCK_ADDRESS_INCREMENT);
        for (; 35 === n; )
            e += 33,
            n = this.readHuffman(t.MACROBLOCK_ADDRESS_INCREMENT);
        if (e += n,
        this.sliceBegin)
            this.sliceBegin = !1,
            this.macroblockAddress += e;
        else {
            if (this.macroblockAddress + e >= this.mbSize)
                return;
            for (e > 1 && (this.dcPredictorY = 128,
            this.dcPredictorCr = 128,
            this.dcPredictorCb = 128,
            this.pictureType === t.PICTURE_TYPE.PREDICTIVE && (this.motionFwH = this.motionFwHPrev = 0,
            this.motionFwV = this.motionFwVPrev = 0)); e > 1; )
                this.macroblockAddress++,
                this.mbRow = this.macroblockAddress / this.mbWidth | 0,
                this.mbCol = this.macroblockAddress % this.mbWidth,
                this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb),
                e--;
            this.macroblockAddress++
        }
        this.mbRow = this.macroblockAddress / this.mbWidth | 0,
        this.mbCol = this.macroblockAddress % this.mbWidth;
        var i = t.MACROBLOCK_TYPE[this.pictureType];
        this.macroblockType = this.readHuffman(i),
        this.macroblockIntra = 1 & this.macroblockType,
        this.macroblockMotFw = 8 & this.macroblockType,
        0 != (16 & this.macroblockType) && (this.quantizerScale = this.bits.read(5)),
        this.macroblockIntra ? (this.motionFwH = this.motionFwHPrev = 0,
        this.motionFwV = this.motionFwVPrev = 0) : (this.dcPredictorY = 128,
        this.dcPredictorCr = 128,
        this.dcPredictorCb = 128,
        this.decodeMotionVectors(),
        this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb));
        for (var r = 0 != (2 & this.macroblockType) ? this.readHuffman(t.CODE_BLOCK_PATTERN) : this.macroblockIntra ? 63 : 0, o = 0, s = 32; o < 6; o++)
            0 != (r & s) && this.decodeBlock(o),
            s >>= 1
    }
    ,
    t.prototype.decodeMotionVectors = function() {
        var e, n, i = 0;
        this.macroblockMotFw ? (e = this.readHuffman(t.MOTION),
        0 !== e && 1 !== this.forwardF ? (i = this.bits.read(this.forwardRSize),
        n = (Math.abs(e) - 1 << this.forwardRSize) + i + 1,
        e < 0 && (n = -n)) : n = e,
        this.motionFwHPrev += n,
        this.motionFwHPrev > (this.forwardF << 4) - 1 ? this.motionFwHPrev -= this.forwardF << 5 : this.motionFwHPrev < -this.forwardF << 4 && (this.motionFwHPrev += this.forwardF << 5),
        this.motionFwH = this.motionFwHPrev,
        this.fullPelForward && (this.motionFwH <<= 1),
        e = this.readHuffman(t.MOTION),
        0 !== e && 1 !== this.forwardF ? (i = this.bits.read(this.forwardRSize),
        n = (Math.abs(e) - 1 << this.forwardRSize) + i + 1,
        e < 0 && (n = -n)) : n = e,
        this.motionFwVPrev += n,
        this.motionFwVPrev > (this.forwardF << 4) - 1 ? this.motionFwVPrev -= this.forwardF << 5 : this.motionFwVPrev < -this.forwardF << 4 && (this.motionFwVPrev += this.forwardF << 5),
        this.motionFwV = this.motionFwVPrev,
        this.fullPelForward && (this.motionFwV <<= 1)) : this.pictureType === t.PICTURE_TYPE.PREDICTIVE && (this.motionFwH = this.motionFwHPrev = 0,
        this.motionFwV = this.motionFwVPrev = 0)
    }
    ,
    t.prototype.copyMacroblock = function(t, e, n, i, r) {
        var o, s, a, u, l, c, d, h, f, p = this.currentY32, m = this.currentCb32, g = this.currentCr32;
        o = this.codedWidth,
        s = o - 16,
        a = t >> 1,
        u = e >> 1,
        l = 1 == (1 & t),
        c = 1 == (1 & e),
        d = ((this.mbRow << 4) + u) * o + (this.mbCol << 4) + a,
        h = this.mbRow * o + this.mbCol << 2,
        f = h + (o << 2);
        var v, y, b, x;
        if (l)
            if (c)
                for (; h < f; ) {
                    for (y = n[d] + n[d + o],
                    d++,
                    v = 0; v < 4; v++)
                        b = n[d] + n[d + o],
                        d++,
                        x = y + b + 2 >> 2 & 255,
                        y = n[d] + n[d + o],
                        d++,
                        x |= y + b + 2 << 6 & 65280,
                        b = n[d] + n[d + o],
                        d++,
                        x |= y + b + 2 << 14 & 16711680,
                        y = n[d] + n[d + o],
                        d++,
                        x |= y + b + 2 << 22 & 4278190080,
                        p[h++] = x;
                    h += s >> 2,
                    d += s - 1
                }
            else
                for (; h < f; ) {
                    for (y = n[d++],
                    v = 0; v < 4; v++)
                        b = n[d++],
                        x = y + b + 1 >> 1 & 255,
                        y = n[d++],
                        x |= y + b + 1 << 7 & 65280,
                        b = n[d++],
                        x |= y + b + 1 << 15 & 16711680,
                        y = n[d++],
                        x |= y + b + 1 << 23 & 4278190080,
                        p[h++] = x;
                    h += s >> 2,
                    d += s - 1
                }
        else if (c)
            for (; h < f; ) {
                for (v = 0; v < 4; v++)
                    x = n[d] + n[d + o] + 1 >> 1 & 255,
                    d++,
                    x |= n[d] + n[d + o] + 1 << 7 & 65280,
                    d++,
                    x |= n[d] + n[d + o] + 1 << 15 & 16711680,
                    d++,
                    x |= n[d] + n[d + o] + 1 << 23 & 4278190080,
                    d++,
                    p[h++] = x;
                h += s >> 2,
                d += s
            }
        else
            for (; h < f; ) {
                for (v = 0; v < 4; v++)
                    x = n[d],
                    d++,
                    x |= n[d] << 8,
                    d++,
                    x |= n[d] << 16,
                    d++,
                    x |= n[d] << 24,
                    d++,
                    p[h++] = x;
                h += s >> 2,
                d += s
            }
        o = this.halfWidth,
        s = o - 8,
        a = t / 2 >> 1,
        u = e / 2 >> 1,
        l = 1 == (t / 2 & 1),
        c = 1 == (e / 2 & 1),
        d = ((this.mbRow << 3) + u) * o + (this.mbCol << 3) + a,
        h = this.mbRow * o + this.mbCol << 1,
        f = h + (o << 1);
        var w, T, C, E, A, _;
        if (l)
            if (c)
                for (; h < f; ) {
                    for (w = i[d] + i[d + o],
                    E = r[d] + r[d + o],
                    d++,
                    v = 0; v < 2; v++)
                        T = i[d] + i[d + o],
                        A = r[d] + r[d + o],
                        d++,
                        C = w + T + 2 >> 2 & 255,
                        _ = E + A + 2 >> 2 & 255,
                        w = i[d] + i[d + o],
                        E = r[d] + r[d + o],
                        d++,
                        C |= w + T + 2 << 6 & 65280,
                        _ |= E + A + 2 << 6 & 65280,
                        T = i[d] + i[d + o],
                        A = r[d] + r[d + o],
                        d++,
                        C |= w + T + 2 << 14 & 16711680,
                        _ |= E + A + 2 << 14 & 16711680,
                        w = i[d] + i[d + o],
                        E = r[d] + r[d + o],
                        d++,
                        C |= w + T + 2 << 22 & 4278190080,
                        _ |= E + A + 2 << 22 & 4278190080,
                        g[h] = C,
                        m[h] = _,
                        h++;
                    h += s >> 2,
                    d += s - 1
                }
            else
                for (; h < f; ) {
                    for (w = i[d],
                    E = r[d],
                    d++,
                    v = 0; v < 2; v++)
                        T = i[d],
                        A = r[d++],
                        C = w + T + 1 >> 1 & 255,
                        _ = E + A + 1 >> 1 & 255,
                        w = i[d],
                        E = r[d++],
                        C |= w + T + 1 << 7 & 65280,
                        _ |= E + A + 1 << 7 & 65280,
                        T = i[d],
                        A = r[d++],
                        C |= w + T + 1 << 15 & 16711680,
                        _ |= E + A + 1 << 15 & 16711680,
                        w = i[d],
                        E = r[d++],
                        C |= w + T + 1 << 23 & 4278190080,
                        _ |= E + A + 1 << 23 & 4278190080,
                        g[h] = C,
                        m[h] = _,
                        h++;
                    h += s >> 2,
                    d += s - 1
                }
        else if (c)
            for (; h < f; ) {
                for (v = 0; v < 2; v++)
                    C = i[d] + i[d + o] + 1 >> 1 & 255,
                    _ = r[d] + r[d + o] + 1 >> 1 & 255,
                    d++,
                    C |= i[d] + i[d + o] + 1 << 7 & 65280,
                    _ |= r[d] + r[d + o] + 1 << 7 & 65280,
                    d++,
                    C |= i[d] + i[d + o] + 1 << 15 & 16711680,
                    _ |= r[d] + r[d + o] + 1 << 15 & 16711680,
                    d++,
                    C |= i[d] + i[d + o] + 1 << 23 & 4278190080,
                    _ |= r[d] + r[d + o] + 1 << 23 & 4278190080,
                    d++,
                    g[h] = C,
                    m[h] = _,
                    h++;
                h += s >> 2,
                d += s
            }
        else
            for (; h < f; ) {
                for (v = 0; v < 2; v++)
                    C = i[d],
                    _ = r[d],
                    d++,
                    C |= i[d] << 8,
                    _ |= r[d] << 8,
                    d++,
                    C |= i[d] << 16,
                    _ |= r[d] << 16,
                    d++,
                    C |= i[d] << 24,
                    _ |= r[d] << 24,
                    d++,
                    g[h] = C,
                    m[h] = _,
                    h++;
                h += s >> 2,
                d += s
            }
    }
    ,
    t.prototype.dcPredictorY = 0,
    t.prototype.dcPredictorCr = 0,
    t.prototype.dcPredictorCb = 0,
    t.prototype.blockData = null,
    t.prototype.decodeBlock = function(e) {
        var n, i = 0;
        if (this.macroblockIntra) {
            var r, o;
            if (e < 4 ? (r = this.dcPredictorY,
            o = this.readHuffman(t.DCT_DC_SIZE_LUMINANCE)) : (r = 4 === e ? this.dcPredictorCr : this.dcPredictorCb,
            o = this.readHuffman(t.DCT_DC_SIZE_CHROMINANCE)),
            o > 0) {
                var s = this.bits.read(o);
                this.blockData[0] = 0 != (s & 1 << o - 1) ? r + s : r + (-1 << o | s + 1)
            } else
                this.blockData[0] = r;
            e < 4 ? this.dcPredictorY = this.blockData[0] : 4 === e ? this.dcPredictorCr = this.blockData[0] : this.dcPredictorCb = this.blockData[0],
            this.blockData[0] <<= 8,
            n = this.intraQuantMatrix,
            i = 1
        } else
            n = this.nonIntraQuantMatrix;
        for (var a = 0; ; ) {
            var u = 0
              , l = this.readHuffman(t.DCT_COEFF);
            if (1 === l && i > 0 && 0 === this.bits.read(1))
                break;
            65535 === l ? (u = this.bits.read(6),
            a = this.bits.read(8),
            0 === a ? a = this.bits.read(8) : 128 === a ? a = this.bits.read(8) - 256 : a > 128 && (a -= 256)) : (u = l >> 8,
            a = 255 & l,
            this.bits.read(1) && (a = -a)),
            i += u;
            var c = t.ZIG_ZAG[i];
            i++,
            a <<= 1,
            this.macroblockIntra || (a += a < 0 ? -1 : 1),
            a = a * this.quantizerScale * n[c] >> 4,
            0 == (1 & a) && (a -= a > 0 ? 1 : -1),
            a > 2047 ? a = 2047 : a < -2048 && (a = -2048),
            this.blockData[c] = a * t.PREMULTIPLIER_MATRIX[c]
        }
        var d, h, f;
        e < 4 ? (d = this.currentY,
        f = this.codedWidth - 8,
        h = this.mbRow * this.codedWidth + this.mbCol << 4,
        0 != (1 & e) && (h += 8),
        0 != (2 & e) && (h += this.codedWidth << 3)) : (d = 4 === e ? this.currentCb : this.currentCr,
        f = (this.codedWidth >> 1) - 8,
        h = (this.mbRow * this.codedWidth << 2) + (this.mbCol << 3)),
        this.macroblockIntra ? 1 === i ? (t.CopyValueToDestination(this.blockData[0] + 128 >> 8, d, h, f),
        this.blockData[0] = 0) : (t.IDCT(this.blockData),
        t.CopyBlockToDestination(this.blockData, d, h, f),
        JSMpeg.Fill(this.blockData, 0)) : 1 === i ? (t.AddValueToDestination(this.blockData[0] + 128 >> 8, d, h, f),
        this.blockData[0] = 0) : (t.IDCT(this.blockData),
        t.AddBlockToDestination(this.blockData, d, h, f),
        JSMpeg.Fill(this.blockData, 0)),
        i = 0
    }
    ,
    t.CopyBlockToDestination = function(t, e, n, i) {
        for (var r = 0; r < 64; r += 8,
        n += i + 8)
            e[n + 0] = t[r + 0],
            e[n + 1] = t[r + 1],
            e[n + 2] = t[r + 2],
            e[n + 3] = t[r + 3],
            e[n + 4] = t[r + 4],
            e[n + 5] = t[r + 5],
            e[n + 6] = t[r + 6],
            e[n + 7] = t[r + 7]
    }
    ,
    t.AddBlockToDestination = function(t, e, n, i) {
        for (var r = 0; r < 64; r += 8,
        n += i + 8)
            e[n + 0] += t[r + 0],
            e[n + 1] += t[r + 1],
            e[n + 2] += t[r + 2],
            e[n + 3] += t[r + 3],
            e[n + 4] += t[r + 4],
            e[n + 5] += t[r + 5],
            e[n + 6] += t[r + 6],
            e[n + 7] += t[r + 7]
    }
    ,
    t.CopyValueToDestination = function(t, e, n, i) {
        for (var r = 0; r < 64; r += 8,
        n += i + 8)
            e[n + 0] = t,
            e[n + 1] = t,
            e[n + 2] = t,
            e[n + 3] = t,
            e[n + 4] = t,
            e[n + 5] = t,
            e[n + 6] = t,
            e[n + 7] = t
    }
    ,
    t.AddValueToDestination = function(t, e, n, i) {
        for (var r = 0; r < 64; r += 8,
        n += i + 8)
            e[n + 0] += t,
            e[n + 1] += t,
            e[n + 2] += t,
            e[n + 3] += t,
            e[n + 4] += t,
            e[n + 5] += t,
            e[n + 6] += t,
            e[n + 7] += t
    }
    ,
    t.IDCT = function(t) {
        for (var e, n, i, r, o, s, a, u, l, c, d, h, f, p, m, g, v, y, b = 0; b < 8; ++b)
            e = t[32 + b],
            n = t[16 + b] + t[48 + b],
            i = t[40 + b] - t[24 + b],
            s = t[8 + b] + t[56 + b],
            a = t[24 + b] + t[40 + b],
            r = t[8 + b] - t[56 + b],
            o = s + a,
            u = t[0 + b],
            f = (473 * r - 196 * i + 128 >> 8) - o,
            l = f - (362 * (s - a) + 128 >> 8),
            c = u - e,
            d = (362 * (t[16 + b] - t[48 + b]) + 128 >> 8) - n,
            h = u + e,
            p = c + d,
            m = h + n,
            g = c - d,
            v = h - n,
            y = -l - (473 * i + 196 * r + 128 >> 8),
            t[0 + b] = o + m,
            t[8 + b] = f + p,
            t[16 + b] = g - l,
            t[24 + b] = v - y,
            t[32 + b] = v + y,
            t[40 + b] = l + g,
            t[48 + b] = p - f,
            t[56 + b] = m - o;
        for (var b = 0; b < 64; b += 8)
            e = t[4 + b],
            n = t[2 + b] + t[6 + b],
            i = t[5 + b] - t[3 + b],
            s = t[1 + b] + t[7 + b],
            a = t[3 + b] + t[5 + b],
            r = t[1 + b] - t[7 + b],
            o = s + a,
            u = t[0 + b],
            f = (473 * r - 196 * i + 128 >> 8) - o,
            l = f - (362 * (s - a) + 128 >> 8),
            c = u - e,
            d = (362 * (t[2 + b] - t[6 + b]) + 128 >> 8) - n,
            h = u + e,
            p = c + d,
            m = h + n,
            g = c - d,
            v = h - n,
            y = -l - (473 * i + 196 * r + 128 >> 8),
            t[0 + b] = o + m + 128 >> 8,
            t[1 + b] = f + p + 128 >> 8,
            t[2 + b] = g - l + 128 >> 8,
            t[3 + b] = v - y + 128 >> 8,
            t[4 + b] = v + y + 128 >> 8,
            t[5 + b] = l + g + 128 >> 8,
            t[6 + b] = p - f + 128 >> 8,
            t[7 + b] = m - o + 128 >> 8
    }
    ,
    t.PICTURE_RATE = [0, 23.976, 24, 25, 29.97, 30, 50, 59.94, 60, 0, 0, 0, 0, 0, 0, 0],
    t.ZIG_ZAG = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]),
    t.DEFAULT_INTRA_QUANT_MATRIX = new Uint8Array([8, 16, 19, 22, 26, 27, 29, 34, 16, 16, 22, 24, 27, 29, 34, 37, 19, 22, 26, 27, 29, 34, 34, 38, 22, 22, 26, 27, 29, 34, 37, 40, 22, 26, 27, 29, 32, 35, 40, 48, 26, 27, 29, 32, 35, 40, 48, 58, 26, 27, 29, 34, 38, 46, 56, 69, 27, 29, 35, 38, 46, 56, 69, 83]),
    t.DEFAULT_NON_INTRA_QUANT_MATRIX = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]),
    t.PREMULTIPLIER_MATRIX = new Uint8Array([32, 44, 42, 38, 32, 25, 17, 9, 44, 62, 58, 52, 44, 35, 24, 12, 42, 58, 55, 49, 42, 33, 23, 12, 38, 52, 49, 44, 38, 30, 20, 10, 32, 44, 42, 38, 32, 25, 17, 9, 25, 35, 33, 30, 25, 20, 14, 7, 17, 24, 23, 20, 17, 14, 9, 5, 9, 12, 12, 10, 9, 7, 5, 2]),
    t.MACROBLOCK_ADDRESS_INCREMENT = new Int16Array([3, 6, 0, 9, 12, 0, 0, 0, 1, 15, 18, 0, 21, 24, 0, 27, 30, 0, 33, 36, 0, 0, 0, 3, 0, 0, 2, 39, 42, 0, 45, 48, 0, 0, 0, 5, 0, 0, 4, 51, 54, 0, 57, 60, 0, 0, 0, 7, 0, 0, 6, 63, 66, 0, 69, 72, 0, 75, 78, 0, 81, 84, 0, -1, 87, 0, -1, 90, 0, 93, 96, 0, 99, 102, 0, 105, 108, 0, 111, 114, 0, 0, 0, 9, 0, 0, 8, 117, 120, 0, 123, 126, 0, 129, 132, 0, 135, 138, 0, 0, 0, 15, 0, 0, 14, 0, 0, 13, 0, 0, 12, 0, 0, 11, 0, 0, 10, 141, -1, 0, -1, 144, 0, 147, 150, 0, 153, 156, 0, 159, 162, 0, 165, 168, 0, 171, 174, 0, 177, 180, 0, 183, -1, 0, -1, 186, 0, 189, 192, 0, 195, 198, 0, 201, 204, 0, 207, 210, 0, 213, 216, 0, 219, 222, 0, 0, 0, 21, 0, 0, 20, 0, 0, 19, 0, 0, 18, 0, 0, 17, 0, 0, 16, 0, 0, 35, 0, 0, 34, 0, 0, 33, 0, 0, 32, 0, 0, 31, 0, 0, 30, 0, 0, 29, 0, 0, 28, 0, 0, 27, 0, 0, 26, 0, 0, 25, 0, 0, 24, 0, 0, 23, 0, 0, 22]),
    t.MACROBLOCK_TYPE_INTRA = new Int8Array([3, 6, 0, -1, 9, 0, 0, 0, 1, 0, 0, 17]),
    t.MACROBLOCK_TYPE_PREDICTIVE = new Int8Array([3, 6, 0, 9, 12, 0, 0, 0, 10, 15, 18, 0, 0, 0, 2, 21, 24, 0, 0, 0, 8, 27, 30, 0, 33, 36, 0, -1, 39, 0, 0, 0, 18, 0, 0, 26, 0, 0, 1, 0, 0, 17]),
    t.MACROBLOCK_TYPE_B = new Int8Array([3, 6, 0, 9, 15, 0, 12, 18, 0, 24, 21, 0, 0, 0, 12, 27, 30, 0, 0, 0, 14, 39, 42, 0, 36, 33, 0, 0, 0, 4, 0, 0, 6, 54, 48, 0, 45, 51, 0, 0, 0, 8, 0, 0, 10, -1, 57, 0, 0, 0, 1, 60, 63, 0, 0, 0, 30, 0, 0, 17, 0, 0, 22, 0, 0, 26]),
    t.MACROBLOCK_TYPE = [null, t.MACROBLOCK_TYPE_INTRA, t.MACROBLOCK_TYPE_PREDICTIVE, t.MACROBLOCK_TYPE_B],
    t.CODE_BLOCK_PATTERN = new Int16Array([6, 3, 0, 9, 18, 0, 12, 15, 0, 24, 33, 0, 36, 39, 0, 27, 21, 0, 30, 42, 0, 60, 57, 0, 54, 48, 0, 69, 51, 0, 81, 75, 0, 63, 84, 0, 45, 66, 0, 72, 78, 0, 0, 0, 60, 105, 120, 0, 132, 144, 0, 114, 108, 0, 126, 141, 0, 87, 93, 0, 117, 96, 0, 0, 0, 32, 135, 138, 0, 99, 123, 0, 129, 102, 0, 0, 0, 4, 90, 111, 0, 0, 0, 8, 0, 0, 16, 0, 0, 44, 150, 168, 0, 0, 0, 28, 0, 0, 52, 0, 0, 62, 183, 177, 0, 156, 180, 0, 0, 0, 1, 165, 162, 0, 0, 0, 61, 0, 0, 56, 171, 174, 0, 0, 0, 2, 0, 0, 40, 153, 186, 0, 0, 0, 48, 192, 189, 0, 147, 159, 0, 0, 0, 20, 0, 0, 12, 240, 249, 0, 0, 0, 63, 231, 225, 0, 195, 219, 0, 252, 198, 0, 0, 0, 24, 0, 0, 36, 0, 0, 3, 207, 261, 0, 243, 237, 0, 204, 213, 0, 210, 234, 0, 201, 228, 0, 216, 222, 0, 258, 255, 0, 264, 246, 0, -1, 282, 0, 285, 291, 0, 0, 0, 33, 0, 0, 9, 318, 330, 0, 306, 348, 0, 0, 0, 5, 0, 0, 10, 279, 267, 0, 0, 0, 6, 0, 0, 18, 0, 0, 17, 0, 0, 34, 339, 357, 0, 309, 312, 0, 270, 276, 0, 327, 321, 0, 351, 354, 0, 303, 297, 0, 294, 288, 0, 300, 273, 0, 342, 345, 0, 315, 324, 0, 336, 333, 0, 363, 375, 0, 0, 0, 41, 0, 0, 14, 0, 0, 21, 372, 366, 0, 360, 369, 0, 0, 0, 11, 0, 0, 19, 0, 0, 7, 0, 0, 35, 0, 0, 13, 0, 0, 50, 0, 0, 49, 0, 0, 58, 0, 0, 37, 0, 0, 25, 0, 0, 45, 0, 0, 57, 0, 0, 26, 0, 0, 29, 0, 0, 38, 0, 0, 53, 0, 0, 23, 0, 0, 43, 0, 0, 46, 0, 0, 42, 0, 0, 22, 0, 0, 54, 0, 0, 51, 0, 0, 15, 0, 0, 30, 0, 0, 39, 0, 0, 47, 0, 0, 55, 0, 0, 27, 0, 0, 59, 0, 0, 31]),
    t.MOTION = new Int16Array([3, 6, 0, 12, 9, 0, 0, 0, 0, 18, 15, 0, 24, 21, 0, 0, 0, -1, 0, 0, 1, 27, 30, 0, 36, 33, 0, 0, 0, 2, 0, 0, -2, 42, 45, 0, 48, 39, 0, 60, 54, 0, 0, 0, 3, 0, 0, -3, 51, 57, 0, -1, 69, 0, 81, 75, 0, 78, 63, 0, 72, 66, 0, 96, 84, 0, 87, 93, 0, -1, 99, 0, 108, 105, 0, 0, 0, -4, 90, 102, 0, 0, 0, 4, 0, 0, -7, 0, 0, 5, 111, 123, 0, 0, 0, -5, 0, 0, 7, 114, 120, 0, 126, 117, 0, 0, 0, -6, 0, 0, 6, 153, 162, 0, 150, 147, 0, 135, 138, 0, 156, 141, 0, 129, 159, 0, 132, 144, 0, 0, 0, 10, 0, 0, 9, 0, 0, 8, 0, 0, -8, 171, 198, 0, 0, 0, -9, 180, 192, 0, 168, 183, 0, 165, 186, 0, 174, 189, 0, 0, 0, -10, 177, 195, 0, 0, 0, 12, 0, 0, 16, 0, 0, 13, 0, 0, 14, 0, 0, 11, 0, 0, 15, 0, 0, -16, 0, 0, -12, 0, 0, -14, 0, 0, -15, 0, 0, -11, 0, 0, -13]),
    t.DCT_DC_SIZE_LUMINANCE = new Int8Array([6, 3, 0, 18, 15, 0, 9, 12, 0, 0, 0, 1, 0, 0, 2, 27, 24, 0, 21, 30, 0, 0, 0, 0, 36, 33, 0, 0, 0, 4, 0, 0, 3, 39, 42, 0, 0, 0, 5, 0, 0, 6, 48, 45, 0, 51, -1, 0, 0, 0, 7, 0, 0, 8]),
    t.DCT_DC_SIZE_CHROMINANCE = new Int8Array([6, 3, 0, 12, 9, 0, 18, 15, 0, 24, 21, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 30, 27, 0, 0, 0, 3, 36, 33, 0, 0, 0, 4, 42, 39, 0, 0, 0, 5, 48, 45, 0, 0, 0, 6, 51, -1, 0, 0, 0, 7, 0, 0, 8]),
    t.DCT_COEFF = new Int32Array([3, 6, 0, 12, 9, 0, 0, 0, 1, 21, 24, 0, 18, 15, 0, 39, 27, 0, 33, 30, 0, 42, 36, 0, 0, 0, 257, 60, 66, 0, 54, 63, 0, 48, 57, 0, 0, 0, 513, 51, 45, 0, 0, 0, 2, 0, 0, 3, 81, 75, 0, 87, 93, 0, 72, 78, 0, 96, 90, 0, 0, 0, 1025, 69, 84, 0, 0, 0, 769, 0, 0, 258, 0, 0, 1793, 0, 0, 65535, 0, 0, 1537, 111, 108, 0, 0, 0, 1281, 105, 102, 0, 117, 114, 0, 99, 126, 0, 120, 123, 0, 156, 150, 0, 162, 159, 0, 144, 147, 0, 129, 135, 0, 138, 132, 0, 0, 0, 2049, 0, 0, 4, 0, 0, 514, 0, 0, 2305, 153, 141, 0, 165, 171, 0, 180, 168, 0, 177, 174, 0, 183, 186, 0, 0, 0, 2561, 0, 0, 3329, 0, 0, 6, 0, 0, 259, 0, 0, 5, 0, 0, 770, 0, 0, 2817, 0, 0, 3073, 228, 225, 0, 201, 210, 0, 219, 213, 0, 234, 222, 0, 216, 231, 0, 207, 192, 0, 204, 189, 0, 198, 195, 0, 243, 261, 0, 273, 240, 0, 246, 237, 0, 249, 258, 0, 279, 276, 0, 252, 255, 0, 270, 282, 0, 264, 267, 0, 0, 0, 515, 0, 0, 260, 0, 0, 7, 0, 0, 1026, 0, 0, 1282, 0, 0, 4097, 0, 0, 3841, 0, 0, 3585, 315, 321, 0, 333, 342, 0, 312, 291, 0, 375, 357, 0, 288, 294, 0, -1, 369, 0, 285, 303, 0, 318, 363, 0, 297, 306, 0, 339, 309, 0, 336, 348, 0, 330, 300, 0, 372, 345, 0, 351, 366, 0, 327, 354, 0, 360, 324, 0, 381, 408, 0, 417, 420, 0, 390, 378, 0, 435, 438, 0, 384, 387, 0, 0, 0, 2050, 396, 402, 0, 465, 462, 0, 0, 0, 8, 411, 399, 0, 429, 432, 0, 453, 414, 0, 426, 423, 0, 0, 0, 10, 0, 0, 9, 0, 0, 11, 0, 0, 5377, 0, 0, 1538, 0, 0, 771, 0, 0, 5121, 0, 0, 1794, 0, 0, 4353, 0, 0, 4609, 0, 0, 4865, 444, 456, 0, 0, 0, 1027, 459, 450, 0, 0, 0, 261, 393, 405, 0, 0, 0, 516, 447, 441, 0, 516, 519, 0, 486, 474, 0, 510, 483, 0, 504, 498, 0, 471, 537, 0, 507, 501, 0, 522, 513, 0, 534, 531, 0, 468, 477, 0, 492, 495, 0, 549, 546, 0, 525, 528, 0, 0, 0, 263, 0, 0, 2562, 0, 0, 2306, 0, 0, 5633, 0, 0, 5889, 0, 0, 6401, 0, 0, 6145, 0, 0, 1283, 0, 0, 772, 0, 0, 13, 0, 0, 12, 0, 0, 14, 0, 0, 15, 0, 0, 517, 0, 0, 6657, 0, 0, 262, 540, 543, 0, 480, 489, 0, 588, 597, 0, 0, 0, 27, 609, 555, 0, 606, 603, 0, 0, 0, 19, 0, 0, 22, 591, 621, 0, 0, 0, 18, 573, 576, 0, 564, 570, 0, 0, 0, 20, 552, 582, 0, 0, 0, 21, 558, 579, 0, 0, 0, 23, 612, 594, 0, 0, 0, 25, 0, 0, 24, 600, 615, 0, 0, 0, 31, 0, 0, 30, 0, 0, 28, 0, 0, 29, 0, 0, 26, 0, 0, 17, 0, 0, 16, 567, 618, 0, 561, 585, 0, 654, 633, 0, 0, 0, 37, 645, 648, 0, 0, 0, 36, 630, 636, 0, 0, 0, 34, 639, 627, 0, 663, 666, 0, 657, 624, 0, 651, 642, 0, 669, 660, 0, 0, 0, 35, 0, 0, 267, 0, 0, 40, 0, 0, 268, 0, 0, 266, 0, 0, 32, 0, 0, 264, 0, 0, 265, 0, 0, 38, 0, 0, 269, 0, 0, 270, 0, 0, 33, 0, 0, 39, 0, 0, 7937, 0, 0, 6913, 0, 0, 7681, 0, 0, 4098, 0, 0, 7425, 0, 0, 7169, 0, 0, 271, 0, 0, 274, 0, 0, 273, 0, 0, 272, 0, 0, 1539, 0, 0, 2818, 0, 0, 3586, 0, 0, 3330, 0, 0, 3074, 0, 0, 3842]),
    t.PICTURE_TYPE = {
        INTRA: 1,
        PREDICTIVE: 2,
        B: 3
    },
    t.START = {
        SEQUENCE: 179,
        SLICE_FIRST: 1,
        SLICE_LAST: 175,
        PICTURE: 0,
        EXTENSION: 181,
        USER_DATA: 178
    },
    t
}(),
JSMpeg.Decoder.MP2Audio = function() {
    "use strict";
    var t = function(e) {
        JSMpeg.Decoder.Base.call(this, e);
        var n = e.audioBufferSize || 131072
          , i = e.streaming ? JSMpeg.BitBuffer.MODE.EVICT : JSMpeg.BitBuffer.MODE.EXPAND;
        this.bits = new JSMpeg.BitBuffer(n,i),
        this.left = new Float32Array(1152),
        this.right = new Float32Array(1152),
        this.sampleRate = 44100,
        this.D = new Float32Array(1024),
        this.D.set(t.SYNTHESIS_WINDOW, 0),
        this.D.set(t.SYNTHESIS_WINDOW, 512),
        this.V = new Float32Array(1024),
        this.U = new Int32Array(32),
        this.VPos = 0,
        this.allocation = [new Array(32), new Array(32)],
        this.scaleFactorInfo = [new Uint8Array(32), new Uint8Array(32)],
        this.scaleFactor = [new Array(32), new Array(32)],
        this.sample = [new Array(32), new Array(32)];
        for (var r = 0; r < 2; r++)
            for (var o = 0; o < 32; o++)
                this.scaleFactor[r][o] = [0, 0, 0],
                this.sample[r][o] = [0, 0, 0]
    };
    return t.prototype = Object.create(JSMpeg.Decoder.Base.prototype),
    t.prototype.constructor = t,
    t.prototype.decode = function() {
        var t = this.bits.index >> 3;
        if (t >= this.bits.byteLength)
            return !1;
        var e = this.decodeFrame(this.left, this.right);
        return this.bits.index = t + e << 3,
        !!e && (this.destination && this.destination.play(this.sampleRate, this.left, this.right),
        this.advanceDecodedTime(this.left.length / this.sampleRate),
        !0)
    }
    ,
    t.prototype.getCurrentTime = function() {
        var t = this.destination ? this.destination.enqueuedTime : 0;
        return this.decodedTime - t
    }
    ,
    t.prototype.decodeFrame = function(e, n) {
        var i = this.bits.read(11)
          , r = this.bits.read(2)
          , o = this.bits.read(2)
          , s = !this.bits.read(1);
        if (i !== t.FRAME_SYNC || r !== t.VERSION.MPEG_1 || o !== t.LAYER.II)
            return 0;
        var a = this.bits.read(4) - 1;
        if (a > 13)
            return 0;
        var u = this.bits.read(2)
          , l = t.SAMPLE_RATE[u];
        if (3 === u)
            return 0;
        r === t.VERSION.MPEG_2 && (u += 4,
        a += 14);
        var c = this.bits.read(1)
          , d = (this.bits.read(1),
        this.bits.read(2))
          , h = 0;
        d === t.MODE.JOINT_STEREO ? h = this.bits.read(2) + 1 << 2 : (this.bits.skip(2),
        h = d === t.MODE.MONO ? 0 : 32),
        this.bits.skip(4),
        s && this.bits.skip(16);
        var f = t.BIT_RATE[a]
          , l = t.SAMPLE_RATE[u]
          , p = 144e3 * f / l + c | 0
          , m = 0
          , g = 0;
        if (r === t.VERSION.MPEG_2)
            m = 2,
            g = 30;
        else {
            var v = d === t.MODE.MONO ? 0 : 1
              , y = t.QUANT_LUT_STEP_1[v][a];
            m = t.QUANT_LUT_STEP_2[y][u],
            g = 63 & m,
            m >>= 6
        }
        h > g && (h = g);
        for (var b = 0; b < h; b++)
            this.allocation[0][b] = this.readAllocation(b, m),
            this.allocation[1][b] = this.readAllocation(b, m);
        for (var b = h; b < g; b++)
            this.allocation[0][b] = this.allocation[1][b] = this.readAllocation(b, m);
        for (var x = d === t.MODE.MONO ? 1 : 2, b = 0; b < g; b++) {
            for (w = 0; w < x; w++)
                this.allocation[w][b] && (this.scaleFactorInfo[w][b] = this.bits.read(2));
            d === t.MODE.MONO && (this.scaleFactorInfo[1][b] = this.scaleFactorInfo[0][b])
        }
        for (var b = 0; b < g; b++) {
            for (var w = 0; w < x; w++)
                if (this.allocation[w][b]) {
                    var T = this.scaleFactor[w][b];
                    switch (this.scaleFactorInfo[w][b]) {
                    case 0:
                        T[0] = this.bits.read(6),
                        T[1] = this.bits.read(6),
                        T[2] = this.bits.read(6);
                        break;
                    case 1:
                        T[0] = T[1] = this.bits.read(6),
                        T[2] = this.bits.read(6);
                        break;
                    case 2:
                        T[0] = T[1] = T[2] = this.bits.read(6);
                        break;
                    case 3:
                        T[0] = this.bits.read(6),
                        T[1] = T[2] = this.bits.read(6)
                    }
                }
            d === t.MODE.MONO && (this.scaleFactor[1][b][0] = this.scaleFactor[0][b][0],
            this.scaleFactor[1][b][1] = this.scaleFactor[0][b][1],
            this.scaleFactor[1][b][2] = this.scaleFactor[0][b][2])
        }
        for (var C = 0, E = 0; E < 3; E++)
            for (var A = 0; A < 4; A++) {
                for (var b = 0; b < h; b++)
                    this.readSamples(0, b, E),
                    this.readSamples(1, b, E);
                for (var b = h; b < g; b++)
                    this.readSamples(0, b, E),
                    this.sample[1][b][0] = this.sample[0][b][0],
                    this.sample[1][b][1] = this.sample[0][b][1],
                    this.sample[1][b][2] = this.sample[0][b][2];
                for (var b = g; b < 32; b++)
                    this.sample[0][b][0] = 0,
                    this.sample[0][b][1] = 0,
                    this.sample[0][b][2] = 0,
                    this.sample[1][b][0] = 0,
                    this.sample[1][b][1] = 0,
                    this.sample[1][b][2] = 0;
                for (var _ = 0; _ < 3; _++) {
                    this.VPos = this.VPos - 64 & 1023;
                    for (var w = 0; w < 2; w++) {
                        t.MatrixTransform(this.sample[w], _, this.V, this.VPos),
                        JSMpeg.Fill(this.U, 0);
                        for (var S = 512 - (this.VPos >> 1), k = this.VPos % 128 >> 1; k < 1024; ) {
                            for (var I = 0; I < 32; ++I)
                                this.U[I] += this.D[S++] * this.V[k++];
                            k += 96,
                            S += 32
                        }
                        for (k = 1120 - k,
                        S -= 480; k < 1024; ) {
                            for (var I = 0; I < 32; ++I)
                                this.U[I] += this.D[S++] * this.V[k++];
                            k += 96,
                            S += 32
                        }
                        for (var N = 0 === w ? e : n, M = 0; M < 32; M++)
                            N[C + M] = this.U[M] / 2147418112
                    }
                    C += 32
                }
            }
        return this.sampleRate = l,
        p
    }
    ,
    t.prototype.readAllocation = function(e, n) {
        var i = t.QUANT_LUT_STEP_3[n][e]
          , r = t.QUANT_LUT_STEP4[15 & i][this.bits.read(i >> 4)];
        return r ? t.QUANT_TAB[r - 1] : 0
    }
    ,
    t.prototype.readSamples = function(e, n, i) {
        var r = this.allocation[e][n]
          , o = this.scaleFactor[e][n][i]
          , s = this.sample[e][n]
          , a = 0;
        if (!r)
            return void (s[0] = s[1] = s[2] = 0);
        if (63 === o)
            o = 0;
        else {
            var u = o / 3 | 0;
            o = t.SCALEFACTOR_BASE[o % 3] + (1 << u >> 1) >> u
        }
        var l = r.levels;
        r.group ? (a = this.bits.read(r.bits),
        s[0] = a % l,
        a = a / l | 0,
        s[1] = a % l,
        s[2] = a / l | 0) : (s[0] = this.bits.read(r.bits),
        s[1] = this.bits.read(r.bits),
        s[2] = this.bits.read(r.bits));
        var c = 65536 / (l + 1) | 0;
        l = (l + 1 >> 1) - 1,
        a = (l - s[0]) * c,
        s[0] = a * (o >> 12) + (a * (4095 & o) + 2048 >> 12) >> 12,
        a = (l - s[1]) * c,
        s[1] = a * (o >> 12) + (a * (4095 & o) + 2048 >> 12) >> 12,
        a = (l - s[2]) * c,
        s[2] = a * (o >> 12) + (a * (4095 & o) + 2048 >> 12) >> 12
    }
    ,
    t.MatrixTransform = function(t, e, n, i) {
        var r, o, s, a, u, l, c, d, h, f, p, m, g, v, y, b, x, w, T, C, E, A, _, S, k, I, N, M, P, L, D, R, F;
        r = t[0][e] + t[31][e],
        o = .500602998235 * (t[0][e] - t[31][e]),
        s = t[1][e] + t[30][e],
        a = .505470959898 * (t[1][e] - t[30][e]),
        u = t[2][e] + t[29][e],
        l = .515447309923 * (t[2][e] - t[29][e]),
        c = t[3][e] + t[28][e],
        d = .53104259109 * (t[3][e] - t[28][e]),
        h = t[4][e] + t[27][e],
        f = .553103896034 * (t[4][e] - t[27][e]),
        p = t[5][e] + t[26][e],
        m = .582934968206 * (t[5][e] - t[26][e]),
        g = t[6][e] + t[25][e],
        v = .622504123036 * (t[6][e] - t[25][e]),
        y = t[7][e] + t[24][e],
        b = .674808341455 * (t[7][e] - t[24][e]),
        x = t[8][e] + t[23][e],
        w = .744536271002 * (t[8][e] - t[23][e]),
        T = t[9][e] + t[22][e],
        C = .839349645416 * (t[9][e] - t[22][e]),
        E = t[10][e] + t[21][e],
        A = .972568237862 * (t[10][e] - t[21][e]),
        _ = t[11][e] + t[20][e],
        S = 1.16943993343 * (t[11][e] - t[20][e]),
        k = t[12][e] + t[19][e],
        I = 1.48416461631 * (t[12][e] - t[19][e]),
        N = t[13][e] + t[18][e],
        M = 2.05778100995 * (t[13][e] - t[18][e]),
        P = t[14][e] + t[17][e],
        L = 3.40760841847 * (t[14][e] - t[17][e]),
        D = t[15][e] + t[16][e],
        R = 10.1900081235 * (t[15][e] - t[16][e]),
        F = r + D,
        D = .502419286188 * (r - D),
        r = s + P,
        P = .52249861494 * (s - P),
        s = u + N,
        N = .566944034816 * (u - N),
        u = c + k,
        k = .64682178336 * (c - k),
        c = h + _,
        _ = .788154623451 * (h - _),
        h = p + E,
        E = 1.06067768599 * (p - E),
        p = g + T,
        T = 1.72244709824 * (g - T),
        g = y + x,
        x = 5.10114861869 * (y - x),
        y = F + g,
        g = .509795579104 * (F - g),
        F = r + p,
        r = .601344886935 * (r - p),
        p = s + h,
        h = .899976223136 * (s - h),
        s = u + c,
        c = 2.56291544774 * (u - c),
        u = y + s,
        y = .541196100146 * (y - s),
        s = F + p,
        p = 1.30656296488 * (F - p),
        F = u + s,
        u = .707106781187 * (u - s),
        s = y + p,
        y = .707106781187 * (y - p),
        s += y,
        p = g + c,
        g = .541196100146 * (g - c),
        c = r + h,
        h = 1.30656296488 * (r - h),
        r = p + c,
        c = .707106781187 * (p - c),
        p = g + h,
        g = .707106781187 * (g - h),
        p += g,
        r += p,
        p += c,
        c += g,
        h = D + x,
        D = .509795579104 * (D - x),
        x = P + T,
        P = .601344886935 * (P - T),
        T = N + E,
        E = .899976223136 * (N - E),
        N = k + _,
        _ = 2.56291544774 * (k - _),
        k = h + N,
        h = .541196100146 * (h - N),
        N = x + T,
        T = 1.30656296488 * (x - T),
        x = k + N,
        N = .707106781187 * (k - N),
        k = h + T,
        T = .707106781187 * (h - T),
        k += T,
        h = D + _,
        D = .541196100146 * (D - _),
        _ = P + E,
        E = 1.30656296488 * (P - E),
        P = h + _,
        _ = .707106781187 * (h - _),
        h = D + E,
        D = .707106781187 * (D - E),
        h += D,
        P += h,
        h += _,
        _ += D,
        x += P,
        P += k,
        k += h,
        h += N,
        N += _,
        _ += T,
        T += D,
        E = o + R,
        o = .502419286188 * (o - R),
        R = a + L,
        a = .52249861494 * (a - L),
        L = l + M,
        M = .566944034816 * (l - M),
        l = d + I,
        d = .64682178336 * (d - I),
        I = f + S,
        f = .788154623451 * (f - S),
        S = m + A,
        A = 1.06067768599 * (m - A),
        m = v + C,
        C = 1.72244709824 * (v - C),
        v = b + w,
        b = 5.10114861869 * (b - w),
        w = E + v,
        v = .509795579104 * (E - v),
        E = R + m,
        R = .601344886935 * (R - m),
        m = L + S,
        S = .899976223136 * (L - S),
        L = l + I,
        I = 2.56291544774 * (l - I),
        l = w + L,
        w = .541196100146 * (w - L),
        L = E + m,
        m = 1.30656296488 * (E - m),
        E = l + L,
        L = .707106781187 * (l - L),
        l = w + m,
        m = .707106781187 * (w - m),
        l += m,
        w = v + I,
        I = .541196100146 * (v - I),
        v = R + S,
        S = 1.30656296488 * (R - S),
        R = w + v,
        v = .707106781187 * (w - v),
        w = I + S,
        S = .707106781187 * (I - S),
        w += S,
        R += w,
        w += v,
        I = v + S,
        v = o + b,
        o = .509795579104 * (o - b),
        b = a + C,
        a = .601344886935 * (a - C),
        C = M + A,
        A = .899976223136 * (M - A),
        M = d + f,
        f = 2.56291544774 * (d - f),
        d = v + M,
        v = .541196100146 * (v - M),
        M = b + C,
        C = 1.30656296488 * (b - C),
        b = d + M,
        M = .707106781187 * (d - M),
        d = v + C,
        C = .707106781187 * (v - C),
        d += C,
        v = o + f,
        o = .541196100146 * (o - f),
        f = a + A,
        A = 1.30656296488 * (a - A),
        a = v + f,
        f = .707106781187 * (v - f),
        v = o + A,
        o = .707106781187 * (o - A),
        v += o,
        a += v,
        v += f,
        f += o,
        b += a,
        a += d,
        d += v,
        v += M,
        M += f,
        f += C,
        C += o,
        E += b,
        b += R,
        R += a,
        a += l,
        l += d,
        d += w;
        w += v,
        v += L,
        L += M,
        M += I,
        I += f,
        f += m,
        m += C,
        C += S,
        S += o,
        n[i + 48] = -F,
        n[i + 49] = n[i + 47] = -E,
        n[i + 50] = n[i + 46] = -x,
        n[i + 51] = n[i + 45] = -b,
        n[i + 52] = n[i + 44] = -r,
        n[i + 53] = n[i + 43] = -R,
        n[i + 54] = n[i + 42] = -P,
        n[i + 55] = n[i + 41] = -a,
        n[i + 56] = n[i + 40] = -s,
        n[i + 57] = n[i + 39] = -l,
        n[i + 58] = n[i + 38] = -k,
        n[i + 59] = n[i + 37] = -d,
        n[i + 60] = n[i + 36] = -p,
        n[i + 61] = n[i + 35] = -w,
        n[i + 62] = n[i + 34] = -h,
        n[i + 63] = n[i + 33] = -v,
        n[i + 32] = -u,
        n[i + 0] = u,
        n[i + 31] = -L,
        n[i + 1] = L,
        n[i + 30] = -N,
        n[i + 2] = N,
        n[i + 29] = -M,
        n[i + 3] = M,
        n[i + 28] = -c,
        n[i + 4] = c,
        n[i + 27] = -I,
        n[i + 5] = I,
        n[i + 26] = -_,
        n[i + 6] = _,
        n[i + 25] = -f,
        n[i + 7] = f,
        n[i + 24] = -y,
        n[i + 8] = y,
        n[i + 23] = -m,
        n[i + 9] = m,
        n[i + 22] = -T,
        n[i + 10] = T,
        n[i + 21] = -C,
        n[i + 11] = C,
        n[i + 20] = -g,
        n[i + 12] = g,
        n[i + 19] = -S,
        n[i + 13] = S,
        n[i + 18] = -D,
        n[i + 14] = D,
        n[i + 17] = -o,
        n[i + 15] = o,
        n[i + 16] = 0
    }
    ,
    t.FRAME_SYNC = 2047,
    t.VERSION = {
        MPEG_2_5: 0,
        MPEG_2: 2,
        MPEG_1: 3
    },
    t.LAYER = {
        III: 1,
        II: 2,
        I: 3
    },
    t.MODE = {
        STEREO: 0,
        JOINT_STEREO: 1,
        DUAL_CHANNEL: 2,
        MONO: 3
    },
    t.SAMPLE_RATE = new Uint16Array([44100, 48e3, 32e3, 0, 22050, 24e3, 16e3, 0]),
    t.BIT_RATE = new Uint16Array([32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]),
    t.SCALEFACTOR_BASE = new Uint32Array([33554432, 26632170, 21137968]),
    t.SYNTHESIS_WINDOW = new Float32Array([0, -.5, -.5, -.5, -.5, -.5, -.5, -1, -1, -1, -1, -1.5, -1.5, -2, -2, -2.5, -2.5, -3, -3.5, -3.5, -4, -4.5, -5, -5.5, -6.5, -7, -8, -8.5, -9.5, -10.5, -12, -13, -14.5, -15.5, -17.5, -19, -20.5, -22.5, -24.5, -26.5, -29, -31.5, -34, -36.5, -39.5, -42.5, -45.5, -48.5, -52, -55.5, -58.5, -62.5, -66, -69.5, -73.5, -77, -80.5, -84.5, -88, -91.5, -95, -98, -101, -104, 106.5, 109, 111, 112.5, 113.5, 114, 114, 113.5, 112, 110.5, 107.5, 104, 100, 94.5, 88.5, 81.5, 73, 63.5, 53, 41.5, 28.5, 14.5, -1, -18, -36, -55.5, -76.5, -98.5, -122, -147, -173.5, -200.5, -229.5, -259.5, -290.5, -322.5, -355.5, -389.5, -424, -459.5, -495.5, -532, -568.5, -605, -641.5, -678, -714, -749, -783.5, -817, -849, -879.5, -908.5, -935, -959.5, -981, -1000.5, -1016, -1028.5, -1037.5, -1042.5, -1043.5, -1040, -1031.5, 1018.5, 1e3, 976, 946.5, 911, 869.5, 822, 767.5, 707, 640, 565.5, 485, 397, 302.5, 201, 92.5, -22.5, -144, -272.5, -407, -547.5, -694, -846, -1003, -1165, -1331.5, -1502, -1675.5, -1852.5, -2031.5, -2212.5, -2394, -2576.5, -2758.5, -2939.5, -3118.5, -3294.5, -3467.5, -3635.5, -3798.5, -3955, -4104.5, -4245.5, -4377.5, -4499, -4609.5, -4708, -4792.5, -4863.5, -4919, -4958, -4979.5, -4983, -4967.5, -4931.5, -4875, -4796, -4694.5, -4569.5, -4420, -4246, -4046, -3820, -3567, 3287, 2979.5, 2644, 2280.5, 1888, 1467.5, 1018.5, 541, 35, -499, -1061, -1650, -2266.5, -2909, -3577, -4270, -4987.5, -5727.5, -6490, -7274, -8077.5, -8899.5, -9739, -10594.5, -11464.5, -12347, -13241, -14144.5, -15056, -15973.5, -16895.5, -17820, -18744.5, -19668, -20588, -21503, -22410.5, -23308.5, -24195, -25068.5, -25926.5, -26767, -27589, -28389, -29166.5, -29919, -30644.5, -31342, -32009.5, -32645, -33247, -33814.5, -34346, -34839.5, -35295, -35710, -36084.5, -36417.5, -36707.5, -36954, -37156.5, -37315, -37428, -37496, 37519, 37496, 37428, 37315, 37156.5, 36954, 36707.5, 36417.5, 36084.5, 35710, 35295, 34839.5, 34346, 33814.5, 33247, 32645, 32009.5, 31342, 30644.5, 29919, 29166.5, 28389, 27589, 26767, 25926.5, 25068.5, 24195, 23308.5, 22410.5, 21503, 20588, 19668, 18744.5, 17820, 16895.5, 15973.5, 15056, 14144.5, 13241, 12347, 11464.5, 10594.5, 9739, 8899.5, 8077.5, 7274, 6490, 5727.5, 4987.5, 4270, 3577, 2909, 2266.5, 1650, 1061, 499, -35, -541, -1018.5, -1467.5, -1888, -2280.5, -2644, -2979.5, 3287, 3567, 3820, 4046, 4246, 4420, 4569.5, 4694.5, 4796, 4875, 4931.5, 4967.5, 4983, 4979.5, 4958, 4919, 4863.5, 4792.5, 4708, 4609.5, 4499, 4377.5, 4245.5, 4104.5, 3955, 3798.5, 3635.5, 3467.5, 3294.5, 3118.5, 2939.5, 2758.5, 2576.5, 2394, 2212.5, 2031.5, 1852.5, 1675.5, 1502, 1331.5, 1165, 1003, 846, 694, 547.5, 407, 272.5, 144, 22.5, -92.5, -201, -302.5, -397, -485, -565.5, -640, -707, -767.5, -822, -869.5, -911, -946.5, -976, -1e3, 1018.5, 1031.5, 1040, 1043.5, 1042.5, 1037.5, 1028.5, 1016, 1000.5, 981, 959.5, 935, 908.5, 879.5, 849, 817, 783.5, 749, 714, 678, 641.5, 605, 568.5, 532, 495.5, 459.5, 424, 389.5, 355.5, 322.5, 290.5, 259.5, 229.5, 200.5, 173.5, 147, 122, 98.5, 76.5, 55.5, 36, 18, 1, -14.5, -28.5, -41.5, -53, -63.5, -73, -81.5, -88.5, -94.5, -100, -104, -107.5, -110.5, -112, -113.5, -114, -114, -113.5, -112.5, -111, -109, 106.5, 104, 101, 98, 95, 91.5, 88, 84.5, 80.5, 77, 73.5, 69.5, 66, 62.5, 58.5, 55.5, 52, 48.5, 45.5, 42.5, 39.5, 36.5, 34, 31.5, 29, 26.5, 24.5, 22.5, 20.5, 19, 17.5, 15.5, 14.5, 13, 12, 10.5, 9.5, 8.5, 8, 7, 6.5, 5.5, 5, 4.5, 4, 3.5, 3.5, 3, 2.5, 2.5, 2, 2, 1.5, 1.5, 1, 1, 1, 1, .5, .5, .5, .5, .5, .5]),
    t.QUANT_LUT_STEP_1 = [[0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2], [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2]],
    t.QUANT_TAB = {
        A: 91,
        B: 94,
        C: 8,
        D: 12
    },
    t.QUANT_LUT_STEP_2 = [[t.QUANT_TAB.C, t.QUANT_TAB.C, t.QUANT_TAB.D], [t.QUANT_TAB.A, t.QUANT_TAB.A, t.QUANT_TAB.A], [t.QUANT_TAB.B, t.QUANT_TAB.A, t.QUANT_TAB.B]],
    t.QUANT_LUT_STEP_3 = [[68, 68, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52], [67, 67, 67, 66, 66, 66, 66, 66, 66, 66, 66, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 32, 32, 32, 32, 32, 32, 32], [69, 69, 69, 69, 52, 52, 52, 52, 52, 52, 52, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36]],
    t.QUANT_LUT_STEP4 = [[0, 1, 2, 17], [0, 1, 2, 3, 4, 5, 6, 17], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17], [0, 1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
    t.QUANT_TAB = [{
        levels: 3,
        group: 1,
        bits: 5
    }, {
        levels: 5,
        group: 1,
        bits: 7
    }, {
        levels: 7,
        group: 0,
        bits: 3
    }, {
        levels: 9,
        group: 1,
        bits: 10
    }, {
        levels: 15,
        group: 0,
        bits: 4
    }, {
        levels: 31,
        group: 0,
        bits: 5
    }, {
        levels: 63,
        group: 0,
        bits: 6
    }, {
        levels: 127,
        group: 0,
        bits: 7
    }, {
        levels: 255,
        group: 0,
        bits: 8
    }, {
        levels: 511,
        group: 0,
        bits: 9
    }, {
        levels: 1023,
        group: 0,
        bits: 10
    }, {
        levels: 2047,
        group: 0,
        bits: 11
    }, {
        levels: 4095,
        group: 0,
        bits: 12
    }, {
        levels: 8191,
        group: 0,
        bits: 13
    }, {
        levels: 16383,
        group: 0,
        bits: 14
    }, {
        levels: 32767,
        group: 0,
        bits: 15
    }, {
        levels: 65535,
        group: 0,
        bits: 16
    }],
    t
}(),
JSMpeg.Renderer.WebGL = function() {
    "use strict";
    var t = function(e) {
        this.canvas = e.canvas || document.createElement("canvas"),
        this.width = this.canvas.width,
        this.height = this.canvas.height,
        this.enabled = !0;
        var n = {
            preserveDrawingBuffer: !!e.preserveDrawingBuffer,
            alpha: !1,
            depth: !1,
            stencil: !1,
            antialias: !1
        };
        if (this.gl = this.canvas.getContext("webgl", n) || this.canvas.getContext("experimental-webgl", n),
        !this.gl)
            throw new Error("Failed to get WebGL Context");
        var i = this.gl
          , r = null;
        this.vertexBuffer = i.createBuffer();
        var o = new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]);
        i.bindBuffer(i.ARRAY_BUFFER, this.vertexBuffer),
        i.bufferData(i.ARRAY_BUFFER, o, i.STATIC_DRAW),
        this.program = this.createProgram(t.SHADER.VERTEX_IDENTITY, t.SHADER.FRAGMENT_YCRCB_TO_RGBA),
        r = i.getAttribLocation(this.program, "vertex"),
        i.enableVertexAttribArray(r),
        i.vertexAttribPointer(r, 2, i.FLOAT, !1, 0, 0),
        this.textureY = this.createTexture(0, "textureY"),
        this.textureCb = this.createTexture(1, "textureCb"),
        this.textureCr = this.createTexture(2, "textureCr"),
        this.loadingProgram = this.createProgram(t.SHADER.VERTEX_IDENTITY, t.SHADER.FRAGMENT_LOADING),
        r = i.getAttribLocation(this.loadingProgram, "vertex"),
        i.enableVertexAttribArray(r),
        i.vertexAttribPointer(r, 2, i.FLOAT, !1, 0, 0),
        this.shouldCreateUnclampedViews = !this.allowsClampedTextureData()
    };
    return t.prototype.destroy = function() {
        var t = this.gl;
        t.deleteTexture(this.textureY),
        t.deleteTexture(this.textureCb),
        t.deleteTexture(this.textureCr),
        t.deleteProgram(this.program),
        t.deleteProgram(this.loadingProgram),
        t.deleteBuffer(this.vertexBuffer)
    }
    ,
    t.prototype.resize = function(t, e) {
        this.width = 0 | t,
        this.height = 0 | e,
        this.canvas.width = this.width,
        this.canvas.height = this.height,
        this.gl.useProgram(this.program),
        this.gl.viewport(0, 0, this.width, this.height)
    }
    ,
    t.prototype.createTexture = function(t, e) {
        var n = this.gl
          , i = n.createTexture();
        return n.bindTexture(n.TEXTURE_2D, i),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE),
        n.uniform1i(n.getUniformLocation(this.program, e), t),
        i
    }
    ,
    t.prototype.createProgram = function(t, e) {
        var n = this.gl
          , i = n.createProgram();
        return n.attachShader(i, this.compileShader(n.VERTEX_SHADER, t)),
        n.attachShader(i, this.compileShader(n.FRAGMENT_SHADER, e)),
        n.linkProgram(i),
        n.useProgram(i),
        i
    }
    ,
    t.prototype.compileShader = function(t, e) {
        var n = this.gl
          , i = n.createShader(t);
        if (n.shaderSource(i, e),
        n.compileShader(i),
        !n.getShaderParameter(i, n.COMPILE_STATUS))
            throw new Error(n.getShaderInfoLog(i));
        return i
    }
    ,
    t.prototype.allowsClampedTextureData = function() {
        var t = this.gl
          , e = t.createTexture();
        return t.bindTexture(t.TEXTURE_2D, e),
        t.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, 1, 1, 0, t.LUMINANCE, t.UNSIGNED_BYTE, new Uint8ClampedArray([0])),
        0 === t.getError()
    }
    ,
    t.prototype.renderProgress = function(t) {
        var e = this.gl;
        e.useProgram(this.loadingProgram);
        var n = e.getUniformLocation(this.loadingProgram, "progress");
        e.uniform1f(n, t),
        e.drawArrays(e.TRIANGLE_STRIP, 0, 4)
    }
    ,
    t.prototype.render = function(t, e, n) {
        if (this.enabled) {
            var i = this.gl
              , r = this.width + 15 >> 4 << 4
              , o = this.height
              , s = r >> 1
              , a = o >> 1;
            this.shouldCreateUnclampedViews && (t = new Uint8Array(t.buffer),
            e = new Uint8Array(e.buffer),
            n = new Uint8Array(n.buffer)),
            i.useProgram(this.program),
            this.updateTexture(i.TEXTURE0, this.textureY, r, o, t),
            this.updateTexture(i.TEXTURE1, this.textureCb, s, a, e),
            this.updateTexture(i.TEXTURE2, this.textureCr, s, a, n),
            i.drawArrays(i.TRIANGLE_STRIP, 0, 4)
        }
    }
    ,
    t.prototype.updateTexture = function(t, e, n, i, r) {
        var o = this.gl;
        o.activeTexture(t),
        o.bindTexture(o.TEXTURE_2D, e),
        o.texImage2D(o.TEXTURE_2D, 0, o.LUMINANCE, n, i, 0, o.LUMINANCE, o.UNSIGNED_BYTE, r)
    }
    ,
    t.IsSupported = function() {
        try {
            if (!window.WebGLRenderingContext)
                return !1;
            var t = document.createElement("canvas");
            return !(!t.getContext("webgl") && !t.getContext("experimental-webgl"))
        } catch (t) {
            return !1
        }
    }
    ,
    t.SHADER = {
        FRAGMENT_YCRCB_TO_RGBA: ["precision mediump float;", "uniform sampler2D textureY;", "uniform sampler2D textureCb;", "uniform sampler2D textureCr;", "varying vec2 texCoord;", "mat4 rec601 = mat4(", "1.16438,  0.00000,  1.59603, -0.87079,", "1.16438, -0.39176, -0.81297,  0.52959,", "1.16438,  2.01723,  0.00000, -1.08139,", "0, 0, 0, 1", ");", "void main() {", "float y = texture2D(textureY, texCoord).r;", "float cb = texture2D(textureCb, texCoord).r;", "float cr = texture2D(textureCr, texCoord).r;", "gl_FragColor = vec4(y, cr, cb, 1.0) * rec601;", "}"].join("\n"),
        FRAGMENT_LOADING: ["precision mediump float;", "uniform float progress;", "varying vec2 texCoord;", "void main() {", "float c = ceil(progress-(1.0-texCoord.y));", "gl_FragColor = vec4(c,c,c,1);", "}"].join("\n"),
        VERTEX_IDENTITY: ["attribute vec2 vertex;", "varying vec2 texCoord;", "void main() {", "texCoord = vertex;", "gl_Position = vec4((vertex * 2.0 - 1.0) * vec2(1, -1), 0.0, 1.0);", "}"].join("\n")
    },
    t
}(),
JSMpeg.Renderer.Canvas2D = function() {
    "use strict";
    var t = function(t) {
        this.canvas = t.canvas || document.createElement("canvas"),
        this.width = this.canvas.width,
        this.height = this.canvas.height,
        this.enabled = !0,
        this.context = this.canvas.getContext("2d")
    };
    return t.prototype.destroy = function() {}
    ,
    t.prototype.resize = function(t, e) {
        this.width = 0 | t,
        this.height = 0 | e,
        this.canvas.width = this.width,
        this.canvas.height = this.height,
        this.imageData = this.context.getImageData(0, 0, this.width, this.height),
        JSMpeg.Fill(this.imageData.data, 255)
    }
    ,
    t.prototype.renderProgress = function(t) {
        var e = this.canvas.width
          , n = this.canvas.height
          , i = this.context;
        i.fillStyle = "#222",
        i.fillRect(0, 0, e, n),
        i.fillStyle = "#fff",
        i.fillRect(0, n - n * t, e, n * t)
    }
    ,
    t.prototype.render = function(t, e, n) {
        this.YCbCrToRGBA(t, e, n, this.imageData.data),
        this.context.putImageData(this.imageData, 0, 0)
    }
    ,
    t.prototype.YCbCrToRGBA = function(t, e, n, i) {
        if (this.enabled)
            for (var r, o, s, a, u, l = this.width + 15 >> 4 << 4, c = l >> 1, d = 0, h = l, f = l + (l - this.width), p = 0, m = c - (this.width >> 1), g = 0, v = 4 * this.width, y = 4 * this.width, b = this.width >> 1, x = this.height >> 1, w = 0; w < x; w++) {
                for (var T = 0; T < b; T++) {
                    r = e[p],
                    o = n[p],
                    p++,
                    s = r + (103 * r >> 8) - 179,
                    a = (88 * o >> 8) - 44 + (183 * r >> 8) - 91,
                    u = o + (198 * o >> 8) - 227;
                    var C = t[d++]
                      , E = t[d++];
                    i[g] = C + s,
                    i[g + 1] = C - a,
                    i[g + 2] = C + u,
                    i[g + 4] = E + s,
                    i[g + 5] = E - a,
                    i[g + 6] = E + u,
                    g += 8;
                    var A = t[h++]
                      , _ = t[h++];
                    i[v] = A + s,
                    i[v + 1] = A - a,
                    i[v + 2] = A + u,
                    i[v + 4] = _ + s,
                    i[v + 5] = _ - a,
                    i[v + 6] = _ + u,
                    v += 8
                }
                d += f,
                h += f,
                g += y,
                v += y,
                p += m
            }
    }
    ,
    t
}(),
JSMpeg.AudioOutput.WebAudio = function() {
    "use strict";
    var t = function(e) {
        this.context = t.CachedContext = t.CachedContext || new (window.AudioContext || window.webkitAudioContext),
        this.gain = this.context.createGain(),
        this.destination = this.gain,
        this.gain.connect(this.context.destination),
        this.context._connections = (this.context._connections || 0) + 1,
        this.startTime = 0,
        this.buffer = null,
        this.wallclockStartTime = 0,
        this.volume = 1,
        this.enabled = !0,
        this.unlocked = !t.NeedsUnlocking(),
        Object.defineProperty(this, "enqueuedTime", {
            get: this.getEnqueuedTime
        })
    };
    return t.prototype.destroy = function() {
        this.gain.disconnect(),
        0 === --this.context._connections && (this.context.close(),
        t.CachedContext = null)
    }
    ,
    t.prototype.play = function(t, e, n) {
        if (this.enabled) {
            if (!this.unlocked) {
                var i = JSMpeg.Now();
                return this.wallclockStartTime < i && (this.wallclockStartTime = i),
                void (this.wallclockStartTime += e.length / t)
            }
            this.gain.gain.value = this.volume;
            var r = this.context.createBuffer(2, e.length, t);
            r.getChannelData(0).set(e),
            r.getChannelData(1).set(n);
            var o = this.context.createBufferSource();
            o.buffer = r,
            o.connect(this.destination);
            var s = this.context.currentTime
              , a = r.duration;
            this.startTime < s && (this.startTime = s,
            this.wallclockStartTime = JSMpeg.Now()),
            o.start(this.startTime),
            this.startTime += a,
            this.wallclockStartTime += a
        }
    }
    ,
    t.prototype.stop = function() {
        this.gain.gain.value = 0
    }
    ,
    t.prototype.getEnqueuedTime = function() {
        return Math.max(this.wallclockStartTime - JSMpeg.Now(), 0)
    }
    ,
    t.prototype.resetEnqueuedTime = function() {
        this.startTime = this.context.currentTime,
        this.wallclockStartTime = JSMpeg.Now()
    }
    ,
    t.prototype.unlock = function(t) {
        if (this.unlocked)
            return void (t && t());
        this.unlockCallback = t;
        var e = this.context.createBuffer(1, 1, 22050)
          , n = this.context.createBufferSource();
        n.buffer = e,
        n.connect(this.destination),
        n.start(0),
        setTimeout(this.checkIfUnlocked.bind(this, n, 0), 0)
    }
    ,
    t.prototype.checkIfUnlocked = function(t, e) {
        t.playbackState === t.PLAYING_STATE || t.playbackState === t.FINISHED_STATE ? (this.unlocked = !0,
        this.unlockCallback && (this.unlockCallback(),
        this.unlockCallback = null)) : e < 10 && setTimeout(this.checkIfUnlocked.bind(this, t, e + 1), 100)
    }
    ,
    t.NeedsUnlocking = function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    }
    ,
    t.IsSupported = function() {
        return window.AudioContext || window.webkitAudioContext
    }
    ,
    t.CachedContext = null,
    t
}();
var Video;
!function() {
    Video = function(t, e) {
        var n, 
        i, r = {
            loop: e.loop || !1,
            autoplay: e.autoplay || !1,
            objectFit: e.objectFit ? e.objectFit : "cover",
            chunkSize: 1024 * e.chunkSize || 524288
        }, o = navigator.userAgent.toLowerCase(), s = o.indexOf("micromessenger") > -1, a = o.indexOf("android") > -1 || o.indexOf("linux") > -1;
        n = document.createElement("video"),
        n.setAttribute("x5-video-player-type", "h5"),
        n.setAttribute("x5-video-player-fullscreen", "true"),
        n.setAttribute("x-webkit-airplay", "true"),
        n.setAttribute("airplay", "allow"),
        n.setAttribute("id", "videoplayer"),
        n.setAttribute("playsinline", ""),
        n.setAttribute("webkit-playsinline", ""),
        n.controls = !1,
        r.autoplay && n.setAttribute("autoplay", "true"),
        r.loop && n.setAttribute("loop", "true"),
        n.setAttribute("src", t),
        "fill" !== r.objectFit && (n.style.width = "100%",
        n.style.height = "100%",
        n.style.objectFit = r.objectFit),
        n.webkitExitFullScreen(),
        n.addEventListener("webkitbeginfullscreen", function(t) {
            n.webkitExitFullScreen()
        }),
        n.addEventListener("x5videoexitfullscreen", function(t) {
            console.log(window.videostop);
            if(window.videostop === false){
                WeixinJSBridge.call('closeWindow');
            }
        }),
        i = n,
        this.totalTime = e.totalTime,
        this.video = n,
        this.domElement = i,
        this._Event = {},
        this._Temp = {},
        Object.defineProperty(this, "paused", {
            get: this.getPlayStatus
        }),
        Object.defineProperty(this, "currentTime", {
            get: this.getCurrentTime,
            set: this.setCurrentTime
        }),
        Object.defineProperty(this, "muted", {
            get: this.getMuted,
            set: this.setMuted
        })
    }
    ,
    Video.prototype = {
        load: function() {
            this.useTs || this.video.load()
        },
        play: function() {
            this.useTs && this._Temp.ended && (this.video.currentTime = 0),
            this.video.play()
        },
        pause: function() {
            this.video.pause()
        },
        stop: function() {
            this.useTs ? this.video.stop() : (this.video.currentTime = 0,
            this.video.pause())
        },
        destroy: function() {
            this.useTs && (this.animationFrame && cancelAnimationFrame(this.animationFrame),
            console.log(this.animationFrame),
            this.video.destroy())
        },
        getMuted: function() {
            return this.useTs ? !this.video.volume : this.video.muted
        },
        setMuted: function(t) {
            this.useTs ? this.video.volume = t ? 0 : 1 : this.video.muted = t
        },
        getCurrentTime: function() {
            return this.video.currentTime
        },
        setCurrentTime: function(t) {
            this.video.currentTime = t
        },
        getPlayStatus: function() {
            return this.useTs ? this.video.isPlaying : !this.video.paused
        },
        _loop: function() {
            this.animationFrame = requestAnimationFrame(this._loop.bind(this));
            var t = this;
            if (this.video.isPlaying) {
                if (this._Temp.pause = !1,
                this._Temp.ended = !1,
                this._Event.timeupdate)
                    for (var e in this._Event.timeupdate)
                        t._Event.timeupdate[e]();
                if (this._Event.play && !this._Temp.play) {
                    this._Temp.play = !0;
                    for (var n in this._Event.play)
                        t._Event.play[n]()
                }
            } else if (this.video.currentTime >= this.totalTime) {
                if (0 !== this.video.currentTime && !this._Temp.ended) {
                    if (this._Temp.pause = !0,
                    this._Temp.ended = !0,
                    this._Event.pause)
                        for (var i in this._Event.pause)
                            t._Event.pause[i]();
                    if (this._Event.ended)
                        for (var r in this._Event.ended)
                            t._Event.ended[r]()
                }
            } else if (0 !== this.video.currentTime && !this._Temp.pause && (this._Temp.pause = !0,
            this._Event.pause))
                for (var i in this._Event.pause)
                    t._Event.pause[i]()
        },
        addEventListener: function(t, e) {
            var n = this;
            this.useTs ? (this._Event[t] || (this._Event[t] = {}),
            this._Event[t][e + ""] = e,
            this.animationFrame = requestAnimationFrame(this._loop.bind(this))) : n.video.addEventListener(t, e)
        },
        removeEventListener: function(t, e) {
            var n = this;
            this.useTs ? (delete n._Event[t][e + ""],
            0 === Object.getOwnPropertyNames(n._Event[t]).length && delete n._Event[t],
            n._Event.play || n._Event.timeupdate || n._Event.pause || n._Event.ended || n.animationFrame && cancelAnimationFrame(n.animationFrame)) : n.video.removeEventListener(t, e)
        }
    }
}(),
function(t) {
    function e(t, e, n) {
        t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, n)
    }
    function n() {
        var t = {};
        for (type in {
            Top: "",
            Left: ""
        }) {
            var e = "Top" == type ? "Y" : "X";
            void 0 !== window["page" + e + "Offset"] ? t[type.toLowerCase()] = window["page" + e + "Offset"] : (e = document.documentElement.clientHeight ? document.documentElement : document.body,
            t[type.toLowerCase()] = e["scroll" + type])
        }
        return t
    }
    function i() {
        var t, e = document.body;
        return window.innerHeight ? t = window.innerHeight : e.parentElement.clientHeight ? t = e.parentElement.clientHeight : e && e.clientHeight && (t = e.clientHeight),
        t
    }
    function r(t) {
        this.parent = document.body,
        this.createEl(this.parent, t),
        this.size = 5 * Math.random() + 5,
        this.el.style.width = Math.round(this.size) + "px",
        this.el.style.height = Math.round(this.size) + "px",
        this.maxLeft = document.body.offsetWidth - this.size,
        this.maxTop = document.body.offsetHeight - this.size,
        this.left = Math.random() * this.maxLeft,
        this.top = n().top + 1,
        this.angle = 1.4 + .2 * Math.random(),
        this.minAngle = 1.4,
        this.maxAngle = 1.6,
        this.angleDelta = .01 * Math.random(),
        this.speed = 2 + Math.random()
    }
    var o = window
      , s = (setTimeout,
    function() {
        return "function" == typeof document.createElement("canvas").getContext
    }
    );
    window.Snow = function(t, e) {
        !function() {
            for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e)
                window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"],
                window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(t, e) {
                return window.setTimeout(function() {
                    t(14)
                }, 14)
            }
            ),
            window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            }
            )
        }(),
        this.settings = e,
        this.flakes = [],
        this.flakeCount = e.count,
        this.mx = -100,
        this.my = -100,
        this.init(t)
    }
    ,
    Snow.prototype.init = function(e) {
        this.element = e,
        this.canvas = e.get(0),
        this.ctx = this.canvas.getContext("2d"),
        this.canvas.width = o.innerWidth,
        this.canvas.height = o.innerHeight,
        this.flakes = [];
        for (var n = 0; n < this.flakeCount; n++) {
            var i = Math.floor(Math.random() * this.canvas.width)
              , r = Math.floor(Math.random() * this.canvas.height)
              , s = Math.floor(100 * Math.random()) % this.settings.size + 2
              , a = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * s / 10 + .5
              , u = .5 * Math.random() + this.settings.opacity;
            this.flakes.push({
                speed: a,
                velY: a,
                velX: 0,
                x: i,
                y: r,
                size: s,
                stepSize: Math.random() / 30,
                step: 0,
                angle: 180,
                opacity: u
            })
        }
        1 == this.settings.interaction && this.canvas.addEventListener("mousemove", function(t) {
            this.mx = t.clientX,
            this.my = t.client
        });
        var l = this;
        t(o).resize(function() {
            l.ctx.clearRect(0, 0, l.canvas.width, l.canvas.height),
            l.canvas.width = o.innerWidth,
            l.canvas.height = o.innerHeight
        }),
        "string" == typeof this.settings.image && (this.image = t("<img src='" + this.settings.image + "' style='display: none'>")),
        this.snow()
    }
    ,
    Snow.prototype.snow = function() {
        var t = this
          , e = function() {
            t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height);
            for (var n = 0; n < t.flakeCount; n++) {
                var i = t.flakes[n]
                  , r = t.mx
                  , s = t.my
                  , a = i.x
                  , u = i.y
                  , l = Math.sqrt((a - r) * (a - r) + (u - s) * (u - s));
                if (100 > l) {
                    var c = 100 / (l * l)
                      , d = (r - a) / l
                      , h = (s - u) / l
                      , f = c / 2;
                    i.velX -= f * d,
                    i.velY -= f * h
                } else
                    switch (i.velX *= .98,
                    i.velY <= i.speed && (i.velY = i.speed),
                    t.settings.windPower) {
                    case !1:
                    case 0:
                        i.velX += Math.cos(i.step += .05) * i.stepSize;
                        break;
                    default:
                        i.velX += .01 + t.settings.windPower / 100
                    }
                if (i.y += i.velY,
                i.x += i.velX,
                (i.y >= t.canvas.height || i.y <= 0) && t.resetFlake(i),
                (i.x >= t.canvas.width || i.x <= 0) && t.resetFlake(i),
                0 == t.settings.image) {
                    var p = t.ctx.createRadialGradient(i.x, i.y, 0, i.x, i.y, i.size - 1);
                    p.addColorStop(0, t.settings.startColor),
                    p.addColorStop(1, t.settings.endColor),
                    t.ctx.fillStyle = p,
                    t.ctx.beginPath(),
                    t.ctx.arc(i.x, i.y, i.size, 0, 2 * Math.PI),
                    t.ctx.fill()
                } else
                    t.ctx.drawImage(t.image.get(0), i.x, i.y, 2 * i.size, 2 * i.size)
            }
            o.cancelAnimationFrame(e),
            t.element.attr("stop") || o.requestAnimationFrame(e)
        };
        e()
    }
    ,
    Snow.prototype.resetFlake = function(t) {
        if (0 == this.settings.windPower || 0 == this.settings.windPower)
            t.x = Math.floor(Math.random() * this.canvas.width),
            t.y = 0;
        else if (this.settings.windPower > 0) {
            var e = Array(Math.floor(Math.random() * this.canvas.width), 0)
              , n = Array(0, Math.floor(Math.random() * this.canvas.height))
              , i = Array(e, n)
              , r = i[Math.floor(Math.random() * i.length)];
            t.x = r[0],
            t.y = r[1]
        } else {
            var e = Array(Math.floor(Math.random() * this.canvas.width), 0)
              , n = Array(this.canvas.width, Math.floor(Math.random() * this.canvas.height))
              , i = Array(e, n)
              , r = i[Math.floor(Math.random() * i.length)];
            t.x = r[0],
            t.y = r[1]
        }
        t.size = Math.floor(100 * Math.random()) % this.settings.size + 2,
        t.speed = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * t.size / 10 + .5,
        t.velY = t.speed,
        t.velX = 0,
        t.opacity = .5 * Math.random() + this.settings.opacity
    }
    ,
    t.fn.snow = function() {
        var e = s();
        if (e && t(this).each(function(e, n) {
            var i = {};
            t.each(n.attributes, function(e, n) {
                i[t.camelCase(n.name)] = Number(Number(n.value)) ? Number(n.value) : n.value
            }),
            "string" == typeof i.image && "false" === i.image && (i.image = !1),
            new Snow(t(n),{
                speed: 1,
                interaction: i.interaction || !0,
                size: i.size || 2,
                count: i.count || 200,
                opacity: i.opacity || 1,
                startColor: i.startColor || "rgba(255,255,255,1)",
                endColor: i.endColor || "rgba(255,255,255,0)",
                windPower: i.windPower || 0,
                image: i.image || !1
            })
        }),
        !e) {
            var n = {};
            t(this).each(function(e, i) {
                n.image = t(i).attr("image") || "./imgs/snow.png",
                t(this).remove(),
                l("", 40)
            })
        }
    }
    ;
    var a = null
      , u = []
      , l = function(t, o) {
        clearInterval(a),
        u = [],
        a = setInterval(function() {
            o > u.length && Math.random() < .0025 * o && u.push(new r(t));
            for (var e = n().top, s = i(), a = u.length - 1; a >= 0; a--)
                u[a] && (u[a].top < e || u[a].top + u[a].size + 1 > e + s ? (u[a].remove(),
                u[a] = null,
                u.splice(a, 1)) : (u[a].move(),
                u[a].draw()))
        }, 40),
        e(window, "scroll", function() {
            for (var t = u.length - 1; t >= 0; t--)
                u[t].draw()
        })
    };
    r.prototype = {
        createEl: function(t, e) {
            this.el = document.createElement("img"),
            this.el.classname = "nicesnowclass",
            this.el.setAttribute("src", e || "./imgs/snow.png"),
            this.el.style.position = "absolute",
            this.el.style.display = "block",
            this.el.style.zIndex = "99999",
            this.parent.appendChild(this.el)
        },
        move: function() {
            (this.angle < this.minAngle || this.angle > this.maxAngle) && (this.angleDelta = -this.angleDelta),
            this.angle += this.angleDelta,
            this.left += this.speed * Math.cos(this.angle * Math.PI),
            this.top -= this.speed * Math.sin(this.angle * Math.PI),
            this.left < 0 ? this.left = this.maxLeft : this.left > this.maxLeft && (this.left = 0)
        },
        draw: function() {
            this.el.style.top = Math.round(this.top) + "px",
            this.el.style.left = Math.round(this.left) + "px"
        },
        remove: function() {
            this.parent.removeChild(this.el),
            this.parent = this.el = null
        }
    }
}(jQuery);
var utils;
!function() {
    utils = {
        isAndroid: function() {
            var t = window.navigator.userAgent.toLowerCase();
            try {
                return t.indexOf("android") > -1 || t.indexOf("linux") > -1
            } catch (t) {
                return !1
            }
        }(),
        webgl: function() {
            try {
                return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
            } catch (t) {
                return !1
            }
        }(),
        isWeixin: function() {
            var t = window.navigator.userAgent.toLowerCase();
            try {
                return "micromessenger" == t.match(/MicroMessenger/i)
            } catch (t) {
                return !1
            }
        }(),
        path: function() {
            for (var t = document.location.href.toString(), e = t.split("/"), n = e[0] + "//", i = 2; i < e.length - 1; i++)
                n += e[i] + "/";
            return n
        }(),
        getQueryString: function(t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)","i")
              , n = window.location.search.substr(1).match(e);
            return null != n ? decodeURI(n[2]) : null
        },
        getImageWidth: function(t, e) {
            var n = new Image;
            n.src = t,
            n.complete ? e(n.width, n.height) : n.onload = function() {
                e(n.width, n.height)
            }
        },
        pad: function(t, e) {
            for (var n = t.toString().length; n < e; )
                t = "0" + t,
                n++;
            return t
        },
        randomInt: function(t, e) {
            return Math.floor(Math.random() * (e - t + 1) + t)
        }
    }
}();

var mediaMgr;
!function() {
    mediaMgr = {
        init: function() {
            var e = this;
            e.music = {},
            e.video = {};
        },
        initQuestion: function(videourl,flag) {
            var i = this,
                times = [35,14,41,10,29,12,34,11,40,14,16,15];

            if (!i.video[videourl]) {
                i.video[videourl] = new Video(videourl, {
                    totalTime: times[flag] 
                }),
                i.video[videourl].load()
            }
        }
    }
}();