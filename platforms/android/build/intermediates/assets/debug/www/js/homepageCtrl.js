/**
 * Created by xihashao on 16/3/23.
 */
'use strict';
angular.module('myApp.controllers')
    .controller('homepageCtrl',function($scope,$ionicLoading, $ionicModal,$log,$timeout,$interval,$rootScope,$ionicHistory,$window,$location,User,Homepage) {
     $scope.recommendHotel={};
     $scope.recommendTourism={};
     $scope.recommendFood={};

      $scope.form={};
      $scope.form.data="";
      $scope.listFindItem={};

      $scope.back = function(){
        $ionicHistory.goBack();

      };

      $scope.getRecommend=function(id,ulong,ulat){
           Homepage.getRecommend(id,ulong,ulat).then(function(response){
             console.log("推荐response的内容是：",response);
             //获取酒店推荐
             if(id==31){
               $scope.recommendHotel=response;
             }
             //获取旅游推荐
             else if(id==32){
               $scope.recommendTourism=response;
             }
             //获取美食推荐
             else if(id==33){
               $scope.recommendFood=response;
             }
           },function(err){
              alert("获取推荐失败！");

           })
       };
        $scope.getRecommend(31);
        $scope.getRecommend(32);
        $scope.getRecommend(33);

        $scope.toFind=function(){
          $location.path('/findByName');
        }

        $scope.findByName=function () {
          Homepage.findByName($scope.form.data).then(function(response){
            console.log("查找的结果：",response);
            $scope.listFindItem=response;
          },function(err){
            alert("查找失败！");
          })
        }

    //  下拉刷新
      $scope.doRefresh = function() {
        $interval(function(){
          $window.location.reload();
          },900)

        // $location.path('/homepage');

        $scope.$broadcast("scroll.refreshComplete");

      }

    });
