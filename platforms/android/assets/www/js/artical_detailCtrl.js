'use strict';
angular.module('myApp.controllers')
    .controller('artical_detailCtrl',function($scope,$log,$ionicLoading,$ionicHistory,$stateParams,$ionicActionSheet,$location,Artical){
        $log.debug("artical_detailCtrl");

        var id = $stateParams.id;
        var ulong=$stateParams.ulong;
        var ulat=$stateParams.ulat;

        $scope.articleId=$stateParams.id;

        $scope.back = function(){
            $ionicHistory.goBack();
            console.log("back");
        };

        $scope.artical={};
        $scope.articalItem={};

        //订单类
        $scope.order={number:1,weixin:false,yinlian:false,zhifubao:false,title:'',price:''};
        // $scope.title=title;
        // $scope.price=price;

        //获取旅游列表详情
        $scope.getTravelDetails=function(){
            $log.debug("getTravelDetails");
            Artical.getTravel_details(id,ulong,ulat).then(function(response){
                console.log("文章详细的内容",response);
                //取出文章的内容


                $scope.artical=response.data.article;
                $scope.articalItem=response.data.articleItem;
                $scope.artical.distance=response.data.distance;
                //取出文章的标题

                console.log("artical:", $scope.artical);
                console.log("articalItem:", $scope.articalItem);


            },function(err){
                console.log("response的内容",err);
                alert("获取商家信息失败！");
            });
        };

         $scope.getTravelDetails();

        //打电话的sheet
        $scope.showPhoneSheet = function () {

            $ionicActionSheet.show({
                // titleText: 'ActionSheet Example',
                buttons: [
                    {
                        text: $scope.artical.phone
                    }

                ],

                cancelText: '取消',
                cancel: function () {
                    console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    console.log('BUTTON CLICKED', index);
                    return true;
                },
                destructiveButtonClicked: function () {
                    console.log('DESTRUCT');
                    return true;
                }
            });
        };
      //点击购买
      $scope.toBuy=function(title,price,articleId,itemId){
        $location.path('/commit_order/'+title+'&'+price+'&'+articleId+'&'+itemId);
      }


    });
