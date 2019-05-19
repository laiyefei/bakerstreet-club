/*
 * author : sherlock
 * createtime : 2017-01-22
 * describe : this is a peneral-purpose library for my easy use
*/
'use strict';
;define(function(){

      //declare variable
      var oGPLib = {};

      //this is the com something in use this js
      var com = {};
      //com function use
      com.fn = {};
      //get the style no just in the dom
      com.fn.getStyle = function(obj, name){
        if(obj.currentStyle)
        {
          return obj.currentStyle[name];
        }
        else
        {
          return getComputedStyle(obj, false)[name];
        }
      }
      //as you see set the style
      com.fn.setStyle = function(obj, json){
        if(obj.length)
          for(var i=0;i<obj.length;i++) com.fn.setStyle(obj[i], json);
        else
        {
          if(arguments.length==2)	//json
            for(var i in json) com.fn.setStyle(obj, i, json[i]);
          else	//name, value
          {
            switch(arguments[1].toLowerCase())
            {
              case 'opacity':
                obj.style.filter='alpha(opacity:'+arguments[2]+')';
                obj.style.opacity=arguments[2]/100;
                break;
              default:
                if(typeof arguments[2]=='number')
                {
                  obj.style[arguments[1]]=arguments[2]+'px';
                }
                else
                {
                  obj.style[arguments[1]]=arguments[2];
                }
                break;
            }
          }
        }
      }
      //just use _setStyle
      com.fn._setStyle = function(now){
        com.fn.setStyle(this, now);
      }
      //set css3 style use way: setStyle3(this, 'transform', 'perspective(1000px) translateY('+now.y+'px) rotateX('+now.x+'deg)');
      com.fn.setStyle3 = function(obj, name, value){
        obj.style['Webkit'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style['Moz'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style['ms'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style['O'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style[name]=value;
      }
      //get the class of the dom
      com.fn.getByClass = function(oParent, sClass){
        var aEle=oParent.getElementsByTagName('*');
        var re=new RegExp('\\b'+sClass+'\\b', 'i');
        var aResult=[];
        for(var i=0;i<aEle.length;i++)
        {
          if(re.test(aEle[i].className))
          {
            aResult.push(aEle[i]);
          }
        }
        return aResult;
      }
      //bind the event
      com.fn.bindEvent = function(obj, ev, fn){
        obj.addEventListener?obj.addEventListener(ev, fn, false):obj.attachEvent('on'+ev, fn);
      }
      //unbind the event
      com.fn.unbindEvent = function(obj, ev, fn)
      {
        obj.removeEventListener?obj.removeEventListener(ev, fn, false):obj.detachEvent('on'+ev, fn);
      }
      //set the cookie with the function
      com.fn.setCookie = function(name, value, iDay){
        if(iDay!==false)
        {
          var oDate=new Date();
          oDate.setDate(oDate.getDate()+iDay);

          document.cookie=name+'='+value+';expires='+oDate+';path=/';
        }
        else
        {
          document.cookie=name+'='+value;
        }
      }
      //get the cookie
      com.fn.getCookie = function(name){
        var arr=document.cookie.split('; ');
        var i=0;
        for(i=0;i<arr.length;i++)
        {
          var arr2=arr[i].split('=');

          if(arr2[0]==name)
          {
            return arr2[1];
          }
        }
        return '';
      }
      //remove the cookie
      com.fn.removeCookie = function(name){
        com.fn.setCookie(name, 'a', -1);
      }
      //get the format string with the format of "%1 %2 %..."
      com.fn.sprintf = function(format){
        var _arguments=arguments;
        return format.replace(/%\d+/g, function (str){
          return _arguments[parseInt(str.substring(1))];
        });
      }
      //the function like jquery
      com.fn.getEle = function(sExp, oParent)
      {
        var aResult=[];
        var i=0;
        oParent || (oParent=document);
        if(oParent instanceof Array)
        {
          for(i=0;i<oParent.length;i++)aResult=aResult.concat(com.fn.getEle(sExp, oParent[i]));
        }
        else if(typeof sExp=='object')
        {
          if(sExp instanceof Array)
          {
            return sExp;
          }
          else
          {
            return [sExp];
          }
        }
        else
        {
          if(/,/.test(sExp))
          {
            var arr=sExp.split(/,+/);
            for(i=0;i<arr.length;i++)aResult=aResult.concat(com.fn.getEle(arr[i], oParent));
          }
          else if(/[ >]/.test(sExp))
          {
            var aParent=[];
            var aChild=[];
            var arr=sExp.split(/[ >]+/);
            aChild=[oParent];
            for(i=0;i<arr.length;i++)
            {
              aParent=aChild;
              aChild=[];
              for(j=0;j<aParent.length;j++)
              {
                aChild=aChild.concat(com.fn.getEle(arr[i], aParent[j]));
              }
            }
            aResult=aChild;
          }
          else
          {
            switch(sExp.charAt(0))
            {
              case '#':
                return [document.getElementById(sExp.substring(1))];
              case '.':
                return getByClass(oParent, sExp.substring(1));
              default:
                return [].append(oParent.getElementsByTagName(sExp));
            }
          }
        }
        return aResult;
      }
      //the random number between n and m
      com.fn.rnd = function(n, m){
        return Math.random()*(m-n)+n;
      }
      //the sport of swing
      com.fn.swing = function (obj, cur, target, fnDo, fnEnd, acc){
        if(com.broswer.Test.IE6)
        {
          fnDo&&fnDo.call(obj, target);
          fnEnd&&fnEnd.call(obj, target);
          return;
        }
        if(!acc)acc=0.1;
        var now={};
        var x=0;	//0-100
        if(!obj.__swing_v)obj.__swing_v=0;
        if(!obj.__last_timer)obj.__last_timer=0;
        var t=new Date().getTime();
        if(t-obj.__last_timer>20)
        {
          fnMove();
          obj.__last_timer=t;
        }
        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove, 20);
        function fnMove(){
          if(x<50)
          {
            obj.__swing_v+=acc;
          }
          else
          {
            obj.__swing_v-=acc;
          }
          //if(Math.abs(obj.__flex_v)>MAX_SPEED)obj.__flex_v=obj.__flex_v>0?MAX_SPEED:-MAX_SPEED;
          x+=obj.__swing_v;
          //alert(x+','+obj.__swing_v);
          for(var i in cur)
          {
            now[i]=(target[i]-cur[i])*x/100+cur[i];
          }
          if(fnDo)fnDo.call(obj, now);
          if(/*Math.abs(obj.__swing_v)<1 || */Math.abs(100-x)<1)
          {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd.call(obj, target);
            obj.__swing_v=0;
          }
        }
      };
      //the sport of flex
      com.fn.flex = function (obj, cur, target, fnDo, fnEnd, fs, ms)
      {
        if(com.broswer.Test.IE6)
        {
          fnDo&&fnDo.call(obj, target);
          fnEnd&&fnEnd.call(obj, target);
          return;
        }
        var MAX_SPEED=16;

        if(!fs)fs=6;
        if(!ms)ms=0.75;
        var now={};
        var x=0;	//0-100
        if(!obj.__flex_v)obj.__flex_v=0;
        if(!obj.__last_timer)obj.__last_timer=0;
        var t=new Date().getTime();
        if(t-obj.__last_timer>20)
        {
          fnMove();
          obj.__last_timer=t;
        }
        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove, 20);
        function fnMove(){
          obj.__flex_v+=(100-x)/fs;
          obj.__flex_v*=ms;
          if(Math.abs(obj.__flex_v)>MAX_SPEED)obj.__flex_v=obj.__flex_v>0?MAX_SPEED:-MAX_SPEED;
          x+=obj.__flex_v;
          for(var i in cur)
          {
            now[i]=(target[i]-cur[i])*x/100+cur[i];
          }
          if(fnDo)fnDo.call(obj, now);
          if(Math.abs(obj.__flex_v)<1 && Math.abs(100-x)<1)
          {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd.call(obj, target);
            obj.__flex_v=0;
          }
        }
      };
      //the sport of buffer
      com.fn.buffer = function (obj, cur, target, fnDo, fnEnd, fs){
        if(com.broswer.Test.IE6)
        {
          fnDo&&fnDo.call(obj, target);
          fnEnd&&fnEnd.call(obj, target);
          return;
        }
        if(!fs)fs=6;
        var now={};
        var x=0;
        var v=0;
        if(!obj.__last_timer)obj.__last_timer=0;
        var t=new Date().getTime();
        if(t-obj.__last_timer>20)
        {
          fnMove();
          obj.__last_timer=t;
        }
        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove, 20);
        function fnMove(){
          v=Math.ceil((100-x)/fs);
          x+=v;
          for(var i in cur)
          {
            now[i]=(target[i]-cur[i])*x/100+cur[i];
          }
          if(fnDo)fnDo.call(obj, now);
          if(Math.abs(v)<1 && Math.abs(100-x)<1)
          {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd.call(obj, target);
          }
        }
      };
      //the sport of linear
      com.fn.linear = function (obj, cur, target, fnDo, fnEnd, fs){
        if(com.broswer.Test.IE6)
        {
          fnDo&&fnDo.call(obj, target);
          fnEnd&&fnEnd.call(obj, target);
          return;
        }
        if(!fs)fs=50;
        var now={};
        var x=0;
        var v=0;
        if(!obj.__last_timer)obj.__last_timer=0;
        var t=new Date().getTime();
        if(t-obj.__last_timer>20)
        {
          fnMove();
          obj.__last_timer=t;
        }
        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove, 20);
        v=100/fs;
        function fnMove(){
          x+=v;
          for(var i in cur)
          {
            now[i]=(target[i]-cur[i])*x/100+cur[i];
          }
          if(fnDo)fnDo.call(obj, now);
          if(Math.abs(100-x)<1)
          {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd.call(obj, target);
          }
        }
      };
      //the sport of stop
      com.fn.stop=function (obj){
        clearInterval(obj.timer);
      };
      //the sport of move css3   com.fn.addEnd in the com.fn.init
      com.fn.move3=function (obj, json, fnEnd, fTime, sType){
        if(null == com.fn.addEnd) return;
        var addEnd=com.fn.addEnd;
        fTime||(fTime=1);
        sType||(sType='ease');
        setTimeout(function (){
          com.fn.setStyle3(obj, 'transition', sprintf('%1s all %2', fTime, sType));
          addEnd(obj, function (){
            com.fn.setStyle3(obj, 'transition', 'none');
            if(fnEnd)fnEnd.apply(obj, arguments);
          }, json);
          setTimeout(function (){
            if(typeof json=='function')
              json.call(obj);
            else
              com.fn.setStyle(obj, json);
          }, 0);
        }, 0);
      };
      //the init do , after stop css3
      com.fn.init = function(){
        var aListener=[];	//{obj, fn, arg}
        if(!Modernizr.csstransitions)return;
        if(window.navigator.userAgent.toLowerCase().search('webkit')!=-1)
        {
          document.addEventListener('webkitTransitionEnd', endListrner, false);
        }
        else
        {
          document.addEventListener('transitionend', endListrner, false);
        }
        function endListrner(ev)
        {
          var oEvObj=ev.srcElement||ev.target;
          //alert(aListener.length);
          for(var i=0;i<aListener.length;i++)
          {
            if(oEvObj==aListener[i].obj)
            {
              aListener[i].fn.call(aListener[i].obj, aListener[i].arg);
              aListener.remove(aListener[i--]);
            }
          }
        }
        com.fn.addEnd=function (obj, fn, arg)
        {
          if(!obj || !fn)return;
          aListener.push({obj: obj, fn: fn, arg: arg});
        }
      }
      //the broswer
      com.broswer = {};

      //the broswer test
      com.broswer.Test = {};
      com.broswer.Test.IE6 = -1 != window.navigator.userAgent.search(/MSIE 6/);
      com.broswer.Test.IE7 = -1 != window.navigator.userAgent.search(/MSIE 7/);
      com.broswer.Test.IE8 = -1 != window.navigator.userAgent.search(/MSIE 8/);
      com.broswer.Test.IE9 = -1 != window.navigator.userAgent.search(/MSIE 9/);
      com.broswer.Test.IE10 = -1 != window.navigator.userAgent.search(/MSIE 10/);

      com.broswer.Test.createDom = function(){
        var oDiv=document.createElement("div");
          //oDiv.className="browser_alert";
          oDiv.id = "dvBroswerDom"
          oDiv.innerHTML=
          "<a href='javascript:;' title='关闭'  onclick='javascript:document.getElementById(\"dvBroswerDom\").style.display=\"none\";'  >X</a>" +
          "<p >您的浏览器版本过低， 为了获取更好的体验，请及时升级！</p>";

          document.body.appendChild(oDiv);
      }


      //this is some common use effect
      com.stunt = {};
      //the block stunt of the param div
      com.stunt.blockCount = 4;
      com.stunt.block = function(oDvBlock, sFnDir){
        if(null == oDvBlock)
        {
          sherlock.console.log("%cSorry, the param of com.stunt.block is can not be empty !", "color:red");
          return;
        }
        var  iNow = oDvBlock.getAttribute("now");
        iNow = null == iNow ? 1 : parseInt(iNow);

        var iThisNeedBlock = iNow;
        var iThisNeedShow = iNow;
        if(0 == iThisNeedBlock)
        {
          iThisNeedBlock = com.stunt.blockCount;
        }
        if("pre" == sFnDir)
        {
          iThisNeedShow = iThisNeedBlock - 1;
          if(0 == iThisNeedShow)
          {
            iThisNeedShow = com.stunt.blockCount;
          }
        }else if(!isNaN(sFnDir))
        {
          iThisNeedShow = sFnDir;
        }else{
          iThisNeedShow = iThisNeedBlock + 1;
          if(com.stunt.blockCount == iThisNeedBlock)
          {
            iThisNeedShow = 1;
          }
        }

        var bReady = oDvBlock.getAttribute("ready");

        //get block div's top and left
        var iBTop = parseInt(com.fn.getStyle(oDvBlock, 'marginTop'));
        var iBLeft = parseInt(com.fn.getStyle(oDvBlock, 'marginLeft'));

        var W = 680;//window.innerWidth - 360;// 700;
        var H = 320;//(window.innerHeight - 100) * 0.8//400;


        if(null == bReady){
          bReady = true;
          oDvBlock.setAttribute("ready", "true");
        }
        if(!eval("("+ bReady +")"))return;
        oDvBlock.setAttribute("ready", "false");

        var R=4;
        var C=7;

        var cw=W/2;
        var ch=H/2;

        oDvBlock.innerHTML='';
        oDvBlock.style.background='url(./img/biz/mainshow/'+ iThisNeedShow +'.jpg) center no-repeat';
        oDvBlock.style.backgroundSize = "100% 100%";

        var aData=[];

        var wait=R*C;

        for(var i=0;i<R; i++)
        {
          for(var j=0,k=0;j<C;j++,k++)
          {
            aData[i]={left: W*j/C, top: H*i/R};
            var oNewDiv=document.createElement('div');

            com.fn.setStyle(oNewDiv, {
              position: 'absolute',
              background: 'url(./img/biz/mainshow/'+ iThisNeedBlock +'.jpg)'+-aData[i].left+'px '+-aData[i].top+'px no-repeat',
              width:Math.ceil(W/C)+'px', height: Math.ceil(H/R)+'px', left: (aData[i].left + iBLeft) +'px', top: (aData[i].top + iBTop) +'px'
            });
            //com.fn.setStyle3(oNewDiv, 'transition', '0.5s all ease-out');

            oDvBlock.appendChild(oNewDiv);

            var l=((aData[i].left+W/(2*C))-cw)*com.fn.rnd(2,3)+cw-W/(2*C);
            var t=((aData[i].top+H/(2*R))-ch)*com.fn.rnd(2,3)+ch-H/(2*R);

            setTimeout((function (oNewDiv,l,t){
              return function ()
              {
                com.fn.buffer(
                  oNewDiv,
                  {left: oNewDiv.offsetLeft, top: oNewDiv.offsetTop, opacity: 100, x:0,y:0,z:0,scale:1, a:0},
                  {left: l, top: t, opacity: 0,x:com.fn.rnd(-180, 180),y:com.fn.rnd(-180, 180),z:com.fn.rnd(-180, 180),scale:com.fn.rnd(1.5, 3), a:1},
                  function (now){
                    this.style.left=now.left+'px';
                    this.style.top=now.top+'px';
                    this.style.opacity=now.opacity/100;
                    com.fn.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateX('+now.x+'deg) rotateY('+now.y+'deg) rotateZ('+now.z+'deg) scale('+now.scale+')')
                  }, function (){
                    setTimeout(function (){
                      if(null != oNewDiv && oNewDiv.parentNode == oDvBlock)
                        oDvBlock.removeChild(oNewDiv);
                    }, 200);
                    if(--wait==0)
                    {
                      //ready=true;
                      oDvBlock.setAttribute("ready", "true");
                      //now=next();
                      if(!isNaN(sFnDir))
                      {
                        oDvBlock.setAttribute("now", sFnDir);
                      }else{
                        oDvBlock.setAttribute("now", iThisNeedShow % com.stunt.blockCount);
                      }
                    }
                  }, 10
                );
              };
            })(oNewDiv,l,t), com.fn.rnd(0, 200));
          }
        }

        return iThisNeedShow;
      }
      //the wave button
      com.stunt.waterFloat = function(elm,t,d,v){
        var i = elm;
        var runIt = function (elm,t,d,v) {
            elm.animate({top:'+='+v},t,"linear",function(){
            $({deg: -d}).animate({deg: d}, {
              duration: t,
              step: function(now){
                elm.css({
                  transform: "rotate(" + now + "deg)"
                });
              }
            },"linear");
            elm.animate({top:'-='+v},t,"linear",function(){
              $({deg: d}).animate({deg: -d}, {
              duration: t,
              step: function(now){
                    elm.css({
                        transform: "rotate(" + now + "deg)"
                });
              }
            },"linear");
              runIt(elm,t,d,v);
            });
          });
        }
        runIt(i,t,d,v);
      }

      //add extend to sherlock ============================================================================
      var win = {};
      win.initCss = null;
      win.endCss = null;
      win.runTimeLength = 1000;
      win.open = function(oThisObj, oEvent){
        //Math.round(Math.random() * 10) % 4
        if(null == win.initCss){
          var iLeft = null, iTop = null, iWidth = null, iHeight = null;

          if(null != oEvent || "undefined" != typeof oEvent)
          {
            iWidth = "0%";
            iHeight = "0%";
            iLeft=(oEvent.clientX/window.innerWidth)*100 +'%';
            iTop=(oEvent.clientY/window.innerHeight)*100 +'%';

          }else{
            switch(Math.round(Math.random() * 10) % 6 ){
              case 0:
                iLeft = "50%";iTop = "0%";iWidth = "0%";iHeight = "100%";
                break;
              case 1:
                iLeft = "0%";iTop = "50%";iWidth = "100%";iHeight = "0%";
                break;
              case 2:
                iLeft = "0%";iTop = "0%";iWidth = "100%";iHeight = "0%";
                break;
              case 3:
                iLeft = "0%";iTop = "0%";iWidth = "0%";iHeight = "100%";
                break;
              case 4:
                iLeft = "100%";iTop = "0%";iWidth = "0%";iHeight = "100%";
                break;
              case 5:
                iLeft = "0%";iTop = "100%";iWidth = "100%";iHeight = "0%";
                break;
              default:
                iLeft = "0%";iTop = "0%";iWidth = "0%";iHeight = "0%";
                break;
            }
          }

          win.initCss = {left:iLeft, top:iTop, width:iWidth, height:iHeight, background:"black",border:"0",opacity:"0"}; //borderRadius:"100%"
        }
        if(null == win.endCss){
          win.endCss = {
            left:"1%",width:"98%",height:"98%",background:"white",
            top:"1%",border:"0",opacity:"1"}; //borderRadius:".61%"
        }
        $(oThisObj).css(win.initCss);
        $(oThisObj).animate(win.endCss, win.runTimeLength);
      }
      win.close = function(oThisObj){
        if(null == win.initCss || null == win.endCss){
          console.log("%cError: wrong ! this style can't be fined, can't close this window", "color:red");
          return;
        }
        $(oThisObj).animate(win.initCss, win.runTimeLength);
        setTimeout(function(){
          win.initCss = null;
        }, win.runTimeLength + 100);
      }
      win.fnCsDo = function(oThis, sOperation, sSign, oEvent){
        //.animate({top:'0%'},900);   sSign is a param to sign this window opener id
        win[sOperation](oThis, oEvent);
      }
      win.opWinIframe = function(oThis, sImId, sUrl, sSign, oEvent){
        //get sure the normal open, and log information to the console
        if(null == oThis){
          console.log("%cError: will add iframe window object can not be null", "color:red");
          return;
        }else{
          var oWinIf =  document.getElementById("dv"+ sImId);
          if(null != oWinIf){
            console.log("%cError: this iframe id had been exist, please call another", "color:red");
            return;
          }
          if(null == sUrl || "" == sUrl){
            console.log("%cError: this iframe url can not be empty", "color:red");
            return;
          }
          oWinIf = document.createElement("iframe");
          var odvWinIf = document.createElement("div");
          odvWinIf.id = "dv"+sImId;
          odvWinIf.setAttribute("style", "z-index:9999;position:absolute;background:black;top:0;box-shadow:0 0 20px black");
          odvWinIf.className += " setDvIframe";
          //odvWinIf.style.zIndex = 999;
          if(null == sSign){
            //default it open 100 persent
            odvWinIf.style.width = "100%";
            odvWinIf.style.height = "100%";
          }else{
            //odvWinIf.className = sOpClass;
           // odvWinIf.style.width = "96%";
          //  odvWinIf.style.height = "96%";
            // $(odvWinIf).animate(sOpClassJson, 990);
            win.fnCsDo(odvWinIf, "open", sSign, oEvent);
          }
          //add content for new iframe window
          oWinIf.id = sImId;
          oWinIf.frameborder = "0";
          oWinIf.scrolling = "no";
          oWinIf.width = "100%";
          oWinIf.height = "100%";
          oWinIf.setAttribute("style", "border:0;position:absolute;left:0%;top:0%;");
          oWinIf.src = sUrl;

          //background div
          var obgDiv = document.getElementById("dvStBg");
          if(null == obgDiv)
          {
            obgDiv = document.createElement("div");
            obgDiv.id = "dvStBg";
            obgDiv.style.width = "100%";
            obgDiv.style.height = "100%";
            obgDiv.setAttribute("style", "display:none;opacity:.33;filter:alpha(opacity=33);border:0;position:absolute;background:white;top:0;left:0;width:100%;height:100%;");
            oThis.appendChild(obgDiv);
          }
          setTimeout(function(){
            $(obgDiv).fadeIn();
          },300)
          oThis.appendChild(odvWinIf);
          setTimeout(function(){
            odvWinIf.appendChild(oWinIf);
            //complete add iframe add exit button in iframe window
            var sOrigin = location.origin;

            //the shadow of sherlock png
            $("#dvCCWel").fadeOut();
            window.frames[sImId].onload = function(){

              this.focus();

              (this.contentWindow || this).oncontextmenu=function(){return false;}
              // this.contentWindow.ondragstart=function(){return false}
              // this.contentWindow.onselectstart=function(){return false}
              // this.contentWindow.onbeforecopy=function(){return false}
              // this.contentWindow.onselect=function(){return false;}
              // this.contentWindow.oncopy=function(){return false;}
              // this.contentWindow.ondrop=function(){return false;}
              // this.contentWindow.onmouseup=function(){return false;}
              // this.contentWindow.onmousedown = function(){return false;}

              var oImBody = (this.contentWindow || this).document.getElementsByTagName("body")[0];
              //add a cache to add all object and append in one time
              var oAllAppend = document.createDocumentFragment();
              //exit button div
              var sExFeetUrl = "../../../img/base/exFeet.png";
              if(s.judg.isBrowserType("ie"))
              {
                sExFeetUrl = "../../../img/base/exFeet.png";
              }
              var odvExImWin = document.createElement("div");

              var sBaseStyle = "z-index:9999;position:absolute;margin-left:90%;top:80%;width:50px;height:50px;background:url("+ sExFeetUrl +") no-repeat;background-size:50px 50px;";
              var sInitStyle = sBaseStyle + "opacity:0.3;filter:alpha(opacity=30);";
              var sHoverStyle = sBaseStyle + "opacity:0.7;filter:alpha(opacity=70);cursor:pointer;";

              odvExImWin.setAttribute("style", sInitStyle);
              odvExImWin.id = "dvEx" + sImId;
              //exit button style
              var oexStyle = document.createElement("style");
              oexStyle.type = "text/css";//cursor: url(static/img/leaf.ico),auto; cursor: url(static/img/oleaf.ico),auto;
              
              //var sLeaveCursor = "cursor:url(../img/leaf.ico),auto;}*:hover{cursor:url(../img/leaf.ico),auto;}*:link{cursor:url(../img/leaf.ico),auto;}*:active{cursor:url(../img/oleaf.ico),auto;}*:visited{cursor:url(../img/leaf.ico),auto;";
              oexStyle.innerHTML = "html,body{width:100%;height:100%;overflow-y:auto}*{padding:0;margin:0;/*-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;-user-select:none;*/}#dvEx" + sImId +":hover{opacity:0.7;filter:alpha(opacity=70);cursor:pointer;}#dvEx" + sImId +":active{opacity:1;filter:alpha(opacity=100);}";
              //add exit button event   sExClass
              $(odvExImWin).hover(function(){
                this.setAttribute("style", sHoverStyle); 
              }, function(){
                this.setAttribute("style", sInitStyle); 
              })
              odvExImWin.onclick = function(){
                this.setAttribute("style", sBaseStyle + "opacity:1;filter:alpha(opacity=100);");

                $(window.parent.document.getElementById("dvCCWel")).fadeIn(); 
                
                $("#dvStBg").fadeOut();
                var oImIds = this.id.split("dvEx");
                if(null != oImIds[1]){
                  var oThWinDiv = window.parent.document.getElementById("dv"+oImIds[1]);
                  if(null == sSign ){
                    oThWinDiv.style.width = "0";
                    oThWinDiv.style.height = "0";
                    oThWinDiv.style.display = "none";
                    oThWinDiv.parentNode.removeChild(oThWinDiv);
                  }else{
                    //oThWinDiv.className =  oThWinDiv.className.replace( sOpClass, sExClass);
                    //$(oThWinDiv).animate(sExClassJson, 990);
                    if (null != (window.frames[sImId].contentWindow || window.frames[sImId]).exWinClick)
                      (window.frames[sImId].contentWindow || window.frames[sImId]).exWinClick(function(){
                        win.fnCsDo(oThWinDiv, "close", sSign);
                        setTimeout(function(){
                          oThWinDiv.parentNode.removeChild(oThWinDiv);
                        }, 1000);
                      });
                    else{
                      win.fnCsDo(oThWinDiv, "close", sSign);
                      setTimeout(function(){
                        oThWinDiv.parentNode.removeChild(oThWinDiv);
                      }, 1000);
                    }
                  }
                }
              }

              oAllAppend.appendChild(oexStyle);
              oAllAppend.appendChild(odvExImWin);
              oImBody.appendChild(oAllAppend);
            }
          }, 500);
        }
      }
      win.opModelWin = function(sUrl, sWidth, sHeight){
          var sLeft= (window.screen.availWidth -sWidth)/2; 
          var sTop= (window.screen.availHeight-sHeight)/2;
          window.open(sUrl,"window","height ="+ sHeight +",width ="+ sWidth +",top="+ sTop +",left="+ sLeft +",toolbar=no,menubar=no, scrollbars=yes,  location=no,resizable=yes, status=no,z-look=yes,alwaysRaised=yes");
      }
      win.opModelDialog = function(sUrl, sWidth, sHeight){
        if(s.judg.isBrowserType("ie"))
        {
            var sLeft= (window.screen.availWidth - sWidth)/2; 
            var sTop= (window.screen.availHeight - sHeight)/2;
            var returnValue=window.showModalDialog(sUrl, window, "dialogHeight:"+ sHeight +"px;dialogWidth:"+ sWidth +"px;dialogTop:"+ sTop +"px;dialogLeft:"+ sLeft +"px;edge:Raised;center:Yes;help:Yes;resizable:Yes;scrollbars:auto;status:No;")
            return returnValue; 
        }else{
          console.log("%cSorry, this function of name opModelDialog is only can use by ie !", "color:red");
        }
      }






      oGPLib = {
        com : com,
        win : win
      };

      return oGPLib;

});
