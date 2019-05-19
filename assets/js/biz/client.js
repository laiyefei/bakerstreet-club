//the client info
;define(function(){

    //declare a object for return
    var oClient = {};
    oClient.getOSAndBrowser = function(){

      //put the os and broswer in the data format
      var oReJson = {};

      var os = navigator.platform;
      var userAgent = navigator.userAgent;
      var info  = "";
      var tempArray  = "";
      if(os.indexOf("Win") > -1){
          if(userAgent.indexOf("Windows NT 5.0") > -1){
            info = "Win2000";
          }else if(userAgent.indexOf("Windows NT 5.1") > -1){
            info = "WinXP";
          }else if(userAgent.indexOf("Windows NT 5.2") > -1){
            info = "Win2003";
          }else if(userAgent.indexOf("Windows NT 6.0") > -1){
            info = "WindowsVista";
          }else if(userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1){
            info = "Win7";
          }else if(userAgent.indexOf("Windows 8") > -1){
            info = "Win8";
          }else if(userAgent.indexOf("Windows NT 10.0") > -1){
            info = "Win10";
          }else{
            info = "Other";
          }
     }else if(os.indexOf("Mac") > -1){
          info = "Mac";
     }else if(os.indexOf("X11") > -1){
          info = "Unix";
     }else if(os.indexOf("Linux") > -1){
          info = "Linux";
     }else{
          info = "Other";
     }
     oReJson["os"] = info;
    if(/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)){
      tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
      info = tempArray[1] + tempArray[2];
    }else if(/MSIE \d+\.\d+/.test(userAgent)){
      tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
      info = tempArray[1] + tempArray[2];
    }else if(/[Cc]hrome\/\d+/.test(userAgent)){
      tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
      info = tempArray[1] + tempArray[2];
    }else if(/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)){
      tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
      info =  tempArray[3] + tempArray[1];
    }else if(/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)){
      tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
      info =  tempArray[1] + tempArray[2];
    }else{
      info = "unknown";
    }
      oReJson["broswer"] = info;
      return oReJson;
    };

    //the time system in client
    var oTime = {};
    oTime.setCurrentTimeFormat = function(sMask){

          //time
          var d = new Date();

          var zeroize = function (value, length) {

             if (!length) length = 2;
             value = String(value);
             for (var i = 0, zeros = ''; i < (length - value.length); i++) {
                 zeros += '0';
             }
             return zeros + value;
         };

         return sMask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g,
         function ($0) {
                   switch ($0) {
                     case 'd':
                        return d.getDate();
                     case 'dd':
                        return zeroize(d.getDate());
                     case 'ddd':
                        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
                     case 'dddd':
                        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
                     case 'M':
                        return d.getMonth() + 1;
                     case 'MM':
                        return zeroize(d.getMonth() + 1);
                     case 'MMM':
                        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
                     case 'MMMM':
                        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
                     case 'yy':
                        return String(d.getFullYear()).substr(2);
                     case 'yyyy':
                        return d.getFullYear();
                     case 'h':
                        return d.getHours() % 12 || 12;
                     case 'hh':
                        return zeroize(d.getHours() % 12 || 12);
                     case 'H':
                        return d.getHours();
                     case 'HH':
                        return zeroize(d.getHours());
                     case 'm':
                        return d.getMinutes();
                     case 'mm':
                        return zeroize(d.getMinutes());
                     case 's':
                        return d.getSeconds();
                     case 'ss':
                        return zeroize(d.getSeconds());
                     case 'l':
                        return zeroize(d.getMilliseconds(), 3);
                     case 'L':
                        var m = d.getMilliseconds();
                        if (m > 99) m = Math.round(m / 10);
                          return zeroize(m);
                     case 'tt':
                        return d.getHours() < 12 ? 'am' : 'pm';
                     case 'TT':
                        return d.getHours() < 12 ? 'AM' : 'PM';
                     case 'Z':
                        return d.toUTCString().match(/[A-Z]+$/);
                     // Return quoted strings with the surrounding quotes removed
                     default:
                        return $0.substr(1, $0.length - 2);
                 }
             });



    }
    oTime.getTimeGap = function(dDate1, dDate2){

        //check first
        if(dDate1 || dDate2) sherlock.console.error('error: sorry, the function in client js named getTimeGap have not null param');
        var tDate1, tDate2;
        try{
          tDate1 = dDate1.getTime();
          tDate2 = dDate2.getTime();
        }catch(ex){
          sherlock.console.error(ex.message);
          return null;
        }

        return tDate2 - tDate1;
    }

    oClient.Time = oTime;

    //final return this object
    return oClient;

})
