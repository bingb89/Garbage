
///////////////// 获取浏览器信息 /////////////////////
var browser = {
    /** 获取IE版本 **/
    ieVersion : function(){
        var style = document.documentElement.style;
        if (style.scrollbar3dLightColor != undefined){
            if (style.opacity != undefined)
                return 9;
            else if (style.msBlockProgression != undefined)
                return 8;
            else if (style.msInterpolationMode != undefined)
                return 7;
            else if (style.textOverflow != undefined)
                return 6;
            else
                return 5.5;
        }
        return 0;//非IE
    },
    /** 判断是否IE6 **/
    ie6 : function(){
        return ((window.XMLHttpRequest == undefined) && (ActiveXObject != undefined));
    },
    /** 获取浏览器窗口高度和宽度 **/
    getWindow : function(){
        var myHeight = 0;
        var myWidth = 0;
        if(typeof(window.innerWidth) == 'number'){//Non-IE
            myHeight = window.innerHeight;
            myWidth = window.innerWidth;
        }else if(document.documentElement){//标准模式
            myHeight = document.documentElement.clientHeight;
            myWidth = document.documentElement.clientWidth;
        }else if(document.body){//非标准模式
            myHeight = document.body.clientHeight;
            myWidth = document.body.clientWidth;
        }
        return {'height':myHeight,'width':myWidth};
    },
    /** 获取浏览器滚动条高度和宽度 **/
    getScroll : function(){
        var myHeight = 0;
        var myWidth = 0;
        if(typeof(window.pageYOffset) == 'number'){//Non-IE
            myHeight = window.pageYOffset;
            myWidth = window.pageXOffset;
        }else if(document.documentElement){//标准模式
            myHeight = document.documentElement.scrollTop;
            myWidth = document.documentElement.scrollLeft;
        }else if(document.body){//非标准模式
            myHeight = document.body.scrollTop;
            myWidth = document.body.scrollLeft;
        }
        return {'height':myHeight,'width':myWidth};
    },
    /** 获取文档宽度 **/
    getDocWidth : function(D){
        if(!D) var D = document;
        return Math.max(
            Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
            Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
            Math.max(D.body.clientWidth, D.documentElement.clientWidth)
        );
    },
    /** 获取文档高度 **/
    getDocHeight : function(D){
        if(!D) var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    },
    /** 获取鼠标坐标 **/
    getMousePoint : function(ev) {
        var x = y = 0,
        doc = document.documentElement,
        body = document.body;
        if(!ev) ev=window.event;
        if (window.pageYoffset) {//pageYoffset是Netscape特有
            x = window.pageXOffset;
            y = window.pageYOffset;
        }else{
            x = (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            y = (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
        }
        x += ev.clientX;
        y += ev.clientY;
        return {'x' : x, 'y' : y};
    }
};
///////////////////   DOM 操作   //////////////////////
var dom = {
    /** 得到一个对象的简写 **/
    ID : function(id) {
        var type =typeof(id);
        if(type == 'object') return id;
        if(type == 'string') return document.getElementById(id);
        return null;
    },
    /** 设置对象透明度 id对象；value透明度，0-100 **/
    setOpacity : function (id,value) {
        id = dom.ID(id);
        id.style.opacity = id.style.KhtmlOpacity = id.style.MozOpacity = value / 100;
        id.style.filter = 'alpha(opacity='+value+')';
    },
    /** 读取或设置css属性 id对象；property属性名称；value属性的值，为空则为读取，不为空则为设置 **/
    css : function(id,property,value){
        id = dom.ID(id);
        if(value){
            if(property=='opacity'){
                dom.setOpacity(id,value);
            }else{
                id.style[property.replace(/\-(\w)/g,function(str,letter){return letter.toUpperCase();})] = value;//连字符式转驼峰式
            }
            return;
        }
        if(id.currentStyle){//ie
            return id.currentStyle[property.replace(/\-(\w)/g,function(str,letter){return letter.toUpperCase();})];//连字符式转驼峰式
        }else if(document.defaultView && document.defaultView.getComputedStyle){//firefox
            return document.defaultView.getComputedStyle(id,null).getPropertyValue(property.toLowerCase());
        }
        return null;
    },
    /** 往body中插入html代码 **/
    insertHtml : function(html){
        var frag = document.createDocumentFragment();
        var div = document.createElement("div");
        div.innerHTML = html;
        for (var i = 0, ii = div.childNodes.length; i < ii; i++) {
            frag.appendChild(div.childNodes[i]);
        }
        document.body.insertBefore(frag,document.body.firstChild);//document.body.appendChild(frag);//后插可能效率差点
    },
    /** 往head中插入css链接 **/
    loadCss : function(file){
        var head = document.getElementsByTagName("head")[0],
            css  = document.createElement("link");
        css.type = "text/css";
        css.rel = "stylesheet";
        css.href = file;
        head.insertBefore(css,head.firstChild);//head.appendChild(css);//后插可能效率差点
    },
    /** DOM加载完毕后执行函数 **/
    ready : function(f){
        var ie = !!(window.attachEvent && !window.opera);
        var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
        var fn = [];
        var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
        var d = document;

        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try { d.documentElement.doScroll('left'); run(); }
                catch (err) { setTimeout(arguments.callee, 0); }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                clearInterval(t), run();
            }, 0);
    }
};
///////////////////    特效    ///////////////////////////
var effect = {
    /** 显示对象 **/
    show : function(id){
        id = dom.ID(id);
        id.style.display = 'block';
    },
    /** 隐藏对象 **/
    hide : function(id){
        id = dom.ID(id);
        id.style.display = 'none';
    },
    /** 淡入淡出 id元素对象;startOpacity开始透明度；stopOpacity结束透明度；duration持续时间 **/
    fade : function(id,startOpacity,stopOpacity,duration){
        var speed = Math.round(duration / 100);
        if (startOpacity < stopOpacity){
            var timer = setInterval(function(){//淡入
                dom.setOpacity(id,++startOpacity);
                if(startOpacity == stopOpacity) clearInterval(timer);
            },speed);
            return;
        }
        var timer = setInterval(function(){//淡出
            dom.setOpacity(id,--startOpacity);
            if(startOpacity == stopOpacity) clearInterval(timer);
        },speed);
    },
    /** 淡入 id元素对象；duration持续时间  **/
    fadeIn : function(id,duration){
        effect.fade(id,0,100,duration);
    },
    /** 淡出 id元素对象；duration持续时间  **/
    fadeOut : function(id,duration){
        effect.fade(id,100,0,duration);
    },
    /** 向上收起 id元素对象；duration持续时间  **/
    slideUp : function(id,duration){
        id = dom.ID(id);
        var height = id.clientHeight;
        var step = Math.ceil( height / (duration/10) );
        var i = height;
        var timer = setInterval(function(){
                        id.style.height = i + 'px';
                        i -= step;
                        if(i<0){
                            id.style.display = 'none';
                            id.style.height = height + 'px';//将height还原，以便让它在接下来出现
                            clearInterval(timer);
                        }
                    },10);

    },
    /** 向下展开 id元素对象；duration持续时间  **/
    slideDown : function(id,duration){
        id = dom.ID(id);
        id.style.display = 'block';
        var height = id.clientHeight;
        id.style.height = 0;
        var step = Math.ceil( height / (duration/10) );
        var i = 0;
        var timer = setInterval(function(){
                        id.style.height = i + 'px';
                        i += step;
                        if(i>height){
                            id.style.height = height + 'px';
                            clearInterval(timer);
                        }
                    },10);

    },
    /** 向左收起 id元素对象；duration持续时间  **/
    slideLeft : function(id,duration){
        id = dom.ID(id);
        var width = id.clientWidth;
        var step = Math.ceil( width / (duration/10) );
        var i = width;
        var timer = setInterval(function(){
                        id.style.width = i + 'px';
                        i -= step;
                        if(i<0){
                            id.style.display = 'none';
                            id.style.width = width + 'px';//将width还原，以便让它在接下来出现
                            clearInterval(timer);
                        }
                    },10);

    },
    /** 向右展开 id元素对象；duration持续时间  **/
    slideRight : function(id,duration){
        id = dom.ID(id);
        id.style.display = 'block';
        var width = id.clientWidth;
        id.style.width = 0;
        var step = Math.ceil( width / (duration/10) );
        var i = 0;
        var timer = setInterval(function(){
                        id.style.width = i + 'px';
                        i += step;
                        if(i>width){
                            id.style.width = width + 'px';
                            clearInterval(timer);
                        }
                    },10);

    },
    /** 遮罩效果 show=1开启;show=0关闭 **/
    mask : function(show) {
        var fbg = dom.ID("__frame__");
        if(!fbg){
            var html;
            html = '<div id="__frame__" style="display:none;position:absolute;top:0;left:0;background:#000;filter:alpha(opacity=80);-moz-opacity:0.8;-khtml-opacity: 0.8;opacity: 0.8;z-index:100;border:none;width:100%;">';
            html += '<iframe scrolling="no" frameborder="0" marginheight="0" marginwidth="0" style="width:100%;height:100%;border:none;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity:0;">';
            html += '</iframe>';
            html += '</div>';
            dom.insertHtml(html);
        }
        fbg = dom.ID("__frame__");
        if(show){
            fbg.style.height = browser.getDocHeight() + "px";
            fbg.style.display = "";
            //document.documentElement.style.overflow = "hidden";
        }else{
            fbg.style.display = "none";
            //document.documentElement.style.overflow = "auto";
        }
    },
    /** 给对象添加拖动效果 **/
    drag : function(id){
        var o = dom.ID(id);
        var s = o.style;
        s.position = 'absolute';
        o.onmousedown = function(e){
            e = e || event;
            var x = e.clientX - o.offsetLeft;
            var y = e.clientY - o.offsetTop;
            document.onmousemove = function(e) {
                e = e || event;
                s.left = e.clientX - x + 'px';
                s.top = e.clientY - y + 'px'
            };
            document.onmouseup = function() {
                document.onmousemove = null
            }
        }
    },
    /** 以快速放大的方式居中出现 id元素对象；mask是否加遮罩 **/
    zoomIn : function(id,mask){
        id = dom.ID(id);
        id.style.display = 'block';
        dom.setOpacity(id,0);
        var ele = {'height':id.clientHeight,'width':id.clientWidth};//元素对象的宽度和高度
        id.style.height = 0;
        id.style.width = 0;
        id.style.overflow = 'hidden';
        id.style.zIndex = 999999;
        //每隔10毫秒执行一次。要在0.1秒内执行完。用高度除以10得出每次要增加多少像素
        var height_step = Math.ceil(ele.height/10);
        var width_step = Math.ceil(ele.width/10);
        var height_start = 0;
        var width_start = 0;
        var opacity = 0;
        var height_over = false;
        var width_over = false;
        var timer = setInterval(function(){
            height_start += height_step;
            width_start += width_step;
            dom.setOpacity(id,opacity);
            opacity += 10;
            if(height_start>ele.height){
                id.style.height = ele.height;
                height_over = true;
            }else{
                id.style.height = height_start + 'px';
            }
            if(width_start>ele.width){
                id.style.width = ele.width;
                width_over = true;
            }else{
                id.style.width = width_start + 'px';
            }
            position.center(id);
            if(height_over&&width_over){
                clearInterval(timer);
                if(mask) effect.mask(1);//要等动画结束后再加遮罩。因为至少在IE8里发现有遮罩的话，动画会非常卡。
            }
        },10);
    },
    /** 以快速缩小的方式居中消息 id元素对象;mask是否有加遮罩 **/
    zoomOut : function(id,mask){
        if(mask) effect.mask(0);
        id = dom.ID(id);
        //每隔10毫秒执行一次。要在0.1秒内执行完。用高度除以10得出每次要减少多少像素
        var ele = {'height':id.clientHeight,'width':id.clientWidth};//元素对象的宽度和高度
        var height_step = Math.ceil(ele.height/10);
        var width_step = Math.ceil(ele.width/10);
        var height_start = ele.height;
        var width_start = ele.width;
        var opacity = 100;
        var height_over = false;
        var width_over = false;
        var timer = setInterval(function(){
            height_start -= height_step;
            width_start -= width_step;
            dom.setOpacity(id,opacity);
            opacity -= 10;
            if(height_start<0){
                id.style.height = 0;
                height_over = true;
            }else{
                id.style.height = height_start + 'px';
            }
            if(width_start<0){
                id.style.width = 0;
                width_over = true;
            }else{
                id.style.width = width_start + 'px';
            }
            position.center(id);
            if(height_over&&width_over){
                id.style.display = 'none';
                clearInterval(timer);
                id.style.width = ele.width + 'px'; //将width和height还原，以便让它在接下来出现
                id.style.height = ele.height + 'px';
            }
        },10);
    }
};
//////////////////////     事件处理     ///////////////////////////
var myEvent = {
    /** 添加事件 element元素对象；type事件类型；handler事件函数  **/
    add : function(element, type, handler) {
        var ele = dom.ID(element);
        if (!ele) return;
        if (ele.addEventListener) ele.addEventListener(type, handler, false);//Mozilla
        else if (ele.attachEvent) ele.attachEvent("on" + type, handler);//IE
        else ele["on" + type] = handler
    },
    /** 移除事件  element元素对象；type事件类型；handler事件函数 **/
    remove : function(element, type, handler) {
        var ele = dom.ID(element);
        if (!ele) return;
        if (ele.removeEventListener) ele.removeEventListener(type, handler, false);//Mozilla
        else if (ele.detachEvent) ele.detachEvent("on" + type, handler);//IE
        else ele["on" + type] = null
    }
};
////////////////////    设置元素对象位置      ///////////////////////
var position = {
    /** 居中 id元素对象 **/
    center : function(id){
         var id = dom.ID(id);
         var ie6 = browser.ie6();
         var win = browser.getWindow();//浏览器窗口宽度和高度
         var ele = {'height':id.clientHeight,'width':id.clientWidth};//元素对象的宽度和高度
         if(ie6){
             id.style.position = 'absolute';
             var scrollBar = browser.getScroll(); //滚动条宽度和高度
         }else{
             var scrollBar = {'height':0,'width':0};//用fixed定位不需要考虑滚动条
             id.style.position = 'fixed';
         }
         ele.top = parseInt((win.height-ele.height)/2+scrollBar.height);
         ele.left = parseInt((win.width-ele.width)/2+scrollBar.width);
         id.style.top = ele.top + 'px';
         id.style.left = ele.left + 'px';
    },
    /** 浮动居中 id元素对象 **/
    floatCenter : function(id){
        position.center(id);
        var fun = function(){position.center(id);};
        if(browser.ie6()){
            myEvent.add(window,'scroll',fun);
            myEvent.add(window,'resize',fun);
        }else{
            myEvent.add(window,'resize',fun);
        }
    },
    /** 右下角 id元素对象 **/
    rightBottom : function(id){
        var id = dom.ID(id);
        var ie6 = browser.ie6();
        if(ie6){
            var win = browser.getWindow();//浏览器窗口宽度和高度
            var scrollBar = browser.getScroll(); //滚动条宽度和高度
            var ele = {'height':id.clientHeight,'width':id.clientWidth};//元素对象的宽度和高度
            ele.top = parseInt(win.height + scrollBar.height - ele.height) - 10;
            id.style.position = 'absolute';
            id.style.top = ele.top + 'px';
            id.style.right = 0;
        }else{
            id.style.position = 'fixed';
            id.style.right = 0;
            id.style.bottom = 0;
        }
    },
    /** 浮动在右下角 id元素对象 **/
    floatRightBottom : function(id){
        position.rightBottom(id);
        var fun = function(){position.rightBottom(id);};
        if(browser.ie6()){
            myEvent.add(window,'scroll',fun);
            myEvent.add(window,'resize',fun);
        }
    }
};