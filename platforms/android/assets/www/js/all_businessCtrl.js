/**
 * Created by xihashao-pc on 2016/8/8.
 */
'use strict';
angular.module('myApp.controllers')
  .controller('all_businessCtrl',function($scope,$rootScope,$ionicPopover,$stateParams,$ionicHistory,$window,$ionicLoading, $ionicModal,$log,$location,$ionicBackdrop, $timeout,$interval,Artical,User) {



    //所有商家对象
    $scope.allBusinessList={};
    $scope.showloading=true;





    Artical.getAllBusinessOne(); //获取数据
    $scope.$on('allBusiness.businessUpdated',function () {
        $scope.allBusinessList.list=Artical.getPortals();     //获取商家数组
        $scope.showloading=false;
        console.log("是否刷新完毕")
    })


    // $scope.$on('allBusiness.businessUpdated', function() {
    //   // $timeout(function() {
    //   $scope.portalListData = PortalsFactory.getPortals();
    //   $scope.showloading=false
    //   $scope.$broadcast('scroll.refreshComplete');
    //   // }, 100);
    // });

    //下拉刷新
    $scope.doRefresh = function() {
      console.log("下拉刷新！");
      Artical.getAllBusinessOne(); //获取数据

    };



    $scope.moreDataCanBeLoaded=function(){
      
      return Artical.isHasNext();
    }

    //上拉刷新
    $scope.loadMore = function() {
      console.log("上拉刷新：" );
      $scope.allBusinessList.list.push(Artical.getMoreBusiness());
      $scope.$broadcast("scroll.infiniteScrollComplete");


    }

    //释放背景幕
    $interval(function(){
      $ionicBackdrop.release();
    },2000)


  });
