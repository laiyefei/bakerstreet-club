;define(['rt-addons', 'sg'], function(React, sg) {

      // add sherlock jsx syntax here
      var oSherlock = React.createClass({
          readSherlock : function(){
              sg.get('api/sherlock')
              .accept('json')
              .end(function(err, oRes){
                if(err) throw err;
                if(oRes.ok){
                    //test first
                    oRes.text = {};
                    var oRMenus = oRes.text;
                    if('string' == typeof oRMenus){
                        oRMenus = eval('('+ oRMenus +')')
                    }
                    this.setSherlockStatus(oRMenus);
                }else{
                    sherlock.console.log('sorry, the sg for get api was wrong in readSherlock of sherlock.jsx')
                }
              }.bind(this))
          },
          setSherlockStatus : function(oSherlock){
              this.setState({sherlocks:oSherlock});
          },
          getInitialState: function() {
            return {sherlocks : []};
          },
          componentDidMount: function() {
              this.readSherlock();
          },
          render: function() {

              return (
                  <div  className='m-sherlock-think1' >
                    <span className='m-sherlock-think1bot'></span>
                    <span className='m-sherlock-think1top'></span>
                    <div id='dvSherlockThink'>
                      你好，旅行者。。
                    </div>
                  </div>
              )
          }
      });

      return oSherlock;
});
