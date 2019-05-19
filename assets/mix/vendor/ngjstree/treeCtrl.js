(function(angular) {
    'use strict';

    //// JavaScript Code ////
    function treeCtrl($log,$timeout,toaster) {
        var vm = this;

        var newId = 1;
        vm.ignoreChanges = false;
        vm.newNode = {};
        vm.originalData = eval("("+ document.getElementById("hfArchiveJson").value +")") || [];
        vm.treeData = [];
        angular.copy(vm.originalData,vm.treeData);
        vm.treeConfig = {
            core : {
                multiple : false,
                animation: true,
                error : function(error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback : true,
                worker : true
            },
            types : {
                default : {
                    icon : 'glyphicon glyphicon-flash'
                },
                star : {
                    icon : 'glyphicon glyphicon-star'
                },
                cloud : {
                    icon : 'glyphicon glyphicon-cloud'
                }
            },
            version : 1//,
            //plugins : ['types']//,'checkbox'
        };


        //add evnet of click to this
        // vm.openIFrame = function(){
        //     //find att for target iframe
        //     var sIframeId = this.
        //     if(!oIframe){
        //
        //     }
        //
        // };

        vm.onTreeItemClick = function(callback, $event){
          $event = $event ? $event : window.event;
          var oSrc = $event.srcElement ? $event.srcElement : $event.target;
          var sHref = oSrc.getAttribute("href");
          if(sHref && sHref.IsURL())
            $("[name='ArchiveShow']").attr("src", sHref);
          //alert(oSrc.getAttribute("href"))
            // (vm[callback] || angular.noop)({
            //     $item:item,
            //     $event:$event
            // });
        }

        vm.reCreateTree = function() {
            vm.ignoreChanges = true;
            angular.copy(this.originalData,this.treeData);
            vm.treeConfig.version++;
        };

        vm.simulateAsyncData = function() {
            vm.promise = $timeout(function(){
                vm.treeData.push({ id : (newId++).toString(), parent : vm.treeData[0].id, text : 'Async Loaded' })
            },3000);
        };

        vm.addNewNode = function() {
            vm.treeData.push({ id : (newId++).toString(), parent : vm.newNode.parent, text : vm.newNode.text });
        };

        // this.setNodeType = function() {
        //     var item = _.findWhere(this.treeData, { id : this.selectedNode } );
        //     item.type = this.newType;
        //     toaster.pop('success', 'Node Type Changed', 'Changed the type of node ' + this.selectedNode);
        // };

        // this.readyCB = function() {
        //     $timeout(function() {
        //         vm.ignoreChanges = false;
        //         toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')
        //     });
        // };

        // this.createCB  = function(e,item) {
        //     $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
        // };

        this.applyModelChanges = function() {
            return !vm.ignoreChanges;
        };
    }

    //// Angular Code ////

    angular.module('ngJsTreeBody').controller('treeCtrl', treeCtrl);

})(angular);
