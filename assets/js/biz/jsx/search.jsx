;define(['rt-addons', 'sg'], function(React, sg) {

      // add menu jsx syntax here
      var oSearch = {};
      var oSearchInfo = React.createClass({
          searchResult : function(){
              sg.get('api/search')
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
                    sherlock.console.log('sorry, the sg for get api was wrong in searchResult of menu.jsx')
                }
              }.bind(this))
          },
          setSherlockStatus : function(oSearch){

              if(oSearch.constructor != Array){ 
                  oSearch = ['（返回结果出错！）']; 
              }else if(oSearch.length == 0){ 
                  oSearch = ['找不到满足条件的数据！'];  
              }
              this.setState({searchs:oSearch});
          },
          getInitialState: function() {
            return {searchs : [1,2,3,4]};
          },
          componentDidMount: function() {
              this.searchResult();
          },
          render: function() {

              var oLiResult = [];
              //alert(this.state.searchs)
              this.state.searchs.map(function(oLSearch){ 
                  oLiResult.push(<div>{oLSearch}</div>);
              });

              return (
                  <div>
                    <button id='btnSearch'></button>
                    <input id='txtSearch' type='search' placeholder='try to find..' />
                    <div id='dvSearchInfo'>
                        {oLiResult}
                    </div>
                  </div>
              )
          }
      });
      //guess search
      var oGuessSearch = React.createClass({
          searchResult : function(){
              sg.get('api/search')
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
                    sherlock.console.log('sorry, the sg for get api was wrong in searchResult of menu.jsx')
                }
              }.bind(this))
          },
          setSherlockStatus : function(oSearch){
              this.setState({searchs:oSearch});
          },
          getInitialState: function() {
            return {searchs : []};
          },
          componentDidMount: function() {
              this.searchResult();
          },
          render: function() {


              return (
                  <div>
                      <div>你可能想搜：</div>
                      <ul>
                        <li>
                          test
                        </li>
                      </ul>
                  </div>
              )
          }
      });

      oSearch.SearchInfo = oSearchInfo;

      oSearch.GuessSearch = oGuessSearch;

      return oSearch;
});
