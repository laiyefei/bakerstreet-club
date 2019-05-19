// author : sherlock
// date : 2017-01-07
// describe : init for the website
// version : v1.0.0
'use strict';
;define(['jq', 'rt-addons'],function($, React){

    //declare a object for if hood to another block
    var oInitObj = {};

    //declare need js to require path
    require.config({
      paths : {
          //my general-purpose library
          'gplib' : ['aid/gplib'],

          'classie' : ['plugins/classie'],
          'snap' : ['plugins/snap.svg-min'],

          //jq extends
          'jq-sparkle' : ['resos/jq-sparkle'],
          'jq-myExtend' : ['base-plugins/jq-myExtend-1.0.0'],

          'client' : ['biz/client']
      },
      shim : {
        'jq-sparkle' : ['rq-css', 'rq-css!../css/resos/sparkle.css'],
        'jq-myextend' : {
            deps : ['jq']
        },
        'snap' : ['classie']
      }
    });

    //init invoking function=====================================================================
  	//let my website always to the top slice
  	if(window.top != window.self){
      //prevent set my website in iframe
  		window.top.location.href = location.href;
  	}

  	//stop effect system event
  	/*window.oncontextmenu=function(){window.event.returnValue=false;}
  	window.ondragstart=function(){return false}
  	window.onselectstart=function(){return false}
  	window.onbeforecopy=function(){return false}
  	window.onselect=function(){document.selection.empty()}
  	window.oncopy=function(){document.selection.empty()}
  	window.ondrop=function(){alert();}
  	window.onmouseup=function(){return false;}*/
  	window.onresize = function(){
      //reflesh
  		//window.history.go(0);
  	}


    //the business init invoking from here =======================================================
    //init change the sherlock to easy use jquery
    // $.extend({
    // 	createEleTag : sherlock.help.createEleTag
    // });
    //jquery load to sherlock ------------------------------------------
    //sherlock.jq = $;
    //jq extends hook to jq
    require(['jq-myExtend'], function(jqExtend){
        // no link to jq, if need use can invoking after
        //$.extend(jqExtend)
    })

    //-------------------------------------------------------------------
    //react load to sherlock ------------------------------------------
    //sherlock.rt = React
    //-------------------------------------------------------------------

    //require react jsx and assign
    require(['jsx-assign']);

    //init do use jq
    //if copy add some info
  //   $('body').on('copy', function (e) {

  //       //check first
  // 			if (typeof window.getSelection == 'undefined') return; //IE8 or earlier...

  // 			var body_element = document.getElementsByTagName('body')[0];
  // 			var selection = window.getSelection();

  // 			//if the selection is short let's not annoy our users
  // 		//	if (('' + selection).length < 30) return;

  // 			//create a div outside of the visible area
  // 			//and fill it with the selected text
  // 			var newdiv = document.createElement('div');
  // 			newdiv.style.position = 'absolute';
  // 			newdiv.style.left = '-99999px';
  // 			body_element.appendChild(newdiv);
  // 			newdiv.appendChild(selection.getRangeAt(0).cloneContents());

  // 			//we need a <pre> tag workaround
  // 			//otherwise the text inside 'pre' loses all the line breaks!
  // 			if (selection.getRangeAt(0).commonAncestorContainer.nodeName == 'PRE') {
  // 				newdiv.innerHTML = '<pre>' + newdiv.innerHTML + '</pre>';
  // 			}

  //       //ah, add my info like
  //       newdiv.innerHTML += '<br /><br /><br />';
  // 			newdiv.innerHTML += '________________________________________________<br /><br />';
  // 			newdiv.innerHTML += '　　　　' + sherlock.help.mtto;
  //       newdiv.innerHTML += '<br />　　　　　　		　　　　　　-- sherlock holmes';

  // 			selection.selectAllChildren(newdiv);
  // 			window.setTimeout(function () { body_element.removeChild(newdiv); }, 200);
		// });


    /* bak:
      #35efba
      #3098f1*/
    require(['jq-sparkle'], function(){
        $('.m-page').sparkle({
            fill:'#f7c916',
            stroke:'#fde3a7',
            size: 30,
        }).sparkle({
            delay: 1000,
            pause: 750,
            size: 10
        });
    });
    //query website environment
    // require(['gplib'], function(oGPLib){

    //     //define a func for change main show
    //     var fnMainShowMove = function(){

    //       			// 	m-body-mainshow-bottom-btnBehide
    //       			// dvBtnBehide
    //       			//the button pre show
    //             $('#dvMainShow-bottom-inc').html('testtes');
    //       			var iCountPre = oGPLib.com.stunt.blockCount;
    //       			var oDvBtnBehide = document.getElementById('dvMainShow-bottom-btns');
    // 			      for(var i=0; i < iCountPre; i++)
    // 			      {
    // 				          var oDvAp = document.createElement('div');
    // 				              oDvAp.className = 'm-body-mainshow-bottom-btnBehide';
    // 				              oDvAp.setAttribute('thenow', i + 1);
    // 				              oDvAp.addEventListener('click', function(){
    //           					        fnDoTimer(this.getAttribute('thenow'));
    //           				    })

    //           				    oDvAp.addEventListener('mouseover', function(){
    //                 					if(!this.getAttribute('TimerStatus'))
    //                 					{
    //                 					       this.setAttribute('TimerStatus', '1');
    //                 					}
    //                           if('1' == this.getAttribute('TimerStatus'))
    //                           {
    //                                  clearInterval(RunTimer);
    //                                  this.setAttribute('TimerStatus', '0');
    //                           }
    //             				  });
    //                       oDvAp.addEventListener('mouseout', function(){
    //                           if(!this.getAttribute('TimerStatus'))
    //                           {
    //                               this.setAttribute('TimerStatus', '1');
    //                           }
    //                           if('0' == this.getAttribute('TimerStatus'))
    //                           {
    //                           	RunTimer = setInterval(fnDoTimer, 6000);
    //                           	this.setAttribute('TimerStatus', '1');
    //                           }
    //                       });
    //                       oDvBtnBehide.appendChild(oDvAp);
    //       			}

    //         		var oPicIncs = {
    //         			'1' : '贝克街的信仰~',
    //         			'2' : 'GoodBye，John ...',
    //         			'3' : '再找找，一定忽略了某些地方。。。',
    //         			'4' : 'Chemistry Is Amazing ...'
    //         		}
    //     			  var fnDoTimer = function(sFnDir){
    //       				if(null != document.getElementById('dvMainShow')){
    //       					var iTheShow = oGPLib.com.stunt.block(document.getElementById('dvMainShow'), sFnDir);//'pre'
    //       					if(null != iTheShow)
    //       					{
    //       						$('.m-body-mainshow-bottom-btnBehide').removeClass('m-body-mainshow-bottom-btnAfter');
    //       						$('#dvMainShow-bottom-inc').html(oPicIncs[parseInt(iTheShow)]);
    //       						$('.m-body-mainshow-bottom-btnBehide').eq(parseInt(iTheShow) - 1).addClass('m-body-mainshow-bottom-btnAfter');
    //       					}
    //       				}
    //     			}

    //     			$('.m-body-mainshow-bottom-btnBehide').first().addClass('m-body-mainshow-bottom-btnAfter');
    //     			$('#dvMainShow-bottom-inc').html(oPicIncs[1]);
    //     			var RunTimer = setInterval(fnDoTimer, 6000);

    //           //left
    //           $('#dvMainShow-left').click(function(){
    //               fnDoTimer('pre');
    //           })
    //           //right
    //           $('#dvMainShow-right').click(function(){
    //               fnDoTimer();
    //           })
    //           $('.m-body-mainShow-rl').hover(function(){
    //               if(!$(this).attr('TimerStatus'))
    //               {
    //                      $(this).attr('TimerStatus', '1');
    //               }
    //               if('1' == $(this).attr('TimerStatus'))
    //               {
    //                      clearInterval(RunTimer);
    //                      $(this).attr('TimerStatus', '0');
    //               }
    //           }, function(){
    //               if(!$(this).attr('TimerStatus'))
    //               {
    //                      $(this).attr('TimerStatus', '1');
    //               }
    //               if('0' == $(this).attr('TimerStatus'))
    //               {
    //                      RunTimer = setInterval(fnDoTimer, 6000);
    //                      $(this).attr('TimerStatus', '1');
    //               }
    //           });
    // 		}

    //     //blocks control
    //     //mainshow
    //     fnMainShowMove();


    // })
    /* obj : dvWeatherInfo, dvTemper, dvCurrentCity
     **/
    require(['client'], function(oClient){
      //declare a func if faild query again
       var fnQueryIpAndOB = function(){
         //add the script in body
         var oBody = document.getElementsByTagName('body')[0];
         if(null == oBody)
         {
             sherlock.console.log('%cSorry, Can not find the body tag, to append the script tag !!', 'color:red');
             return;
         }
         var oScriptTest = document.createElement('script');
         oScriptTest.type = 'text/javascript';
         oScriptTest.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
         oScriptTest.onload = function(){
           var sTheIp = returnCitySN['cip'];
           var oOB = oClient.getOSAndBrowser();
           var oClientInfo = oOB;
           oClientInfo['ip'] = sTheIp;
           $.ajax({
             type : 'POST',
             data : oClientInfo,
             url : 'api/weather',
             success : function(sReInfo){
               var oReInfo = sReInfo;
               //alert(oReInfo)
               if('string' == typeof oReInfo)
               {
                 oReInfo = eval('('+ sReInfo +')');
               }
               //after success do ..
               //weather info
               //background:url(./img/resos/weather/10.png);
               if(oReInfo['weather'])
               {
                 if(oReInfo['weather']['results']
                   && oReInfo['weather']['results'][0]
                   && oReInfo['weather']['results'][0]['location']
                   && oReInfo['weather']['results'][0]['now'])
                 {
                   $('#dvCurrentCity').html(oReInfo['weather']['results'][0]['location'].name);
                   var iTemperature = oReInfo['weather']['results'][0]['now'].temperature;
                   var sCsTemper = '';
                   if(parseInt(iTemperature) < 11)
                   {
                      sCsTemper = 'm-t-weather-Temper-cold';
                   }else if(parseInt(iTemperature) > 21){
                      sCsTemper = 'm-t-weather-Temper-hot';
                   }else{
                      sCsTemper = 'm-t-weather-Temper-cool';
                   }
                   $('#dvTemper').html( iTemperature + '℃').addClass(sCsTemper);
                   $('#dvWeatherInfo').css({backgroundImage:'url(img/biz/weather/'+  oReInfo['weather']['results'][0]['now'].code +'.png)'});
                 }
               }
             },
              error : function(sErr){
               sherlock.console.log('%cSorry, the service with clientinfo was wrong .', 'color:red');
               setTimeout(fnQueryIpAndOB, 3800);
             }
           })
         }

         //the query ip js add to body will run and get ip send to server
         oBody.appendChild(oScriptTest);
       }
       //run the function
       fnQueryIpAndOB();


       //time sky here
       //alert(oClient.Time.getTimeGap(new Date(),new Date("")));


    })


    //final return this obj
    return oInitObj;
})
