/**
 * Created by xihashao-pc on 2016/10/5.
 */
/**
 * 支付的controller
 */
angular.module('myApp.controllers')
  .controller('payCtrl',function($scope,$log,$stateParams,$location,$ionicHistory,$rootScope,User,PayDate) {
    $scope.back = function () {
      $ionicHistory.goBack();
      console.log("back");
    };

    $scope.order = {weixin: false, yinlian: false, zhifubao: true, title: '', price: '', goodsItemId: '', goodsId: ''};
    $scope.payObject = {};


    $scope.payObject.payCode = ""; //支付方式
    $scope.payObject.gateway = "";   //支付网关
    $scope.payObject.sellerAccount = "wpqvno9038@sandbox.com";//商家账号
    $scope.payObject.state = 1;

    $scope.payObject.goodsItemId = $stateParams.articleItemId;     //文章itemId
    $scope.payObject.goodsId = $stateParams.articleId;     //文章id
    $scope.payObject.count = $stateParams.count;   //购买数量
    // $scope.order.goodsItemId=$stateParams.itemId;    //文章itemId
    // $scope.order.goodsId=$stateParams.articleId;     //文章id
    //选择平台
    $scope.chosePay = function (payNum) {
      if (payNum == 1) {
        $scope.order.zhifubao = false;
        $scope.order.yinlian = false;

      }
      else if (payNum == 2) {
        $scope.order.zhifubao = false;
        $scope.order.weixin = false;
      }
      else if (payNum == 3) {
        $scope.order.yinlian = false;
        $scope.order.weixin = false;
      }
      console.log(payNum);
    }
    //确认支付
    $scope.pay = function () {
      if ($scope.order.zhifubao) {
        $scope.payObject.payCode = "alipay"; //支付方式
        $scope.payObject.gateway = "alipay";   //支付网关
        // Alipay.pay($scope.payObject).then(function(response){
        //   console.log("支付宝支付结果："+response);
        //
        // },function(err){
        //   console.log("支付宝支付结果："+err);
        // })
        alert("支付");
        //partner:支付宝
        Alipay.pay({
            orderString: 'partner="2088221532979990"&seller_id="2088221532979990"&out_trade_no="W8OQO9SBGPMRVM8"&subject="1"&body="我是测试数据"&total_fee="0.02"&notify_url="http://www.xxx.com"&service="mobile.securitypay.pay"&payment_type="1"&_input_charset="utf-8"&it_b_pay="30m"&show_url="m.alipay.com"&sign="Sf43Dxwdymdq3%2FqdhfBy4FEZzade%2FXhgduPIWV9%2BTuXCs%2FtozmlaiZWaF%2FmlWp2BdVQyUzC0NcPK8%2FcENQUodKzU8ZjkwFQPyMnxLqVjcuqBh%2FiYfMRBg9wMQWaxfRv5o5Gkqgvzq71MVO%2Fz1UttgnNqvWoL3RBw1GxSXQKmuoc%3D"&sign_type="RSA"'
          },
          function (msgCode) {
            alert(msgCode)
          },
          function (msg) {
            alert(msg)
          }
        );

      }
      ;
      console.log("payCtrl支付参数itemId：" + $scope.payObject.goodsItemId);
      console.log("payCtrl支付参数itemId支付参数articleId：" + $scope.payObject.goodsId);

    }
  })


