;define(['rt-addons', 'sg', 'classie', 'snap', 'gplib'], function(React, sg, classie, Snap, gplib) {

      // add menu jsx syntax here
      var oMenu = React.createClass({
          getMenuList : function(){
              sg.get('api/menu')
              .accept('json')
              .end(function(err, oRes){
                if(err) throw err;
                if(oRes.ok){
                    var oRMenus = oRes.text;
                    //console.log(oRMenus)
                    if('string' == typeof oRMenus){
                        oRMenus = eval('('+ oRMenus +')')
                    }
                    this.setMenuListState(oRMenus);
                }else{
                    sherlock.console.log('sorry, the sg for get api was wrong in getMenuList of menu.jsx')
                }
              }.bind(this));
          },
          setMenuListState : function(oMenus){
              this.setState({menus:oMenus, isLoaded : true});
          },
          getInitialState: function() {
            return {menus : []};
          },
          componentDidMount: function() {
              //init load menu
              this.getMenuList();
          },
          getDomMenuList : function(){
              //declare ul control
              var oRoots = [];
              var oLeafs = {};
              var oLi = this.state.menus.map(function(oMenu){

                  if("string" == typeof oMenu){
                      oMenu = eval('('+ oMenu +')');
                  }
                  //console.log(oMenu)
                  //layer switch
                  switch(oMenu.LAYER_NO){
                      case "1" :
                        oRoots.push(oMenu);
                        break;
                      default:
                        var bIfLeaf = oMenu.IS_LEAF;
                        if(typeof bIfLeaf == "string"){
                            bIfLeaf = eval("("+ bIfLeaf +")");
                        }
                        if(bIfLeaf){
                            if(!oLeafs[oMenu.P_ID])
                            {
                                oLeafs[oMenu.P_ID] = [];
                            }
                            oLeafs[oMenu.P_ID].push(oMenu);
                        }
                      break;
                  }
              });

              var oShowRoots = [];
              var oShowLeafs = []; 
              oRoots.map(function(oRoot){
                  
                  oShowRoots.push(<li name={oRoot.NAME} onClick={this.handlerMenuClick.bind(this, oRoot)}  >{oRoot.NAME}</li>);
                  var oLayerLeaf = [];
                  if(oLeafs[oRoot.ID])
                  {
                      oLeafs[oRoot.ID].map(function(oLeaf){
                          var bIfLeaf = oLeaf.IS_LEAF;
                          if(typeof bIfLeaf == "string"){
                              bIfLeaf = eval("("+ bIfLeaf +")");
                          }
                          oLayerLeaf.push(<span className="waveBtn" onClick={this.handlerMenuClick.bind(this, oLeaf)}  >{oLeaf.NAME}</span>);
                      }.bind(this));
                      oShowLeafs.push(<div className="waveDiv" id={oRoot.ID} style={{display:'none'}} >{oLayerLeaf}</div>);
                  }
              }.bind(this)); //alert(this == document.getElementById(""))
              //sthis.setState({isLoaded : false});
              this["MenuList"] = {
                  RootList : oShowRoots,
                  LeafList : oShowLeafs
              }
              //alert(this["MenuList"])
          },
          MenuList : {
              RootList : [],
              LeafList : []
          },
          //no update when dom change
          /*shouldComponentUpdate: function(nextProps, nextState) {
              // TODO: return whether or not current chat thread is different to former one. 
              //alert(nextState.isLoaded)
              return nextState.isLoaded;
          }, */
          toggleMenu : function(){
              //state
              var isAnimating = this.state.isAnimating,
                  isOpen = this.state.isOpen,
                  bodyEl = document.body,
              		content = document.querySelector( '.waveContent-wrap' ),
              		openbtn = document.getElementById( 'open-button' ),
              		closebtn = document.getElementById( 'close-button' ),
              		morphEl = document.getElementById( 'morph-shape' ),
              		s = Snap( morphEl.querySelector( 'svg' ) );
              		path = s.select( 'path' );
              		initialPath = path.attr('d'),
              		pathOpen = morphEl.getAttribute( 'data-morph-open' );

                  if( isAnimating ) return false;
                  this.setState({
                    isAnimating : true
                  });
                  if( isOpen ) {
                    classie.remove( bodyEl, 'show-menu' );
                    // animate path
                    setTimeout( function() {
                      // reset path
                      path.attr( 'd', initialPath );
                      this.setState({
                        isAnimating : false
                      });
                    }, 300 );
                  }
                  else {
                    classie.add( bodyEl, 'show-menu' );
                    // animate path
                    path.animate( { 'path' : pathOpen }, 400, mina.easeinout, function() { isAnimating = false; } );
                  }
                  this.setState({
                    isOpen : !isOpen
                  });
          },
          handlerMenuClick : function(oMenuObj){

            //the mean click
            if(null == oMenuObj) return false; 
            var bIfLeaf = oMenuObj.IS_LEAF, sTreeId = oMenuObj.ID;
            if(typeof bIfLeaf == "string"){
                bIfLeaf = eval("("+ bIfLeaf +")");
            }
            if(!bIfLeaf){ 
                var oDvWaveInfo = this.state.dvWaveInfo;
                    //bIsAnimating = false,
                oDvWaveInfo = oDvWaveInfo || {};
                var bIfEmptyStatus = !!parseInt(document.getElementById('hfEmptyStatus').value);
                //alert(parseInt(document.getElementById('hfEmptyStatus').value))
                //alert(bIfEmptyStatus)
                if(bIfEmptyStatus){
                    oDvWaveInfo = {};
                }
                //alert($('#LDoOpen').attr("openstatus"))
                oDvWaveInfo.isOpen = !!parseInt($('#LDoOpen').attr("openstatus"));
                // alert(oDvWaveInfo.isOpen)
                var bIsOpen = oDvWaveInfo.isOpen;

                //alert(oDvWaveInfo.ID)
                if(oDvWaveInfo.ID == sTreeId){
                    //  bIsAnimating = oDvWaveInfo.isAnimating;
                    oDvWaveInfo.isOpen = !bIsOpen;
                    //LDoOpen 
                    $('#LDoOpen').click();
                }else if(!oDvWaveInfo.ID){
                    oDvWaveInfo.isOpen = true;
                    $('#allLeafDiv div').hide();
                    //LDoOpen
                    $('#LDoOpen').click();
                }else{
                    $('#allLeafDiv div').hide();
                }
                //alert(oDvWaveInfo.ID) 
                //newid get
                oDvWaveInfo['ID'] = sTreeId;

                if(!oDvWaveInfo.isOpen){
                    $('#'+ sTreeId).hide();
                    oDvWaveInfo = null; 
                }else{
                    $('#'+ sTreeId).show('fast');

                    //set the click cube position left

                    var thisEvent = event ? event : window.event; 
                    var oTagObj = thisEvent.srcElement ? thisEvent.srcElement : thisEvent.target;  
                    var iMoveCurrentLeft = oTagObj.offsetLeft - 22;
                    var oCubeMove = document.getElementById('spMoveCube');
                    oCubeMove.setAttribute("iInitLeft", iMoveCurrentLeft); 
                }

                this.setState({
                  dvWaveInfo : oDvWaveInfo
                });
            }else{

              //$(this) add click event
              var oPage = $(".m-page");
              if(oPage.length > 0)
              {
                gplib.win.opWinIframe(oPage[0], oMenuObj.CODE, oMenuObj.URL, "myclass");
              }  
            }
          }, 
          render: function() {
            //init bind menu
            this.getDomMenuList();
            //add menu for children
            React.render(<div id={'allLeafDiv'}>{this["MenuList"]["LeafList"]}</div>,
              document.getElementById('dvBodyWaveContent'),
              function(){
                  this.setState({
                    dvWaveInfo : {
                        isAnimating : false,
                        isOpen : false
                    }
                  });

                  //after render buttons 
              }); 

            return (
              <div>
                <ul id="ulRoots">{this["MenuList"]["RootList"]}</ul> 
                <input id='hfLastWaveLeft' type='hidden' value='-22' />
                <input id='hfEmptyStatus' type='hidden' value='0' />
              </div>
            );

          }
      });

      return oMenu;
});
