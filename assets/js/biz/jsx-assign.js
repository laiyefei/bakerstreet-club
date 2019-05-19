//this is a js for assign jsx blocks
'use strict';
;define(['rt-addons', 'jq'], function(React, $){

    //config js the react will need
    require.config({
      paths : {
          'sg' : 'aid/superagent.min'
      }
    });


    //jsx block here
    // require(['rq-jsx!biz/jsx/search', 'rq-css!../css/biz/jsx/search.css'], function(oSearch){

    //     //get and render search
    //     //create factory with the class from jsx get
    //     var oSearchInfo = React.createFactory(oSearch.SearchInfo);
    //     // Mount the JSX component in the app container
    //     React.render(
    //         oSearchInfo(),
    //         document.getElementById('dvSearch'),
    //         function(){
    //             $('#btnSearch').click(function(){
    //                 alert()
    //             });
    //         }
    //     );

    //     //guess search
    //     var oGuessSearch = React.createFactory(oSearch.GuessSearch);
    //     React.render(
    //         oGuessSearch(),
    //         document.getElementById('dvGuessSearch'),
    //         function(){

    //         }
    //     );



    // });
    //menu
    require(['rq-jsx!biz/jsx/menu', 'rq-css!../css/biz/jsx/menu.css'], function(oMenu) {

        //create factory with the class from jsx get
        oMenu = React.createFactory(oMenu);
        // Mount the JSX component in the app container
        React.render(
            oMenu(),
            document.getElementById('dvMenuShow'),
            function(){
                require(['gplib'], function(gplib){

                  //for ngtitlebutton event
                  var flex = gplib.com.fn.flex;
                  var aLi = document.getElementById('dvMenuShow').getElementsByTagName('li');
                  var oDiv = document.getElementById('spMoveCube');

                  var timer=null;

                  //set to a function if li length is zero will invoking by 4s after
                  var fnCubeMove = function(){

                        //var initLeft=oDiv.offsetLeft;
                        oDiv.setAttribute("iInitLeft", oDiv.offsetLeft); 
                       for(var i=0;i<aLi.length;i++)
                       {
                         aLi[i].onmouseover=function ()
                         { 
                           clearTimeout(timer);
                           flex(oDiv, {left: oDiv.offsetLeft}, {left: this.offsetLeft - 22}, function (now){
                             oDiv.style.left=Math.round(now.left)+'px';
                           });
                           //oDiv.style.left=this.offsetLeft-3+'px';

                         };
                         aLi[i].onmouseout=function ()
                         { 
                           clearTimeout(timer);
                           timer=setTimeout(function (){
                             flex(oDiv, {left: oDiv.offsetLeft  - 22}, {left: oDiv.getAttribute("iInitLeft")}, function (now){
                               oDiv.style.left=Math.round(now.left)+'px';
                             });
                           }, 100);
                         }; 
                       }

                       if(0 == aLi.length)
                       {
                           setTimeout(fnCubeMove, 1000);
                       }
                  }

                  fnCubeMove();

                  //after render
                  require(['classie', 'snap'], function(classie, Snap){
                      
                      var bodyEl = document.body,
                        content = document.querySelector( '.waveContent-wrap' ),
                        openbtn = document.getElementById( 'LDoOpen' ),
                        closebtn = document.getElementById( 'close-button' ),
                        isOpen = false,

                        morphEl = document.getElementById( 'morph-shape' ),
                        s = Snap( morphEl.querySelector( 'svg' ) );
                        var path = s.select( 'path' ),
                        initialPath = path.attr('d'),
                        pathOpen = morphEl.getAttribute( 'data-morph-open' ),
                        isAnimating = false;

                      var init = function() {
                        initEvents();
                        $('.waveContainer').show();
                      }

                      var initEvents = function() {
                        $(openbtn).click(toggleMenu);
                        //openbtn.addEventListener( 'click', toggleMenu );
                        if( closebtn ) {
                          $(closebtn).click(toggleMenu);
                          //closebtn.addEventListener( 'click', toggleMenu );
                        } 
                        // close the menu element if the target it´s not the menu element or one of its descendants..
                        // $(content).click(function(ev) {
                        //   var target = ev.target;
                        //   if( isOpen && target !== openbtn ) {
                        //     toggleMenu();
                        //   }
                        // });
                        // content.addEventListener( 'click', function(ev) {
                        //   var target = ev.target;
                        //   if( isOpen && target !== openbtn ) {
                        //     toggleMenu();
                        //   }
                        // } );
                      }

                      var toggleMenu = function(fnAfter) {

                        //if nothing will not show
                        event = event ? event : window.event; 
                        var oTagObj = event.srcElement ? event.srcElement : event.target;  
                        var oLeafRoot = $("#allLeafDiv");
                        //alert(oLeafRoot.find("div:hidden").length == oLeafRoot.find("div").length)
                        if("LDoOpen" == oTagObj.id 
                          && oLeafRoot.find("div:hidden").length == oLeafRoot.find("div").length){
                            return false;
                        }

                        if( isAnimating ) return false;
                        isAnimating = true;
                        if( isOpen ) {
                          classie.remove( bodyEl, 'show-menu' );
                          // animate path
                          setTimeout( function() {
                            // reset path
                            path.attr( 'd', initialPath );
                            isAnimating = false;
                          }, 300 );

                        }
                        else {
                          classie.add( bodyEl, 'show-menu' );
                          // animate path
                          path.animate( { 'path' : pathOpen }, 400, mina.easeinout, function() { isAnimating = false; } );

                        }
                        isOpen = !isOpen;

                        
                        openbtn.setAttribute("openstatus", isOpen ? "1" : "0")
                        //alert(document.getElementById('hfWaveStatus').value)

                        var oCubeMove = document.getElementById('spMoveCube');
                        //alert(oTagObj.id)
                        var oEmptyStatus = document.getElementById('hfEmptyStatus');
                        oEmptyStatus.value = "0";
                        if(!isOpen){   
                          var iThisPositionLeft = oDiv.offsetLeft;
                          flex(oDiv, {left: iThisPositionLeft - 22}, {left: -22}, function (now){
                             oDiv.style.left=Math.round(now.left)+'px';
                          }); 
                          oCubeMove.setAttribute("iInitLeft", -22); 
                          document.getElementById('hfLastWaveLeft').value = iThisPositionLeft;
                          if("LDoOpen" == oTagObj.id)
                              oEmptyStatus.value = "1";
                        }else if("LDoOpen" == oTagObj.id){ 
                          var iLastPositionLeft = document.getElementById('hfLastWaveLeft').value;
                          if(iLastPositionLeft !== undefined)
                          {  
                             flex(oDiv, {left: -22}, {left: iLastPositionLeft}, function (now){
                               oDiv.style.left=Math.round(now.left)+'px';
                             });
                          }
                          oCubeMove.setAttribute("iInitLeft", iLastPositionLeft); 
                        }
                        if(!fnAfter){
                            fnAfter();
                        }
                      }

                      init();
                  })
                  

                  //add wave button move
                  require(['rq-css!../css/resos/waveBtn.css'], function(){ 

                      //require css and run js
                      $(".waveDiv").each(function(){ 

                          var iNo = 0, iCyc = 3;
                          $(this).find(".waveBtn").each(function(){
                              new gplib.com.stunt.waterFloat(
                                $(this),
                                1000 - (iCyc - (iNo % iCyc)) * 100,
                                3,
                                iNo % iCyc == 0 ? 8 : 10
                              ) 
                              iNo++;
 
                          }) 
                      })
                  })




                })  
                
            }
        );

    })

    //right communication block
    // require(['rq-jsx!biz/jsx/commun', 'rq-css!../css/biz/jsx/commun.css'], function(oCommun) {

    //     //create factory with the class from jsx get
    //     oCommun = React.createFactory(oCommun);
    //     // Mount the JSX component in the app container
    //     React.render(
    //         oCommun(),
    //         document.getElementById('dvCommun'),
    //         function(){
    //             //add scroll
    //             $("#dvWebSocketBody").bind('DOMNodeInserted', function(){

    //                 //set scroll to bottom
    //                 this.scrollTop = this.scrollHeight;
    //             });

    //             $('#txtTalkInfo').focus().bind('keydown', function(e){
    //                 if(13 == e.keyCode){
    //                   $('#btnSend').click();
    //                 }
    //             });

    //         }
    //     )
    // })

    //sherlock robot
    require(['rq-jsx!biz/jsx/sherlock', 'rq-css!../css/biz/jsx/sherlock.css'], function(oSherlockInfo){

        var oSherlock = document.getElementById('dvSherlock');
        //create factory with the class from jsx get
        oSherlockInfo = React.createFactory(oSherlockInfo);
        // Mount the JSX component in the app container
        var fnFlyRandom = function(obj){
            if(null == obj){
                sherlock.console.error('error: sorry, the function fnFlyRandom you invoking with param is can not be empty!');
                return;
            }
            var s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
            var i1 = Math.floor(Math.random() * s.length);
            var i2 = Math.floor(Math.random() * s.length);

            var iOWidth = obj.offsetWidth;
            var iOHeight = obj.offsetHeight;
            var iWLeft = window.innerWidth - iOWidth - 210;
            var iWTop = window.innerHeight - iOHeight - 155;
            var iFnLeft = document.body.offsetWidth/2*(1+s[i1]);
            var iFnTop = document.body.offsetHeight/2*(1+s[i2]);
            if(iFnLeft > 0 && iFnLeft < iWLeft && iFnTop > 90 && iFnTop < iWTop)
            {
                $(obj).animate({
                      left: iFnLeft,
                      top: iFnTop
                },{
                    duration: 1200,
                    complete: function(){
                      //offsetHeight
                      // var oDvMsg = $("#DvCUserMsg")[0];
                      // $("#DvCUser")[0].showMsg(oDvMsg, "touch");
                      // setTimeout(function(){
                      //   $("#DvCUser")[0].doHide();
                      // }, 4500)
                    }
                });
            }
        }
        React.render(
            oSherlockInfo(),
            oSherlock,
            function(){

              //
              //after load and fly
              setTimeout(function(){
                  fnFlyRandom(document.getElementById('dvSherlock'));
              }, 10000)

            }
        )
    })



});
