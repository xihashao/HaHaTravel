/**
 * Created by xihashao-pc on 2016/10/4.
 */
'use strict';
angular.module('myApp.services')
  .factory('Alipay',function(ENV,$resource, $rootScope,$log,$http, $q,Storage){

     return {
        pay: function (orderForm) {           //传一个订单的对象过来
           var $this = this;
           var d = $q.defer();
           var promise = d.promise;
           var serveurl = ENV.api + '/cashier_pay_alipay.do';
           $http({
             method: 'POST',
             url: serveurl,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
             data: orderForm,
             transformRequest: function (obj) {               //将对象进行参数序列化
               console.info(obj);
               var str = [];
               for (var p in obj) {
                 str.push(p + "=" + obj[p]);
               }
               var serialString = str.join("&");
               console.info(serialString);
               return serialString;
             }

           }).then(function (response) {
             console.log('pay response:', response);
             var data = response.data;
             if (data.result == 'success') {
               d.resolve();

             } else {
               console.log("dsfsdf");
               d.reject('用户名或密码错误！');
             }
           }, function (err) {
             console.log('login error:', err);
             d.reject('网络错误');
           });
           return promise;

       }
     }

  })
