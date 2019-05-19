;define(['rt-addons', 'sg'], function(React, sg) {

      // add commun jsx syntax here
      var oCommun = React.createClass({
          mountWebSocket : function(){
              // this is an "echo" websocket service for testing pusposes
              this.conn = new WebSocket('ws://' + location.host + '/api/ws+');
              // listen to onmessage event
              this.conn.onmessage = evt => {
                // add the new message to state
                this.setState({
                    messages : this.state.messages.concat([ evt.data ])
                })
              };
              //listen to close event
              this.conn.onclose = function (evt) { console.log('Connected to WebSocket server.'); };
          },
          handleSend : function(){
            if(!this.state.TalkInfo) return false;
            sg.get('/api/loginCheck')
            .accept('json')
            .end(function(err, oRes){
              if(err) throw err;
              if(oRes.ok){
                  var oRMenus = oRes.text;
                  if('string' == typeof oRMenus){
                      oRMenus = eval('('+ oRMenus +')')
                  }
                  this.state.Name = oRMenus['DspName']
              }else{
                  sherlock.console.log('sorry, the sg for get loginCheck api was wrong commun.jsx')
              }
            }.bind(this));

            this.conn.send(
                this.state.Name + '：' + this.state.TalkInfo
            );
            this.handleClean();
            //alert('handle send')
          },
          handleClean : function(){
            var oTalkInfo = document.getElementById('txtTalkInfo');
            oTalkInfo.value = '';
            oTalkInfo.focus();
            this.setState({
              TalkInfo : ''
            });
          },
          handleChange : function(){
            this.setState({
              TalkInfo : event.target.value
            });
          },
          getInitialState: function() {
             return {
                Name : '旅行者',
                messages : []
             };
          },
          componentDidMount: function() {
              this.mountWebSocket();

              /*setInterval( _ =>{
              	this.conn.send( Math.random() )
              }, 2000 )*/
          },
          render: function() {

              return (
                <div>
                    <div id='dvWebSocket'>
                      <div id='dvWebSocketTitle' >
                          ₪ 消息池
                      </div>
                      <div id='dvWebSocketBody'>
                          <ul>
                            {
                                //.slice(-5)
                                this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>
                                    { msg }
                                </li> )
                            }
                          </ul>
                      </div>
                      <div id='dvWebSocketFinal'>
                        <span id='spanName' title={this.state.Name} >
                        <span id='spanNameInfo'>{this.state.Name}</span>
                        <span id='spanMH'>：</span>
                        </span>
                        <input id='txtTalkInfo' onChange={this.handleChange} />
                        <input type='button' id='btnSend' value='发送' onClick={this.handleSend} />
                        <input type='button' id='btnReturn' value='清空' onClick={this.handleClean} />
                      </div>
                    </div>
                    <div className='toolbar' style={{display:"none"}}>
                      <a href='javascript:;' className='toolbar-item toolbar-item-weixin'><span className='toolbar-layer'></span></a>
                      <a href='javascript:;' className='toolbar-item toolbar-item-feedback'></a>
                      <a href='javascript:;' className='toolbar-item toolbar-item-app'><span className='toolbar-layer'></span></a>
                    </div>
                </div>
              )
          }
      });

      return oCommun;
});
