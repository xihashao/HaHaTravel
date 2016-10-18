/**
 * Created by xihashao on 16/3/23.
 */
'use strict';
angular.module('myApp.controllers',['ionic'])
    .controller('businessCtrl',function($scope,$rootScope,$ionicPopover,$stateParams,$ionicHistory,$window,$ionicLoading, $ionicModal,$log,$location,$ionicBackdrop, $timeout,$interval,Artical) {
        $scope.mark={};
        $scope.mark.channelId=$stateParams.channelId;   //首页点击栏目的ID
        console.log( "!!!!!!:",$scope.mark.channelId);

      $scope.back = function(){
            $ionicHistory.goBack();
            console.log("back");
        };
        //弹出智能排序
        $ionicPopover.fromTemplateUrl("chose-popover.html", {
            scope: $scope
        })
        .then(function(popover){
            $scope.popover = popover;
        });
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //销毁事件回调处理：清理popover对象
        $scope.$on("$destroy", function() {
            $scope.popover.remove();
        });
        // 隐藏事件回调处理
        $scope.$on("popover.hidden", function() {
            // Execute action
        });
        //删除事件回调处理
        $scope.$on("popover.removed", function() {
            // Execute action
        });

        $log.debug("businessCtrl");
        //文章对象
        $scope.articalList={};
        $scope.articalList.list=[]; //存放list 的数组
        $scope.articalList.page=1;//页数初始是1


        $scope.getTravelList=function(){
            $log.debug("getTravelList");
            Artical.getTravel_list($scope.articalList.page,$scope.mark.channelId).then(function(response){
                console.log("controller的response的内容",response);
                $scope.articalList.list=response;


            },function(err){

            });
        };

        $scope.getTravelList();


        $scope.getTravelListByReview=function(){
            $log.debug("getTravelList");
            Artical.getTravelListByReview($scope.articalList.page,$scope.mark.channelId).then(function(response){
                console.log("controller的response的内容",response);
                $scope.articalList.list=response;

            },function(err){

            });
        };

        $scope.getTravelListByPriceUp=function(){
            $log.debug("getTravelList");
            Artical.getTravelListByPriceUp($scope.articalList.page,$scope.mark.channelId).then(function(response){
                console.log("controller的response的内容",response);
                $scope.articalList.list=response;


            },function(err){

            });
        };
        $scope.getTravelListByPriceDown=function(){
            $log.debug("getTravelList");
            Artical.getTravelListByPriceDown($scope.articalList.page,$scope.mark.channelId).then(function(response){
                console.log("controller的response的内容",response);
                $scope.articalList.list=response;


            },function(err){

            });
        };
        $scope.getTravelListByPriceHot=function(){
            $log.debug("getTravelList");
            Artical.getTravelListByPriceHot($scope.articalList.page,$scope.mark.channelId).then(function(response){
                console.log("controller的response的内容",response);
                $scope.articalList.list=response;


            },function(err){

            });
        };


        /**
         * 智能排序
         */
        $scope.order=function(order){
            console.log('order：',order);
            if(order=='pg'){    //评价最高
                $scope.mark.px='pg';
                $scope.getTravelListByReview();
            }
            else if(order=='jd'){  //价格最低
                $scope.mark.px='jd';
                $scope.getTravelListByPriceUp();
            }
            else if(order=='zn'){  //智能排序
                $scope.mark.px='zn';
                $scope.getTravelList();
            }
            else if(order=='rq'){   //人气最高
                $scope.mark.px='rq';
                $scope.getTravelListByPriceHot();
            }

            else if(order=='jg'){  //价格最高
                $scope.mark.px='jg';
                $scope.getTravelListByPriceDown();

            }
            $scope.closePopover();
            console.log('结果：',$scope.mark.px);

        }


        //点击登录跳出搜索modal
        $ionicModal.fromTemplateUrl('research.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalResearch = modal;
        });
        //登录MODAL
        $scope.openResearchModal = function() {

            $scope.modalResearch.show();

        };
        $scope.closeResearchModal=function(){
            $scope.modalResearch.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.modalResearch.remove();

        });
        //下拉刷新
        $scope.doRefresh = function() {
            // for(var i=0;i<10;i++,base++)
            //     $scope.items.unshift(["item ",base].join(""));
            // Stop the ion-refresher from spinning
            $ionicBackdrop.retain();//保持背景幕

            var page=++$scope.articalList.page;
            // alert(page);
            Artical.getTravel_list(page,$scope.mark.channelId).then(function(response){
              console.log("下拉刷新获取的内容：",response);
              if(response.length==0){  //判断下拉刷新是否取到数据

                $ionicBackdrop.release();//释放背景幕

              }else{

                $scope.articalList.list.push(response);//将得到的下一页数据追加到数组尾

                $ionicBackdrop.release();//释放背景幕
              }




            },function(err){
               alert("网络出错！");
               $ionicBackdrop.release();//释放背景幕
            });

            $scope.$broadcast("scroll.refreshComplete");

        };
        //释放背景幕
        // $interval(function(){
        //   $ionicBackdrop.release();
        // },2000)


    });
