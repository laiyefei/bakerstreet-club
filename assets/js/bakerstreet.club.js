/*
 * author : leaffly
 * create : 2018-09-29
 * desc : this is js entry to my website
 * version : v1.0.0.20180929
 * github : github.com/sherlock-help
 * blog : http://sherlock.help
 */
;'use strict';
;(function(window){
  var cli = {
    console : window.console || {},
    info : {
      getOS : function(){
          var osType = "[No_Found]";
          var os = navigator.platform;
          if(os.indexOf("Win") > -1){
              if(userAgent.indexOf("Windows NT 5.0") > -1){
                osType = "Win2000";
              }else if(userAgent.indexOf("Windows NT 5.1") > -1){
                osType = "WinXP";
              }else if(userAgent.indexOf("Windows NT 5.2") > -1){
                osType = "Win2003";
              }else if(userAgent.indexOf("Windows NT 6.0") > -1){
                osType = "WindowsVista";
              }else if(userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1){
                osType = "Win7";
              }else if(userAgent.indexOf("Windows 8") > -1){
                osType = "Win8";
              }else if(userAgent.indexOf("Windows NT 10.0") > -1){
                osType = "Win10";
              }else{
                osType = "Other";
              }
          }else if(os.indexOf("Mac") > -1){
              osType = "Mac";
          }else if(os.indexOf("X11") > -1){
              osType = "Unix";
          }else if(os.indexOf("Linux") > -1){
              osType = "Linux";
          }else{
              osType = "Other";
          }
          return osType;
      },
      getBrowser : function(){
        var userAgent = navigator.userAgent;
        var browserType = "[No_Found]";
        var version = -1;
        if(/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)){
          tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
          browserType = tempArray[1] + tempArray[2];
          version = parseInt(tempArray[2]);
        }else if(/MSIE \d+\.\d+/.test(userAgent)){
          tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
          browserType = tempArray[1] + tempArray[2];
          version = parseInt(tempArray[2]);
        }else if(/[Cc]hrome\/\d+/.test(userAgent)){
          tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
          browserType = tempArray[1] + tempArray[2];
          version = parseInt(tempArray[2]);
        }else if(/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)){
          tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
          browserType =  tempArray[3] + tempArray[1];
          version = parseInt(tempArray[1]);
        }else if(/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)){
          tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
          browserType =  tempArray[1] + tempArray[2];
          version = parseInt(tempArray[2]);
        }else{
          browserType = "unknown";
          version = 0;
        }
        return {
          type : browserType,
          version : version
        };
      },
      lowerBrowser : function(browserType, version){
          //if not find worst think
          if(!browserType || !version) return true;
          browserType = browserType.toUpperCase();
          version = parseInt(version);
          var oBrowser = cli.info.getBrowser();
          if(oBrowser.type.toUpperCase().indexOf(browserType) == -1){
            return false;
          }
          if(oBrowser.version < version){
            return true;
          }
          return false;
      }
    },
    type : {
      FRCLASS : {
        '[object Boolean]' : 'boolean',
        '[object Number]' : 'number',
        '[object String]' : 'string',
        '[object Function]' : 'function',
        '[object Array]' : 'array',
        '[object Date]' : 'date',
        '[object RegExp]' : 'regexp',
        '[object Object]' : 'object',
        '[object Error]' : 'error',
        '[object Symbol]' : 'symbol'
      },
      get : function(obj){
        //if undefined return undefined to string
        if(obj == null){
          return String(obj);
        }
        //if easy object return sample, or return the type from FRCLASS
        return cli.type.FRCLASS[String.call(obj)] || typeof obj;
      }
    },
    judg : {
      documentIsHTML : true,
      support : {
        'sortStable' : false,
        'detectDuplicates' : false,
        'attributes' : true,
        'getElementsByTagName' : true,
        'getElementsByClassName' : true,
        'getById' : true,
        'qsa' : true,
        'matchesSelector' : true,
        'disconnectedMatch' : true,
        'sortDetached' : true
      },
      isWindow : function(obj){
          return obj != null && obj === obj.window;
      },
      isArray : function(obj){
          return Array.isArray(obj);
      },
      isArrayLike : function(obj){
        //support: real ios 8.2 only
        var length = !!obj && 'length' in obj && obj.length, type = cli.type.get(obj);
        if(type === 'function' || cli.judg.isWindow(obj)){
          return false;
        }
        return type === 'array' || length === 0 
                || typeof length === 'number' && length > 0 && (length - 1) in obj;
      },
      isFunction : function(obj){
        return cli.type.get(obj) === 'function';
      },
      isPlainObject : function(obj){
        //think it sample first
        if(!obj || toString.call(obj) !== '[object Object]'){
          return false;
        }
        //declare the variable
        var oPro, fnCtor;
        //if it not have prototype, it will be plain object
        if(!oPro){
          return true;
        }
        //the ctor function think
        fnCtor = hasOwnProperty(oPro, 'constructor') && oPro.constructor;
        return typeof fnCtor === 'function' && toString.call(fnCtor) === '[object Function]';
      },
      isObject : function(obj){
        return cli.type.get(obj) === 'object';
      },
      contains : function(a, b){
        if(!a || !b){
          cli.console.error('sorry, the arguments of cli.judg.contains is can not be empty ! ');
          return false;
        }
        var adown = a.nodeType === 9 ? a.documentElement : [], bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 
                && (adown.contains ? adown.contains(bup) 
                    : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      },
      inArray : function(ele, arr, i){
        return arr == null ? -1 : indexOf.call(arr, ele, i);
      },
      isXMLDoc : function(elem){
        //documentElement is verified for cases where it doesn't yet exist (such as loading iframe in ie)
        var oDocElem = elem && (elem.ownerDocument || elem).documentElement;
        return oDocElem ? oDocElem.nodeName !== 'HTML' : false;
      }
    },
    helper : {
      createEleTag : function(oEl, oTagInfo){
        //first see condition
        if(!oEl || !oTagInfo || 'object' !== cli.type.get(oTagInfo) || !oTagInfo['tag']){
          cli.console.error('sorry, the function createEleTag was be used with wrong params !');
          return;
        }
        //create
        var oTag = document.createElement(oTagInfo['tag']);
        var fnfdos = [];
        for(var item in oTagInfo){
          if('child' == item && cli.judg.isObject(oTagInfo[item])){
            //if(oTagInfo[item] instanceof Array)
            //Array.isArray() IE9+, Firefox 4+, Safari 5+, Opera 10.5+ chrome
            //Object.prototype.toString.call(o) === '[object Array]'
            if(oTagInfo[item].constructor === Array){
              for(var i = 0; i < oTagInfo[item].length; i++){
                cli.helper.createEleTag(oTag, oTagInfo[item][i]);
              }
            }
          }else if('tag' != item && 'child' != item){
            if('string' === cli.type.get(oTagInfo[item])){
              if('innerHTML' == item){
                oTag.innerHTML = oTagInfo[item];
              }else{
                oTag.setAttribute(item, oTagInfo[item]); 
              }
            }else if(cli.judg.isFunction(oTagInfo[item])){
              if('fnfdo' == item){
                fnfdos.push(oTagInfo[item]);
              }else{
                if(oTag.addEventListener){
                  oTag.addEventListener(item.indexOf('on') == 0 ? item.substr(2) : item, oTagInfo[item], false);
                }else if(oTag.attachEvent){
                  oTag.attachEvent(item.indexOf('on') == 0 ? item : 'on' + item, oTagInfo[item]);
                }
                //if the function is define by myself it will set to object as attribute
                oTag[item] = oTagInfo[item];
              }
            }else if(cli.judg.isObject(oTagInfo[item])){
              oTag[item] = oTagInfo[item];
            }
          }
        }
        oEl.appendChild(oTag);
        if(fnfdos.length > 0){
          for(var ifn = fnfdos.length - 1; ifn >= 0; ifn--){
            fnfdos[ifn]();
          }
        }
        //prevent memory leak
        oTag = null;
      } 
    }
  };

  //init invoke
  (function(cli){
    //invoke 
    var oTagHeads = window.document.getElementsByTagName('head');
    if(oTagHeads.length == 0){
      cli.console.warn('sorry, you can not detect the head tag, in order to standardize the HTML document flow, please add the head tag, or you can not use full use this js');
      return;
    }
    var oHead = oTagHeads[0];
    //find all scripts from oHead
    var allScripts = oHead.getElementsByTagName('script');
    var jsroot;//have / to easy set path
    for(var ish = 0; ish < allScripts.length; ish++){
       var sSrc = allScripts[ish].getAttribute('src');
       if(!sSrc) continue;
       var iIndexLast = sSrc.lastIndexOf('/');
       if(sSrc && sSrc.substr(iIndexLast + 1).toLowerCase() == 'bakerstreet.club.js'){
          jsroot = sSrc.substring(0, iIndexLast + 1);
       }
    }
    if(!jsroot){
      cli.console.warn('sorry, can not find the jsroot in the document, please check this js is in the head tag and it named bakerstreet.club.js');
      return;
    } 
    var oInitScript = {
      'tag' : 'script',
       'type' : 'text/javascript',
       'src' : jsroot + 'base/require.js',
       'defer' : 'defer',
       'async' : 'true',
       'data-main' : jsroot + 'main'
    };
    if(cli.info.lowerBrowser("ie", 10)){
      cli.helper.createEleTag(oHead, {
        'tag' : 'script',
        'type' : 'text/javascript',
        'src' : jsroot + 'adapter/browser.min.js',
        'defer' : 'defer',
        'async' : 'true'
      });
      oInitScript['type'] = 'text/babel';
    } 
    cli.helper.createEleTag(oHead, oInitScript);
  })(cli);
})(window);