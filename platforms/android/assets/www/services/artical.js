'use strict';
angular.module('myApp.services')
    .factory('Artical',function(ENV,$resource, $rootScope,$log,$http, $q,Storage){
        //查询商家列表
        //var getActivitys = function() {
        //    var serveurl = ENV.api+"/article_list2.json";
        //    //$http()返回一个promise对象
        //    return $http({
        //        method:'GET',
        //        url:serveurl,
        //        params:{
        //            //type为4获取活动
        //            type:4
        //        }
        //    });
        //};
        //查询某个旅游类商家详情
        var getTravel_details = function(id,ulong,ulat){
            var serveurl = ENV.api+'/showItems.do';
            return $http({
                method:'GET',
                url:serveurl,
                //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                params:{
                    articleId:id,
                    ulong:ulong,
                    ulat:ulat
                }
            });
        };

        //查询所有商家列表,根据channelId去判断具体是哪一类
        var getTravel_list=function(page,channelId){
            var serveurl = ENV.api+'/article_listAll.json';
            return $http({
                method:'GET',
                url:serveurl,
                //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                params:{
                    channelId:channelId,// 栏目的id
                    page:page
                }
            });
        };
        //提交评论
        var commitReview=function(content,star,articleId){
            var serveurl = ENV.api+'/comment_puts.json';
            return $http({
                method:'GET',
                url:serveurl,
                //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                params:{
                    content:content,// 旅游栏目的id
                    star:star,
                    articleId:articleId

                }
            });
        };
      //获取评论
        var getReview=function(id,page){
            var serverurl= ENV.api+'/comment_lists.json';
            return $http({
              method:"GET",
              url:serverurl,
              params:{
                id:id,
                page:page
              }

            });
        };


        return {
            //获取商家具体信息
            getTravel_details:function(id,ulong,ulat){
                var d = $q.defer();
                var promise = d.promise;
                //获取旅游类产品的详细信息
                getTravel_details(id,ulong,ulat).then(function(response){
                $log.debug('getTravel_details response:',response);
                    //alert("获取文章成功");
                    d.resolve(response);
                },function(err){
                    //alert("获取文章失败");
                    d.reject("获取文章失败");
                });
                return promise;
            },
            //获取商家列表list
            getTravel_list:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                //获取旅游类产品的详细信息
                getTravel_list(page,channelId).then(function(response){

                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败!");
                    }
                },function(err){
                    // alert("获取文章列表失败!");
                    d.reject(err);
                });
                return promise;
            },
            　//根据好评排序  旅游的文章
            getTravelListByReview:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isStar:1
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },

              //根据价格从低到高排序
            getTravelListByPriceUp:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isPriceDown:0
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },
              //根据价格从高到低排序
            getTravelListByPriceDown:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isPriceDown:1
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },
              //根据人气排序
            getTravelListByPriceHot:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isQuantity:1
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },
              //智能排序（默认）

            //提交评论
            commitReview:function(content,star,articleId){
                var d = $q.defer();
                var promise = d.promise;
                commitReview(content,star,articleId).then(function(response){
                    d.resolve(response.data);
                    $log.debug(' response:', response.data);
                },function(err){
                    alert("提交评论失败");
                    d.reject(err);

                })
                return promise;
            },
          //获取评论
            getReview:function(id,page){
              var d=$q.defer();
              var promise=d.promise;
              getReview(id,page).then(function(response){

                d.resolve(response.data);
                $log.debug(' response:', response.data);
              },function(err){
                alert("获取评论失败！");
                d.reject(err);

              })

              return promise;
            },
          //获取所有商家
          getAllBusiness:function(page){
            var d = $q.defer();
            var promise = d.promise;
            var serveurl = ENV.api + '/article_listAll.json';
            $http({
              method:'GET',
              url:serveurl,
              //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
              params:{
                isStar:1, //默认按照好评来排序
                page:page

              }
            }).then(function(response){
              if(response.status==200) {
                $log.debug('获得的所有文章第一页数据:', response);

                d.resolve(response.data);
              }
              else{
                d.reject("获取文章列表失败");
              }
            },function(err){
              alert("获取文章列表失败");
              d.reject(err);
            })
            return promise;
          }


        }


    });
