/**
 * Created by xihashao-pc on 2016/7/18.
 */
angular.module('myApp.controllers')
  .controller('orderCtrl',function($scope,$ionicLoading, $ionicModal,$log,$timeout,$interval,$stateParams,$location,$ionicHistory,$rootScope,User,PayDate) {

      //订单的标题和单价

      $scope.order={number:1,weixin:false,yinlian:false,zhifubao:true,title:'',price:'',goodsItemId:'',goodsId:''};
      //支付的参数实体
      // $scope.payObject={};
      //
      // $scope.payObject.count="";   //购买数量
      // $scope.payObject.payCode=""; //支付方式
      // $scope.payObject.gateway="";   //支付网关
      // $scope.payObject.sellerAccount="wpqvno9038@sandbox.com";//商家账号
      // $scope.payObject.state=1;

      var title=$stateParams.title;
      var price=$stateParams.price;

       $scope.order.goodsItemId=$stateParams.itemId;    //文章itemId
       $scope.order.goodsId=$stateParams.articleId;     //文章id


      $scope.order.title=title;
      $scope.order.price=price;


      $scope.back = function(){
        $ionicHistory.goBack();
        console.log("back");
      };


      //订单数量+ -
      $scope.addNum=function(){
        $scope.order.number++;
      };
      $scope.subNum=function(){
        if($scope.order.number>1){
          $scope.order.number--;
        }

      };


      //提交订单
      $scope.submitOrder=function(){
        $location.path('/deal_order/'+$scope.order.goodsId+'&'+$scope.order.goodsItemId+'&'+$scope.order.number);
      };



      //设置payDate中支付参数
      $scope.setPayDate=function(count,goodsItemId,goodsId){
        PayDate.prepForBroadcast(count,goodsItemId,goodsId);
      };

      $scope.setPayDate($scope.order.number, $scope.order.goodsItemId,$scope.order.goodsId);
      console.log("order支付参数itemId："+$scope.order.goodsItemId);
      console.log("order支付参数articleId："+$scope.order.goodsId);







  });
