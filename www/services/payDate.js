/**
 * Created by xihashao-pc on 2016/10/5.
 */
'use strict';
/**
 * 存储支付的参数数据体
 */
angular.module('myApp.services')
  .factory('PayDate', function($rootScope) {
    var PayDate={};
    PayDate.count="";   //购买数量
    // PayDate.payCode=""; //支付方式
    // PayDate.gateway="";   //支付网关
    PayDate.sellerAccount="wpqvno9038@sandbox.com";//商家账号
    PayDate.state=1;
    PayDate.goodsItemId="";    //文章itemId
    PayDate.goodsId="";     //文章id


    PayDate.prepForBroadcast = function(count,goodsItemId,goodsId){
      console.log("setDate数据"+count+goodsItemId+goodsId);
      this.count = count;
      // this.payCode = payCode;
      // this.gateway=gateway;
      this.goodsItemId=goodsItemId;
      this.goodsId=goodsId;
      this.broadcastItem();

    };
    PayDate.broadcastItem = function(){
      console.log("66666666666666");
      $rootScope.$broadcast('handleBroadcast');
    };


    return  PayDate;

  });

