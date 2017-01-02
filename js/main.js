/*! echo-js v1.7.3 | (c) 2016 @toddmotto | https://github.com/toddmotto/echo */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.echo = factory(root);
    }
})(this, function (root) {

    'use strict';

    var echo = {};

    var callback = function () {};

    var offset, poll, delay, useDebounce, unload;

    var isHidden = function (element) {
        return (element.offsetParent === null);
    };

    var inView = function (element, view) {
        if (isHidden(element)) {
            return false;
        }

        var box = element.getBoundingClientRect();
        return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
    };

    var debounceOrThrottle = function () {
        if(!useDebounce && !!poll) {
            return;
        }
        clearTimeout(poll);
        poll = setTimeout(function(){
            echo.render();
            poll = null;
        }, delay);
    };

    echo.init = function (opts) {
        opts = opts || {};
        var offsetAll = opts.offset || 0;
        var offsetVertical = opts.offsetVertical || offsetAll;
        var offsetHorizontal = opts.offsetHorizontal || offsetAll;
        var optionToInt = function (opt, fallback) {
            return parseInt(opt || fallback, 10);
        };
        offset = {
            t: optionToInt(opts.offsetTop, offsetVertical),
            b: optionToInt(opts.offsetBottom, offsetVertical),
            l: optionToInt(opts.offsetLeft, offsetHorizontal),
            r: optionToInt(opts.offsetRight, offsetHorizontal)
        };
        delay = optionToInt(opts.throttle, 250);
        useDebounce = opts.debounce !== false;
        unload = !!opts.unload;
        callback = opts.callback || callback;
        echo.render();
        if (document.addEventListener) {
            root.addEventListener('scroll', debounceOrThrottle, false);
            root.addEventListener('load', debounceOrThrottle, false);
        } else {
            root.attachEvent('onscroll', debounceOrThrottle);
            root.attachEvent('onload', debounceOrThrottle);
        }
    };

    echo.render = function () {
        var nodes = document.querySelectorAll('img[data-echo], [data-echo-background]');
        var length = nodes.length;
        var src, elem;
        var view = {
            l: 0 - offset.l,
            t: 0 - offset.t,
            b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
            r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
        };
        for (var i = 0; i < length; i++) {
            elem = nodes[i];
            if (inView(elem, view)) {

                if (unload) {
                    elem.setAttribute('data-echo-placeholder', elem.src);
                }

                if (elem.getAttribute('data-echo-background') !== null) {
                    elem.style.backgroundImage = "url(" + elem.getAttribute('data-echo-background') + ")";
                }
                else {
                    elem.src = elem.getAttribute('data-echo');
                }

                if (!unload) {
                    elem.removeAttribute('data-echo');
                    elem.removeAttribute('data-echo-background');
                }

                callback(elem, 'load');
            }
            else if (unload && !!(src = elem.getAttribute('data-echo-placeholder'))) {

                if (elem.getAttribute('data-echo-background') !== null) {
                    elem.style.backgroundImage = "url(" + src + ")";
                }
                else {
                    elem.src = src;
                }

                elem.removeAttribute('data-echo-placeholder');
                callback(elem, 'unload');
            }
        }
        if (!length) {
            echo.detach();
        }
    };

    echo.detach = function () {
        if (document.removeEventListener) {
            root.removeEventListener('scroll', debounceOrThrottle);
        } else {
            root.detachEvent('onscroll', debounceOrThrottle);
        }
        clearTimeout(poll);
    };

    return echo;

});
// 加一个雪花特效
!function(s){"use strict";"function"==typeof define&&define.amd?define(s):"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=s():"undefined"!=typeof Package?Snow=s():window.Snow=s()}(function(){"use strict";function s(s){s=s||{},this.snowmax=s.snowmax||50,this.snowcolor=s.snowcolor||new Array("#FFDA65","#00AADD","#aaaacc","#ddddff","#ccccdd","#f3f3f3","#f0ffff","#bbf7f9"),this.snowtype=s.snowtype||new Array("Times","Arial","Times","Verdana"),this.snowletter=s.snowletter||"*",this.sinkspeed=s.sinkspeed||.6,this.snowmaxsize=s.snowmaxsize||30,this.snowminsize=s.snowminsize||8,this.snowingzone=s.snowingzone||1,this.showSnow=void 0===s.showSnow||s.showSnow,this.snow=new Array,this.marginbottom,this.marginright,this.timer,this.i_snow=0,this.x_mv=new Array,this.crds=new Array,this.lftrght=new Array,this.browserinfos=window.navigator.userAgent,this.ie5=document.all&&document.getElementById&&!this.browserinfos.match(/Opera/),this.ns6=document.getElementById&&!document.all,this.opera=this.browserinfos.match(/Opera/),this.browserok=this.ie5||this.ns6||this.opera,this.showSnow&&this.startSnow()}return s.prototype.randommaker=function(s){var t=Math.floor(s*Math.random());return t},s.prototype.initsnow=function(){this.ie5||this.opera?(this.marginbottom=document.body.scrollHeight,this.marginright=document.body.clientWidth-15):this.ns6&&(this.marginbottom=document.body.scrollHeight,this.marginright=window.innerWidth-15),this.snowsizerange=this.snowmaxsize-this.snowminsize;for(var s=0;s<=this.snowmax;s++)this.crds[s]=0,this.lftrght[s]=15*Math.random(),this.x_mv[s]=.03+Math.random()/10,this.snow[s]=document.getElementById("s"+s),this.snow[s].style.fontFamily=this.snowtype[this.randommaker(this.snowtype.length)],this.snow[s].size=this.randommaker(this.snowsizerange)+this.snowminsize,this.snow[s].style.fontSize=this.snow[s].size+"px",this.snow[s].style.color=this.snowcolor[this.randommaker(this.snowcolor.length)],this.snow[s].style.zIndex=1e3,this.snow[s].sink=this.sinkspeed*this.snow[s].size/5,1==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright-this.snow[s].size)),2==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright/2-this.snow[s].size)),3==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright/2-this.snow[s].size)+this.marginright/4),4==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright/2-this.snow[s].size)+this.marginright/2),this.snow[s].posy=this.randommaker(2*this.marginbottom-this.marginbottom-2*this.snow[s].size),this.snow[s].style.left=this.snow[s].posx+"px",this.snow[s].style.top=this.snow[s].posy+"px";this.movesnow()},s.prototype.movesnow=function(){for(var s=0;s<=this.snowmax;s++)this.crds[s]+=this.x_mv[s],this.snow[s].posy+=this.snow[s].sink,this.snow[s].style.left=this.snow[s].posx+this.lftrght[s]*Math.sin(this.crds[s])+"px",this.snow[s].style.top=this.snow[s].posy+"px",(this.snow[s].posy>=this.marginbottom-2*this.snow[s].size||parseInt(this.snow[s].style.left)>this.marginright-3*this.lftrght[s])&&(1==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright-this.snow[s].size)),2==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright/2-this.snow[s].size)),3==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright/2-this.snow[s].size)+this.marginright/4),4==this.snowingzone&&(this.snow[s].posx=this.randommaker(this.marginright/2-this.snow[s].size)+this.marginright/2),this.snow[s].posy=0);var t=this;this.snowTimer=window.setTimeout(function(){t.movesnow()},50)},s.prototype.createSnow=function(){for(var s=document.getElementsByTagName("body")[0],t=document.createElement("div"),i="",n=0;n<=this.snowmax;n++)i+='<span id="s'+n+'" style="position:absolute;top:-'+this.snowmaxsize+'">'+this.snowletter+"</span>";t.innerHTML=i,this.fragment=t,s.appendChild(t)},s.prototype.startSnow=function(){this.createSnow(),this.browserok&&this.initsnow()},s.prototype.removeSnow=function(){var s=document.getElementsByTagName("body")[0];s.removeChild(this.fragment),clearTimeout(this.snowTimer),this.snowTimer=null},s.create=function(t){return new s(t)},s.version="1.0.2",s});

/**
 * 网站js
 * @author Jelon
 * @type {{init, toggleMenu}}
 */
var JELON = function() {
    return {
        name: 'JELON',
        version: '0.0.2',
        init: function() {
            this.toggleMenu();
            this.backToTop();

            echo.init({
                offset: 50,
                throttle: 250,
                unload: false,
                callback: function (element, op) {
                    console.log(element, 'has been', op + 'ed')
                }
            });
            // 网站增加一个雪花特效
            var snow = new Snow();
        },
        $: function(str) {
            return /^(\[object HTML)[a-zA-Z]*(Element\])$/.test(Object.prototype.toString.call(str)) ? str : document.getElementById(str);
        },
        toggleMenu: function() {
            var _this = this,
                $menu = _this.$(_this.name + '__menu');
            _this.$(_this.name + '__btnDropNav').onclick = function() {
                if ($menu.className.indexOf('hidden') === -1) {
                    $menu.className += ' hidden';
                } else {
                    $menu.className = $menu.className.replace(/\s*hidden\s*/, '');
                }

            };
        },
        backToTop: function() {
            var _this = this;
            window.onscroll = window.onresize = function() {
                if (document.documentElement.scrollTop + document.body.scrollTop > 0) {
                    _this.$(_this.name + '__backToTop').style.display = 'block';
                } else {
                    _this.$(_this.name + '__backToTop').style.display = 'none';
                }
            };
            _this.$(_this.name + '__backToTop').onclick = function() {
                var Timer = setInterval(GoTop, 10);
                function GoTop() {
                    if (document.documentElement.scrollTop + document.body.scrollTop < 1) {
                        clearInterval(Timer)
                    } else {
                        document.documentElement.scrollTop /= 1.1;
                        document.body.scrollTop /= 1.1
                    }
                }
            };
        }
    }
}();

/**
 * 程序入口
 */
JELON.init();