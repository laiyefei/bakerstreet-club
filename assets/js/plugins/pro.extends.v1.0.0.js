/*
 * author : laiyf
 * date   : 20170530
 * desc   : this is a js for extend init prototype;
 * version: v1.0.0
 * about  : https://github.com/bakerstreet-club
 */
(function(){

  String.prototype.IsURL = function() {
      var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
          + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
          + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
          + '|' // 允许IP和DOMAIN（域名）
          + '([0-9a-z_!~*\'()-]+.)*' // 域名- wwIw.
          + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
          + '[a-z]{2,6})' // first level domain- .com or .museum
          + '(:[0-9]{1,4})?' // 端口- :80
          + '((/?)|' // a slash isn't required if there is no file name
          + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';

          var re=new RegExp(strRegex);
          //re.test()
          var iParamIndex = this.indexOf('?');
          var bTest = false;
          if(iParamIndex > -1){
            bTest = re.test(this.substring(0, iParamIndex));
          }
          return bTest;
   };

   // 返回字符的长度，一个中文算2个
  String.prototype.ChineseLength=function(){
    return this.replace(/[^\x00-\xff]/g,"**").length;
  };
  // 判断字符串是否以指定的字符串结束
  String.prototype.EndsWith = function(str){
    return this.substr(this.length - str.length) == str;
  };
  // 去掉字符左端的的空白字符
  String.prototype.LeftTrim = function(){
    return this.replace(/(^[\\s]*)/g, "");
  };
  // 去掉字符右端的空白字符
  String.prototype.RightTrim = function(){
    return this.replace(/([\\s]*$)/g, "");
  };
  // 判断字符串是否以指定的字符串开始
  String.prototype.StartsWith = function(str){
    return this.substr(0, str.length) == str;
  };
  // 去掉字符两端的空白字符
  String.prototype.Trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
  // 获取字符串的长度（以byte计）
  String.prototype.GetNoEByteLength = function(str){
      return this.replace(/[^\x00-\xff]/g, !str ? "aa" : str).length;
  }; 
  //长度截取 param : 1.长度; 2.填充参数
    String.prototype.SubByteLength = function(iLen, sShim, iShimLen){
        var fnGetLength = function (sInit) {
            return sInit.replace(/[^\x00-\xff]/g, "aa").length;
        };
        iLen = "string" == typeof iLen ? parseInt(iLen) : iLen;
        sShim = !sShim ? "." : sShim;
        iShimLen = !iShimLen ? 3 : ("string" == typeof iShimLen ? parseInt(iShimLen) : iShimLen);
        var sAfter = "";
        for (var iShimLenStart = 0; iShimLenStart < iShimLen; iShimLenStart++) {
            sAfter += sShim;
        }

        if (fnGetLength(this) > iLen) {
            return this.substr(0, iLen) + sAfter;
        } else {
            return this;
        }
    };

})(window);
