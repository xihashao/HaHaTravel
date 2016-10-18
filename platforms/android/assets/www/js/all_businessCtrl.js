/**
 * Created by xihashao-pc on 2016/8/8.
 */
'use strict';
angular.module('myApp.controllers')
  .controller('all_businessCtrl',function($scope,$rootScope,$ionicPopover,$stateParams,$ionicHistory,$window,$ionicLoading, $ionicModal,$log,$location,$ionicBackdrop, $timeout,$interval,Artical,User) {



    //所有商家对象
    $scope.allBusinessList={};
    $scope.allBusinessList.list=[]; //存放list 的数组
    $scope.allBusinessList.page=1;//页数初始是1

    //获取所有商家
    $scope.getAllBusiness=function(){
      $log.debug("getTravelList");
      Artical.getAllBusiness($scope.allBusinessList.page).then(function(response){
        console.log("controller的response的内容",response);
        $scope.allBusinessList.list=response;


      },function(err){

      });
    };

    $scope.getAllBusiness();


    //下拉刷新
    $scope.doRefresh = function() {

      $ionicBackdrop.retain();//保持背景幕

      var page=++$scope.allBusinessList.page;

      Artical.getAllBusiness(page).then(function(response){
        console.log("下拉刷新获取的内容：",response);
        if(response.length==0){  //判断下拉刷新是否取到数据

          $ionicBackdrop.release();//释放背景幕

        }else{

          $scope.allBusinessList.list.push(response);//将得到的下一页数据追加到数组尾

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
